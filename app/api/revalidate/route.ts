import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Route Handler: On-demand cache revalidation endpoint for Sanity Webhooks.
 * Allows Sanity Studio mutations to instantly refresh Next.js cache without
 * waiting for the 60s TTL, while protecting the backend from high traffic.
 */
export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret');

    // Optional secret verification if SANITY_REVALIDATE_SECRET is configured
    if (process.env.SANITY_REVALIDATE_SECRET && secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 });
    }

    // Invalidate product tag cache and all showcase routes
    revalidateTag('products');
    revalidatePath('/');
    revalidatePath('/shop');
    revalidatePath('/product/[slug]', 'page');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'Sanity cache successfully revalidated across all routes and tags.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown revalidation error';
    return NextResponse.json({ revalidated: false, error: message }, { status: 500 });
  }
}
