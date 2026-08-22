import React from 'react';
import { X, Shield, FileCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const PrivacyPolicyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        id="policy-modal-container"
        className="bg-white rounded-3xl shadow-2xl border border-purple-100 max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#491C63] flex items-center justify-center">
              {type === 'privacy' ? <Shield className="w-5 h-5" /> : <FileCheck className="w-5 h-5" />}
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Donation Principles'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-4 space-y-4 text-sm text-slate-600 leading-relaxed pr-2">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Effective Date:</strong> May 2023 / Updated 2026
              </p>
              <p>
                The <strong>Ella Langley Hope Foundation (ELHF)</strong> is committed to honoring and protecting your privacy. Because this landing page operates purely via direct email communication (using client-side <code>mailto:</code> actions), <strong>no personal data is stored in any external database or sold to third-party advertisers.</strong>
              </p>
              <h4 className="font-bold text-slate-900 text-base pt-2">1. Information Collection</h4>
              <p>
                When you initiate a donation pledge via email, the information you enter (Name, Email, Amount, and Message) is composed into a standard electronic mail message directed to our foundation inbox (<code>{CONTACT_INFO.email}</code>). We use this information solely to acknowledge your gift, issue tax receipts, and coordinate community programs.
              </p>
              <h4 className="font-bold text-slate-900 text-base pt-2">2. Zero Third-Party Tracking</h4>
              <p>
                We do not sell, rent, or trade your contact information. Your pledge details remain strictly between you and the Ella Langley Hope Foundation administrative coordinators.
              </p>
              <h4 className="font-bold text-slate-900 text-base pt-2">3. Donor Rights</h4>
              <p>
                You may request at any time to have your email address removed from our acknowledgment updates by emailing <code>{CONTACT_INFO.email}</code> with the subject "Unsubscribe / Remove Contact".
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Effective Date:</strong> May 2023 / Updated 2026
              </p>
              <h4 className="font-bold text-slate-900 text-base">1. Donation Pledges</h4>
              <p>
                Pledges submitted through this website represent voluntary donor intentions to support the community initiatives of the Ella Langley Hope Foundation. No automated charges or bank deductions occur on this web page.
              </p>
              <h4 className="font-bold text-slate-900 text-base pt-2">2. Fund Allocation</h4>
              <p>
                All funds pledged to specific initiatives (e.g., Pediatric Healthcare Support, Youth Sports & Education, Community Relief) are strictly allocated to their designated purpose in accordance with our 100% community-focused transparency commitment.
              </p>
              <h4 className="font-bold text-slate-900 text-base pt-2">3. Official Receipts</h4>
              <p>
                Tax acknowledgment letters are generated manually by our team following the confirmation and receipt of your pledged contribution.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-purple-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#491C63] hover:bg-[#3B1352] text-white font-bold text-sm transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
