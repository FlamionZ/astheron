export const jobListings = [
  {
    id: "senior-fullstack",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    description: "We're looking for a senior full-stack engineer to lead development of client-facing web applications. You'll work across the entire stack, from database design to frontend animations, shipping production code that serves millions of users.",
    requirements: [
      "5+ years of professional software development experience",
      "Deep expertise in React/Next.js and TypeScript",
      "Strong backend skills with Node.js, Python, or Go",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Track record of shipping and maintaining production systems",
      "Excellent communication and collaboration skills"
    ],
    niceToHave: [
      "Experience with real-time systems (WebSocket, SSE)",
      "Familiarity with infrastructure-as-code (Terraform, Pulumi)",
      "Open source contributions",
      "Experience leading small engineering teams"
    ]
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Research Engineer",
    department: "AI Team",
    type: "Full-time",
    location: "Remote",
    description: "Join our AI team to build and deploy cutting-edge machine learning models for enterprise clients. You'll work on everything from LLM fine-tuning to computer vision systems, turning research into production-ready AI solutions.",
    requirements: [
      "3+ years of applied ML/AI experience",
      "Strong Python skills and familiarity with PyTorch or TensorFlow",
      "Experience fine-tuning and deploying large language models",
      "Understanding of ML system design and MLOps practices",
      "Ability to translate business requirements into ML solutions",
      "MS or PhD in Computer Science, ML, or related field (or equivalent experience)"
    ],
    niceToHave: [
      "Published research in NLP, computer vision, or related fields",
      "Experience with RAG systems and vector databases",
      "Familiarity with model optimization (quantization, distillation)",
      "Experience with edge deployment of ML models"
    ]
  },
  {
    id: "security-engineer",
    title: "Security Engineer",
    department: "Security",
    type: "Full-time",
    location: "Remote",
    description: "Help us build the next generation of security tools. You'll contribute to our Pentest Agent product and work on security audits for enterprise clients. Offense and defense — you'll do both.",
    requirements: [
      "3+ years in cybersecurity or security engineering",
      "Experience with penetration testing methodologies (OWASP, PTES)",
      "Strong scripting skills (Python, Bash, Go)",
      "Understanding of web application security and common vulnerabilities",
      "Experience with security scanning tools and frameworks",
      "Relevant certifications (OSCP, CEH, or equivalent)"
    ],
    niceToHave: [
      "Bug bounty experience or published CVEs",
      "Experience with cloud security (AWS Security, GCP Security Command Center)",
      "Familiarity with AI/ML security considerations",
      "Experience building security automation tools"
    ]
  },
  {
    id: "mobile-developer",
    title: "Mobile Developer (Flutter)",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    description: "Build beautiful, performant cross-platform mobile applications for our clients. You'll work with Flutter to deliver apps that feel native on both iOS and Android, with a focus on smooth animations and offline-first architecture.",
    requirements: [
      "3+ years of mobile development experience",
      "Strong Flutter/Dart expertise with published apps",
      "Experience with native iOS (Swift) or Android (Kotlin) development",
      "Understanding of mobile architecture patterns (BLoC, MVVM)",
      "Experience with RESTful APIs and local storage solutions",
      "Eye for design and attention to UI/UX details"
    ],
    niceToHave: [
      "Experience with push notification systems",
      "Familiarity with CI/CD for mobile (Fastlane, Codemagic)",
      "Experience with biometric authentication implementation",
      "Background in accessibility for mobile apps"
    ]
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
    description: "Shape the visual identity and user experience of products used by enterprises worldwide. You'll design interfaces that are both beautiful and functional, working closely with engineers to bring designs to life.",
    requirements: [
      "4+ years of product design experience",
      "Expert-level Figma skills with a strong portfolio",
      "Experience designing complex B2B/enterprise applications",
      "Understanding of design systems and component libraries",
      "Strong knowledge of accessibility standards (WCAG)",
      "Ability to conduct and synthesize user research"
    ],
    niceToHave: [
      "Experience with motion design and micro-interactions",
      "Basic frontend development skills (HTML, CSS, React)",
      "Experience with design tokens and design-to-code workflows",
      "Familiarity with data visualization design"
    ]
  }
];

export const companyPerks = [
  { title: "Remote-First", stat: "100%", description: "Work from anywhere in the world. We're fully distributed." },
  { title: "Flexible Hours", stat: "Flex", description: "Set your own schedule. We care about output, not hours." },
  { title: "Learning Budget", stat: "$2K/yr", description: "Annual budget for courses, conferences, and certifications." },
  { title: "Equipment Stipend", stat: "$3K", description: "Get the tools you need to do your best work." },
  { title: "Paid Time Off", stat: "25 days", description: "Generous PTO plus national holidays in your country." },
  { title: "Team Retreats", stat: "2x/yr", description: "In-person team meetups twice a year in exciting locations." }
];

export type JobListing = typeof jobListings[number];
