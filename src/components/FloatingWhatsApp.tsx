import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { CATERING_CONTACT, KURTIES_LOGO } from '../data/cateringData';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  onOpenOrderModal: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenOrderModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');

  const quickStarters = [
    'Halo Kurties Food, saya mau tanya paket nasi kotak untuk acara syukuran...',
    'Halo, bisa minta info paket prasmanan hajatan pernikahan di Gandrungmangu?',
    'Halo, apakah melayani pengantaran katering ke alamat kami?'
  ];

  const handleSendCustom = () => {
    const text = quickMessage.trim() || 'Halo Kurties Food Karanggintung Gandrungmangu, saya ingin konsultasi katering.';
    const url = buildWhatsAppUrl(CATERING_CONTACT.whatsappRaw, text);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleStarterClick = (msg: string) => {
    const url = buildWhatsAppUrl(CATERING_CONTACT.whatsappRaw, msg);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      
      {/* Quick Chat Popover Window in Cream & Brown */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#FAF4EB] rounded-3xl shadow-2xl border border-[#D5C4B0] overflow-hidden animate-in fade-in slide-in-from-bottom-3">
          
          {/* Chat Popover Header */}
          <div className="bg-[#3B2214] text-white p-4 flex items-center justify-between border-b border-[#52331F]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xs bg-white shrink-0">
                <img
                  src={KURTIES_LOGO}
                  alt="Kurties Food Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display leading-tight">Kurties Food WhatsApp</h4>
                <div className="text-[11px] text-[#E6AA68] font-bold">
                  Karanggintung, Gandrungmangu
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#DFC8B4] hover:text-white rounded-xl hover:bg-[#2A180E] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-3 text-xs bg-[#FAF4EB]">
            <div className="bg-[#EFE5D6] p-3.5 rounded-2xl border border-[#D5C4B0] shadow-2xs text-[#362216] leading-relaxed font-bold">
              Halo! Ada yang bisa kami bantu seputar pesanan nasi kotak, prasmanan, atau tumpeng untuk acara Anda di Gandrungmangu & Cilacap?
            </div>

            {/* Starter templates */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6F523E]">
                Pilih topik chat cepat:
              </div>
              {quickStarters.map((msg, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleStarterClick(msg)}
                  className="w-full text-left p-2.5 rounded-xl bg-[#F6EFE5] hover:bg-[#EAE0D0] text-[#362216] hover:text-[#2B170C] border border-[#D5C4B0] hover:border-[#8B532E] transition-all text-[11px] font-bold"
                >
                  "{msg}"
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendCustom()}
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-[#CFBCAB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 focus:border-[#7A4B28] text-[#362216]"
                />
                <button
                  type="button"
                  onClick={handleSendCustom}
                  className="p-2.5 bg-[#7A4B28] hover:bg-[#653C1E] text-white rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Direct full order form link */}
            <div className="pt-2 border-t border-[#DFD0BD] text-center">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenOrderModal();
                }}
                className="text-xs font-bold text-[#7A4B28] hover:underline"
              >
                Buka Formulir Pesanan Lengkap &rarr;
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Floating Trigger Button in Coklat Muda (Light Brown) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#7A4B28] hover:bg-[#653C1E] active:bg-[#523016] text-[#FDFBF7] rounded-full shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer font-bold text-sm border-2 border-[#D8C7B2]"
        aria-label="Chat WhatsApp Kurties Food"
      >
        <MessageCircle className="w-5 h-5 fill-white/20" />
        <span className="hidden sm:inline">Layanan WhatsApp</span>
      </button>

    </div>
  );
};
