import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { products } from '@/src/data/constants';
import TiltCard from '@/src/components/TiltCard';

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 md:py-32 px-4 md:px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">OUR PRODUCTS</h2>
            <p className="text-brand-muted text-lg">
              Proprietary solutions developed by Astheron to solve complex
              challenges in communication, security, and digital safety.
            </p>
          </div>
          <div className="text-brand-muted font-mono text-sm tracking-widest">
            [ 02 / PRODUCTS ]
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {products.map((product, i) => (
            <TiltCard key={i} className="h-full">
            <motion.div
              whileHover="hover"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5 }
                },
                hover: {
                  transition: { duration: 0.3 }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative p-8 md:p-10 rounded-[32px] overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-500 h-full"
            >
              {/* Parallax Background Gradient */}
              <motion.div
                variants={{
                  hover: {
                    scale: 1.2,
                    x: -20,
                    y: -20,
                    opacity: 0.9,
                    filter: "brightness(1.1)"
                  }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={cn("absolute inset-0 bg-gradient-to-br opacity-50", product.color)}
              />

              {/* Floating Radial Glow */}
              <motion.div
                variants={{
                  hover: {
                    scale: 1.5,
                    opacity: 1,
                    x: 20,
                    y: 20
                  }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)] opacity-0 pointer-events-none"
              />

              {/* Card Border */}
              <div className="absolute inset-0 border border-white/10 rounded-[40px] group-hover:border-white/30 transition-colors duration-500" />

              {/* Main Content with Lifting Effect */}
              <motion.div
                variants={{
                  hover: { y: -20, scale: 1.05 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2
                      }
                    },
                    hover: {
                      scale: 1.1,
                      rotate: 5,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }
                  }}
                  className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center mb-8 shadow-2xl"
                >
                  <product.icon className="w-8 h-8" />
                </motion.div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-2">
                  {product.category}
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">{product.name}</h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  {product.description}
                </p>
                <motion.button
                  variants={{
                    hover: {
                      scale: [1, 1.05, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }
                  }}
                  whileHover="hover"
                  className="flex items-center gap-2 text-sm font-bold transition-all"
                  aria-label={`Learn more about ${product.name}`}
                >
                  Learn More
                  <motion.span
                    variants={{
                      hover: { scale: 1.5, x: 6 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
