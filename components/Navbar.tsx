'use client';

/**
 * Client Component: Header and navigation bar.
 * Features live cart / inquiry bag badge, mobile menu, search drawer, and direct concierge.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Sparkles, Menu, X, Search, PhoneCall, ShieldCheck, ChevronRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const { totalItems, setIsCartDrawerOpen } = useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Jewellery', href: '/shop' },
    { name: 'Rings', href: '/shop?category=rings' },
    { name: 'Earrings', href: '/shop?category=earrings' },
    { name: 'Pendants', href: '/shop?category=pendants' },
    { name: 'Bridal Sets', href: '/shop?category=bridal' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top Luxury Announcement Ribbon */}
      <div className="bg-[#0D1117] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#C5A059]/20 tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span>Handcrafted in 925 Sterling Silver &amp; Certified D VVS1 Moissanite</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-[#C5A059]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Lifetime Rhodium Replating
            </span>
            <a
              href="https://wa.me/923001234567?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1 text-[#FAF8F5]"
            >
              <PhoneCall className="w-3 h-3 text-[#C5A059]" /> VIP Concierge: +92 300 1234567
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D7] py-3'
            : 'bg-[#FAF8F5] border-b border-[#E8E2D7]/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#12141A] hover:text-[#C5A059] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex flex-col items-center group">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C5A059] group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#0D1117] uppercase">
                  Aurelia
                </span>
                <Sparkles className="w-5 h-5 text-[#C5A059] group-hover:-rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-[10px] tracking-[0.35em] text-[#C5A059] uppercase font-medium">
                Fine Atelier • Est. 1947
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                let isActive = false;
                if (link.href === '/') {
                  isActive = pathname === '/';
                } else if (link.href === '/shop') {
                  isActive = pathname === '/shop' && (!currentCategory || currentCategory === 'all');
                } else if (link.href.includes('category=')) {
                  const cat = link.href.split('category=')[1];
                  isActive = pathname === '/shop' && currentCategory === cat;
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm uppercase tracking-widest transition-colors py-1 relative ${
                      isActive
                        ? 'text-[#0D1117] font-semibold'
                        : 'text-[#5C6270] hover:text-[#C5A059]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C5A059]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Inquiry Bag Button, Admin Studio */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#12141A] hover:text-[#C5A059] transition-colors"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Inquiry Bag / Cart Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-2 text-[#0D1117] hover:text-[#C5A059] transition-colors flex items-center"
                aria-label={`Inquiry Bag with ${totalItems} items`}
                title="View Inquiry Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C5A059] text-[#0D1117] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link
                href="/studio"
                target="_blank"
                className="hidden md:inline-flex items-center text-xs font-medium uppercase tracking-wider text-[#5C6270] hover:text-[#0D1117] border border-[#E8E2D7] px-3 py-1.5 rounded-full hover:border-[#C5A059] transition-colors"
                title="Client Sanity Admin Dashboard"
              >
                Studio
              </Link>

              <a
                href="https://wa.me/923001234567?text=Hello,%20I%20am%20interested%20in%20custom%20jewellery%20showcase."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-[#0D1117] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#0D1117] px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 shadow-sm"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Expandable Search Drawer */}
          {searchOpen && (
            <div className="pt-4 pb-2 border-t border-[#E8E2D7] mt-3 animate-fadeIn">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-[#5C6270]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by gem, cut, or item (e.g. Solitaire, Emerald, 925 Silver)..."
                  className="w-full bg-white border border-[#E8E2D7] rounded-full py-2.5 pl-10 pr-24 text-sm text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059] shadow-inner"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-1.5 bg-[#C5A059] hover:bg-[#B08B3E] text-[#0D1117] font-semibold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider transition-colors"
                >
                  Find
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0D1117]/60 backdrop-blur-sm lg:hidden animate-fadeIn">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FAF8F5] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D7]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C5A059]" />
                  <span className="font-serif text-xl font-bold tracking-widest text-[#0D1117] uppercase">
                    Aurelia
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#5C6270] hover:text-[#0D1117]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Inquiry Bag Quick Row on Mobile */}
              <div className="py-4 border-b border-[#E8E2D7]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartDrawerOpen(true);
                  }}
                  className="w-full flex items-center justify-between bg-white border border-[#E8E2D7] p-3 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D1117]">
                      Inquiry Bag
                    </span>
                  </div>
                  <span className="bg-[#0D1117] text-[#FAF8F5] text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {totalItems} items
                  </span>
                </button>
              </div>

              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between py-3 text-base font-medium tracking-wider uppercase text-[#12141A] hover:text-[#C5A059] border-b border-[#E8E2D7]/50"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                  </Link>
                ))}
                <Link
                  href="/studio"
                  target="_blank"
                  className="flex items-center justify-between py-3 text-sm font-medium tracking-wider uppercase text-[#5C6270] hover:text-[#0D1117]"
                >
                  <span>Client Studio Dashboard</span>
                  <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E2D7] space-y-3">
              <a
                href="https://wa.me/923001234567?text=Hello,%20I%20am%20interested%20in%20custom%20jewellery%20showcase."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block bg-[#0D1117] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#0D1117] py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all"
              >
                Inquire on WhatsApp
              </a>
              <p className="text-center text-[11px] text-[#5C6270]">
                Karachi Atelier • Made-to-Order Worldwide
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
