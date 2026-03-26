import { motion } from 'motion/react';
import SectionHeader from '../SectionHeader';

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "Go", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "GCP", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "PyTorch", category: "AI/ML" },
  { name: "Flutter", category: "Mobile" },
  { name: "Kafka", category: "Infrastructure" },
];

export default function TechStack() {
  return (
    <section className="py-20 md:py-32 px-6 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="OUR TECH STACK"
          subtitle="We use best-in-class tools and frameworks to build solutions that scale and perform."
          center
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.3)",
              }}
              className="group relative px-5 py-3 rounded-full bg-white/[0.03] border border-white/[0.06] cursor-default transition-all duration-300"
            >
              <span className="font-bold text-sm text-white/60 group-hover:text-white transition-colors">
                {tech.name}
              </span>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-white/10 text-[9px] uppercase tracking-widest font-bold text-white/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
