/**
 * Centralized WhatsApp & Concierge Configuration
 * Sourced directly from environment variables (NEXT_PUBLIC_WHATSAPP_NUMBER).
 * Updates automatically across the entire storefront when the environment variable changes.
 */

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, '') || '923001234567';

export const WHATSAPP_DISPLAY_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || '+92 300 1234567';

/**
 * Builds a direct wa.me link with encoded pre-filled inquiry text.
 */
export function getWhatsAppLink(message: string): string {
  const cleanNumber = WHATSAPP_NUMBER.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
