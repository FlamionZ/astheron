import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X, BarChart3, Lightbulb, Target, ArrowRight, ArrowLeft, Quote, ExternalLink, Cpu, Terminal } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const caseStudies = [
  {
    id: 1,
    client: "Global Logistics Corp",
    title: "AI-Driven Route Optimization",
    category: "AI & Logistics",
    challenge: "Managing a fleet of 5,000+ vehicles with inefficient manual routing led to high fuel costs and delayed deliveries. The complexity of urban traffic patterns and variable delivery windows made manual planning obsolete.",
    solution: "Implemented a custom AI engine using real-time traffic data and predictive analytics to automate fleet dispatching. The system uses genetic algorithms to calculate optimal routes every 5 minutes.",
    results: "22% reduction in fuel consumption and 15% improvement in on-time delivery rates within the first 6 months.",
    process: [
      { step: "01", title: "Data Audit", desc: "Analyzed 2 years of historical delivery data to identify patterns." },
      { step: "02", title: "Model Training", desc: "Developed a custom neural network for traffic prediction." },
      { step: "03", title: "Integration", desc: "Seamlessly connected with existing GPS hardware." }
    ],
    techStack: ["Python", "TensorFlow", "Kubernetes", "PostgreSQL"],
    metrics: [
      { label: "Fuel Reduction", value: "22%" },
      { label: "On-time Delivery", value: "+15%" },
      { label: "Efficiency Gain", value: "30%" }
    ],
    color: "from-blue-600 to-indigo-600",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    quote: "Astheron's solution didn't just save us money; it transformed our entire operational culture."
  },
  {
    id: 2,
    client: "SecureBank International",
    title: "Zero-Trust Security Overhaul",
    category: "Cybersecurity",
    challenge: "Legacy security systems were vulnerable to sophisticated phishing and internal data leaks. The bank needed a system that could verify every request, regardless of origin, without impacting employee productivity.",
    solution: "Deployed a comprehensive Zero-Trust architecture with multi-factor biometric authentication and real-time threat monitoring. We integrated behavioral analytics to detect anomalies in user access patterns.",
    results: "Zero successful security breaches reported since implementation and a 40% reduction in security audit times.",
    process: [
      { step: "01", title: "Vulnerability Scan", desc: "Identified critical entry points in legacy infrastructure." },
      { step: "02", title: "Auth Protocol", desc: "Implemented biometric-first authentication layers." },
      { step: "03", title: "Monitoring", desc: "Deployed AI-driven anomaly detection for all traffic." }
    ],
    techStack: ["Rust", "Go", "AWS Nitro", "HashiCorp Vault"],
    metrics: [
      { label: "Breaches Prevented", value: "100%" },
      { label: "Audit Speed", value: "+40%" },
      { label: "User Adoption", value: "98%" }
    ],
    color: "from-red-600 to-orange-600",
    icon: Target,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    quote: "Security is now an enabler for our digital transformation, not a bottleneck."
  },
  {
    id: 3,
    client: "EcoStream Energy",
    title: "Smart Grid Management System",
    category: "System Architecture",
    challenge: "Difficulty in balancing energy load across a decentralized renewable energy grid. Fluctuating solar and wind inputs were causing instability in the local distribution network.",
    solution: "Developed a distributed system architecture that dynamically allocates power based on real-time demand and weather forecasts. The system uses edge computing to minimize latency in grid adjustments.",
    results: "18% increase in overall grid efficiency and significantly reduced peak-load brownouts.",
    process: [
      { step: "01", title: "Grid Mapping", desc: "Digitized the existing physical distribution network." },
      { step: "02", title: "Edge Deployment", desc: "Installed smart controllers at key distribution nodes." },
      { step: "03", title: "Load Balancing", desc: "Activated AI-driven dynamic power allocation." }
    ],
    techStack: ["C++", "MQTT", "InfluxDB", "React"],
    metrics: [
      { label: "Grid Efficiency", value: "+18%" },
      { label: "Brownouts Reduced", value: "95%" },
      { label: "Renewable Usage", value: "+25%" }
    ],
    color: "from-emerald-600 to-teal-600",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
    quote: "We are now leading the transition to a decentralized energy future thanks to Astheron."
  }
];

