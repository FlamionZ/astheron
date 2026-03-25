import { motion, AnimatePresence, useInView, useScroll, useSpring, useTransform } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Cpu, Globe, Shield, Zap, ArrowRight, Code, Terminal, ShieldAlert, Bot, ArrowUp, CheckCircle2, X, ArrowLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Chatbot from './components/Chatbot';
import VideoGenerator from './components/VideoGenerator';
import ContactModal from './components/ContactModal';
import CaseStudies from './components/CaseStudies';
import MarketingGenerator from './components/MarketingGenerator';
import CollaborativeBoard from './components/CollaborativeBoard';
import SEO, { sectionSEO } from './components/SEO';
import Tooltip from './components/Tooltip';

function Counter({ value, duration = 2 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    let requestRef: number;
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestRef = window.requestAnimationFrame(step);
        }
      };
      requestRef = window.requestAnimationFrame(step);
    }
    return () => {
      if (requestRef) window.cancelAnimationFrame(requestRef);
    };
  }, [value, duration, isInView]);
  
  return (
    <span ref={ref} aria-live="polite" aria-atomic="true">
      {count}
    </span>
  );
}

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
          className="glass p-12 rounded-[40px] border border-white/10 relative overflow-hidden group"
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

const testimonials = [
  {
    quote: "Astheron transformed our security infrastructure. Their AI-driven approach is truly next-gen and has saved us countless hours of manual auditing.",
    author: "Sarah Jenkins",
    title: "CTO",
    company: "NexaFlow Systems",
    avatar: "SJ"
  },
  {
    quote: "The team at Astheron delivered a scalable web platform that exceeded our expectations. Their technical depth and attention to detail are unmatched.",
    author: "Michael Chen",
    title: "Founder",
    company: "Veloce Digital",
    avatar: "MC"
  },
  {
    quote: "Professional, innovative, and reliable. Astheron is our go-to partner for complex engineering challenges and high-stakes digital infrastructure.",
    author: "Elena Rodriguez",
    title: "Head of Digital",
    company: "Arca Global",
    avatar: "ER"
  }
];

const services = [
  {
    id: "web",
    title: "Website Development",
    description: "High-performance, scalable web applications built with modern technologies.",
    longDescription: "We specialize in building enterprise-grade web applications that are not only visually stunning but also technically superior. Our approach focuses on performance, accessibility, and scalability, ensuring your platform can handle millions of users without compromise. For instance, our e-commerce solutions have helped clients increase conversion rates by up to 40% through optimized checkout flows and sub-second page loads.",
    icon: Globe,
    tags: ["React", "Next.js", "Cloud Native"],
    features: [
      "Progressive Web Apps (PWA)",
      "Server-Side Rendering (SSR)",
      "Headless CMS Integration",
      "E-commerce Solutions",
      "Custom Dashboard Development"
    ],
    approach: "We follow a mobile-first, performance-driven methodology. Our process starts with deep architectural planning, followed by iterative development and rigorous automated testing."
  },
  {
    id: "system",
    title: "System Architecture",
    description: "Robust enterprise systems designed for reliability and massive scale.",
    longDescription: "Our architecture team designs the backbone of your digital infrastructure. We focus on creating distributed systems that are resilient, maintainable, and highly available. From microservices to event-driven architectures, we build for the future. A key benefit of our approach is the ability to handle massive traffic spikes—such as during Black Friday—with zero downtime and automated resource scaling.",
    icon: Cpu,
    tags: ["Microservices", "Distributed Systems"],
    features: [
      "Event-Driven Architecture",
      "Database Optimization",
      "API Gateway Design",
      "Load Balancing & Auto-scaling",
      "Disaster Recovery Planning"
    ],
    approach: "We prioritize decoupling and resilience. Our designs leverage cloud-native patterns to ensure that your systems can grow horizontally and recover automatically from failures."
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    description: "Native and cross-platform mobile experiences that users love.",
    longDescription: "We build mobile apps that feel right at home on any device. Whether it's a high-performance native iOS/Android app or a versatile cross-platform solution, we prioritize user experience and seamless performance. By implementing advanced push notification strategies and offline-first capabilities, we've helped brands improve user retention by over 25%.",
    icon: Zap,
    tags: ["iOS", "Android", "Flutter"],
    features: [
      "Native iOS & Android Development",
      "Cross-Platform with Flutter/React Native",
      "Offline-First Capabilities",
      "Biometric Authentication",
      "Push Notification Systems"
    ],
    approach: "Our mobile development is centered around the user journey. We use modern frameworks to deliver smooth, 60fps experiences with native-level responsiveness and deep platform integration."
  },
  {
    id: "ai",
    title: "AI Solutions",
    description: "Custom AI models and integrations to automate and enhance your business.",
    longDescription: "Unlock the power of artificial intelligence to drive efficiency and innovation. We help you integrate Large Language Models, develop custom computer vision systems, and build predictive analytics engines tailored to your specific business needs. Our AI-driven process automation has saved clients thousands of manual hours, delivering a tangible ROI within the first quarter of deployment.",
    icon: Bot,
    tags: ["LLMs", "Computer Vision", "NLP"],
    features: [
      "Custom LLM Fine-tuning",
      "Predictive Analytics",
      "Automated Content Generation",
      "Intelligent Process Automation",
      "Computer Vision for Quality Control"
    ],
    approach: "We take a data-first approach to AI. By carefully curating datasets and selecting the right model architectures, we deliver AI solutions that provide measurable ROI and actual business value."
  }
];

