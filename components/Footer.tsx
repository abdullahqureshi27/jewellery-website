import Link from 'next/link';
import { Sparkles, Shield, Award, Gem, Clock } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

/**
 * Server Component: Luxury boutique footer with heritage details,
 * trust badges, customer care, and atelier address.
 */

export default function Footer() {
  return (
    <footer className="bg-[#0D1117] text-[#FAF8F5] pt-16 pb-12 border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heritage Trust Badges */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-16 border-b border-[#252D3D]">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-[#161B22] border border-[#C5A059]/40 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#FAF8F5]">
              925 Pure Silver
            </h4>
            <p className="text-xs text-[#8B949E] mt-1">Hallmarked &amp; anti-tarnish rhodium plated</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-[#161B22] border border-[#C5A059]/40 flex items-center justify-center mb-3">
              <Gem className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#FAF8F5]">
              GRA Moissanite
            </h4>
            <p className="text-xs text-[#8B949E] mt-1">D Color VVS1 with warranty certification card</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-[#161B22] border border-[#C5A059]/40 flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#FAF8F5]">
              Lifetime Replating
            </h4>
            <p className="text-xs text-[#8B949E] mt-1">Complimentary lifetime polish and rhodium care</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-[#161B22] border border-[#C5A059]/40 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#FAF8F5]">
              Bespoke Craft
            </h4>
            <p className="text-xs text-[#8B949E] mt-1">Master karigars crafting made-to-order sets</p>
          </div>
        </div> */}

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14 border-b border-[#252D3D]">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
              <span className="font-serif text-2xl font-bold tracking-[0.1em] text-[#FAF8F5] uppercase">
                FFZever
              </span>
            </div>
            <p className="text-xs text-[#8B949E] leading-relaxed">
              Crafting heirloom-grade sterling silver, natural gemstone, and certified moissanite jewellery
              since 1982. Every facet polished to mirror perfection.
            </p>
            <p className="text-xs text-[#C5A059] pt-2">
              Handcrafted 925 Solid Sterling Silver • Nationwide Insured Delivery
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
              Signature Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8B949E]">
              <li>
                <Link href="/shop?category=locket-sets" className="hover:text-[#FAF8F5] transition-colors">
                  925 Silver Locket Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pendants" className="hover:text-[#FAF8F5] transition-colors">
                  Pendants &amp; Chains
                </Link>
              </li>
              <li>
                <Link href="/shop?category=earrings" className="hover:text-[#FAF8F5] transition-colors">
                  Ear rings &amp; Tops
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
              Concierge Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8B949E]">
              <li>
                <a
                  href={getWhatsAppLink('Hello, I would like a custom order consultation.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Custom Design Inquiry
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink('Hello, how can I measure my ring size?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Ring Size &amp; Fit Guide
                </a>
              </li>
              <li>
                <span className="text-[#8B949E]">Certificate Verification (GRA)</span>
              </li>
              <li>
                <span className="text-[#8B949E]">Worldwide Insured Shipping</span>
              </li>
              <li>
                <Link href="/studio" target="_blank" className="text-[#C5A059] hover:underline">
                  Client Studio CMS Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Bespoke Inquiry Card */}
          <div className="bg-[#161B22] p-5 rounded-lg border border-[#252D3D]">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF8F5] mb-2">
              Private Jewellery Viewing
            </h4>
            <p className="text-xs text-[#8B949E] mb-4">
              Interested in a custom cut or bridal set? Connect directly with our lead gemologist via WhatsApp.
            </p>
            <a
              href={getWhatsAppLink('Hello, I would like to book a private jewellery viewing.')}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D1117] text-xs font-semibold py-2.5 rounded-full uppercase tracking-wider transition-colors"
            >
              Book Viewing on WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B949E] gap-4">
          <p>© {new Date().getFullYear()} FFZever (Faraz Faheem Atelier). All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[#C5A059]">
            <span>925 Sterling Silver</span>
            <span>•</span>
            <span>GRA Certified Moissanite</span>
            <span>•</span>
            <span>Nationwide &amp; Worldwide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
