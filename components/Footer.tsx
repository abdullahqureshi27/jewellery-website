import Link from 'next/link';
import { Sparkles, ShieldCheck, Award, Gem, Truck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppLink } from '@/lib/whatsapp';

/**
 * Server Component: Luxury boutique footer with heritage details,
 * trust badges, customer care, and atelier craftsmanship.
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const craftsmanshipYears = currentYear - 1982;

  return (
    <footer className="bg-footer-bg text-footer-text border-t border-footer-border">
      {/* Top Trust Pillars Ribbon */}
      <div className="border-b border-footer-border py-10 bg-footer-surface/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-footer-border flex items-center justify-center text-silver-light shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">925 Sterling Silver</h4>
                <p className="text-[11px] text-footer-muted">100% Solid Stamped Hallmark</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-footer-border flex items-center justify-center text-silver-light shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Rhodium Mirror Polish</h4>
                <p className="text-[11px] text-footer-muted">Anti-Tarnish Lustre Finish</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-footer-border flex items-center justify-center text-silver-light shrink-0">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Certified Moissanite</h4>
                <p className="text-[11px] text-footer-muted">GRA D VVS1 Optical Fire</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-footer-border flex items-center justify-center text-silver-light shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Insured Delivery</h4>
                <p className="text-[11px] text-footer-muted">Safe Delivery Across Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14 border-b border-footer-border">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-silver-light" />
              <span className="font-serif text-2xl font-bold tracking-[0.1em] text-white uppercase">
                FFZever
              </span>
            </div>
            <p className="text-xs text-footer-muted leading-relaxed">
              Master handcrafted solid 925 sterling silver, certified moissanite, and heirloom gemstone jewellery since 1982.
              Over {craftsmanshipYears} years of precision artisan karigar heritage across Pakistan.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] text-silver-light font-semibold tracking-wider uppercase bg-white/5 border border-footer-border px-3 py-1 rounded-full">
                Faraz Faheem Atelier • Since 1982
              </span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-light mb-4">
              Showcase Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-footer-muted">
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
                  Ear rings &amp; Daily Tops
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bridal" className="hover:text-white transition-colors">
                  Bridal Suites
                </Link>
              </li>
              <li>
                <Link href="/shop?category=rings" className="hover:text-white transition-colors">
                  Moissanite Solitaire Rings
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-light mb-4">
              Concierge Care
            </h4>
            <ul className="space-y-2.5 text-xs text-footer-muted">
              <li>
                <a
                  href={getWhatsAppLink('Hello Faraz Faheem Atelier, I would like to inquire about a bespoke custom order.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Custom Bespoke Commission
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink('Hello Faraz Faheem Atelier, I need assistance measuring my ring size.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Ring Size &amp; Fit Guide
                </a>
              </li>
              <li>
                <span className="text-footer-muted">GRA Certificate Verification</span>
              </li>
              <li>
                <span className="text-footer-muted">Complimentary Lifetime Re-Polishing</span>
              </li>
              <li>
                <Link href="/studio" target="_blank" className="text-silver-light hover:underline">
                  Client Studio CMS Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Bespoke Inquiry Card */}
          <div className="bg-footer-card p-6 rounded-2xl border border-footer-border shadow-lg flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-2">
                Private Consultation
              </h4>
              <p className="text-xs text-footer-muted leading-relaxed mb-4">
                Interested in custom bridal jewellery or bespoke 3D CAD design? Chat directly with our master atelier on WhatsApp.
              </p>
            </div>
            <a
              href={getWhatsAppLink('Hello Faraz Faheem Atelier, I would like to book a bespoke jewellery consultation.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-white hover:bg-silver-light text-foreground text-xs font-bold py-3 rounded-full uppercase tracking-wider transition-all duration-300 shadow-md group cursor-pointer"
            >
              <FaWhatsapp className="w-4 h-4 text-whatsapp group-hover:scale-110 transition-transform" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-footer-muted gap-4">
          <p>© {currentYear} FFZever (Faraz Faheem Atelier • Since 1982). All rights reserved.</p>
          <div className="flex items-center space-x-6 text-silver-light text-[11px]">
            <span>925 Sterling Silver</span>
            <span>•</span>
            <span>GRA Certified Moissanite</span>
            <span>•</span>
            <span>Insured Delivery Across Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
