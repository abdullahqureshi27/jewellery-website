import Image from 'next/image';
import Link from 'next/link';

/**
 * Server Component: Infinite horizontal marquee loop inspired by FitFlair,
 * showcasing close-up gem details and signature jewellery collections.
 */

interface MarqueeItem {
  title: string;
  category: string;
  imageUrl: string;
  tag: string;
  href: string;
}

const MARQUEE_ITEMS: MarqueeItem[] = [
  {
    title: 'Solitaire Rings',
    category: 'GRA Moissanite',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    tag: 'D VVS1 Certified',
    href: '/shop?category=rings',
  },
  {
    title: 'Royal Emerald Pendants',
    category: 'Natural & Lab Emeralds',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    tag: '18K Gold Vermeil',
    href: '/shop?category=pendants',
  },
  {
    title: 'TearDrop Studs',
    category: 'Fine Earrings',
    imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
    tag: 'Triple Rhodium Dip',
    href: '/shop?category=earrings',
  },
  {
    title: 'Channel Tennis Bangles',
    category: 'Bracelets',
    imageUrl: 'https://images.unsplash.com/photo-1611591475836-8158c54c379a?auto=format&fit=crop&w=600&q=80',
    tag: 'Double Safety Clasp',
    href: '/shop?category=bangles',
  },
  {
    title: 'Heritage Bridal Sets',
    category: 'Bridal Atelier',
    imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80',
    tag: 'Mughal Filigree Craft',
    href: '/shop?category=bridal',
  },
  {
    title: 'Pavé Diamond Eternity Bands',
    category: 'Anniversary Rings',
    imageUrl: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=600&q=80',
    tag: 'Continuous Light',
    href: '/shop?category=rings',
  },
];

export default function MarqueeLoop() {
  // Duplicate array for continuous seamless infinite loop
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="py-12 bg-[#0D1117] overflow-hidden border-y border-[#C5A059]/20 select-none">
      <div className="max-w-7xl mx-auto px-4 mb-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
            Curated Collections
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#FAF8F5]">
            Continuous Showcase
          </h3>
        </div>
        <p className="text-xs text-[#8B949E] tracking-wider uppercase">
          Hover to pause • Click to explore
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient fades */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-[#0D1117] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-[#0D1117] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6 py-2">
          {duplicatedItems.map((item, idx) => (
            <Link
              key={`${item.title}-${idx}`}
              href={item.href}
              className="group relative flex-shrink-0 w-72 sm:w-80 h-44 rounded-xl overflow-hidden bg-[#161B22] border border-[#252D3D] hover:border-[#C5A059] transition-all duration-300 block"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 288px, 320px"
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/40 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="inline-block bg-[#0D1117]/80 backdrop-blur-sm border border-[#C5A059]/40 text-[#C5A059] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] tracking-widest uppercase text-[#8B949E] block">
                  {item.category}
                </span>
                <h4 className="font-serif text-base font-bold text-[#FAF8F5] group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
