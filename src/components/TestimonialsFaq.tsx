import React, { useState } from 'react';
import { Star, ChevronDown, HelpCircle, History, RotateCcw } from 'lucide-react';
import { TESTIMONIALS, FAQS, CATERING_CONTACT } from '../data/cateringData';
import { formatRupiah, buildWhatsAppUrl } from '../utils/whatsapp';

interface TestimonialsFaqProps {
  onOpenOrderModal: () => void;
}

export const TestimonialsFaq: React.FC<TestimonialsFaqProps> = ({ onOpenOrderModal }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [orderHistory, setOrderHistory] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('kurties_orders_history') || '[]');
    } catch {
      return [];
    }
  });

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleReorder = (order: any) => {
    const msg = [
      `*PESAN ULANG / RE-ORDER KATERING - KURTIES FOOD*`,
      `• Nama Pemesan: ${order.customerName}`,
      `• Acara Sebelumnya: ${order.eventType}`,
      `• Alamat Kirim: ${order.deliveryAddress}`,
      `------------------------------------------`,
      `Halo Kurties Food Karanggintung Gandrungmangu, saya ingin memesan kembali paket katering seperti pesanan kami sebelumnya untuk tanggal baru. Mohon info ketersediaan slot jadwal.`
    ].join('\n');
    window.open(buildWhatsAppUrl(CATERING_CONTACT.whatsappRaw, msg), '_blank');
  };

  return (
    <section id="ulasan" className="py-16 lg:py-24 bg-[#F4ECE1] text-[#342013] border-b border-[#D8C7B2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Testimonials Block */}
        <div>
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8B532E]">Kepuasan Pelanggan</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#2B170C] mt-1">
              Pengalaman Warga Gandrungmangu & Cilacap
            </h2>
            <p className="text-sm sm:text-base text-[#523828] mt-2 leading-relaxed font-medium">
              Cerita nyata dari tuan rumah yang telah mempercayakan jamuan pernikahan, pengajian, dan selamatan kepada Kurties Food.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#EFE5D6] rounded-3xl p-6 sm:p-7 border border-[#D5C4B0] flex flex-col justify-between space-y-4 hover:border-[#8B532E] hover:shadow-xl transition-all shadow-2xs"
              >
                <div className="space-y-3">
                  {/* Rating Stars in Warm Honey Amber */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C68642] text-[#C68642]" />
                    ))}
                  </div>

                  {/* Quote content */}
                  <p className="text-xs sm:text-sm text-[#523828] leading-relaxed italic font-medium">
                    "{t.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#DFD0BD]">
                  <div className="text-xs font-bold text-[#8B532E]">{t.event}</div>
                  <div className="font-bold text-[#2B170C] text-sm mt-0.5">{t.name}</div>
                  <div className="text-[11px] text-[#6F523E] flex items-center gap-1.5 mt-0.5 font-bold">
                    <span>{t.role}</span>
                    <span aria-hidden="true" className="text-[#C4B29E]">·</span>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Order History Block in warm cream */}
        {orderHistory.length > 0 && (
          <div className="bg-[#E8DAC8] border border-[#CBB69F] rounded-3xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <History className="w-5 h-5 text-[#5C3517]" />
                <h3 className="text-base font-bold font-display text-[#2B170C]">
                  Riwayat Pemesanan Anda di Website Kurties Food
                </h3>
              </div>
              <span className="text-xs text-[#5C3517] font-bold">{orderHistory.length} Pesanan Tercatat</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {orderHistory.map((item, i) => (
                <div key={i} className="bg-[#F6EFE5] p-4 rounded-2xl border border-[#D5C4B0] flex items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <div className="text-xs font-bold text-[#2B170C]">{item.customerName} - {item.eventType}</div>
                    <div className="text-[11px] text-[#6F523E] mt-0.5 font-semibold">
                      Tanggal: {item.eventDate} ({item.eventTime} WIB) · Total: {formatRupiah(item.totalAmount)}
                    </div>
                    <div className="text-[11px] text-[#523828] truncate max-w-xs font-medium">{item.deliveryAddress}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleReorder(item)}
                    className="p-2 px-3 rounded-xl bg-[#E2D4C1] text-[#4A2D1B] hover:bg-[#D5C3AE] text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors border border-[#C5B099]"
                    title="Pesan Ulang via WA"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Pesan Ulang</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion Block */}
        <div className="max-w-4xl mx-auto pt-6">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8B532E]">Tanya Jawab Seputar Pemesanan</div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#2B170C] mt-1">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>
            <p className="text-xs sm:text-sm text-[#523828] mt-2 font-medium">
              Segala hal yang perlu Anda ketahui mengenai ketentuan pemesanan katering Kurties Food.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#D5C4B0] rounded-2xl overflow-hidden bg-[#EFE5D6] shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-[#2B170C] text-sm sm:text-base hover:text-[#7A4B28] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-[#8B532E] shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#8E745E] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#7A4B28]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#523828] leading-relaxed border-t border-[#DFD0BD] bg-[#FAF4EB] font-medium">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct CTA box in Deep Espresso & Caramel */}
          <div className="mt-10 p-6 sm:p-7 bg-[#3B2214] text-[#F7EFE5] rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
            <div>
              <h4 className="text-base font-bold font-display text-white">Ada Pertanyaan Lain yang Belum Terjawab?</h4>
              <p className="text-xs text-[#DFC8B4] mt-0.5 font-medium">Admin Kurties Food siap menjawab konsultasi menu Anda melalui WhatsApp.</p>
            </div>
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="px-6 py-3 bg-[#B26E3A] hover:bg-[#9B5C2B] active:bg-[#864C20] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shrink-0 cursor-pointer shadow-md"
            >
              Hubungi via WhatsApp
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
