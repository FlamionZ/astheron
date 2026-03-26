import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, MapPin, Clock, Briefcase } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { jobListings, companyPerks } from '@/src/data/careers';

function JobCard({ job }: { job: typeof jobListings[number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="glass-panel rounded-[28px] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-8 flex items-center justify-between text-left"
      >
        <div className="flex-1">
          <h3 className="text-xl font-display font-bold mb-2">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-brand-muted">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" /> {job.department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {job.type}
            </span>
          </div>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-white/40 transition-transform duration-300 shrink-0 ml-4", expanded && "rotate-180")} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 space-y-6 border-t border-white/5 pt-6">
              <p className="text-brand-muted leading-relaxed">{job.description}</p>

              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 mb-4">Requirements</h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-brand-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0 mt-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 mb-4">Nice to Have</h4>
                <ul className="space-y-2">
                  {job.niceToHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15 shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CareersPage() {
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
              We're Hiring
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6">
              JOIN THE <span className="text-white/20 italic">FUTURE</span>
            </h1>
            <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto">
              Build what's next with Astheron Technologies. We're looking for talented engineers and designers who want to make an impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {companyPerks.map((perk, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="glass-panel rounded-[20px] p-6 border border-white/5 text-center hover:border-white/20 transition-all duration-500"
              >
                <div className="text-2xl font-display font-bold mb-2">{perk.stat}</div>
                <div className="text-[10px] uppercase tracking-[0.15em] font-black text-white/40 mb-2">
                  {perk.title}
                </div>
                <p className="text-[11px] text-white/30 leading-relaxed">{perk.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-12 text-center">
            Open Positions
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-4"
          >
            {jobListings.map((job) => (
              <motion.div
                key={job.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-[40px] p-12 md:p-20 border border-white/10"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Don't see your <span className="text-white/20 italic">role?</span>
            </h2>
            <p className="text-brand-muted text-lg mb-10 max-w-xl mx-auto">
              We're always open to meeting talented people. Send us your portfolio and tell us how you'd contribute.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
