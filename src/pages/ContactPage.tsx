import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, MapPin, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { trackEvent } from '@/src/lib/analytics';

const faqs = [
  {
    question: "What's your typical project timeline?",
    answer: "Most projects take 8-16 weeks from kickoff to launch, depending on scope. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you work with startups?",
    answer: "Absolutely. We work with companies of all sizes, from early-stage startups to Fortune 500 enterprises. We tailor our approach based on your stage and needs."
  },
  {
    question: "How does pricing work?",
    answer: "We offer both project-based and retainer pricing. After an initial consultation, we'll provide a detailed proposal with transparent pricing based on scope and complexity."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "Our core stack includes React, Next.js, Node.js, Python, Go, and cloud platforms (AWS, GCP). We also have deep expertise in AI/ML, mobile development, and cybersecurity."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. We offer maintenance and support packages for all projects we deliver. This includes bug fixes, performance monitoring, security updates, and feature enhancements."
  }
];

function FaqItem({ faq }: { faq: typeof faqs[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-bold text-sm pr-4">{faq.question}</span>
        <ChevronDown className={cn("w-4 h-4 text-white/40 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-brand-muted text-sm leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('form_submit', { form: 'contact', subject: formState.subject });
    setSubmitted(true);
  };

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
              Let's Talk
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6">
              GET IN <span className="text-white/20 italic">TOUCH</span>
            </h1>
            <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-[32px] p-8 md:p-12 border border-white/5"
            >
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-8">
                Send a Message
              </h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <h3 className="text-2xl font-display font-bold mb-3">Message Sent!</h3>
                    <p className="text-brand-muted text-sm max-w-sm">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', subject: '', message: '' }); }}
                      className="mt-8 px-6 py-2.5 border border-white/10 rounded-full text-sm font-bold hover:bg-white/5 transition-colors"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="name" className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        required
                        value={formState.subject}
                        onChange={e => setFormState(s => ({ ...s, subject: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                        placeholder="Project inquiry, partnership, etc."
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-white text-black rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                    >
                      Send Message <Send className="w-4 h-4" />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info + FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="glass-panel rounded-[24px] p-6 border border-white/5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-brand-muted text-sm">hello@astheron.tech</p>
                    <p className="text-[11px] text-white/30 mt-1">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="glass-panel rounded-[24px] p-6 border border-white/5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Location</h3>
                    <p className="text-brand-muted text-sm">Jakarta, Indonesia</p>
                    <p className="text-[11px] text-white/30 mt-1">Serving clients globally</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="glass-panel rounded-[28px] p-8 border border-white/5">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-6">
                  Frequently Asked Questions
                </h3>
                <div>
                  {faqs.map((faq, i) => (
                    <FaqItem key={i} faq={faq} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
