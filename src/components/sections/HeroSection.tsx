import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/src/lib/analytics';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center px-4 md:px-6 overflow-hidden">
      {/* Animated background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {/* Radial glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />

        {/* Animated grid lines */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-[15%] right-[15%] w-2 h-2 rounded-full bg-white/30"
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[60%] right-[25%] w-1.5 h-1.5 rounded-full bg-white/20"
          animate={{ y: [15, -15, 15], x: [5, -10, 5], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-[30%] right-[40%] w-1 h-1 rounded-full bg-white/25"
          animate={{ y: [-10, 25, -10], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Diagonal accent line */}
        <motion.div
          className="absolute top-0 right-[30%] w-px h-[200%] bg-gradient-to-b from-transparent via-white/[0.07] to-transparent origin-top"
          style={{ transform: 'rotate(15deg)' }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-0 right-[60%] w-px h-[200%] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent origin-top"
          style={{ transform: 'rotate(15deg)' }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div className="max-w-7xl mx-auto relative w-full" style={{ opacity }}>
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] font-bold mb-10"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Pioneering the Future of Tech
          </motion.div>

          {/* Heading — letter by letter stagger */}
          <div className="mb-10">
            {["ENGINEERING", "INTELLIGENT", "SYSTEMS."].map((word, wordIdx) => (
              <div key={wordIdx} className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%', rotateX: 40 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + wordIdx * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-5xl md:text-8xl lg:text-[120px] font-display font-bold leading-[0.9] tracking-tighter text-gradient-animated"
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Subtitle — line reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative mb-14 max-w-2xl"
          >
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-brand-bg origin-right z-10"
            />
            <p className="text-lg md:text-2xl text-brand-muted leading-relaxed font-light">
              Astheron Technologies delivers enterprise-grade software solutions,
              advanced AI integrations, and cutting-edge cybersecurity tools.
            </p>
          </motion.div>

          {/* CTA Buttons — staggered slide up */}
          <div className="flex flex-wrap gap-4">
            {[
              {
                label: 'Get Started',
                icon: ArrowRight,
                className: 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]',
                to: '/contact',
                delay: 1.4,
              },
              {
                label: 'View Products',
                icon: null,
                className: 'glass-panel border border-white/10 hover:bg-white/10',
                onClick: () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }),
                delay: 1.55,
              },
              {
                label: 'Cybersecurity',
                icon: Shield,
                className: 'bg-white/[0.03] border border-white/10 hover:bg-white/10',
                to: '/services',
                delay: 1.7,
              },
            ].map((btn) => (
              <motion.div
                key={btn.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: btn.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                {btn.to ? (
                  <Link to={btn.to}>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => trackEvent('button_click', { button: btn.label, location: 'hero' })}
                      className={`px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 text-sm uppercase tracking-wider cursor-pointer ${btn.className}`}
                    >
                      {btn.icon && <btn.icon className="w-4 h-4" />}
                      {btn.label}
                      {btn.label === 'Get Started' && <ArrowRight className="w-4 h-4" />}
                    </motion.div>
                  </Link>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      trackEvent('button_click', { button: btn.label, location: 'hero' });
                      btn.onClick?.();
                    }}
                    className={`px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 text-sm uppercase tracking-wider ${btn.className}`}
                  >
                    {btn.label}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
