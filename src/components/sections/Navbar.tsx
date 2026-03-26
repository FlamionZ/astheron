import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { trackEvent } from '@/src/lib/analytics';

interface DropdownItem {
  label: string;
  href: string;
  description: string;
}

interface NavGroup {
  label: string;
  items: DropdownItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Services",
    items: [
      { label: "All Services", href: "/services", description: "Full service catalog" },
      { label: "Web Development", href: "/services/web", description: "High-performance web apps" },
      { label: "System Architecture", href: "/services/system", description: "Scalable infrastructure" },
      { label: "Mobile Apps", href: "/services/mobile", description: "Native & cross-platform" },
      { label: "AI Solutions", href: "/services/ai", description: "Custom AI integrations" },
    ]
  },
  {
    label: "Work",
    items: [
      { label: "Portfolio", href: "/portfolio", description: "Our completed projects" },
      { label: "Case Studies", href: "/#case-studies", description: "In-depth project breakdowns" },
    ]
  },
  {
    label: "Company",
    items: [
      { label: "About Us", href: "/about", description: "Our story & team" },
      { label: "Careers", href: "/careers", description: "Join the team" },
    ]
  }
];

function Dropdown({ group, isOpen, onToggle }: { group: NavGroup; isOpen: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={onToggle}
      onMouseLeave={onToggle}
    >
      <button
        className="flex items-center gap-1 hover:text-white transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {group.label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
          >
            <div className="glass-panel rounded-2xl border border-white/10 p-2 min-w-[220px] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{item.label}</span>
                  <span className="text-[11px] text-white/40">{item.description}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-500 border-b",
        isScrolled
          ? "bg-black/40 backdrop-blur-2xl border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <img src="/logo (1).png" alt="Astheron" className={cn("transition-all duration-300", isScrolled ? "w-8 h-8" : "w-10 h-10")} />
          <span className={cn(
            "font-display font-bold tracking-tight transition-all duration-300",
            isScrolled ? "text-lg" : "text-xl"
          )}>ASTHERON</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
          {navGroups.map((group) => (
            <Dropdown
              key={group.label}
              group={group}
              isOpen={openDropdown === group.label}
              onToggle={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
            />
          ))}
          <Link
            to="/blog"
            className={cn("hover:text-white transition-colors", location.pathname.startsWith("/blog") && "text-white")}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            onClick={() => trackEvent('button_click', { button: 'Contact Us', location: 'navbar' })}
            className={cn(
              "px-5 py-2.5 bg-white text-black rounded-full hover:bg-white/90 transition-all duration-300",
              isScrolled ? "scale-90" : "scale-100"
            )}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-black/80 backdrop-blur-2xl border-t border-white/5"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
                    className="w-full flex items-center justify-between py-3 text-sm font-medium text-brand-muted hover:text-white transition-colors"
                  >
                    {group.label}
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileExpanded === group.label && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === group.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-2 space-y-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="block py-2 text-sm text-white/50 hover:text-white transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link to="/blog" className="block py-3 text-sm font-medium text-brand-muted hover:text-white transition-colors">
                Blog
              </Link>
              <Link
                to="/contact"
                className="block w-full text-center py-3 mt-4 bg-white text-black rounded-full font-bold text-sm"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
