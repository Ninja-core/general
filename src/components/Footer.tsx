import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shopConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12372A] text-[#FAF5EC] pt-16 pb-24 sm:pb-12 border-t border-[#1a4a39]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Identity Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#FAF5EC] text-[#12372A] flex items-center justify-center font-serif text-2xl font-bold shadow-xs">
                J
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white tracking-tight leading-tight block">
                  {SHOP_CONFIG.name}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#E8A044] uppercase">
                  {SHOP_CONFIG.locationTagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#FAF5EC]/75 font-normal leading-relaxed max-w-sm mb-6">
              Your neighbourhood grocery store delivering daily kitchen staples, unadulterated spices, pulses, and household essentials to families in Swankha.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#FAF5EC]/80 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#E8A044]" />
              <span>100% Genuine Brands & Fair Kiryana Rates</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base font-semibold text-white mb-4">
              Explore Store
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF5EC]/75">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  All Pantry Essentials
                </Link>
              </li>
              <li>
                <a href="/#categories" className="hover:text-white transition-colors">
                  Shop by Aisle
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors">
                  Our Little Story
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white transition-colors">
                  Store Timings & Address
                </a>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-white transition-colors">
                  View Bag & Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-base font-semibold text-white mb-4">
              Store Information
            </h4>
            <div className="space-y-3 text-sm text-[#FAF5EC]/80">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8A044] shrink-0 mt-0.5" />
                <span>{SHOP_CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#6F9277] shrink-0" />
                <a href={`tel:${SHOP_CONFIG.phone}`} className="hover:text-white transition-colors">
                  {SHOP_CONFIG.phone}
                </a>
              </p>
              <p className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E8A044] shrink-0 mt-0.5" />
                <span>
                  Mon–Sat: {SHOP_CONFIG.timings.weekdays} <br />
                  Sun: {SHOP_CONFIG.timings.sunday}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Ordering Available
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF5EC]/60">
          <p>© {new Date().getFullYear()} {SHOP_CONFIG.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Serving Swankha with warmth, trust & quality essentials.
          </p>
        </div>

      </div>
    </footer>
  );
};
