'use client';

/**
 * Client Component: Interactive luxury product card.
 * Features 2-image hover flip (macro gem piece ↔ lifestyle/model shot),
 * hallmark badges, pricing, and quick-view trigger.
 */

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Eye, MessageCircle } from 'lucide-react';
import { JewelleryProduct } from '@/sanity/mockData';

interface ProductCardProps {
  product: JewelleryProduct;
  onQuickView: (product: JewelleryProduct) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  const whatsappMessage = encodeURIComponent(
    `Hello Aurelia Atelier! I am interested in this piece from your showcase:\n\n*${product.title}*\nItem Code: ${product.itemCode}\nPrice: ${product.priceOnRequest ? 'Price on Request' : formattedPrice}\n\nCould you share availability and custom sizing details?`
  );

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden border border-[#E8E2D7] luxury-card-shadow flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container with 2-Image Flip on Hover */}
      <div className="relative aspect-square w-full bg-[#F5F2EC] overflow-hidden cursor-pointer">
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

        {/* Badge (Signature Piece / Best Seller) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-[#0D1117]/90 backdrop-blur-sm text-[#FAF8F5] border border-[#C5A059]/40 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="bg-amber-900/80 backdrop-blur-sm text-amber-200 text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Made to Order
            </span>
          )}
        </div>

        {/* Hover Quick Actions Overlay */}
        <div
          className={`absolute inset-0 bg-[#0D1117]/30 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-3 z-20 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => onQuickView(product)}
            className="bg-[#FAF8F5] hover:bg-white text-[#0D1117] p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
            title="Quick View Specifications"
            aria-label="Quick View Specifications"
          >
            <Eye className="w-4 h-4" />
          </button>
          <a
            href={`https://wa.me/923001234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
            title="Inquire on WhatsApp"
            aria-label="Inquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
          </a>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#8A90A0] uppercase tracking-widest font-medium mb-1.5">
            <span>{product.category}</span>
            <span className="font-mono text-[#C5A059]">{product.itemCode}</span>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base sm:text-lg font-bold text-[#0D1117] hover:text-[#C5A059] transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {product.title}
          </h3>

          <p className="text-xs text-[#5C6270] line-clamp-1 mb-3">
            {product.metal} • {product.gemstone}
          </p>
        </div>

        {/* Pricing & CTA */}
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

          <button
            onClick={() => onQuickView(product)}
            className="text-xs font-semibold text-[#0D1117] hover:text-[#C5A059] uppercase tracking-wider flex items-center gap-1 group/btn"
          >
            <span>Details</span>
            <Sparkles className="w-3 h-3 text-[#C5A059] group-hover/btn:rotate-45 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
