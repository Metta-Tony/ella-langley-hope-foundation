import React, { useState } from 'react';
import {
  CURRENCY_OPTIONS,
  PRESET_AMOUNTS,
  DONATION_PURPOSES,
  CONTACT_INFO,
  BANK_DETAILS,
} from '../data/content';
import { CurrencyCode, DonationFormData } from '../types';
import {
  Heart,
  Mail,
  User,
  DollarSign,
  FileText,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Building2,
  UploadCloud,
  Check,
  Copy,
} from 'lucide-react';
import { PledgeSuccessModal } from './PledgeSuccessModal';
import { GmailLogo } from './GmailLogo';
import { DepositScreenshotReceiver } from './DepositScreenshotReceiver';

export const DonationForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'direct_bank' | 'email_pledge'>('direct_bank');
  const [copiedBankInfo, setCopiedBankInfo] = useState(false);

  const [formData, setFormData] = useState<DonationFormData>({
    fullName: '',
    email: '',
    phone: '',
    amount: '2000',
    currency: 'USD',
    purpose: DONATION_PURPOSES[0].name,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [generatedMailto, setGeneratedMailto] = useState('');
  const [plainEmailBody, setPlainEmailBody] = useState('');
  const [submitStatusMessage, setSubmitStatusMessage] = useState<string | null>(null);

  const currentCurrency =
    CURRENCY_OPTIONS.find((c) => c.code === formData.currency) || CURRENCY_OPTIONS[0];

  const presets = PRESET_AMOUNTS[formData.currency] || PRESET_AMOUNTS.USD;

  // Range limits in USD terms (min $2,000, max $100,000)
  // Adjusted proportionally per currency
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

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    const defaultForCurrency = PRESET_AMOUNTS[newCurrency]?.[0] || 2000;
    setFormData((prev) => ({
      ...prev,
      currency: newCurrency,
      amount: String(defaultForCurrency),
    }));
  };

  const handlePresetSelect = (amountVal: number) => {
    setFormData((prev) => ({
      ...prev,
      amount: String(amountVal),
    }));
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g., name@example.com).';
    }

    const numAmount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(numAmount)) {
      newErrors.amount = 'Please enter a valid donation amount.';
    } else if (numAmount < currentRange.min) {
      newErrors.amount = `Minimum pledge amount is ${currentRange.minDisplay}.`;
    } else if (numAmount > currentRange.max) {
      newErrors.amount = `Maximum pledge amount is ${currentRange.maxDisplay}. For larger contributions, please contact us directly.`;
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Please select a donation purpose.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0];
      const errorElem = document.getElementById(`field-${firstErrorKey}`);
      if (errorElem) {
        errorElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    const destinationEmail = CONTACT_INFO.email;
    const emailSubject = `New Donation Pledge from ${formData.fullName.trim()}`;

    const bodyContent = [
      `DONATION PLEDGE DETAILS - ELLA LANGLEY HOPE FOUNDATION (ELHF)`,
      `Motto: Bringing Hope. Changing Lives. Building Futures.`,
      `==================================================`,
      ``,
      `Donor Information:`,
      `• Full Name: ${formData.fullName.trim()}`,
      `• Email: ${formData.email.trim()}`,
      ``,
      `Pledge Information:`,
      `• Donation Amount: ${currentCurrency.symbol}${Number(formData.amount).toLocaleString()} (${formData.currency})`,
      `• Donation Purpose: ${formData.purpose}`,
      `• Pledge Timestamp: ${formattedDate}`,
      ``,
      `Bank Transfer Reference:`,
      `• Bank: ${BANK_DETAILS.bankName} (Routing: ${BANK_DETAILS.routingNumber} / Account: ${BANK_DETAILS.accountNumber})`,
      ``,
      `Personal Message / Dedication:`,
      `${formData.message.trim() || 'No additional note provided.'}`,
      ``,
      `==================================================`,
      `Thank you for supporting the Ella Langley Hope Foundation!`,
      `Please reply to this email to receive settlement guidelines and your tax receipt acknowledgment.`,
    ].join('\n');

    const mailtoUrl = `mailto:${destinationEmail}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(bodyContent)}`;

    setGeneratedMailto(mailtoUrl);
    setPlainEmailBody(bodyContent);
    setSubmitStatusMessage(
      'Your email app is opening to complete your donation pledge.'
    );
    setIsSuccessModalOpen(true);

    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback
    }
  };

  return (
    <section id="donate" className="py-20 md:py-28 bg-gradient-to-b from-white via-[#FCF9FF] to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-[#491C63] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            <Heart className="w-3.5 h-3.5 text-[#491C63] fill-[#491C63]" />
            <span>Support The Foundation</span>
          </div>
          <h2
            id="donation-section-headline"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Quick Donations & Pledges
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Choose your preferred donation method below: make a direct transfer to our <strong>PNC Bank account</strong> (minimum of $2,000 – $100,000) and upload your confirmation screenshot, or submit an <strong>email pledge</strong>.
          </p>
        </div>

        {/* Donation Method Selector Tabs */}
        <div className="max-w-xl mx-auto mb-10 p-1.5 bg-purple-100/70 border border-purple-200 rounded-2xl flex items-center gap-2">
          <button
            id="tab-direct-bank"
            type="button"
            onClick={() => setActiveTab('direct_bank')}
            className={`flex-1 py-3 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'direct_bank'
                ? 'bg-[#491C63] text-white shadow-md'
                : 'text-slate-700 hover:text-[#491C63] hover:bg-white/60'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <div className="flex flex-col sm:flex-row items-center sm:gap-1.5 leading-tight">
              <span>Quick PNC Bank Transfer</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${activeTab === 'direct_bank' ? 'bg-amber-400 text-slate-900' : 'bg-purple-200 text-purple-900'}`}>
                $2k–$100k
              </span>
            </div>
          </button>

          <button
            id="tab-email-pledge"
            type="button"
            onClick={() => setActiveTab('email_pledge')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'email_pledge'
                ? 'bg-[#491C63] text-white shadow-md'
                : 'text-slate-700 hover:text-[#491C63] hover:bg-white/60'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email Pledge Form</span>
          </button>
        </div>

        {/* Conditional Rendering of Selected Method */}
        {activeTab === 'direct_bank' ? (
          <div className="max-w-4xl mx-auto">
            <DepositScreenshotReceiver onSwitchToPledge={() => setActiveTab('email_pledge')} />
          </div>
        ) : (
          /* Form Container for Email Pledge */
          <div className="max-w-4xl mx-auto">
            {submitStatusMessage && (
              <div
                id="submission-status-banner"
                className="mb-8 p-4 bg-purple-50 border border-purple-300 rounded-2xl flex items-center justify-between gap-4 text-purple-950 text-sm font-medium animate-in fade-in"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-700 shrink-0" />
                  <span>{submitStatusMessage}</span>
                </div>
                <button
                  onClick={() => setIsSuccessModalOpen(true)}
                  className="text-xs font-bold text-[#491C63] underline hover:text-purple-950 cursor-pointer shrink-0"
                >
                  View Details
                </button>
              </div>
            )}

            {/* Quick Bank Banner within Pledge Mode */}
            <div className="mb-6 bg-purple-50 rounded-2xl p-4 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#491C63] shrink-0" />
                <span className="text-slate-700">
                  Prefer direct deposit right away? Transfer to <strong>PNC Bank</strong> (Routing: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-purple-200 text-[#491C63]">{BANK_DETAILS.routingNumber}</code>, Account: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-purple-200 text-[#491C63]">{BANK_DETAILS.accountNumber}</code>).
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('direct_bank')}
                className="text-[#491C63] font-bold underline hover:text-[#3B1352] shrink-0 cursor-pointer"
              >
                Go to Screenshot Upload →
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-purple-100 shadow-2xl overflow-hidden">
              {/* Top form banner */}
              <div className="bg-gradient-to-r from-[#2D0D3E] via-[#3B1352] to-[#491C63] text-white px-6 sm:px-10 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-300" />
                    <span>Donation Pledge Form</span>
                  </h3>
                  <p className="text-xs text-purple-200 mt-1 flex items-center gap-1.5 flex-wrap">
                    <GmailLogo className="w-4 h-4" />
                    <span>Direct email submission to</span>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-white font-bold underline hover:text-purple-200"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-purple-100 border border-white/15 self-start sm:self-auto">
                  <ShieldCheck className="w-4 h-4 text-purple-300" />
                  <span>100% Direct Pledges</span>
                </div>
              </div>

              {/* Main Form Fields */}
              <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 space-y-8">
                {/* Currency & Amount Selection */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label
                      htmlFor="currency-selector"
                      className="text-sm font-bold text-slate-900 flex items-center gap-1.5"
                    >
                      <DollarSign className="w-4 h-4 text-[#491C63]" />
                      <span>Select Currency & Amount</span>
                    </label>
                    <span className="text-xs text-[#491C63] font-bold bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                      Pledge Range: {currentRange.minDisplay} – {currentRange.maxDisplay}
                    </span>
                  </div>

                  {/* Currency Switcher Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CURRENCY_OPTIONS.map((c) => (
                      <button
                        key={c.code}
                        id={`currency-btn-${c.code}`}
                        type="button"
                        onClick={() => handleCurrencyChange(c.code)}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                          formData.currency === c.code
                            ? 'bg-[#491C63] text-white border-[#491C63] shadow-sm scale-101'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50/50 hover:border-purple-200'
                        }`}
                      >
                        <span className="text-base leading-none">{c.symbol}</span>
                        <span>{c.code}</span>
                      </button>
                    ))}
                  </div>

                  {/* Preset Amount Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-1">
                    {presets.map((preset) => {
                      const isSelected = formData.amount === String(preset);
                      return (
                        <button
                          key={preset}
                          id={`preset-btn-${preset}`}
                          type="button"
                          onClick={() => handlePresetSelect(preset)}
                          className={`py-3 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border text-center ${
                            isSelected
                              ? 'bg-purple-50 border-[#491C63] text-[#491C63] ring-2 ring-purple-600/20 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/40'
                          }`}
                        >
                          {currentCurrency.symbol}
                          {preset.toLocaleString()}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div id="field-amount" className="relative mt-2">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold text-lg">
                      {currentCurrency.symbol}
                    </div>
                    <input
                      id="donation-amount-input"
                      type="number"
                      min={currentRange.min}
                      max={currentRange.max}
                      step="any"
                      value={formData.amount}
                      onChange={(e) => {
                        setFormData({ ...formData, amount: e.target.value });
                        if (errors.amount) {
                          setErrors({ ...errors, amount: '' });
                        }
                      }}
                      placeholder={`Enter custom amount (${currentRange.minDisplay} – ${currentRange.maxDisplay})`}
                      className={`w-full pl-10 pr-16 py-3.5 text-lg font-bold text-slate-900 bg-slate-50/50 rounded-xl border ${
                        errors.amount
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                          : 'border-slate-200 focus:border-[#491C63] focus:ring-purple-200'
                      } focus:outline-none focus:ring-3 transition-all`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs font-bold text-slate-400">
                      {formData.currency}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                    <span>Minimum pledge: <strong>{currentRange.minDisplay}</strong></span>
                    <span>Maximum online pledge: <strong>{currentRange.maxDisplay}</strong></span>
                  </div>
                  {errors.amount && (
                    <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.amount}</span>
                    </p>
                  )}
                </div>

                {/* Donor Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {/* Full Name */}
                  <div id="field-fullName" className="space-y-1.5">
                    <label
                      htmlFor="donor-full-name"
                      className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
                    >
                      <User className="w-4 h-4 text-[#491C63]" />
                      <span>Full Name</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="donor-full-name"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) {
                          setErrors({ ...errors, fullName: '' });
                        }
                      }}
                      placeholder="e.g. Eleanor Vance"
                      className={`w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 rounded-xl border ${
                        errors.fullName
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                          : 'border-slate-200 focus:border-[#491C63] focus:ring-purple-200'
                      } focus:outline-none focus:ring-3 transition-all`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div id="field-email" className="space-y-1.5">
                    <label
                      htmlFor="donor-email-address"
                      className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
                    >
                      <Mail className="w-4 h-4 text-[#491C63]" />
                      <span>Email Address</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="donor-email-address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) {
                          setErrors({ ...errors, email: '' });
                        }
                      }}
                      placeholder="e.g. eleanor@example.com"
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

                {/* Donation Purpose */}
                <div id="field-purpose" className="space-y-1.5">
                  <label
                    htmlFor="donation-purpose-select"
                    className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-[#491C63]" />
                    <span>Donation Purpose / Program Designation</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="donation-purpose-select"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 rounded-xl border border-slate-200 focus:border-[#491C63] focus:ring-3 focus:ring-purple-200 focus:outline-none transition-all cursor-pointer font-medium"
                  >
                    {DONATION_PURPOSES.map((purpose) => (
                      <option key={purpose.id} value={purpose.name}>
                        {purpose.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message / Note */}
                <div id="field-message" className="space-y-1.5">
                  <label
                    htmlFor="donor-message-note"
                    className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-[#491C63]" />
                    <span>Message / Note / Dedication</span>
                    <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="donor-message-note"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share a heartfelt encouragement, pediatric support note, or dedication instructions..."
                    className="w-full px-4 py-3 text-sm text-slate-900 bg-slate-50/50 rounded-xl border border-slate-200 focus:border-[#491C63] focus:ring-3 focus:ring-purple-200 focus:outline-none transition-all resize-y"
                  />
                </div>

                {/* Live Pledge Summary Box */}
                <div className="bg-purple-50/70 rounded-2xl p-5 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                      Pledge Summary
                    </span>
                    <div className="text-lg sm:text-xl font-black text-slate-900">
                      {currentCurrency.symbol}
                      {Number(formData.amount || 0).toLocaleString()} {formData.currency}
                      <span className="text-xs font-semibold text-purple-800 ml-2">
                        for {formData.purpose.split('(')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-purple-950 sm:text-right font-medium">
                    <span>Recipient: <strong>{CONTACT_INFO.email}</strong></span>
                    <div className="text-[11px] text-slate-500">Tax receipt acknowledgment upon review</div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    id="submit-donation-button"
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 px-8 rounded-2xl text-base sm:text-lg font-black text-white bg-[#491C63] hover:bg-[#3B1352] shadow-lg shadow-purple-950/20 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <Mail className="w-5 h-5 text-white" />
                    <span>Donate via Email</span>
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3">
                    Clicking will generate an email draft with your pledge details. No third-party payment processing fees deducted.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Success / Fallback Modal */}
      <PledgeSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        formData={formData}
        formattedAmount={`${currentCurrency.symbol}${Number(formData.amount || 0).toLocaleString()} ${formData.currency}`}
        mailtoUrl={generatedMailto}
        emailBodyText={plainEmailBody}
      />
    </section>
  );
};
