'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Gem, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
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
    id: 'zircon-silver',
    eyebrow: 'FFZever Master Atelier • Since 1982',
    titleLight: 'Elegance Forged in ',
    titleGold: '925 Pure Silver',
    titleSuffix: ' & Brilliant Zircon.',
    description:
      'Discover bespoke handcrafted 925 sterling silver jewels with anti-tarnish rhodium polish. Authentic heirloom locket sets, tops, and pendants made for lifetimes of celebration.',
    primaryCtaText: 'Explore The Showcase',
    primaryCtaLink: '/shop',
    whatsappMessage: 'Hello FFZever, I would like to inquire about your 925 Pure Silver and Zircon locket sets.',
    image: '/products/ff-zircon-locket-set.jpeg',
    trustBadge1: 'Pure 925 Silver Stamped',
    trustBadge2: 'Anti-Tarnish Rhodium',
    trustBadge3: 'Nationwide Insured Delivery',
  },
  {
    id: 'emerald-ruby',
    eyebrow: 'Signature Gemstones • Heirloom Craftsmanship',
    titleLight: 'Imperial Emerald & ',
    titleGold: 'Ruby Rose Sets',
    titleSuffix: ' in Solid 925 Silver.',
    description:
      'Opulent 3-piece locket sets with matching tops and pure silver chains. Finished with triple-pass rhodium mirror polish for enduring radiance.',
    primaryCtaText: 'View Locket Sets',
    primaryCtaLink: '/shop?category=locket-sets',
    whatsappMessage: 'Hello FFZever, I would like to inquire about your Imperial Emerald and Ruby locket sets.',
    image: '/products/ff-emerald-locket-set.jpeg',
    trustBadge1: 'Hand-Set Gemstones',
    trustBadge2: 'Matching 925 Chain',
    trustBadge3: 'Luxury Velvet Box',
  },
  {
    id: 'blossom-tops',
    eyebrow: 'Exquisite Tops & Pendants • Daily Elegance',
    titleLight: 'Pink Blossom Tops & ',
    titleGold: 'Solitaire Pendants',
    titleSuffix: ' for Every Moment.',
    description:
      'Delicate pink blossom studs and sparkling solitaire pendants hand-set in certified 925 pure silver. Timeless elegance at direct atelier value.',
    primaryCtaText: 'Discover Tops & Pendants',
    primaryCtaLink: '/shop?category=earrings',
    whatsappMessage: 'Hello FFZever, I would like to inquire about your Pink Blossom Tops and Pendants.',
    image: '/products/ff-pink-blossom-tops.jpeg',
    trustBadge1: 'Comfort Fit Tops',
    trustBadge2: 'Pure 925 Stamped',
    trustBadge3: 'Handmade by FFZever',
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
      className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center bg-[#0A0D14] text-[#F8FAFC] overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14] via-[#0A0D14]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent" />
        </div>
      ))}

      {/* Main Slide Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-[#0F172A]/90 backdrop-blur-md border border-[#475569]/50 text-[#CBD5E1] px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>{slide.eyebrow}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-6 min-h-[90px] sm:min-h-[140px]">
            {slide.titleLight}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBD5E1] to-[#94A3B8] italic font-normal">
              {slide.titleGold}
            </span>
            {slide.titleSuffix}
          </h1>

          {/* Narrative */}
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-8 max-w-xl min-h-[60px]">
            {slide.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <Link
              href={slide.primaryCtaLink}
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-[#F1F5F9] text-[#0F172A] font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <span>{slide.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={getWhatsAppLink(slide.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-[#334155] hover:border-[#25D366] bg-[#0F172A]/70 hover:bg-[#25D366]/10 text-[#F8FAFC] text-xs font-semibold uppercase tracking-[0.2em] px-7 py-4 rounded-full transition-all duration-300 group"
            >
              <FaWhatsapp className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#1E293B]">
            <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span className="text-[#F8FAFC]">{slide.trustBadge1}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
              <Gem className="w-4 h-4 flex-shrink-0" />
              <span className="text-[#F8FAFC]">{slide.trustBadge2}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span className="text-[#F8FAFC]">{slide.trustBadge3}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Chevrons */}
      <div className="absolute right-4 sm:right-8 bottom-8 sm:bottom-12 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          aria-label="Previous Hero Slide"
          className="w-10 h-10 rounded-full border border-[#475569]/50 bg-[#0F172A]/80 hover:bg-white text-[#F8FAFC] hover:text-[#0F172A] flex items-center justify-center transition-colors cursor-pointer"
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
                idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next Hero Slide"
          className="w-10 h-10 rounded-full border border-[#475569]/50 bg-[#0F172A]/80 hover:bg-white text-[#F8FAFC] hover:text-[#0F172A] flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
