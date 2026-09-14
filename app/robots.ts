import type { MetadataRoute } from 'next';

/**
 * Server Configuration: Next.js App Router robots.txt generator.
 * Directs search engine crawlers (Googlebot, Bingbot, Applebot) to index public routes
 * while protecting CMS studio and API endpoints.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: 'https://www.ffzever.com/sitemap.xml',
    host: 'https://www.ffzever.com',
  };
}
