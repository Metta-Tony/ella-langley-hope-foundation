import React, { useState } from 'react';
import { ArrowUp, ShieldCheck, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { ELHFLogo } from './ELHFLogo';
import { GmailLogo } from './GmailLogo';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Our Story & Roots', href: '#about' },
    { name: 'Community Initiatives', href: '#gallery' },
    { name: 'Measurable Impact', href: '#impact' },
    { name: 'Make a Donation Pledge', href: '#donate' },
    { name: 'Voices of Hope', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <footer id="main-footer" className="bg-[#1A0826] text-purple-200/70 pt-16 pb-12 border-t border-purple-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-purple-900/50">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <ELHFLogo variant="white-horizontal" size="md" />

            <p className="text-sm text-purple-200/80 leading-relaxed max-w-sm font-normal">
              Giving back to the communities that raised her. Dedicated to bringing hope, changing lives, and building futures across Alabama and beyond.
            </p>

            <div className="flex items-center gap-2 text-xs text-purple-300/90 pt-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Direct Pledge Giving • Zero Administrative Deductions</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-purple-300 transition-colors inline-block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Official Email & Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <GmailLogo className="w-4 h-4" />
                </div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-white transition-colors text-purple-200 break-all font-semibold"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-purple-200/80">
                  {CONTACT_INFO.address}, {CONTACT_INFO.cityStateZip}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-purple-300/60 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()} Ella Langley Hope Foundation. All rights reserved.
            </span>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={() => setModalType('privacy')}
              className="text-purple-300/80 hover:text-white underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={() => setModalType('terms')}
              className="text-purple-300/80 hover:text-white underline transition-colors cursor-pointer"
            >
              Terms & Pledges
            </button>
          </div>

          {/* Back to Top Button */}
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-[#491C63] text-purple-200 hover:text-white border border-purple-800/80 transition-all cursor-pointer shadow-sm group"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-purple-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      <PrivacyPolicyModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || 'privacy'}
      />
    </footer>
  );
};
