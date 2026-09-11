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

      {/* 4. Interactive Signature Pieces Carousel */}
      <FeaturedCarousel
        products={featuredProducts}
        title="Signature Atelier Pieces"
        subtitle="Exclusive Certified Moissanites & Hand-Set Gemstones"
      />

      {/* 5. The Atelier Standards (Materials, Hallmarks & Authenticity Spotlight) */}
      <AtelierStandards />

      {/* 6. Zanvari-Inspired Sticky Pinned Editorial Section */}
      <EditorialPinnedBanner />

      {/* 7. Subsequent Content Layer: Slides over the pinned image on scroll */}
      <div className="relative z-10 bg-[#FAF8F5] shadow-[0_-25px_60px_rgba(0,0,0,0.35)]">
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
  );
}
