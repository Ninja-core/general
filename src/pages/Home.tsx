import React, { useState, useMemo } from 'react';
import { Hero } from '../components/Hero';
import { CategorySection } from '../components/CategorySection';
import { ProductSection } from '../components/ProductSection';
import { PromotionalBanner } from '../components/PromotionalBanner';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { QuickViewModal } from '../components/QuickViewModal';
import { PRODUCTS } from '../data/products';
import type { Product, ProductCategory } from '../types/product';

interface HomeProps {
  searchTerm: string;
  onClearSearch: () => void;
}

export const Home: React.FC<HomeProps> = ({ searchTerm, onClearSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Category match
      let matchCat = true;
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Spices') {
          matchCat = prod.category === 'Spices & Masalas';
        } else if (selectedCategory === 'Snacks') {
          matchCat = prod.category === 'Snacks & Biscuits';
        } else if (selectedCategory === 'Household') {
          matchCat = prod.category === 'Household Essentials';
        } else if (selectedCategory === 'Dairy') {
          matchCat = prod.category === 'Dairy Products';
        } else {
          matchCat = prod.category === selectedCategory;
        }
      }

      // Search match
      let matchSearch = true;
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        matchSearch =
          prod.name.toLowerCase().includes(term) ||
          prod.brand.toLowerCase().includes(term) ||
          prod.category.toLowerCase().includes(term) ||
          prod.description.toLowerCase().includes(term);
      }

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    onClearSearch();
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('shop');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Categories / Shop by Aisle Section */}
      <CategorySection
        onSelectCategory={cat => handleSelectCategory(cat)}
        selectedCategory={selectedCategory as ProductCategory}
      />

      {/* Pantry Favourites / Product Section */}
      <ProductSection
        products={filteredProducts}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchTerm={searchTerm}
        onClearFilters={handleClearFilters}
        onQuickView={product => setQuickViewProduct(product)}
      />

      {/* Promotional Banner */}
      <PromotionalBanner
        onShopOffersClick={() => {
          setSelectedCategory('All');
          const el = document.getElementById('shop');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* About The Store Section */}
      <AboutSection />

      {/* Contact & Map Section */}
      <ContactSection />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  );
};
