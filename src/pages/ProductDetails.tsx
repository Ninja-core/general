import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SHOP_CONFIG } from '../config/shopConfig';
import {
  ChevronRight,
  Star,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-[#12372A] mb-4">Product Not Found</h2>
        <p className="text-sm text-[#26352D]/70 mb-6">
          The staple you are looking for is not listed or has moved.
        </p>
        <Link
          to="/shop"
          className="bg-[#12372A] text-[#FAF5EC] px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shop</span>
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  // Related products from same category or random fallback
  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  const whatsappDirectUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello Joginder Karyana Shop! I want to order ${product.name} (${product.brand} · ${product.quantity}) x ${quantity} Qty. Please confirm delivery in Swankha.`
  )}`;

  return (
    <div className="pt-6 sm:pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#26352D]/60 mb-8">
        <Link to="/" className="hover:text-[#12372A]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-[#12372A]">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#12372A]">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#12372A] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-[#FFFDF8] rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] shadow-xs mb-16">
        
        {/* Left Image Area */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF5EC] border border-[#E8DEC9] shadow-inner">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.discountBadge && (
              <span className="absolute top-4 left-4 bg-[#12372A] text-[#FAF5EC] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                {product.discountBadge}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition cursor-pointer"
              aria-label="Save to wishlist"
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#26352D]/70'}`}
              />
            </button>
          </div>
        </div>

        {/* Right Details Area */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#6F9277] uppercase tracking-wider">
                {product.brand} · {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>{product.rating}</span>
                <span className="text-[#26352D]/40 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A] mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl font-bold text-[#12372A]">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-base text-[#26352D]/40 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-sm sm:text-base text-[#26352D]/80 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Specification Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#FAF5EC] p-4 rounded-2xl border border-[#E8DEC9] mb-8 text-xs">
              <div>
                <span className="text-[#26352D]/60 block text-[10px] font-bold uppercase tracking-wider">
                  Net Weight / Qty
                </span>
                <span className="font-bold text-[#12372A]">{product.quantity}</span>
              </div>
              <div>
                <span className="text-[#26352D]/60 block text-[10px] font-bold uppercase tracking-wider">
                  Origin Region
                </span>
                <span className="font-bold text-[#12372A]">{product.origin || 'India'}</span>
              </div>
              <div>
                <span className="text-[#26352D]/60 block text-[10px] font-bold uppercase tracking-wider">
                  Shelf Life
                </span>
                <span className="font-bold text-[#12372A]">{product.shelfLife || '12 Months'}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-4 pt-4 border-t border-[#F0EAE0]">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              
              {/* Stepper */}
              <div className="flex items-center gap-4 bg-[#FAF5EC] border border-[#E3D8C4] rounded-full px-4 py-2.5 text-base font-semibold w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center hover:bg-black/5 rounded-full transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 text-[#12372A]" />
                </button>
                <span className="w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center hover:bg-black/5 rounded-full transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 text-[#12372A]" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 bg-[#12372A] hover:bg-[#1a4a39] text-[#FAF5EC] py-3.5 px-6 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Bag · ₹{product.price * quantity}</span>
              </button>

            </div>

            {/* Direct WhatsApp Ordering */}
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-full text-sm font-semibold transition flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Instant Order on WhatsApp</span>
            </a>

            {/* Assurance notes */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-[#26352D]/75">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#6F9277]" />
                <span>Local Swankha Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#6F9277]" />
                <span>Cash on Delivery / UPI Available</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Related Pantry Staples */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#12372A] mb-6">
            More in {product.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={() => navigate(`/product/${p.id}`)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
