import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { projects } from '@/src/data/portfolio';

export default function PortfolioPage() {
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
              Our Work
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6">
              PROJECT <span className="text-white/20 italic">PORTFOLIO</span>
            </h1>
            <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto">
              Real results from real projects. Here's a showcase of the engineering work that defines our standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <Link
                  to={`/portfolio/${project.id}`}
                  className="group block rounded-[28px] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                >
                  {/* Cover */}
                  <div className={cn("h-48 bg-gradient-to-br relative overflow-hidden", project.color)}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] group-hover:opacity-100 opacity-0 transition-opacity"
                    />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm text-[10px] font-bold text-white/70">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm text-[10px] font-bold text-white/50">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">
                        {project.category}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/20">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-white transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-white transition-colors">
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              Want to be our next <span className="text-white/20 italic">success story?</span>
            </h2>
            <p className="text-brand-muted text-lg mb-10 max-w-xl mx-auto">
              Let's build something extraordinary together.
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
