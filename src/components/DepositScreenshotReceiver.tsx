import React, { useState, useRef } from 'react';
import {
  BANK_DETAILS,
  DONATION_PURPOSES,
  CONTACT_INFO,
  CURRENCY_OPTIONS,
  PRESET_AMOUNTS,
} from '../data/content';
import { CurrencyCode, DepositProofData } from '../types';
import {
  Building2,
  Copy,
  Check,
  UploadCloud,
  FileImage,
  X,
  Eye,
  CheckCircle2,
  AlertCircle,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Send,
  ExternalLink,
  DollarSign,
  User,
  Hash,
  Calendar,
} from 'lucide-react';
import { GmailLogo } from './GmailLogo';

interface DepositScreenshotReceiverProps {
  onSwitchToPledge?: () => void;
}

export const DepositScreenshotReceiver: React.FC<DepositScreenshotReceiverProps> = ({
  onSwitchToPledge,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedRefCode, setGeneratedRefCode] = useState('');
  const [copiedMemo, setCopiedMemo] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<DepositProofData>({
    donorName: '',
    email: '',
    amountDeposited: '2000',
    currency: 'USD',
    transactionReference: '',
    dateOfTransfer: new Date().toISOString().split('T')[0],
    purpose: DONATION_PURPOSES[0].name,
    notes: '',
    screenshotFile: null,
    screenshotPreviewUrl: null,
    screenshotFileName: '',
    screenshotFileSize: '',
  });

  const currentCurrency =
    CURRENCY_OPTIONS.find((c) => c.code === formData.currency) || CURRENCY_OPTIONS[0];

  const presets = PRESET_AMOUNTS[formData.currency] || PRESET_AMOUNTS.USD;

  // Currency range limits ($2,000 to $100,000 USD equivalent)
  const getCurrencyRange = (code: string) => {
    switch (code) {
      case 'EUR':
        return { min: 1850, max: 92000, minDisplay: '€1,850', maxDisplay: '€92,000' };
      case 'GBP':
        return { min: 1600, max: 80000, minDisplay: '£1,600', maxDisplay: '£80,000' };
      case 'USD':
      default:
        return { min: 2000, max: 100000, minDisplay: '$2,000', maxDisplay: '$100,000' };
    }
  };

  const currentRange = getCurrencyRange(formData.currency);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleCopyAllBankDetails = () => {
    const allText = [
      `ELLA LANGLEY HOPE FOUNDATION - OFFICIAL PNC BANK DETAILS`,
      `======================================================`,
      `Bank: ${BANK_DETAILS.bankName}`,
      `Routing / Routine Number: ${BANK_DETAILS.routingNumber}`,
      `Account Number: ${BANK_DETAILS.accountNumber}`,
      `Account Name / Beneficiary: ${BANK_DETAILS.accountName}`,
      `Account Type: ${BANK_DETAILS.accountType}`,
      `Official Email: ${CONTACT_INFO.email}`,
      `======================================================`,
      `Note: Please email deposit receipt screenshots to ${CONTACT_INFO.email} for tax acknowledgment.`,
    ].join('\n');

    navigator.clipboard.writeText(allText);
    setCopiedField('all-bank');
    setTimeout(() => setCopiedField(null), 3000);
  };

  const processFile = (file: File) => {
    if (!file) return;

    // Check size limit (e.g. 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        screenshot: 'File size exceeds 15MB. Please upload a smaller image or compressed screenshot.',
      }));
      return;
    }

    // Format file size
    const sizeInKb = (file.size / 1024).toFixed(1);
    const sizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${sizeInKb} KB`;

    // Create object URL for preview
    const isImage = file.type.startsWith('image/');
    let previewUrl: string | null = null;
    if (isImage) {
      previewUrl = URL.createObjectURL(file);
    }

    setFormData((prev) => ({
      ...prev,
      screenshotFile: file,
      screenshotPreviewUrl: previewUrl,
      screenshotFileName: file.name,
      screenshotFileSize: sizeFormatted,
    }));

    if (errors.screenshot) {
      setErrors((prev) => ({ ...prev, screenshot: '' }));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    if (formData.screenshotPreviewUrl) {
      URL.revokeObjectURL(formData.screenshotPreviewUrl);
    }
    setFormData((prev) => ({
      ...prev,
      screenshotFile: null,
      screenshotPreviewUrl: null,
      screenshotFileName: '',
      screenshotFileSize: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.donorName.trim()) {
      newErrors.donorName = 'Please enter your full name or entity name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address for tax receipting.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const numAmount = parseFloat(formData.amountDeposited);
    if (!formData.amountDeposited || isNaN(numAmount)) {
      newErrors.amountDeposited = 'Please enter the transfer/deposit amount.';
    } else if (numAmount < currentRange.min) {
      newErrors.amountDeposited = `Minimum donation amount is ${currentRange.minDisplay}.`;
    } else if (numAmount > currentRange.max) {
      newErrors.amountDeposited = `Maximum online donation amount is ${currentRange.maxDisplay}. For larger contributions, please contact our team.`;
    }

    if (!formData.screenshotFile) {
      newErrors.screenshot = 'Please upload a screenshot or document of your deposit confirmation.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0] || 'screenshot';
      const el = document.getElementById(`deposit-field-${firstError}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Generate unique verification code: ELHF-DEP-XXXXX
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const trackingCode = `ELHF-DEP-${randomHex}`;
    setGeneratedRefCode(trackingCode);

    const now = new Date();
    const formattedTimestamp = now.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const subject = `Deposit Confirmation [${trackingCode}] - ${formData.donorName.trim()} - ${currentCurrency.symbol}${Number(formData.amountDeposited).toLocaleString()}`;

    const body = [
      `DEPOSIT CONFIRMATION & SCREENSHOT RECEIPT NOTIFICATION`,
      `Ella Langley Hope Foundation (ELHF)`,
      `======================================================`,
      `Verification Tracking Code: ${trackingCode}`,
      `Submission Timestamp: ${formattedTimestamp}`,
      ``,
      `Donor Information:`,
      `• Name: ${formData.donorName.trim()}`,
      `• Email: ${formData.email.trim()}`,
      ``,
      `Deposit Details:`,
      `• Bank Transferred To: ${BANK_DETAILS.bankName} (Routing: ${BANK_DETAILS.routingNumber} / Account: ${BANK_DETAILS.accountNumber})`,
      `• Amount Transferred: ${currentCurrency.symbol}${Number(formData.amountDeposited).toLocaleString()} ${formData.currency}`,
      `• Date of Deposit: ${formData.dateOfTransfer}`,
      `• Reference / Transaction ID: ${formData.transactionReference.trim() || 'N/A (See attached screenshot)'}`,
      `• Designated Fund: ${formData.purpose}`,
      `• Attached Deposit Screenshot: ${formData.screenshotFileName} (${formData.screenshotFileSize})`,
      ``,
      `Donor Notes / Dedication:`,
      `${formData.notes.trim() || 'No additional note provided.'}`,
      ``,
      `======================================================`,
      `Please verify this deposit and issue the official tax receipt to ${formData.email.trim()}.`,
    ].join('\n');

    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setIsSuccessModalOpen(true);

    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback
    }
  };

  const getDepositEmailBody = () => {
    return [
      `DEPOSIT CONFIRMATION & SCREENSHOT RECEIPT NOTIFICATION`,
      `Ella Langley Hope Foundation (ELHF)`,
      `Verification Code: ${generatedRefCode || 'ELHF-DEP-PENDING'}`,
      ``,
      `Donor Name: ${formData.donorName.trim()}`,
      `Donor Email: ${formData.email.trim()}`,
      `Amount: ${currentCurrency.symbol}${Number(formData.amountDeposited).toLocaleString()} ${formData.currency}`,
      `Transferred to: PNC (Routing: ${BANK_DETAILS.routingNumber}, Account: ${BANK_DETAILS.accountNumber})`,
      `Date: ${formData.dateOfTransfer}`,
      `Transaction Ref: ${formData.transactionReference || 'See attached screenshot'}`,
      `Designation: ${formData.purpose}`,
      `Screenshot File: ${formData.screenshotFileName}`,
      ``,
      `Note: ${formData.notes || 'None'}`,
    ].join('\n');
  };

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    CONTACT_INFO.email
  )}&su=${encodeURIComponent(
    `Deposit Confirmation [${generatedRefCode || 'ELHF-DEP'}] - ${formData.donorName} - ${currentCurrency.symbol}${formData.amountDeposited}`
  )}&body=${encodeURIComponent(getDepositEmailBody())}`;

  return (
    <div id="quick-bank-deposit-container" className="space-y-8">
      {/* 1. Official PNC Bank Account Details Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-[#2D0D3E] to-[#491C63] text-white rounded-3xl p-6 sm:p-9 border border-purple-300/30 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-purple-200">
                <Building2 className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-200 border border-purple-300/30">
                    Direct Bank Transfer
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Instant Settlement
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-200 bg-amber-950/70 border border-amber-400/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <DollarSign className="w-3 h-3 text-amber-300" />
                    <span>Minimum of $2,000 – $100,000</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  PNC Bank Direct Donation Account
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyAllBankDetails}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {copiedField === 'all-bank' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="text-emerald-300">All Details Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-purple-200" />
                  <span>Copy Full Bank Memo</span>
                </>
              )}
            </button>
          </div>

          {/* 4-Box Key Bank Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
            {/* Bank Name */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center justify-between group hover:bg-white/15 transition-colors">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200 block">
                  Bank Name
                </span>
                <span className="text-lg font-black text-white">
                  {BANK_DETAILS.bankName}
                </span>
                <span className="text-[11px] text-purple-300/80 block font-normal">
                  {BANK_DETAILS.institutionType}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(BANK_DETAILS.bankName, 'bank-name')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Copy Bank Name"
              >
                {copiedField === 'bank-name' ? (
                  <Check className="w-4 h-4 text-emerald-300" />
                ) : (
                  <Copy className="w-4 h-4 text-purple-200" />
                )}
              </button>
            </div>

            {/* Routing Number */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center justify-between group hover:bg-white/15 transition-colors">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200 block">
                  Routine / Routing Number
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-white tracking-wider">
                  {BANK_DETAILS.routingNumber}
                </span>
                <span className="text-[11px] text-purple-300/80 block font-normal">
                  ACH / Wire Routing
                </span>
              </div>
              <button
                type="button"
                id="copy-routing-btn"
                onClick={() => handleCopy(BANK_DETAILS.routingNumber, 'routing-num')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Copy Routing Number"
              >
                {copiedField === 'routing-num' ? (
                  <Check className="w-4 h-4 text-emerald-300" />
                ) : (
                  <Copy className="w-4 h-4 text-purple-200" />
                )}
              </button>
            </div>

            {/* Account Number */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center justify-between group hover:bg-white/15 transition-colors sm:col-span-2 lg:col-span-1">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200 block">
                  Account Number
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-white tracking-wider">
                  {BANK_DETAILS.accountNumber}
                </span>
                <span className="text-[11px] text-purple-300/80 block font-normal">
                  {BANK_DETAILS.accountType}
                </span>
              </div>
              <button
                type="button"
                id="copy-account-btn"
                onClick={() => handleCopy(BANK_DETAILS.accountNumber, 'account-num')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Copy Account Number"
              >
                {copiedField === 'account-num' ? (
                  <Check className="w-4 h-4 text-emerald-300" />
                ) : (
                  <Copy className="w-4 h-4 text-purple-200" />
                )}
              </button>
            </div>
          </div>

          {/* Account Beneficiary Banner */}
          <div className="bg-black/20 rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-300 shrink-0" />
              <span>
                Beneficiary Name: <strong className="text-white">{BANK_DETAILS.accountName}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-purple-200">
              <Clock className="w-4 h-4 text-purple-300 shrink-0" />
              <span>Verified 501(c)(3) Philanthropic Account</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Deposit Screenshot Receiver & Verification Form */}
      <div className="bg-white rounded-3xl border-2 border-purple-200/80 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#FAF5FF] via-purple-50/50 to-white px-6 sm:px-10 py-6 border-b border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#491C63] text-white text-[11px] font-bold uppercase tracking-wider">
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Deposit Verification Section</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold">
                <DollarSign className="w-3 h-3 text-amber-700" />
                <span>Minimum: $2,000 – $100,000</span>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Submit Your Deposit Screenshot
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
              Made a direct bank transfer to our PNC account? We accept donations from a <strong className="text-slate-900 font-bold">minimum of $2,000 up to $100,000</strong>. Upload your transaction screenshot or deposit slip below for immediate verification and official 501(c)(3) tax receipt issuance.
            </p>
          </div>

          {onSwitchToPledge && (
            <button
              type="button"
              onClick={onSwitchToPledge}
              className="text-xs font-bold text-[#491C63] hover:text-[#3B1352] underline shrink-0 cursor-pointer self-start sm:self-auto"
            >
              Prefer to make an email pledge first? →
            </button>
          )}
        </div>

        <form onSubmit={handleSubmitDeposit} noValidate className="p-6 sm:p-10 space-y-8">
          {/* Section: Upload Area (Drag and Drop + Manual Select) */}
          <div id="deposit-field-screenshot" className="space-y-2">
            <label className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileImage className="w-4 h-4 text-[#491C63]" />
                <span>Upload Screenshot / Transfer Receipt</span>
                <span className="text-rose-500">*</span>
              </span>
              <span className="text-xs text-slate-500 font-normal">
                JPG, PNG, WEBP, or PDF (Max 15MB)
              </span>
            </label>

            {/* If no file uploaded, show upload box */}
            {!formData.screenshotFile ? (
              <div
                id="deposit-dropzone"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-[#491C63] bg-purple-100/50 scale-[1.01]'
                    : errors.screenshot
                    ? 'border-rose-400 bg-rose-50/40 hover:bg-rose-50/70'
                    : 'border-purple-200 bg-purple-50/30 hover:bg-purple-50/80 hover:border-purple-300'
                }`}
              >
                <input
                  ref={fileInputRef}
                  id="screenshot-file-input"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-purple-100 flex items-center justify-center mx-auto mb-4 text-[#491C63]">
                  <UploadCloud className="w-8 h-8 animate-pulse text-[#491C63]" />
                </div>

                <h4 className="text-base font-bold text-slate-900 mb-1">
                  Drag and drop your deposit screenshot here
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 max-w-md mx-auto">
                  or <span className="text-[#491C63] font-bold underline">browse files</span> from your phone or computer
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 font-medium">
                  <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Mobile Banking Screenshots
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Wire & ACH Transfer Slips
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Teller & ATM Receipts
                  </span>
                </div>
              </div>
            ) : (
              /* Uploaded file preview banner */
              <div className="bg-[#FAF5FF] border-2 border-purple-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  {formData.screenshotPreviewUrl ? (
                    <div
                      onClick={() => setIsPreviewModalOpen(true)}
                      className="w-16 h-16 rounded-xl overflow-hidden border border-purple-200 bg-slate-900 shrink-0 cursor-pointer relative group"
                    >
                      <img
                        src={formData.screenshotPreviewUrl}
                        alt="Uploaded deposit screenshot"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 text-[#491C63]">
                      <FileImage className="w-8 h-8" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Screenshot Attached
                      </span>
                      <span className="text-[11px] text-slate-500">{formData.screenshotFileSize}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 truncate mt-1">
                      {formData.screenshotFileName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Click preview to inspect before submitting.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {formData.screenshotPreviewUrl && (
                    <button
                      type="button"
                      onClick={() => setIsPreviewModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-bold text-[#491C63] hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            )}

            {errors.screenshot && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1 pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.screenshot}</span>
              </p>
            )}
          </div>

          {/* Amount and Currency */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#491C63]" />
                <span>Deposited Amount & Currency</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-950 font-extrabold bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
                  Minimum of {currentRange.minDisplay} – {currentRange.maxDisplay}
                </span>
              </div>
            </div>

            {/* Currency selector buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CURRENCY_OPTIONS.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    const defaultForCurrency = PRESET_AMOUNTS[c.code]?.[0] || 2000;
                    setFormData({
                      ...formData,
                      currency: c.code,
                      amountDeposited: String(defaultForCurrency),
                    });
                  }}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                    formData.currency === c.code
                      ? 'bg-[#491C63] text-white border-[#491C63] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50/50'
                  }`}
                >
                  <span className="text-base leading-none">{c.symbol}</span>
                  <span>{c.code}</span>
                </button>
              ))}
            </div>

            {/* Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {presets.map((preset) => {
                const isSelected = formData.amountDeposited === String(preset);
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, amountDeposited: String(preset) });
                      if (errors.amountDeposited) {
                        setErrors({ ...errors, amountDeposited: '' });
                      }
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border text-center ${
                      isSelected
                        ? 'bg-purple-50 border-[#491C63] text-[#491C63] ring-2 ring-purple-600/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/30'
                    }`}
                  >
                    {currentCurrency.symbol}
                    {preset.toLocaleString()}
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Input */}
            <div id="deposit-field-amountDeposited" className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold text-base">
                {currentCurrency.symbol}
              </div>
              <input
                id="deposit-amount-input"
                type="number"
                min={currentRange.min}
                max={currentRange.max}
                value={formData.amountDeposited}
                onChange={(e) => {
                  setFormData({ ...formData, amountDeposited: e.target.value });
                  if (errors.amountDeposited) {
                    setErrors({ ...errors, amountDeposited: '' });
                  }
                }}
                placeholder={`Enter exact transfer amount (${currentRange.minDisplay} – ${currentRange.maxDisplay})`}
                className={`w-full pl-10 pr-16 py-3.5 text-base sm:text-lg font-bold text-slate-900 bg-slate-50/50 rounded-xl border ${
                  errors.amountDeposited
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-[#491C63] focus:ring-purple-200'
                } focus:outline-none focus:ring-3 transition-all`}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs font-bold text-slate-400">
                {formData.currency}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 px-1 pt-1 gap-2">
              <span className="flex items-center gap-1 text-[#491C63] font-bold">
                <span>Direct Bank Transfer Requirement:</span>
                <span className="bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  Minimum {currentRange.minDisplay} up to {currentRange.maxDisplay}
                </span>
              </span>
              <span className="text-[11px] text-slate-400">Tax deductible 501(c)(3)</span>
            </div>

            {errors.amountDeposited && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.amountDeposited}</span>
              </p>
            )}
          </div>

          {/* Donor Contact Details & Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {/* Donor Name */}
            <div id="deposit-field-donorName" className="space-y-1.5">
              <label
                htmlFor="deposit-donor-name"
                className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-[#491C63]" />
                <span>Donor Full Name / Organization</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                id="deposit-donor-name"
                type="text"
                required
                value={formData.donorName}
                onChange={(e) => {
                  setFormData({ ...formData, donorName: e.target.value });
                  if (errors.donorName) setErrors({ ...errors, donorName: '' });
                }}
                placeholder="e.g. Johnathan Miller / Miller Family Trust"
                className={`w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 rounded-xl border ${
                  errors.donorName
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-[#491C63] focus:ring-purple-200'
                } focus:outline-none focus:ring-3 transition-all`}
              />
              {errors.donorName && (
                <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.donorName}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div id="deposit-field-email" className="space-y-1.5">
              <label
                htmlFor="deposit-donor-email"
                className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-[#491C63]" />
                <span>Email Address (For Tax Receipt)</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                id="deposit-donor-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="e.g. johnathan@example.com"
                className={`w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 rounded-xl border ${
                  errors.email
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-[#491C63] focus:ring-purple-200'
                } focus:outline-none focus:ring-3 transition-all`}
              />
              {errors.email && (
                <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Transfer Reference & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Transaction Reference / Ref # */}
            <div className="space-y-1.5">
              <label
                htmlFor="deposit-tx-reference"
                className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <Hash className="w-4 h-4 text-[#491C63]" />
                <span>Transaction Ref / Confirmation #</span>
                <span className="text-xs text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="deposit-tx-reference"
                type="text"
                value={formData.transactionReference}
                onChange={(e) =>
                  setFormData({ ...formData, transactionReference: e.target.value })
                }
                placeholder="e.g. PNC-WIRE-982341 or Bank Ref"
                className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 rounded-xl border border-slate-200 focus:border-[#491C63] focus:ring-3 focus:ring-purple-200 focus:outline-none transition-all"
              />
            </div>

            {/* Date of Transfer */}
            <div className="space-y-1.5">
              <label
                htmlFor="deposit-transfer-date"
                className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-[#491C63]" />
                <span>Date of Transfer</span>
              </label>
              <input
                id="deposit-transfer-date"
                type="date"
                value={formData.dateOfTransfer}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfTransfer: e.target.value })
                }
                className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 rounded-xl border border-slate-200 focus:border-[#491C63] focus:ring-3 focus:ring-purple-200 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Program Designation */}
          <div className="space-y-1.5">
            <label
              htmlFor="deposit-purpose-select"
              className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#491C63]" />
              <span>Donation Designation / Fund</span>
              <span className="text-rose-500">*</span>
            </label>
            <select
              id="deposit-purpose-select"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 rounded-xl border border-slate-200 focus:border-[#491C63] focus:ring-3 focus:ring-purple-200 focus:outline-none transition-all cursor-pointer font-medium"
            >
              {DONATION_PURPOSES.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Notes / Special Instructions */}
          <div className="space-y-1.5">
            <label
              htmlFor="deposit-notes"
              className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
            >
              <span>Donor Notes / Dedication</span>
              <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="deposit-notes"
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any specific dedication, community project preference, or receipt delivery instructions..."
              className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 rounded-xl border border-slate-200 focus:border-[#491C63] focus:ring-3 focus:ring-purple-200 focus:outline-none transition-all resize-y"
            />
          </div>

          {/* Summary Box & Submit */}
          <div className="bg-[#FAF5FF] rounded-2xl p-5 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
                Verification Summary
              </span>
              <div className="text-lg sm:text-xl font-black text-slate-900">
                {currentCurrency.symbol}
                {Number(formData.amountDeposited || 0).toLocaleString()} {formData.currency}
                <span className="text-xs font-semibold text-purple-800 ml-2">
                  → PNC Direct Transfer
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Proof Screenshot:{' '}
                <strong className="text-slate-800">
                  {formData.screenshotFileName || 'Pending upload'}
                </strong>
              </p>
            </div>

            <div className="text-xs text-purple-950 sm:text-right font-medium">
              <span>Recipient: <strong>{CONTACT_INFO.email}</strong></span>
              <div className="text-[11px] text-slate-500">Official 501(c)(3) tax acknowledgment</div>
            </div>
          </div>

          {/* Primary Submit Button */}
          <div>
            <button
              id="submit-deposit-screenshot-btn"
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 px-8 rounded-2xl text-base sm:text-lg font-black text-white bg-[#491C63] hover:bg-[#3B1352] shadow-lg shadow-purple-950/20 active:scale-[0.99] transition-all cursor-pointer"
            >
              <Send className="w-5 h-5 text-white" />
              <span>Submit Deposit Screenshot & Notify Team</span>
            </button>
            <p className="text-center text-xs text-slate-500 mt-3">
              This notifies our foundation inbox at <strong className="text-purple-900">{CONTACT_INFO.email}</strong>. Our team will verify your PNC deposit and email your formal tax receipt within 12–24 hours.
            </p>
          </div>
        </form>
      </div>

      {/* Image Preview Modal */}
      {isPreviewModalOpen && formData.screenshotPreviewUrl && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Deposit Screenshot Preview
                </h4>
                <p className="text-xs text-slate-500">
                  {formData.screenshotFileName} ({formData.screenshotFileSize})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-auto rounded-2xl border border-slate-200 bg-slate-950/5 flex items-center justify-center p-2">
              <img
                src={formData.screenshotPreviewUrl}
                alt="Deposit confirmation screenshot preview"
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-xs"
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#491C63] text-white text-xs font-bold hover:bg-[#3B1352] transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal for Deposit Submission */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 max-w-lg w-full p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-emerald-700 shadow-sm p-3">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-[#491C63] text-xs font-extrabold mb-2">
                Verification Code: {generatedRefCode}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                Deposit Notification Prepared!
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Your deposit confirmation of{' '}
                <strong className="text-[#491C63] font-bold">
                  {currentCurrency.symbol}
                  {Number(formData.amountDeposited).toLocaleString()} {formData.currency}
                </strong>{' '}
                is ready to send to our team at{' '}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="font-bold text-[#491C63] underline"
                >
                  {CONTACT_INFO.email}
                </a>.
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-[#FAF5FF] rounded-2xl p-4 sm:p-5 border border-purple-100 mb-6 text-xs sm:text-sm text-slate-700 space-y-2">
              <div className="flex justify-between py-1 border-b border-purple-100">
                <span className="text-slate-500 font-medium">Donor Name:</span>
                <span className="font-bold text-slate-900">{formData.donorName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-purple-100">
                <span className="text-slate-500 font-medium">Bank Deposited:</span>
                <span className="font-bold text-slate-900">PNC (Account: {BANK_DETAILS.accountNumber})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-purple-100">
                <span className="text-slate-500 font-medium">Attached Screenshot:</span>
                <span className="font-semibold text-purple-900 truncate max-w-[200px]">
                  {formData.screenshotFileName}
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

            {/* Quick Actions */}
            <div className="flex flex-col gap-2.5">
              <a
                id="open-deposit-gmail-btn"
                href={gmailWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#491C63] hover:bg-[#3B1352] transition-colors shadow-sm cursor-pointer"
              >
                <GmailLogo className="w-4 h-4" />
                <span>Open & Send in Gmail (Web)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                type="button"
                onClick={() => {
                  const fullMemo = [
                    `TO: ${CONTACT_INFO.email}`,
                    `SUBJECT: Deposit Confirmation [${generatedRefCode}] - ${formData.donorName} - ${currentCurrency.symbol}${formData.amountDeposited}`,
                    ``,
                    getDepositEmailBody(),
                  ].join('\n');
                  navigator.clipboard.writeText(fullMemo);
                  setCopiedMemo(true);
                  setTimeout(() => setCopiedMemo(false), 3000);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
              >
                {copiedMemo ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Details Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Copy Full Confirmation Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-purple-50 text-center">
              <p className="text-[11px] text-slate-400 font-medium">
                Thank you for your generous direct bank donation to Ella Langley Hope Foundation!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
