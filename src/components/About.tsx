import React from 'react';
import { ABOUT_FEATURES, FOUNDATION_STORY, FOUNDATION_IMAGES } from '../data/content';
import {
  ShieldCheck,
  Users,
  Sparkles,
  HeartHandshake,
  Check,
  Quote,
  MapPin,
  Calendar,
  Heart,
  Target,
  Smile,
  CheckCircle2,
  Music,
  GraduationCap,
  Mic2,
  Radio,
} from 'lucide-react';
import { ELHFLogo } from './ELHFLogo';

interface AboutProps {
  onDonateClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onDonateClick }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-[#491C63]" />;
      case 'Users':
        return <Users className="w-7 h-7 text-[#491C63]" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-[#491C63]" />;
      default:
        return <HeartHandshake className="w-7 h-7 text-[#491C63]" />;
    }
  };

  const getPhilosophyIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Heart className="w-5 h-5 text-purple-700" />;
      case 1:
        return <Smile className="w-5 h-5 text-amber-500" />;
      case 2:
        return <Users className="w-5 h-5 text-purple-700" />;
      case 3:
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-purple-700" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official Crest */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#491C63] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            <Heart className="w-3.5 h-3.5 text-[#491C63] fill-[#491C63]" />
            <span>Our Roots & Story</span>
          </div>
          <h2
            id="about-headline"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3"
          >
            {FOUNDATION_STORY.title}
          </h2>
          <p className="text-lg sm:text-xl text-[#491C63] font-bold tracking-normal mb-2">
            {FOUNDATION_STORY.tagline}
          </p>
          <p className="text-sm font-semibold tracking-widest text-purple-800 uppercase">
            {FOUNDATION_STORY.motto}
          </p>
        </div>

        {/* Narrative & Origins Block with Community Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-[#491C63]" />
                <span>Established {FOUNDATION_STORY.foundingDate}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 text-[#491C63] border border-purple-200">
                <MapPin className="w-3.5 h-3.5 text-[#491C63]" />
                <span>{FOUNDATION_STORY.originTown}</span>
              </span>
            </div>

            {FOUNDATION_STORY.mainNarrative.map((paragraph, idx) => (
              <p
                key={idx}
                id={`about-narrative-${idx}`}
                className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
              >
                {paragraph}
              </p>
            ))}

            {/* In-text image highlights */}
            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-purple-50 border border-purple-100 shadow-sm relative group">
                <img
                  src={FOUNDATION_IMAGES.pediatricVisit}
                  alt="Ella Langley pediatric hospital visit"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-bold leading-tight">
                    Pediatric Bedside Visits
                  </span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-purple-50 border border-purple-100 shadow-sm relative group">
                <img
                  src={FOUNDATION_IMAGES.aboutCommunity}
                  alt="Ella Langley community care packages distribution"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-bold leading-tight">
                    Community Care Packages
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Quote Card with Ella 6 Crest */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div
              id="founder-quote-card"
              className="rounded-3xl bg-gradient-to-br from-[#2D0D3E] via-[#3B1352] to-[#491C63] text-white p-8 sm:p-9 relative shadow-2xl overflow-hidden border border-purple-800/60"
            >
              <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 w-32 h-32 bg-purple-400/10 rounded-full blur-xl pointer-events-none" />
              
              <Quote className="w-10 h-10 text-purple-300/40 mb-4" />
              
              <span className="text-xs font-bold uppercase tracking-wider text-purple-200 block mb-3">
                A Message from Ella
              </span>

              <p className="text-sm sm:text-base text-purple-50 leading-relaxed italic mb-6">
                "{FOUNDATION_STORY.founderQuote.quote}"
              </p>

              <div className="pt-4 border-t border-purple-700/60 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {FOUNDATION_STORY.founderQuote.author}
                  </h4>
                  <p className="text-xs text-purple-200">
                    {FOUNDATION_STORY.founderQuote.role}
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-purple-950/80 border border-purple-400/30 flex items-center justify-center text-purple-200 font-black text-sm">
                  ELHF
                </div>
              </div>
            </div>

            {/* Official Ella 6 Crest Emblem Showcase */}
            <div className="p-6 rounded-3xl bg-purple-50/70 border border-purple-100 text-center flex flex-col items-center">
              <ELHFLogo variant="full-crest" size="md" />
            </div>
          </div>
        </div>

        {/* Dedicated Section: Kids with Musical Talent Supported (19+) */}
        <div
          id="musical-talent-section"
          className="mb-20 rounded-3xl bg-gradient-to-br from-white via-purple-50/40 to-[#FAF5FF] border-2 border-purple-200/80 p-8 sm:p-12 shadow-lg relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mb-10 relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#491C63] text-white text-xs font-bold uppercase tracking-wider">
                <Music className="w-3.5 h-3.5 text-purple-200" />
                <span>{FOUNDATION_STORY.musicalTalentWriteup.badge}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-[#491C63] text-xs font-extrabold">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                <span>19+ Young Talents Supported</span>
              </div>
            </div>

            <h3
              id="musical-talent-heading"
              className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            >
              {FOUNDATION_STORY.musicalTalentWriteup.title}
            </h3>

            <p className="text-lg text-[#491C63] font-bold mb-4">
              {FOUNDATION_STORY.musicalTalentWriteup.headline}
            </p>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
              {FOUNDATION_STORY.musicalTalentWriteup.summary}
            </p>
          </div>

          {/* Grid Layout: Write-up Details & Visual Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 relative z-10">
            <div className="lg:col-span-7 space-y-4">
              {FOUNDATION_STORY.musicalTalentWriteup.details.map((paragraph, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/90 border border-purple-100 shadow-xs flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#491C63]" />
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>

            {/* Visual Feature Card for Musical Talent */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden bg-slate-900 border border-purple-200 shadow-xl relative group">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={FOUNDATION_IMAGES.musicTalent}
                    alt="Young musician playing acoustic guitar through Ella Langley Hope Foundation music grant"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#491C63] text-purple-100 text-[11px] font-bold mb-1">
                      ELHF Music Arts Grantee
                    </span>
                    <h4 className="text-base font-bold text-white leading-snug">
                      Empowering Rural Kids to Find Their Voice Through Music
                    </h4>
                    <p className="text-xs text-purple-200 mt-1">
                      19+ kids equipped with acoustic instruments & masterclass training
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars of the Musical Talent Initiative */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {FOUNDATION_STORY.musicalTalentWriteup.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-3">
                    {idx === 0 && <Music className="w-5 h-5 text-[#491C63]" />}
                    {idx === 1 && <GraduationCap className="w-5 h-5 text-[#491C63]" />}
                    {idx === 2 && <Mic2 className="w-5 h-5 text-[#491C63]" />}
                    {idx === 3 && <Radio className="w-5 h-5 text-[#491C63]" />}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-purple-50 text-[11px] font-bold text-purple-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span>Program Component</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy: Action Over Attention */}
        <div id="philosophy-section" className="mb-20 rounded-3xl bg-[#FAF5FF] border border-purple-100 p-8 sm:p-12">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#491C63] text-xs font-bold uppercase tracking-wider mb-3 border border-purple-200">
              <Target className="w-3.5 h-3.5 text-purple-700" />
              <span>Our Guiding Mindset</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              {FOUNDATION_STORY.philosophy.title}
            </h3>
            <p className="text-base text-slate-600 leading-relaxed mb-2">
              {FOUNDATION_STORY.philosophy.description}
            </p>
            <p className="text-sm font-medium text-purple-950">
              {FOUNDATION_STORY.philosophy.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUNDATION_STORY.philosophy.goals.map((goal, idx) => (
              <div
                key={goal.id}
                id={`philosophy-goal-${goal.id}`}
                className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-4">
                    {getPhilosophyIcon(idx)}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {goal.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-purple-50 flex items-center gap-1.5 text-xs font-semibold text-purple-800">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Core Tenet</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Pillars / Feature Cards */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              How We Ensure Impact
            </h3>
            <p className="text-sm text-slate-600">
              Built on transparency, authentic community engagement, and making every pledge count.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ABOUT_FEATURES.map((feature) => (
              <div
                key={feature.id}
                id={`about-card-${feature.id}`}
                className="rounded-2xl bg-purple-50/40 p-8 border border-purple-100 card-hover-effect flex flex-col justify-between relative group hover:bg-white hover:border-purple-300 transition-all duration-300"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-100/70 group-hover:bg-purple-100 flex items-center justify-center mb-6 transition-colors shadow-xs">
                    {getIcon(feature.iconName)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#491C63] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-100 flex items-center gap-2 text-xs font-bold text-[#491C63]">
                  <Check className="w-4 h-4 text-purple-600" />
                  <span>{feature.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Pledge Model Banner */}
        <div
          id="about-deep-dive-banner"
          className="rounded-3xl bg-gradient-to-r from-[#2D0D3E] via-[#491C63] to-[#581C87] text-white p-8 sm:p-10 relative overflow-hidden shadow-xl"
        >
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-200 mb-2 block">
                Direct Pledge Model
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Why We Use Direct Email Pledges
              </h3>
              <p className="text-sm sm:text-base text-purple-100 leading-relaxed max-w-2xl">
                By eliminating third-party processing deductions, 
                our foundation coordinates donation pledges directly with donors. Every contribution 
                reaches local families and hospitals with personal acknowledgment and transparent bookkeeping.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
              <button
                id="about-cta-pledge-btn"
                onClick={onDonateClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-[#491C63] font-bold hover:bg-purple-50 transition-colors shadow-sm cursor-pointer text-center"
              >
                Send a Donation Pledge
              </button>
              <span className="text-xs text-purple-200 text-center lg:text-right w-full sm:w-auto">
                Direct to ellalangleyfoundation.org@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
