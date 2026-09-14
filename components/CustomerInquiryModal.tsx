'use client';

/**
 * Client Component: Customer Inquiry Modal.
 * Built with shadcn Dialog primitive and React Hook Form + Zod validation.
 * Captures customer details (Name, Phone, City, Address, Email, Ring Size/Notes)
 * with robust schema validation before compiling and dispatching WhatsApp inquiry.
 * Includes Lenis isolation, internal scrolling, and outside-click dismiss.
 */

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Sparkles, MapPin, User, Phone, Mail, FileText, AlertCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { JewelleryProduct } from '@/sanity/mockData';
import { CartItem } from '@/context/CartContext';
import { getWhatsAppLink } from '@/lib/whatsapp';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// Zod Validation Schema for Customer WhatsApp Inquiry
const customerInquirySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(80, { message: 'Name cannot exceed 80 characters.' }),
  phone: z
    .string()
    .min(7, { message: 'Please provide a valid phone or WhatsApp number.' })
    .regex(/^[\d\s+\-()]{7,25}$/, { message: 'Please enter a valid phone number (e.g. +92 300 1234567).' }),
  city: z
    .string()
    .min(2, { message: 'City is required for delivery and courier coordination.' }),
  address: z.string().optional(),
  email: z
    .string()
    .email({ message: 'Please provide a valid email address.' })
    .or(z.literal(''))
    .optional(),
  notes: z.string().optional(),
});

export type CustomerInquiryFormValues = z.infer<typeof customerInquirySchema>;

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerInquiryFormValues>({
    resolver: zodResolver(customerInquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      city: '',
      address: '',
      email: '',
      notes: '',
    },
    mode: 'onTouched',
  });

  // Reset form state when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Lock Lenis and window scroll when dialog is open
  useEffect(() => {
    const win = typeof window !== 'undefined' ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }) : null;
    if (isOpen) {
      win?.__lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      win?.__lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      win?.__lenis?.start();
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

  const onSubmit = (data: CustomerInquiryFormValues) => {
    // Format list of items
    const itemsFormatted = inquiryList
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.title}* (${item.itemCode})\n   • Metal: ${item.metal}\n   • Gem: ${item.gemstone}\n   • Qty: ${item.quantity}\n   • Est. Price: Rs. ${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n\n');

    const totalFormatted = `Rs. ${totalCalculated.toLocaleString()}`;

    // Structured message template without informal emojis
    const textMessage = `*FARAZ FAHEEM ATELIER (FF ZEVER) — SHOWCASE INQUIRY*
-----------------------------------------
*CUSTOMER DETAILS:*
• *Name:* ${data.name}
• *Phone/WhatsApp:* ${data.phone}
• *City:* ${data.city}
${data.address ? `• *Address:* ${data.address}\n` : ''}${data.email ? `• *Email:* ${data.email}\n` : ''}${data.notes ? `• *Ring Size / Notes:* ${data.notes}\n` : ''}
-----------------------------------------
*SELECTED JEWELLERY PIECES (${inquiryList.length} items):*

${itemsFormatted}

-----------------------------------------
*ESTIMATED TOTAL:* ${totalFormatted}
-----------------------------------------
_Please confirm piece availability, sizing schedule, and dispatch timeline._`;

    const whatsappUrl = getWhatsAppLink(textMessage);

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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 space-y-5 scrollbar-thin"
        >
          {/* Selected Items Summary Banner */}
          <div className="bg-white rounded-xl p-4 border border-[#E8E2D7] shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5C6270] mb-2 flex justify-between">
              <span>Items to Inquire:</span>
              <span className="font-serif font-bold text-[#0D1117] tabular-nums lining-nums">
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
                  <span className="font-serif font-bold text-[#0D1117] tabular-nums lining-nums">
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
              <label htmlFor="inquiry-name" className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8A90A0] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="inquiry-name"
                  type="text"
                  {...register('name')}
                  placeholder="e.g., Sarah Khan"
                  className={`w-full bg-white border rounded-lg py-2 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none shadow-sm transition-colors ${
                    errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#E8E2D7] focus:border-[#C5A059]'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.name.message}</span>
                </p>
              )}
            </div>

            {/* WhatsApp / Phone */}
            <div>
              <label htmlFor="inquiry-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
                WhatsApp / Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8A90A0] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="inquiry-phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="e.g., +92 300 1234567"
                  className={`w-full bg-white border rounded-lg py-2 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none shadow-sm transition-colors ${
                    errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#E8E2D7] focus:border-[#C5A059]'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.phone.message}</span>
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label htmlFor="inquiry-city" className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
                City / Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#8A90A0] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="inquiry-city"
                  type="text"
                  {...register('city')}
                  placeholder="e.g., Karachi / Lahore / Islamabad"
                  className={`w-full bg-white border rounded-lg py-2 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none shadow-sm transition-colors ${
                    errors.city ? 'border-red-400 focus:border-red-500' : 'border-[#E8E2D7] focus:border-[#C5A059]'
                  }`}
                />
              </div>
              {errors.city && (
                <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.city.message}</span>
                </p>
              )}
            </div>

            {/* Email (Optional) */}
            <div>
              <label htmlFor="inquiry-email" className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
                Email Address <span className="text-[10px] text-[#8A90A0] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8A90A0] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="inquiry-email"
                  type="email"
                  {...register('email')}
                  placeholder="e.g., sarah@example.com"
                  className={`w-full bg-white border rounded-lg py-2 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none shadow-sm transition-colors ${
                    errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#E8E2D7] focus:border-[#C5A059]'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label htmlFor="inquiry-address" className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
              Delivery / Postal Address <span className="text-[10px] text-[#8A90A0] font-normal">(Optional)</span>
            </label>
            <input
              id="inquiry-address"
              type="text"
              {...register('address')}
              placeholder="e.g., House #12, Street 4, Phase 6 DHA, Karachi"
              className="w-full bg-white border border-[#E8E2D7] rounded-lg py-2 px-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059] shadow-sm"
            />
          </div>

          {/* Ring Sizing / Custom Notes */}
          <div>
            <label htmlFor="inquiry-notes" className="block text-xs font-semibold uppercase tracking-wider text-[#0D1117] mb-1">
              Ring Size / Customization Notes <span className="text-[10px] text-[#8A90A0] font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-[#8A90A0] absolute left-3 top-3" />
              <textarea
                id="inquiry-notes"
                rows={2}
                {...register('notes')}
                placeholder="e.g., Ring Size 14 (PK) / US 7, custom inner laser engraving, or bridal gift packaging..."
                className="w-full bg-white border border-[#E8E2D7] rounded-lg py-2 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059] shadow-sm"
              />
            </div>
          </div>

          {/* Action Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D1117] py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-[#C5A059]/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] group cursor-pointer disabled:opacity-60"
            >
              <FaWhatsapp className="w-5 h-5 text-[#0D1117] transition-all duration-300 group-hover:scale-110" />
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
