import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Counter from '@/src/components/Counter';
import { teamMembers, companyTimeline, companyValues } from '@/src/data/team';

export default function AboutPage() {
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
              Our Story
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6">
              WE ARE <span className="text-white/20 italic">ASTHERON</span>
            </h1>
            <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto">
              A collective of engineers, designers, and visionaries dedicated to building the next generation of digital infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 120, suffix: "+", label: "Projects Delivered" },
              { value: 99, suffix: "%", label: "Client Satisfaction" },
              { value: 20, suffix: "+", label: "Team Members" },
              { value: 5, suffix: "+", label: "Years of Innovation" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel rounded-[24px] p-8 border border-white/5 text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold mb-2 flex items-baseline justify-center">
                  <Counter value={stat.value} />
                  <span className="text-white/40 ml-1">{stat.suffix}</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel rounded-[24px] p-8 border border-white/5 hover:border-white/20 transition-all duration-500"
              >
                <div className="text-3xl font-display font-bold text-white/10 mb-4">0{i + 1}</div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">THE TEAM</h2>
            <p className="text-brand-muted text-lg max-w-2xl mx-auto">
              Meet the engineers and leaders behind Astheron Technologies.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group glass-panel rounded-[28px] p-8 border border-white/5 hover:border-white/20 transition-all duration-500 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center font-display font-black text-2xl mx-auto mb-6 shadow-2xl"
                >
                  {member.avatar}
                </motion.div>
                <h3 className="text-xl font-display font-bold mb-1">{member.name}</h3>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-4">
                  {member.role}
                </div>
                <p className="text-brand-muted text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, j) => (
                    <span key={j} className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-white/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-12 text-center">
            Our Journey
          </h2>
          <div className="space-y-0">
            {companyTimeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 items-start"
              >
                <div className="shrink-0 w-16 text-right">
                  <span className="text-2xl font-display font-bold text-white/20">{item.year}</span>
                </div>
                <div className="relative pb-12">
                  <div className="absolute left-0 top-3 w-3 h-3 rounded-full bg-white/20 border-2 border-white/40" />
                  {i < companyTimeline.length - 1 && (
                    <div className="absolute left-[5px] top-6 w-px h-full bg-white/10" />
                  )}
                  <div className="pl-8">
                    <h3 className="font-bold text-lg mb-1">{item.event}</h3>
                    <p className="text-brand-muted text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Want to join <span className="text-white/20 italic">our team?</span>
            </h2>
            <p className="text-brand-muted text-lg mb-10 max-w-xl mx-auto">
              We're always looking for talented engineers and designers who share our passion.
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform"
            >
              View Open Positions <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
