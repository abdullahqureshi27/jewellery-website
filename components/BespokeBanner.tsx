'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Camera, PenTool, CheckCircle, Ruler } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppLink } from '@/lib/whatsapp';
import RingSizeModal from './RingSizeModal';

/**
 * Client Component: Bespoke Custom Orders & 1-Click WhatsApp Atelier Consultation Banner.
 * Promotes custom made-to-order bridal suites, custom engagement solitaires, and sizing assistance.
 */

export default function BespokeBanner() {
  const [isRingModalOpen, setIsRingModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-[#FAF8F5] border-t border-b border-[#E8E2D7]" aria-label="Bespoke Jewellery Concierge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0D1117] rounded-3xl overflow-hidden border border-[#C5A059]/30 shadow-2xl relative">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16 relative z-10">
              {/* Left Column: Story & 3 Steps */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-[#161B22] border border-[#C5A059]/40 text-[#C5A059] px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Karigar Commission</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[#FAF8F5] mb-6 leading-tight">
                  Have a Dream Design in Mind?
                </h2>

                <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed mb-8 max-w-xl">
                  From Pinterest reference photos to bridal lehenga matching, our third-generation master karigars
                  will hand-forge your bespoke piece in certified 925 sterling silver or 18K gold vermeil.
                </p>

                {/* 3 Step Process */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div className="flex flex-col">
                    <div className="w-10 h-10 rounded-full bg-[#161B22] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] mb-3">
                      <Camera className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#FAF8F5] mb-1">
                      1. Share Photo
                    </h4>
                    <p className="text-[11px] text-[#8B949E] leading-relaxed">
                      Send a screenshot, sketch, or ring style directly on WhatsApp.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="w-10 h-10 rounded-full bg-[#161B22] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] mb-3">
                      <PenTool className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#FAF8F5] mb-1">
                      2. CAD &amp; Quote
                    </h4>
                    <p className="text-[11px] text-[#8B949E] leading-relaxed">
                      Review 3D digital proportions and choose gemstone grades.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="w-10 h-10 rounded-full bg-[#161B22] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] mb-3">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#FAF8F5] mb-1">
                      3. Hand-Cast &amp; Set
                    </h4>
                    <p className="text-[11px] text-[#8B949E] leading-relaxed">
                      Hallmarked, polished, and shipped in our velvet heirloom chest.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href={getWhatsAppLink('Hello Faraz Faheem Atelier, I have a reference image for a custom jewellery piece. I would like a quote and consultation.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D1117] font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer group"
                  >
                    <FaWhatsapp className="w-4 h-4 text-[#0D1117] group-hover:scale-110 transition-transform" />
                    <span>Send Reference on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setIsRingModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 border border-[#E8E2D7]/30 hover:border-[#C5A059] bg-[#161B22]/70 hover:bg-[#161B22] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] px-6 py-4 rounded-full transition-all cursor-pointer"
                  >
                    <Ruler className="w-4 h-4 text-[#C5A059]" />
                    <span>Ring Sizing Guide</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Showcase Imagery */}
              <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#C5A059]/30">
                <Image
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85"
                  alt="Custom handcrafted jewellery piece in atelier"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0D1117]/85 backdrop-blur-md border border-[#C5A059]/30 text-center">
                  <p className="font-serif text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">
                    100% Bespoke Guarantee
                  </p>
                  <p className="text-[10px] text-[#8B949E] mt-0.5">
                    GRA Moissanite • Solid 925 Silver • Lifetime Rhodium
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Ring Sizing Modal */}
      <RingSizeModal isOpen={isRingModalOpen} onClose={() => setIsRingModalOpen(false)} />
    </>
  );
}
