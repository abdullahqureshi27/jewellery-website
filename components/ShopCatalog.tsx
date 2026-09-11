'use client';

/**
 * Client Component: Interactive Jewellery Showcase and Catalog.
 * Inspired by FitFlair's filtering drawer and horizontal category ribbons,
 * tailored with luxury jewellery filters (Metal Purity, Gemstone, Carat, Price).
 */

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, X, SlidersHorizontal, RotateCcw, Search, Sparkles } from 'lucide-react';
import { JewelleryProduct } from '@/sanity/mockData';
import ProductCard from './ProductCard';
import ProductQuickView from './ProductQuickView';

interface ShopCatalogProps {
  initialProducts: JewelleryProduct[];
}

export default function ShopCatalog({ initialProducts }: ShopCatalogProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [selectedGemstone, setSelectedGemstone] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [selectedQuickView, setSelectedQuickView] = useState<JewelleryProduct | null>(null);

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
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Metal filter
        if (selectedMetal !== 'all') {
          if (!item.metal.toLowerCase().includes(selectedMetal.toLowerCase())) {
            return false;
          }
        }

        // Gemstone filter
        if (selectedGemstone !== 'all') {
          if (!item.gemstone.toLowerCase().includes(selectedGemstone.toLowerCase())) {
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
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchCode = item.itemCode.toLowerCase().includes(query);
          const matchGem = item.gemstone.toLowerCase().includes(query);
          const matchMetal = item.metal.toLowerCase().includes(query);
          if (!matchTitle && !matchCode && !matchGem && !matchMetal) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
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

        {/* FitFlair-Inspired Horizontal Quick Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start md:justify-center">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex-shrink-0 ${
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

        {/* Filter Bar & Sorting Row */}
        <div className="bg-white p-4 rounded-xl border border-[#E8E2D7] shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#E8E2D7] px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#0D1117]"
            >
              <Filter className="w-4 h-4 text-[#C5A059]" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            {/* In-Catalog Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8A90A0]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title, metal, or SKU..."
                className="w-full bg-[#FAF8F5] border border-[#E8E2D7] rounded-lg py-1.5 pl-9 pr-3 text-xs text-[#12141A] placeholder-[#8A90A0] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-[#C5A059] hover:underline uppercase tracking-wider font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-[#8A90A0] uppercase tracking-wider hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF8F5] border border-[#E8E2D7] rounded-lg px-3 py-1.5 text-xs text-[#12141A] font-medium focus:outline-none focus:border-[#C5A059]"
            >
              <option value="featured">Signature &amp; Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Catalog Main Layout: Desktop Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar (FitFlair-Inspired Drawer Sidebar) */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#E8E2D7] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D7]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#0D1117]">
                    Filter Pieces
                  </h3>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-[#C5A059] hover:underline uppercase tracking-wider font-semibold"
                  >
                    Clear All
                  </button>
                )}
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
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-md transition-colors flex items-center justify-between ${
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
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-md transition-colors flex items-center justify-between ${
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
            <div className="bg-[#0D1117] text-[#FAF8F5] p-6 rounded-xl border border-[#C5A059]/30">
              <Sparkles className="w-5 h-5 text-[#C5A059] mb-2" />
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider mb-1">
                Custom Ring Sizing?
              </h4>
              <p className="text-xs text-[#8B949E] leading-relaxed mb-4">
                All rings can be custom made in sizes 4 through 12. Connect on WhatsApp for complimentary sizing guidance.
              </p>
              <a
                href="https://wa.me/923001234567?text=Hello%20Aurelia%20Atelier,%20I%20need%20custom%20ring%20sizing%20help."
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D1117] py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E8E2D7] p-12 text-center">
                <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold uppercase text-[#0D1117] mb-2">
                  No Matching Jewels Found
                </h3>
                <p className="text-xs text-[#5C6270] max-w-sm mx-auto mb-6">
                  No pieces matched your selected filter combination. Try clearing some filters or searching for another gem.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 bg-[#0D1117] text-[#FAF8F5] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0D1117] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-[#0D1117]/60 backdrop-blur-sm lg:hidden animate-fadeIn">
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D7]">
                <h3 className="font-serif text-base font-bold uppercase tracking-wider text-[#0D1117]">
                  Filter Pieces
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#5C6270] hover:text-[#0D1117]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Metal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#0D1117] mb-2">
                  Metal Purity
                </label>
                <div className="space-y-1">
                  {metals.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setSelectedMetal(m.value)}
                      className={`w-full text-left text-xs py-2 px-3 rounded-lg ${
                        selectedMetal === m.value
                          ? 'bg-[#0D1117] text-[#FAF8F5] font-semibold'
                          : 'text-[#5C6270] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gemstone */}
              <div className="pt-4 border-t border-[#E8E2D7]">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#0D1117] mb-2">
                  Gemstone
                </label>
                <div className="space-y-1">
                  {gemstones.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setSelectedGemstone(g.value)}
                      className={`w-full text-left text-xs py-2 px-3 rounded-lg ${
                        selectedGemstone === g.value
                          ? 'bg-[#0D1117] text-[#FAF8F5] font-semibold'
                          : 'text-[#5C6270] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div className="pt-4 border-t border-[#E8E2D7]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#12141A]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-[#E8E2D7] text-[#C5A059] focus:ring-[#C5A059] w-4 h-4"
                  />
                  <span>Ready to Ship Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E2D7] flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 border border-[#E8E2D7] py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#5C6270]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 bg-[#0D1117] text-[#FAF8F5] py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                View {filteredProducts.length}
              </button>
            </div>
          </div>
        </div>
      )}

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
