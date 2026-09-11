'use client';

/**
 * Client Component: Quick View Modal for viewing high-res images,
 * detailed specifications (purity, carat, certification), and instant WhatsApp inquiry.
 */

import { useState } from 'react';
import Image from 'next/image';
import { X, Sparkles, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { JewelleryProduct } from '@/sanity/mockData';

interface ProductQuickViewProps {
  product: JewelleryProduct | null;
  onClose: () => void;
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  if (!product) return null;

  const activeImage = product.images[selectedImgIndex] || product.images[0];
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

  const whatsappMessage = encodeURIComponent(
    `Hello Aurelia Atelier! I am interested in this piece from your showcase:\n\n*${product.title}*\nItem Code: ${product.itemCode}\nMetal: ${product.metal}\nGemstone: ${product.gemstone}\nPrice: ${product.priceOnRequest ? 'Price on Request' : formattedPrice}\n\nCould you share availability and custom sizing details?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1117]/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D7] max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#12141A] shadow-sm transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery with thumbnail switcher */}
        <div className="w-full md:w-1/2 p-6 bg-[#F5F2EC] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E2D7]">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-[#E8E2D7] shadow-sm">
            <Image
              src={activeImage.url}
              alt={activeImage.alt || product.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-all duration-500"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#0D1117] text-[#FAF8F5] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#C5A059]/40">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
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

        {/* Right Column: Jewellery Specifications & Inquiry */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-[#5C6270] mb-2 uppercase tracking-widest font-medium">
              <span>{product.category}</span>
              <span className="text-[#C5A059] font-mono">{product.itemCode}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D1117] leading-tight mb-3">
              {product.title}
            </h3>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-6">
              {product.priceOnRequest ? (
                <span className="font-serif text-xl font-bold text-[#0D1117]">
                  Price on Request
                </span>
              ) : (
                <>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0D1117]">
                    {formattedPrice}
                  </span>
                  {formattedOriginalPrice && (
                    <span className="text-sm text-[#8A90A0] line-through">
                      {formattedOriginalPrice}
                    </span>
                  )}
                </>
              )}
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ml-auto ${
                  product.inStock
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {product.inStock ? 'Ready to Ship' : 'Made to Order (7-10d)'}
              </span>
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

          {/* Direct WhatsApp Call to Action */}
          <div className="pt-4 border-t border-[#E8E2D7] space-y-2">
            <a
              href={`https://wa.me/923001234567?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#0D1117] hover:bg-[#25D366] text-[#FAF8F5] py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-md group"
            >
              <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>Inquire via WhatsApp Concierge</span>
            </a>
            <p className="text-center text-[10px] text-[#8A90A0]">
              Instant response from our master gemologist • Custom sizing available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
