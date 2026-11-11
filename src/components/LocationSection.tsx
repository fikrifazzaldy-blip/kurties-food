import React from 'react';
import { MapPin, Clock, Phone, Navigation, CheckCircle, Truck, ExternalLink } from 'lucide-react';
import { CATERING_CONTACT, KURTIES_LOGO } from '../data/cateringData';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const LocationSection: React.FC = () => {
  const gmapsQuery = encodeURIComponent(`${CATERING_CONTACT.name}, Karanggintung RT 3 RW 4, Gandrungmangu, Cilacap, Jawa Tengah`);
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${gmapsQuery}`;

  const askLocationWaUrl = buildWhatsAppUrl(
    CATERING_CONTACT.whatsappRaw,
    'Halo Kurties Food, saya ingin menanyakan lokasi dapur di Karanggintung RT 3 RW 4 Gandrungmangu untuk survei / ambil pesanan langsung. Bisa share live location?'
  );

  return (
    <section id="lokasi" className="py-16 lg:py-24 bg-[#F4ECE1] text-[#342013] border-b border-[#D8C7B2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8B532E]">Dapur & Jangkauan Pengantaran</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#2B170C] mt-1">
            Lokasi Dapur Kurties Food Gandrungmangu
          </h2>
          <p className="text-sm sm:text-base text-[#523828] mt-2 leading-relaxed font-medium">
            Berada di Karanggintung Gandrungmangu, siap mengantar sajian katering dalam kondisi hangat, bersih, dan tepat waktu ke tempat acara Anda.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address Information & Delivery Coverage in Rich Cream (7 cols) */}
          <div className="lg:col-span-7 bg-[#EFE5D6] p-6 sm:p-8 rounded-3xl border border-[#D5C4B0] shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              {/* Primary Address */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#E5D7C4] border border-[#CBB69F]">
                <div className="w-11 h-11 rounded-2xl bg-[#F6EFE5] border border-[#BFA890] text-[#5C3517] flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5 text-[#8B532E]" />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#7A4B28]">Alamat Lengkap Dapur</div>
                  <h3 className="text-base sm:text-lg font-bold text-[#2B170C] mt-0.5">
                    Karanggintung RT 3 RW 4, Gandrungmangu, Cilacap, Jawa Tengah
                  </h3>
                  <p className="text-xs text-[#523828] mt-1 font-semibold">
                    Kecamatan Gandrungmangu, Kabupaten Cilacap, Jawa Tengah 53254
                  </p>
                </div>
              </div>

              {/* Operating Hours and Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#F6EFE5] border border-[#D8C7B2]">
                  <div className="flex items-center gap-2 text-[#4E3322] font-bold text-xs mb-1">
                    <Clock className="w-4 h-4 text-[#8B532E]" />
                    <span>Jam Operasional Dapur</span>
                  </div>
                  <p className="text-sm font-bold text-[#2B170C]">{CATERING_CONTACT.openingHours}</p>
                  <p className="text-[11px] text-[#6F523E] mt-0.5 font-semibold">Melayani pengantaran pagi untuk acara sarapan & syukuran</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F6EFE5] border border-[#D8C7B2]">
                  <div className="flex items-center gap-2 text-[#4E3322] font-bold text-xs mb-1">
                    <Phone className="w-4 h-4 text-[#8B532E]" />
                    <span>Kontak WhatsApp Resmi</span>
                  </div>
                  <p className="text-sm font-bold text-[#5C3517] tabular-nums">{CATERING_CONTACT.phoneDisplay}</p>
                  <p className="text-[11px] text-[#6F523E] mt-0.5 font-semibold">Siap melayani tanya jawab dan booking tanggal acara</p>
                </div>
              </div>

              {/* Delivery Area Coverage list */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#362216] mb-2.5">
                  <Truck className="w-4 h-4 text-[#7A4B28]" />
                  <span>Cakupan Wilayah Pengantaran Katering:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATERING_CONTACT.coverage.map((area, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 p-2 rounded-xl bg-[#F6EFE5] border border-[#D8C7B2] text-xs text-[#362216]"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#7A4B28] shrink-0" />
                      <span className="font-bold truncate">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#6F523E] mt-2 font-bold">
                  *Gratis ongkir untuk pengantaran wilayah terdekat Karanggintung & Gandrungmangu (S&K berlaku).
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-[#D5C4B0] flex flex-wrap gap-3">
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7A4B28] hover:bg-[#653C1E] active:bg-[#523016] text-[#FDFBF7] text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#F3B36E]" />
                <span>Buka Rute di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href={askLocationWaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#3D2314] hover:bg-[#2B170C] text-[#F7EFE5] text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
              >
                <span>Minta Share Lokasi WA</span>
              </a>
            </div>

          </div>

          {/* Right Column: Direction Guide in Deep Warm Espresso Brown (5 cols) */}
          <div className="lg:col-span-5 bg-[#3B2214] text-[#F7EFE5] p-6 sm:p-8 rounded-3xl border border-[#52331F] shadow-md flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#E6AA68]">Panduan Arah</div>
              <h3 className="text-xl font-bold font-display text-white mt-1">
                Akses Menuju Dapur Kami
              </h3>
              <p className="text-xs sm:text-sm text-[#DFC8B4] mt-2 leading-relaxed font-medium">
                Dapur Kurties Food bertempat di RT 3 RW 4 Desa Karanggintung, mudah dijangkau dengan akses jalan yang nyaman untuk kendaraan roda 2 maupun roda 4.
              </p>

              {/* Step by step directions */}
              <div className="mt-6 space-y-3.5 text-xs text-[#DFC8B4]">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#B26E3A] text-white font-extrabold flex items-center justify-center shrink-0 text-xs shadow-2xs">1</span>
                  <span>Dari Pasar Gandrungmangu atau Stasiun Gandrungmangu, ambil arah menuju Desa Karanggintung.</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#B26E3A] text-white font-extrabold flex items-center justify-center shrink-0 text-xs shadow-2xs">2</span>
                  <span>Masuk ke jalur RT 3 RW 4 Karanggintung (dapat tanya warga sekitar atau kontak WA admin kami).</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#B26E3A] text-white font-extrabold flex items-center justify-center shrink-0 text-xs shadow-2xs">3</span>
                  <span>Tersedia area parkir aman untuk pengambilan pesanan nasi kotak / tumpeng secara langsung (self pick-up).</span>
                </div>
              </div>
            </div>

            {/* Clean Map Box */}
            <div className="mt-8 pt-6 border-t border-[#52331F] bg-[#2A180E] p-4 rounded-2xl border border-[#442817]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#BA9F8B] font-mono text-[11px]">PETA GANDRUNGMANGU</span>
                <span className="text-[#E6AA68] text-[11px] font-bold">CILACAP, JAWA TENGAH</span>
              </div>
              <div className="h-28 rounded-xl bg-[#3B2214] border border-[#52331F] flex flex-col items-center justify-center text-center p-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white mb-1 shadow-sm bg-white">
                  <img src={KURTIES_LOGO} alt="Kurties Food Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-white">Dapur Kurties Food</span>
                <span className="text-[10px] text-[#DFC8B4]">RT 3 RW 4 Karanggintung, Gandrungmangu</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
