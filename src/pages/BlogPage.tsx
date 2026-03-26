import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { blogPosts, blogCategories, type BlogCategory } from '@/src/data/blog';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

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
              Engineering Insights
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6">
              INSIGHTS & <span className="text-white/20 italic">ARTICLES</span>
            </h1>
            <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto">
              Technical deep-dives, industry analysis, and engineering wisdom from the Astheron team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-bold transition-all duration-300",
                  activeCategory === category
                    ? "bg-white text-black"
                    : "border border-white/10 text-brand-muted hover:text-white hover:border-white/30"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-6"
          >
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                layout
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block glass-panel rounded-[28px] p-8 md:p-10 border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/50">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-white/30">
                          <Clock className="w-3 h-3" />
                          {post.readTime} min read
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-display font-bold mb-3 group-hover:text-white transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-brand-muted text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-white/30">
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} — By {post.author}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-bold text-white/40 group-hover:text-white transition-colors">
                          Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                    <div className={cn("w-full md:w-32 h-24 md:h-20 rounded-2xl bg-gradient-to-br shrink-0", post.coverColor)} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
