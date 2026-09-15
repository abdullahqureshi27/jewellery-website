import { createClient } from 'next-sanity';
import { MOCK_JEWELLERY_PRODUCTS, JewelleryProduct } from '../mockData';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

/**
 * Robust data fetcher: queries live Sanity if configured, otherwise serves
 * the luxury mock dataset seamlessly.
 */
export async function getProducts(): Promise<JewelleryProduct[]> {
  if (!client || !projectId || projectId === 'demo-project-id') {
    return MOCK_JEWELLERY_PRODUCTS;
  }

  try {
    const sanityQuery = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      itemCode,
      category,
      price,
      isFeatured,
      "inStock": true,
      "images": select(
        defined(image) => [{"url": image.asset->url, "alt": title}],
        defined(images) => images[]{"url": asset->url, "alt": coalesce(alt, title)},
        []
      ),
      description
    }`;
    const data = await client.fetch(
      sanityQuery,
      {},
      {
        next: {
          revalidate: 60, // Cache for 60s across all users; prevents crashing Sanity under high traffic
          tags: ['products'],
        },
      }
    );
    if (data && data.length > 0) {
      return data;
    }
    return MOCK_JEWELLERY_PRODUCTS;
  } catch (err) {
    console.warn('Could not connect to live Sanity, falling back to mock dataset:', err);
    return MOCK_JEWELLERY_PRODUCTS;
  }
}

export async function getFeaturedProducts(): Promise<JewelleryProduct[]> {
  const all = await getProducts();
  return all.filter((p) => p.isFeatured);
}

export async function getProductBySlug(slug: string): Promise<JewelleryProduct | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) || null;
}
