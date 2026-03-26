import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { trackEvent } from '@/src/lib/analytics';
import { services, type Service } from '@/src/data/constants';

interface ServicesSectionProps {
  onContactOpen: () => void;
}

export default function ServicesSection({ onContactOpen }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <section id="services" className="py-20 md:py-32 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">CORE SERVICES</h2>
              <p className="text-brand-muted text-lg">
                We provide a comprehensive suite of technology services designed to
                accelerate digital transformation for modern enterprises.
              </p>
            </div>
            <div className="text-brand-muted font-mono text-sm tracking-widest">
              [ 01 / SERVICES ]
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                layoutId={`service-card-${service.id}`}
                onClick={() => setSelectedService(service)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5
                    }
                  },
                  hover: {
                    y: -8,
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }
                }}
                whileHover="hover"
                className="p-8 glass-panel rounded-3xl group cursor-pointer transition-all duration-500 hover:border-[rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
              >
                <motion.div
                  layoutId={`service-icon-${service.id}`}
                  variants={{
                    hidden: { opacity: 0, scale: 0.5, y: 15 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1
                      }
                    },
                    hover: {
                      scale: 1.1,
                      rotate: 5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }
                  }}
                  className="w-12 h-12 bg-[rgba(255,255,255,0.05)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300"
                >
                  <service.icon className="w-6 h-6" />
                </motion.div>
                <motion.h3
                  layoutId={`service-title-${service.id}`}
                  variants={{
                    hover: {
                      scale: 1.05,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }
                  }}
                  className="text-xl font-bold mb-4 origin-left group-hover:text-white transition-colors duration-300"
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  layoutId={`service-desc-${service.id}`}
                  variants={{
                    hover: {
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }
                  }}
                  className="text-brand-muted text-sm leading-relaxed mb-6 origin-left group-hover:text-white/80 transition-colors duration-300"
                >
                  {service.description}
                </motion.p>

                <motion.div layoutId={`service-tags-${service.id}`} className="flex flex-wrap gap-2">
                  {service.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] uppercase tracking-wider font-bold text-white/60">
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expanded Service View */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] cursor-zoom-out"
            />
            <motion.div
              layoutId={`service-card-${selectedService.id}`}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-brand-bg z-[101] rounded-[40px] overflow-hidden border border-[rgba(255,255,255,0.1)] flex flex-col shadow-2xl"
            >
              <div className="flex-1 overflow-y-auto p-8 md:p-16 lg:p-24 custom-scrollbar">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center justify-between mb-16">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Back to Services
                    </button>
                    <div className="text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase hidden md:block">
                      Service Specification // {selectedService.id}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Column: Identity & Context */}
                    <div className="lg:col-span-5 space-y-12">
                      <div className="space-y-8">
                        <motion.div
                          layoutId={`service-icon-${selectedService.id}`}
                          className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.15)]"
                        >
                          <selectedService.icon className="w-12 h-12 text-black" />
                        </motion.div>

                        <div className="space-y-6">
                          <motion.div
                            layoutId={`service-tags-${selectedService.id}`}
                            className="flex flex-wrap gap-2"
                          >
                            {selectedService.tags.map((tag, idx) => (
                              <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-black text-white/50">
                                {tag}
                              </span>
                            ))}
                          </motion.div>

                          <motion.h3
                            layoutId={`service-title-${selectedService.id}`}
                            className="text-5xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter"
                          >
                            {selectedService.title.split(' ').map((word, i) => (
                              <span key={i} className={i % 2 === 1 ? "text-white/30 italic block" : "block"}>
                                {word}
                              </span>
                            ))}
                          </motion.h3>
                        </div>
                      </div>

                      <motion.div
                        layoutId={`service-desc-${selectedService.id}`}
                        className="space-y-8"
                      >
                        <p className="text-2xl text-brand-muted leading-relaxed font-light">
                          {selectedService.longDescription}
                        </p>

                        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-6">
                          <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">
                            Our Strategic Approach
                          </h4>
                          <ul className="space-y-6">
                            {[
                              { id: '01', title: 'Strategic Discovery', desc: 'Deep dive into business goals and technical constraints.' },
                              { id: '02', title: 'Architectural Design', desc: 'Crafting resilient, scalable system blueprints.' },
                              { id: '03', title: 'Agile Execution', desc: 'Continuous integration and rapid deployment cycles.' }
                            ].map((step) => (
                              <li key={step.id} className="flex gap-4">
                                <span className="text-blue-400 font-mono text-xs mt-1">{step.id}.</span>
                                <div className="space-y-1">
                                  <div className="text-sm font-bold text-white">{step.title}</div>
                                  <div className="text-xs text-brand-muted leading-relaxed">{step.desc}</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column: Features & CTA */}
                    <div className="lg:col-span-7 space-y-16">
                      <div className="space-y-10">
                        <div className="flex items-center gap-4">
                          <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 whitespace-nowrap">
                            Core Capabilities
                          </h4>
                          <div className="h-px w-full bg-white/10" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedService.features.map((feature, idx) => (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * idx }}
                              key={idx}
                              className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500"
                            >
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <span className="text-white font-bold text-sm block mb-2">{feature}</span>
                              <p className="text-[11px] text-brand-muted leading-relaxed">
                                Enterprise-grade implementation focused on reliability and performance.
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="relative p-12 rounded-[40px] bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        <div className="relative z-10 space-y-6">
                          <h4 className="text-3xl font-display font-bold text-white leading-tight">
                            Ready to build the <br />
                            <span className="italic opacity-70">future together?</span>
                          </h4>
                          <p className="text-white/80 text-sm max-w-md leading-relaxed">
                            Let's discuss how our {selectedService.title.toLowerCase()} expertise can transform your digital landscape.
                          </p>
                          <div className="flex flex-wrap gap-4 pt-4">
                            <button
                              onClick={() => {
                                trackEvent('button_click', { button: 'Start Project', location: 'service_modal', service: selectedService.title });
                                setSelectedService(null);
                                onContactOpen();
                              }}
                              className="px-8 py-4 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
                            >
                              Start Project <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setSelectedService(null)}
                              className="px-8 py-4 bg-black/20 backdrop-blur-md border border-white/20 rounded-full font-bold text-sm hover:bg-black/40 transition-all"
                            >
                              Close Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
