export type CurrencyCode = 'USD' | 'NGN' | 'EUR' | 'GBP';

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  label: string;
  ratePlaceholder: string;
}

export interface BankDetails {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  institutionType?: string;
  instructions: string[];
}

export interface DonationPurpose {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface DonationFormData {
  fullName: string;
  email: string;
  phone: string;
  amount: string;
  currency: CurrencyCode;
  purpose: string;
  message: string;
}

export interface DepositProofData {
  donorName: string;
  email: string;
  amountDeposited: string;
  currency: CurrencyCode;
  transactionReference: string;
  dateOfTransfer: string;
  purpose: string;
  notes: string;
  screenshotFile: File | null;
  screenshotPreviewUrl: string | null;
  screenshotFileName: string;
  screenshotFileSize: string;
}

export interface ImpactStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  donationTier?: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight: string;
}
