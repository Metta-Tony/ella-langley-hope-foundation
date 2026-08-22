import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, X, Heart } from 'lucide-react';
import { DonationFormData } from '../types';
import { CONTACT_INFO } from '../data/content';
import { GmailLogo } from './GmailLogo';

interface PledgeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: DonationFormData;
  formattedAmount: string;
  mailtoUrl: string;
  emailBodyText: string;
}

export const PledgeSuccessModal: React.FC<PledgeSuccessModalProps> = ({
  isOpen,
  onClose,
  formData,
  formattedAmount,
  mailtoUrl,
  emailBodyText,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const emailSubject = `New Donation Pledge from ${formData.fullName.trim()}`;
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    CONTACT_INFO.email
  )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBodyText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `TO: ${CONTACT_INFO.email}\nSUBJECT: ${emailSubject}\n\n${emailBodyText}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleReopenMailto = () => {
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        id="pledge-success-modal"
        className="bg-white rounded-3xl shadow-2xl border border-purple-100 max-w-lg w-full p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Heading */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto mb-4 shadow-sm p-3">
            <GmailLogo className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
            Pledge Pre-Formatted
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Your pledge of <strong className="text-[#491C63] font-bold">{formattedAmount}</strong> is ready for delivery to{' '}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="font-bold text-[#491C63] underline hover:text-[#3B1352]"
            >
              {CONTACT_INFO.email}
            </a>.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[#FAF5FF] rounded-2xl p-4 sm:p-5 border border-purple-100 mb-6 text-xs sm:text-sm text-slate-700 space-y-2">
          <div className="flex justify-between py-1 border-b border-purple-100">
            <span className="text-slate-500 font-medium">Donor Name:</span>
            <span className="font-bold text-slate-900">{formData.fullName}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-purple-100">
            <span className="text-slate-500 font-medium">Pledge Amount:</span>
            <span className="font-black text-[#491C63]">{formattedAmount}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-purple-100">
            <span className="text-slate-500 font-medium">Designated Purpose:</span>
            <span className="font-semibold text-slate-900 text-right truncate max-w-[200px]">
              {formData.purpose}
            </span>
          </div>
          <div className="flex justify-between py-1 items-center">
            <span className="text-slate-500 font-medium">Destination:</span>
            <span className="font-bold text-[#491C63] flex items-center gap-1.5">
              <GmailLogo className="w-3.5 h-3.5" />
              <span>{CONTACT_INFO.email}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <a
            id="open-modal-gmail-btn"
            href={gmailWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#491C63] hover:bg-[#3B1352] transition-colors shadow-sm cursor-pointer"
          >
            <GmailLogo className="w-4 h-4" />
            <span>Open in Gmail (Web)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <button
            id="relaunch-mailto-btn"
            onClick={handleReopenMailto}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-purple-50/70 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#491C63]" />
            <span>Open in Default Mail App</span>
          </button>

          <button
            id="copy-pledge-btn"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Pledge Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Raw Pledge Message</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-5 pt-4 border-t border-purple-50 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 font-medium">
            <Heart className="w-3 h-3 text-[#491C63] fill-[#491C63]" />
            <span>Thank you for supporting the Ella Langley Hope Foundation!</span>
          </p>
        </div>
      </div>
    </div>
  );
};
