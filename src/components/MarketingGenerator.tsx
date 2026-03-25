import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Copy, Check, RefreshCw, Terminal, Wand2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '@/src/lib/utils';

const services = [
  "Website Development",
  "System Architecture",
  "Mobile Applications",
  "Cybersecurity Audits",
  "AI & Machine Learning",
  "Cloud Infrastructure"
];

const tones = [
  { id: 'professional', label: 'Professional', icon: '👔' },
  { id: 'bold', label: 'Bold & Modern', icon: '🚀' },
  { id: 'minimalist', label: 'Minimalist', icon: '✨' },
  { id: 'technical', label: 'Technical', icon: '⚙️' }
];

export default function MarketingGenerator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([services[0]]);
  const [companyName, setCompanyName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [selectedTones, setSelectedTones] = useState<string[]>([tones[0].id]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const toggleTone = (toneId: string) => {
    setSelectedTones(prev => 
      prev.includes(toneId) 
        ? prev.filter(t => t !== toneId)
        : [...prev, toneId]
    );
  };

  const generateCopy = async () => {
    if (!targetAudience.trim() || selectedServices.length === 0 || selectedTones.length === 0) return;
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Generate a high-impact marketing headline and a short paragraph (max 3 sentences) for a partnership between Astheron Technologies and ${companyName || 'a client'}. 
      Services: ${selectedServices.join(', ')}
      Target Audience: ${targetAudience}
      Tones: ${selectedTones.map(t => tones.find(tone => tone.id === t)?.label).join(', ')}
      
      Astheron is a high-end engineering collective focused on innovation, security, and technical excellence.
      Format the output as:
      Headline: [Headline]
      Body: [Paragraph]`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setGeneratedCopy(response.text || 'Failed to generate copy. Please try again.');
    } catch (error) {
      console.error('Generation error:', error);
      setGeneratedCopy('An error occurred during generation. Please check your connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-generator" className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest mb-8">
              <Sparkles className="w-3 h-3 text-blue-400" /> AI Marketing Suite
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight">
              GENERATE YOUR <br />
              <span className="text-white/40 italic">STRATEGY.</span>
            </h2>
            <p className="text-xl text-brand-muted leading-relaxed mb-12 max-w-lg">
              Leverage our proprietary AI engine to craft personalized marketing 
              narratives for your next project. Tailored to your audience, 
              powered by Astheron intelligence.
            </p>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40">Select Services</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      onClick={() => toggleService(service)}
                      className={cn(
                        "px-4 py-3 rounded-2xl text-xs font-bold transition-all border",
                        selectedServices.includes(service)
                          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                          : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40">Company Name</label>
                <input
                  type="text"
                  placeholder="Your Company Name..."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40">Target Audience</label>
                <input
                  type="text"
                  placeholder="e.g., Fintech Startups, Enterprise CTOs..."
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40">Brand Tones</label>
                <div className="flex flex-wrap gap-3">
                  {tones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => toggleTone(tone.id)}
                      className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition-all border",
                        selectedTones.includes(tone.id)
                          ? "bg-white text-black border-white" 
                          : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                      )}
                    >
                      <span>{tone.icon}</span> {tone.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateCopy}
                disabled={isGenerating || !targetAudience.trim() || selectedServices.length === 0 || selectedTones.length === 0}
                className="w-full py-6 bg-white text-black rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isGenerating ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Generate Marketing Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative lg:sticky lg:top-32">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl opacity-50" />
            <div className="relative glass rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-white/5 px-8 py-4 border-bottom border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-white/40" />
                  <span className="text-[10px] uppercase tracking-widest font-black text-white/40">Output Terminal</span>
                </div>
                <div className="flex items-center gap-2">
                  {generatedCopy && (
                    <>
                      <button
                        onClick={generateCopy}
                        disabled={isGenerating}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white disabled:opacity-50"
                        title="Regenerate copy"
                      >
                        <RefreshCw className={cn("w-4 h-4", isGenerating && "animate-spin")} />
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/40" />}
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="p-12 min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-8"
                    >
                      <div className="space-y-4">
                        <div className="h-8 w-2/3 bg-white/5 rounded-lg animate-pulse" />
                        <div className="space-y-3">
                          <div className="h-4 w-full bg-white/5 rounded-lg animate-pulse" />
                          <div className="h-4 w-full bg-white/5 rounded-lg animate-pulse" />
                          <div className="h-4 w-4/5 bg-white/5 rounded-lg animate-pulse" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-white/20 font-mono text-[10px] uppercase tracking-widest">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>Aron is crafting your strategy...</span>
                      </div>
                    </motion.div>
                  ) : generatedCopy ? (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2">
                        <div className="text-[10px] uppercase tracking-widest font-black text-blue-400">Headline</div>
                        <h3 className="text-3xl font-display font-bold leading-tight">
                          {generatedCopy.split('Body:')[0].replace('Headline:', '').trim()}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <div className="text-[10px] uppercase tracking-widest font-black text-purple-400">Body Copy</div>
                        <p className="text-xl text-brand-muted leading-relaxed">
                          {generatedCopy.split('Body:')[1]?.trim()}
                        </p>
                      </div>

                      <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                        <button
                          onClick={generateCopy}
                          disabled={isGenerating}
                          className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold transition-all disabled:opacity-50"
                        >
                          <RefreshCw className={cn("w-3 h-3", isGenerating && "animate-spin")} />
                          {isGenerating ? 'Regenerating...' : 'Regenerate'}
                        </button>
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold transition-all"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3 h-3 text-green-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Copy
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-6"
                    >
                      <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto">
                        <Sparkles className="w-10 h-10 text-white/10" />
                      </div>
                      <p className="text-brand-muted font-mono text-sm uppercase tracking-widest">
                        Waiting for input parameters...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="bg-white/5 px-8 py-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-[9px] font-mono text-white/20 uppercase tracking-tighter">
                  <span>Status: Ready</span>
                  <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                  <span>Engine: Gemini-3-Flash</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
