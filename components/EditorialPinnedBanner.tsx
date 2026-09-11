'use client';

import Image from 'next/image';
import { Sparkles, ChevronDown } from 'lucide-react';

/**
 * Client Component: Editorial Pinned Fullscreen Banner (Zanvari-inspired).
 * Uses CSS sticky pinning (sticky top-0 h-screen) within a 160vh scroll runway.
 * When the user scrolls down, the image locks into full-screen view.
 * As they continue scrolling, the subsequent content scrolls up over the image.
 */

export default function EditorialPinnedBanner() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0D1117]" aria-label="Editorial Brand Poem">
      {/* Editorial Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2400&q=90"
          alt="Two souls, one story, sealed in silver and light"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center grayscale contrast-110 brightness-75 scale-105 transition-transform duration-1000"
        />

        {/* Ambient Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 via-black/40 to-[#0D1117]/70" />

        {/* Centered Editorial Typography */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 border border-[#C5A059]/40 bg-[#0D1117]/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A059] mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Atelier Poetry</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.12em] text-[#FAF8F5] leading-[1.15] drop-shadow-2xl mb-6">
            Two Souls, One Story,
            <br />
            <span className="text-[#FAF8F5]/90">Sealed in </span>
            <span className="text-[#C5A059] italic font-normal">Silver</span>
            <span className="text-[#FAF8F5]/90"> &amp; Light</span>
          </h2>

          <p className="font-serif text-sm sm:text-base md:text-lg italic tracking-[0.25em] text-[#E8E2D7] uppercase font-light">
            A touch of forever by Aurelia Atelier
          </p>

          {/* Subtle scroll-down cue */}
          <div className="mt-14 flex flex-col items-center text-white/50 animate-bounce">
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium mb-1">Continue Journey</span>
            <ChevronDown className="w-4 h-4 text-[#C5A059]" />
          </div>
        </div>
      </section>
    );
}
