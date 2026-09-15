import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * Server Component: Visual Category Grid for exploring curated collections.
 */

const COLLECTIONS = [
  {
    title: '925 Silver Locket Sets',
    category: 'locket-sets',
    description: 'Complete 3-piece heirloom sets with matching tops and pure 925 silver chains.',
    imageUrl: '/products/ff-zircon-locket-set.jpeg',
    count: 'Locket Sets',
  },
  {
    title: 'Fine Tops & Stud Earrings',
    category: 'earrings',
    description: 'Handcrafted pink blossom studs and micro-pavé zircons with comfort post backings.',
    imageUrl: '/products/ff-pink-blossom-tops.jpeg',
    count: 'Earrings & Tops',
  },
  {
    title: 'Pendants & Silver Chains',
    category: 'pendants',
    description: 'Radiant halo pendants and delicate drops set on hallmarked 925 silver chains.',
    imageUrl: '/products/ff-soft-pink-pendant.jpeg',
    count: 'Pendants',
  },
];

export default function CollectionsGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#64748B] font-bold block mb-2">
            The Atelier Galleries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#0F172A]">
            Explore by Category
          </h2>
          <div className="w-12 h-0.5 bg-[#0F172A] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.title}
              href={`/shop?category=${col.category}`}
              className="group relative rounded-2xl overflow-hidden bg-[#0A0D14] border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-500 aspect-[4/5]"
            >
              <Image
                src={col.imageUrl}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-85 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/30 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#CBD5E1] bg-[#0A0D14]/80 backdrop-blur-sm border border-[#475569]/50 px-3 py-1 rounded-full">
                    {col.count}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0F172A] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#CBD5E1] transition-colors mb-2">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#CBD5E1]/80 line-clamp-2 max-w-md">
                    {col.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
