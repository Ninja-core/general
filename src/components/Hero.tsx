import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Clock, Truck } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shopConfig';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const whatsappHeroUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello Joginder Karyana Shop! I am looking for groceries in Swankha. Can you assist me?`
  )}`;

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('shop');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column - Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Top Label */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-6 h-[2px] bg-[#E8A044]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#26352D]/80 uppercase">
                YOUR NEIGHBOURHOOD GROCERY STORE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-medium tracking-tight text-[#12372A] leading-[1.08] mb-5 sm:mb-6">
              Everyday<br />
              essentials.<br />
              <span className="italic font-serif text-[#6F9277] font-normal inline-block">
                Trusted quality.
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg lg:text-xl text-[#26352D]/80 font-normal leading-relaxed max-w-xl mb-8 sm:mb-10">
              Good food, fair prices, and the familiar warmth of your local store — delivered to your doorstep in Swankha.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={handleExplore}
                className="bg-[#12372A] hover:bg-[#1a4a39] text-[#FAF5EC] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Explore products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-[#12372A] hover:text-[#1a4a39] hover:bg-[#EFE7D8]/70 font-medium text-sm sm:text-base transition-all duration-200 border border-transparent hover:border-[#E3D8C4]"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]/20" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-[#E8DEC9] grid grid-cols-3 gap-4 max-w-lg">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#6F9277] shrink-0" />
                <span className="text-xs text-[#26352D]/75 font-medium leading-tight">Fast Swankha Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#6F9277] shrink-0" />
                <span className="text-xs text-[#26352D]/75 font-medium leading-tight">100% Pure Staples</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#6F9277] shrink-0" />
                <span className="text-xs text-[#26352D]/75 font-medium leading-tight">Open 7 Days a Week</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Arch Photography */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] lg:max-w-none">
              
              {/* Background Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#6F9277]/20 to-[#E8A044]/15 rounded-full blur-2xl -z-10" />

              {/* Arch Image Frame */}
              <div className="relative overflow-hidden hero-arch border-4 border-white shadow-[0_20px_50px_rgba(18,55,42,0.15)] bg-[#FAF5EC] aspect-[4/5] max-h-[560px] w-full">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85"
                  alt="Joginder Karyana Fresh Pantry and Vegetable Shelves"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                {/* Subtle bottom gradient to enhance depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating "QUALITY FIRST" Badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E8A044] text-white flex flex-col items-center justify-center text-center shadow-lg border-2 border-white transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest leading-none uppercase">
                  QUALITY
                </span>
                <span className="text-xs sm:text-sm font-extrabold tracking-wider leading-tight uppercase mt-0.5">
                  FIRST
                </span>
              </div>

              {/* Bottom Subtle Location Floating Pill */}
              <div className="absolute -bottom-4 left-6 sm:left-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-md border border-[#E3D8C4] flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-[#12372A]">
                  Fresh Stock Available in Swankha
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

