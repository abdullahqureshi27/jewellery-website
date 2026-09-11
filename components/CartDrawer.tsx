'use client';

/**
 * Client Component: Slide-over Inquiry Bag / Cart Drawer.
 * Built with shadcn Sheet & Button primitives.
 * Features ultra-smooth sliding animation from off-screen,
 * luxury atelier styling, and combined WhatsApp inquiry launcher.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight, ShieldCheck, Gem } from 'lucide-react';
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
          className="w-full sm:max-w-md bg-[#FAF8F5] border-l border-[#E8E2D7] p-0 flex flex-col justify-between shadow-2xl z-50 overflow-hidden"
        >
          {/* Drawer Header */}
          <SheetHeader className="p-6 bg-[#0D1117] text-[#FAF8F5] border-b border-[#C5A059]/20 space-y-1 pr-14">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <SheetTitle className="font-serif text-lg font-bold uppercase tracking-widest text-[#FAF8F5]">
                Inquiry Bag
              </SheetTitle>
              <span className="ml-2 bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {totalItems} {totalItems === 1 ? 'Piece' : 'Pieces'}
              </span>
            </div>
            <SheetDescription className="text-xs text-[#8B949E] tracking-wider">
              Curate your selection to request pricing, custom sizing &amp; video preview
            </SheetDescription>
          </SheetHeader>

          {/* Drawer Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5 divide-y divide-[#E8E2D7]/60">
            {items.length === 0 ? (
              <div className="py-24 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-white border border-[#E8E2D7] flex items-center justify-center mx-auto text-[#8A90A0] shadow-inner">
                  <ShoppingBag className="w-9 h-9 text-[#C5A059]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base font-bold uppercase tracking-wider text-[#0D1117]">
                    Your Bag is Empty
                  </h4>
                  <p className="text-xs text-[#5C6270] max-w-xs mx-auto leading-relaxed">
                    Explore our collection and click the 🛒 bag icon on any jewel to prepare a combined WhatsApp inquiry.
                  </p>
                </div>
                <div className="pt-3">
                  <Button
                    onClick={() => setIsCartDrawerOpen(false)}
                    render={<Link href="/shop" />}
                    className="inline-flex items-center gap-2 bg-[#0D1117] hover:bg-[#C5A059] hover:text-[#0D1117] text-[#FAF8F5] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-sm"
                  >
                    <span>Explore Atelier Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="pt-3.5 first:pt-0 flex gap-3.5 items-start group"
                >
                  {/* High Quality Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-[#E8E2D7] shadow-xs">
                    <Image
                      src={product.images?.[0]?.url || ''}
                      alt={product.title || 'Jewellery piece'}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[10px] text-[#C5A059] font-medium tracking-wider">
                          {product.itemCode}
                        </span>
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="text-[#8A90A0] hover:text-red-600 p-1 transition-colors"
                          title="Remove item from bag"
                          aria-label={`Remove ${product.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-serif text-xs font-bold text-[#0D1117] truncate leading-snug">
                        {product.title}
                      </h4>
                      <p className="text-[10px] text-[#5C6270] truncate mt-0.5">{product.metal}</p>
                    </div>

                    {/* Quantity + Item Price Row */}
                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity Pill Controls */}
                      <div className="flex items-center border border-[#E8E2D7] rounded-full bg-white shadow-xs px-1">
                        <button
                          onClick={() => updateQuantity(product._id, quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#5C6270] hover:text-[#0D1117] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#0D1117] min-w-[20px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product._id, quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#5C6270] hover:text-[#0D1117] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <span className="font-serif text-xs font-bold text-[#0D1117]">
                        Rs. {((product.price || 0) * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Checkout Action */}
          {items.length > 0 && (
            <SheetFooter className="p-5 bg-white border-t border-[#E8E2D7] space-y-3.5 flex flex-col sm:flex-col items-stretch shadow-lg">
              {/* Trust Badge */}
              <div className="bg-[#FAF8F5] border border-[#E8E2D7] rounded-lg p-2.5 flex items-center gap-2 text-[11px] text-[#5C6270]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>Complimentary Luxury Velvet Box &amp; Hallmark Authenticity Card</span>
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#5C6270] font-medium">
                    Showcase Estimated Total:
                  </span>
                  <span className="font-serif text-xl font-bold text-[#0D1117]">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] text-[#8A90A0]">
                  *Final invoice &amp; bespoke customizations verified via WhatsApp Concierge
                </p>
              </div>

              {/* Inquiry Action Button */}
              <Button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full bg-[#0D1117] hover:bg-[#25D366] text-[#FAF8F5] py-6 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-md hover:shadow-lg group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059] group-hover:text-white mr-2 transition-colors" />
                <span>Inquire About All ({totalItems}) Pieces</span>
              </Button>

              <button
                onClick={clearCart}
                className="w-full text-center text-[11px] text-[#8A90A0] hover:text-[#0D1117] underline transition-colors cursor-pointer py-1"
              >
                Clear Entire Bag
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
