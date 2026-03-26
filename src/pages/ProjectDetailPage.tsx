import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { projects } from '@/src/data/portfolio';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className={cn("absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 bg-gradient-to-br", project.color)} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">
                  {project.category}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/20">
                  {project.year}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6">
                {project.name}
              </h1>
              <p className="text-xl text-brand-muted leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={cn("h-64 lg:h-auto rounded-[32px] bg-gradient-to-br", project.color)}
            />
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-[32px] p-8 md:p-12 border border-white/5"
            >
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-6">
                The Challenge
              </h2>
              <p className="text-brand-muted leading-relaxed text-lg">
                {project.challenge}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel rounded-[32px] p-8 md:p-12 border border-white/5"
            >
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-6">
                Our Solution
              </h2>
              <p className="text-brand-muted leading-relaxed text-lg">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-12">
            Results & Impact
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {project.results.map((result, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-lg font-medium">{result}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-8">
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white/70"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-[40px] p-12 md:p-16 border border-white/10 text-center"
          >
            <p className="text-2xl md:text-3xl font-display font-medium leading-tight mb-8 italic text-white/90">
              "{project.testimonial.quote}"
            </p>
            <div className="text-brand-muted">
              <span className="font-bold text-white">{project.testimonial.author}</span>
              <span className="mx-2">—</span>
              <span className="text-sm uppercase tracking-widest">{project.testimonial.role}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
