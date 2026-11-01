import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../types/product';
import type { CartItem, CheckoutCustomerInfo } from '../types/cart';
import { SHOP_CONFIG } from '../config/shopConfig';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartSavings: number;
  deliveryFee: number;
  orderTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppOrderUrl: (customerInfo: CheckoutCustomerInfo) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'joginder_karyana_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartSavings = cartItems.reduce((sum, item) => {
    const orig = item.product.originalPrice || item.product.price;
    return sum + (orig - item.product.price) * item.quantity;
  }, 0);

  const deliveryFee =
    cartSubtotal === 0 || cartSubtotal >= SHOP_CONFIG.delivery.freeThreshold
      ? 0
      : SHOP_CONFIG.delivery.deliveryFee;

  const orderTotal = cartSubtotal + deliveryFee;

  const generateWhatsAppOrderUrl = (customerInfo: CheckoutCustomerInfo) => {
    const lines: string[] = [];
    lines.push(`🌿 *NEW GROCERY ORDER — ${SHOP_CONFIG.name.toUpperCase()}*`);
    lines.push(`📍 *Location:* ${SHOP_CONFIG.address}`);
    lines.push(`----------------------------------------`);
    lines.push(`👤 *Customer Name:* ${customerInfo.fullName}`);
    lines.push(`📞 *Phone Number:* ${customerInfo.phone}`);
    lines.push(`🏠 *Delivery Address:* ${customerInfo.address}`);
    if (customerInfo.landmark) {
      lines.push(`🚩 *Landmark:* ${customerInfo.landmark}`);
    }
    if (customerInfo.notes) {
      lines.push(`📝 *Special Note:* ${customerInfo.notes}`);
    }
    lines.push(`💳 *Payment Mode:* ${customerInfo.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'UPI on Delivery'}`);
    lines.push(`----------------------------------------`);
    lines.push(`📦 *ORDERED ITEMS:*`);

    cartItems.forEach((item, index) => {
      const itemTotal = item.product.price * item.quantity;
      lines.push(
        `${index + 1}. *${item.product.name}* (${item.product.brand} · ${item.product.quantity})`
      );
      lines.push(`    Qty: ${item.quantity} × ₹${item.product.price} = ₹${itemTotal}`);
    });

    lines.push(`----------------------------------------`);
    lines.push(`Subtotal: ₹${cartSubtotal}`);
    lines.push(`Delivery Fee: ${deliveryFee === 0 ? 'FREE (Swankha Local Delivery)' : `₹${deliveryFee}`}`);
    if (cartSavings > 0) {
      lines.push(`Total Savings: ₹${cartSavings}`);
    }
    lines.push(`*GRAND TOTAL: ₹${orderTotal}*`);
    lines.push(`----------------------------------------`);
    lines.push(`Please confirm availability and dispatch time. Thank you! 🙏`);

    const fullMessage = lines.join('\n');
    return `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartSavings,
        deliveryFee,
        orderTotal,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppOrderUrl
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
