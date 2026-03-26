import { Link } from 'react-router-dom';
import { Globe, Code, Shield } from 'lucide-react';
import Tooltip from '../Tooltip';

export default function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-black relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-8 cursor-pointer group" aria-label="Astheron Technologies Home">
              <img src="/logo (1).png" alt="Astheron" className="w-10 h-10 group-hover:rotate-12 transition-transform duration-500" />
              <span className="font-display font-bold text-xl tracking-tight">ASTHERON</span>
            </Link>
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
              <li><Link to="/services/web" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/services/mobile" className="hover:text-white transition-colors">Mobile Solutions</Link></li>
              <li><Link to="/services/ai" className="hover:text-white transition-colors">AI Integrations</Link></li>
              <li><Link to="/services/system" className="hover:text-white transition-colors">Cloud Architecture</Link></li>
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h5 className="font-bold mb-8 text-xs uppercase tracking-[0.2em] text-white/40">Products</h5>
            <ul className="space-y-4 text-brand-muted text-sm">
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h5 className="font-bold mb-8 text-xs uppercase tracking-[0.2em] text-white/40">Company</h5>
            <ul className="space-y-4 text-brand-muted text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-brand-muted text-[10px] uppercase tracking-widest font-bold">
          <p>&copy; 2026 ASTHERON TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">SITEMAP</a>
            <a href="#" className="hover:text-white transition-colors">SECURITY</a>
            <a href="#" className="hover:text-white transition-colors">STATUS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
