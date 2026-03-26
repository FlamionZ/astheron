export const projects = [
  {
    id: "nexaflow",
    name: "NexaFlow Platform",
    category: "Logistics",
    year: 2025,
    description: "Real-time logistics tracking platform handling thousands of concurrent shipments with sub-second updates.",
    challenge: "NexaFlow Systems needed to replace their legacy tracking system that could only handle batch updates every 15 minutes. Their clients demanded real-time visibility into shipment locations, estimated arrival times, and exception alerts.",
    solution: "We built a distributed real-time platform using WebSocket gateways for live tracking, Apache Kafka for event streaming, and a custom CRDT-based state synchronization layer. The frontend features an interactive map with live vehicle positions and predictive ETAs powered by machine learning.",
    results: [
      "40% faster delivery times through optimized routing",
      "99.99% system uptime over 12 months",
      "50,000+ concurrent connections handled seamlessly",
      "$2.3M annual cost savings from operational efficiency"
    ],
    techStack: ["React", "Node.js", "Kafka", "Redis", "AWS", "PostgreSQL", "WebSocket"],
    testimonial: {
      quote: "Astheron transformed our security infrastructure. Their AI-driven approach is truly next-gen.",
      author: "Sarah Jenkins",
      role: "CTO, NexaFlow Systems"
    },
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "securevault",
    name: "SecureVault",
    category: "Cybersecurity",
    year: 2025,
    description: "Enterprise security audit platform with AI-driven vulnerability detection and automated compliance reporting.",
    challenge: "A Fortune 500 financial services company was spending $4M annually on manual security audits. Their compliance team needed real-time visibility into their security posture across 200+ microservices.",
    solution: "We developed SecureVault, an automated security platform that continuously scans infrastructure, analyzes code for vulnerabilities, and generates compliance reports. The AI engine identifies complex attack chains that traditional scanners miss.",
    results: [
      "78% reduction in attack surface",
      "3x more vulnerabilities discovered vs. manual audits",
      "SOC 2 Type II audit passed with zero findings",
      "60% reduction in security audit costs"
    ],
    techStack: ["Python", "Go", "Kubernetes", "TensorFlow", "PostgreSQL", "Grafana"],
    testimonial: {
      quote: "SecureVault found vulnerability chains our previous auditors completely missed. It's like having a senior pentester working 24/7.",
      author: "David Park",
      role: "CISO, Fortune 500 Financial Services"
    },
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    id: "greengrid",
    name: "GreenGrid AI",
    category: "Energy",
    year: 2024,
    description: "AI-powered energy optimization system reducing industrial facility power consumption by up to 30%.",
    challenge: "A network of industrial facilities was struggling with rising energy costs and carbon emission targets. They needed a system that could optimize energy usage across thousands of IoT sensors and equipment in real-time.",
    solution: "We built GreenGrid AI, a platform that ingests data from IoT sensors across facilities, uses predictive models to forecast energy demand, and automatically adjusts equipment settings for optimal efficiency. The system learns from historical patterns and adapts to seasonal changes.",
    results: [
      "28% average reduction in energy consumption",
      "15,000 tons of CO2 prevented annually",
      "ROI achieved within 4 months of deployment",
      "$8M annual energy cost savings across all facilities"
    ],
    techStack: ["TensorFlow", "React", "Python", "IoT", "TimescaleDB", "MQTT", "GCP"],
    testimonial: {
      quote: "GreenGrid AI didn't just save us money — it fundamentally changed how we think about energy management.",
      author: "Maria Santos",
      role: "VP of Operations, Industrial Corp"
    },
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: "veloce-platform",
    name: "Veloce Digital Platform",
    category: "E-commerce",
    year: 2024,
    description: "High-performance e-commerce platform with AI-powered personalization serving millions of daily active users.",
    challenge: "Veloce Digital's existing platform couldn't handle peak traffic during sales events, leading to lost revenue. They needed a modern architecture that could scale instantly and deliver personalized shopping experiences.",
    solution: "We rebuilt their platform from the ground up using a microservices architecture with auto-scaling. We implemented a real-time recommendation engine, an edge-cached product catalog, and a streamlined checkout flow optimized through A/B testing.",
    results: [
      "40% increase in conversion rates",
      "Sub-second page loads globally via CDN",
      "Zero downtime during Black Friday (10x normal traffic)",
      "25% higher average order value from AI recommendations"
    ],
    techStack: ["Next.js", "Go", "Kubernetes", "Redis", "Elasticsearch", "Stripe", "Cloudflare"],
    testimonial: {
      quote: "The team at Astheron delivered a scalable web platform that exceeded our expectations.",
      author: "Michael Chen",
      role: "Founder, Veloce Digital"
    },
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    id: "medisync",
    name: "MediSync Health",
    category: "Healthcare",
    year: 2023,
    description: "HIPAA-compliant telehealth platform connecting patients with healthcare providers through secure video and AI triage.",
    challenge: "A regional healthcare network needed to launch telehealth capabilities quickly while maintaining strict HIPAA compliance. Existing off-the-shelf solutions didn't integrate with their legacy EHR system.",
    solution: "We built a custom telehealth platform with end-to-end encrypted video consultations, an AI-powered symptom triage system that helps patients connect with the right specialist, and deep integration with their existing Epic EHR system.",
    results: [
      "200,000+ telehealth consultations in the first year",
      "92% patient satisfaction rating",
      "35% reduction in unnecessary ER visits",
      "Full HIPAA compliance with zero incidents"
    ],
    techStack: ["React", "Node.js", "WebRTC", "AWS", "PostgreSQL", "HL7 FHIR"],
    testimonial: {
      quote: "MediSync transformed how we deliver care. Our patients love the convenience, and our providers love the integration.",
      author: "Dr. Amanda Liu",
      role: "Chief Medical Officer"
    },
    color: "from-sky-500/20 to-indigo-500/20"
  }
];

export type Project = typeof projects[number];
