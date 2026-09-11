import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailView from '@/components/ProductDetailView';
import { getProductBySlug, getProducts } from '@/sanity/lib/client';

/**
 * Server Component: Dynamic Product Detail Page.
 * Generates SEO metadata and fetches product by slug on the server.
 */

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60; // Next.js ISR: Cache product pages for 60s to handle high concurrent traffic

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Piece Not Found | Aurelia Atelier',
    };
  }

  return {
    title: `${product.title} | Aurelia & Co. Fine Jewellery`,
    description: product.description,
    openGraph: {
      title: `${product.title} | Aurelia & Co.`,
      description: product.description,
      images: [
        {
          url: product.images[0]?.url || '',
          alt: product.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
