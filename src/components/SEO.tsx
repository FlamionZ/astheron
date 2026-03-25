import { Helmet } from 'react-helmet-async';

export const sectionSEO = {
  hero: {
    title: 'Astheron Technologies — Next-Gen Engineering Collective',
    description: 'Astheron is a high-end engineering collective focused on innovation, security, and technical excellence.'
  },
  services: {
    title: 'Our Services | Astheron Technologies',
    description: 'Explore our range of high-performance engineering services, from web development to cybersecurity audits.'
  },
  products: {
    title: 'Proprietary Products | Astheron Technologies',
    description: 'Discover our cutting-edge software solutions designed to solve complex digital challenges.'
  },
  'case-studies': {
    title: 'Case Studies | Astheron Technologies',
    description: 'See how we have helped our clients achieve technical excellence and scale their digital infrastructure.'
  },
  'ai-generator': {
    title: 'AI Marketing Suite | Astheron Technologies',
    description: 'Generate personalized marketing copy for your services using our proprietary AI engine.'
  },
  collaboration: {
    title: 'Real-Time Collaboration | Astheron Technologies',
    description: 'Experience our high-performance collaborative engineering environment.'
  },
  about: {
    title: 'About Us | Astheron Technologies',
    description: 'Learn about the high-end engineering collective behind Astheron Technologies.'
  }
};

interface SEOProps {
  activeSection?: keyof typeof sectionSEO;
  canonical?: string;
}

export default function SEO({ 
  activeSection = 'hero', 
  canonical = 'https://astheron.tech'
}: SEOProps) {
  const { title, description } = sectionSEO[activeSection] || sectionSEO.hero;
  const fullTitle = title.includes('Astheron') ? title : `${title} | Astheron Technologies`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
