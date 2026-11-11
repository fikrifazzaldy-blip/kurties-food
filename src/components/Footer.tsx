import React from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { CATERING_CONTACT, KURTIES_LOGO } from '../data/cateringData';
import { generateQuickChatUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const waUrl = generateQuickChatUrl('consult', CATERING_CONTACT.whatsappRaw);

  return (
    <footer className="bg-[#24150D] text-[#DFC8B4] pt-14 pb-10 border-t border-[#3A2417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xl font-bold text-white font-display">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#8B532E] bg-white shadow-xs shrink-0">
                <img
                  src={KURTIES_LOGO}
                  alt="Kurties Food Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white leading-none">Kurties Food</span>
                <span className="text-[10px] tracking-wider uppercase text-[#E6AA68] font-bold mt-0.5">Katering Gandrungmangu</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#C8B19D] leading-relaxed">
              Layanan katering rumahan dan pesta profesional di Gandrungmangu, Cilacap. Menghadirkan olahan masakan Nusantara berkualitas, halal, dan higienis untuk momen berharga Anda.
            </p>
            <div className="text-xs text-[#E6AA68] font-bold">
              100% Halal · Resep Asli Rempah Nusantara
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#C8B19D]">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Daftar Menu & Pricelist
                </a>
              </li>
              <li>
                <a href="#kalkulator" className="hover:text-white transition-colors">
                  Kalkulator Porsi Acara
                </a>
              </li>
              <li>
                <a href="#layanan-wa" className="hover:text-white transition-colors">
                  Fitur Pemesanan WhatsApp
                </a>
              </li>
              <li>
                <a href="#lokasi" className="hover:text-white transition-colors">
                  Lokasi Dapur Gandrungmangu
                </a>
              </li>
              <li>
                <a href="#ulasan" className="hover:text-white transition-colors">
                  Ulasan Tamu & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Jam Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Jam Layanan Dapur
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#C8B19D]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E6AA68] shrink-0 mt-0.5" />
                <span className="text-white font-bold">{CATERING_CONTACT.openingHours}</span>
              </div>
              <p className="text-xs text-[#A8907E]">
                Pemesanan H-1 untuk Nasi Kotak & Snack Box. H-3 hingga H-5 untuk Prasmanan Hajatan Besar.
              </p>
            </div>
          </div>

          {/* Column 4: Kontak & Alamat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Alamat Dapur & Kontak
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#C8B19D]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E6AA68] shrink-0 mt-0.5" />
                <span>{CATERING_CONTACT.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E6AA68] shrink-0" />
                <span className="tabular-nums font-bold text-white">{CATERING_CONTACT.phoneDisplay}</span>
              </div>
              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7A4B28] hover:bg-[#653C1E] active:bg-[#523016] text-[#FDFBF7] text-xs font-bold transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
                  <span>Chat WhatsApp Resmi</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#3A2417] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9C8270]">
          <div>
            &copy; {new Date().getFullYear()} Kurties Food. Hak Cipta Dilindungi. Karanggintung RT 3 RW 4, Gandrungmangu, Cilacap.
          </div>
          <div>
            <span>Cita rasa katering Nusantara terbaik di Cilacap Barat</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
