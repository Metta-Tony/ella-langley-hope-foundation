import React from 'react';
import { Heart, ArrowDown, Sparkles, Shield, Users, CheckCircle2, MapPin } from 'lucide-react';
import { FOUNDATION_IMAGES, FOUNDATION_STORY } from '../data/content';
import { ELHFLogo } from './ELHFLogo';

interface HeroProps {
  onDonateClick: () => void;
  onLearnMoreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDonateClick, onLearnMoreClick }) => {
  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-purple-50/60 via-[#FCF9FF] to-white"
    >
      {/* Decorative subtle background elements with brand purple tint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-8 left-10 w-96 h-96 bg-purple-200/25 rounded-full blur-3xl" />
        <div className="absolute top-24 right-10 w-80 h-80 bg-fuchsia-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Official Foundation Name & Brand Header */}
            <div id="hero-foundation-brand" className="mb-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/95 border border-purple-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center p-1 shrink-0">
                  <ELHFLogo variant="emblem" size="sm" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="font-serif text-base sm:text-lg font-bold text-[#491C63] tracking-wide uppercase leading-tight">
                    Ella Langley Hope Foundation
                  </span>
                  <span className="text-[11px] font-bold text-purple-900/70 sm:border-l sm:border-purple-200 sm:pl-2">
                    Est. May 2023
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100/90 border border-purple-200 text-[#491C63] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                <span>Hope Hull, AL</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-4"
            >
              Bringing Hope. <br className="hidden sm:inline" />
              <span className="text-[#491C63]">Changing Lives.</span> <br />
              <span className="text-purple-800">Building Futures.</span>
            </h1>

            {/* Official Tagline */}
            <p className="text-base sm:text-lg font-semibold text-purple-900 mb-4 tracking-normal">
              {FOUNDATION_STORY.tagline} • Originating in {FOUNDATION_STORY.originTown}
            </p>

            {/* Supporting Text */}
            <p
              id="hero-description"
              className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal"
            >
              Founded by country music artist Ella Langley, the Ella Langley Hope Foundation provides direct relief, pediatric hospital care visits, youth sports equipment, and essential family assistance with a low-key, action-first mindset.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-donate-primary-btn"
                onClick={onDonateClick}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#491C63] hover:bg-[#3B1352] shadow-lg shadow-purple-950/15 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-purple-200" />
                <span>Make a Donation Pledge</span>
              </button>

              <button
                id="hero-learn-more-btn"
                onClick={onLearnMoreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold text-slate-700 bg-white hover:bg-purple-50/60 border border-purple-200/80 shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <span>Explore Our Story</span>
                <ArrowDown className="w-4 h-4 text-purple-700" />
              </button>
            </div>

            {/* Trust Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-purple-100 w-full">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                <span>Direct Action Model</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                <Shield className="w-4 h-4 text-purple-700 shrink-0" />
                <span>100% Direct Pledges</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                <Users className="w-4 h-4 text-purple-700 shrink-0" />
                <span>Hands-On Community</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Frame */}
              <div
                id="hero-featured-card"
                className="rounded-3xl overflow-hidden bg-white border border-purple-100 shadow-2xl p-6 sm:p-7 relative card-hover-effect"
              >
                {/* Photo with Overlay */}
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-4/3 bg-purple-950/10">
                  <img
                    id="hero-main-photo"
                    src={FOUNDATION_IMAGES.heroBanner}
                    alt="Ella Langley in ELHF shirt with children in Hope Hull, Alabama"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-5">
                    <span className="inline-flex items-center gap-1.5 text-purple-200 text-xs font-bold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Hope Hull, Alabama Community Outreach</span>
                    </span>
                    <span className="text-white font-bold text-sm sm:text-base drop-shadow-sm leading-snug">
                      Ella Langley with local children & families
                    </span>
                  </div>
                </div>

                {/* Floating summary stat cards inside hero */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-purple-50 rounded-2xl p-3.5 border border-purple-100">
                    <span className="block text-2xl font-black text-[#491C63]">300+</span>
                    <span className="text-xs font-semibold text-purple-900">Families Supported</span>
                  </div>
                  <div className="bg-fuchsia-50/70 rounded-2xl p-3.5 border border-fuchsia-100">
                    <span className="block text-2xl font-black text-fuchsia-950">19+</span>
                    <span className="text-xs font-semibold text-fuchsia-900">Musical Talents</span>
                  </div>
                </div>

                {/* Micro Quick Pledge Callout */}
                <div className="flex items-center justify-between bg-[#FAF5FF] rounded-2xl p-3.5 border border-purple-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
                    <span className="font-semibold text-purple-950">Ongoing 2026 Community Aid</span>
                  </div>
                  <span
                    className="font-bold text-[#491C63] cursor-pointer hover:underline"
                    onClick={onDonateClick}
                  >
                    Pledge Now →
                  </span>
                </div>
              </div>

              {/* Floating Official Crest Badge */}
              <div className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 bg-white py-3.5 px-5 rounded-2xl shadow-xl border border-purple-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0">
                  <ELHFLogo variant="emblem" size="sm" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#491C63] tracking-wide">
                    ELLA LANGLEY HOPE FOUNDATION
                  </div>
                  <div className="text-[11px] font-semibold text-purple-800">
                    Action Over Attention • ELHF
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Foundation Identity Banner / Marquee Bar */}
        <div className="mt-16 sm:mt-20 pt-6 border-t border-purple-100/80">
          <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-2xl p-4 border border-purple-100 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-[#491C63]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#491C63]" />
              <span className="font-serif font-black tracking-wider uppercase text-sm sm:text-base">
                Ella Langley Hope Foundation
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-purple-200/60 text-[#491C63]">
                ELHF
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-slate-600 font-medium">
              <span>Established May 2023</span>
              <span>•</span>
              <span>Hope Hull, Alabama</span>
              <span>•</span>
              <span className="text-[#491C63] font-semibold">Bringing Hope. Changing Lives. Building Futures.</span>
            </div>
            <div className="text-[11px] text-purple-900 font-semibold">
              Zero Administrative Deductions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
