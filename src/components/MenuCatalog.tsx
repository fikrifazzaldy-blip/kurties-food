import React, { useState } from 'react';
import { Search, Plus, Minus, ShoppingBag, Eye, Check, MessageCircle, X } from 'lucide-react';
import { MenuItem, CategoryType } from '../types/catering';
import { MENU_ITEMS } from '../data/cateringData';
import { formatRupiah } from '../utils/whatsapp';

interface MenuCatalogProps {
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void;
  onQuickOrderWA: (item: MenuItem, quantity: number) => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({
  onAddToCart,
  onQuickOrderWA
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [detailModalItem, setDetailModalItem] = useState<MenuItem | null>(null);
  const [modalNotes, setModalNotes] = useState('');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'Semua Menu' },
    { id: 'nasi-kotak', label: 'Nasi Kotak' },
    { id: 'prasmanan', label: 'Prasmanan Hajatan' },
    { id: 'tumpeng', label: 'Tumpeng & Berkat' },
    { id: 'snack-box', label: 'Snack Box' }
  ];

  const getQuantity = (item: MenuItem) => {
    return quantities[item.id] || item.minOrder;
  };

  const handleUpdateQty = (item: MenuItem, delta: number) => {
    const current = getQuantity(item);
    const updated = Math.max(item.minOrder, current + delta);
    setQuantities(prev => ({ ...prev, [item.id]: updated }));
  };

  const handleSetCustomQty = (item: MenuItem, val: number) => {
    const clamped = Math.max(item.minOrder, val || item.minOrder);
    setQuantities(prev => ({ ...prev, [item.id]: clamped }));
  };

