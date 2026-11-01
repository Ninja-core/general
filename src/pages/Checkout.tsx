import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SHOP_CONFIG } from '../config/shopConfig';
import type { CheckoutCustomerInfo } from '../types/cart';
import {
  ShoppingBag,
  ArrowLeft,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  QrCode
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cartItems, cartCount, cartSubtotal, cartSavings, deliveryFee, orderTotal, generateWhatsAppOrderUrl, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CheckoutCustomerInfo>({
    fullName: '',
    phone: '',
    address: '',
    landmark: '',
    notes: '',
    paymentMethod: 'cod'
  });

  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const refNumber = `JK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderReference(refNumber);

    const whatsappUrl = generateWhatsAppOrderUrl(formData);
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Mark as submitted
    setOrderSubmitted(true);
  };

  if (cartItems.length === 0 && !orderSubmitted) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-[#EFE7D8] text-[#12372A] flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 opacity-60" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#12372A] mb-2">
          Your Bag is Empty
        </h2>
        <p className="text-sm text-[#26352D]/70 mb-6">
          Add fresh everyday staples, pulses, or spices before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="bg-[#12372A] text-[#FAF5EC] px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Groceries</span>
        </Link>
      </div>
    );
  }

  // Order Confirmed State
  if (orderSubmitted) {
    return (
      <div className="py-16 sm:py-24 max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FFFDF8] rounded-3xl p-8 sm:p-10 border border-[#E8DEC9] text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold tracking-widest text-[#6F9277] uppercase block mb-1">
            ORDER INITIATED VIA WHATSAPP
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A] mb-3">
            Thank You, Neighbour!
          </h1>
          <p className="text-sm sm:text-base text-[#26352D]/80 mb-6 max-w-md mx-auto leading-relaxed">
            Your order details have been forwarded to <strong className="text-[#12372A]">{SHOP_CONFIG.name}</strong> on WhatsApp. Our store will confirm your item availability and dispatch time shortly.
          </p>

          {/* Order Details Receipt Box */}
          <div className="bg-[#FAF5EC] rounded-2xl p-5 border border-[#E3D8C4] text-left text-xs sm:text-sm space-y-2 mb-8 max-w-md mx-auto">
            <div className="flex justify-between font-semibold border-b border-[#E8DEC9] pb-2">
              <span className="text-[#26352D]/60">Order Reference:</span>
              <span className="text-[#12372A]">{orderReference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#26352D]/60">Customer:</span>
              <span className="font-medium text-[#12372A]">{formData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#26352D]/60">Phone:</span>
              <span className="font-medium text-[#12372A]">{formData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#26352D]/60">Delivery Address:</span>
              <span className="font-medium text-[#12372A] text-right max-w-xs">{formData.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#26352D]/60">Payment Mode:</span>
              <span className="font-medium text-[#12372A]">
                {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI on Delivery'}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#E8DEC9] font-serif text-base font-bold text-[#12372A]">
              <span>Total Payable:</span>
              <span>₹{orderTotal}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                clearCart();
                navigate('/');
              }}
              className="w-full sm:w-auto bg-[#12372A] text-[#FAF5EC] px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#1a4a39] transition cursor-pointer"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                clearCart();
                navigate('/shop');
              }}
              className="w-full sm:w-auto bg-[#FAF5EC] text-[#12372A] border border-[#E3D8C4] px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#EFE7D8] transition cursor-pointer"
            >
              Order More Items
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6 sm:pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Return Link */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#12372A] hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Continue shopping</span>
      </Link>

      <div className="mb-8">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#26352D]/70 uppercase block mb-1">
          FAST LOCAL DELIVERY IN SWANKHA
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A]">
          Complete Your Order
        </h1>
      </div>

      <form onSubmit={handlePlaceWhatsAppOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Customer & Delivery Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contact & Delivery Details Card */}
            <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E8DEC9] shadow-xs">
              <h2 className="font-serif text-xl font-bold text-[#12372A] mb-5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#6F9277]" />
                <span>Delivery Information</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#12372A] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#26352D]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-[#FAF5EC] border border-[#E3D8C4] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#12372A] placeholder-[#26352D]/40 focus:border-[#12372A] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#12372A] mb-1.5">
                    Phone Number (WhatsApp Active) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#26352D]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#FAF5EC] border border-[#E3D8C4] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#12372A] placeholder-[#26352D]/40 focus:border-[#12372A] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#12372A] mb-1.5">
                    House / Mohalla / Street Address in Swankha <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    placeholder="e.g. Ward No. 3, Near Primary Health Center, Swankha"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-[#FAF5EC] border border-[#E3D8C4] rounded-xl px-4 py-2.5 text-sm text-[#12372A] placeholder-[#26352D]/40 focus:border-[#12372A] focus:outline-hidden resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#12372A] mb-1.5">
                    Prominent Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="e.g. Near Kabir Mandir / Swankha Morh"
                    value={formData.landmark}
                    onChange={handleChange}
                    className="w-full bg-[#FAF5EC] border border-[#E3D8C4] rounded-xl px-4 py-2.5 text-sm text-[#12372A] placeholder-[#26352D]/40 focus:border-[#12372A] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#12372A] mb-1.5">
                    Delivery Notes / Special Request (Optional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="e.g. Please deliver after 5 PM, or bring change for ₹500"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-[#FAF5EC] border border-[#E3D8C4] rounded-xl px-4 py-2.5 text-sm text-[#12372A] placeholder-[#26352D]/40 focus:border-[#12372A] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E8DEC9] shadow-xs">
              <h2 className="font-serif text-xl font-bold text-[#12372A] mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#6F9277]" />
                <span>Payment Method</span>
              </h2>

              <p className="text-xs text-[#26352D]/70 mb-4">
                Pay conveniently upon doorstep delivery. No advance online payment needed.
              </p>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#E3D8C4] bg-[#FAF5EC]/70 hover:bg-[#FAF5EC] cursor-pointer transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="accent-[#12372A] w-4 h-4 cursor-pointer"
                  />
                  <Banknote className="w-5 h-5 text-emerald-700" />
                  <div>
                    <span className="font-semibold text-sm text-[#12372A] block">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-xs text-[#26352D]/60">
                      Pay cash to the delivery person when items arrive.
                    </span>
                  </div>
                </label>

                {/* UPI on Delivery */}
                <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#E3D8C4] bg-[#FAF5EC]/70 hover:bg-[#FAF5EC] cursor-pointer transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                    className="accent-[#12372A] w-4 h-4 cursor-pointer"
                  />
                  <QrCode className="w-5 h-5 text-[#12372A]" />
                  <div>
                    <span className="font-semibold text-sm text-[#12372A] block">
                      UPI on Delivery (GPay / PhonePe / Paytm)
                    </span>
                    <span className="text-xs text-[#26352D]/60">
                      Scan the shop's UPI QR code at delivery.
                    </span>
                  </div>
                </label>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-[#FAF5EC] border border-[#E8DEC9] text-xs text-[#26352D]/70 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#6F9277] shrink-0" />
                <span>Card & Netbanking gateway will be enabled in the upcoming upgrade.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & WhatsApp Button */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-7 border border-[#E8DEC9] shadow-md sticky top-24">
              <h2 className="font-serif text-xl font-bold text-[#12372A] mb-4">
                Order Summary ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </h2>

              {/* Items scroll area */}
              <div className="max-h-72 overflow-y-auto space-y-3 pr-1 mb-4 no-scrollbar">
                {cartItems.map(item => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3 py-2 border-b border-[#F0EAE0] last:border-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 bg-[#FAF5EC]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#12372A] truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-[#26352D]/60 block">
                        {item.product.quantity} × {item.quantity} Qty
                      </span>
                    </div>
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#12372A]">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#E8DEC9] text-xs sm:text-sm text-[#26352D]">
                <div className="flex justify-between">
                  <span className="text-[#26352D]/70">Subtotal</span>
                  <span className="font-medium text-[#12372A]">₹{cartSubtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#26352D]/70">Local Swankha Delivery</span>
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
                    <span>Discount / Savings</span>
                    <span>-₹{cartSavings}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#E8DEC9] flex justify-between font-serif text-lg sm:text-xl font-bold text-[#12372A]">
                  <span>Total Payable</span>
                  <span>₹{orderTotal}</span>
                </div>
              </div>

              {/* Submit / WhatsApp Order Button */}
              <div className="mt-6 pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer group"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Place Order on WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-[#26352D]/60 mt-3 leading-snug">
                  Clicking sends your verified cart and address to <strong>{SHOP_CONFIG.phone}</strong>. We confirm within minutes!
                </p>
              </div>

              {/* Local Guarantee Badge */}
              <div className="mt-6 pt-4 border-t border-[#F0EAE0] flex items-center gap-2 text-xs text-[#26352D]/75">
                <Truck className="w-4 h-4 text-[#6F9277] shrink-0" />
                <span>Delivered to Swankha within 45–90 mins</span>
              </div>
            </div>
          </div>

        </div>
      </form>

    </div>
  );
};
