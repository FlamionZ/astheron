import { motion } from 'motion/react';
import { Shield, Zap, CheckCircle2 } from 'lucide-react';
import Counter from '../Counter';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square rounded-[60px] bg-[#0a0a0a] border border-white/5 p-4">
              <div className="w-full h-full rounded-[40px] bg-[#141414] flex items-center justify-center">
                <img src="/logo (1).png" alt="Astheron" className="w-32 h-32" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="absolute -bottom-12 -right-12 w-80 bg-gradient-to-b from-[#2a2a2a] to-[#111111] rounded-[40px] p-8 hidden md:flex flex-col gap-6 shadow-2xl border border-white/10"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                className="space-y-6"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="cursor-default"
                >
                  <div className="text-4xl font-display font-bold mb-2 flex items-baseline">
                    <Counter value={120} />
                    <span className="text-white/40 ml-1">+</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-black text-white/60">
                    Projects Delivered
                  </div>
                </motion.div>

                <div className="h-px bg-white/10 w-full" />

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="cursor-default"
                >
                  <div className="text-4xl font-display font-bold mb-2 flex items-baseline">
                    <Counter value={99} />
                    <span className="text-white/40 ml-1">%</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-black text-white/60">
                    Client Satisfaction
                  </div>
                </motion.div>
              </motion.div>

              {/* Subtle Progress Bar */}
              <div className="pt-2">
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "94%" }}
                    transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                    className="h-full bg-white"
                  />
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-[8px] text-white/40 font-mono tracking-tighter uppercase">System Status: Optimal</span>
                  <span className="text-[8px] text-white/60 font-mono font-bold">94%</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">WE ARE ASTHERON.</h2>
            <div className="space-y-6 mb-10">
              <p className="text-xl text-brand-muted leading-relaxed">
                Astheron Technologies is a collective of engineers, designers, and visionaries dedicated to building the next generation of digital infrastructure.
              </p>
              <ul className="space-y-4 text-lg text-brand-muted">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-white/40 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Innovation-Driven:</strong> We push the boundaries of what's possible in tech.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-white/40 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Technical Excellence:</strong> Delivering robust, scalable, and secure solutions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-white/40 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Future-Ready:</strong> Building the foundation for tomorrow's digital landscape.</span>
                </li>
              </ul>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="space-y-6"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex gap-4"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: { type: "spring", stiffness: 200, damping: 15 }
                    }
                  }}
                  className="w-12 h-12 shrink-0 glass-panel rounded-xl flex items-center justify-center"
                >
                  <Shield className="w-5 h-5" />
                </motion.div>
                <div>
                  <h4 className="font-bold mb-1">Security First</h4>
                  <p className="text-brand-muted text-sm">Every line of code we write is audited for security and performance.</p>
                </div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex gap-4"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: { type: "spring", stiffness: 200, damping: 15 }
                    }
                  }}
                  className="w-12 h-12 shrink-0 glass-panel rounded-xl flex items-center justify-center"
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
                <div>
                  <h4 className="font-bold mb-1">Rapid Innovation</h4>
                  <p className="text-brand-muted text-sm">We leverage the latest in AI and cloud tech to deliver results faster.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
