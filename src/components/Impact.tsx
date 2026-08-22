import React, { useState, useEffect, useRef } from 'react';
import { IMPACT_STATS, FOUNDATION_IMAGES } from '../data/content';
import { Heart, Activity, HandHeart, Award, Sparkles, TrendingUp, CheckCircle2, Music } from 'lucide-react';

export const Impact: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    families: 0,
    communities: 0,
    hospitals: 0,
    'youth-athletes': 0,
    'musical-talent': 0,
  });

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1800; // ms
          const frameRate = 30;
          const totalFrames = duration / (1000 / frameRate);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setCounts({
              families: Math.floor(easeOutQuart * 300),
              communities: Math.floor(easeOutQuart * 17),
              hospitals: Math.floor(easeOutQuart * 13),
              'youth-athletes': Math.floor(easeOutQuart * 30),
              'musical-talent': Math.floor(easeOutQuart * 19),
            });

            if (frame >= totalFrames) {
              clearInterval(timer);
              setCounts({
                families: 300,
                communities: 17,
                hospitals: 13,
                'youth-athletes': 30,
                'musical-talent': 19,
              });
            }
          }, 1000 / frameRate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-6 h-6 text-[#491C63]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#491C63]" />;
      case 'HandHeart':
        return <HandHeart className="w-6 h-6 text-[#491C63]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#491C63]" />;
      case 'Music':
        return <Music className="w-6 h-6 text-[#491C63]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#491C63]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="py-20 md:py-28 bg-[#FAF5FF]/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-[#491C63] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            <TrendingUp className="w-3.5 h-3.5 text-[#491C63]" />
            <span>Proven Community Results</span>
          </div>
          <h2
            id="impact-headline"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Our Real-World Impact in Numbers
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every donation pledged translates into immediate assistance on the ground. 
            Here is a snapshot of what our volunteers and supporters have achieved together.
          </p>
        </div>

        {/* 5 Animated Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16">
          {IMPACT_STATS.map((stat) => (
            <div
              key={stat.id}
              id={`stat-card-${stat.id}`}
              className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm card-hover-effect flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-4">
                  {getStatIcon(stat.icon)}
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    id={`stat-number-${stat.id}`}
                    className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display"
                  >
                    {counts[stat.id]?.toLocaleString() || '0'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#491C63]">
                    {stat.suffix}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 mb-2 leading-tight">
                  {stat.label}
                </h3>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed pt-3 border-t border-purple-50">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Healthcare Heroes & Youth Mentorship Feature Card */}
        <div className="rounded-3xl bg-white border border-purple-100 p-8 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-purple-950/10 relative group">
                <img
                  src={FOUNDATION_IMAGES.healthcareHeroes}
                  alt="Ella Langley with pediatric nurses and ELHF care boxes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#491C63]/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                  Frontline Staff Support
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                Pediatric Hospital & Healthcare Initiative
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Caring for the Caregivers: Hospital Care Package Drop-Offs
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                Alongside visiting children in hospital rooms, ELHF delivers custom care boxes and sustenance kits to pediatric nurses and healthcare workers. Our team honors the frontline professionals who work tirelessly day and night.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Custom ELHF nurse appreciation boxes</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Zero administrative deductions</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Direct delivery to pediatric units</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Alabama & regional hospital networks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
