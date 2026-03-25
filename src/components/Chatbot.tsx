import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, X, MessageSquare, Loader2, Sparkles, Paperclip, FileText, Image as ImageIcon, Trash2, AlertCircle, RefreshCw } from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/src/lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ChatError {
  type: 'NETWORK' | 'API_KEY' | 'FILE_SIZE' | 'FILE_TYPE' | 'SAFETY' | 'GENERIC';
  message: string;
  suggestion: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hello! I am Aron, the Astheron Technologies AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{ name: string, data: string, mimeType: string }[]>([]);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setIsProcessingFile(true);
    const newFiles: { name: string, data: string, mimeType: string }[] = [];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    for (const file of Array.from(files)) {
      try {
        if (file.size > MAX_FILE_SIZE) {
          throw new Error('FILE_SIZE');
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
          throw new Error('FILE_TYPE');
        }

        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const base64Data = result.split(',')[1];
            resolve(base64Data);
          };
          reader.onerror = () => reject(new Error('READ_ERROR'));
          reader.readAsDataURL(file);
        });

        newFiles.push({
          name: file.name,
          data: base64,
          mimeType: file.type
        });
      } catch (err: any) {
        let fileError: ChatError;
        if (err.message === 'FILE_SIZE') {
          fileError = {
            type: 'FILE_SIZE',
            message: `"${file.name}" is a bit too heavy (max 5MB).`,
            suggestion: 'Try compressing the file or uploading a smaller version so I can process it.'
          };
        } else if (err.message === 'FILE_TYPE') {
          fileError = {
            type: 'FILE_TYPE',
            message: `I'm not familiar with "${file.name}"'s format yet.`,
            suggestion: 'Please use standard formats like JPG, PNG, PDF, or Word documents.'
          };
        } else {
          fileError = {
            type: 'GENERIC',
            message: `I couldn't read "${file.name}" properly.`,
            suggestion: 'The file might be corrupted or locked. Try a different file or restart the chat.'
          };
        }
        setError(fileError);
      }
    }

    setAttachedFiles(prev => [...prev, ...newFiles]);
    setIsProcessingFile(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async (retryMessage?: string, retryFiles?: { name: string, data: string, mimeType: string }[]) => {
    const userMessage = retryMessage || input.trim();
    const currentFiles = retryFiles || [...attachedFiles];

    if ((!userMessage && currentFiles.length === 0) || isLoading) return;
    
    if (!retryMessage) {
      setInput('');
      setAttachedFiles([]);
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: userMessage + (currentFiles.length > 0 ? `\n\n[Attached ${currentFiles.length} file(s): ${currentFiles.map(f => f.name).join(', ')}]` : '') 
      }]);
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API_KEY_MISSING');
      }

      if (!navigator.onLine) {
        throw new Error('OFFLINE');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const contents = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      // Add the new user message with files
      const userParts: any[] = [{ text: userMessage || "Analyze the attached files." }];
      currentFiles.forEach(file => {
        userParts.push({
          inlineData: {
            data: file.data,
            mimeType: file.mimeType
          }
        });
      });

      contents.push({
        role: 'user',
        parts: userParts
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents,
        config: {
          systemInstruction: "You are Aron AI, the official assistant for Astheron Technologies. Astheron is a leading tech company specializing in Website Development, System Architecture, Mobile Applications, and AI Solutions. Our key products include 'Aron AI' (WhatsApp Chatbot), a professional Pentest/Hacking Agent, and an Anti-Gambling system. Be professional, enterprise-focused, and helpful. If files are attached, analyze them thoroughly and discuss them in the context of Astheron's expertise. Use your high-thinking capabilities to provide deep insights.",
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });

      if (!response.text) {
        throw new Error('EMPTY_RESPONSE');
      }

      setMessages(prev => [...prev, { role: 'model', content: response.text }]);
    } catch (err: any) {
      console.error('Chat error:', err);
      
      let errorDetail: ChatError;

      if (err.message === 'API_KEY_MISSING') {
        errorDetail = {
          type: 'API_KEY',
          message: "Aron's engine is currently undergoing maintenance.",
          suggestion: "We're fine-tuning the AI. Please check back in a few minutes or contact our support team."
        };
      } else if (err.message === 'OFFLINE' || err.message?.includes('fetch')) {
        errorDetail = {
          type: 'NETWORK',
          message: "It looks like you've gone offline.",
          suggestion: "Please check your Wi-Fi or data connection and click 'Retry' to continue our conversation."
        };
      } else if (err.message?.includes('safety') || err.message?.includes('blocked')) {
        errorDetail = {
          type: 'SAFETY',
          message: "I'm unable to discuss this specific topic due to safety guidelines.",
          suggestion: "Try rephrasing your question to focus on Astheron's engineering and technology services."
        };
      } else if (err.message === 'EMPTY_RESPONSE') {
        errorDetail = {
          type: 'GENERIC',
          message: "I'm having trouble generating a response right now.",
          suggestion: "The AI engine might be busy. Click 'Retry' to send your message again."
        };
      } else {
        errorDetail = {
          type: 'GENERIC',
          message: "An unexpected technical glitch occurred.",
          suggestion: "A quick refresh of the page usually fixes this. If not, please let our team know."
        };
      }

      setError(errorDetail);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Escape key to close chat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
        aria-label="Open Aron AI assistant"
        aria-expanded={isOpen}
        aria-controls="chatbot-window"
      >
        <MessageSquare className="w-6 h-6" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            role="dialog"
            aria-label="Aron AI Chat Assistant"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 z-50 w-[400px] h-[600px] glass rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm">Aron AI</h3>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest">Astheron Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:ring-2 focus:ring-white focus:outline-none"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-white/10" : "bg-white"
                  )}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Bot className="w-4 h-4 text-black" aria-hidden="true" />
                    )}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' ? "bg-white/10 text-white rounded-tr-none" : "bg-white/5 text-white/90 border border-white/10 rounded-tl-none"
                  )}>
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-red-500">{error.message}</p>
                        <p className="text-xs text-red-500/70 mt-1">{error.suggestion}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setError(null)}
                        className="text-[10px] uppercase tracking-widest font-black text-white/40 hover:text-white transition-colors"
                      >
                        Dismiss
                      </button>
                      {(error.type === 'NETWORK' || error.type === 'GENERIC') && (
                        <button 
                          onClick={() => {
                            const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
                            if (lastUserMsg) {
                              handleSend(lastUserMsg.content);
                            }
                          }}
                          className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Retry
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          setMessages([{ role: 'model', content: 'Hello! I am Aron, the Astheron Technologies AI assistant. How can I help you today?' }]);
                          setError(null);
                        }}
                        className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-white/20 hover:text-red-400 transition-colors ml-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear Chat
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isLoading && (
                <div className="flex gap-3 mr-auto" role="status" aria-label="Aron is thinking">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center animate-pulse">
                    <Sparkles className="w-4 h-4 text-black" aria-hidden="true" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.2, y: 0 }}
                        animate={{ opacity: 1, y: -2 }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.15,
                          ease: "easeInOut"
                        }}
                        className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              {/* File Previews */}
              <AnimatePresence>
                {attachedFiles.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex flex-wrap gap-2 mb-3"
                  >
                    {attachedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg p-2 pr-1 group relative">
                        {file.mimeType.startsWith('image/') ? (
                          <ImageIcon className="w-4 h-4 text-white/60" />
                        ) : (
                          <FileText className="w-4 h-4 text-white/60" />
                        )}
                        <span className="text-[10px] text-white/80 max-w-[100px] truncate">{file.name}</span>
                        <button 
                          onClick={() => removeFile(idx)}
                          className="p-1 hover:bg-white/10 rounded-md transition-colors"
                        >
                          <X className="w-3 h-3 text-white/40 group-hover:text-white" />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || isProcessingFile}
                  className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50"
                  aria-label="Attach files"
                >
                  {isProcessingFile ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Paperclip className="w-4 h-4" />
                  )}
                </button>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={attachedFiles.length > 0 ? "Describe these files..." : "Ask about our services..."}
                    aria-label="Type your message to Aron AI"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={isLoading || (!input.trim() && attachedFiles.length === 0)}
                    aria-label="Send message"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors focus:ring-2 focus:ring-white focus:outline-none disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              {isProcessingFile && (
                <p className="text-[10px] text-white/40 mt-2 uppercase tracking-widest animate-pulse">Processing files...</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
