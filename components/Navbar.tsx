'use client';

/**
 * Client Component: Header and navigation bar.
 * Redesigned into 2-tier NDURE layout:
 * - Tier 1: Brand logo on the left (FFZEVER / Faraz Faheem • Since 1982)
 *           Right side: Minimalist horizontal search line + Shopping Bag (Cart)
 *           (No WhatsApp button, No Studio button, No desktop hamburger)
 * - Tier 2: Category navigation links directly under the logo:
 *           ALL, LOCKET SETS, PENDANTS, EAR RINGS & TOPS
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Menu, X, Search, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { JewelleryProduct, MOCK_JEWELLERY_PRODUCTS } from '@/sanity/mockData';

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavLinks, setShowNavLinks] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<JewelleryProduct[]>(MOCK_JEWELLERY_PRODUCTS);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const urlSearch = searchParams.get('search') || '';

  const { totalItems } = useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollAccumulator = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      // Near top of page: always show the full nav links
      if (currentScrollY < 60) {
        setShowNavLinks(true);
        scrollAccumulator = 0;
      } else {
        if (delta > 0) {
          // Scrolling downwards: hide nav links row
          if (scrollAccumulator < 0) scrollAccumulator = 0;
          scrollAccumulator += delta;
          if (scrollAccumulator > 30) {
            setShowNavLinks(false);
          }
        } else if (delta < 0) {
          // Scrolling upwards (even slightly): instantly reveal nav links row
          if (scrollAccumulator > 0) scrollAccumulator = 0;
          scrollAccumulator += delta;
          if (scrollAccumulator < -20) {
            setShowNavLinks(true);
          }
        }
      }

      setIsScrolled(currentScrollY > 20);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    setMobileSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'All', href: '/shop' },
    { name: 'Locket Sets', href: '/shop?category=locket-sets' },
    { name: 'Pendants', href: '/shop?category=pendants' },
    { name: 'Ear rings & Tops', href: '/shop?category=earrings' },
    { name: 'Bracelets', href: '/shop?category=bracelets' },
    { name: 'Bridal Sets', href: '/shop?category=bridal' },
    { name: 'Rings', href: '/shop?category=rings' },
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
    setMobileSearchOpen(false);
  };

  const handleProductSelect = (slug: string) => {
    setMobileSearchOpen(false);
    setSearchQuery('');
    router.push(`/product/${slug}`);
  };

  const handleViewAllResults = () => {
    setMobileSearchOpen(false);
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
      <div className="bg-[#0A0D14] text-[#F8FAFC] text-xs py-2 px-4 border-b border-[#334155]/40 tracking-wider">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CBD5E1] animate-pulse" />
            <span>Handcrafted 925 Solid Sterling Silver • Nationwide Insured Delivery</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#CBD5E1] font-medium">
            <span>Since 1982 • Authentic Master Karigars</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Luxury Header (NDURE-Inspired 2-Tier Layout) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-[#E2E8F0] py-2.5'
            : 'bg-white border-b border-[#E2E8F0]/80 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TIER 1: Logo on Left | Search & Shopping Bag on Right */}
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Hamburger (Visible ONLY on small screens) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 -ml-1.5 text-[#0F172A] hover:text-[#64748B] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo on the Left */}
            <Link href="/" className="flex flex-col items-start group shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#64748B] group-hover:text-[#0F172A] group-hover:rotate-12 transition-all duration-300 shrink-0" />
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.08em] sm:tracking-[0.1em] text-[#0F172A] uppercase whitespace-nowrap">
                  FFZever
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#64748B] uppercase font-medium pl-0.5">
                Faraz Faheem • Since 1982
              </span>
            </Link>

            {/* Right Side: Minimalist Search Line & Shopping Bag */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Desktop Search Line (NDURE style) */}
              <div className="relative hidden sm:block w-44 md:w-60 lg:w-72">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="SEARCH"
                    className="w-full bg-transparent border-b border-[#0F172A]/30 hover:border-[#0F172A] focus:border-[#475569] py-1 pl-1 pr-7 text-xs uppercase tracking-widest text-[#0F172A] placeholder-[#94A3B8] focus:outline-none transition-colors"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-1 text-[#94A3B8] hover:text-[#0F172A] p-0.5 transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="absolute right-1 text-[#0F172A] hover:text-[#64748B] p-0.5 transition-colors cursor-pointer"
                      title="Search"
                    >
                      <Search className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>

                {/* Real-Time Live Matching Dropdown for Desktop Search */}
                {searchQuery.trim().length > 0 && (
                  <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl overflow-hidden z-50 animate-fadeIn">
                    <div className="p-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
                      <span>
                        Found:{' '}
                        <strong className="text-[#0F172A] font-semibold">
                          {matchingProducts.length}
                        </strong>{' '}
                        piece{matchingProducts.length === 1 ? '' : 's'}
                      </span>
                      {pathname === '/shop' && (
                        <span className="text-[#475569] font-medium flex items-center gap-1 text-[11px]">
                          <Sparkles className="w-3 h-3 text-[#94A3B8]" /> Catalog live
                        </span>
                      )}
                    </div>

                    {matchingProducts.length > 0 ? (
                      <div>
                        <div className="max-h-80 overflow-y-auto divide-y divide-[#E2E8F0]">
                          {matchingProducts.slice(0, 5).map((product) => (
                            <button
                              key={product._id}
                              type="button"
                              onClick={() => handleProductSelect(product.slug)}
                              className="w-full text-left p-3 hover:bg-[#F8FAFC] transition-colors flex items-center gap-3 group cursor-pointer"
                            >
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F1F5F9] shrink-0 border border-[#E2E8F0]">
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
                                <p className="font-serif text-sm font-semibold text-[#0F172A] truncate group-hover:text-[#475569] transition-colors">
                                  {product.title}
                                </p>
                                <p className="text-xs text-[#64748B] truncate mt-0.5">
                                  {product.category}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="font-serif font-bold text-xs text-[#0F172A] lining-nums">
                                  Rs. {product.price.toLocaleString()}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="p-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                          <button
                            type="button"
                            onClick={handleViewAllResults}
                            className="w-full py-2 px-4 rounded-xl bg-[#0F172A] hover:bg-[#334155] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>View All {matchingProducts.length} Results</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-xs text-[#64748B]">
                          No pieces found matching &ldquo;{searchQuery}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Search Icon Button */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="sm:hidden p-1.5 text-[#0F172A] hover:text-[#64748B] transition-colors"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopping Bag / Inquiry Cart */}
              <Link
                href="/cart"
                className="relative p-1.5 text-foreground hover:text-muted-foreground transition-colors flex items-center cursor-pointer"
                aria-label={`Inquiry Bag with ${totalItems} items`}
                title="View Inquiry Bag"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-foreground text-background font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-scaleIn border border-border">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* TIER 2: Category Navigation Links (Directly under the logo) */}
          <div
            className={`hidden lg:block overflow-hidden transition-all duration-300 ease-in-out ${
              showNavLinks
                ? 'max-h-16 opacity-100 mt-2.5 pt-2 border-t border-[#E2E8F0] translate-y-0 pointer-events-auto'
                : 'max-h-0 opacity-0 mt-0 pt-0 border-t-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <nav className="flex items-center space-x-5 xl:space-x-7 overflow-x-auto no-scrollbar py-0.5">
              {navLinks.map((link) => {
                let isActive = false;
                if (link.href === '/shop') {
                  isActive = pathname === '/shop' && (!currentCategory || currentCategory === 'all');
                } else if (link.href.includes('category=')) {
                  const cat = link.href.split('category=')[1];
                  isActive = pathname === '/shop' && currentCategory === cat;
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs uppercase tracking-[0.14em] font-semibold transition-colors py-1 relative whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-[#0F172A]'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F172A]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Search Expandable Line */}
          {mobileSearchOpen && (
            <div className="sm:hidden pt-3 pb-1 border-t border-[#E2E8F0] mt-3 animate-fadeIn relative">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="SEARCH PIECES..."
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-full py-2.5 pl-4 pr-10 text-xs uppercase tracking-wider text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#475569] shadow-inner"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 text-[#94A3B8] hover:text-[#0F172A] p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Real-Time Live Matching Cards for Mobile Search */}
              {searchQuery.trim().length > 0 && (
                <div className="mt-2 w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl overflow-hidden z-50 animate-fadeIn">
                  <div className="p-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
                    <span>
                      Found:{' '}
                      <strong className="text-[#0F172A] font-semibold">
                        {matchingProducts.length}
                      </strong>{' '}
                      piece{matchingProducts.length === 1 ? '' : 's'}
                    </span>
                    {pathname === '/shop' && (
                      <span className="text-[#475569] font-medium flex items-center gap-1 text-[11px]">
                        <Sparkles className="w-3 h-3 text-[#94A3B8]" /> Catalog live
                      </span>
                    )}
                  </div>

                  {matchingProducts.length > 0 ? (
                    <div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-[#E2E8F0]">
                        {matchingProducts.slice(0, 5).map((product) => (
                          <button
                            key={product._id}
                            type="button"
                            onClick={() => handleProductSelect(product.slug)}
                            className="w-full text-left p-3 hover:bg-[#F8FAFC] transition-colors flex items-center gap-3 group cursor-pointer"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F1F5F9] shrink-0 border border-[#E2E8F0]">
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
                              <p className="font-serif text-sm font-semibold text-[#0F172A] truncate group-hover:text-[#475569] transition-colors">
                                {product.title}
                              </p>
                              <p className="text-xs text-[#64748B] truncate mt-0.5">
                                {product.category}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-serif font-bold text-xs text-[#0F172A] lining-nums">
                                Rs. {product.price.toLocaleString()}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="p-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                        <button
                          type="button"
                          onClick={handleViewAllResults}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#0F172A] hover:bg-[#334155] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>View All {matchingProducts.length} Results</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 text-center">
                      <p className="text-xs text-[#64748B]">
                        No pieces found matching &ldquo;{searchQuery}&rdquo;
                      </p>
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
        <div className="fixed inset-0 z-50 bg-[#0A0D14]/70 backdrop-blur-sm lg:hidden animate-fadeIn">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#64748B]" />
                  <span className="font-serif text-xl font-bold tracking-[0.1em] text-[#0F172A] uppercase">
                    FFZever
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#64748B] hover:text-[#0F172A]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Inquiry Bag Quick Row on Mobile */}
              <div className="py-4 border-b border-border">
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between bg-muted border border-border p-3 rounded-xl shadow-sm hover:border-foreground transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-foreground" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Shopping Bag
                    </span>
                  </div>
                  <span className="bg-foreground text-background text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {totalItems} items
                  </span>
                </Link>
              </div>

              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between py-3 text-sm font-medium tracking-wider uppercase text-[#0F172A] hover:text-[#475569] border-b border-[#E2E8F0]/60"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E8F0] space-y-2">
              <p className="text-center text-xs font-medium text-[#475569] tracking-wider uppercase">
                Handcrafted 925 Solid Silver
              </p>
              <p className="text-center text-[11px] text-[#64748B]">
                FFZever • Since 1982
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

