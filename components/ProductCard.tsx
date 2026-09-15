'use client';

/**
 * Client Component: Luxury Product Card matching user reference design.
 * Features:
 * 1. Top-left circular Shopping Cart icon button to add/remove from inquiry bag.
 * 2. Bottom overlay on the image with two rounded pill buttons: [View Detail] & [Quick View].
 * 3. Desktop: Smooth hover transitions. Mobile: Fully visible and tappable for best UX.
 * 4. 2-image hover flip (macro studio piece ↔ model shot).
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check, Eye, Sparkles } from 'lucide-react';
import { JewelleryProduct } from '@/sanity/mockData';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/sonner';

interface ProductCardProps {
  product: JewelleryProduct;
  onQuickView: (product: JewelleryProduct) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, removeFromCart, isInCart, setIsCartDrawerOpen } = useCart();

  const inCart = isInCart(product._id);

  const primaryImage = product?.images?.[0]?.url || '/products/ff-zircon-locket-set.jpeg';

  const formattedPrice = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(product?.price || 0);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      removeFromCart(product._id);
      toast('Removed from Shopping Bag', {
        description: product.title,
      });
    } else {
      addToCart(product);
      toast.success('Added to Shopping Bag', {
        description: `${product.title} • Solid 925 Silver`,
        action: {
          label: 'View Bag',
          onClick: () => setIsCartDrawerOpen(true),
        },
      });
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] luxury-card-shadow flex flex-col justify-between transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-[#F8FAFC] overflow-hidden">
        {/* Clickable Image: Clicking anywhere on image navigates to Product Detail Page */}
        <Link
          href={`/product/${product.slug}`}
          className="block absolute inset-0 z-0 cursor-pointer"
          aria-label={`View details for ${product.title}`}
        >
          {/* Primary Studio Shot (Single Image with luxury hover zoom) */}
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* 1. TOP-LEFT: Shopping Cart Icon Button (Slides in from left with opacity on hover) */}
        <div
          className={`absolute top-3.5 left-3.5 z-20 transition-all duration-300 ease-out transform ${
            inCart
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 -translate-x-6 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto'
          }`}
        >
          <button
            onClick={handleCartClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
              inCart
                ? 'bg-[#0F172A] text-white ring-2 ring-[#CBD5E1] scale-105'
                : 'bg-[#0F172A]/85 hover:bg-[#0F172A] text-white hover:text-[#CBD5E1] backdrop-blur-sm'
            }`}
            title={inCart ? 'In your inquiry bag (Click to remove)' : 'Add to inquiry bag'}
            aria-label="Add to inquiry bag"
          >
            {inCart ? (
              <Check className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <ShoppingCart className="w-4 h-4 stroke-[2]" />
            )}
          </button>
        </div>

        {/* 2. CENTER OVERLAY: Two White Pill Buttons */}
        {/* On hover: smooth slide-in from top to middle with opacity. On hover out: reverse transition */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 pointer-events-none">
          {/* Quick view Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-[146px] sm:w-[156px] py-2 sm:py-2.5 px-3 rounded-full bg-white text-[#0F172A] hover:bg-[#F8FAFC] hover:scale-105 active:scale-95 text-xs sm:text-[13px] font-medium tracking-normal text-center shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out transform opacity-0 -translate-y-5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer flex items-center justify-center border border-[#E2E8F0]"
          >
            <span>Quick view</span>
          </button>
        </div>
      </div>

      {/* Product Details Section below image */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[11px] text-[#64748B] uppercase tracking-widest font-medium mb-1 block">
            {product.category}
          </span>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-base font-bold text-[#0F172A] hover:text-[#475569] transition-colors line-clamp-1 mb-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-[#64748B] line-clamp-1 mb-3">
            {product.description}
          </p>
        </div>

        {/* Pricing & Stock Footer */}
        <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="font-serif text-base sm:text-lg font-bold text-[#0F172A] tracking-normal">
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
