'use client';

/**
 * Client Component: Interactive carousel for signature bestseller pieces.
 * Smooth horizontal slide navigation with touch-support and quick-view integration.
 */

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { JewelleryProduct } from '@/sanity/mockData';
import ProductCard from './ProductCard';
import ProductQuickView from './ProductQuickView';

interface FeaturedCarouselProps {
  products: JewelleryProduct[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedCarousel({
  products,
  title = 'Signature Atelier Pieces',
  subtitle = 'Exquisite Certified Moissanites & Hand-Set Gemstones',
}: FeaturedCarouselProps) {
  const [selectedProduct, setSelectedProduct] = useState<JewelleryProduct | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#64748B]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#64748B] font-semibold">
                {subtitle}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wide text-[#0D1117]">
              {title}
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-[#E2E8F0] hover:border-[#0F172A] bg-white hover:bg-[#0F172A] hover:text-white transition-all shadow-sm cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-[#E2E8F0] hover:border-[#0F172A] bg-white hover:bg-[#0F172A] hover:text-white transition-all shadow-sm cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="w-[280px] sm:w-[320px] md:w-[350px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} onQuickView={(p) => setSelectedProduct(p)} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
