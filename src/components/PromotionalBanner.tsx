import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromotionalBannerProps {
  onShopOffersClick?: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onShopOffersClick }) => {
  const handleClick = () => {
    if (onShopOffersClick) {
      onShopOffersClick();
    } else {
      const el = document.getElementById('shop');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12372A] rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-[#FAF5EC] relative overflow-hidden shadow-xl border border-[#1a4a39]">
          
          {/* Subtle Decorative Background Rings */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute right-32 -bottom-20 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-[#6F9277]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#E8A044] uppercase block mb-2 sm:mb-3">
                A LITTLE EXTRA
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight mb-4">
                Stock up, save more.
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-[#FAF5EC]/80 font-normal max-w-xl leading-relaxed mb-6 sm:mb-8">
                Make your monthly pantry run feel a little more rewarding. Discover quality essentials and everyday favourites at prices you'll love.
              </p>

              <div>
                <button
                  onClick={handleClick}
                  className="bg-white hover:bg-[#FAF5EC] text-[#12372A] font-medium text-sm sm:text-base px-7 py-3 rounded-full transition-all duration-200 inline-flex items-center gap-2 shadow-sm hover:shadow group cursor-pointer"
                >
                  <span>Shop offers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Graphic Emblem matching screenshot #5 */}
            <div className="lg:col-span-4 flex justify-start lg:justify-center">
              <div className="relative flex items-center justify-center">
                {/* Outlined Circle Graphic */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-[#FAF5EC]/25 flex flex-col items-center justify-center p-4 relative group">
                  
                  {/* Subtle inner accent pulse */}
                  <div className="absolute inset-2 rounded-full border border-[#E8A044]/30" />

                  {/* 10% OFF text in serif warm orange */}
                  <div className="flex items-baseline gap-1 text-[#E8A044] -rotate-6">
                    <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
                      10%
                    </span>
                    <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#E8A044]/90">
                      OFF
                    </span>
                  </div>

                  {/* PANTRY FAVOURITES subtext */}
                  <div className="mt-2 text-center">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#FAF5EC]/90 uppercase block leading-tight">
                      PANTRY
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#FAF5EC]/90 uppercase block leading-tight mt-0.5">
                      FAVOURITES
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
