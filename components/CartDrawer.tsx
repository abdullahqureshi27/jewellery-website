'use client';

/**
 * Client Component: Slide-over Inquiry Bag / Cart Drawer.
 * Built with shadcn Sheet & Button primitives, inspired by FitFlair's
 * modern dark-mode luxury drawer aesthetic with high-contrast product cards
 * and fluid off-screen slide-in animation.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CustomerInquiryModal from './CustomerInquiryModal';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export default function CartDrawer() {
  const {
    items,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  return (
    <>
      <Sheet open={isCartDrawerOpen} onOpenChange={setIsCartDrawerOpen}>
        <SheetContent
          side="right"
          showCloseButton={true}
          className="w-full sm:max-w-md bg-[#0B0D13] text-white border-l border-white/10 p-0 flex flex-col justify-between shadow-2xl z-50 overflow-hidden"
        >
          {/* Drawer Header (FitFlair Inspired Dark Theme) */}
          <SheetHeader className="p-6 bg-[#0B0D13] border-b border-white/10 space-y-3 pr-14">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <SheetTitle className="font-serif text-2xl font-bold tracking-tight text-white">
                  Shopping Cart
                </SheetTitle>
              </div>
              <span className="bg-[#C5A059]/20 text-[#E5C17B] border border-[#C5A059]/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            <SheetDescription className="sr-only">
              Review your selected jewellery pieces before inquiring
            </SheetDescription>

            {/* Quick Action Pill */}
            <Link
              href="/shop"
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-full block text-center bg-[#FAF8F5] hover:bg-[#E5C17B] text-[#0D1117] font-semibold text-xs py-2.5 rounded-xl transition-all duration-300 shadow-sm"
            >
              Continue Browsing Collection
            </Link>
          </SheetHeader>

          {/* Drawer Items List (FitFlair Inspired High-Contrast Cards) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="py-24 text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#8B949E]">
                  <ShoppingBag className="w-10 h-10 text-[#C5A059]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                    Your Cart is Empty
                  </h4>
                  <p className="text-xs text-[#8B949E] max-w-xs mx-auto leading-relaxed">
                    Explore our atelier catalogue and tap the 🛒 cart icon on any jewel to curate your inquiry list.
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    onClick={() => setIsCartDrawerOpen(false)}
                    render={<Link href="/shop" />}
                    className="inline-flex items-center gap-2 bg-[#FAF8F5] hover:bg-[#C5A059] text-[#0D1117] px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                  >
                    <span>View Atelier Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="bg-[#131720] border border-white/8 hover:border-[#C5A059]/40 rounded-2xl p-3.5 flex gap-3.5 items-center transition-all duration-300 group shadow-md"
                >
                  {/* High Quality Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black/60 flex-shrink-0 border border-white/10 shadow-inner">
                    <Image
                      src={product.images?.[0]?.url || ''}
                      alt={product.title || 'Jewellery piece'}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[10px] text-[#E5C17B] font-semibold tracking-wider">
                        {product.itemCode}
                      </span>
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="text-[#8B949E] hover:text-red-400 p-1 transition-colors rounded-md hover:bg-white/5"
                        title="Remove item"
                        aria-label={`Remove ${product.title}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-serif text-sm font-semibold text-white truncate leading-snug mt-0.5">
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-[#8B949E] truncate">{product.metal}</p>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-sm font-bold text-white">
                          Rs. {((product.price || 0) * quantity).toLocaleString()}
                        </span>
                        {product.originalPrice && product.originalPrice > (product.price || 0) && (
                          <span className="text-[10px] text-[#6E7681] line-through">
                            Rs. {(product.originalPrice * quantity).toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-white/15 rounded-lg bg-[#0B0D13] px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(product._id, quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#8B949E] hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-white min-w-[20px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product._id, quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#8B949E] hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer (FitFlair Inspired Dark Luxury Checkout) */}
          {items.length > 0 && (
            <SheetFooter className="p-6 bg-[#10141D] border-t border-white/10 space-y-4 flex flex-col sm:flex-col items-stretch">
              {/* Trust Badge */}
              <div className="bg-[#0B0D13] border border-white/10 rounded-xl p-3 flex items-center gap-2.5 text-xs text-[#8B949E]">
                <ShieldCheck className="w-4 h-4 text-[#E5C17B] flex-shrink-0" />
                <span>Complimentary Velvet Box &amp; Certified Authenticity Card</span>
              </div>

              {/* Total Row */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#8B949E] block">
                    Estimated Total
                  </span>
                  <span className="text-[10px] text-[#6E7681]">
                    Direct atelier pricing in PKR
                  </span>
                </div>
                <span className="font-serif text-2xl font-bold text-[#E5C17B]">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Primary WhatsApp Inquiry CTA Button */}
              <Button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-6 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Inquire About All ({totalItems}) Pieces</span>
              </Button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-[#8B949E] hover:text-white underline transition-colors cursor-pointer py-1"
              >
                Clear Shopping Bag
              </button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      {/* Customer Details Inquiry Modal for multiple cart items */}
      <CustomerInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        cartItems={items}
        onInquirySent={() => {
          clearCart();
          setIsCartDrawerOpen(false);
        }}
      />
    </>
  );
}
