import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Gem } from 'lucide-react';

/**
 * Server Component: High-impact editorial Hero Section.
 * Luxury typography, authentic jewellery craft storytelling, and direct action CTAs.
 */

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#0D1117] text-[#FAF8F5] overflow-hidden">
      {/* Background Ambience / Image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury jewellery handcrafted atelier backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-[#161B22]/90 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Jewellery Atelier • Karachi Since 1947</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF8F5] leading-[1.1] mb-6">
            Elegance Forged in <span className="text-[#C5A059] italic font-normal">Pure Silver</span> &amp; Celestial Fire.
          </h1>

          {/* Narrative */}
          <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed mb-8 max-w-xl">
            Discover bespoke handcrafted 925 sterling silver jewels set with D VVS1 certified Moissanite
            and natural Burmese gemstones. Made-to-order heirloom pieces crafted for lifetimes of celebration.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D1117] font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <span>Explore The Showcase</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://wa.me/923001234567?text=Hello%20Aurelia%20Jewellers,%20I%20would%20like%20to%20inquire%20about%20a%20custom%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#E8E2D7]/30 hover:border-[#C5A059] bg-[#161B22]/60 hover:bg-[#161B22] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300"
            >
              <span>Custom Order Inquiry</span>
            </a>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#252D3D]">
            <div className="flex items-center gap-2 text-xs text-[#C5A059]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span className="text-[#FAF8F5]">925 Hallmark Certified</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#C5A059]">
              <Gem className="w-4 h-4 flex-shrink-0" />
              <span className="text-[#FAF8F5]">GRA D VVS1 Moissanite</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#C5A059]">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span className="text-[#FAF8F5]">Lifetime Replating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
