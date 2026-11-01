import React, { useState } from 'react';
import { X, Star, Heart, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SHOP_CONFIG } from '../config/shopConfig';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
    setIsCartOpen(true);
  };

  const whatsappProductUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello Joginder Karyana Shop! I would like to order: ${product.name} (${product.brand} · ${product.quantity}) x ${quantity} Qty. Price: ₹${product.price * quantity}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#12372A]/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-[#FFFDF8] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-[#E8DEC9] animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#12372A] flex items-center justify-center shadow-md transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image side */}
            <div className="relative bg-[#FAF5EC] aspect-square md:aspect-auto p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E8DEC9]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full max-h-80 object-cover rounded-2xl shadow-sm"
              />
              {product.discountBadge && (
                <span className="absolute top-8 left-8 bg-[#12372A] text-[#FAF5EC] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                  {product.discountBadge}
                </span>
              )}
            </div>

            {/* Info side */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#6F9277] uppercase tracking-wider">
                    {product.brand} · {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-[#26352D]/40 font-normal">({product.reviewsCount})</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#12372A] mb-2 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-serif text-2xl font-bold text-[#12372A]">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#26352D]/40 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-[#6F9277] font-semibold bg-[#6F9277]/10 px-2.5 py-0.5 rounded-full ml-1">
                    Pack of {product.quantity}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#26352D]/80 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF5EC] p-3 rounded-xl border border-[#E8DEC9] mb-5">
                  <div>
                    <span className="text-[#26352D]/60 block text-[10px] uppercase font-bold tracking-wider">
                      Origin
                    </span>
                    <span className="font-semibold text-[#12372A]">{product.origin || 'India'}</span>
                  </div>
                  <div>
                    <span className="text-[#26352D]/60 block text-[10px] uppercase font-bold tracking-wider">
                      Shelf Life
                    </span>
                    <span className="font-semibold text-[#12372A]">{product.shelfLife || '12 Months'}</span>
                  </div>
                </div>
              </div>

              {/* Quantity selector & Add button */}
              <div className="space-y-3 pt-2 border-t border-[#F0EAE0]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-[#FAF5EC] border border-[#E3D8C4] rounded-full px-3 py-1.5 text-sm font-semibold">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6 h-6 flex items-center justify-center hover:bg-black/5 rounded-full cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-black/5 rounded-full cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#12372A] hover:bg-[#1a4a39] text-[#FAF5EC] py-2.5 px-5 rounded-full font-medium text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag (₹{product.price * quantity})</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-2.5 rounded-full bg-[#FAF5EC] border border-[#E3D8C4] hover:bg-[#EFE7D8] transition text-[#12372A] cursor-pointer"
                    title={isWishlisted ? 'Saved' : 'Save to wishlist'}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </button>
                </div>

                <a
                  href={whatsappProductUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#12372A] border border-[#25D366]/30 py-2 rounded-full text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                  <span>Order Directly on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
