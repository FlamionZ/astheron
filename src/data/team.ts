export const teamMembers = [
  {
    name: "Irfan",
    role: "Founder & CEO",
    avatar: "I",
    bio: "Visionary engineer and entrepreneur with deep expertise in system architecture, AI, and cybersecurity. Founded Astheron with the mission to build technology that matters.",
    skills: ["System Architecture", "AI Strategy", "Cybersecurity", "Leadership"]
  },
  {
    name: "Arifin",
    role: "Founder, QA, & AI Engineer",
    avatar: "Ar",
    bio: "Full-stack architect with 10+ years building distributed systems at scale. Leads Astheron's technical vision and engineering culture.",
    skills: ["Distributed Systems", "Cloud Architecture", "DevOps", "Microservices"]
  },
  {
    name: "Rakha",
    role: "Co-Founder, AI Engineer, & Fullstack Developer",
    avatar: "R",
    bio: "Machine learning researcher turned applied AI engineer. Leads the development of Aron AI and custom LLM solutions for enterprise clients.",
    skills: ["Machine Learning", "NLP", "Computer Vision", "LLM Fine-tuning"]
  },
  {
    name: "Amri",
    role: "AI Engineer, Fullstack Developer, & Cybersecurity",
    avatar: "A",
    bio: "Certified ethical hacker and security architect. Drives the development of Pentest Agent and ensures all Astheron projects meet the highest security standards.",
    skills: ["Penetration Testing", "Zero Trust", "Security Architecture", "Compliance"]
  },
  {
    name: "Gita",
    role: "AI Engineer",
    avatar: "G",
    bio: "Design leader who bridges aesthetics and engineering. Creates intuitive interfaces that look stunning and perform flawlessly.",
    skills: ["UI/UX Design", "Design Systems", "Motion Design", "User Research"]
  },
  {
    name: "Fajar",
    role: "Fullstack Developer",
    avatar: "F",
    bio: "Cross-platform mobile specialist with a passion for performance. Has shipped apps with millions of downloads across iOS and Android.",
    skills: ["Flutter", "React Native", "iOS", "Android"]
  }
];

export const companyTimeline = [
  { year: 2021, event: "Astheron Technologies founded", description: "Started as a two-person team building custom web applications" },
  { year: 2022, event: "First enterprise client", description: "Landed our first Fortune 500 contract for system architecture" },
  { year: 2023, event: "AI division launched", description: "Established dedicated AI team, began developing Aron AI" },
  { year: 2024, event: "Security products released", description: "Launched Pentest Agent and Anti-Gambling platform" },
  { year: 2025, event: "Team expansion to 20+", description: "Grew from 6 to 20+ engineers across 4 countries" },
  { year: 2026, event: "Global presence established", description: "Serving clients across Southeast Asia, Europe, and North America" }
];

export const companyValues = [
  {
    title: "Innovation-Driven",
    description: "We push the boundaries of what's possible in technology, always seeking better solutions."
  },
  {
    title: "Technical Excellence",
    description: "Every line of code is crafted with care. We don't ship until it meets our standards."
  },
  {
    title: "Security First",
    description: "Security is not an afterthought — it's built into every layer of every system we create."
  },
  {
    title: "Future-Ready",
    description: "We build for tomorrow. Our solutions are designed to scale and adapt as technology evolves."
  }
];

export type TeamMember = typeof teamMembers[number];
