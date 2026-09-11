import HeroSection from '@/components/HeroSection';
import MarqueeLoop from '@/components/MarqueeLoop';
import OccasionsBanner from '@/components/OccasionsBanner';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import AtelierStandards from '@/components/AtelierStandards';
import CollectionsGrid from '@/components/CollectionsGrid';
import BespokeBanner from '@/components/BespokeBanner';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import HeritageStory from '@/components/HeritageStory';
import { getFeaturedProducts } from '@/sanity/lib/client';

/**
 * Server Component: Homepage of the Jewellery Showcase.
 * Fetches featured atelier pieces and renders the visual editorial layout
 * with cinematic carousels, occasion guides, materials standards, and bespoke custom ordering.
 */

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Multi-Slide Editorial Hero Carousel */}
      <HeroSection />

      {/* 2. FitFlair-inspired Infinite Marquee Looping Ribbon */}
      <MarqueeLoop />

      {/* 3. Shop by Occasion & Curated Milestone Edits */}
      <OccasionsBanner />

      {/* 4. Interactive Signature Pieces Carousel */}
      <FeaturedCarousel
        products={featuredProducts}
        title="Signature Atelier Pieces"
        subtitle="Exclusive Certified Moissanites & Hand-Set Gemstones"
      />

      {/* 5. The Atelier Standards (Materials, Hallmarks & Authenticity Spotlight) */}
      <AtelierStandards />

      {/* 6. Visual Categories Grid */}
      <CollectionsGrid />

      {/* 7. Bespoke Custom Orders & WhatsApp Consultation with Ring Size Guide */}
      <BespokeBanner />

      {/* 8. VIP Bridal & Client Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* 9. Craftsmanship & Heritage Quality Assurance */}
      <HeritageStory />
    </div>
  );
}
