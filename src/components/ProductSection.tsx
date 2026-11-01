import React, { useRef } from 'react';
import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface ProductSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchTerm?: string;
  onClearFilters?: () => void;
  onQuickView?: (product: Product) => void;
}

const FILTER_PILLS = [
  { id: 'All', label: 'All' },
  { id: 'Rice & Grains', label: 'Rice & Grains' },
  { id: 'Pulses & Dals', label: 'Pulses & Dals' },
  { id: 'Atta & Flour', label: 'Atta & Flour' },
  { id: 'Spices & Masalas', label: 'Spices' },
  { id: 'Cooking Oils', label: 'Cooking Oils' },
  { id: 'Tea & Coffee', label: 'Tea & Coffee' },
  { id: 'Snacks & Biscuits', label: 'Snacks' },
  { id: 'Household Essentials', label: 'Household' },
  { id: 'Dairy Products', label: 'Dairy' },
];

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchTerm = '',
  onClearFilters,
  onQuickView
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollPills = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="shop" className="py-12 sm:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#26352D]/70 uppercase block mb-1.5">
              THE EVERYDAY EDIT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#12372A] tracking-tight">
              Pantry favourites
            </h2>
          </div>

          {/* Horizontally scrollable category pills with arrow buttons */}
          <div className="relative flex items-center max-w-full lg:max-w-2xl">
            <button
              onClick={() => scrollPills('left')}
              className="hidden sm:flex shrink-0 p-1.5 rounded-full hover:bg-[#EFE7D8] text-[#12372A] transition mr-1 cursor-pointer"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
            >
              {FILTER_PILLS.map(pill => {
                const isActive =
                  selectedCategory === pill.id ||
                  (pill.id === 'Spices & Masalas' && selectedCategory === 'Spices') ||
                  (pill.id === 'Snacks & Biscuits' && selectedCategory === 'Snacks') ||
                  (pill.id === 'Household Essentials' && selectedCategory === 'Household');

                return (
                  <button
                    key={pill.id}
                    onClick={() => onSelectCategory(pill.id)}
                    className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#12372A] text-[#FAF5EC] shadow-xs'
                        : 'text-[#26352D]/75 hover:text-[#12372A] hover:bg-[#EFE7D8]/80'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollPills('right')}
              className="hidden sm:flex shrink-0 p-1.5 rounded-full hover:bg-[#EFE7D8] text-[#12372A] transition ml-1 cursor-pointer"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search / Filter Active Notification */}
        {(searchTerm || selectedCategory !== 'All') && (
          <div className="mb-6 bg-[#EFE7D8]/70 border border-[#E3D8C4] rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-4 text-xs sm:text-sm text-[#12372A]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold">Showing items for:</span>
              {selectedCategory !== 'All' && (
                <span className="bg-[#12372A] text-[#FAF5EC] px-3 py-1 rounded-full text-xs font-medium">
                  {selectedCategory}
                </span>
              )}
              {searchTerm && (
                <span className="bg-[#6F9277] text-white px-3 py-1 rounded-full text-xs font-medium">
                  Search: "{searchTerm}"
                </span>
              )}
              <span className="text-[#26352D]/60">({products.length} items found)</span>
            </div>

            {onClearFilters && (
              <button
                onClick={onClearFilters}
                className="text-xs font-semibold text-[#12372A] underline hover:text-[#1a4a39] shrink-0 cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        )}

        {/* 3-Column Responsive Product Grid (Matches screenshot #3 & #4) */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#FFFDF8] rounded-3xl p-12 text-center border border-[#E8DEC9] max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#EFE7D8] text-[#12372A] flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8 opacity-70" />
            </div>
            <h3 className="font-serif text-2xl text-[#12372A] font-medium mb-2">
              No matching pantry items
            </h3>
            <p className="text-sm text-[#26352D]/70 mb-6">
              We couldn't find items matching your search. Try checking another category or explore all staples.
            </p>
            {onClearFilters && (
              <button
                onClick={onClearFilters}
                className="bg-[#12372A] text-[#FAF5EC] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1a4a39] transition cursor-pointer"
              >
                Show all products
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
