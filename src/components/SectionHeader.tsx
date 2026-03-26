import { motion } from 'motion/react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  label?: string;
  center?: boolean;
}

export default function SectionHeader({ title, subtitle, label, center = false }: SectionHeaderProps) {
  return (
    <div className={center ? "text-center mb-20" : "flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={center ? "max-w-3xl mx-auto" : "max-w-2xl"}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
          {title}
        </h2>
        <p className="text-brand-muted text-lg">{subtitle}</p>
      </motion.div>
      {label && !center && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-brand-muted font-mono text-sm tracking-widest"
        >
          {label}
        </motion.div>
      )}
    </div>
  );
}
