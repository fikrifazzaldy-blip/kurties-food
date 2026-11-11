import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, Calendar, Clock, MapPin, User, Phone, FileText } from 'lucide-react';
import { CartItem, CustomerOrder } from '../types/catering';
import { generateWhatsAppMessage, buildWhatsAppUrl, formatRupiah } from '../utils/whatsapp';
import { CATERING_CONTACT, KURTIES_LOGO } from '../data/cateringData';

interface WhatsAppOrderFormProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const WhatsAppOrderForm: React.FC<WhatsAppOrderFormProps> = ({
  cart,
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const [formData, setFormData] = useState<CustomerOrder>({
    customerName: '',
    whatsappNumber: '',
    eventDate: '',
    eventTime: '11:00',
    eventType: 'Syukuran / Hajatan',
    deliveryAddress: 'Karanggintung, Kec. Gandrungmangu',
    specialNotes: '',
    paymentMethod: 'dp_transfer'
  });

  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const quickAddresses = [
    'Karanggintung RT 3 RW 4, Gandrungmangu',
    'Desa Gandrungmanis, Gandrungmangu',
    'Desa Cinanggu, Gandrungmangu',
    'Desa Cisumur, Gandrungmangu',
    'Kecamatan Sidareja, Cilacap',
    'Kecamatan Bantarsari, Cilacap'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.customerName.trim()) errs.customerName = 'Nama pemesan wajib diisi';
    if (!formData.whatsappNumber.trim()) errs.whatsappNumber = 'Nomor WhatsApp wajib diisi';
    if (!formData.eventDate) errs.eventDate = 'Tanggal acara wajib dipilih';
    if (!formData.deliveryAddress.trim()) errs.deliveryAddress = 'Alamat pengiriman wajib diisi';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const formattedMessage = generateWhatsAppMessage(cart, formData, total);

  const handleSendWA = () => {
    if (!validate()) return;
    const url = buildWhatsAppUrl(CATERING_CONTACT.whatsappRaw, formattedMessage);
    
    // Save to local storage history
    try {
      const existing = JSON.parse(localStorage.getItem('kurties_orders_history') || '[]');
      existing.unshift({
        ...formData,
        id: 'KF-' + Date.now().toString().slice(-6),
        createdAt: new Date().toISOString(),
        cartCount: cart.length,
        totalAmount: total
      });
      localStorage.setItem('kurties_orders_history', JSON.stringify(existing.slice(0, 10)));
    } catch {
      // ignore
    }

    onOrderSuccess(formData);
    window.open(url, '_blank');
  };

  const handleCopyText = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#FAF4EB] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#D5C4B0] animate-in fade-in zoom-in-95 my-auto">
        
        {/* Header in Deep Warm Espresso */}
        <div className="sticky top-0 z-10 bg-[#3B2214] text-white px-6 py-4 flex items-center justify-between border-b border-[#52331F]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-white shrink-0 shadow-xs">
              <img src={KURTIES_LOGO} alt="Kurties Food Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#E6AA68] font-bold">Layanan Pesan Langsung</div>
              <h3 className="text-base sm:text-lg font-bold font-display">Formulir WhatsApp Kurties Food</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#DFC8B4] hover:text-white rounded-xl hover:bg-[#2A180E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Order Summary in cream box */}
          <div className="bg-[#EFE5D6] border border-[#D5C4B0] rounded-2xl p-4">
            <div className="text-xs font-bold text-[#5C3517] uppercase tracking-wide">Ringkasan Pesanan Anda:</div>
            {cart.length > 0 ? (
              <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-[#362216] font-medium">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span>{item.quantity}x {item.item.name}</span>
                    <span className="font-bold text-[#2B170C] tabular-nums">{formatRupiah(item.item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#D5C4B0] flex justify-between font-bold text-[#2B170C] text-sm sm:text-base">
                  <span>Total Estimasi ({cart.reduce((s, i) => s + i.quantity, 0)} Porsi):</span>
                  <span className="text-[#7A4B28] tabular-nums font-extrabold">{formatRupiah(total)}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#523828] mt-1 font-medium">
                Keranjang masih kosong. Anda dapat mengisi form ini untuk konsultasi pesanan katering khusus secara fleksibel.
              </p>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4 text-xs sm:text-sm">
            
            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#362216] font-bold mb-1">
                  Nama Pemesan *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8E745E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Contoh: Ibu Rina / Bpk. Sugeng"
                    className={`w-full pl-9 pr-3 py-2.5 bg-[#FAF4EB] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 text-[#362216] font-medium ${
                      errors.customerName ? 'border-red-500' : 'border-[#CFBCAB] focus:border-[#7A4B28]'
                    }`}
                  />
                </div>
                {errors.customerName && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.customerName}</p>}
              </div>

              <div>
                <label className="block text-[#362216] font-bold mb-1">
                  Nomor WhatsApp Pemesan *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8E745E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="Contoh: 081234567890"
                    className={`w-full pl-9 pr-3 py-2.5 bg-[#FAF4EB] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 text-[#362216] font-medium ${
                      errors.whatsappNumber ? 'border-red-500' : 'border-[#CFBCAB] focus:border-[#7A4B28]'
                    }`}
                  />
                </div>
                {errors.whatsappNumber && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.whatsappNumber}</p>}
              </div>
            </div>

            {/* Event Type & Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#362216] font-bold mb-1">
                  Jenis Acara
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[#CFBCAB] rounded-xl bg-[#FAF4EB] focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 focus:border-[#7A4B28] text-[#362216] font-bold"
                >
                  <option value="Syukuran / Hajatan">Syukuran / Hajatan</option>
                  <option value="Pernikahan / Resepsi">Pernikahan / Resepsi</option>
                  <option value="Khitanan">Khitanan</option>
                  <option value="Pengajian / Tahlil">Pengajian / Tahlil</option>
                  <option value="Rapat Kantor / Seminar">Rapat Kantor / Seminar</option>
                  <option value="Ulang Tahun / Reuni">Ulang Tahun / Reuni</option>
                  <option value="Acara Keluarga Lainnya">Acara Keluarga Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-[#362216] font-bold mb-1">
                  Tanggal Acara *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#8E745E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 bg-[#FAF4EB] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 text-[#362216] font-medium ${
                      errors.eventDate ? 'border-red-500' : 'border-[#CFBCAB] focus:border-[#7A4B28]'
                    }`}
                  />
                </div>
                {errors.eventDate && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.eventDate}</p>}
              </div>

              <div>
                <label className="block text-[#362216] font-bold mb-1">
                  Jam Pengantaran
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#8E745E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="time"
                    value={formData.eventTime}
                    onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF4EB] border border-[#CFBCAB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 focus:border-[#7A4B28] text-[#362216] font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-[#362216] font-bold mb-1">
                Alamat Lengkap Pengiriman Acara *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#8E745E] absolute left-3 top-3" />
                <textarea
                  rows={2}
                  required
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  placeholder="Nama jalan, RT/RW, Dusun, Desa, Kecamatan, patokan rumah..."
                  className={`w-full pl-9 pr-3 py-2.5 bg-[#FAF4EB] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 text-[#362216] font-medium ${
                    errors.deliveryAddress ? 'border-red-500' : 'border-[#CFBCAB] focus:border-[#7A4B28]'
                  }`}
                />
              </div>
              {errors.deliveryAddress && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.deliveryAddress}</p>}

              {/* Quick Area Buttons */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[11px] text-[#6F523E] self-center font-bold">Pilihan cepat:</span>
                {quickAddresses.map((addr) => (
                  <button
                    key={addr}
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryAddress: addr })}
                    className="text-[11px] bg-[#EFE5D6] hover:bg-[#E5D7C4] text-[#362216] px-2.5 py-1 rounded-lg border border-[#D5C4B0] transition-colors font-bold"
                  >
                    {addr}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Notes & Payment preference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#362216] font-bold mb-1">
                  Catatan / Request Khusus (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="Misal: Sambal dipisah, minta sendok..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF4EB] border border-[#CFBCAB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 focus:border-[#7A4B28] text-[#362216] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#362216] font-bold mb-1">
                  Rencana Pembayaran
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 border border-[#CFBCAB] rounded-xl bg-[#FAF4EB] focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 focus:border-[#7A4B28] text-[#362216] font-bold"
                >
                  <option value="dp_transfer">DP Transfer Bank (30-50%) - Terpopuler</option>
                  <option value="cod">Bayar Tunai saat Pengantaran (COD)</option>
                  <option value="cash_dapur">Bayar Tunai Langsung di Dapur Karanggintung</option>
                </select>
              </div>
            </div>

            {/* Live Preview Accordion / Box in cream */}
            <div className="border border-[#D5C4B0] rounded-2xl overflow-hidden bg-[#FAF4EB]">
              <div className="px-4 py-2.5 bg-[#EFE5D6] border-b border-[#D5C4B0] flex items-center justify-between">
                <span className="text-xs font-bold text-[#5C3517] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#8B532E]" />
                  Pratinjau Format Pesan WhatsApp:
                </span>
                <span className="text-[11px] text-[#6F523E] font-bold">Tersusun Otomatis Rapi</span>
              </div>
              <pre className="p-3.5 text-[11px] font-mono text-[#2B170C] whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed bg-[#FAF4EB]">
                {formattedMessage}
              </pre>
            </div>

          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSendWA}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#7A4B28] hover:bg-[#653C1E] active:bg-[#523016] text-[#FDFBF7] font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Buka & Kirim Pesanan via WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#EFE5D6] hover:bg-[#E5D7C4] text-[#362216] font-bold text-xs transition-colors cursor-pointer border border-[#D5C4B0]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#7A4B28]" />
                  <span className="text-[#7A4B28]">Teks Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#6F523E]" />
                  <span>Salin Teks Format</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[11px] text-center text-[#6F523E] font-bold">
            Nomor Tujuan Resmi Kurties Food: <strong>{CATERING_CONTACT.phoneDisplay}</strong> (Alamat Dapur: Karanggintung RT 3 RW 4, Gandrungmangu).
          </div>

        </div>

      </div>
    </div>
  );
};
