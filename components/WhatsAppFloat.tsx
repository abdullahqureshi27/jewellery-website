'use client';

/**
 * Client Component: Floating VIP WhatsApp concierge action button.
 * Styled as a sleek circular floating action button featuring the official WhatsApp brand icon.
 */

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloat() {
  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/923001234567?text=Hello,%20I%20am%20browsing%20your%20jewellery%20showcase%20and%20would%20like%20assistance."
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Chat with Jewellery Concierge on WhatsApp"
        title="Chat with Jewellery Concierge on WhatsApp"
      >
        {/* Subtle Online Availability Pulse Indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-white"></span>
        </span>

        {/* FaWhatsapp Icon from react-icons/fa */}
        <FaWhatsapp className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-105" />
      </a>
    </aside>
  );
}
