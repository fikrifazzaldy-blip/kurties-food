import React from 'react';
import { MessageCircle, Clock, FileCheck, MapPin } from 'lucide-react';
import { CATERING_CONTACT, KURTIES_LOGO } from '../data/cateringData';
import { generateQuickChatUrl } from '../utils/whatsapp';

interface WhatsAppServiceSectionProps {
  onOpenOrderModal: () => void;
}

export const WhatsAppServiceSection: React.FC<WhatsAppServiceSectionProps> = ({
  onOpenOrderModal
}) => {
  const consultUrl = generateQuickChatUrl('consult', CATERING_CONTACT.whatsappRaw);
  const menuUrl = generateQuickChatUrl('menu', CATERING_CONTACT.whatsappRaw);
  const deliveryUrl = generateQuickChatUrl('delivery', CATERING_CONTACT.whatsappRaw);

  const features = [
    {
      icon: Clock,
      title: 'Respon Cepat 15-30 Menit',
      desc: 'Admin aktif membalas setiap hari pukul 06.00 - 20.00 WIB untuk memastikan kepastian jadwal acara Anda.'
    },
    {
      icon: MessageCircle,
      title: 'Bebas Diskusi & Custom Lauk',
      desc: 'Ingin lauk pedas manis, sayur dipisah, atau ganti menu sesuai selera keluarga? Semua bisa disesuaikan lewat chat WA.'
    },
    {
      icon: FileCheck,
      title: 'Nota & Bukti Pesanan Digital',
      desc: 'Setelah sepakat, rincian pesanan dan kwitansi resmi langsung dikirimkan dalam format rapi via WhatsApp.'
    },
    {
      icon: MapPin,
      title: 'Update Pengantaran & Live Lokasi',
      desc: 'Driver kami siap membagikan live location saat pesanan meluncur ke tempat acara di Gandrungmangu dan sekitarnya.'
    }
  ];

  return (
    <section id="layanan-wa" className="py-16 lg:py-24 bg-gradient-to-b from-[#ECE1D2] to-[#F4ECE1] text-[#342013] border-b border-[#D8C7B2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8B532E]">Kemudahan Komunikasi</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#2B170C] mt-1">
            Fitur Layanan WhatsApp Kurties Food
          </h2>
          <p className="text-sm sm:text-base text-[#523828] mt-3 leading-relaxed font-medium">
            Kami memahami kesibukan persiapan acara Anda. Layanan WhatsApp kami dirancang agar proses pemesanan katering berlangsung santai, transparan, dan terpercaya.
          </p>
        </div>

        {/* 4 Feature Cards in Cream & Light Brown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#EFE5D6] border border-[#D5C4B0] p-6 rounded-2xl hover:border-[#8B532E] hover:shadow-lg transition-all shadow-2xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E2D4C1] border border-[#CBB69F] flex items-center justify-center text-[#7A4B28] mb-4 shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-display text-[#2B170C] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#523828] leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Chat Quick Trigger Box in rich cream */}
        <div className="bg-[#E8DAC8] border-2 border-[#8B532E]/35 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-[#5C3517]">
              <div className="w-5 h-5 rounded-full overflow-hidden border border-[#8B532E] bg-white inline-block">
                <img src={KURTIES_LOGO} alt="Kurties Food" className="w-full h-full object-cover" />
              </div>
              <span>WhatsApp Resmi Dapur Kurties Food Karanggintung</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#2B170C]">
              Punya Pertanyaan Spesifik tentang Acara Anda?
            </h3>
            <p className="text-xs sm:text-sm text-[#523828] max-w-xl font-medium">
              Klik salah satu tombol cepat di samping untuk langsung membuka percakapan dengan format pesan yang sudah disiapkan.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={consultUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7A4B28] hover:bg-[#653C1E] active:bg-[#523016] text-[#FDFBF7] text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Konsultasi Acara Hajatan</span>
            </a>

            <a
              href={menuUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#F6EFE5] hover:bg-[#ECE1D2] text-[#362216] border border-[#C5B099] text-xs sm:text-sm font-bold transition-colors shadow-2xs"
            >
              <span>Minta Pricelist Lengkap</span>
            </a>

            <a
              href={deliveryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#F6EFE5] hover:bg-[#ECE1D2] text-[#362216] border border-[#C5B099] text-xs sm:text-sm font-bold transition-colors shadow-2xs"
            >
              <span>Cek Ongkir Gandrungmangu</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
