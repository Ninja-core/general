import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Store, LayoutGrid, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistIds, setIsWishlistOpen } = useWishlist();

  const handleNav = (target: string) => {
    if (target === 'cart') {
      setIsCartOpen(true);
    } else if (target === 'categories') {
      if (location.pathname !== '/') {
        navigate('/#categories');
      } else {
        const el = document.getElementById('categories');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (target === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'shop') {
      navigate('/shop');
    }
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF5EC]/95 backdrop-blur-md border-t border-[#E3D8C4] px-4 py-2 shadow-[0_-4px_20px_rgba(18,55,42,0.06)]">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center gap-1 p-1 cursor-pointer transition-colors ${
            location.pathname === '/' ? 'text-[#12372A] font-bold' : 'text-[#26352D]/60'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => handleNav('shop')}
          className={`flex flex-col items-center gap-1 p-1 cursor-pointer transition-colors ${
            location.pathname === '/shop' ? 'text-[#12372A] font-bold' : 'text-[#26352D]/60'
          }`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Shop</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => handleNav('categories')}
          className="flex flex-col items-center gap-1 p-1 text-[#26352D]/60 hover:text-[#12372A] cursor-pointer transition-colors"
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Categories</span>
        </button>

        {/* Saved/Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center gap-1 p-1 text-[#26352D]/60 hover:text-[#12372A] cursor-pointer transition-colors"
        >
          <Heart className="w-5 h-5" />
          {wishlistIds.length > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-[#E8A044] text-[#12372A] font-bold text-[9px] rounded-full flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
          <span className="text-[10px] tracking-tight">Saved</span>
        </button>

        {/* Bag */}
        <button
          onClick={() => handleNav('cart')}
          className="relative flex flex-col items-center gap-1 p-1 text-[#12372A] cursor-pointer transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#E8A044] text-[#12372A] font-bold text-[9px] rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Bag</span>
        </button>

      </div>
    </div>
  );
};

