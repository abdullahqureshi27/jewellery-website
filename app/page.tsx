import HeroSection from '@/components/HeroSection';
import MarqueeLoop from '@/components/MarqueeLoop';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import CollectionsGrid from '@/components/CollectionsGrid';
import HeritageStory from '@/components/HeritageStory';
import { getFeaturedProducts } from '@/sanity/lib/client';

/**
 * Server Component: Homepage of the Jewellery Showcase.
 * Fetches featured atelier pieces and renders the visual editorial layout.
 */

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. FitFlair-inspired Infinite Marquee Looping Ribbon */}
      <MarqueeLoop />

      {/* 3. Interactive Signature Pieces Carousel */}
      <FeaturedCarousel
        products={featuredProducts}
        title="Signature Atelier Pieces"
        subtitle="Exclusive Certified Moissanites & Hand-Set Gemstones"
      />

      {/* 4. Visual Categories Grid */}
      <CollectionsGrid />

      {/* 5. Craftsmanship & Heritage Quality Assurance */}
      <HeritageStory />
    </div>
  );
}
