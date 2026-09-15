'use client';

/**
 * Client Component: Header and navigation bar.
 * Features live cart / inquiry bag badge, mobile menu, search drawer, and direct concierge.
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Menu, X, Search, PhoneCall, ShieldCheck, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { JewelleryProduct, MOCK_JEWELLERY_PRODUCTS } from '@/sanity/mockData';
import { getWhatsAppLink, WHATSAPP_DISPLAY_NUMBER } from '@/lib/whatsapp';

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<JewelleryProduct[]>(MOCK_JEWELLERY_PRODUCTS);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const urlSearch = searchParams.get('search') || '';

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

  // Fetch all products on background so navbar search has full live inventory
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {});
  }, []);

  // Synchronize searchQuery with URL query parameter when on /shop
  useEffect(() => {
    if (pathname === '/shop') {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch, pathname]);

  // Close drawers on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All', href: '/shop' },
    { name: 'Locket Sets', href: '/shop?category=locket-sets' },
    { name: 'Pendants', href: '/shop?category=pendants' },
    { name: 'Ear rings', href: '/shop?category=earrings' },
    { name: 'Bracelets', href: '/shop?category=bracelets' },
    { name: 'Bridal', href: '/shop?category=bridal' },
  ];

  // Real-time matching logic across title and description
  const matchingProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter((item) => {
      if (!item) return false;
      const matchTitle = (item.title || '').toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      const matchCat = (item.category || '').toLowerCase().includes(q);
      return matchTitle || matchDesc || matchCat;
    });
  }, [products, searchQuery]);

  // Real-time search handler: updates local state and syncs with /shop live with zero page reload
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (pathname === '/shop') {
      const params = new URLSearchParams(searchParams.toString());
      if (val.trim()) {
        params.set('search', val.trim());
      } else {
        params.delete('search');
      }
      const qs = params.toString();
      router.replace(qs ? `/shop?${qs}` : '/shop', { scroll: false });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (pathname === '/shop') {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('search');
      const qs = params.toString();
      router.replace(qs ? `/shop?${qs}` : '/shop', { scroll: false });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/shop?search=${encodeURIComponent(trimmed)}`, { scroll: false });
    } else {
      router.push('/shop', { scroll: false });
    }
    setSearchOpen(false);
  };

  const handleProductSelect = (slug: string) => {
    setSearchOpen(false);
    router.push(`/product/${slug}`);
  };

  const handleViewAllResults = () => {
    setSearchOpen(false);
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/shop?search=${encodeURIComponent(trimmed)}`, { scroll: false });
    } else {
      router.push('/shop', { scroll: false });
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
              href={getWhatsAppLink('Hello, I would like to inquire about your jewellery collection.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1 text-[#FAF8F5]"
            >
              <PhoneCall className="w-3 h-3 text-[#C5A059]" /> VIP Concierge: {WHATSAPP_DISPLAY_NUMBER}
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
            <Link href="/" className="flex flex-col items-center group shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A059] group-hover:rotate-12 transition-transform duration-300 shrink-0" />
                <span className="font-serif text-xl sm:text-2xl xl:text-3xl font-bold tracking-[0.08em] sm:tracking-[0.1em] text-[#0D1117] uppercase whitespace-nowrap">
                  Faraz Faheem
                </span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A059] group-hover:-rotate-12 transition-transform duration-300 shrink-0" />
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#C5A059] uppercase font-medium">
                Fine Atelier • Est. 1947
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-5 shrink-0">
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
                    className={`text-xs xl:text-sm uppercase tracking-wider transition-colors py-1 relative whitespace-nowrap shrink-0 ${
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
                href={getWhatsAppLink('Hello, I am interested in custom jewellery showcase.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-[#0D1117] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#0D1117] px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 shadow-sm"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Expandable Search Drawer with Real-Time Live Results */}
          {searchOpen && (
            <div className="pt-4 pb-2 border-t border-[#E8E2D7] mt-3 animate-fadeIn relative">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-[#5C6270]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search pieces by name or collection in real-time..."
                  className="w-full bg-white border border-[#E8E2D7] rounded-full py-2.5 pl-10 pr-28 text-sm text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059] shadow-inner"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-20 text-[#8A90A0] hover:text-[#0D1117] p-1 transition-colors cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-1.5 bg-[#C5A059] hover:bg-[#B08B3E] text-[#0D1117] font-semibold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Find
                </button>
              </form>

              {/* Real-Time Live Matching Dropdown */}
              {searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#E8E2D7] shadow-2xl overflow-hidden z-50 animate-fadeIn">
                  <div className="p-3 bg-[#FAF8F5] border-b border-[#E8E2D7] flex items-center justify-between text-xs text-[#5C6270]">
                    <span>
                      Live Matching:{' '}
                      <strong className="text-[#0D1117] font-semibold">
                        {matchingProducts.length}
                      </strong>{' '}
                      piece{matchingProducts.length === 1 ? '' : 's'}
                    </span>
                    {pathname === '/shop' && (
                      <span className="text-[#C5A059] font-medium flex items-center gap-1 text-[11px]">
                        <Sparkles className="w-3 h-3" /> Catalog updating live
                      </span>
                    )}
                  </div>

                  {matchingProducts.length > 0 ? (
                    <div>
                      <div className="max-h-80 overflow-y-auto divide-y divide-[#E8E2D7]/50">
                        {matchingProducts.slice(0, 5).map((product) => (
                          <button
                            key={product._id}
                            type="button"
                            onClick={() => handleProductSelect(product.slug)}
                            className="w-full text-left p-3 hover:bg-[#FAF8F5] transition-colors flex items-center gap-3.5 group cursor-pointer"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#E8E2D7]/40 shrink-0 border border-[#E8E2D7]">
                              {product.images?.[0]?.url && (
                                <Image
                                  src={product.images[0].url}
                                  alt={product.title}
                                  fill
                                  sizes="48px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-serif text-sm font-semibold text-[#0D1117] truncate group-hover:text-[#C5A059] transition-colors">
                                {product.title}
                              </p>
                              <p className="text-xs text-[#5C6270] truncate mt-0.5">
                                {product.metal} • {product.gemstone}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-serif font-bold text-sm text-[#0D1117] lining-nums">
                                Rs. {product.price.toLocaleString()}
                              </p>
                              <span className="text-[10px] text-[#C5A059] font-medium tracking-wider uppercase">
                                {product.category}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="p-2.5 bg-[#FAF8F5] border-t border-[#E8E2D7]">
                        <button
                          type="button"
                          onClick={handleViewAllResults}
                          className="w-full py-2 px-4 rounded-xl bg-[#0D1117] hover:bg-[#C5A059] hover:text-[#0D1117] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>View All {matchingProducts.length} Results in Catalog</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-xs text-[#5C6270]">
                        No pieces found matching &ldquo;{searchQuery}&rdquo;
                      </p>
                      <p className="text-[11px] text-[#8A90A0] mt-1">
                        Try searching for &ldquo;Solitaire&rdquo;, &ldquo;Emerald&rdquo;, &ldquo;Moissanite&rdquo;, or &ldquo;925 Silver&rdquo;
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          router.push('/shop', { scroll: false });
                        }}
                        className="mt-3 inline-flex items-center gap-1 text-xs text-[#C5A059] hover:underline font-semibold cursor-pointer"
                      >
                        Browse All Jewellery &rarr;
                      </button>
                    </div>
                  )}
                </div>
              )}
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
                  <span className="font-serif text-xl font-bold tracking-[0.1em] text-[#0D1117] uppercase">
                    Faraz Faheem
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
                href={getWhatsAppLink('Hello, I am interested in custom jewellery showcase.')}
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
