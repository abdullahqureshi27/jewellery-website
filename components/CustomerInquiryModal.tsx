'use client';

/**
 * Client Component: Customer Inquiry Modal.
 * Built with shadcn Dialog primitive.
 * Captures customer details (Name, Phone, City, Address, Email, Ring Size/Notes)
 * and formats a complete WhatsApp inquiry for single or multi-item inquiries.
 * Includes Lenis isolation, internal scrolling, and outside-click dismiss.
 */

import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, MapPin, User, Phone, Mail, FileText } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { JewelleryProduct } from '@/sanity/mockData';
import { CartItem } from '@/context/CartContext';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface CustomerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Can accept either a single product or a list of cart items
  singleProduct?: JewelleryProduct | null;
  cartItems?: CartItem[];
  onInquirySent?: () => void;
}

export default function CustomerInquiryModal({
  isOpen,
  onClose,
  singleProduct,
  cartItems,
  onInquirySent,
}: CustomerInquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Lock Lenis and window scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  // Determine items list
  const inquiryList: { title: string; itemCode: string; price: number; metal: string; gemstone: string; quantity: number }[] =
    singleProduct
      ? [
          {
            title: singleProduct.title,
            itemCode: singleProduct.itemCode,
            price: singleProduct.price,
            metal: singleProduct.metal,
            gemstone: singleProduct.gemstone,
            quantity: 1,
          },
        ]
      : (cartItems || []).map((item) => ({
          title: item.product.title,
          itemCode: item.product.itemCode,
          price: item.product.price,
          metal: item.product.metal,
          gemstone: item.product.gemstone,
          quantity: item.quantity,
        }));

  const totalCalculated = inquiryList.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your full name for atelier booking.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide your WhatsApp or phone number for confirmation.');
      return;
    }
    if (!city.trim()) {
      setError('Please indicate your city/location for courier coordination.');
      return;
    }

    setError('');

    // Format list of items
    const itemsFormatted = inquiryList
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.title}* (${item.itemCode})\n   • Metal: ${item.metal}\n   • Gem: ${item.gemstone}\n   • Qty: ${item.quantity}\n   • Est. Price: Rs. ${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n\n');

    const totalFormatted = `Rs. ${totalCalculated.toLocaleString()}`;

    // Structured message template without emojis
    const textMessage = `*AURELIA FINE ATELIER — SHOWCASE INQUIRY*
-----------------------------------------
*CUSTOMER DETAILS:*
• *Name:* ${name.trim()}
• *Phone/WhatsApp:* ${phone.trim()}
• *City:* ${city.trim()}
${address.trim() ? `• *Address:* ${address.trim()}\n` : ''}${email.trim() ? `• *Email:* ${email.trim()}\n` : ''}${notes.trim() ? `• *Ring Size / Notes:* ${notes.trim()}\n` : ''}
-----------------------------------------
*SELECTED JEWELLERY PIECES (${inquiryList.length} items):*

${itemsFormatted}

-----------------------------------------
*ESTIMATED TOTAL:* ${totalFormatted}
-----------------------------------------
_Please confirm piece availability, sizing schedule, and dispatch timeline._`;

    const encoded = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/923001234567?text=${encoded}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    if (onInquirySent) {
      onInquirySent();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl bg-[#FAF8F5] p-0 border border-[#E8E2D7] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0D1117] text-[#FAF8F5] flex items-center justify-between border-b border-[#C5A059]/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <DialogTitle className="font-serif text-base sm:text-lg font-bold tracking-wider uppercase text-[#FAF8F5]">
                Atelier Concierge Inquiry
              </DialogTitle>
              <DialogDescription className="text-[11px] text-[#8B949E] tracking-widest uppercase">
                {inquiryList.length} Selected Piece{inquiryList.length > 1 ? 's' : ''}
              </DialogDescription>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#FAF8F5] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 space-y-5 scrollbar-thin"
        >
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Selected Items Summary Banner */}
          <div className="bg-white rounded-xl p-4 border border-[#E8E2D7] shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5C6270] mb-2 flex justify-between">
              <span>Items to Inquire:</span>
              <span className="font-sans font-bold text-[#0D1117] tabular-nums lining-nums">
                Total: Rs. {totalCalculated.toLocaleString()}
              </span>
            </div>
            <div className="max-h-28 overflow-y-auto space-y-2 pr-1 divide-y divide-[#E8E2D7]/60">
              {inquiryList.map((item, i) => (
                <div key={i} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#12141A] block">{item.title}</span>
                    <span className="text-[10px] font-mono text-[#8A90A0]">
                      {item.itemCode} • {item.metal}
                    </span>
                  </div>
                  <span className="font-sans font-bold text-[#0D1117] tabular-nums lining-nums">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Input Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8A90A0] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Sarah Khan"
                  className="w-full bg-white border border-[#E8E2D7] rounded-lg py-2 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059] shadow-sm"
                />
              </div>
            </div>

            {/* WhatsApp / Phone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
                WhatsApp / Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8A90A0] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., +92 321 1234567"
                  className="w-full bg-white border border-[#E8E2D7] rounded-lg py-2 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059] shadow-sm"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
                City / Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#8A90A0] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Karachi / Lahore / Islamabad"
                  className="w-full bg-white border border-[#E8E2D7] rounded-lg py-2 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059] shadow-sm"
                />
              </div>
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
                Email Address <span className="text-[10px] text-[#8A90A0] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8A90A0] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., sarah@example.com"
                  className="w-full bg-white border border-[#E8E2D7] rounded-lg py-2 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059] shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
              Delivery / Postal Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., House #12, Street 4, Phase 6 DHA, Karachi"
              className="w-full bg-white border border-[#E8E2D7] rounded-lg py-2 px-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059] shadow-sm"
            />
          </div>

          {/* Ring Sizing / Custom Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
              Ring Size / Customization Notes
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-[#8A90A0] absolute left-3 top-3" />
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Ring Size 7 (US), custom inner engraving, or gift packaging requested..."
                className="w-full bg-white border border-[#E8E2D7] rounded-lg py-2 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059] shadow-sm"
              />
            </div>
          </div>

          {/* Action Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-[#0D1117] hover:bg-[#25D366] text-[#FAF8F5] py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-md group cursor-pointer"
            >
              <FaWhatsapp className="w-5 h-5 text-[#25D366] group-hover:text-white transition-all duration-300 group-hover:scale-110" />
              <span>Send Complete Inquiry to WhatsApp</span>
            </button>
            <p className="text-center text-[10px] text-[#8A90A0] mt-2">
              Your details will be formatted directly into the WhatsApp message for immediate concierge processing.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
