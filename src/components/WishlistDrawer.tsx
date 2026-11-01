import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistDrawer: React.FC = () => {
  const { wishlistProducts, isWishlistOpen, setIsWishlistOpen, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isWishlistOpen) return null;

  const handleMoveToBag = (product: any) => {
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-[#12372A]/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF5EC] shadow-2xl flex flex-col justify-between border-l border-[#E3D8C4] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-5 sm:px-6 py-5 border-b border-[#E8DEC9] bg-[#FAF5EC] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-red-600" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#12372A] leading-tight">
                  Your Saved Items
                </h3>
                <span className="text-xs text-[#26352D]/60 font-medium">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-[#26352D]/70 hover:text-[#12372A] hover:bg-[#EFE7D8] rounded-full transition cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE7D8] text-red-400 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-serif text-xl font-medium text-[#12372A] mb-2">
                  No saved items yet
                </h4>
                <p className="text-xs sm:text-sm text-[#26352D]/70 mb-6 max-w-xs mx-auto">
                  Click the heart icon on any pantry item to keep it in your personal favourites list.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-[#12372A] text-[#FAF5EC] px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#1a4a39] transition cursor-pointer"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              wishlistProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-[#FFFDF8] rounded-2xl p-3 sm:p-3.5 border border-[#E8E1D3] flex gap-3 shadow-2xs items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#F4EDE0]"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-semibold text-[#12372A] truncate">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-[#26352D]/60 block">
                      {product.brand} · {product.quantity}
                    </span>
                    <span className="font-serif font-bold text-sm text-[#12372A] block mt-1">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="bg-[#12372A] hover:bg-[#1a4a39] text-[#FAF5EC] p-2 rounded-xl text-xs font-medium flex items-center justify-center shadow-xs cursor-pointer"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="text-[#26352D]/40 hover:text-red-500 p-1 flex items-center justify-center transition cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Clear / Close */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 bg-[#FFFDF8] border-t border-[#E8DEC9] flex items-center justify-between">
              <button
                onClick={clearWishlist}
                className="text-xs text-[#26352D]/50 hover:text-red-500 underline transition cursor-pointer"
              >
                Clear all saved
              </button>
              <button
                onClick={() => {
                  wishlistProducts.forEach(p => addToCart(p, 1));
                  setIsWishlistOpen(false);
                  setIsCartOpen(true);
                }}
                className="bg-[#12372A] text-[#FAF5EC] px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#1a4a39] transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Add all to Bag</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

