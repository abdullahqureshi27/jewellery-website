'use client';

/**
 * Client Component: Slide-over Inquiry Bag / Cart Drawer.
 * Built with shadcn Sheet & Button primitives.
 * Shows selected pieces, allows quantity updates/removal,
 * and launches the customer details inquiry modal.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
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
          <SheetHeader className="p-5 bg-[#0D1117] text-[#FAF8F5] flex flex-row items-center justify-between border-b border-[#C5A059]/30 space-y-0 pr-12">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <SheetTitle className="font-serif text-base font-bold uppercase tracking-wider text-[#FAF8F5]">
                Inquiry Bag ({totalItems})
              </SheetTitle>
            </div>
            <SheetDescription className="sr-only">
              Review your selected jewellery pieces before inquiring
            </SheetDescription>
          </SheetHeader>

          {/* Drawer Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E8E2D7] flex items-center justify-center mx-auto text-[#8A90A0]">
                  <ShoppingBag className="w-8 h-8 text-[#C5A059]" />
                </div>
                <h4 className="font-serif text-lg font-bold uppercase text-[#0D1117]">
                  Your Bag is Empty
                </h4>
                <p className="text-xs text-[#5C6270] max-w-xs mx-auto">
                  Browse our showcase and tap the 🛒 cart icon on any jewel to add items for a combined inquiry.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => setIsCartDrawerOpen(false)}
                    render={<Link href="/shop" />}
                    className="inline-flex items-center gap-2 bg-[#0D1117] text-[#FAF8F5] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0D1117] transition-colors"
                  >
                    <span>Explore Showcase</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl p-3.5 border border-[#E8E2D7] shadow-sm flex gap-3.5 items-center"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#F5F2EC] flex-shrink-0 border border-[#E8E2D7]">
                    <Image
                      src={product.images?.[0]?.url || ''}
                      alt={product.title || 'Jewellery piece'}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#C5A059] uppercase">
                        {product.itemCode}
                      </span>
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="text-[#8A90A0] hover:text-red-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-serif text-xs font-bold text-[#0D1117] truncate">
                      {product.title}
                    </h4>
                    <p className="text-[10px] text-[#5C6270] truncate">{product.metal}</p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8E2D7]/50">
                      <span className="font-serif text-xs font-bold text-[#0D1117]">
                        Rs. {((product.price || 0) * quantity).toLocaleString()}
                      </span>

                      {/* Quantity Toggles */}
                      <div className="flex items-center border border-[#E8E2D7] rounded-md bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(product._id, quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#5C6270] hover:text-[#0D1117]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#0D1117]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product._id, quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#5C6270] hover:text-[#0D1117]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Checkout Action */}
          {items.length > 0 && (
            <SheetFooter className="p-5 bg-white border-t border-[#E8E2D7] space-y-3 flex flex-col sm:flex-col items-stretch">
              <div className="flex items-baseline justify-between w-full">
                <span className="text-xs uppercase tracking-wider text-[#5C6270] font-semibold">
                  Estimated Showcase Total:
                </span>
                <span className="font-serif text-lg font-bold text-[#0D1117]">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>

              <Button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full bg-[#0D1117] hover:bg-[#25D366] text-[#FAF8F5] py-5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-md group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059] group-hover:text-white mr-2" />
                <span>Inquire About All ({totalItems}) Items</span>
              </Button>

              <Button
                variant="ghost"
                onClick={clearCart}
                className="w-full text-center text-[11px] text-[#8A90A0] hover:text-[#0D1117] h-auto p-0 hover:bg-transparent underline cursor-pointer"
              >
                Clear Entire Bag
              </Button>
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
