import { CurrencyOption, DonationPurpose, ImpactStat, Testimonial, FAQItem, FeatureCard, BankDetails } from '../types';
import ellaOne from '../../images/Ella 1.jpeg';
import ellaTwo from '../../images/Ella2.jpeg';
import ellaThree from '../../images/Ella3.jpeg';
import ellaFour from '../../images/Ella4.jpeg';
import ellaFive from '../../images/Ella5.jpeg';
import ellaSeven from '../../images/Ella7.jpeg';
import ellaEight from '../../images/Ella8.jpeg';
import ellaNine from '../../images/Ella9.jpeg';

export const FOUNDATION_IMAGES = {
  heroBanner: ellaOne,
  pediatricVisit: ellaFour,
  communityHall: ellaThree,
  aboutCommunity: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&auto=format&fit=crop&q=80',
  youthSports: ellaSeven,
  healthcareHeroes: ellaFive,
  musicTalent: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=900&auto=format&fit=crop&q=80',
  hospitalGroup: ellaEight,
  hopeCollage: ellaNine,
};

export interface CommunityInitiative {
  id: string;
  title: string;
  category: 'Hospital & Healthcare' | 'Youth & Athletics' | 'Family Relief' | 'Music & Creative Arts';
  location: string;
  description: string;
  image: string;
  badge: string;
  statsHighlight: string;
}

export const COMMUNITY_INITIATIVES: CommunityInitiative[] = [
  {
    id: 'init-music',
    title: 'Youth Musical Talent & Arts Mentorship',
    category: 'Music & Creative Arts',
    location: 'Alabama & Regional Workshops',
    description:
      'Providing gifted young musicians and vocalists with brand-new acoustic guitars, instrument grants, vocal lessons, and one-on-one songwriting mentorship with Ella.',
    image: FOUNDATION_IMAGES.musicTalent,
    badge: 'Musical Dreams',
    statsHighlight: '19+ Kids with Musical Talent Supported',
  },
  {
    id: 'init-1',
    title: 'Pediatric Hospital Ward Cheer & Patient Care',
    category: 'Hospital & Healthcare',
    location: 'Children’s Specialty Hospitals',
    description:
      'Ella personally visits pediatric inpatient wards, spending one-on-one time with young warriors facing severe illness, delivering uplifting gifts, bright smile balloons, and emotional support.',
    image: FOUNDATION_IMAGES.pediatricVisit,
    badge: 'Direct Bedside Care',
    statsHighlight: '13+ Hospitals Visited',
  },
  {
    id: 'init-2',
    title: 'Hometown Youth Outreach & Community Days',
    category: 'Youth & Athletics',
    location: 'Hope Hull, Alabama',
    description:
      'Gathering local kids for inspiring community days filled with autographs, storytelling, mentorship, and encouragement to pursue their dreams no matter their background.',
    image: FOUNDATION_IMAGES.heroBanner,
    badge: 'Hope Hull Roots',
    statsHighlight: '17+ Communities Focused',
  },
  {
    id: 'init-3',
    title: 'Essential Care & Clothing Distribution',
    category: 'Family Relief',
    location: 'Alabama & Regional Centers',
    description:
      'Direct distribution of warm apparel, school backpacks, hygiene necessities, and essential supplies to children and struggling families without bureaucratic overhead.',
    image: FOUNDATION_IMAGES.communityHall,
    badge: 'Immediate Relief',
    statsHighlight: '300+ Families Supported',
  },
  {
    id: 'init-4',
    title: 'Youth Basketball & Sports Sponsorship',
    category: 'Youth & Athletics',
    location: 'Local Gymnasiums & Leagues',
    description:
      'Hosting the Ella Langley Hope Foundation Youth Basketball Game, supplying athletic gear, basketballs, and uniforms to ensure every child has a chance to play.',
    image: FOUNDATION_IMAGES.youthSports,
    badge: 'Team Mentorship',
    statsHighlight: '30+ Youth & Athletes Mentored',
  },
  {
    id: 'init-5',
    title: 'Healthcare Heroes Appreciation & Support Boxes',
    category: 'Hospital & Healthcare',
    location: 'Pediatric Care Units',
    description:
      'Delivering custom ELHF care boxes and nutritious snack supplies to dedicated nurses, doctors, and hospital workers caring tirelessly for children in medical facilities.',
    image: FOUNDATION_IMAGES.healthcareHeroes,
    badge: 'Frontline Gratitude',
    statsHighlight: 'Direct Support for Medical Staff',
  },
];

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'USD', symbol: '$', label: 'USD - United States Dollar', ratePlaceholder: '2000' },
  { code: 'NGN', symbol: '₦', label: 'NGN - Nigerian Naira', ratePlaceholder: '3000000' },
  { code: 'EUR', symbol: '€', label: 'EUR - Euro', ratePlaceholder: '1850' },
  { code: 'GBP', symbol: '£', label: 'GBP - British Pound', ratePlaceholder: '1600' },
];

