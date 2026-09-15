'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function CartView() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const formatPKR = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateWhatsAppOrderText = () => {
    const lines = [
      `*New Order Inquiry - FFZever Atelier*`,
      `---------------------------------`,
      ...(customerName ? [`*Customer:* ${customerName}`] : []),
      ...(customerCity ? [`*City:* ${customerCity} (Pakistan)`] : []),
      ...(customerPhone ? [`*Phone:* ${customerPhone}`] : []),
      `---------------------------------`,
      `*Selected Pieces:*`,
      ...items.map(
        (item, index) =>
          `${index + 1}. *${item.product.title}*\n   • Qty: ${item.quantity}\n   • Price: ${formatPKR(
            (item.product.price || 0) * item.quantity
          )}\n   • Metal: 925 Solid Sterling Silver`
      ),
      `---------------------------------`,
      `*Total Items:* ${totalItems}`,
      `*Total Estimated:* ${formatPKR(totalPrice)}`,
      `*Shipping:* FREE Insured Delivery Across Pakistan`,
      `---------------------------------`,
      `Please confirm availability, payment details (COD / Bank Transfer), and delivery schedule.`,
    ];
    return lines.join('\n');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-background flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-muted border border-border flex items-center justify-center text-silver-dark shadow-sm">
            <ShoppingBag className="w-12 h-12 stroke-[1.25]" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider text-foreground">
              Your Shopping Bag is Empty
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Explore our master handcrafted 925 Solid Sterling Silver, Moissanite, and heirloom gemstone jewellery pieces.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full bg-foreground text-background hover:bg-muted-foreground text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md group cursor-pointer"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-border pb-6 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground tracking-[0.25em] uppercase mb-1">
                <Sparkles className="w-3 h-3 text-silver" />
                <span>Atelier Shopping Bag</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider text-foreground">
                Review Your Selection
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {totalItems} {totalItems === 1 ? 'Piece' : 'Pieces'} Selected
              </span>
              <button
                onClick={clearCart}
                className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-4 transition-colors cursor-pointer"
              >
                Clear Bag
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {items.map(({ product, quantity }) => {
              const imageSrc =
                product.images?.[0]?.url || '/products/ff-zircon-locket-set.jpeg';
              const itemTotal = (product.price || 0) * quantity;

              return (
                <div
                  key={product._id}
                  className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm hover:border-foreground/30 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${product.slug}`}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted border border-border shrink-0 cursor-pointer group"
                  >
                    <Image
                      src={imageSrc}
                      alt={product.title}
                      fill
                      sizes="112px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-muted-foreground block mb-0.5">
                          {product.category}
                        </span>
                        <Link
                          href={`/product/${product.slug}`}
                          className="font-serif text-base sm:text-lg font-bold text-foreground hover:text-muted-foreground transition-colors line-clamp-1"
                        >
                          {product.title}
                        </Link>
                      </div>

                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        title="Remove piece"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5 mb-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground bg-muted border border-border px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-silver" />
                        Solid 925 Sterling Silver
                      </span>
                    </div>

                    {/* Quantity and Price Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/60">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-border rounded-lg bg-muted overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product._id, quantity - 1)}
                          className="p-2 hover:bg-background text-foreground transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-9 text-center text-xs font-bold text-foreground">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product._id, quantity + 1)}
                          className="p-2 hover:bg-background text-foreground transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground block sm:hidden">Total:</span>
                        <span className="font-serif text-base sm:text-lg font-bold text-foreground">
                          {formatPKR(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Nationwide Shipping Ribbon Banner */}
            <div className="bg-muted border border-border rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-foreground shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Free Insured Delivery Across Pakistan
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Carefully packed in signature atelier presentation chests. Dispatched via TCS &amp; Leopard Express.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Concierge Order */}
          <div className="lg:col-span-4">
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-foreground border-b border-border pb-4">
                Summary
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-foreground">{formatPKR(totalPrice)}</span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Insured Delivery (Pakistan)</span>
                  <span className="font-semibold text-whatsapp uppercase tracking-wider text-xs">
                    Free
                  </span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <span>925 Hallmark Certificate</span>
                  <span className="font-semibold text-foreground">Included</span>
                </div>

                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-foreground uppercase tracking-wide">
                    Estimated Total
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                    {formatPKR(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Quick Customer Delivery Details (Optional) */}
              <div className="space-y-2 pt-2 border-t border-border">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  Delivery Details (Optional)
                </span>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                />
                <input
                  type="text"
                  placeholder="City (e.g., Karachi, Lahore, Islamabad)"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp / Contact Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                />
              </div>

              {/* WhatsApp Checkout CTA */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppLink(generateWhatsAppOrderText())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-whatsapp/25 cursor-pointer group"
                >
                  <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Order via WhatsApp Concierge</span>
                </a>

                <Link
                  href="/shop"
                  className="w-full flex items-center justify-center py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Guarantees */}
              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-silver shrink-0" />
                  <span>100% Solid 925 Sterling Silver Hallmarked</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <Award className="w-4 h-4 text-silver shrink-0" />
                  <span>Triple Rhodium Mirror Polish Anti-Tarnish</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <Truck className="w-4 h-4 text-silver shrink-0" />
                  <span>Safe Delivery Across All Cities in Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
