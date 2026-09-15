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
    description: 'Complete heirloom sets with matching 925 silver chain and handcrafted tops.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    count: 'Signature Locket Sets',
  },
  {
    title: 'Emerald & Pink Pendants',
    category: 'pendants',
    description: 'Brilliant halo pendants and floral drops accompanied by authentic 925 silver chains.',
    imageUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
    count: 'Statement Pendants',
  },
  {
    title: 'Ear rings & Floral Tops',
    category: 'earrings',
    description: 'Radiant tops, zircon cluster studs, and delicate drops for daily and festive grace.',
    imageUrl: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80',
    count: 'Fine Tops & Studs',
  },
  {
    title: 'Channel Tennis Bracelets',
    category: 'bracelets',
    description: 'Continuous ribbons of moissanite light with heavy 925 silver security locks.',
    imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80',
    count: 'Handcrafted Bracelets',
  },
  {
    title: 'Heritage Bridal Sets',
    category: 'bridal',
    description: 'Opulent wedding couture chokers, jhumkas, and matha pattis crafted on order.',
    imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80',
    count: 'Royal Bridal Sets',
  },
  {
    title: 'Solitaire & Eternity Rings',
    category: 'rings',
    description: 'Certified D VVS1 Moissanite set in hallmarked 925 silver with rhodium polish.',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    count: 'Signature Rings',
  },
];

export default function CollectionsGrid() {
  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-2">
            The Atelier Galleries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#0D1117]">
            Explore by Category
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.map((col, idx) => (
            <Link
              key={col.title}
              href={`/shop?category=${col.category}`}
              className={`group relative rounded-2xl overflow-hidden bg-[#0D1117] border border-[#E8E2D7] shadow-sm hover:shadow-xl transition-all duration-500 ${
                idx === 0
                  ? 'md:col-span-2 lg:col-span-2 aspect-[16/10] sm:aspect-[16/9]'
                  : idx === 1
                  ? 'col-span-1 aspect-square lg:aspect-auto lg:h-full min-h-[300px]'
                  : 'col-span-1 aspect-square'
              }`}
            >
              <Image
                src={col.imageUrl}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/30 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C5A059] bg-[#0D1117]/80 backdrop-blur-sm border border-[#C5A059]/30 px-3 py-1 rounded-full">
                    {col.count}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5]/20 backdrop-blur-md flex items-center justify-center text-[#FAF8F5] group-hover:bg-[#C5A059] group-hover:text-[#0D1117] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF8F5] group-hover:text-[#C5A059] transition-colors mb-2">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#E8E2D7]/80 line-clamp-2 max-w-md">
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
