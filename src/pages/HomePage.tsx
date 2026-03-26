import { useEffect, useState } from 'react';
import { trackEvent } from '@/src/lib/analytics';
import { sectionSEO } from '@/src/components/SEO';
import SEO from '@/src/components/SEO';
import ContactModal from '@/src/components/ContactModal';

import HeroSection from '@/src/components/sections/HeroSection';
import ServicesSection from '@/src/components/sections/ServicesSection';
import ProductsSection from '@/src/components/sections/ProductsSection';
import CaseStudies from '@/src/components/CaseStudies';
import MarketingGenerator from '@/src/components/MarketingGenerator';
import ArchitectureDiagram from '@/src/components/ArchitectureDiagram';
import TestimonialsSection from '@/src/components/sections/TestimonialsSection';
import AboutSection from '@/src/components/sections/AboutSection';
import TrustBar from '@/src/components/sections/TrustBar';
import HowWeWork from '@/src/components/sections/HowWeWork';
import TechStack from '@/src/components/sections/TechStack';
import NewsletterCTA from '@/src/components/sections/NewsletterCTA';

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
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
            trackEvent('section_view', { section: id });
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

  const handleContactOpen = () => setIsContactOpen(true);

  return (
    <>
      <SEO activeSection={activeSection} />
      <HeroSection />
      <TrustBar />
      <ServicesSection onContactOpen={handleContactOpen} />
      <ProductsSection />
      <CaseStudies />
      <MarketingGenerator />

      {/* Architecture Diagram Section */}
      <section id="collaboration" className="py-20 md:py-32 px-4 md:px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">SYSTEM <span className="text-white/20 italic">ARCHITECTURE</span></h2>
              <p className="text-brand-muted text-lg">
                See how we engineer production systems. Click any node to explore
                the tech stack, performance metrics, and design decisions behind each layer.
              </p>
            </div>
            <div className="text-brand-muted font-mono text-sm tracking-widest">
              [ 04 / ARCHITECTURE ]
            </div>
          </div>
          <div className="glass-panel rounded-[40px] border border-white/10 p-6 md:p-10 overflow-hidden">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      <HowWeWork />
      <TestimonialsSection />
      <TechStack />
      <AboutSection />
      <NewsletterCTA />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
