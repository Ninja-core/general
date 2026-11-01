import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { MobileNavigation } from './components/MobileNavigation';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';

// Helper component to scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EC] text-[#26352D] selection:bg-[#6F9277]/20 selection:text-[#12372A]">
      <ScrollToTop />
      
      {/* Floating Sticky Rounded Navbar */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={term => setSearchTerm(term)}
      />

      {/* Main Routes */}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchTerm={searchTerm}
                onClearSearch={() => setSearchTerm('')}
              />
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>

      {/* Global Interactive Drawers & Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      
      {/* Sticky Mobile Bottom Navigation */}
      <MobileNavigation />

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
