'use client';

/**
 * Client Component: Interactive single product detail view with
 * high-res gallery, specifications matrix, Add to Bag action, and Customer Inquiry Modal.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, MessageCircle, ShieldCheck, Award, Clock, Check } from 'lucide-react';
import { JewelleryProduct } from '@/sanity/mockData';
import { useCart } from '@/context/CartContext';
import CustomerInquiryModal from './CustomerInquiryModal';

interface ProductDetailViewProps {
  product: JewelleryProduct;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const { addToCart, removeFromCart, isInCart, setIsCartDrawerOpen } = useCart();

  const inCart = isInCart(product._id);
  const activeImage = product.images[selectedImgIdx] || product.images[0];

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
      <div className="py-12 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5C6270] hover:text-[#0D1117] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Showcase Pieces</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Image Gallery */}
            <div>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#E8E2D7] shadow-sm">
                <Image
                  src={activeImage.url}
                  alt={activeImage.alt || product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-all duration-500"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#0D1117] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#C5A059]/40">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-4 mt-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImgIdx === idx
                          ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30'
                          : 'border-[#E8E2D7] hover:border-[#C5A059]/60 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details & Inquiry */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#5C6270] uppercase tracking-widest font-semibold mb-2">
                  <span>{product.category}</span>
                  <span className="font-mono text-[#C5A059]">{product.itemCode}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D1117] leading-tight mb-4">
                  {product.title}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#E8E2D7]">
                  {product.priceOnRequest ? (
                    <span className="font-serif text-2xl font-bold text-[#0D1117]">
                      Price on Request
                    </span>
                  ) : (
                    <>
                      <span className="font-serif text-3xl font-bold text-[#0D1117]">
                        {formattedPrice}
                      </span>
                      {formattedOriginalPrice && (
                        <span className="text-base text-[#8A90A0] line-through">
                          {formattedOriginalPrice}
                        </span>
                      )}
                    </>
                  )}
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ml-auto ${
                      product.inStock
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {product.inStock ? 'In Stock (Ready to Ship)' : 'Made to Order (7-10 Days)'}
                  </span>
                </div>

                {/* Narrative */}
                <p className="text-sm text-[#5C6270] leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Specifications Matrix */}
                <div className="bg-white rounded-xl p-5 border border-[#E8E2D7] shadow-sm mb-8 space-y-3">
                  <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#0D1117] mb-2">
                    Atelier Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#8A90A0] uppercase block">Metal Purity:</span>
                      <span className="font-semibold text-[#12141A]">{product.metal}</span>
                    </div>
                    <div>
                      <span className="text-[#8A90A0] uppercase block">Gemstone Type:</span>
                      <span className="font-semibold text-[#12141A]">{product.gemstone}</span>
                    </div>
                    {product.caratWeight && (
                      <div>
                        <span className="text-[#8A90A0] uppercase block">Carat / Cut:</span>
                        <span className="font-semibold text-[#12141A]">{product.caratWeight}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[#8A90A0] uppercase block">Plating:</span>
                      <span className="font-semibold text-[#12141A]">Triple Rhodium Mirror Dip</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions: Add to Bag & Inquire with Details Form */}
              <div className="space-y-4 pt-4 border-t border-[#E8E2D7]">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Add to Inquiry Bag */}
                  <button
                    onClick={handleCartToggle}
                    className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 border shadow-sm ${
                      inCart
                        ? 'bg-[#C5A059] text-[#0D1117] border-[#C5A059]'
                        : 'bg-white hover:bg-[#FAF8F5] text-[#0D1117] border-[#E8E2D7]'
                    }`}
                  >
                    {inCart ? <Check className="w-4 h-4 stroke-[2.5]" /> : <ShoppingCart className="w-4 h-4" />}
                    <span>{inCart ? 'In Your Bag (Added)' : 'Add to Inquiry Bag'}</span>
                  </button>

                  {/* Open Customer Inquiry Form */}
                  <button
                    onClick={() => setIsInquiryModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2.5 bg-[#0D1117] hover:bg-[#25D366] text-[#FAF8F5] py-4 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-md group"
                  >
                    <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                    <span>Inquire with My Details</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[11px] text-[#5C6270]">
                  <div className="p-2 border border-[#E8E2D7] rounded-lg bg-white">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                    <span>GRA Certified</span>
                  </div>
                  <div className="p-2 border border-[#E8E2D7] rounded-lg bg-white">
                    <Award className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                    <span>Lifetime Care</span>
                  </div>
                  <div className="p-2 border border-[#E8E2D7] rounded-lg bg-white">
                    <Clock className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                    <span>Custom Sizing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details Inquiry Form for this single product */}
      <CustomerInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        singleProduct={product}
      />
    </>
  );
}
