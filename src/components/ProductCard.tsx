import React from 'react';
import { Heart, Plus, Minus } from 'lucide-react';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const cartItem = cartItems.find(item => item.product.id === product.id);
  const inCart = Boolean(cartItem);
  const cartQty = cartItem ? cartItem.quantity : 0;
  const isWishlisted = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, cartQty + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, cartQty - 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => onQuickView && onQuickView(product)}
      className="bg-[#FFFDF8] rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-[#EBE3D3] hover:border-[#D8CEBD] hover:shadow-[0_12px_30px_rgba(18,55,42,0.08)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#F4EDE0] shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top-Left Discount/Type Badge */}
        {product.discountBadge && (
          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#12372A] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs border border-[#E8E1D3]/50">
            {product.discountBadge}
          </div>
        )}

        {/* Top-Right Wishlist Icon Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
            isWishlisted ? 'text-red-500 fill-red-500' : 'text-[#26352D]/70 hover:text-red-500'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isWishlisted ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>
      </div>

      {/* Product Details Middle */}
      <div className="pt-3 pb-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Quantity */}
          <p className="text-xs text-[#26352D]/60 font-medium tracking-wide">
            {product.brand} · {product.quantity}
          </p>

          {/* Product Name in Serif */}
          <h3 className="font-serif text-[#12372A] text-lg sm:text-xl font-medium tracking-tight mt-1 line-clamp-1 group-hover:text-[#1a4a39] transition-colors">
            {product.name}
          </h3>
        </div>
      </div>

      {/* Pricing & Add to Cart Bottom */}
      <div className="pt-2 border-t border-[#F0EAE0] flex items-center justify-between gap-2 mt-auto">
        {/* Price display */}
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-lg sm:text-xl font-bold text-[#12372A]">
            ₹{product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-[#26352D]/40 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Add Button or Quantity Stepper */}
        {!inCart ? (
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 bg-transparent hover:bg-[#12372A] text-[#12372A] hover:text-[#FAF5EC] border border-[#12372A]/30 hover:border-[#12372A] px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        ) : (
          <div
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 bg-[#12372A] text-[#FAF5EC] px-2 py-1 rounded-full text-xs font-medium shadow-xs"
          >
            <button
              type="button"
              onClick={handleDecrement}
              className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 transition cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 text-[#FAF5EC]" />
            </button>
            <span className="min-w-4 text-center font-bold text-xs">{cartQty}</span>
            <button
              type="button"
              onClick={handleIncrement}
              className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 transition cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 text-[#FAF5EC]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
