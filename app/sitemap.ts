import type { MetadataRoute } from 'next';
import { getProducts } from '@/sanity/lib/client';

/**
 * Server Configuration: Dynamic Next.js App Router sitemap.xml generator.
 * Indexes the homepage, shop gallery, and every individual handcrafted jewellery product page
 * under the production domain https://www.ffzever.com for Googlebot and search engines.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.ffzever.com';
  const lastModified = new Date();

  // Fetch all product slugs for dynamic product indexing
  const products = await getProducts();

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls,
  ];
}
