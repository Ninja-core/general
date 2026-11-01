import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SHOP_CONFIG } from '../config/shopConfig';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    cartSavings,
    deliveryFee,
    orderTotal,
    generateWhatsAppOrderUrl,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeThreshold = SHOP_CONFIG.delivery.freeThreshold;
  const amountNeededForFree = Math.max(0, freeThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeThreshold) * 100);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleQuickWhatsAppOrder = () => {
    // Quick order without entering details yet
    const url = generateWhatsAppOrderUrl({
      fullName: 'Neighbour (Quick Order)',
      phone: 'Via WhatsApp',
      address: 'Swankha (Address to be confirmed in chat)',
      paymentMethod: 'cod'
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#12372A]/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF5EC] shadow-2xl flex flex-col justify-between border-l border-[#E3D8C4] animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="px-5 sm:px-6 py-5 border-b border-[#E8DEC9] bg-[#FAF5EC] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#12372A] text-[#FAF5EC] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#12372A] leading-tight">
                  Your Grocery Bag
                </h3>
                <span className="text-xs text-[#26352D]/60 font-medium">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#26352D]/70 hover:text-[#12372A] hover:bg-[#EFE7D8] rounded-full transition cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          {cartItems.length > 0 && (
            <div className="px-5 sm:px-6 py-3 bg-[#FFFDF8] border-b border-[#E8DEC9]">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-[#12372A]">
                  <Truck className="w-3.5 h-3.5 text-[#6F9277]" />
                  {amountNeededForFree > 0
                    ? `Add ₹${amountNeededForFree} more for FREE delivery in Swankha`
                    : '🎉 FREE Swankha delivery unlocked!'}
                </span>
                <span className="text-[#6F9277] font-semibold">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E8DEC9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6F9277] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE7D8] text-[#12372A] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-serif text-xl font-medium text-[#12372A] mb-2">
                  Your bag is empty
                </h4>
                <p className="text-xs sm:text-sm text-[#26352D]/70 mb-6 max-w-xs mx-auto">
                  Explore fresh kitchen staples, wholesome pulses, and authentic spices from Swankha.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-[#12372A] text-[#FAF5EC] px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#1a4a39] transition cursor-pointer"
                >
                  Explore Essentials
                </button>
              </div>
            ) : (
              cartItems.map(item => (
                <div
                  key={item.product.id}
                  className="bg-[#FFFDF8] rounded-2xl p-3 sm:p-3.5 border border-[#E8E1D3] flex gap-3 shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0 bg-[#F4EDE0]"
                  />

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm sm:text-base font-semibold text-[#12372A] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#26352D]/40 hover:text-red-500 p-1 transition cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#26352D]/60 block">
                        {item.product.brand} · {item.product.quantity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif font-bold text-sm text-[#12372A]">
                          ₹{item.product.price * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-[#26352D]/50">
                            (₹{item.product.price}/ea)
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-[#FAF5EC] border border-[#E8DEC9] px-2 py-0.5 rounded-full text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-4 h-4 flex items-center justify-center text-[#12372A] hover:bg-black/5 rounded cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs min-w-3 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-4 h-4 flex items-center justify-center text-[#12372A] hover:bg-black/5 rounded cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout summary */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#FFFDF8] border-t border-[#E8DEC9] space-y-3 shadow-lg">
              <div className="space-y-1.5 text-xs sm:text-sm text-[#26352D]">
                <div className="flex justify-between">
                  <span className="text-[#26352D]/70">Subtotal</span>
                  <span className="font-medium text-[#12372A]">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#26352D]/70">Delivery (Swankha)</span>
                  <span className="font-medium text-[#12372A]">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                {cartSavings > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>You Save</span>
                    <span>-₹{cartSavings}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#E8DEC9] flex justify-between font-serif text-base sm:text-lg font-bold text-[#12372A]">
                  <span>Total Amount</span>
                  <span>₹{orderTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#12372A] hover:bg-[#1a4a39] text-[#FAF5EC] py-3 rounded-full font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={handleQuickWhatsAppOrder}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Instant WhatsApp Order</span>
                </button>
              </div>

              <div className="flex justify-center pt-1">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-[#26352D]/50 hover:text-red-500 underline transition cursor-pointer"
                >
                  Empty Bag
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
