import React, { useState } from 'react';
import { CONTACT_INFO, BANK_DETAILS, FOUNDATION_MANAGER } from '../data/content';
import { MapPin, Send, Copy, Check, ExternalLink, Mail, Building2, UploadCloud } from 'lucide-react';
import { GmailLogo } from './GmailLogo';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyBankDetails = () => {
    const text = `PNC Bank | Routing: ${BANK_DETAILS.routingNumber} | Account: ${BANK_DETAILS.accountNumber} | Beneficiary: ${BANK_DETAILS.accountName}`;
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const gmailWebmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    CONTACT_INFO.email
  )}&su=${encodeURIComponent('Inquiry - Ella Langley Hope Foundation')}`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#491C63] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            <GmailLogo className="w-4 h-4" />
            <span>Direct Email Communication</span>
          </div>
          <h2
            id="contact-headline"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Connect Directly via Gmail
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you are curious about our foundation operations, interested in volunteering, or have questions regarding a donation pledge, our team communicates directly through our official Gmail address.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Foundation Manager Profile */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-purple-50/70 via-white to-purple-50/40 border-2 border-purple-200 shadow-xs">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[11px] font-extrabold text-[#491C63] uppercase tracking-widest block mb-1">
                      {FOUNDATION_MANAGER.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {FOUNDATION_MANAGER.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-slate-600 border border-purple-100 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#491C63]" />
                    {FOUNDATION_MANAGER.location}
                  </span>
                </div>

                <div className="space-y-3">
                  {FOUNDATION_MANAGER.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Primary Official Gmail Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-purple-50/70 via-white to-purple-50/40 border-2 border-purple-200 hover:border-[#491C63]/40 transition-all shadow-xs">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-purple-100 flex items-center justify-center p-2.5">
                      <GmailLogo className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold text-[#491C63] uppercase tracking-widest block">
                        Official Inbox
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        Foundation Coordinator
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active Daily
                  </span>
                </div>

                {/* Email Address Display */}
                <div className="p-3.5 rounded-2xl bg-white border border-purple-100 flex items-center justify-between gap-2 mb-4">
                  <a
                    id="contact-email-link-main"
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm sm:text-base font-bold text-[#491C63] hover:text-[#3B1352] transition-colors break-all flex items-center gap-2"
                  >
                    <span>{CONTACT_INFO.email}</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl text-slate-500 hover:text-[#491C63] hover:bg-purple-50 transition-colors cursor-pointer shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Action Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    id="open-gmail-web-btn"
                    href={gmailWebmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#491C63] hover:bg-[#3B1352] text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    <GmailLogo className="w-4 h-4" />
                    <span>Open in Gmail</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  <a
                    id="open-default-mail-btn"
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-purple-50 text-slate-800 border border-slate-200 font-bold text-xs transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#491C63]" />
                    <span>Default Mail App</span>
                  </a>
                </div>
              </div>

              {/* PNC Direct Transfer Quick Card */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white border border-purple-900/40 shadow-md relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                    <Building2 className="w-4 h-4 text-purple-300" />
                    <span>Direct PNC Bank Transfer</span>
                    <span className="text-[10px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                      $2k–$100k
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyBankDetails}
                    className="text-[11px] font-bold text-purple-200 hover:text-white flex items-center gap-1 cursor-pointer bg-white/10 px-2.5 py-1 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {copiedBank ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-300" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Details</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="text-[10px] text-purple-200 block uppercase">Routing</span>
                    <span className="font-mono font-bold text-sm text-white">{BANK_DETAILS.routingNumber}</span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="text-[10px] text-purple-200 block uppercase">Account</span>
                    <span className="font-mono font-bold text-sm text-white">{BANK_DETAILS.accountNumber}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-purple-200">Submit deposit proof screenshot:</span>
                  <a
                    href="#donate"
                    className="font-bold text-white underline hover:text-purple-200 flex items-center gap-1"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Screenshot</span>
                  </a>
                </div>
              </div>

              {/* Office Location & Origin */}
              <div className="p-6 rounded-3xl bg-purple-50/40 border border-purple-100 hover:bg-purple-50 hover:border-purple-300 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-purple-100 flex items-center justify-center text-[#491C63] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider mb-1">
                      Roots & Community Outreach
                    </h4>
                    <p className="text-sm sm:text-base font-bold text-slate-900">
                      {CONTACT_INFO.address}
                    </p>
                    <p className="text-xs text-slate-500">{CONTACT_INFO.cityStateZip}</p>
                    <p className="text-xs text-purple-900 font-semibold mt-1">
                      Operating Hours: {CONTACT_INFO.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Email Notice Box */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-[#2D0D3E] via-[#3B1352] to-[#491C63] text-white flex items-center gap-4 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <GmailLogo className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate">Direct Donor & Volunteer Desk</h4>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-xs text-purple-200 hover:text-white underline transition-colors break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Direct Quick Note / Volunteer Inquiry Card */}
          <div className="lg:col-span-6 bg-[#FAF5FF] rounded-3xl p-8 border border-purple-100 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GmailLogo className="w-5 h-5" />
                <h3 className="text-xl font-bold text-slate-900">
                  Send a Direct Message
                </h3>
              </div>
              <p className="text-sm text-slate-600 mb-6 font-normal">
                Click below to compose an inquiry directly to our foundation coordinator at{' '}
                <strong className="text-[#491C63] font-bold">{CONTACT_INFO.email}</strong>:
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-purple-100 text-sm text-slate-700">
                  <span className="font-bold text-[#491C63] block mb-1">Volunteering & Hospital Visits:</span>
                  Join our pediatric bedside visits, care bundle packaging drives, or youth athletics initiatives across Alabama and regional communities.
                </div>

                <div className="p-4 bg-white rounded-2xl border border-purple-100 text-sm text-slate-700">
                  <span className="font-bold text-[#491C63] block mb-1">In-Kind & Community Support:</span>
                  We coordinate donations of children's books, school supplies, sports gear, and direct family assistance kits.
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-purple-100 flex flex-col sm:flex-row gap-3">
              <a
                id="contact-mail-cta"
                href={`mailto:${CONTACT_INFO.email}?subject=Inquiry - Ella Langley Hope Foundation`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#491C63] hover:bg-[#3B1352] text-white font-bold text-sm transition-colors cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Write to {CONTACT_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
