import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import type { Product } from '../types/product';
import { Search, Filter, ArrowUpDown, ChevronRight, X } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const search = searchParams.get('search');
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const newParams = new URLSearchParams(searchParams);
    if (categoryName === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryName);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val) {
      newParams.delete('search');
    } else {
      newParams.set('search', val);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(1000);
    setSortBy('featured');
    setOnlyInStock(false);
    setSearchParams({});
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter(prod => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Spices' && prod.category !== 'Spices & Masalas') return false;
        if (selectedCategory === 'Snacks' && prod.category !== 'Snacks & Biscuits') return false;
        if (selectedCategory === 'Household' && prod.category !== 'Household Essentials') return false;
        if (selectedCategory === 'Dairy' && prod.category !== 'Dairy Products') return false;
        if (
          !['Spices', 'Snacks', 'Household', 'Dairy'].includes(selectedCategory) &&
          prod.category !== selectedCategory
        ) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          prod.name.toLowerCase().includes(query) ||
          prod.brand.toLowerCase().includes(query) ||
          prod.category.toLowerCase().includes(query) ||
          prod.description.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Price filter
      if (prod.price > maxPrice) return false;

      // In stock
      if (onlyInStock && !prod.inStock) return false;

      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, maxPrice, onlyInStock, sortBy]);

  const allCategoryNames = ['All', ...CATEGORIES.map(c => c.name)];

  return (
    <div className="pt-6 sm:pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#26352D]/60 mb-6">
        <Link to="/" className="hover:text-[#12372A]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#12372A]">Shop Essentials</span>
        {selectedCategory !== 'All' && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#6F9277]">{selectedCategory}</span>
          </>
        )}
      </nav>

      {/* Header Banner */}
      <div className="mb-8 sm:mb-10">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#26352D]/70 uppercase block mb-1.5">
          FULL STORE CATALOGUE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#12372A] tracking-tight">
          All Pantry Essentials
        </h1>
        <p className="text-sm sm:text-base text-[#26352D]/80 mt-2 max-w-2xl">
          Browse our complete selection of fresh kitchen staples, wholesome pulses, premium spices, oils, and household goods.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-[#FFFDF8] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E8DEC9] mb-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#26352D]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search staples, brands, pulses..."
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              className="w-full bg-[#FAF5EC] border border-[#E3D8C4] rounded-full pl-10 pr-4 py-2.5 text-sm text-[#12372A] focus:border-[#12372A] focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#26352D]/40 hover:text-[#12372A]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-[#6F9277] shrink-0" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full bg-[#FAF5EC] border border-[#E3D8C4] rounded-full px-4 py-2.5 text-sm text-[#12372A] focus:border-[#12372A] focus:outline-hidden cursor-pointer"
            >
              <option value="featured">Sort by: Featured & Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div className="md:col-span-3">
            <div className="flex justify-between text-xs text-[#26352D]/70 mb-1">
              <span>Max Price:</span>
              <span className="font-bold text-[#12372A]">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="30"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#12372A] cursor-pointer"
            />
          </div>

        </div>

        {/* Category Pills inside Shop */}
        <div className="mt-4 pt-4 border-t border-[#F0EAE0] flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {allCategoryNames.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#12372A] text-[#FAF5EC] shadow-xs'
                    : 'bg-[#FAF5EC] text-[#26352D]/80 hover:bg-[#EFE7D8]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 text-sm text-[#26352D]/80">
        <div>
          Showing <span className="font-bold text-[#12372A]">{filteredAndSortedProducts.length}</span> essentials
          {selectedCategory !== 'All' && <span> in <strong className="text-[#12372A]">{selectedCategory}</strong></span>}
        </div>

        {(selectedCategory !== 'All' || searchQuery || maxPrice < 1000) && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-semibold text-[#12372A] hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredAndSortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={p => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#FFFDF8] rounded-3xl p-12 text-center border border-[#E8DEC9] max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-[#EFE7D8] text-[#12372A] flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="font-serif text-2xl text-[#12372A] font-medium mb-2">
            No products match your criteria
          </h3>
          <p className="text-sm text-[#26352D]/70 mb-6">
            Try adjusting your search query, increasing your price range, or clearing filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="bg-[#12372A] text-[#FAF5EC] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1a4a39] transition cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
};
