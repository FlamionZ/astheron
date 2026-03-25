import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Loader2, Sparkles, Wand2, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { GoogleGenAI } from "@google/genai";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const generateDraft = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Draft a professional inquiry message for a client interested in Astheron Technologies. 
      The client's name is ${formData.name || 'a potential client'}.
      They are looking for high-end engineering services.
      Keep it professional, concise, and focused on starting a collaboration.
      Format: Just the message body.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      if (response.text) {
        setFormData(prev => ({ ...prev, message: response.text.trim() }));
      }
    } catch (error) {
      console.error('Draft generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          aria-describedby="contact-modal-description"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass rounded-[40px] border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 id="contact-modal-title" className="text-3xl font-display font-bold mb-2">GET IN TOUCH.</h2>
                  <p id="contact-modal-description" className="text-brand-muted text-sm uppercase tracking-widest font-bold">Astheron Technologies</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors focus:ring-2 focus:ring-white focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                      <CheckCircle2 className="w-10 h-10 text-black" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-2">MESSAGE SENT.</h3>
                    <p className="text-brand-muted">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-white/50 ml-1">Full Name</label>
                      <input
                        required
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-white/50 ml-1">Email Address</label>
                      <input
                        required
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-end ml-1">
                        <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-white/50">Message</label>
                        <button
                          type="button"
                          onClick={generateDraft}
                          disabled={isGenerating}
                          className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                        >
                          {isGenerating ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Wand2 className="w-3 h-3" />
                          )}
                          AI Draft
                        </button>
                      </div>
                      <textarea
                        required
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your project..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 focus:ring-4 focus:ring-white/20 focus:outline-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" aria-hidden="true" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Visual Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
