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
import { FaWhatsapp } from 'react-icons/fa';
import { JewelleryProduct } from '@/sanity/mockData';
import { useCart } from '@/context/CartContext';
import CustomerInquiryModal from './CustomerInquiryModal';

interface ProductCardProps {
  product: JewelleryProduct;
  onQuickView: (product: JewelleryProduct) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const { addToCart, removeFromCart, isInCart, setIsCartDrawerOpen } = useCart();

  const inCart = isInCart(product._id);

  const primaryImage = product?.images?.[0]?.url || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e';
  const secondaryImage = product?.images?.[1]?.url || primaryImage;

  const formattedPrice = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(product?.price || 0);

  const formattedOriginalPrice = product?.originalPrice
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
        {/* Clickable Image: Clicking anywhere on image navigates to Product Detail Page */}
        <Link
          href={`/product/${product.slug}`}
          className="block absolute inset-0 z-0 cursor-pointer"
          aria-label={`View details for ${product.title}`}
        >
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

        {/* Top-Right In-Stock / Made to order status */}
        {!product.inStock && (
          <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
            <span className="bg-amber-900/80 backdrop-blur-sm text-amber-200 text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Made to Order
            </span>
          </div>
        )}

        {/* 2. CENTER OVERLAY: Two White Pill Buttons */}
        {/* On hover: smooth slide-in from top to middle with opacity. On hover out: reverse transition */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2.5 p-4 pointer-events-none">
          {/* Top Button: Quick view */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-[146px] sm:w-[156px] py-2 sm:py-2.5 px-3 rounded-full bg-white text-[#111827] hover:bg-[#FAF8F5] hover:scale-105 active:scale-95 text-xs sm:text-[13px] font-medium tracking-normal text-center shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out transform opacity-0 -translate-y-5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer flex items-center justify-center"
          >
            <span>Quick view</span>
          </button>

          {/* Bottom Button: Open Direct WhatsApp Inquiry Dialog */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsInquiryModalOpen(true);
            }}
            className="w-[146px] sm:w-[156px] py-2 sm:py-2.5 px-3 rounded-full bg-white text-[#111827] hover:bg-[#FAF8F5] hover:scale-105 active:scale-95 text-xs sm:text-[13px] font-medium tracking-normal text-center shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out delay-75 transform opacity-0 -translate-y-5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto cursor-pointer flex items-center justify-center gap-1.5"
          >
            <FaWhatsapp className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
            <span>WhatsApp Inquiry</span>
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
        <div className="pt-3 border-t border-[#E8E2D7]/60 flex items-center justify-between gap-2">
          <div className="min-w-0">
            {product.priceOnRequest ? (
              <span className="font-serif text-sm font-bold text-[#0D1117]">
                Price on Request
              </span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="font-sans text-base sm:text-lg font-bold text-[#0D1117] tracking-tight tabular-nums lining-nums">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-xs text-[#8A90A0] line-through tabular-nums lining-nums font-sans">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>
            )}
          </div>

          <span className="text-[10px] sm:text-[11px] font-semibold text-[#C5A059] uppercase tracking-wider whitespace-nowrap shrink-0">
            {product.inStock ? 'Ready to Ship' : 'Made to Order'}
          </span>
        </div>
      </div>

      {/* Direct Customer Inquiry Dialog for this individual product */}
      <CustomerInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        singleProduct={product}
      />
    </div>
  );
}
