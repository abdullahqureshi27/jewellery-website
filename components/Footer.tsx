import Link from 'next/link';
import { Sparkles, Shield, Award, Gem, Clock } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

/**
 * Server Component: Luxury boutique footer with heritage details,
 * trust badges, customer care, and atelier address.
 */

export default function Footer() {
  return (
    <footer className="bg-[#0A0D14] text-[#F8FAFC] pt-16 pb-12 border-t border-[#334155]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14 border-b border-[#1E293B]">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#94A3B8]" />
              <span className="font-serif text-2xl font-bold tracking-[0.1em] text-white uppercase">
                FFZever
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Crafting heirloom-grade sterling silver, natural gemstone, and certified moissanite jewellery
              since 1982. Every facet polished to mirror perfection.
            </p>
            <p className="text-xs text-[#CBD5E1] pt-2">
              Handcrafted 925 Solid Sterling Silver • Nationwide Insured Delivery
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CBD5E1] mb-4">
              Signature Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>
                <Link href="/shop?category=locket-sets" className="hover:text-white transition-colors">
                  925 Silver Locket Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pendants" className="hover:text-white transition-colors">
                  Pendants &amp; Chains
                </Link>
              </li>
              <li>
                <Link href="/shop?category=earrings" className="hover:text-white transition-colors">
                  Ear rings &amp; Tops
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CBD5E1] mb-4">
              Concierge Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>
                <a
                  href={getWhatsAppLink('Hello, I would like a custom order consultation.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Custom Design Inquiry
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink('Hello, how can I measure my ring size?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Ring Size &amp; Fit Guide
                </a>
              </li>
              <li>
                <span className="text-[#94A3B8]">Certificate Verification (GRA)</span>
              </li>
              <li>
                <span className="text-[#94A3B8]">Worldwide Insured Shipping</span>
              </li>
              <li>
                <Link href="/studio" target="_blank" className="text-[#CBD5E1] hover:underline">
                  Client Studio CMS Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Bespoke Inquiry Card */}
          <div className="bg-[#0F172A] p-5 rounded-lg border border-[#334155]/60">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-2">
              Private Jewellery Viewing
            </h4>
            <p className="text-xs text-[#94A3B8] mb-4">
              Interested in a custom cut or bridal set? Connect directly with our lead gemologist via WhatsApp.
            </p>
            <a
              href={getWhatsAppLink('Hello, I would like to book a private jewellery viewing.')}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full bg-white hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-semibold py-2.5 rounded-full uppercase tracking-wider transition-colors"
            >
              Book Viewing on WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p>© {new Date().getFullYear()} FFZever (Faraz Faheem Atelier). All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[#CBD5E1]">
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
