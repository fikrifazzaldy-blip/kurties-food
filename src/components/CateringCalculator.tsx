import React, { useState, useMemo } from 'react';
import { Calculator, Users, MessageCircle, ShieldCheck } from 'lucide-react';
import { formatRupiah, buildWhatsAppUrl } from '../utils/whatsapp';
import { CATERING_CONTACT } from '../data/cateringData';

export const CateringCalculator: React.FC = () => {
  const [eventType, setEventType] = useState('Pernikahan / Resepsi');
  const [portions, setPortions] = useState(150);
  const [packageType, setPackageType] = useState<'kotak_standar' | 'kotak_spesial' | 'prasmanan_berkah' | 'prasmanan_vip'>('prasmanan_berkah');
  const [includeDessert, setIncludeDessert] = useState(true);
  const [includeSnack, setIncludeSnack] = useState(false);
  const [includePrasaji, setIncludePrasaji] = useState(true);

  const eventOptions = [
    'Pernikahan / Resepsi',
    'Khitanan',
    'Syukuran / Selamatan',
    'Pengajian / Tahlil',
    'Rapat / Pertemuan Kantor',
    'Arisan / Reuni Keluarga'
  ];

  const packagePricing = {
    kotak_standar: {
      name: 'Nasi Kotak Standar (Ayam Kremes/Bakar)',
      basePrice: 22000,
      type: 'Nasi Kotak'
    },
    kotak_spesial: {
      name: 'Nasi Kotak Spesial (Ayam Madu + Daging Sapi)',
      basePrice: 30000,
      type: 'Nasi Kotak'
    },
    prasmanan_berkah: {
      name: 'Prasmanan Berkah (Lengkap 4 Lauk + Sayur + Sop)',
      basePrice: 38000,
      type: 'Prasmanan'
    },
    prasmanan_vip: {
      name: 'Prasmanan Hajatan Mewah (Rendang + Gurame + Sop Manten)',
      basePrice: 48000,
      type: 'Prasmanan'
    }
  };

  const calculation = useMemo(() => {
    const pkg = packagePricing[packageType];
    let pricePerPortion = pkg.basePrice;
    
    if (includeDessert) pricePerPortion += 4000;
    if (includeSnack) pricePerPortion += 10000;

    let foodTotal = pricePerPortion * portions;
    let serviceFee = (packageType.startsWith('prasmanan') && includePrasaji) ? 250000 : 0;
    let grandTotal = foodTotal + serviceFee;
    let bufferPortion = Math.ceil(portions * 1.1); // +10% rekomendasi

    return {
      pkg,
      pricePerPortion,
      foodTotal,
      serviceFee,
      grandTotal,
      bufferPortion
    };
  }, [packageType, portions, includeDessert, includeSnack, includePrasaji]);

  const handleSendToWA = () => {
    const msg = [
      `*ESTIMASI ANGGARAN KATERING - KURTIES FOOD*`,
      `_Dihitung melalui Kalkulator Katering Kurties Food_`,
      `------------------------------------------`,
      `• Jenis Acara      : ${eventType}`,
      `• Jumlah Tamu      : ${portions} Porsi (Disarankan ${calculation.bufferPortion} Porsi)`,
      `• Pilihan Paket    : ${calculation.pkg.name}`,
      `• Minuman/Dessert  : ${includeDessert ? 'Ya (Es Buah / Puding)' : 'Tidak'}`,
      `• Snack Box Tambah : ${includeSnack ? 'Ya (3 Macam Kue Basah)' : 'Tidak'}`,
      `• Layanan Meja/Wait: ${calculation.serviceFee > 0 ? 'Ya (Termasuk Chafing Dish & Staf)' : 'Tidak'}`,
      `------------------------------------------`,
      `*Estimasi Biaya / Porsi : ${formatRupiah(calculation.pricePerPortion)}*`,
      `*ESTIMASI TOTAL ANGGARAN: ${formatRupiah(calculation.grandTotal)}*`,
      `------------------------------------------`,
      `Halo Admin Kurties Food Karanggintung Gandrungmangu, saya ingin konsultasi lebih lanjut terkait estimasi di atas untuk acara kami. Apakah tanggal masih tersedia?`
    ].join('\n');

    const url = buildWhatsAppUrl(CATERING_CONTACT.whatsappRaw, msg);
    window.open(url, '_blank');
  };

  return (
    <section id="kalkulator" className="py-16 lg:py-24 bg-[#ECE2D3] text-[#342013] border-b border-[#D8C7B2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8B532E]">Simulasi Anggaran Transparan</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#2B170C] mt-1">
            Kalkulator Porsi & Budget Katering
          </h2>
          <p className="text-sm sm:text-base text-[#523828] mt-2 leading-relaxed font-medium">
            Sesuaikan jumlah tamu, tipe jamuan, dan menu tambahan. Dapatkan estimasi total biaya secara langsung tanpa biaya tersembunyi.
          </p>
        </div>

        {/* 2-Column Calculator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Controls in rich cream container (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-[#F6EFE5] p-6 sm:p-8 rounded-3xl border border-[#D5C4B0] shadow-sm">
            
            {/* Event Type selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#362216] mb-2.5">
                1. Pilih Jenis Acara
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {eventOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setEventType(opt)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl text-left transition-all border cursor-pointer ${
                      eventType === opt
                        ? 'bg-[#7A4B28] text-white border-[#7A4B28] shadow-xs'
                        : 'bg-[#EFE5D6] text-[#4E3322] border-[#D5C4B0] hover:bg-[#EAE0D0] hover:text-[#2B170C]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Portion Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#362216]">
                  2. Jumlah Porsi / Tamu Undangan
                </label>
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#5C3517] bg-[#EAE0D0] px-3.5 py-1 rounded-xl border border-[#CFBCAB] tabular-nums shadow-2xs">
                  <Users className="w-4 h-4 text-[#8B532E]" />
                  <span>{portions} Porsi</span>
                </div>
              </div>

              <input
                type="range"
                min={25}
                max={800}
                step={25}
                value={portions}
                onChange={(e) => setPortions(parseInt(e.target.value))}
                className="w-full h-2.5 bg-[#D8C7B2] rounded-lg appearance-none cursor-pointer accent-[#7A4B28]"
              />

              <div className="flex justify-between text-[11px] text-[#6F523E] mt-1 tabular-nums font-bold">
                <span>25 Porsi (Min)</span>
                <span>200 Porsi</span>
                <span>500 Porsi</span>
                <span>800+ Porsi</span>
              </div>
            </div>

            {/* Package Format */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#362216] mb-2.5">
                3. Format Sajian & Tingkat Paket
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(packagePricing) as Array<keyof typeof packagePricing>).map((key) => {
                  const item = packagePricing[key];
                  const isSelected = packageType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPackageType(key)}
                      className={`p-3.5 text-left rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#EAE0D0] border-[#7A4B28] ring-2 ring-[#7A4B28]/25 shadow-xs'
                          : 'bg-[#F2E8DC] border-[#D5C4B0] hover:border-[#BAA288]'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[11px] font-extrabold text-[#8B532E] uppercase tracking-wide">
                          {item.type}
                        </span>
                        <span className="text-xs font-extrabold text-[#5C3517] tabular-nums">
                          {formatRupiah(item.basePrice)}/porsi
                        </span>
                      </div>
                      <div className="text-sm font-bold text-[#2B170C] mt-1">
                        {item.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Addons Checkboxes in cream */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#362216] mb-2.5">
                4. Opsi Menu Tambahan (Opsional)
              </label>
              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3.5 bg-[#F2E8DC] rounded-2xl border border-[#D5C4B0] hover:border-[#BAA288] cursor-pointer shadow-2xs">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeDessert}
                      onChange={(e) => setIncludeDessert(e.target.checked)}
                      className="w-4 h-4 text-[#7A4B28] rounded border-[#BAA288] focus:ring-[#8B532E]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2B170C]">Tambahan Es Buah / Puding Vla Segar</div>
                      <div className="text-[11px] text-[#6F523E] font-medium">Penyegar manis penutup jamuan acara</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#7A4B28] tabular-nums">+Rp 4.000 /porsi</span>
                </label>

                <label className="flex items-center justify-between p-3.5 bg-[#F2E8DC] rounded-2xl border border-[#D5C4B0] hover:border-[#BAA288] cursor-pointer shadow-2xs">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeSnack}
                      onChange={(e) => setIncludeSnack(e.target.checked)}
                      className="w-4 h-4 text-[#7A4B28] rounded border-[#BAA288] focus:ring-[#8B532E]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2B170C]">Tambahan Snack Box Pembuka (3 Macam Kue)</div>
                      <div className="text-[11px] text-[#6F523E] font-medium">Untuk disajikan di awal kedatangan tamu</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#7A4B28] tabular-nums">+Rp 10.000 /porsi</span>
                </label>

                {packageType.startsWith('prasmanan') && (
                  <label className="flex items-center justify-between p-3.5 bg-[#F2E8DC] rounded-2xl border border-[#D5C4B0] hover:border-[#BAA288] cursor-pointer shadow-2xs">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includePrasaji}
                        onChange={(e) => setIncludePrasaji(e.target.checked)}
                        className="w-4 h-4 text-[#7A4B28] rounded border-[#BAA288] focus:ring-[#8B532E]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#2B170C]">Peralatan Pemanas & 2 Staf Prasaji Standby</div>
                        <div className="text-[11px] text-[#6F523E] font-medium">Meja prasmanan rapi terjaga sepanjang acara</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#7A4B28] tabular-nums">+Rp 250.000 flat</span>
                  </label>
                )}
              </div>
            </div>

          </div>

          {/* Right Summary Card in Deep Warm Espresso Brown (5 cols) */}
          <div className="lg:col-span-5 bg-[#3B2214] text-[#F7EFE5] p-6 sm:p-8 rounded-3xl border border-[#54331F] shadow-xl space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center justify-between border-b border-[#54331F] pb-4">
              <div>
                <span className="text-xs font-bold text-[#E6AA68] uppercase tracking-wider">Ringkasan Estimasi</span>
                <h3 className="text-xl font-bold font-display text-white">{eventType}</h3>
              </div>
              <div className="p-2.5 bg-[#2A180E] rounded-xl text-[#E6AA68]">
                <Calculator className="w-5 h-5" />
              </div>
            </div>

            {/* Itemized calculation breakdown */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between text-[#DFC8B4] font-medium">
                <span>Jumlah Porsi:</span>
                <span className="font-bold text-white tabular-nums">{portions} Porsi</span>
              </div>

              <div className="flex justify-between text-[#DFC8B4] font-medium">
                <span>Paket Sajian:</span>
                <span className="font-bold text-white text-right max-w-[200px] truncate">{calculation.pkg.name}</span>
              </div>

              <div className="flex justify-between text-[#DFC8B4] font-medium">
                <span>Biaya per Porsi:</span>
                <span className="font-bold text-[#F3B36E] tabular-nums">{formatRupiah(calculation.pricePerPortion)}</span>
              </div>

              {calculation.serviceFee > 0 && (
                <div className="flex justify-between text-[#DFC8B4] font-medium">
                  <span>Peralatan & Staf Prasaji:</span>
                  <span className="font-bold text-white tabular-nums">{formatRupiah(calculation.serviceFee)}</span>
                </div>
              )}

              {/* Buffer recommendation tip */}
              <div className="bg-[#2A180E]/90 p-3.5 rounded-2xl border border-[#482B1A] text-xs text-[#DFC8B4] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#E6AA68] shrink-0 mt-0.5" />
                <span>
                  <strong>Saran Kami:</strong> Untuk {portions} undangan, siapkan cadangan aman sekitar <strong className="text-[#F3B36E]">{calculation.bufferPortion} porsi</strong> agar hidangan tidak kurang saat kerabat bertambah.
                </span>
              </div>
            </div>

            {/* Grand Total in Warm Golden Toffee */}
            <div className="pt-4 border-t border-[#54331F]">
              <div className="text-xs text-[#DFC8B4] font-medium">Perkiraan Total Anggaran:</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#F3B36E] font-display tabular-nums mt-0.5">
                {formatRupiah(calculation.grandTotal)}
              </div>
              <div className="text-[11px] text-[#BA9F8B] mt-1 font-medium">
                *Harga estimasi dapat disesuaikan kembali dengan pemilihan variasi lauk.
              </div>
            </div>

            {/* WA Action Button in Warm Toffee Brown */}
            <button
              type="button"
              onClick={handleSendToWA}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-[#B26E3A] hover:bg-[#9B5C2B] active:bg-[#864C20] text-[#FDFBF7] font-extrabold text-sm transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Kirim Rincian ini ke WhatsApp</span>
            </button>

            <p className="text-[11px] text-center text-[#BA9F8B] font-medium">
              Langsung tersambung ke WhatsApp Kurties Food Karanggintung Gandrungmangu.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
