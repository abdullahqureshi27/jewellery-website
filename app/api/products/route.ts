import { NextResponse } from 'next/server';
import { getProducts } from '@/sanity/lib/client';

export const revalidate = 60;

/**
 * GET /api/products
 * Serves cached jewellery products for instant client-side real-time search
 * and live navigation autocomplete without page reloads.
 */
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (err) {
    console.error('Failed to fetch products for search API:', err);
    return NextResponse.json([], { status: 500 });
  }
}
