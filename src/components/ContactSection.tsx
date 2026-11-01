import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Send, ExternalLink } from 'lucide-react';
import { SHOP_CONFIG } from '../config/shopConfig';

export const ContactSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Joginder Karyana Shop!\nMy Name: ${inquiryName}\nPhone: ${inquiryPhone}\nMessage: ${inquiryMessage}`;
    const url = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const directWhatsAppUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello Joginder Karyana Shop! I would like to place an order or inquire about groceries in Swankha.`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F4EDE0]/50 scroll-mt-24 border-t border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#26352D]/70 uppercase block mb-2">
            VISIT & REACH US
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#12372A] tracking-tight mb-4">
            Always happy to help you.
          </h2>
          <p className="text-base text-[#26352D]/80">
            Stop by our neighbourhood store in Swankha or send your grocery list directly via WhatsApp for fast doorstep delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Details Cards */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Shop Details Card */}
            <div className="bg-[#FFFDF8] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E8E1D3] shadow-xs">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#12372A] text-[#FAF5EC] flex items-center justify-center font-serif text-2xl font-bold">
                  J
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#12372A]">
                    {SHOP_CONFIG.name}
                  </h3>
                  <span className="text-xs font-medium text-[#6F9277] uppercase tracking-wider">
                    KIRYANA & GENERAL STORE
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#26352D]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E8A044] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#12372A]">Store Address</span>
                    <p className="text-[#26352D]/80">{SHOP_CONFIG.address}</p>
                    <p className="text-xs text-[#26352D]/60 mt-0.5">Landmark: {SHOP_CONFIG.landmark}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#6F9277] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#12372A]">Contact Phone</span>
                    <a
                      href={`tel:${SHOP_CONFIG.phone}`}
                      className="text-[#12372A] hover:underline font-medium"
                    >
                      {SHOP_CONFIG.phone}
                    </a>
                    <span className="text-xs text-[#26352D]/60 block">Direct Store Line</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#12372A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#12372A]">Business Hours</span>
                    <p className="text-xs text-[#26352D]/80">
                      <strong>Mon – Sat:</strong> {SHOP_CONFIG.timings.weekdays}
                    </p>
                    <p className="text-xs text-[#26352D]/80 mt-0.5">
                      <strong>Sunday:</strong> {SHOP_CONFIG.timings.sunday}
                    </p>
                    <span className="inline-block mt-1 bg-[#6F9277]/15 text-[#12372A] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      {SHOP_CONFIG.timings.statusNote}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Ordering Action Button */}
              <div className="mt-6 pt-5 border-t border-[#F0EAE0]">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium px-5 py-3 rounded-full text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Delivery note */}
            <div className="bg-[#FAF5EC] rounded-2xl p-5 border border-[#E8E1D3]">
              <h4 className="text-xs font-bold tracking-widest text-[#12372A] uppercase mb-1">
                Local Swankha Delivery Coverage
              </h4>
              <p className="text-xs text-[#26352D]/80 leading-relaxed">
                We deliver to all homes across Swankha, near Kabir Mandir, Swankha Morh, and nearby connected mohallas. Same-day delivery within 45–90 minutes.
              </p>
            </div>

          </div>

          {/* Right Column: Google Maps Location Placeholder & Quick Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Google Maps Location Card */}
            <div className="bg-[#FFFDF8] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8E1D3] shadow-xs">
              <div className="p-4 sm:p-5 border-b border-[#F0EAE0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E8A044]" />
                  <span className="font-serif font-semibold text-[#12372A] text-base">
                    Store Location Map
                  </span>
                </div>
                <a
                  href="https://maps.google.com/?q=Swankha+Near+Kabir+Mandir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#12372A] hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Stylized Google Maps Placeholder */}
              <div className="relative bg-[#E8E2D5] aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center p-6 text-center overflow-hidden">
                {/* Map Grid Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#12372A_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 max-w-sm bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-[#E3D8C4]">
                  <div className="w-10 h-10 rounded-full bg-[#12372A] text-[#FAF5EC] flex items-center justify-center mx-auto mb-2.5 shadow-xs">
                    <MapPin className="w-5 h-5 text-[#E8A044]" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#12372A]">
                    {SHOP_CONFIG.name}
                  </h4>
                  <p className="text-xs text-[#26352D]/80 mt-1">
                    {SHOP_CONFIG.address}
                  </p>
                  <p className="text-[11px] text-[#6F9277] font-semibold mt-1">
                    Swankha, Jammu & Kashmir
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-[#FFFDF8] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E8E1D3] shadow-xs">
              <h3 className="font-serif text-xl font-semibold text-[#12372A] mb-1">
                Have a Question or Special Grocery Request?
              </h3>
              <p className="text-xs sm:text-sm text-[#26352D]/70 mb-5">
                Send a quick message and our store team will respond to you right away on WhatsApp.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#12372A] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={inquiryName}
                      onChange={e => setInquiryName(e.target.value)}
                      className="w-full bg-[#FAF5EC] border border-[#E3D8C4] rounded-xl px-3.5 py-2.5 text-sm text-[#12372A] placeholder-[#26352D]/40 focus:border-[#12372A] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#12372A] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={inquiryPhone}
                      onChange={e => setInquiryPhone(e.target.value)}
                      className="w-full bg-[#FAF5EC] border border-[#E3D8C4] rounded-xl px-3.5 py-2.5 text-sm text-[#12372A] placeholder-[#26352D]/40 focus:border-[#12372A] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#12372A] mb-1">
                    Message / Item List
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ask about brand availability, bulk dal/atta rates, or doorstep delivery..."
                    value={inquiryMessage}
                    onChange={e => setInquiryMessage(e.target.value)}
                    className="w-full bg-[#FAF5EC] border border-[#E3D8C4] rounded-xl px-3.5 py-2.5 text-sm text-[#12372A] placeholder-[#26352D]/40 focus:border-[#12372A] focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#12372A] hover:bg-[#1a4a39] text-[#FAF5EC] font-medium px-6 py-2.5 rounded-full text-sm transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
