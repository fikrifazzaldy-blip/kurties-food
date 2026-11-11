import React from 'react';
import { MapPin, MessageCircle, Calculator, CheckCircle2 } from 'lucide-react';
import { HERO_IMAGE, KURTIES_LOGO, CATERING_CONTACT } from '../data/cateringData';
import { generateQuickChatUrl } from '../utils/whatsapp';

interface HeroProps {
  onOpenOrderModal: () => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenOrderModal,
  onScrollToCalculator
}) => {
  const waConsultUrl = generateQuickChatUrl('consult', CATERING_CONTACT.whatsappRaw);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#ECE1D2] via-[#F4ECE1] to-[#EAE0D0] text-[#342013] pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-[#D8C7B2]">
      {/* Subtle warm caramel and brown glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C68642]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#8B532E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-column balanced split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Location & Category kicker in cream & brown badge */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="flex items-center gap-2 bg-[#E5D7C4] border border-[#CBB8A1] px-3.5 py-1.5 rounded-full text-[#4E2B12] shadow-2xs">
                <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-[#9C6B46] bg-[#F7EFE5]">
                  <img src={KURTIES_LOGO} alt="Kurties Food" className="w-full h-full object-cover" />
                </div>
                <span className="font-extrabold">Katering Rumahan & Hajatan</span>
              </span>
              <span aria-hidden="true" className="text-[#C4B29E]">·</span>
              <span className="flex items-center gap-1.5 text-[#5A3F2E] font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#8B532E] shrink-0" />
                <span>Karanggintung RT 3 RW 4, Gandrungmangu</span>
              </span>
            </div>

            {/* Main Editorial Headline in rich coffee brown */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#2B170C] leading-[1.18] text-balance">
              Katering Lezat, Higienis & Siap Antar untuk Segala Acara Anda.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#523828] max-w-2xl leading-relaxed">
              <strong className="text-[#5C3517] font-extrabold">Kurties Food</strong> menyajikan aneka pilihan Nasi Kotak, Prasmanan Hajatan, Tumpeng Kuning Tradisional, dan Snack Box dengan bumbu rempah asli khas Cilacap. Pelayanan cepat dan mudah langsung terhubung ke <span className="text-[#7A4B28] font-extrabold underline decoration-[#A06842] underline-offset-2">WhatsApp</span>.
            </p>

            {/* Interactive CTA buttons in Coklat Muda & Krem */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOpenOrderModal}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-[#FDFBF7] bg-[#7A4B28] hover:bg-[#653C1E] active:bg-[#523016] rounded-xl transition-all shadow-md hover:shadow-lg shadow-[#7A4B28]/25 cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Pesan Cepat via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-[#4A2D1B] bg-[#E7D9C7] hover:bg-[#DDCDB9] active:bg-[#D2BFAB] rounded-xl border-2 border-[#A88C72] transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
              >
                <Calculator className="w-4 h-4 text-[#7A4B28]" />
                <span>Hitung Estimasi Porsi & Budget</span>
              </button>

              <a
                href={waConsultUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-3.5 text-xs font-bold text-[#624534] hover:text-[#2B170C] transition-colors whitespace-nowrap"
              >
                <span>Konsultasi Gratis</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#D8C7B2] text-xs font-extrabold text-[#4E3322]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B532E] shrink-0" />
                <span>100% Halal & Bersih</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B532E] shrink-0" />
                <span>Bumbu Rempah Segar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B532E] shrink-0" />
                <span>Siap Antar ke Lokasi</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Feast Photography with warm cream & brown framing */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#CBB69F] bg-[#EAE0D1] shadow-xl shadow-[#7A4B28]/10">
              <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="Sajian Katering Prasmanan Kurties Food Gandrungmangu Cilacap"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Scrim Caption in deep espresso brown */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#26150B]/95 via-[#26150B]/60 to-transparent flex items-center justify-between text-[#FDFBF7]">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#E8B884] font-bold">Sajian Istimewa</p>
                  <p className="text-sm font-bold text-white">Prasmanan & Nasi Kotak Kurties Food</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#E0CFBD]">Dapur Karanggintung</span>
                  <p className="text-xs font-bold text-[#F3C89B]">Siap Pesan H-1</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column KPI Trust Strip below hero in warm cream cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#D8C7B2]">
          <div className="bg-[#EAE0D0] border border-[#CFBCAB] p-4 rounded-xl shadow-xs">
            <div className="text-2xl font-bold font-display text-[#5C3517] tabular-nums">5.000+</div>
            <div className="text-xs text-[#523828] mt-1 font-bold">Porsi Nasi Kotak Terkirim</div>
          </div>
          <div className="bg-[#EAE0D0] border border-[#CFBCAB] p-4 rounded-xl shadow-xs">
            <div className="text-2xl font-bold font-display text-[#5C3517] tabular-nums">150+</div>
            <div className="text-xs text-[#523828] mt-1 font-bold">Acara Hajatan & Syukuran</div>
          </div>
          <div className="bg-[#EAE0D0] border border-[#CFBCAB] p-4 rounded-xl shadow-xs">
            <div className="text-2xl font-bold font-display text-[#8B532E] tabular-nums">100%</div>
            <div className="text-xs text-[#523828] mt-1 font-bold">Bahan Halal & Higienis</div>
          </div>
          <div className="bg-[#EAE0D0] border border-[#CFBCAB] p-4 rounded-xl shadow-xs">
            <div className="text-2xl font-bold font-display text-[#5C3517] tabular-nums">15 - 30 Menit</div>
            <div className="text-xs text-[#523828] mt-1 font-bold">Respon Cepat WhatsApp</div>
          </div>
        </div>

      </div>
    </section>
  );
};
