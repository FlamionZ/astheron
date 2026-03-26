import { motion } from 'motion/react';
import { Search, Compass, Code2, Rocket } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your business goals, technical constraints, and user needs to define the perfect scope.",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy",
    description: "Our architects design the system blueprint — choosing the right stack, patterns, and infrastructure for your scale.",
    icon: Compass,
  },
  {
    number: "03",
    title: "Build",
    description: "Agile sprints with continuous delivery. You see progress every week with working demos and transparent updates.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Launch",
    description: "Rigorous testing, performance optimization, and a smooth deployment. We stay on for monitoring and support.",
    icon: Rocket,
  }
];

export default function HowWeWork() {
  return (
    <section className="py-20 md:py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="HOW WE WORK"
          subtitle="A proven process that turns complex challenges into elegant, scalable solutions."
          label="[ 05 / PROCESS ]"
        />

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="relative group"
              >
                <div className="glass-panel rounded-[28px] p-8 border border-white/5 hover:border-white/20 transition-all duration-500 h-full">
                  {/* Step number */}
                  <div className="text-6xl font-display font-bold text-white/[0.04] absolute top-4 right-6">
                    {step.number}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300"
                  >
                    <step.icon className="w-7 h-7" />
                  </motion.div>

                  <div className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30 mb-2">
                    Step {step.number}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Connector dot */}
                <div className="hidden lg:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