export const PRESET_AMOUNTS: Record<string, number[]> = {
  USD: [2000, 5000, 10000, 25000, 50000, 100000],
  NGN: [3000000, 7500000, 15000000, 37500000, 75000000, 150000000],
  EUR: [1850, 4600, 9200, 23000, 46000, 92000],
  GBP: [1600, 4000, 8000, 20000, 40000, 80000],
};

export const DONATION_PURPOSES: DonationPurpose[] = [
  {
    id: 'general',
    name: 'General Hope Fund (Where Needed Most)',
    description: 'Allocated dynamically to urgent relief, pediatric hospital care, and family aid.',
    iconName: 'HeartHandshake',
  },
  {
    id: 'musical_talent',
    name: 'Kids with Musical Talent & Arts Fund',
    description: 'Provides instruments, vocal lessons, and creative arts scholarships for young talents.',
    iconName: 'Sparkles',
  },
  {
    id: 'pediatric',
    name: 'Pediatric Patient & Hospital Outreach',
    description: 'Funds comfort gifts, bedside support, and specialized relief for hospitalized children.',
    iconName: 'Activity',
  },
  {
    id: 'youth_athletics',
    name: 'Youth Sports & Educational Mentorship',
    description: 'Equips children with sports gear, basketballs, school supplies, and athletic opportunities.',
    iconName: 'GraduationCap',
  },
  {
    id: 'nutrition',
    name: 'Family Food & Essential Care Bundles',
    description: 'Provides nutritious groceries, clothing, hygiene essentials, and household relief.',
    iconName: 'UtensilsCrossed',
  },
  {
    id: 'nurses_support',
    name: 'Frontline Healthcare Staff Appreciation',
    description: 'Supports pediatric nurses and hospital staff with care packages and sustenance kits.',
    iconName: 'Home',
  },
];

export const FOUNDATION_STORY = {
  title: 'About the Ella Langley Hope Foundation',
  officialName: 'Ella Langley Hope Foundation (ELHF)',
  motto: 'Bringing Hope. Changing Lives. Building Futures.',
  tagline: 'Giving Back to the Communities That Raised Her',
  foundingDate: 'May 2023',
  originTown: 'Hope Hull, Alabama',
  mainNarrative: [
    'The Ella Langley Hope Foundation (ELHF) was founded in May 2023 with a simple but powerful belief: every child, every family, and every community deserves the opportunity to feel supported, cared for, and hopeful about the future.',
    'For Ella Langley, giving back has always been deeply connected to where she comes from. Raised in Hope Hull, Alabama, Ella grew up surrounded by the values of family, faith, hard work, compassion, and looking out for your neighbors. Those small-town roots helped shape the person she is today and inspired a desire to use her platform not only for music, but also to make a meaningful difference in the lives of others.',
    'Since its beginning, the Ella Langley Hope Foundation has quietly reached out across 17+ communities in Alabama and beyond. Through our hands-on initiatives, we have supported over 300+ families with direct relief, conducted bedside visits across 13+ hospital wards, mentored 30+ youth and student athletes, and empowered 19+ kids with musical talent with instruments and vocal coaching.',
  ],
  musicalTalentWriteup: {
    title: 'Kids with Musical Talent Supported (19+)',
    badge: 'Creative Arts & Music Mentorship',
    count: '19+',
    headline: 'Igniting Passion & Artistic Potential in Young Dreamers',
    summary:
      'As a songwriter and touring country artist who began playing guitar and writing songs as a young girl in Alabama, Ella Langley knows firsthand how transformative early encouragement and access to a real instrument can be.',
    details: [
      'Through our dedicated Youth Musical Talent Initiative, the Ella Langley Hope Foundation has proudly supported 19+ gifted young artists and aspiring musicians who lacked the financial resources to pursue their dreams.',
      'ELHF provides brand-new acoustic guitars, keyboards, stringed instruments, private vocal training scholarships, and personalized songwriting mentorship sessions with Ella and regional music educators.',
      'By removing the financial barrier to creative arts education, we empower young talents to develop their gifts, build lifelong self-confidence, and discover the joy of creating music.',
    ],
    pillars: [
      { title: 'Instrument Grants', desc: 'Brand-new acoustic guitars, starter keyboards, and essential gear for gifted children.' },
      { title: 'Music Lessons & Tuition', desc: 'Funded private vocal coaching and instrumental instruction with experienced teachers.' },
      { title: 'Songwriting Mentorship', desc: 'Direct workshops and creative guidance inspired by Ella Langley’s musical journey.' },
      { title: 'Creative Encouragement', desc: 'Safe spaces and performance showcases for children to share their songs and develop confidence.' },
    ],
  },
  founderQuote: {
    quote:
      'Growing up in Hope Hull, Alabama, I learned early on that community isn’t just where you live—it’s who you are. The people in my hometown supported me and believed in my dreams long before anyone else knew who I was. The Ella Langley Hope Foundation is my way of giving back to the places and people that shaped me, and making sure other kids and families have the support and encouragement they need to keep going.',
    author: 'Ella Langley',
    role: 'Founder & Country Music Artist',
  },
  philosophy: {
    title: 'Our Philosophy: Action Over Attention',
    description:
      'The Ella Langley Hope Foundation operates with a low-key, action-first mindset. For Ella, the focus has never been about fanfare or recognition—it’s simply about doing the work.',
    subtitle:
      'Whether it’s donating supplies to local schools, visiting children in hospital care, or supporting community-driven initiatives, the goal is always the same:',
    goals: [
      { id: '1', title: 'Help people', description: 'Providing direct, tangible relief to families navigating unexpected life challenges.' },
      { id: '2', title: 'Give children hope', description: 'Empowering young minds with hospital visits, school supplies, and encouragement.' },
      { id: '3', title: 'Strengthen communities', description: 'Investing in youth athletics, local grassroots programs, and neighbor-to-neighbor support.' },
      { id: '4', title: 'Leave things better than we found them', description: 'Creating lasting, generational improvement in hometowns across America.' },
    ],
  },
};

