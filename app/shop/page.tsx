import { Suspense } from 'react';
import type { Metadata } from 'next';
import ShopCatalog from '@/components/ShopCatalog';
import { getProducts } from '@/sanity/lib/client';

/**
 * Server Component: Catalog and Showcase Page.
 * Fetches all inventory from Sanity (or fallback mock) on the server,
 * then renders the interactive client filter catalog wrapped in Suspense.
 */

export const metadata: Metadata = {
  title: 'All Jewellery Showcase | Faraz Faheem Atelier',
  description:
    'Browse our full jewellery showcase of handcrafted 925 sterling silver rings, certified moissanite pendants, teardrop earrings, and bridal sets by Faraz Faheem (FF Zever).',
  alternates: {
    canonical: 'https://www.ffzever.com/shop',
  },
  openGraph: {
    title: 'All Jewellery Showcase | Faraz Faheem Atelier',
    description:
      'Browse our handcrafted 925 sterling silver, certified moissanite, and bespoke bridal sets in Pakistan.',
    url: 'https://www.ffzever.com/shop',
  },
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="py-24 text-center">
            <p className="font-serif text-lg uppercase tracking-widest text-[#0D1117] animate-pulse">
              Loading Showcase Gallery...
            </p>
          </div>
        }
      >
        <ShopCatalog initialProducts={products} />
      </Suspense>
    </div>
  );
}
