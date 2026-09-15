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
      title: 'Piece Not Found | Faraz Faheem Atelier',
    };
  }

  const primaryImage = product.images[0]?.url || '';

  return {
    title: `${product.title} | Faraz Faheem Fine Jewellery`,
    description: product.description,
    alternates: {
      canonical: `https://www.ffzever.com/product/${slug}`,
    },
    openGraph: {
      title: `${product.title} | Faraz Faheem Atelier`,
      description: product.description,
      url: `https://www.ffzever.com/product/${slug}`,
      siteName: 'Faraz Faheem Atelier',
      images: [
        {
          url: primaryImage,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Faraz Faheem Atelier`,
      description: product.description,
      images: [primaryImage],
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

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.map((img) => img.url),
    sku: product.itemCode || product.slug,
    brand: {
      '@type': 'Brand',
      name: 'Faraz Faheem Atelier',
    },
    material: '925 Sterling Silver',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PKR',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      url: `https://www.ffzever.com/product/${slug}`,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Faraz Faheem Atelier',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailView product={product} />
    </>
  );
}
