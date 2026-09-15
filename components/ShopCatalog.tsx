'use client';

/**
 * Client Component: Interactive Jewellery Showcase and Catalog.
 * Inspired by FitFlair's filtering drawer and horizontal category ribbons,
 * tailored with luxury jewellery filters (Metal Purity, Gemstone, Carat, Price).
 */

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, X, SlidersHorizontal, RotateCcw, Search, Sparkles, ShieldCheck } from 'lucide-react';
import { JewelleryProduct } from '@/sanity/mockData';
import { getWhatsAppLink } from '@/lib/whatsapp';
import ProductCard from './ProductCard';
import ProductQuickView from './ProductQuickView';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';

interface ShopCatalogProps {
  initialProducts: JewelleryProduct[];
}

export default function ShopCatalog({ initialProducts }: ShopCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [searchQuery, setSearchQuery] = useState<string>(urlSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [selectedQuickView, setSelectedQuickView] = useState<JewelleryProduct | null>(null);

  const handleFilterToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileFilterOpen(true);
    } else {
      setIsFilterOpen((prev) => !prev);
    }
  };

  // Freeze background page scrolling and pause Lenis while mobile filter drawer is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = 'hidden';
      (window as any).__lenis?.stop();
    } else {
      document.body.style.overflow = '';
      (window as any).__lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      (window as any).__lenis?.start();
    };
  }, [mobileFilterOpen]);

  // Sync state whenever URL query params change (e.g. from navbar clicks or back/forward)
  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  const handleCategoryChange = (catValue: string) => {
    setSelectedCategory(catValue);
    const params = new URLSearchParams(searchParams.toString());
    if (catValue === 'all') {
      params.delete('category');
    } else {
      params.set('category', catValue);
    }
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : '/shop', { scroll: false });
  };

  const categories = [
    { label: 'All Pieces', value: 'all' },
    { label: 'Locket Sets', value: 'locket-sets' },
    { label: 'Pendants', value: 'pendants' },
    { label: 'Ear rings & Tops', value: 'earrings' },
    { label: 'Bracelets', value: 'bracelets' },
    { label: 'Bridal Sets', value: 'bridal' },
    { label: 'Rings', value: 'rings' },
  ];

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    router.push('/shop', { scroll: false });
  };

  // Active filters count
  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((item) => {
        if (!item) return false;

        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchTitle = (item.title || '').toLowerCase().includes(query);
          const matchCode = (item.itemCode || '').toLowerCase().includes(query);
          const matchDesc = (item.description || '').toLowerCase().includes(query);
          if (!matchTitle && !matchCode && !matchDesc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'name-asc') return (a.title || '').localeCompare(b.title || '');
        // Default: featured first
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#64748B] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Showcase</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#0D1117]">
            Jewellery Atelier Catalog
          </h1>
          <p className="text-xs text-[#5C6270] mt-2">
            Explore {filteredProducts.length} handcrafted pieces ready for dispatch or made-to-order
          </p>
        </div>

        {/* Horizontal Quick Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start md:justify-center">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F172A] text-white shadow-md border border-[#0F172A]'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0F172A] hover:text-[#0F172A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FitFlair-Inspired Toolbar: [Filter Toggle] [Big Search Box (flex-1)] [Sort by Select] [Reset Button] */}
        <div className="bg-card p-3 sm:p-4 rounded-2xl border border-border shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-4">
          {/* 1. Most Left: Filter Toggle Button (FitFlair style) */}
          <button
            onClick={handleFilterToggle}
            className={`inline-flex items-center justify-center gap-2 px-4 h-11 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 select-none ${
              isFilterOpen
                ? 'bg-foreground text-background shadow-sm ring-1 ring-border'
                : 'bg-muted hover:bg-foreground hover:text-background text-foreground border border-border hover:border-foreground'
            }`}
            title={isFilterOpen ? 'Hide filter sidebar' : 'Show filter sidebar'}
          >
            <SlidersHorizontal className="w-4 h-4 text-silver" />
            <span>{isFilterOpen ? 'Hide Filters' : 'Filter'}</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-foreground text-background border border-border">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* 2. Middle: Big Search Input taking the whole remaining space */}
          <div className="relative flex-1 w-full min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-silver" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pieces by title or collection..."
              className="w-full h-11 bg-muted border border-border rounded-xl pl-10 pr-9 text-xs sm:text-sm text-foreground placeholder:text-silver focus:bg-background focus:outline-none focus:border-foreground focus:ring-1 focus:ring-border transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-silver hover:text-foreground p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 3. Right Group: Sort By Select + Reset Button */}
          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-silver uppercase tracking-wider hidden xl:inline whitespace-nowrap">
                Sort by:
              </span>
              <Select
                value={sortBy}
                onValueChange={(val) => {
                  if (val) setSortBy(val as string);
                }}
              >
                <SelectTrigger
                  size="default"
                  className="w-[170px] sm:w-[190px] !h-11 px-4 bg-muted border-border text-xs font-medium text-foreground rounded-xl hover:border-foreground transition-colors cursor-pointer shadow-sm"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border shadow-xl rounded-xl p-1 z-50">
                  <SelectItem value="featured" className="text-xs py-2 px-3 cursor-pointer hover:bg-muted rounded-md">
                    Signature &amp; Featured
                  </SelectItem>
                  <SelectItem value="price-asc" className="text-xs py-2 px-3 cursor-pointer hover:bg-muted rounded-md">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-desc" className="text-xs py-2 px-3 cursor-pointer hover:bg-muted rounded-md">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="name-asc" className="text-xs py-2 px-3 cursor-pointer hover:bg-muted rounded-md">
                    Alphabetical (A-Z)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 4. Reset button at the end after Sort by */}
            <button
              onClick={handleResetFilters}
              title="Reset all filters and search"
              className={`inline-flex items-center gap-1.5 h-11 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeFiltersCount > 0
                  ? 'bg-muted border-foreground text-foreground hover:bg-foreground hover:text-background shadow-sm'
                  : 'bg-muted border-border text-silver hover:text-foreground hover:border-silver'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Catalog Main Layout: Collapsible Sidebar Filters + Product Grid */}
        <div className={isFilterOpen ? "grid grid-cols-1 lg:grid-cols-4 gap-8 items-start transition-all duration-300" : "w-full"}>
          {/* Desktop Filter Sidebar (FitFlair-Inspired Drawer Sidebar) */}
          {isFilterOpen && (
            <aside className="hidden lg:block lg:col-span-1 space-y-6 animate-fadeIn transition-all duration-300">
              <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#94A3B8]" />
                    <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#0F172A]">
                      Filter Pieces
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={handleResetFilters}
                        className="text-[11px] text-[#64748B] hover:text-[#0F172A] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-md hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                      title="Close filter panel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quick Action Pills: Apply & Reset (FitFlair design!) */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] text-white py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    Apply
                  </button>
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#E2E8F0] py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#64748B] transition-colors cursor-pointer text-center"
                  >
                    Reset
                  </button>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#0F172A] mb-2.5">
                    Category
                  </label>
                  <div className="space-y-1.5">
                    {categories.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => handleCategoryChange(c.value)}
                        className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                          selectedCategory === c.value
                            ? 'bg-[#0F172A] text-white font-semibold'
                            : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                        }`}
                      >
                        <span>{c.label}</span>
                        {selectedCategory === c.value && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 100% Pure 925 Silver Guarantee */}
                <div className="pt-4 border-t border-[#E2E8F0]">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A] mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span>100% Pure 925 Silver</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      Every piece is handcrafted in pure solid 925 sterling silver with tarnish-resistant rhodium finish.
                    </p>
                  </div>
                </div>
              </div>

              {/* Custom Concierge Callout */}
              <div className="bg-[#0A0D14] text-[#F8FAFC] p-6 rounded-2xl border border-[#334155]/60">
                <Sparkles className="w-5 h-5 text-[#CBD5E1] mb-2" />
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider mb-1 text-white">
                  Custom Sizing?
                </h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                  Pieces can be handcrafted to custom measurements. Connect on WhatsApp for complimentary guidance.
                </p>
                <a
                  href={getWhatsAppLink('Hello Faraz Faheem Atelier, I need custom jewellery sizing help.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-white hover:bg-[#F1F5F9] text-[#0F172A] py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <main className={isFilterOpen ? "lg:col-span-3" : "w-full"}>
            {filteredProducts.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <Sparkles className="w-8 h-8 text-silver mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold uppercase text-foreground mb-2">
                  No Matching Jewels Found
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-6">
                  No pieces matched your selected filter combination. Try clearing some filters or searching for another gem.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center gap-2 bg-foreground !text-background px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-muted-foreground transition-colors cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5 !text-background" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div
                className={
                  isFilterOpen
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onQuickView={(p) => setSelectedQuickView(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer via shadcn Sheet */}
      <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <SheetContent
          side="right"
          showCloseButton={true}
          data-lenis-prevent="true"
          className="w-[80vw] max-w-[80vw] sm:w-full sm:max-w-md bg-background border-l border-border p-0 flex flex-col justify-between"
        >
          <div className="p-6 border-b border-border bg-background pr-12">
            <SheetHeader className="p-0 space-y-1 text-left">
              <SheetTitle className="font-serif text-lg font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-silver" />
                <span>Filter Pieces</span>
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                Filter pieces by collection &amp; category
              </SheetDescription>
            </SheetHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-foreground mb-2.5">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => handleCategoryChange(c.value)}
                    className={`text-left text-xs py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                      selectedCategory === c.value
                        ? 'bg-foreground text-background font-semibold border-foreground'
                        : 'bg-card text-muted-foreground border-border hover:border-foreground'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 100% Pure 925 Silver Guarantee */}
            <div className="pt-4 border-t border-border">
              <div className="bg-muted border border-border rounded-xl p-3.5 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-silver" />
                  <span>100% Pure 925 Sterling Silver</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Every creation is handcrafted in solid 925 sterling silver with protective rhodium finish.
                </p>
              </div>
            </div>
          </div>

          <SheetFooter className="p-4 bg-background border-t border-border flex-row gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex-1 border border-border hover:border-foreground py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 bg-foreground hover:bg-muted-foreground text-background py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              View {filteredProducts.length} Pieces
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Quick View Modal */}
      {selectedQuickView && (
        <ProductQuickView
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      )}
    </div>
  );
}
