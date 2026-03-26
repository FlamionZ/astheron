import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Play, Loader2, Download, AlertCircle, Sparkles, CheckCircle2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '@/src/lib/utils';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [hasKey, setHasKey] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isWatermarking, setIsWatermarking] = useState(false);
  const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 92) return prev;
          return prev + 2;
        });
      }, 1000);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
      setWatermarkedUrl(null); // Reset watermarked video if logo changes
    }
  };

  const applyWatermark = async () => {
    if (!videoUrl || !logoUrl || !videoRef.current) return;
    
    setIsWatermarking(true);
    setStatus('Applying Brand Watermark...');
    
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const logo = new Image();
    logo.src = logoUrl;
    
    await new Promise((resolve) => { logo.onload = resolve; });

    // Set canvas size to match video
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setWatermarkedUrl(url);
      setIsWatermarking(false);
      setStatus('Watermark Applied Successfully!');
    };

    recorder.start();
    video.currentTime = 0;
    await video.play();

    const drawFrame = () => {
      if (video.paused || video.ended) {
        recorder.stop();
        return;
      }

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Draw logo in bottom right
        const logoWidth = canvas.width * 0.15;
        const logoHeight = (logo.height / logo.width) * logoWidth;
        const padding = 40;
        ctx.globalAlpha = 0.7;
        ctx.drawImage(
          logo, 
          canvas.width - logoWidth - padding, 
          canvas.height - logoHeight - padding, 
          logoWidth, 
          logoHeight
        );
        ctx.globalAlpha = 1.0;
      }
      
      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  };

  const generateVideo = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setStatus('Initializing AI Model...');

    try {
      // Create a new instance right before the call to ensure fresh API key
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
      setStatus('Analyzing Prompt & Scene Context...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus('Submitting Request to Veo 3.1 Engine...');
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      const processingSteps = [
        'Rendering Video Frames...',
        'Applying Cinematic Lighting...',
        'Enhancing Texture Details...',
        'Optimizing Motion Vectors...',
        'Refining Scene Transitions...'
      ];
      let stepIndex = 0;

      setStatus(processingSteps[0]);
      
      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        // Cycle through processing steps to show activity
        stepIndex = (stepIndex + 1) % processingSteps.length;
        setStatus(processingSteps[stepIndex]);
        
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      if (operation.response?.generatedVideos?.[0]?.video?.uri) {
        setStatus('Synchronizing Audio & Visuals...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setStatus('Finalizing Output & Encoding...');
        const downloadLink = operation.response.generatedVideos[0].video.uri;
        
        // Fetch the video with the API key header
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY,
          },
        });

        if (!response.ok) throw new Error('Failed to download generated video.');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setStatus('Video Generation Successful!');
      } else {
        throw new Error('No video was generated. Please try a different prompt.');
      }
    } catch (err: any) {
      console.error('Video generation error:', err);
      if (err.message?.includes('Requested entity was not found')) {
        setError('API Key session expired. Please re-select your key.');
        setHasKey(false);
      } else {
        setError(err.message || 'An unexpected error occurred during generation.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="video-gen" className="py-20 md:py-32 px-4 md:px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest font-bold mb-6">
              <Sparkles className="w-3 h-3 text-white" />
              New Feature: AI Video Engine
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">BRING YOUR IDEAS TO LIFE.</h2>
            <p className="text-brand-muted text-lg mb-10">
              Harness the power of Veo 3.1 to generate high-quality promotional 
              videos and product showcases directly from text. Experience the 
              next frontier of digital content creation.
            </p>

            {!hasKey ? (
              <div className="glass-panel p-8 rounded-[32px] border border-white/10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">API Key Required</h4>
                    <p className="text-brand-muted text-sm leading-relaxed">
                      To use the video generation engine, you must select a paid 
                      Google Cloud API key. This ensures high-performance 
                      processing for your cinematic requests.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSelectKey}
                  className="w-full py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                >
                  Select API Key
                </button>
                <p className="mt-4 text-[10px] text-center text-white/30 uppercase tracking-widest">
                  Requires a paid Google Cloud project. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">Learn more</a>
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                    placeholder="Describe your promotional video (e.g., 'A cinematic drone shot of a futuristic data center with glowing blue lights...')"
                    className={cn(
                      "w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 text-lg focus:outline-none focus:border-white/30 transition-all resize-none",
                      isGenerating && "opacity-50 cursor-not-allowed"
                    )}
                  />
                  <div className="absolute bottom-4 right-4 text-[10px] text-white/20 uppercase tracking-widest font-bold">
                    Veo 3.1 Fast Engine
                  </div>
                </div>
                
                {/* Logo Upload Section */}
                <div className="glass-panel p-6 rounded-[32px] border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-white/60" />
                      <span className="text-sm font-bold uppercase tracking-widest">Brand Watermark</span>
                    </div>
                    {logoUrl && (
                      <button 
                        onClick={() => { setLogoUrl(null); setWatermarkedUrl(null); }}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {!logoUrl ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 text-white/20 group-hover:text-white/40 mb-2 transition-colors" />
                        <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Upload Logo</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </label>
                  ) : (
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/20 flex items-center justify-center">
                        <img src={logoUrl} alt="Brand Logo" className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest mb-1">Logo Ready</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Will be applied to generated video</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                  )}
                </div>
                
                <button
                  onClick={generateVideo}
                  disabled={isGenerating || !prompt.trim()}
                  className={cn(
                    "w-full py-5 rounded-full font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden shadow-xl",
                    isGenerating ? "bg-white/10 text-white" : "bg-white text-black hover:bg-white/90 active:scale-[0.98]"
                  )}
                >
                  {isGenerating && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {isGenerating ? (
                    <>
                      <div className="relative flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="tracking-wide">GENERATING CINEMATIC CONTENT...</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5" />
                      <span className="tracking-wide">GENERATE VIDEO</span>
                    </>
                  )}
                </button>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {error}
                  </motion.div>
                )}
              </div>
            )}
          </div>

          <div className="relative aspect-video rounded-[40px] overflow-hidden glass-panel border border-white/10 flex items-center justify-center group">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="loading"
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center p-10"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-white/5 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-t-4 border-white animate-spin" />
                    <Video className="w-10 h-10 text-white/40" />
                  </div>
                  <h4 className="text-2xl font-display font-bold mb-3 tracking-tight">CRAFTING YOUR VISION</h4>
                  <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <p className="text-brand-muted text-sm font-medium uppercase tracking-widest">{status}</p>
                  </div>
                  
                  <div className="w-full max-w-sm mx-auto space-y-4">
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-black">
                      <span className="text-white/20">Processing Engine</span>
                      <span className="text-white/60">{Math.round(progress)}% Complete</span>
                    </div>
                  </div>
                </motion.div>
              ) : videoUrl ? (
                <motion.div 
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full relative"
                >
                  <video 
                    ref={videoRef}
                    src={videoUrl} 
                    controls 
                    aria-label="Generated AI video preview"
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    crossOrigin="anonymous"
                  />
                  
                  {/* Visual Watermark Preview */}
                  {logoUrl && !watermarkedUrl && (
                    <div className="absolute bottom-10 right-10 w-24 opacity-50 pointer-events-none">
                      <img src={logoUrl} alt="Watermark Preview" className="w-full h-auto object-contain" />
                    </div>
                  )}

                  <div className="absolute bottom-6 right-6 flex gap-2">
                    {logoUrl && !watermarkedUrl && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={applyWatermark}
                        disabled={isWatermarking}
                        className="px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2 shadow-2xl disabled:opacity-50"
                      >
                        {isWatermarking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        {isWatermarking ? 'Watermarking...' : 'Apply Watermark'}
                      </motion.button>
                    )}

                    <motion.a 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={watermarkedUrl || videoUrl} 
                      download={watermarkedUrl ? "astheron-promo-branded.webm" : "astheron-promo.mp4"}
                      className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all flex items-center gap-2 shadow-2xl"
                      aria-label="Download generated video"
                    >
                      <Download className="w-4 h-4" />
                      {watermarkedUrl ? 'Download Branded' : 'Download Video'}
                    </motion.a>
                  </div>
                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Ready
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-10"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Play className="w-8 h-8 text-white/40" aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-display font-bold mb-2 text-white/60">PREVIEW ENGINE</h4>
                  <p className="text-brand-muted text-sm max-w-xs mx-auto">
                    Your generated video will appear here. Describe your vision 
                    to the left to begin.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Visual Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[20px] border-transparent group-hover:border-white/5 transition-all duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
