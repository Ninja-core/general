import React from 'react';
import { HeartHandshake, CheckCircle2, BadgePercent, Users, MapPin } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shopConfig';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Arch Image Container */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto">
              
              {/* Decorative Accent Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#6F9277]/20 to-[#E8A044]/15 rounded-3xl blur-xl -z-10" />

              {/* Story Arch Container */}
              <div className="story-arch overflow-hidden border-4 border-white shadow-xl bg-[#FAF5EC] aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80"
                  alt="Authentic Whole Spices and Grains at Joginder Karyana Shop"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/70 via-transparent to-transparent" />
                
                {/* Local Trust Label inside image */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#E8A044] block mb-1">
                    COMMITTED TO PURITY
                  </span>
                  <p className="font-serif text-lg font-medium leading-snug">
                    Hand-inspected grains, unpolished dals, and fresh everyday essentials for your family.
                  </p>
                </div>
              </div>

              {/* Authentic Kiryana Shop Signboard Reference Card */}
              <div className="mt-6 bg-[#FFFDF8] rounded-2xl p-5 border-2 border-[#12372A]/15 shadow-md relative">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#12372A] flex items-center justify-center text-[#FAF5EC] font-serif text-2xl font-bold shrink-0">
                    J
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#6F9277] uppercase">
                      OFFICIAL STORE IDENTITY
                    </div>
                    <h4 className="font-serif font-bold text-lg text-[#12372A] leading-tight">
                      {SHOP_CONFIG.name}
                    </h4>
                    <p className="text-xs text-[#26352D]/80 flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#E8A044] shrink-0" />
                      {SHOP_CONFIG.address}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#26352D]/70 uppercase block mb-2">
              OUR LITTLE STORY
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#12372A] tracking-tight leading-[1.15] mb-6">
              A store you can count on, day after day.
            </h2>

            <p className="text-base sm:text-lg text-[#26352D]/80 leading-relaxed mb-8">
              At <strong className="font-semibold text-[#12372A]">{SHOP_CONFIG.name}</strong>, grocery shopping is built on decades of genuine local relationships. Located at <strong className="font-semibold text-[#12372A]">{SHOP_CONFIG.address}</strong>, we take pride in serving every home in Swankha with trustworthy staples, honest weights, and friendly service.
            </p>

            {/* 4 Pillars Explained cleanly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E8E1D3] hover:border-[#6F9277] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#12372A]/10 text-[#12372A] flex items-center justify-center mb-3">
                  <HeartHandshake className="w-5 h-5 text-[#12372A]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#12372A] mb-1.5">
                  Trusted Local Shopping
                </h3>
                <p className="text-xs sm:text-sm text-[#26352D]/75 leading-relaxed">
                  Deeply rooted in the Swankha community, offering honest advice and personal care that supermarkets cannot match.
                </p>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E8E1D3] hover:border-[#6F9277] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#6F9277]/15 text-[#12372A] flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 text-[#12372A]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#12372A] mb-1.5">
                  Quality Everyday Essentials
                </h3>
                <p className="text-xs sm:text-sm text-[#26352D]/75 leading-relaxed">
                  Carefully sourced wheat atta, aged basmati, fresh unpolished dals, and trusted household packaged goods.
                </p>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E8E1D3] hover:border-[#6F9277] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#E8A044]/15 text-[#E8A044] flex items-center justify-center mb-3">
                  <BadgePercent className="w-5 h-5 text-[#E8A044]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#12372A] mb-1.5">
                  Fair & Affordable Pricing
                </h3>
                <p className="text-xs sm:text-sm text-[#26352D]/75 leading-relaxed">
                  Wholesale-competitive rates without inflated store margins. Clear, upfront billing for every item.
                </p>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E8E1D3] hover:border-[#6F9277] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#12372A]/10 text-[#12372A] flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-[#12372A]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#12372A] mb-1.5">
                  Friendly Neighbourhood Service
                </h3>
                <p className="text-xs sm:text-sm text-[#26352D]/75 leading-relaxed">
                  Quick door-to-door delivery across Swankha, effortless WhatsApp reordering, and warm familiar faces.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
