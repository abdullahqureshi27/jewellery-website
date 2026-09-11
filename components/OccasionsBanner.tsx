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
    id: 'bridal',
    title: 'The Bridal Trousseau',
    subtitle: 'Opulent chokers, jhumkas, and heirloom bridal suites.',
    tag: 'Heirloom Grade',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    href: '/shop?category=bridal',
  },
  {
    id: 'solitaires',
    title: 'Solitaire Engagements',
    subtitle: 'D-Color VVS1 Moissanite rings with GRA warranty.',
    tag: 'Forever Fire',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    href: '/shop?category=rings',
  },
  {
    id: 'everyday',
    title: 'Everyday Fine Silver',
    subtitle: 'Minimalist tennis bangles, huggies, and stacking bands.',
    tag: '925 Hallmarked',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    href: '/shop?category=earrings',
  },
  {
    id: 'gifting',
    title: 'Keepsakes & Gifts',
    subtitle: 'Natural Burmese emeralds and solitaires under Rs 50,000.',
    tag: 'Luxury Boxed',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80',
    href: '/shop?category=pendants',
  },
];

export default function OccasionsBanner() {
  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D7]" aria-label="Shop By Occasion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6A2E] tracking-[0.25em] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Curated For Every Milestone</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#0D1117]">
              Shop By Occasion
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6A2E] hover:text-[#0D1117] uppercase tracking-[0.2em] transition-colors mt-4 md:mt-0 group"
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
              className="group relative rounded-2xl overflow-hidden bg-[#161B22] aspect-[3/4] flex flex-col justify-end p-6 border border-[#E8E2D7] hover:border-[#C5A059] transition-all duration-500 shadow-sm hover:shadow-xl"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/60 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              {/* Content Overlay */}
              <div className="relative z-10 flex flex-col justify-end">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059] mb-2 bg-[#0D1117]/70 backdrop-blur-sm px-2.5 py-1 rounded-full w-fit border border-[#C5A059]/30">
                  {item.tag}
                </span>

                <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-[#FAF8F5] mb-1 group-hover:text-[#C5A059] transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all text-[#C5A059]" />
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