  const handleAdd = (item: MenuItem) => {
    const qty = getQuantity(item);
    onAddToCart(item, qty);
    setAddedToast(item.name);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.includes.some(inc => inc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#F4ECE1] text-[#342013] border-b border-[#D8C7B2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8B532E]">Pricelist & Paket</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#2B170C] mt-1">
              Pilihan Menu Katering Kurties Food
            </h2>
            <p className="text-sm sm:text-base text-[#523828] mt-2 max-w-2xl leading-relaxed">
              Porsi pas, cita rasa gurih rempah rumahan khas Cilacap, disajikan rapi higienis. Sesuaikan dengan anggaran dan tema acara Anda di Gandrungmangu.
            </p>
          </div>

          {/* Search Bar in cream tone */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E745E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari menu, lauk, sop..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FAF4EB] border border-[#CFBCAB] rounded-xl text-[#362216] placeholder-[#8E745E] focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 focus:border-[#7A4B28] transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E745E] hover:text-[#362216]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs in cream container */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#E5D7C4] rounded-2xl overflow-x-auto scrollbar-none mb-10 max-w-fit border border-[#CBB8A1]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#7A4B28] text-[#FDFBF7] shadow-sm'
                    : 'text-[#523828] hover:text-[#2B170C] hover:bg-[#FAF4EB]/70'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Added Toast Notification */}
        {addedToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#362216] text-[#FDFBF7] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-bold border border-[#5A3B28] animate-in fade-in slide-in-from-bottom-2">
            <Check className="w-4 h-4 text-[#D89B65]" />
            <span>Berhasil ditambahkan ke Keranjang: <strong>{addedToast}</strong></span>
          </div>
        )}

        {/* Product Cards Grid - 3 Column Layout in Cream Cards */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#EFE5D6] rounded-2xl border border-[#D5C4B0] p-8">
            <p className="text-base text-[#523828] font-bold">Menu tidak ditemukan untuk kata kunci "{searchQuery}".</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-sm text-[#7A4B28] hover:underline font-bold"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const qty = getQuantity(item);
              const subtotal = item.price * qty;

              return (
                <div
                  key={item.id}
                  className="bg-[#EFE5D6] rounded-2xl border border-[#D5C4B0] overflow-hidden flex flex-col hover:border-[#8B532E] hover:shadow-xl transition-all duration-300 group shadow-2xs"
                >
                  {/* Image Container with 4:3 Aspect Ratio */}
                  <div className="relative aspect-[4/3] bg-[#E2D4C1] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Coklat Muda badge for popularity */}
                    {item.popular && (
                      <span className="absolute top-3 left-3 bg-[#8B532E] text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm tracking-wide">
                        Menu Favorit
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setDetailModalItem(item);
                        setModalNotes('');
                      }}
                      className="absolute bottom-3 right-3 bg-[#FAF4EB]/95 hover:bg-[#FAF4EB] text-[#362216] p-2 rounded-xl text-xs font-bold shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer border border-[#CDBAA3]"
                      title="Lihat Rincian Lauk"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#7A4B28]" />
                      <span>Rincian Lauk</span>
                    </button>
                  </div>

                  {/* Content Container */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Category & Min Order Metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#6F523E] mb-1 font-bold">
                        <span className="capitalize">{item.category.replace('-', ' ')}</span>
                        <span aria-hidden="true" className="text-[#C4B29E]">·</span>
                        <span>Min. {item.minOrder} {item.unit}</span>
                      </div>

                      {/* Item Title */}
                      <h3 className="text-lg font-bold font-display text-[#2B170C] group-hover:text-[#7A4B28] transition-colors leading-snug">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#523828] mt-2 line-clamp-2 leading-relaxed font-medium">
                        {item.description}
                      </p>

                      {/* Dish highlights in cream box */}
                      <div className="mt-3 text-xs text-[#3D2516] bg-[#E5D7C4] p-2.5 rounded-xl border border-[#CBB69F]">
                        <span className="font-extrabold text-[#5C3517]">Termasuk: </span>
                        <span>{item.highlights.join(' · ')}</span>
                      </div>
                    </div>

                    {/* Price & Quantity & Actions */}
                    <div className="pt-4 border-t border-[#DFD0BD] space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-[11px] text-[#6F523E] font-bold">Harga Satuan</div>
                          <div className="text-xl font-bold text-[#5C3517] font-display tabular-nums">
                            {formatRupiah(item.price)}
                            <span className="text-xs font-semibold text-[#6F523E]"> /{item.unit}</span>
                          </div>
                        </div>

                        {/* Quantity Stepper in cream */}
                        <div className="flex items-center bg-[#E5D7C4] rounded-xl p-1 border border-[#CBB69F]">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(item, -5)}
                            disabled={qty <= item.minOrder}
                            className="w-7 h-7 flex items-center justify-center text-[#523828] hover:text-[#2B170C] disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
                            aria-label="Kurangi porsi"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <input
                            type="number"
                            value={qty}
                            min={item.minOrder}
                            onChange={(e) => handleSetCustomQty(item, parseInt(e.target.value) || item.minOrder)}
                            className="w-12 text-center text-xs font-bold text-[#2B170C] bg-transparent focus:outline-none tabular-nums"
                          />

                          <button
                            type="button"
                            onClick={() => handleUpdateQty(item, 5)}
                            className="w-7 h-7 flex items-center justify-center text-[#523828] hover:text-[#2B170C] transition-colors font-bold"
                            aria-label="Tambah porsi"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal preview */}
                      <div className="text-xs text-[#6F523E] flex justify-between items-center font-bold">
                        <span>Subtotal ({qty} {item.unit}):</span>
                        <span className="font-extrabold text-[#2B170C] tabular-nums">{formatRupiah(subtotal)}</span>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleAdd(item)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#3D2314] hover:bg-[#2B170C] active:bg-[#1E0F07] text-[#FAF4EB] text-xs font-bold transition-all cursor-pointer shadow-xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#E6AA68]" />
                          <span>+ Keranjang</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onQuickOrderWA(item, qty)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#7A4B28] hover:bg-[#653C1E] active:bg-[#523016] text-[#FDFBF7] text-xs font-bold transition-all cursor-pointer shadow-xs"
                          title="Langsung chat WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
                          <span>Pesan WA</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Package Detail Modal in Cream & Brown */}
      {detailModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#FAF4EB] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-[#D5C4B0] space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase font-extrabold text-[#8B532E] tracking-wider">{detailModalItem.category}</span>
                <h3 className="text-xl font-bold font-display text-[#2B170C]">{detailModalItem.name}</h3>
                <p className="text-xs text-[#6F523E] mt-0.5 font-bold">Min. Order {detailModalItem.minOrder} {detailModalItem.unit}</p>
              </div>
              <button
                type="button"
                onClick={() => setDetailModalItem(null)}
                className="p-1.5 text-[#8E745E] hover:text-[#2B170C] rounded-xl hover:bg-[#EAE0D2] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#E2D4C1] border border-[#CFBCAB]">
              <img
                src={detailModalItem.image}
                alt={detailModalItem.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-sm text-[#523828] leading-relaxed font-medium">
              {detailModalItem.description}
            </p>

            {/* Complete Inclusions List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B170C] mb-2.5">
                Daftar Isi & Lauk Lengkap:
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#362216] bg-[#EFE5D6] p-4 rounded-2xl border border-[#D5C4B0]">
                {detailModalItem.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-bold">
                    <Check className="w-4 h-4 text-[#7A4B28] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Notes input */}
            <div>
              <label className="block text-xs font-bold text-[#362216] mb-1">
                Catatan Khusus (Opsional, misal: Pedas sedang / kuah dipisah):
              </label>
              <input
                type="text"
                value={modalNotes}
                onChange={(e) => setModalNotes(e.target.value)}
                placeholder="Contoh: Tanpa jeroan, sambal dipisah..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF4EB] border border-[#CFBCAB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B532E]/30 focus:border-[#7A4B28] text-[#362216]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#DFD0BD]">
              <div>
                <span className="text-xs text-[#6F523E] font-bold">Harga Satuan:</span>
                <div className="text-lg font-bold text-[#5C3517] font-display">
                  {formatRupiah(detailModalItem.price)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const qty = getQuantity(detailModalItem);
                    onAddToCart(detailModalItem, qty, modalNotes);
                    setAddedToast(detailModalItem.name);
                    setTimeout(() => setAddedToast(null), 2500);
                    setDetailModalItem(null);
                  }}
                  className="px-5 py-2.5 bg-[#7A4B28] hover:bg-[#653C1E] text-white rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
                >
                  Tambah ({getQuantity(detailModalItem)} {detailModalItem.unit})
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
