import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF5FF]/50 border-t border-purple-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-[#491C63] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            <HelpCircle className="w-3.5 h-3.5 text-[#491C63]" />
            <span>Got Questions?</span>
          </div>
          <h2
            id="faq-headline"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Everything you need to know about our foundation pledges, hospital visits, supply distribution, and tax receipts.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'bg-white border-[#491C63] shadow-md ring-2 ring-purple-600/10'
                    : 'bg-white/80 border-purple-100/80 hover:border-purple-200 hover:bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-2">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-purple-100 text-[#491C63] rotate-180'
                        : 'bg-purple-50 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-purple-50 animate-in fade-in duration-200"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 bg-purple-50/80 rounded-2xl border border-purple-200">
          <p className="text-sm text-slate-700 font-medium">
            Have a custom question or interested in volunteering?{' '}
            <a
              href="#contact"
              className="font-bold text-[#491C63] underline hover:text-[#2D0D3E] ml-1"
            >
              Reach out to our Foundation Care Team →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