export const ABOUT_FEATURES: FeatureCard[] = [
  {
    id: 'transparency',
    title: '100% Direct Transparency',
    description: 'Every single pledged dollar is tracked with complete integrity and directed toward tangible community relief and patient care.',
    iconName: 'ShieldCheck',
    highlight: 'Open Books & Direct Accountability',
  },
  {
    id: 'community-impact',
    title: 'Hands-On Community Action',
    description: 'From hospital visits to local youth sports and care distribution, our team delivers aid directly into the hands of those in need.',
    iconName: 'Users',
    highlight: 'Personal In-Person Outreach',
  },
  {
    id: 'every-donation',
    title: 'Every Donation Makes a Difference',
    description: 'No gesture is too small. From a bedside hospital care kit to comprehensive family relief, every pledge brings hope.',
    iconName: 'Sparkles',
    highlight: 'Tangible Real-World Outcomes',
  },
];

export const IMPACT_STATS: ImpactStat[] = [
  {
    id: 'families',
    value: 300,
    suffix: '+',
    label: 'Families Supported',
    description: 'Households provided with critical living aid, emergency care packages, and essential family relief.',
    icon: 'Heart',
  },
  {
    id: 'communities',
    value: 17,
    suffix: '+',
    label: 'Community Focused',
    description: 'Dedicated grassroots outreach hubs and local towns actively served with targeted community relief.',
    icon: 'Award',
  },
  {
    id: 'hospitals',
    value: 13,
    suffix: '+',
    label: 'Hospitals Visited',
    description: 'Pediatric care centers and medical facilities visited with direct bedside cheer and support gifts.',
    icon: 'Activity',
  },
  {
    id: 'youth-athletes',
    value: 30,
    suffix: '+',
    label: 'Youth and Athletes Mentored',
    description: 'Aspiring young athletes equipped with athletic uniforms, basketball equipment, and character guidance.',
    icon: 'HandHeart',
  },
  {
    id: 'musical-talent',
    value: 19,
    suffix: '+',
    label: 'Kids with Musical Talent Supported',
    description: 'Gifted children provided with acoustic guitars, vocal coaching, music camp grants, and creative mentorship.',
    icon: 'Music',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Nurse Carolyn Miller',
    role: 'Pediatric Care Unit Coordinator',
    location: 'Children’s Hospital',
    avatar: FOUNDATION_IMAGES.hospitalGroup,
    quote: 'Ella Langley and the ELHF team brought so much genuine joy and energy to our pediatric ward. Seeing our patients smile and laugh during bedside visits was truly unforgettable.',
    donationTier: 'Pediatric Care Partner',
    date: 'February 2026',
  },
  {
    id: '2',
    name: 'Coach Marcus Davies',
    role: 'Youth Basketball Director',
    location: 'Hope Hull, AL',
    avatar: FOUNDATION_IMAGES.hopeCollage,
    quote: 'The ELHF youth basketball sponsorship provided balls, jerseys, and court time for our entire program. The kids look up to Ella so much as a hometown hero who never forgot them.',
    donationTier: 'Youth Athletics Supporter',
    date: 'January 2026',
  },
  {
    id: '3',
    name: 'Elena & David Torres',
    role: 'Family Relief Recipients & Donors',
    location: 'Montgomery County, AL',
    avatar: FOUNDATION_IMAGES.communityHall,
    quote: 'When our family faced unexpected medical hardship, the Ella Langley Hope Foundation stepped in with groceries, warm clothes, and true empathy. We are forever grateful.',
    donationTier: 'Family Care Sponsor',
    date: 'March 2026',
  },
];

