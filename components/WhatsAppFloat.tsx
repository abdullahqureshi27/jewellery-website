'use client';

import { MessageCircle } from 'lucide-react';

/**
 * Client Component: Floating VIP WhatsApp concierge action button.
 */

export default function WhatsAppFloat() {
  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/923001234567?text=Hello,%20I%20am%20browsing%20your%20jewellery%20showcase%20and%20would%20like%20assistance."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        aria-label="Chat with Jewellery Concierge on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
          WhatsApp Concierge
        </span>
      </a>
    </aside>
  );
}