const products = [
  {
    name: "Aron AI",
    category: "Communication",
    description: "The next generation of WhatsApp chatbots. Intelligent, contextual, and always available.",
    icon: Bot,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    name: "Pentest Agent",
    category: "Cybersecurity",
    description: "Autonomous security auditing agent that identifies vulnerabilities before hackers do.",
    icon: Terminal,
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    name: "Anti-Gambling",
    category: "Safety",
    description: "Advanced system designed to detect and prevent gambling-related activities on your network.",
    icon: ShieldAlert,
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

export default function App() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const waveY1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const waveY2 = useTransform(scrollY, [0, 1000], [0, 250]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [activeSection, setActiveSection] = useState<keyof typeof sectionSEO>('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id as keyof typeof sectionSEO;
          if (sectionSEO[id]) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const sections = ['hero', 'services', 'products', 'case-studies', 'ai-generator', 'collaboration', 'about'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-white selection:text-black">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left"
        style={{ scaleX }}
      />
      <SEO activeSection={activeSection} />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-white focus:text-black focus:rounded-full focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav 
        role="navigation"
        aria-label="Main navigation"
        className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-brand-bg/90 backdrop-blur-xl border-white/10 py-3" 
          : "bg-transparent border-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300">
          <Tooltip content="Back to Home" position="bottom">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className={cn(
                "bg-white rounded-xl flex items-center justify-center transition-all duration-300",
                isScrolled ? "w-8 h-8" : "w-10 h-10"
              )}>
                <span className={cn(
                  "text-black font-display font-black transition-all duration-300",
                  isScrolled ? "text-xl" : "text-2xl"
                )}>A</span>
              </div>
              <span className={cn(
                "font-display font-bold tracking-tight transition-all duration-300",
                isScrolled ? "text-lg" : "text-xl"
              )}>ASTHERON</span>
            </div>
          </Tooltip>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
            <Tooltip content="Our Expertise" position="bottom">
              <a href="#services" className="hover:text-white transition-colors" aria-label="Navigate to Services section">Services</a>
            </Tooltip>
            <Tooltip content="Proprietary Tech" position="bottom">
              <a href="#products" className="hover:text-white transition-colors" aria-label="Navigate to Products section">Products</a>
            </Tooltip>
            <Tooltip content="Who We Are" position="bottom">
              <a href="#about" className="hover:text-white transition-colors" aria-label="Navigate to About section">About</a>
            </Tooltip>
            <Tooltip content="Get in Touch" position="bottom">
              <button 
                onClick={() => setIsContactOpen(true)}
                className={cn(
                  "px-5 py-2.5 bg-white text-black rounded-full hover:bg-white/90 transition-all duration-300",
                  isScrolled ? "scale-90" : "scale-100"
                )}
                aria-label="Contact Astheron Technologies"
              >
                Contact Us
              </button>
            </Tooltip>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main id="main-content">
        <section id="hero" className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Enhanced Animated Wave Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px]" />
          </div>

          {/* Floating Mesh Waves */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <motion.path
                style={{ y: waveY1 }}
                animate={{
                  d: [
                    "M0,160 C320,300 420,100 640,200 C860,300 1120,100 1440,200 V800 H0 Z",
                    "M0,200 C320,100 420,300 640,200 C860,100 1120,300 1440,200 V800 H0 Z",
                    "M0,160 C320,300 420,100 640,200 C860,300 1120,100 1440,200 V800 H0 Z"
                  ]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                fill="url(#wave-gradient-1)"
                className="opacity-20"
              />
              <motion.path
                style={{ y: waveY2 }}
                animate={{
                  d: [
                    "M0,400 C320,300 420,500 640,400 C860,300 1120,500 1440,400 V800 H0 Z",
                    "M0,400 C320,500 420,300 640,400 C860,500 1120,300 1440,400 V800 H0 Z",
                    "M0,400 C320,300 420,500 640,400 C860,300 1120,500 1440,400 V800 H0 Z"
                  ]
                }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: -5
                }}
                fill="url(#wave-gradient-2)"
                className="opacity-10"
              />
              <defs>
                <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Bottom Classic Waves */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] opacity-10">
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.05)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.03)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.02)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.01)" />
              </g>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest font-bold mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Pioneering the Future of Tech
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8 text-gradient flex flex-wrap gap-x-[0.2em]">
              {["ENGINEERING", "INTELLIGENT", "SYSTEMS."].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.2, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <div className="flex flex-wrap gap-x-1.5 mb-10">
              {"Astheron Technologies delivers enterprise-grade software solutions, advanced AI integrations, and cutting-edge cybersecurity tools.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.5 + (i * 0.08) 
                  }}
                  className="text-lg md:text-xl text-brand-muted leading-relaxed"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(255, 255, 255, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black rounded-full font-bold transition-all flex items-center gap-2"
                aria-label="Get started with Astheron Technologies"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass rounded-full font-bold transition-all"
                aria-label="View our technological products"
              >
                View Products
              </motion.button>
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black/40 border border-white/10 rounded-full font-bold transition-all flex items-center gap-2"
                aria-label="Learn more about our cybersecurity solutions"
              >
                <Shield className="w-4 h-4" /> Cybersecurity
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">CORE SERVICES</h2>
              <p className="text-brand-muted text-lg">
                We provide a comprehensive suite of technology services designed to 
                accelerate digital transformation for modern enterprises.
              </p>
            </div>
            <div className="text-brand-muted font-mono text-sm tracking-widest">
              [ 01 / SERVICES ]
            </div>
          </div>          <motion.div 
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                layoutId={`service-card-${service.id}`}
                onClick={() => setSelectedService(service)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.5
                    }
                  },
                  hover: {
                    y: -8,
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }
                }}
                whileHover="hover"
                className="p-8 glass rounded-3xl group cursor-pointer transition-all duration-500 hover:border-white/20"
              >
                <motion.div 
                  layoutId={`service-icon-${service.id}`}
                  variants={{
                    hidden: { opacity: 0, scale: 0.5, y: 15 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1
                      }
                    },
                    hover: { 
                      scale: 1.1, 
                      rotate: 5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }
                  }}
                  className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300"
                >
                  <service.icon className="w-6 h-6" />
                </motion.div>
                <motion.h3 
                  layoutId={`service-title-${service.id}`}
                  variants={{
                    hover: { 
                      scale: 1.05, 
                      color: "#ffffff",
                      transition: { duration: 0.3, ease: "easeOut" }
                    }
                  }}
                  className="text-xl font-bold mb-4 origin-left"
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  layoutId={`service-desc-${service.id}`}
                  variants={{
                    hover: { 
                      scale: 1.02, 
                      color: "rgba(255,255,255,0.8)",
                      transition: { duration: 0.3, ease: "easeOut" }
                    }
                  }}
                  className="text-brand-muted text-sm leading-relaxed mb-6 origin-left"
                >
                  {service.description}
                </motion.p>

                <motion.div layoutId={`service-tags-${service.id}`} className="flex flex-wrap gap-2">
                  {service.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] uppercase tracking-wider font-bold text-white/60">
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-32 px-6 bg-white/[0.02]">
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
              <motion.div
                key={i}
                whileHover="hover"
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.5 }
                  },
                  hover: {
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    transition: { duration: 0.3 }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative p-10 rounded-[40px] overflow-hidden group cursor-pointer"
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
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <CaseStudies />

      {/* AI Marketing Generator Section */}
      <MarketingGenerator />

      {/* Collaborative Workspace Section */}
      <section id="collaboration" className="py-32 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">REAL-TIME <span className="text-white/20 italic">COLLABORATION</span></h2>
              <p className="text-brand-muted text-lg">
                Experience the power of synchronous engineering. Work with your team 
                on project boards, system designs, and strategic planning in real-time.
              </p>
            </div>
            <div className="text-brand-muted font-mono text-sm tracking-widest">
              [ 04 / COLLABORATION ]
            </div>
          </div>
          <CollaborativeBoard />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 overflow-hidden">
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

      {/* Video Generation Section */}
      <VideoGenerator />

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden glass p-4">
                <div className="w-full h-full rounded-[40px] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                   <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-[0_0_100_px_rgba(255,255,255,0.2)]">
                      <span className="text-black font-display font-black text-8xl" aria-hidden="true">A</span>
                   </div>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="absolute -bottom-10 -right-10 w-72 glass rounded-[40px] p-8 hidden md:flex flex-col gap-6 shadow-2xl border border-white/20"
              >
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                  className="space-y-6"
                >
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    whileHover="hover"
                    className="cursor-default group"
                  >
                    <motion.div 
                      variants={{
                        hover: { scale: 1.05, x: 0 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="text-4xl font-display font-bold mb-1 flex items-baseline origin-left"
                    >
                      <Counter value={120} />
                      <span className="text-white/40 ml-1">+</span>
                    </motion.div>
                    <motion.div 
                      className="text-[10px] uppercase tracking-[0.2em] font-black transition-colors opacity-60 group-hover:opacity-100 group-hover:text-white"
                    >
                      Projects Delivered
                    </motion.div>
                  </motion.div>

                  <div className="h-px bg-white/10 w-full" />

                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    whileHover="hover"
                    className="cursor-default group"
                  >
                    <motion.div 
                      variants={{
                        hover: { scale: 1.05, x: 0 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="text-4xl font-display font-bold mb-1 flex items-baseline origin-left"
                    >
                      <Counter value={99} />
                      <span className="text-white/40 ml-1">%</span>
                    </motion.div>
                    <motion.div 
                      className="text-[10px] uppercase tracking-[0.2em] font-black transition-colors opacity-60 group-hover:opacity-100 group-hover:text-white"
                    >
                      Client Satisfaction
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Subtle Progress Bar */}
                <div className="pt-2">
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "94%" }}
                      transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                      className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                    />
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-[9px] text-white/30 font-mono tracking-tighter uppercase">System Status: Optimal</span>
                    <span className="text-[9px] text-white/50 font-mono font-bold">94%</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">WE ARE ASTHERON.</h2>
              <p className="text-xl text-brand-muted leading-relaxed mb-8">
                Founded on the principles of innovation and technical excellence, 
                Astheron Technologies is a collective of engineers, designers, 
                and visionaries dedicated to building the next generation of 
                digital infrastructure.
              </p>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                className="space-y-6"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="flex gap-4"
                >
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, rotate: -5 },
                      visible: { 
                        opacity: 1, 
                        scale: 1, 
                        rotate: 0,
                        transition: { type: "spring", stiffness: 200, damping: 15 }
                      }
                    }}
                    className="w-12 h-12 shrink-0 glass rounded-xl flex items-center justify-center"
                  >
                    <Shield className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="font-bold mb-1">Security First</h4>
                    <p className="text-brand-muted text-sm">Every line of code we write is audited for security and performance.</p>
                  </div>
                </motion.div>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="flex gap-4"
                >
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, rotate: -5 },
                      visible: { 
                        opacity: 1, 
                        scale: 1, 
                        rotate: 0,
                        transition: { type: "spring", stiffness: 200, damping: 15 }
                      }
                    }}
                    className="w-12 h-12 shrink-0 glass rounded-xl flex items-center justify-center"
                  >
                    <Zap className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="font-bold mb-1">Rapid Innovation</h4>
                    <p className="text-brand-muted text-sm">We leverage the latest in AI and cloud tech to deliver results faster.</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 bg-black relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Tooltip content="Astheron Technologies" position="right">
                <div className="flex items-center gap-2 mb-8 cursor-pointer group" aria-label="Astheron Technologies Home">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <span className="text-black font-display font-black text-2xl">A</span>
                  </div>
                  <span className="font-display font-bold text-xl tracking-tight">ASTHERON</span>
                </div>
              </Tooltip>
              <p className="text-brand-muted max-w-sm leading-relaxed mb-10 text-base">
                Building the digital backbone of the future. We specialize in 
                enterprise-grade solutions that bridge the gap between 
                imagination and reality.
              </p>
              
              <div className="flex gap-5">
                <Tooltip content="Global Network" position="top">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:border-white/30 hover:bg-white/5 hover:scale-110 active:scale-95 transition-all duration-300" aria-label="Visit our Global Network">
                    <Globe className="w-5 h-5" />
                  </a>
                </Tooltip>
                <Tooltip content="Open Source" position="top">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:border-white/30 hover:bg-white/5 hover:scale-110 active:scale-95 transition-all duration-300" aria-label="View our Open Source projects">
                    <Code className="w-5 h-5" />
                  </a>
                </Tooltip>
                <Tooltip content="Security Verified" position="top">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:border-white/30 hover:bg-white/5 hover:scale-110 active:scale-95 transition-all duration-300" aria-label="View our Security Certifications">
                    <Shield className="w-5 h-5" />
                  </a>
                </Tooltip>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h5 className="font-bold mb-8 text-xs uppercase tracking-[0.2em] text-white/40">Services</h5>
              <ul className="space-y-4 text-brand-muted text-sm">
                <li>
                  <Tooltip content="Custom web platforms" position="right">
                    <a href="#services" className="hover:text-white transition-colors" aria-label="Learn about Web Development services">Web Development</a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Native mobile apps" position="right">
                    <a href="#services" className="hover:text-white transition-colors" aria-label="Learn about Mobile Solutions">Mobile Solutions</a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Machine learning & AI" position="right">
                    <a href="#services" className="hover:text-white transition-colors" aria-label="Learn about AI Integrations">AI Integrations</a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Scalable infrastructure" position="right">
                    <a href="#services" className="hover:text-white transition-colors" aria-label="Learn about Cloud Architecture">Cloud Architecture</a>
                  </Tooltip>
                </li>
              </ul>
            </div>

            {/* Products Column */}
            <div>
              <h5 className="font-bold mb-8 text-xs uppercase tracking-[0.2em] text-white/40">Products</h5>
              <ul className="space-y-4 text-brand-muted text-sm">
                <li>
                  <Tooltip content="AI Chatbot Platform" position="right">
                    <a href="#products" className="hover:text-white transition-colors" aria-label="Learn about Aron AI product">Aron AI</a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Security Auditing" position="right">
                    <a href="#products" className="hover:text-white transition-colors" aria-label="Learn about Pentest Agent product">Pentest Agent</a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Network Safety" position="right">
                    <a href="#products" className="hover:text-white transition-colors" aria-label="Learn about Anti-Gambling product">Anti-Gambling</a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Marketing Suite" position="right">
                    <a href="#ai-generator" className="hover:text-white transition-colors" aria-label="Learn about AI Generator product">AI Generator</a>
                  </Tooltip>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h5 className="font-bold mb-8 text-xs uppercase tracking-[0.2em] text-white/40">Company</h5>
              <ul className="space-y-4 text-brand-muted text-sm">
                <li>
                  <Tooltip content="Our story" position="right">
                    <a href="#about" className="hover:text-white transition-colors" aria-label="About Astheron Technologies">About Us</a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Get in touch" position="right">
                    <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors" aria-label="Contact Us">Contact</button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Privacy Policy" position="right">
                    <a href="#" className="hover:text-white transition-colors" aria-label="View Privacy Policy">Privacy</a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content="Terms of Service" position="right">
                    <a href="#" className="hover:text-white transition-colors" aria-label="View Terms of Service">Terms</a>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-brand-muted text-[10px] uppercase tracking-widest font-bold">
            <p>© 2026 ASTHERON TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors" aria-label="View Sitemap">SITEMAP</a>
              <a href="#" className="hover:text-white transition-colors" aria-label="View Security Information">SECURITY</a>
              <a href="#" className="hover:text-white transition-colors" aria-label="View System Status">STATUS</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot Integration */}
      <Chatbot />

      {/* Expanded Service View */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] cursor-zoom-out"
            />
            <motion.div
              layoutId={`service-card-${selectedService.id}`}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-brand-bg z-[101] rounded-[40px] overflow-hidden border border-white/10 flex flex-col shadow-2xl"
            >
              <div className="flex-1 overflow-y-auto p-8 md:p-16 lg:p-24 custom-scrollbar">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center justify-between mb-16">
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                      Back to Services
                    </button>
                    <div className="text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase hidden md:block">
                      Service Specification // {selectedService.id}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left Column: Identity & Context */}
                    <div className="lg:col-span-5 space-y-12">
                      <div className="space-y-8">
                        <motion.div 
                          layoutId={`service-icon-${selectedService.id}`}
                          className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.15)]"
                        >
                          <selectedService.icon className="w-12 h-12 text-black" />
                        </motion.div>
                        
                        <div className="space-y-6">
                          <motion.div 
                            layoutId={`service-tags-${selectedService.id}`}
                            className="flex flex-wrap gap-2"
                          >
                            {selectedService.tags.map((tag, idx) => (
                              <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-black text-white/50">
                                {tag}
                              </span>
                            ))}
                          </motion.div>
                          
                          <motion.h3 
                            layoutId={`service-title-${selectedService.id}`}
                            className="text-5xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter"
                          >
                            {selectedService.title.split(' ').map((word, i) => (
                              <span key={i} className={i % 2 === 1 ? "text-white/30 italic block" : "block"}>
                                {word}
                              </span>
                            ))}
                          </motion.h3>
                        </div>
                      </div>

                      <motion.div 
                        layoutId={`service-desc-${selectedService.id}`}
                        className="space-y-8"
                      >
                        <p className="text-2xl text-brand-muted leading-relaxed font-light">
                          {selectedService.longDescription}
                        </p>
                        
                        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-6">
                          <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">
                            Our Strategic Approach
                          </h4>
                          <ul className="space-y-6">
                            {[
                              { id: '01', title: 'Strategic Discovery', desc: 'Deep dive into business goals and technical constraints.' },
                              { id: '02', title: 'Architectural Design', desc: 'Crafting resilient, scalable system blueprints.' },
                              { id: '03', title: 'Agile Execution', desc: 'Continuous integration and rapid deployment cycles.' }
                            ].map((step) => (
                              <li key={step.id} className="flex gap-4">
                                <span className="text-blue-400 font-mono text-xs mt-1">{step.id}.</span>
                                <div className="space-y-1">
                                  <div className="text-sm font-bold text-white">{step.title}</div>
                                  <div className="text-xs text-brand-muted leading-relaxed">{step.desc}</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column: Features & CTA */}
                    <div className="lg:col-span-7 space-y-16">
                      <div className="space-y-10">
                        <div className="flex items-center gap-4">
                          <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 whitespace-nowrap">
                            Core Capabilities
                          </h4>
                          <div className="h-px w-full bg-white/10" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedService.features.map((feature, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * idx }}
                              key={idx} 
                              className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500"
                            >
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <span className="text-white font-bold text-sm block mb-2">{feature}</span>
                              <p className="text-[11px] text-brand-muted leading-relaxed">
                                Enterprise-grade implementation focused on reliability and performance.
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="relative p-12 rounded-[40px] bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        <div className="relative z-10 space-y-6">
                          <h4 className="text-3xl font-display font-bold text-white leading-tight">
                            Ready to build the <br />
                            <span className="italic opacity-70">future together?</span>
                          </h4>
                          <p className="text-white/80 text-sm max-w-md leading-relaxed">
                            Let's discuss how our {selectedService.title.toLowerCase()} expertise can transform your digital landscape.
                          </p>
                          <div className="flex flex-wrap gap-4 pt-4">
                            <button 
                              onClick={() => {
                                setSelectedService(null);
                                setIsContactOpen(true);
                              }}
                              className="px-8 py-4 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
                            >
                              Start Project <ArrowRight className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setSelectedService(null)}
                              className="px-8 py-4 bg-black/20 backdrop-blur-md border border-white/20 rounded-full font-bold text-sm hover:bg-black/40 transition-all"
                            >
                              Close Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] cursor-zoom-out"
            />
            <motion.div
              layoutId={`service-card-${selectedService.id}`}
              className="fixed inset-4 md:inset-10 lg:inset-20 z-[101] glass rounded-[40px] border border-white/20 overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              {/* Left Side - Visual/Icon */}
              <div className="w-full md:w-1/3 bg-white/5 p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                >
                  <selectedService.icon className="w-16 h-16 text-black" />
                </motion.div>
                <motion.h2 
                  layoutId={`service-title-${selectedService.id}`}
                  className="text-3xl font-display font-bold text-center mb-4"
                >
                  {selectedService.title}
                </motion.h2>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedService.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase tracking-widest font-bold text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="flex-1 overflow-y-auto p-12 md:p-20 custom-scrollbar">
                <div className="max-w-3xl">
                  <div className="mb-12">
                    <h4 className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Overview</h4>
                    <motion.p 
                      layoutId={`service-desc-${selectedService.id}`}
                      className="text-xl md:text-2xl text-white/90 leading-relaxed font-light"
                    >
                      {selectedService.longDescription}
                    </motion.p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold mb-8">Key Features</h4>
                      <ul className="space-y-4">
                        {selectedService.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-brand-muted">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold mb-8">Our Approach</h4>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-white/20 group-hover:bg-white transition-colors" />
                        <p className="text-brand-muted leading-relaxed italic">
                          "{selectedService.approach}"
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-[10px] uppercase tracking-widest font-bold text-white/40">
                            Engineered for Excellence
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-12 border-t border-white/10">
                    <button 
                      onClick={() => {
                        setSelectedService(null);
                        setIsContactOpen(true);
                      }}
                      className="px-10 py-5 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all flex items-center gap-3 group"
                    >
                      Start a Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <Tooltip content="Scroll to Top" position="left" className="fixed bottom-8 right-24 z-50">
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-12 h-12 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:bg-white/90 focus:ring-4 focus:ring-white/20 focus:outline-none transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-6 h-6" aria-hidden="true" />
            </motion.button>
          </Tooltip>
        )}
      </AnimatePresence>
    </div>
  );
}

