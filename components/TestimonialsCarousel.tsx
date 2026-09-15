'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';

/**
 * Client Component: VIP Bridal & Client Testimonials Carousel.
 * Provides high-trust social proof with verified purchaser reviews and gold star ratings.
 */

interface Testimonial {
  id: string;
  name: string;
  city: string;
  piece: string;
  rating: number;
  review: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ayesha Kamal',
    city: 'Clifton, Karachi',
    piece: '3ct Emerald Cut Moissanite Solitaire',
    rating: 5,
    review:
      'The fire in direct sunlight is breathtaking. Everyone in my family thought it was a 25-lakh diamond ring. The heavy 925 silver setting and velvet presentation chest feel like a Paris high-jewellery house.',
    date: 'Verified Bridal Commission',
  },
  {
    id: '2',
    name: 'Dr. Mehwish Rizvi',
    city: 'Gulberg, Lahore',
    piece: 'Noor-e-Jahan Ruby Bridal Choker',
    rating: 5,
    review:
      'The craftsmanship on the hand-set Burma rubies made my baraat outfit unforgettable. The 18K vermeil has zero fading even after multiple festive wearings. Truly heirloom quality.',
    date: 'Verified Bridal Client',
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    city: 'Kensington, London',
    piece: 'Kashmir Blue Sapphire Pendant',
    rating: 5,
    review:
      'Worldwide delivery to the UK took just 5 days. The depth of the sapphire and the sparkle of the halo moissanites surpassed my expectations. The GRA authentication card gave complete peace of mind.',
    date: 'International Order',
  },
  {
    id: '4',
    name: 'Fatima & Hamza',
    city: 'F-7, Islamabad',
    piece: 'Bespoke Channel Set Moissanite Band',
    rating: 5,
    review:
      'We sent a rough Pinterest sketch on WhatsApp. The master karigar shared a 3D render within 48 hours and cast our dream matching wedding bands. Their concierge service on WhatsApp is top tier.',
    date: 'Custom Bespoke Set',
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const item = TESTIMONIALS[current];

  return (
    <section
      className="py-24 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Client Testimonials"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] tracking-[0.25em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Verified Atelier Patrons</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#0F172A]">
            Loved by Discerning Collectors
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-14 border border-[#E2E8F0] shadow-xl transition-all duration-500">
          <Quote className="w-12 h-12 text-[#CBD5E1]/40 absolute top-6 right-8" />

          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#94A3B8] text-[#94A3B8]" />
            ))}
          </div>

          {/* Review Quote */}
          <blockquote className="font-serif text-lg sm:text-2xl text-[#0F172A] leading-relaxed mb-8 min-h-[100px]">
            &ldquo;{item.review}&rdquo;
          </blockquote>

          {/* Customer Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#E2E8F0]">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-[#0F172A] tracking-wide">{item.name}</h4>
                <span className="text-xs text-[#64748B]">• {item.city}</span>
              </div>
              <p className="text-xs text-[#64748B] font-medium mt-0.5">{item.piece}</p>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] px-3 py-1 rounded-full text-[11px] font-semibold w-fit">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#64748B]" />
              <span>{item.date}</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    idx === current ? 'w-8 bg-[#0F172A]' : 'w-2 bg-[#E2E8F0] hover:bg-[#94A3B8]'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous Review"
                className="w-10 h-10 rounded-full border border-[#E2E8F0] hover:border-[#0F172A] bg-[#F8FAFC] hover:bg-[#0F172A] text-[#0F172A] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next Review"
                className="w-10 h-10 rounded-full border border-[#E2E8F0] hover:border-[#0F172A] bg-[#F8FAFC] hover:bg-[#0F172A] text-[#0F172A] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
