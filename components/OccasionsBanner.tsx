import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';

/**
 * Server Component: Shop by Occasion Curated Edit.
 * Visual high-fashion cards guiding visitors to specific buying moments (Bridal, Engagement, Everyday, Gifting).
 */

interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  href: string;
}

const OCCASIONS: OccasionItem[] = [
  {
    id: 'locket-sets',
    title: 'Signature Locket Sets',
    subtitle: 'Heirloom 3-piece locket suites with matching tops & pure chain.',
    tag: 'Pure 925 Silver',
    image: '/products/ff-zircon-box.jpeg',
    href: '/shop?category=locket-sets',
  },
  {
    id: 'gemstones',
    title: 'Emerald & Ruby Gemstones',
    subtitle: 'Hand-set synthetic gems encircled by brilliant zircon petals.',
    tag: 'Heirloom Grade',
    image: '/products/ff-emerald-locket-set.jpeg',
    href: '/shop?category=locket-sets',
  },
  {
    id: 'everyday',
    title: 'Everyday Floral Tops',
    subtitle: 'Handcrafted pink blossom studs and lightweight daily earrings.',
    tag: '925 Hallmarked',
    image: '/products/ff-pink-blossom-tops.jpeg',
    href: '/shop?category=earrings',
  },
  {
    id: 'gifting',
    title: 'Keepsakes & Pendants',
    subtitle: 'Delicate round halo pendants with authentic 925 silver chains.',
    tag: 'Luxury Boxed',
    image: '/products/ff-soft-pink-pendant.jpeg',
    href: '/shop?category=pendants',
  },
];

export default function OccasionsBanner() {
  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]" aria-label="Shop By Occasion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] tracking-[0.25em] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Curated For Every Milestone</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#0D1117]">
              Shop By Occasion
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] hover:text-[#475569] uppercase tracking-[0.2em] transition-colors mt-4 md:mt-0 group"
          >
            <span>Explore All Occasions</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Editorial Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OCCASIONS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative rounded-2xl overflow-hidden bg-[#161B22] aspect-[3/4] flex flex-col justify-end p-6 border border-[#E2E8F0] hover:border-slate-500 transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              {/* Background Image with Zoom */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/60 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              {/* Content Overlay */}
              <div className="relative z-10 flex flex-col justify-end">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-[#CBD5E1] mb-2 bg-[#0A0D14]/80 backdrop-blur-sm px-2.5 py-1 rounded-full w-fit border border-white/10">
                  {item.tag}
                </span>

                <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-white mb-1 group-hover:text-[#CBD5E1] transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all text-[#CBD5E1]" />
                </h3>

                <p className="text-xs text-[#8B949E] line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
