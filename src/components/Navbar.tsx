import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { ELHFLogo } from './ELHFLogo';

interface NavbarProps {
  onDonateClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDonateClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Impact & Photos', href: '#initiatives' },
    { name: 'Mission', href: '#philosophy-section' },
    { name: 'Donate', href: '#donate' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-purple-100 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-purple-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Standalone Official Emblem (Name removed from nav bar) */}
          <a
            id="brand-logo-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group focus:outline-none flex items-center p-1 rounded-2xl hover:bg-purple-50 transition-all"
            aria-label="Ella Langley Hope Foundation - Return to top"
            title="Ella Langley Hope Foundation"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/60 border border-purple-200/80 flex items-center justify-center p-1.5 shadow-xs group-hover:scale-105 group-hover:border-purple-400 group-hover:shadow-md transition-all">
              <ELHFLogo variant="emblem" size="md" />
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-slate-700 hover:text-[#491C63] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#491C63] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-donate-cta-button"
              onClick={onDonateClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-[#491C63] hover:bg-[#3B1352] shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Donate Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center sm:hidden">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#491C63] hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-white border-b border-purple-100 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`mobile-nav-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:text-[#491C63] hover:bg-purple-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-purple-100 flex flex-col gap-2">
              <button
                id="mobile-nav-donate-button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDonateClick();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-bold text-white bg-[#491C63] hover:bg-[#3B1352] shadow-sm cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Make a Donation</span>
              </button>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 py-1">
                <ShieldCheck className="w-4 h-4 text-[#491C63]" />
                <span>Direct Mailto Pledge • Hope Hull, AL</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
