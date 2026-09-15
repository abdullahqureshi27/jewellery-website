'use client';

/**
 * Client Component: Quick View Modal for inspecting high-res images,
 * detailed specifications (purity, carat, certification), adding to inquiry bag,
 * or triggering the customer details inquiry modal.
 * Built with shadcn Dialog with Lenis isolation and outside-click dismiss.
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShieldCheck, ShoppingCart, Check, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { JewelleryProduct } from '@/sanity/mockData';
import { useCart } from '@/context/CartContext';
import CustomerInquiryModal from './CustomerInquiryModal';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ProductQuickViewProps {
  product: JewelleryProduct | null;
  onClose: () => void;
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false);
  const { addToCart, removeFromCart, isInCart, setIsCartDrawerOpen } = useCart();

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImgIndex(0);
  }, [product]);

  // Lock Lenis and window scroll when quick view is open
  useEffect(() => {
    if (product) {
      (window as any).__lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      (window as any).__lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      (window as any).__lenis?.start();
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const inCart = isInCart(product._id);
  const activeImage = product.images?.[selectedImgIndex] || product.images?.[0] || {
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
    alt: product.title,
  };

  const formattedPrice = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(product.price || 0);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  const handleCartToggle = () => {
    if (inCart) {
      removeFromCart(product._id);
    } else {
      addToCart(product);
      setIsCartDrawerOpen(true);
    }
  };

  return (
    <>
      <Dialog open={Boolean(product)} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl bg-[#FAF8F5] p-0 border border-[#E8E2D7] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[88vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#12141A] shadow-sm transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery with thumbnail switcher */}
          <div className="w-full md:w-1/2 p-5 sm:p-6 bg-[#F5F2EC] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E2D7] shrink-0">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-[#E8E2D7] shadow-sm">
              <Image
                src={activeImage.url}
                alt={activeImage.alt || product.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                      selectedImgIndex === idx
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30'
                        : 'border-[#E8E2D7] hover:border-[#C5A059]/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.url} alt={img.alt} fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Jewellery Specifications & Actions (Scrollable container) */}
          <div
            data-lenis-prevent="true"
            className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto overscroll-contain scrollbar-thin"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-[#5C6270] mb-2 uppercase tracking-widest font-medium">
                <span>{product.category}</span>
                <span className="text-[#C5A059] font-mono">{product.itemCode}</span>
              </div>

              <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold text-[#0D1117] leading-tight mb-2">
                {product.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {product.description}
              </DialogDescription>

              {/* Price section */}
              <div className="flex items-baseline gap-3 mb-6">
                {product.priceOnRequest ? (
                  <span className="font-serif text-xl font-bold text-[#0D1117]">
                    Price on Request
                  </span>
                ) : (
                  <>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0D1117] tracking-normal">
                      {formattedPrice}
                    </span>
                    {formattedOriginalPrice && (
                      <span className="text-base text-[#8A90A0] line-through font-serif">
                        {formattedOriginalPrice}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Specifications Matrix */}
              <div className="space-y-2.5 py-4 border-y border-[#E8E2D7] text-xs">
                <div className="flex justify-between py-1 border-b border-[#E8E2D7]/50">
                  <span className="text-[#5C6270] uppercase tracking-wider">Metal Purity:</span>
                  <span className="font-medium text-[#12141A]">{product.metal}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8E2D7]/50">
                  <span className="text-[#5C6270] uppercase tracking-wider">Gemstone:</span>
                  <span className="font-medium text-[#12141A]">{product.gemstone}</span>
                </div>
                {product.caratWeight && (
                  <div className="flex justify-between py-1 border-b border-[#E8E2D7]/50">
                    <span className="text-[#5C6270] uppercase tracking-wider">Stone Weight:</span>
                    <span className="font-medium text-[#12141A]">{product.caratWeight}</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="text-[#5C6270] uppercase tracking-wider">Authenticity:</span>
                  <span className="font-medium text-[#C5A059] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Hallmarked &amp; Certified
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5C6270] leading-relaxed my-4">
                {product.description}
              </p>
            </div>

            {/* Actions: Add to Bag + Send Inquiry */}
            <div className="pt-4 border-t border-[#E8E2D7] space-y-3">
              <div className="flex gap-3">
                {/* Add to Inquiry Bag button */}
                <button
                  onClick={handleCartToggle}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    inCart
                      ? 'bg-[#C5A059] text-[#0D1117] border-[#C5A059]'
                      : 'bg-white hover:bg-[#FAF8F5] text-[#0D1117] border-[#E8E2D7]'
                  }`}
                >
                  {inCart ? <Check className="w-4 h-4 stroke-[2.5]" /> : <ShoppingCart className="w-4 h-4" />}
                  <span>{inCart ? 'In Your Bag' : 'Add to Bag'}</span>
                </button>

                {/* Direct Inquiry with Customer Details */}
                <button
                  onClick={() => setIsInquiryFormOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0D1117] hover:bg-[#25D366] text-[#FAF8F5] py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group cursor-pointer"
                >
                  <FaWhatsapp className="w-4 h-4 text-[#25D366] group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                  <span>Ask Details</span>
                </button>
              </div>

              <div className="text-center">
                <Link
                  href={`/product/${product.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5C6270] hover:text-[#0D1117] uppercase tracking-wider hover:underline"
                >
                  <span>Open Full Product Page</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Customer Details Inquiry Form for this single product */}
      <CustomerInquiryModal
        isOpen={isInquiryFormOpen}
        onClose={() => setIsInquiryFormOpen(false)}
        singleProduct={product}
      />
    </>
  );
}
