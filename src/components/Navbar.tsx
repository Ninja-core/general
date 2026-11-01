import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SHOP_CONFIG } from '../config/shopConfig';

interface NavbarProps {
  onSearchChange?: (term: string) => void;
  searchTerm?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchChange, searchTerm = '' }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistIds, setIsWishlistOpen } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(localSearch);
    }
    if (location.pathname !== '/shop') {
      navigate(`/shop?search=${encodeURIComponent(localSearch)}`);
    }
  };

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/#categories' },
    { name: 'About us', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      if (location.pathname !== '/') {
        navigate(`/${path}`);
      } else {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <header className="sticky top-3 sm:top-4 z-40 px-3 sm:px-6 max-w-7xl mx-auto transition-all duration-300">
        <nav
          className={`bg-[#FAF5EC]/95 backdrop-blur-md border border-[#E3D8C4] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-shadow duration-300 ${
            isScrolled
              ? 'shadow-[0_8px_30px_rgba(18,55,42,0.12)]'
              : 'shadow-[0_4px_20px_rgba(18,55,42,0.05)]'
          } flex items-center justify-between gap-2 sm:gap-4`}
        >
          {/* Brand Logo & Name */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#12372A] flex items-center justify-center text-[#FAF5EC] font-serif text-xl sm:text-2xl font-bold shadow-xs transition-transform group-hover:scale-105">
              J
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg text-[#12372A] tracking-tight leading-tight group-hover:text-[#1a4a39] transition">
                Joginder <span className="font-semibold text-[#12372A]">Karyana</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-[#26352D]/60 uppercase">
                {SHOP_CONFIG.locationTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#26352D]/80">
            {navLinks.map(link => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="hover:text-[#12372A] transition-colors relative py-1 hover:font-semibold cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-xs xl:max-w-sm">
            <span className="text-[#D3C7B0] font-light hidden lg:inline">|</span>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#26352D]/50" />
              <input
                type="text"
                placeholder="Search essentials..."
                value={localSearch}
                onChange={e => {
                  setLocalSearch(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                className="w-full bg-[#F4EDE0]/70 hover:bg-[#F4EDE0] focus:bg-white text-xs sm:text-sm text-[#12372A] placeholder-[#26352D]/50 pl-9 pr-4 py-2 rounded-full border border-transparent focus:border-[#6F9277] focus:outline-hidden transition-all duration-200"
              />
            </form>
          </div>

          {/* Right Actions: Greeting, Wishlist & Bag */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Friendly Greeting */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#26352D]/75 font-medium bg-[#EFE7D8]/60 px-3 py-1.5 rounded-full border border-[#E3D8C4]/50">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A044]" />
              <span>Hi, neighbour</span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#12372A] hover:bg-[#EFE7D8]/70 rounded-full transition cursor-pointer"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  wishlistIds.length > 0 ? 'fill-red-500 text-red-500' : 'text-[#26352D]/80'
                } transition-colors`}
              />
              {wishlistIds.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#E8A044] text-[#12372A] font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#12372A] hover:bg-[#1a4a39] text-[#FAF5EC] px-3.5 sm:px-4 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 shadow-xs cursor-pointer group"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#E8A044] text-[#12372A] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-medium hidden sm:inline">Bag</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#12372A] hover:bg-[#EFE7D8] rounded-full transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-[#FAF5EC] border border-[#E3D8C4] rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#26352D]/50" />
              <input
                type="text"
                placeholder="Search essentials..."
                value={localSearch}
                onChange={e => {
                  setLocalSearch(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                className="w-full bg-[#F4EDE0] text-sm text-[#12372A] placeholder-[#26352D]/50 pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-[#6F9277] focus:outline-hidden"
              />
            </form>

            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className="flex items-center justify-between text-left px-4 py-2.5 rounded-xl text-sm font-medium text-[#26352D] hover:bg-[#EFE7D8] transition"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#6F9277]" />
                </button>
              ))}
              <div className="border-t border-[#E3D8C4] my-2 pt-2 px-4 flex items-center justify-between text-xs text-[#26352D]/70">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E8A044]" />
                  Swankha, Near Kabir Mandir
                </span>
                <span className="text-[#12372A] font-semibold">Open Daily</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

