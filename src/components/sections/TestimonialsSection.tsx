import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { testimonials } from '@/src/data/constants';

function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          role="group"
          aria-roledescription="testimonial"
          aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-12 rounded-[40px] border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div
              key={index}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-white/20"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center font-display font-black text-2xl shrink-0 shadow-2xl">
              {testimonials[index].avatar}
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-display font-medium leading-tight mb-8 italic text-white/90">
                "{testimonials[index].quote}"
              </p>
              <div className="flex flex-col">
                <span className="font-bold text-lg">{testimonials[index].author}</span>
                <span className="text-brand-muted text-sm uppercase tracking-widest font-bold">
                  {testimonials[index].title} — {testimonials[index].company}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-12 flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === i ? "bg-white w-8" : "bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">CLIENT VOICES</h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what industry leaders
            say about their experience with Astheron.
          </p>
        </div>

        <div className="relative h-[400px] md:h-[300px] flex items-center justify-center">
          <TestimonialSlider />
        </div>
      </div>
    </section>
  );
}
