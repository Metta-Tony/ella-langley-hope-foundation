import React, { useState } from 'react';
import { COMMUNITY_INITIATIVES, CommunityInitiative } from '../data/content';
import {
  Heart,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  X,
} from 'lucide-react';

interface CommunityGalleryProps {
  onDonateClick: () => void;
}

export const CommunityGallery: React.FC<CommunityGalleryProps> = ({ onDonateClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedStory, setSelectedStory] = useState<CommunityInitiative | null>(null);

  const categories = [
    'All',
    'Music & Creative Arts',
    'Hospital & Healthcare',
    'Youth & Athletics',
    'Family Relief',
  ];

  const filteredInitiatives =
    activeCategory === 'All'
      ? COMMUNITY_INITIATIVES
      : COMMUNITY_INITIATIVES.filter((item) => item.category === activeCategory);

  return (
    <section id="initiatives" className="py-20 md:py-28 bg-[#FAF5FF] border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 text-[#491C63] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            <Heart className="w-3.5 h-3.5 fill-[#491C63] text-[#491C63]" />
            <span>Real-World Impact in Action</span>
          </div>
          <h2
            id="initiatives-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Moments of Hope Across Our Communities
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            From pediatric hospital bedsides to hometown gymnasiums and care distribution centers, 
            see how your pledges directly empower children and families.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#491C63] text-white shadow-md shadow-purple-950/10 scale-102'
                    : 'bg-white text-slate-600 hover:text-[#491C63] hover:bg-purple-50 border border-purple-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {filteredInitiatives.map((item, index) => (
            <div
              key={item.id}
              id={`initiative-card-${item.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-purple-100/90 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedStory(item)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-purple-950/10">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                
                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#491C63]/90 backdrop-blur-md text-white border border-purple-400/30">
                    {item.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
                  <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                    <MapPin className="w-3.5 h-3.5 text-purple-300" />
                    <span>{item.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-purple-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md font-bold text-purple-200">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{item.statsHighlight}</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-purple-700 block mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#491C63] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#491C63] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>View Story & Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    ELHF Initiative
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#3B1352] via-[#491C63] to-[#581C87] text-white p-8 sm:p-10 shadow-xl border border-purple-800/40 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-8 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-200 mb-2 block">
                Direct Community Support
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                Help Us Reach the Next Child and Family
              </h3>
              <p className="text-sm sm:text-base text-purple-100 leading-relaxed max-w-2xl">
                Every pledged gift brings pediatric smiles, equips youth athletics, and supplies warm clothing to struggling families across Alabama and beyond.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
              <button
                id="gallery-pledge-btn"
                onClick={onDonateClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-[#491C63] font-bold hover:bg-purple-50 transition-all shadow-md cursor-pointer text-center text-sm"
              >
                Send a Donation Pledge
              </button>
              <span className="text-xs text-purple-200 text-center lg:text-right w-full sm:w-auto">
                100% direct relief coordination
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Lightbox Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-purple-100 flex flex-col max-h-[90vh]">
            <div className="relative aspect-[16/9] w-full bg-purple-950">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#491C63] text-white">
                  {selectedStory.badge}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-purple-700 uppercase tracking-wider">
                  {selectedStory.category}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  {selectedStory.location}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">
                {selectedStory.title}
              </h3>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {selectedStory.description}
              </p>

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-purple-800 block">
                    Verified Outcome
                  </span>
                  <span className="text-base font-extrabold text-[#491C63]">
                    {selectedStory.statsHighlight}
                  </span>
                </div>
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    onDonateClick();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#491C63] text-white text-xs font-bold hover:bg-[#3B1352] transition-colors cursor-pointer"
                >
                  Support This Cause
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
