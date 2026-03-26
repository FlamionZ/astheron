import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '@/src/data/blog';
import { cn } from '@/src/lib/utils';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1];
  const prevPost = blogPosts[currentIndex - 1];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className={cn("absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 bg-gradient-to-br", post.coverColor)} />
        </div>

        <div className="max-w-3xl mx-auto relative">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Articles
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/50">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-white/30">
                <Clock className="w-3 h-3" />
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 pb-12 border-b border-white/10">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-display font-black text-sm">
                {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="font-bold text-sm">{post.author}</div>
                <div className="text-[11px] text-white/40">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <article className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-p:text-white/70 prose-p:leading-relaxed
            prose-strong:text-white
            prose-li:text-white/70
            prose-ul:space-y-2
            prose-ol:space-y-2
            prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
          ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </motion.div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevPost && (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="group glass-panel rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all"
              >
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Previous</div>
                <div className="font-bold text-sm group-hover:text-white transition-colors">{prevPost.title}</div>
              </Link>
            )}
            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group glass-panel rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all text-right md:col-start-2"
              >
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Next</div>
                <div className="font-bold text-sm group-hover:text-white transition-colors">{nextPost.title}</div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
