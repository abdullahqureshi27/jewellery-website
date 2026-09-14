'use client';

/**
 * Client Component: Interactive Jewellery Showcase and Catalog.
 * Inspired by FitFlair's filtering drawer and horizontal category ribbons,
 * tailored with luxury jewellery filters (Metal Purity, Gemstone, Carat, Price).
 */

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, X, SlidersHorizontal, RotateCcw, Search, Sparkles } from 'lucide-react';
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
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [selectedGemstone, setSelectedGemstone] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
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
    { label: 'Rings', value: 'rings' },
    { label: 'Earrings', value: 'earrings' },
    { label: 'Pendants', value: 'pendants' },
    { label: 'Bangles', value: 'bangles' },
    { label: 'Bridal Sets', value: 'bridal' },
  ];

  const metals = [
    { label: 'All Metals', value: 'all' },
    { label: '925 Sterling Silver', value: '925' },
    { label: '18K Yellow Gold Vermeil', value: '18k' },
    { label: 'Rose Gold Plated', value: 'rose' },
    { label: 'Platinum Plated', value: 'platinum' },
  ];

  const gemstones = [
    { label: 'All Gemstones', value: 'all' },
    { label: 'GRA Moissanite', value: 'moissanite' },
    { label: 'Emerald', value: 'emerald' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'Sapphire', value: 'sapphire' },
    { label: 'Freshwater Pearl', value: 'pearl' },
  ];

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedMetal('all');
    setSelectedGemstone('all');
    setInStockOnly(false);
    setSortBy('featured');
    router.push('/shop', { scroll: false });
  };

  // Active filters count
  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedMetal !== 'all' ? 1 : 0) +
    (selectedGemstone !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
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

        // Metal filter
        if (selectedMetal !== 'all') {
          const metalStr = (item.metal || '').toLowerCase();
          if (!metalStr.includes(selectedMetal.toLowerCase())) {
            return false;
          }
        }

        // Gemstone filter
        if (selectedGemstone !== 'all') {
          const gemStr = (item.gemstone || '').toLowerCase();
          if (!gemStr.includes(selectedGemstone.toLowerCase())) {
            return false;
          }
        }

        // In Stock filter
        if (inStockOnly && !item.inStock) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchTitle = (item.title || '').toLowerCase().includes(query);
          const matchCode = (item.itemCode || '').toLowerCase().includes(query);
          const matchGem = (item.gemstone || '').toLowerCase().includes(query);
          const matchMetal = (item.metal || '').toLowerCase().includes(query);
          if (!matchTitle && !matchCode && !matchGem && !matchMetal) {
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
  }, [initialProducts, selectedCategory, selectedMetal, selectedGemstone, inStockOnly, searchQuery, sortBy]);

  return (
    <div className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-2">
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
                    ? 'bg-[#0D1117] text-[#FAF8F5] shadow-md border border-[#0D1117]'
                    : 'bg-white text-[#5C6270] border border-[#E8E2D7] hover:border-[#C5A059] hover:text-[#0D1117]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FitFlair-Inspired Toolbar: [Filter Toggle] [Big Search Box (flex-1)] [Sort by Select] [Reset Button] */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E8E2D7] shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-4">
          {/* 1. Most Left: Filter Toggle Button (FitFlair style) */}
          <button
            onClick={handleFilterToggle}
            className={`inline-flex items-center justify-center gap-2 px-4 h-11 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 select-none ${
              isFilterOpen
                ? 'bg-[#0D1117] text-[#FAF8F5] shadow-sm ring-1 ring-[#C5A059]'
                : 'bg-[#FAF8F5] hover:bg-[#0D1117] hover:text-[#FAF8F5] text-[#0D1117] border border-[#E8E2D7] hover:border-[#0D1117]'
            }`}
            title={isFilterOpen ? 'Hide filter sidebar' : 'Show filter sidebar'}
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
            <span>{isFilterOpen ? 'Hide Filters' : 'Filter'}</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C5A059] text-[#0D1117]">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* 2. Middle: Big Search Input taking the whole remaining space */}
          <div className="relative flex-1 w-full min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A90A0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pieces by title, metal, gemstone, or SKU..."
              className="w-full h-11 bg-[#FAF8F5] border border-[#E8E2D7] rounded-xl pl-10 pr-9 text-xs sm:text-sm text-[#12141A] placeholder-[#8A90A0] focus:bg-white focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A90A0] hover:text-[#0D1117] p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 3. Right Group: Sort By Select + Reset Button */}
          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8A90A0] uppercase tracking-wider hidden xl:inline whitespace-nowrap">
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
                  className="w-[170px] sm:w-[190px] !h-11 px-4 bg-[#FAF8F5] border-[#E8E2D7] text-xs font-medium text-[#12141A] rounded-xl hover:border-[#C5A059] transition-colors cursor-pointer shadow-sm"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#E8E2D7] shadow-xl rounded-xl p-1 z-50">
                  <SelectItem value="featured" className="text-xs py-2 px-3 cursor-pointer hover:bg-[#FAF8F5] rounded-md">
                    Signature &amp; Featured
                  </SelectItem>
                  <SelectItem value="price-asc" className="text-xs py-2 px-3 cursor-pointer hover:bg-[#FAF8F5] rounded-md">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-desc" className="text-xs py-2 px-3 cursor-pointer hover:bg-[#FAF8F5] rounded-md">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="name-asc" className="text-xs py-2 px-3 cursor-pointer hover:bg-[#FAF8F5] rounded-md">
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
                  ? 'bg-[#FAF8F5] border-[#C5A059] text-[#0D1117] hover:bg-[#C5A059] hover:text-[#0D1117] shadow-sm'
                  : 'bg-[#FAF8F5] border-[#E8E2D7] text-[#8A90A0] hover:text-[#0D1117] hover:border-[#8A90A0]'
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
              <div className="bg-white p-6 rounded-2xl border border-[#E8E2D7] shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D7]">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
                    <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#0D1117]">
                      Filter Pieces
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={handleResetFilters}
                        className="text-[11px] text-[#C5A059] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="text-[#8A90A0] hover:text-[#0D1117] p-1 rounded-md hover:bg-[#FAF8F5] transition-colors cursor-pointer"
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
                    className="flex-1 bg-[#0D1117] hover:bg-[#1A202C] text-[#FAF8F5] py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    Apply
                  </button>
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 bg-[#FAF8F5] border border-[#E8E2D7] hover:bg-[#E8E2D7]/50 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#5C6270] transition-colors cursor-pointer text-center"
                  >
                    Reset
                  </button>
                </div>

                {/* Metal Filter */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#0D1117] mb-2.5">
                    Metal &amp; Purity
                  </label>
                  <div className="space-y-1.5">
                    {metals.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => setSelectedMetal(m.value)}
                        className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                          selectedMetal === m.value
                            ? 'bg-[#0D1117] text-[#FAF8F5] font-semibold'
                            : 'text-[#5C6270] hover:bg-[#FAF8F5] hover:text-[#0D1117]'
                        }`}
                      >
                        <span>{m.label}</span>
                        {selectedMetal === m.value && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gemstone Filter */}
                <div className="pt-4 border-t border-[#E8E2D7]">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#0D1117] mb-2.5">
                    Gemstone
                  </label>
                  <div className="space-y-1.5">
                    {gemstones.map((g) => (
                      <button
                        key={g.value}
                        onClick={() => setSelectedGemstone(g.value)}
                        className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                          selectedGemstone === g.value
                            ? 'bg-[#0D1117] text-[#FAF8F5] font-semibold'
                            : 'text-[#5C6270] hover:bg-[#FAF8F5] hover:text-[#0D1117]'
                        }`}
                      >
                        <span>{g.label}</span>
                        {selectedGemstone === g.value && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="pt-4 border-t border-[#E8E2D7]">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#12141A]">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded border-[#E8E2D7] text-[#C5A059] focus:ring-[#C5A059] w-4 h-4 cursor-pointer"
                    />
                    <span>Ready to Ship Only</span>
                  </label>
                </div>
              </div>

              {/* Custom Concierge Callout */}
              <div className="bg-[#0D1117] text-[#FAF8F5] p-6 rounded-2xl border border-[#C5A059]/30">
                <Sparkles className="w-5 h-5 text-[#C5A059] mb-2" />
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider mb-1">
                  Custom Sizing?
                </h4>
                <p className="text-xs text-[#8B949E] leading-relaxed mb-4">
                  Pieces can be handcrafted to custom measurements. Connect on WhatsApp for complimentary guidance.
                </p>
                <a
                  href={getWhatsAppLink('Hello Faraz Faheem Atelier, I need custom jewellery sizing help.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D1117] py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <main className={isFilterOpen ? "lg:col-span-3" : "w-full"}>
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E8E2D7] p-12 text-center">
                <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold uppercase text-[#0D1117] mb-2">
                  No Matching Jewels Found
                </h3>
                <p className="text-xs text-[#5C6270] max-w-sm mx-auto mb-6">
                  No pieces matched your selected filter combination. Try clearing some filters or searching for another gem.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 bg-[#0D1117] text-[#FAF8F5] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0D1117] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
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
          className="w-full max-w-sm sm:max-w-md bg-[#FAF8F5] border-l border-[#E8E2D7] p-0 flex flex-col justify-between"
        >
          <div className="p-6 border-b border-[#E8E2D7] bg-white">
            <SheetHeader className="p-0 space-y-1 text-left">
              <SheetTitle className="font-serif text-lg font-bold uppercase tracking-wider text-[#0D1117] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
                <span>Filter Pieces</span>
              </SheetTitle>
              <SheetDescription className="text-xs text-[#5C6270]">
                Refine by precious metal, gemstone &amp; availability
              </SheetDescription>
            </SheetHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#0D1117] mb-2.5">
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
                        ? 'bg-[#0D1117] text-[#FAF8F5] font-semibold border-[#0D1117]'
                        : 'bg-white text-[#5C6270] border-[#E8E2D7] hover:border-[#C5A059]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Metal Purity */}
            <div className="pt-4 border-t border-[#E8E2D7]">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#0D1117] mb-2.5">
                Metal Purity
              </label>
              <div className="space-y-1.5">
                {metals.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setSelectedMetal(m.value)}
                    className={`w-full text-left text-xs py-2.5 px-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedMetal === m.value
                        ? 'bg-[#0D1117] text-[#FAF8F5] font-semibold border-[#0D1117]'
                        : 'bg-white text-[#5C6270] border-[#E8E2D7] hover:border-[#C5A059]'
                    }`}
                  >
                    <span>{m.label}</span>
                    {selectedMetal === m.value && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Gemstone */}
            <div className="pt-4 border-t border-[#E8E2D7]">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#0D1117] mb-2.5">
                Gemstone
              </label>
              <div className="space-y-1.5">
                {gemstones.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setSelectedGemstone(g.value)}
                    className={`w-full text-left text-xs py-2.5 px-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedGemstone === g.value
                        ? 'bg-[#0D1117] text-[#FAF8F5] font-semibold border-[#0D1117]'
                        : 'bg-white text-[#5C6270] border-[#E8E2D7] hover:border-[#C5A059]'
                    }`}
                  >
                    <span>{g.label}</span>
                    {selectedGemstone === g.value && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock */}
            <div className="pt-4 border-t border-[#E8E2D7]">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#12141A] p-2.5 bg-white rounded-xl border border-[#E8E2D7]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#E8E2D7] text-[#C5A059] focus:ring-[#C5A059] w-4 h-4 cursor-pointer"
                />
                <span>Ready to Ship Only (In Stock)</span>
              </label>
            </div>
          </div>

          <SheetFooter className="p-4 bg-white border-t border-[#E8E2D7] flex-row gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex-1 border border-[#E8E2D7] hover:border-[#0D1117] py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#5C6270] hover:text-[#0D1117] transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 bg-[#0D1117] hover:bg-[#C5A059] hover:text-[#0D1117] text-[#FAF8F5] py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
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
