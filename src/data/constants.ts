import { Globe, Cpu, Zap, Bot, Terminal, ShieldAlert } from 'lucide-react';

export const testimonials = [
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

export const services = [
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

export type Service = typeof services[number];

export const products = [
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
