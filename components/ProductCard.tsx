'use client';

/**
 * Client Component: Luxury Product Card matching user reference design.
 * Features:
 * 1. Top-left circular Shopping Cart icon button to add/remove from inquiry bag.
 * 2. Bottom overlay on the image with two rounded pill buttons: [View Detail] & [Quick View].
 * 3. Desktop: Smooth hover transitions. Mobile: Fully visible and tappable for best UX.
 * 4. 2-image hover flip (macro studio piece ↔ model shot).
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check, Eye, Sparkles } from 'lucide-react';
import { JewelleryProduct } from '@/sanity/mockData';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: JewelleryProduct;
  onQuickView: (product: JewelleryProduct) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, removeFromCart, isInCart, setIsCartDrawerOpen } = useCart();

  const inCart = isInCart(product._id);

  const primaryImage = product.images[0]?.url || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e';
  const secondaryImage = product.images[1]?.url || primaryImage;

  const formattedPrice = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      removeFromCart(product._id);
    } else {
      addToCart(product);
      setIsCartDrawerOpen(true);
    }
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#E8E2D7] luxury-card-shadow flex flex-col justify-between transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-[#F5F2EC] overflow-hidden">
        {/* Primary Studio Shot */}
        <Image
          src={primaryImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            isHovered && secondaryImage !== primaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Model / Angle Shot on Hover */}
        {secondaryImage !== primaryImage && (
          <Image
            src={secondaryImage}
            alt={`${product.title} lifestyle`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ease-in-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* 1. TOP-LEFT: Shopping Cart Icon Button (Matching Shared Screenshot) */}
        <div className="absolute top-3.5 left-3.5 z-20">
          <button
            onClick={handleCartClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              inCart
                ? 'bg-[#C5A059] text-[#0D1117] ring-2 ring-white scale-105'
                : 'bg-[#1A1817]/85 hover:bg-[#0D1117] text-white hover:text-[#C5A059] backdrop-blur-sm'
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

        {/* Top-Right Badge (Signature / Best Seller / Made to order) */}
        <div className="absolute top-3.5 right-3.5 z-10 flex flex-col items-end gap-1">
          {product.badge && (
            <span className="bg-[#0D1117]/85 backdrop-blur-sm text-[#FAF8F5] border border-[#C5A059]/40 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="bg-amber-900/80 backdrop-blur-sm text-amber-200 text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Made to Order
            </span>
          )}
        </div>

        {/* 2. BOTTOM OVERLAY: [View Detail] & [Quick View] Pill Buttons (Matching Shared Screenshot) */}
        {/* On desktop: fades and slides up on hover. On mobile: clearly visible for instant touch action */}
        <div
          className={`absolute inset-x-3 bottom-3 z-20 flex items-center gap-2.5 transition-all duration-300 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-90 sm:opacity-0 translate-y-0 sm:translate-y-2'
          }`}
        >
          {/* Left Pill Button: View Detail */}
          <Link
            href={`/product/${product.slug}`}
            className="flex-1 bg-[#1A1817]/90 hover:bg-[#0D1117] text-white text-center py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 shadow-md backdrop-blur-sm border border-white/10 hover:border-[#C5A059]"
          >
            View Detail
          </Link>

          {/* Right Pill Button: Quick View */}
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 bg-[#1A1817]/90 hover:bg-[#0D1117] text-white py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 shadow-md backdrop-blur-sm border border-white/10 hover:border-[#C5A059]"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Details Section below image */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#8A90A0] uppercase tracking-widest font-medium mb-1">
            <span>{product.category}</span>
            <span className="font-mono text-[#C5A059]">{product.itemCode}</span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-base font-bold text-[#0D1117] hover:text-[#C5A059] transition-colors line-clamp-1 mb-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-[#5C6270] line-clamp-1 mb-3">
            {product.metal} • {product.gemstone}
          </p>
        </div>

        {/* Pricing & Stock Footer */}
        <div className="pt-3 border-t border-[#E8E2D7]/60 flex items-center justify-between">
          <div>
            {product.priceOnRequest ? (
              <span className="font-serif text-sm font-bold text-[#0D1117]">
                Price on Request
              </span>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-base sm:text-lg font-bold text-[#0D1117]">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-xs text-[#8A90A0] line-through">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>
            )}
          </div>

          <span className="text-[11px] font-semibold text-[#C5A059] uppercase tracking-wider">
            {product.inStock ? 'Ready to Ship' : 'Made to Order'}
          </span>
        </div>
      </div>
    </div>
  );
}
