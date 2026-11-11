import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { CATERING_CONTACT, KURTIES_LOGO } from '../data/cateringData';
import { generateQuickChatUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenOrderModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const quickWaUrl = generateQuickChatUrl('consult', CATERING_CONTACT.whatsappRaw);

  return (
    <header className="sticky top-0 z-40 bg-[#ECE2D3]/95 backdrop-blur-md text-[#362216] border-b border-[#D8C7B2] shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark with Logo */}
          <a
            href="#"
            className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-[#5C3517] hover:text-[#452710] transition-colors whitespace-nowrap shrink-0 font-display"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#8B532E]/40 shadow-xs bg-[#F7EFE5] shrink-0">
              <img
                src={KURTIES_LOGO}
                alt="Logo Resmi Kurties Food Katering Gandrungmangu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[#5C3517] leading-none text-xl">Kurties Food</span>
              <span className="text-[11px] tracking-wider uppercase font-bold text-[#8C5835] mt-0.5">Katering Gandrungmangu</span>
            </div>
          </a>

          {/* Zone 2: Clean single-line text links in warm brown */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-[#5A3F2E]">
            <a
              href="#menu"
              className="hover:text-[#7A4B28] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#8B532E] underline-offset-4"
            >
              Pilihan Menu
            </a>
            <a
              href="#kalkulator"
              className="hover:text-[#7A4B28] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#8B532E] underline-offset-4"
            >
              Kalkulator Porsi
            </a>
            <a
              href="#layanan-wa"
              className="hover:text-[#7A4B28] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#8B532E] underline-offset-4"
            >
              Layanan WA
            </a>
            <a
              href="#lokasi"
              className="hover:text-[#7A4B28] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#8B532E] underline-offset-4"
            >
              Lokasi & Dapur
            </a>
            <a
              href="#ulasan"
              className="hover:text-[#7A4B28] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#8B532E] underline-offset-4"
            >
              Ulasan Tamu
            </a>
          </nav>

          {/* Zone 3: 1 primary action group (Cart trigger + WA CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Trigger */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#DFD0BD] hover:bg-[#D5C4B0] text-[#3D2516] border border-[#C5B099] transition-all cursor-pointer shadow-2xs"
              aria-label="Buka Keranjang Pesanan"
            >
              <ShoppingBag className="w-5 h-5 text-[#4D311F]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold text-white bg-[#8B532E] rounded-full tabular-nums shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button in Light Warm Brown (Coklat Muda) */}
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#FDFBF7] bg-[#7A4B28] hover:bg-[#653C1E] active:bg-[#523016] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Pesan via WA</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4D311F] hover:text-[#2E1C11] rounded-xl focus:outline-none bg-[#DFD0BD]"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D8C7B2] bg-[#ECE2D3] px-4 pt-3 pb-5 space-y-3">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#3D2516] hover:text-[#7A4B28] text-base font-bold"
          >
            Pilihan Menu
          </a>
          <a
            href="#kalkulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#3D2516] hover:text-[#7A4B28] text-base font-bold"
          >
            Kalkulator Porsi & Budget
          </a>
          <a
            href="#layanan-wa"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#3D2516] hover:text-[#7A4B28] text-base font-bold"
          >
            Fitur Layanan WhatsApp
          </a>
          <a
            href="#lokasi"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#3D2516] hover:text-[#7A4B28] text-base font-bold"
          >
            Lokasi Karanggintung & Area
          </a>
          <a
            href="#ulasan"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#3D2516] hover:text-[#7A4B28] text-base font-bold"
          >
            Ulasan Tamu & FAQ
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#7A4B28] text-white font-bold text-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Pesan Sekarang via WA
            </button>
            <a
              href={quickWaUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#DFD0BD] text-[#3D2516] font-bold text-sm hover:bg-[#D5C4B0]"
            >
              Konsultasi Langsung WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