export default function CaseStudies() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const selectedStudy = caseStudies.find(s => s.id === selectedId);

  return (
    <section id="case-studies" className="py-32 px-6 border-t border-white/5 bg-brand-bg relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight leading-none">
                IMPACT <span className="text-white/20 italic">STUDIES</span>
              </h2>
              <p className="text-brand-muted text-lg max-w-xl">
                Deep dives into complex engineering challenges and the 
                measurable transformations we've delivered for our partners.
              </p>
            </motion.div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              layoutId={`card-${study.id}`}
              onClick={() => setSelectedId(study.id)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="min-w-[300px] md:min-w-[450px] aspect-[4/5] relative rounded-[32px] overflow-hidden cursor-pointer group snap-start border border-white/10 hover:border-white/30 transition-colors"
            >
              <motion.img 
                layoutId={`image-${study.id}`}
                src={study.image}
                alt={study.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <motion.div 
                  layoutId={`category-${study.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] uppercase tracking-[0.2em] font-black text-white mb-4 w-fit"
                >
                  <study.icon className="w-3 h-3" />
                  {study.category}
                </motion.div>
                <motion.h3 
                  layoutId={`title-${study.id}`}
                  className="text-2xl md:text-4xl font-display font-bold text-white mb-4 leading-tight"
                >
                  {study.title}
                </motion.h3>
                
                {/* Metrics Preview on Hover */}
                <div className="flex gap-4 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {study.metrics.slice(0, 2).map((metric, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-white font-bold text-lg leading-none">{metric.value}</span>
                      <span className="text-[8px] uppercase tracking-widest text-white/40">{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-white transition-colors">
                  View Case Study <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded View Overlay */}
      <AnimatePresence>
        {selectedId && selectedStudy && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] cursor-zoom-out"
            />
            <motion.div
              layoutId={`card-${selectedId}`}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-brand-bg z-[101] rounded-[40px] overflow-hidden border border-[rgba(255,255,255,0.1)] flex flex-col md:flex-row shadow-2xl"
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <motion.img 
                  layoutId={`image-${selectedId}`}
                  src={selectedStudy.image}
                  alt={selectedStudy.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:hidden" />
                
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 left-6 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-16 lg:p-20 custom-scrollbar">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="mb-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                  Back to Case Studies
                </button>
                <motion.div 
                  layoutId={`category-${selectedId}`}
                  className="text-[10px] uppercase tracking-[0.3em] font-black text-[rgba(255,255,255,0.4)] mb-4"
                >
                  {selectedStudy.category} — {selectedStudy.client}
                </motion.div>
                <motion.h3 
                  layoutId={`title-${selectedId}`}
                  className="text-4xl md:text-6xl font-display font-bold mb-12 leading-none"
                >
                  {selectedStudy.title}
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {selectedStudy.metrics.map((metric, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10">
                      <div className="text-3xl font-display font-bold mb-1">{metric.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 font-black">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-12 mb-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-black">
                        <Target className="w-3 h-3" /> The Challenge
                      </div>
                      <p className="text-brand-muted text-lg leading-relaxed">
                        {selectedStudy.challenge}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-black">
                        <Lightbulb className="w-3 h-3" /> Our Solution
                      </div>
                      <p className="text-brand-muted text-lg leading-relaxed">
                        {selectedStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Implementation Process */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-black">
                      <Cpu className="w-3 h-3" /> Implementation Process
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {selectedStudy.process?.map((p, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                          <div className="text-white/20 font-display font-black text-2xl mb-2">{p.step}</div>
                          <div className="text-white font-bold mb-1">{p.title}</div>
                          <div className="text-brand-muted text-xs leading-relaxed">{p.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-black">
                      <Terminal className="w-3 h-3" /> Technical Stack
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedStudy.techStack?.map((tech, idx) => (
                        <span key={idx} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-black">
                      <BarChart3 className="w-3 h-3" /> Measurable Results
                    </div>
                    <p className="text-white text-2xl font-display font-medium leading-relaxed">
                      {selectedStudy.results}
                    </p>
                  </div>
                </div>

                <div className="p-12 rounded-[40px] bg-white/5 border border-white/10 relative overflow-hidden mb-12">
                  <Quote className="absolute top-8 right-8 w-16 h-16 text-white/5" />
                  <p className="text-xl italic text-white/80 leading-relaxed mb-6 relative z-10">
                    "{selectedStudy.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10" />
                    <div>
                      <div className="text-sm font-bold">Chief Technical Officer</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">{selectedStudy.client}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold hover:bg-white hover:text-black transition-all flex items-center gap-2 group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    Back to Case Studies
                  </button>
                  <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all flex items-center gap-2">
                    Download Full PDF <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                    Visit Project <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
