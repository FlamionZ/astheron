# Astheron Technologies

A modern, dark-themed portfolio website for **Astheron Technologies** — showcasing enterprise software solutions, AI integrations, and cybersecurity services.

## Tech Stack

- **React 19** + **TypeScript** — UI framework
- **Vite 6** — Build tool & dev server
- **Tailwind CSS 4** — Utility-first styling
- **Motion (Framer Motion)** — Animations & transitions
- **React Router DOM** — Client-side routing
- **Groq API** — AI-powered chatbot & marketing content generator
- **Lucide React** — Icon library
- **Express** — Backend server

## Features

- Animated hero section with parallax effects & text reveal animations
- Interactive system architecture diagram
- AI chatbot assistant (powered by Groq)
- AI marketing content generator
- Case studies showcase
- Client testimonials
- Tech stack display
- Responsive design (mobile-first)
- Splash screen with loading animation
- SEO optimization with React Helmet
- Contact modal & newsletter signup
- Multi-page routing (Home, Services, Portfolio, About, Blog, Careers, Contact)

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/services` | Services overview |
| `/services/:slug` | Service detail |
| `/portfolio` | Portfolio / projects |
| `/portfolio/:slug` | Project detail |
| `/about` | About the company |
| `/blog` | Blog listing |
| `/blog/:slug` | Blog post |
| `/careers` | Careers |
| `/contact` | Contact |

## Getting Started

**Prerequisites:** Node.js (v18+)

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd astheron
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API keys:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── sections/       # Page sections (Hero, Navbar, Footer, etc.)
│   ├── ui/             # Reusable UI components
│   ├── Chatbot.tsx     # AI chatbot widget
│   ├── MarketingGenerator.tsx
│   ├── ArchitectureDiagram.tsx
│   └── ...
├── pages/              # Route pages
├── lib/                # Utilities & helpers
└── data/               # Static data
```

## License

All rights reserved.
