import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Grid } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import type { ProductCategory } from '../types/product';

interface CategorySectionProps {
  onSelectCategory?: (category: ProductCategory | 'All') => void;
  selectedCategory?: ProductCategory | 'All';
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  selectedCategory = 'All'
}) => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Initial 4 primary categories as shown in the Emergent design screenshot
  const initialCategories = CATEGORIES.slice(0, 4);
  const remainingCategories = CATEGORIES.slice(4);

  const handleCategoryClick = (categoryName: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    const el = document.getElementById('shop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-12 sm:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#26352D]/70 uppercase block mb-1.5">
              SHOP BY AISLE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#12372A] tracking-tight">
              Good things live here.
            </h2>
          </div>

          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#12372A] hover:text-[#1a4a39] group self-start sm:self-auto cursor-pointer border-b border-[#E8A044] pb-0.5"
          >
            <span>{showAllCategories ? 'Show featured aisles' : 'Browse all'}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Primary Category Cards (Exact replica of screenshot #2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {initialCategories.map(cat => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 aspect-[4/3] sm:aspect-[3/4] border ${
                  isSelected ? 'border-[#12372A] ring-2 ring-[#12372A]' : 'border-[#E8E1D3]'
                }`}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Forest Green Gradient Overlay matching screenshot */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/90 via-[#12372A]/40 to-transparent group-hover:from-[#12372A]/95 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-white leading-tight">
                        {cat.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FAF5EC]/80 font-normal mt-1 leading-snug">
                        {cat.tagline}
                      </p>
                    </div>

                    {/* Arrow Button */}
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center shrink-0 group-hover:bg-[#FAF5EC] group-hover:text-[#12372A] transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extended Aisles (Expanded View) */}
        {showAllCategories && (
          <div className="mt-8 pt-6 border-t border-[#E8DEC9] animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Grid className="w-4 h-4 text-[#6F9277]" />
              <h3 className="font-serif text-xl text-[#12372A]">More Aisle Categories</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {remainingCategories.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 aspect-[16/10] border border-[#E8E1D3]"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/90 via-[#12372A]/40 to-transparent" />
                  <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end text-white">
                    <h4 className="font-serif text-base sm:text-lg font-medium leading-tight">
                      {cat.name}
                    </h4>
                    <span className="text-[11px] text-[#FAF5EC]/75 line-clamp-1">{cat.tagline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
