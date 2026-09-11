'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Gem, ChevronLeft, ChevronRight } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

/**
 * Client Component: Cinematic Multi-Slide Editorial Hero Carousel.
 * Highlights bespoke bridal suites, certified Moissanite solitaires, and 925 sterling silver craftsmanship.
 */

interface HeroSlide {
  id: string;
  eyebrow: string;
  titleLight: string;
  titleGold: string;
  titleSuffix: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  whatsappMessage: string;
  image: string;
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'moissanite-silver',
    eyebrow: 'Master Jewellery Atelier • Karachi Since 1947',
    titleLight: 'Elegance Forged in ',
    titleGold: '925 Pure Silver',
    titleSuffix: ' & Celestial Fire.',
    description:
      'Discover bespoke handcrafted 925 sterling silver jewels set with D VVS1 certified Moissanite and natural Burmese gemstones. Made-to-order heirloom pieces crafted for lifetimes of celebration.',
    primaryCtaText: 'Explore The Showcase',
    primaryCtaLink: '/shop',
    whatsappMessage: 'Hello Aurelia Atelier, I would like to inquire about your 925 Pure Silver and Moissanite showcase.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=85',
    trustBadge1: '925 Hallmark Stamped',
    trustBadge2: 'GRA D VVS1 Certified',
    trustBadge3: 'Lifetime Free Replating',
  },
  {
    id: 'royal-bridal',
    eyebrow: 'Bespoke Bridal Sets • Heirloom Craftsmanship',
    titleLight: 'Heirloom Rubies & ',
    titleGold: 'Royal Emeralds',
    titleSuffix: ' for Your Big Day.',
    description:
      'Opulent bridal choker necklaces, chandelier jhumkas, and royal mathapattis hand-set in 18K gold vermeil over pure silver. Individually customized to harmonize with your wedding couture.',
    primaryCtaText: 'View Bridal Collection',
    primaryCtaLink: '/shop?category=bridal',
    whatsappMessage: 'Hello Aurelia Atelier, I would like to book a private bridal consultation for custom wedding jewellery.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=85',
    trustBadge1: 'Made-To-Order Couture',
    trustBadge2: 'Natural Burmese Gems',
    trustBadge3: 'Complimentary Styling',
  },
  {
    id: 'solitaire-engagement',
    eyebrow: 'Certified D VVS1 Moissanite • Forever Brilliance',
    titleLight: 'Solitaires That ',
    titleGold: 'Outshine Diamonds',
    titleSuffix: ' with Greater Fire.',
    description:
      'Experience 2.65 refractive brilliance that never clouds, scratches, or dims. Individually laser-inscribed with international GRA certification warranty cards and luxury atelier velvet presentation box.',
    primaryCtaText: 'Discover Solitaires',
    primaryCtaLink: '/shop?category=rings',
    whatsappMessage: 'Hello Aurelia Atelier, I would like to inquire about your certified Moissanite solitaire rings.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2000&q=85',
    trustBadge1: 'Passes Diamond Testers',
    trustBadge2: 'GRA Certificate Card',
    trustBadge3: 'Anti-Tarnish Rhodium',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center bg-[#0D1117] text-[#FAF8F5] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Editorial Hero Showcase"
    >
      {/* Background Images with smooth crossfade */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-40' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={s.image}
            alt={s.titleGold}
            fill
            priority={idx === 0}
            loading={idx === 0 ? 'eager' : 'lazy'}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
            quality={80}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
        </div>
      ))}

      {/* Main Slide Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-[#161B22]/90 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{slide.eyebrow}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF8F5] leading-[1.15] mb-6 min-h-[90px] sm:min-h-[140px]">
            {slide.titleLight}
            <span className="text-[#C5A059] italic font-normal">{slide.titleGold}</span>
            {slide.titleSuffix}
          </h1>

          {/* Narrative */}
          <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed mb-8 max-w-xl min-h-[60px]">
            {slide.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <Link
              href={slide.primaryCtaLink}
              className="inline-flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D1117] font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <span>{slide.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={getWhatsAppLink(slide.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-[#E8E2D7]/30 hover:border-[#25D366] bg-[#161B22]/70 hover:bg-[#25D366]/10 text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] px-7 py-4 rounded-full transition-all duration-300 group"
            >
              <FaWhatsapp className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#252D3D]">
            <div className="flex items-center gap-2 text-xs text-[#C5A059]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span className="text-[#FAF8F5]">{slide.trustBadge1}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#C5A059]">
              <Gem className="w-4 h-4 flex-shrink-0" />
              <span className="text-[#FAF8F5]">{slide.trustBadge2}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#C5A059]">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span className="text-[#FAF8F5]">{slide.trustBadge3}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Chevrons */}
      <div className="absolute right-4 sm:right-8 bottom-8 sm:bottom-12 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          aria-label="Previous Hero Slide"
          className="w-10 h-10 rounded-full border border-[#C5A059]/40 bg-[#161B22]/80 hover:bg-[#C5A059] text-[#FAF8F5] hover:text-[#0D1117] flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 px-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-[#C5A059]' : 'w-2 bg-[#FAF8F5]/30 hover:bg-[#FAF8F5]/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next Hero Slide"
          className="w-10 h-10 rounded-full border border-[#C5A059]/40 bg-[#161B22]/80 hover:bg-[#C5A059] text-[#FAF8F5] hover:text-[#0D1117] flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
