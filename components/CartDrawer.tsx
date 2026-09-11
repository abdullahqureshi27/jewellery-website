'use client';

/**
 * Client Component: Slide-over Inquiry Bag / Cart Drawer.
 * Built with shadcn Sheet & Button primitives, inspired by FitFlair's
 * dark luxury aesthetic with compact, proportional product cards.
 * Clicking any item links directly to its product detail page.
 */

import React, { useState, useEffect } from 'react';
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

  // Freeze background page scrolling and pause Lenis while the drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
      (window as any).__lenis?.stop();
    } else {
      document.body.style.overflow = '';
      (window as any).__lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      (window as any).__lenis?.start();
    };
  }, [isCartDrawerOpen]);

  return (
    <>
      <Sheet open={isCartDrawerOpen} onOpenChange={setIsCartDrawerOpen}>
        <SheetContent
          side="right"
          showCloseButton={true}
          data-lenis-prevent="true"
          className="w-full sm:max-w-md bg-[#0B0D13] text-white border-l border-white/10 p-0 flex flex-col justify-between shadow-2xl z-50 overflow-hidden h-full max-h-screen"
        >
          {/* Compact Luxury Header */}
          <SheetHeader className="px-5 py-4 bg-[#0B0D13] border-b border-white/10 flex-shrink-0 pr-12">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059]">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <SheetTitle className="font-serif text-base font-bold tracking-wide text-white">
                Shopping Cart
              </SheetTitle>
              <span className="ml-1 bg-[#C5A059]/20 text-[#E5C17B] border border-[#C5A059]/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <SheetDescription className="sr-only">
              Review your selected jewellery pieces before inquiring
            </SheetDescription>
          </SheetHeader>

          {/* Scrollable Products List - Maximum vertical space & compact cards */}
          <div
            data-lenis-prevent="true"
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-2.5 scrollbar-thin"
          >
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#8B949E]">
                  <ShoppingBag className="w-8 h-8 text-[#C5A059]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-bold text-white tracking-wide">
                    Your Cart is Empty
                  </h4>
                  <p className="text-xs text-[#8B949E] max-w-xs mx-auto leading-relaxed">
                    Explore our atelier catalogue and click the 🛒 bag icon on any jewel to curate your inquiry.
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    onClick={() => setIsCartDrawerOpen(false)}
                    render={<Link href="/shop" />}
                    className="inline-flex items-center gap-1.5 bg-[#FAF8F5] hover:bg-[#C5A059] text-[#0D1117] px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                  >
                    <span>View Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="bg-[#131720] border border-white/8 hover:border-[#C5A059]/40 rounded-xl p-2.5 flex gap-3 items-center transition-all duration-300 group shadow-xs"
                >
                  {/* Clickable Image -> Sends to Product Detail Page */}
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="relative w-16 h-16 rounded-lg overflow-hidden bg-black/60 flex-shrink-0 border border-white/10 group-hover:border-[#C5A059]/50 transition-colors"
                    title={`View details of ${product.title}`}
                  >
                    <Image
                      src={product.images?.[0]?.url || ''}
                      alt={product.title || 'Jewellery piece'}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  {/* Product Details & Clickable Title */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[9px] text-[#E5C17B] font-semibold tracking-wider">
                        {product.itemCode}
                      </span>
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="text-[#8B949E] hover:text-red-400 p-1 transition-colors rounded hover:bg-white/5"
                        title="Remove item"
                        aria-label={`Remove ${product.title}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="font-serif text-xs font-semibold text-white hover:text-[#E5C17B] transition-colors truncate block leading-snug"
                      title={product.title}
                    >
                      {product.title}
                    </Link>

                    <p className="text-[10px] text-[#8B949E] truncate">{product.metal}</p>

                    {/* Price & Quantity Controls Row */}
                    <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-white/10">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-xs font-bold text-white">
                          Rs. {((product.price || 0) * quantity).toLocaleString()}
                        </span>
                        {product.originalPrice && product.originalPrice > (product.price || 0) && (
                          <span className="text-[9px] text-[#6E7681] line-through">
                            Rs. {(product.originalPrice * quantity).toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Compact Quantity Selector */}
                      <div className="flex items-center border border-white/15 rounded-md bg-[#0B0D13] px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(product._id, quantity - 1)}
                          className="w-4 h-4 flex items-center justify-center text-[#8B949E] hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2 h-2" />
                        </button>
                        <span className="px-1.5 text-[11px] font-semibold text-white min-w-[16px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product._id, quantity + 1)}
                          className="w-4 h-4 flex items-center justify-center text-[#8B949E] hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-2 h-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Compact Checkout Footer */}
          {items.length > 0 && (
            <SheetFooter className="p-4 bg-[#10141D] border-t border-white/10 space-y-2.5 flex flex-col sm:flex-col items-stretch flex-shrink-0 shadow-lg">
              {/* Subtle Trust Line */}
              <div className="flex items-center gap-1.5 text-[10px] text-[#8B949E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5C17B] flex-shrink-0" />
                <span>Complimentary Velvet Box &amp; Hallmark Authenticity Card</span>
              </div>

              {/* Total Row */}
              <div className="flex items-baseline justify-between pt-0.5">
                <span className="text-[11px] uppercase tracking-wider text-[#8B949E]">
                  Estimated Total:
                </span>
                <span className="font-serif text-lg font-bold text-[#E5C17B]">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Primary WhatsApp Inquiry CTA Button */}
              <Button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full h-11 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#25D366]/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inquire on WhatsApp ({totalItems} {totalItems === 1 ? 'Piece' : 'Pieces'})</span>
              </Button>

              <button
                onClick={clearCart}
                className="w-full text-center text-[10px] text-[#8B949E] hover:text-white underline transition-colors cursor-pointer"
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
