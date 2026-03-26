import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '@/src/data/constants';

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const service = services.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.15)] mb-8"
              >
                <service.icon className="w-12 h-12 text-black" />
              </motion.div>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-black text-white/50">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
                {service.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? "text-white/30 italic block" : "block"}>
                    {word}
                  </span>
                ))}
              </h1>

              <p className="text-xl text-brand-muted leading-relaxed">
                {service.longDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Approach */}
              <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">
                  Our Strategic Approach
                </h3>
                <p className="text-brand-muted leading-relaxed">
                  {service.approach}
                </p>
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
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 whitespace-nowrap">
              Core Capabilities
            </h2>
            <div className="h-px w-full bg-white/10" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
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
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 md:p-16 rounded-[40px] bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10 space-y-6 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                Ready to build the <br />
                <span className="italic opacity-70">future together?</span>
              </h2>
              <p className="text-white/80 text-sm max-w-md mx-auto leading-relaxed">
                Let's discuss how our {service.title.toLowerCase()} expertise can transform your digital landscape.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
                >
                  Start Project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 bg-black/20 backdrop-blur-md border border-white/20 rounded-full font-bold text-sm hover:bg-black/40 transition-all"
                >
                  All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
