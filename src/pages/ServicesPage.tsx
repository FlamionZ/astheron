import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { services } from '@/src/data/constants';

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest font-bold mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Our Expertise
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6">
              WHAT WE <span className="text-white/20 italic">BUILD</span>
            </h1>
            <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto">
              Full-stack engineering for enterprises that demand excellence.
              From concept to deployment, we deliver solutions that scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="space-y-8"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <Link
                  to={`/services/${service.id}`}
                  className="group block glass-panel rounded-[32px] p-8 md:p-12 border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.05)]"
                >
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                    <div className="flex items-start gap-6 lg:w-1/3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300"
                      >
                        <service.icon className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30 mb-2">
                          0{i + 1}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold group-hover:text-white transition-colors">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                    <div className="lg:w-1/3">
                      <p className="text-brand-muted leading-relaxed">
                        {service.longDescription.slice(0, 200)}...
                      </p>
                    </div>
                    <div className="lg:w-1/3 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, j) => (
                          <span key={j} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-[40px] p-12 md:p-20 border border-white/10"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Ready to start <span className="text-white/20 italic">building?</span>
            </h2>
            <p className="text-brand-muted text-lg mb-10 max-w-xl mx-auto">
              Let's discuss how our engineering expertise can accelerate your digital transformation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
