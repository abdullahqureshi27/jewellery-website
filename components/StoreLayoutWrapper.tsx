'use client';

/**
 * Client Component: Layout wrapper that conditionally renders Navbar, Footer,
 * Cart Drawer, and WhatsApp button only for the storefront, completely isolating
 * the embedded /studio route so Sanity Studio gets a clean full-screen canvas.
 */

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';

export default function StoreLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return <div className="min-h-screen w-full bg-white">{children}</div>;
  }

  return (
    <CartProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
    </CartProvider>
  );
}
