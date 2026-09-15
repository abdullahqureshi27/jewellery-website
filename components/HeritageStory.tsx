import Image from 'next/image';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

/**
 * Server Component: Heritage & Bespoke Craftsmanship story.
 */

export default function HeritageStory() {
  const currentYear = new Date().getFullYear();
  const yearsOfCraftsmanship = currentYear - 1982;

  return (
    <section className="py-24 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Atmospheric Image Collage */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-xl">
              <Image
                src="/products/ff-zircon-collage.jpeg"
                alt="Jewellery master artisan hand-setting gemstone by FFZever"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#CBD5E1] block font-semibold">
                  The Master Karigar
                </span>
                <p className="font-serif text-lg font-bold">
                  Hand-Cut Prongs &amp; Precision Micro-Pavé
                </p>
              </div>
            </div>

            {/* Floating Luxury Stamp */}
            <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-[#0A0D14] text-[#F8FAFC] p-5 rounded-2xl border border-[#334155]/60 shadow-2xl hidden sm:block max-w-[200px]">
              <Sparkles className="w-6 h-6 text-[#CBD5E1] mb-2" />
              <p className="font-serif text-2xl font-bold text-white">Since 1982</p>
              <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider">
                Over {yearsOfCraftsmanship} years of master jewellery craftsmanship
              </p>
            </div>
          </div>

          {/* Right: Narrative & Quality Assurances */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#475569] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Authentic Heritage &amp; Craft</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
              Why Choose FFZever?
            </h2>

            <p className="text-sm text-[#64748B] leading-relaxed">
              Unlike mass-manufactured commercial alloy jewellery that tarnishes within weeks, every FFZever
              piece begins with certified **925 solid sterling silver**. We treat every piece with a triple-pass
              rhodium mirror dipping for permanent tarnish resistance.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#475569] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-bold text-[#0F172A]">
                    D Color VVS1 Moissanite Certified
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Hardness rating of 9.25 on Mohs scale with higher refractive fire than mined diamonds. Accompanied by a GRA warranty card.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#475569] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-bold text-[#0F172A]">
                    Lifetime Rhodium Replating Warranty
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    We stand behind our craft forever. Send your piece back anytime for complimentary ultrasonic steam cleaning and replating.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#475569] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-bold text-[#0F172A]">
                    Bespoke Sizing &amp; Custom Orders
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Have a family heirloom design or custom engagement ring idea? Our designers can bring your sketch to life within 10 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={getWhatsAppLink('Hello Faraz Faheem Atelier, I would like to consult on a bespoke jewellery design.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#334155] text-white text-xs font-bold uppercase tracking-[0.2em] px-8 py-3.5 rounded-full transition-all duration-300 shadow-md border border-[#CBD5E1]/30"
              >
                <span>Consult Our Gemologist on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
