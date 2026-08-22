import React from 'react';
import { TESTIMONIALS } from '../data/content';
import { Quote, Star, Heart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#491C63] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            <Heart className="w-3.5 h-3.5 text-[#491C63] fill-[#491C63]" />
            <span>Voices of Hope</span>
          </div>
          <h2
            id="testimonials-headline"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Stories from Our Community of Givers & Partners
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Read what pediatric nurses, youth sports directors, and community partners say about the real impact of the Ella Langley Hope Foundation.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              id={`testimonial-card-${testimonial.id}`}
              className="rounded-3xl bg-purple-50/30 p-8 border border-purple-100 card-hover-effect flex flex-col justify-between relative group hover:bg-white hover:border-purple-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-purple-200 group-hover:text-purple-400 transition-colors" />
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-8">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-purple-100 flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-600/30"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-xs text-purple-800 font-bold">{testimonial.role}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
