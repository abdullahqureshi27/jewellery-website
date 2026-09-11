import HeroSection from '@/components/HeroSection';
import MarqueeLoop from '@/components/MarqueeLoop';
import OccasionsBanner from '@/components/OccasionsBanner';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import AtelierStandards from '@/components/AtelierStandards';
import EditorialPinnedBanner from '@/components/EditorialPinnedBanner';
import CollectionsGrid from '@/components/CollectionsGrid';
import BespokeBanner from '@/components/BespokeBanner';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import HeritageStory from '@/components/HeritageStory';
import { getFeaturedProducts } from '@/sanity/lib/client';

/**
 * Server Component: Homepage of the Jewellery Showcase.
 * Features the Zanvari-inspired fullscreen sticky pinned editorial section
 * where the image locks into place upon scrolling, and subsequent content slides over top.
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

      {/* 4. The Atelier Standards (Materials, Hallmarks & Authenticity Spotlight) */}
      <AtelierStandards />

      {/* 5. Interactive Signature Pieces Carousel */}
      <FeaturedCarousel
        products={featuredProducts}
        title="Signature Atelier Pieces"
        subtitle="Exclusive Certified Moissanites & Hand-Set Gemstones"
      />

      {/* 6. Zanvari-Inspired Sticky Pinned Editorial Section with Solid Curtain Reveal */}
      <div className="relative">
        {/* Pinned Editorial Section: Locks at top-0 as soon as it reaches full screen */}
        <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
          <EditorialPinnedBanner />
        </div>

        {/* Subsequent Content Layer: 100% Solid Opaque Background (#FAF8F5) that slides over the pinned image */}
        <div className="relative z-10 bg-[#FAF8F5] border-t border-[#E8E2D7] shadow-[0_-30px_70px_rgba(0,0,0,0.5)]">
          {/* Visual Categories Grid */}
          <CollectionsGrid />

          {/* Bespoke Custom Orders & WhatsApp Consultation with Ring Size Guide */}
          <BespokeBanner />

          {/* VIP Bridal & Client Testimonials Carousel */}
          <TestimonialsCarousel />

          {/* Craftsmanship & Heritage Quality Assurance */}
          <HeritageStory />
        </div>
      </div>
    </div>
  );
}
