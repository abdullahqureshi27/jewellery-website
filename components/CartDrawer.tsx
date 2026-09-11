'use client';

/**
 * Client Component: Slide-over Inquiry Bag / Cart Drawer.
 * Shows selected pieces, allows quantity updates/removal,
 * and launches the customer details inquiry modal.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CustomerInquiryModal from './CustomerInquiryModal';

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

  if (!isCartDrawerOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-[#0D1117]/60 backdrop-blur-sm animate-fadeIn">
        <div
          className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between z-50 border-l border-[#E8E2D7] animate-slideLeft"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-5 bg-[#0D1117] text-[#FAF8F5] flex items-center justify-between border-b border-[#C5A059]/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-serif text-base font-bold uppercase tracking-wider">
                Inquiry Bag ({totalItems})
              </h3>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#FAF8F5] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

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
                <Link
                  href="/shop"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#0D1117] text-[#FAF8F5] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0D1117] transition-colors mt-2"
                >
                  <span>Explore Showcase</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
                      src={product.images[0]?.url || ''}
                      alt={product.title}
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
                        Rs. {(product.price * quantity).toLocaleString()}
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
            <div className="p-5 bg-white border-t border-[#E8E2D7] space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-[#5C6270] font-semibold">
                  Estimated Showcase Total:
                </span>
                <span className="font-serif text-lg font-bold text-[#0D1117]">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#0D1117] hover:bg-[#25D366] text-[#FAF8F5] py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-md group"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059] group-hover:text-white" />
                <span>Inquire About All ({totalItems}) Items</span>
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-[11px] text-[#8A90A0] hover:text-[#0D1117] underline transition-colors"
              >
                Clear Entire Bag
              </button>
            </div>
          )}
        </div>
      </div>

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