export const BANK_DETAILS: BankDetails = {
  bankName: 'PNC',
  routingNumber: '041000124',
  accountNumber: '4173840508',
  accountName: 'Ella Langley Hope Foundation',
  accountType: 'Nonprofit Checking Account',
  institutionType: 'PNC Bank, N.A.',
  instructions: [
    'Log in to your mobile or online banking portal (or visit any bank branch).',
    'Initiate a transfer or wire using the PNC routing and account numbers above.',
    'Capture a screenshot or PDF of your transaction confirmation receipt.',
    'Upload your screenshot using our deposit receiver to get an instant verified acknowledgment and official tax receipt.',
  ],
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-direct-bank',
    question: 'How do I make a quick direct bank donation?',
    answer: 'You can transfer funds directly to our PNC account (Routing: 041000124, Account: 4173840508, Beneficiary: Ella Langley Hope Foundation) via your online banking app, ACH, wire, or branch deposit. Once transferred, simply upload your deposit screenshot in our deposit receiver to receive an immediate tax acknowledgment.',
    category: 'Bank Transfer',
  },
  {
    id: 'faq-1',
    question: 'How does donating via email work?',
    answer: 'When you submit the pledge form, our system automatically compiles your donation amount, preferred currency, selected cause, and personal message into a pre-formatted email to ellalangleyfoundation.org@gmail.com. Your default email client (Outlook, Apple Mail, Gmail, etc.) will open with all details populated so you can send your pledge with one click. We also provide an instant one-click copy button if you prefer webmail.',
    category: 'Process',
  },
  {
    id: 'faq-2',
    question: 'Are pledges and bank donations tax-deductible?',
    answer: 'Yes! The Ella Langley Hope Foundation is a recognized philanthropic nonprofit initiative. Once your email pledge or deposit screenshot is received, our donations coordinator will issue an official tax acknowledgment receipt for your records.',
    category: 'Tax & Receipts',
  },
  {
    id: 'faq-3',
    question: 'What currencies can I pledge in?',
    answer: 'We accept pledges in US Dollars (USD), Euros (EUR), and British Pounds (GBP). If you require a different regional currency, simply specify it in your donation note.',
    category: 'Payments',
  },
  {
    id: 'faq-4',
    question: 'How are my donation funds utilized?',
    answer: 'Over 92% of all pledged funds go directly to on-the-ground programs including pediatric hospital visits, family relief care packages, youth sports equipment, and school supplies. The remaining portion covers necessary logistics and volunteer coordination.',
    category: 'Accountability',
  },
  {
    id: 'faq-5',
    question: 'Can I dedicate my donation in honor or memory of someone?',
    answer: 'Absolutely. Use the "Message / Note" field in the donation form to include the name of the person you are honoring and any special message you would like included in our acknowledgment registry.',
    category: 'Dedications',
  },
  {
    id: 'faq-6',
    question: 'How quickly does the Foundation team follow up on deposit screenshots?',
    answer: 'Our donor care coordinators review all incoming deposit confirmations within 12 to 24 business hours to verify the transfer, issue an official stamped tax receipt, and credit your contribution to the designated fund.',
    category: 'Support',
  },
];

export const CONTACT_INFO = {
  email: 'ellalangleyfoundation.org@gmail.com',
  secondaryEmail: 'ellalangleyfoundation.org@gmail.com',
  originTown: 'Hope Hull, Alabama',
  address: 'Hope Hull Community Outreach Center',
  cityStateZip: 'Hope Hull, AL 36043 / Nashville, TN',
  hours: 'Monday – Friday: 8:00 AM – 6:00 PM CST',
};
