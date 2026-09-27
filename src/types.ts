export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  label: string;
  ratePlaceholder: string;
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
