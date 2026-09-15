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
    title: 'Halo Locket Sets',
    category: '925 Pure Silver',
    imageUrl: '/products/ff-zircon-locket-set.jpeg',
    tag: 'Hand-Set Zircon',
    href: '/shop?category=locket-sets',
  },
  {
    title: 'Imperial Emerald Sets',
    category: '925 Solid Silver',
    imageUrl: '/products/ff-emerald-locket-set.jpeg',
    tag: 'Royal Green Petals',
    href: '/shop?category=locket-sets',
  },
  {
    title: 'Pink Blossom Tops',
    category: 'Fine Stud Earrings',
    imageUrl: '/products/ff-pink-blossom-tops.jpeg',
    tag: 'Micro-Pavé Halo',
    href: '/shop?category=earrings',
  },
  {
    title: 'Ruby Rose Locket Suite',
    category: 'Festive Sets',
    imageUrl: '/products/ff-ruby-locket-set.jpeg',
    tag: 'Pure Silver Chain',
    href: '/shop?category=locket-sets',
  },
  {
    title: 'Soft Pink Halo Pendant',
    category: 'Pendants & Chains',
    imageUrl: '/products/ff-soft-pink-pendant.jpeg',
    tag: 'Rhodium Polished',
    href: '/shop?category=pendants',
  },
  {
    title: 'Heirloom Velvet Box Sets',
    category: 'Presentation Case',
    imageUrl: '/products/ff-zircon-box.jpeg',
    tag: 'FF Jewellers Original',
    href: '/shop?category=locket-sets',
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
