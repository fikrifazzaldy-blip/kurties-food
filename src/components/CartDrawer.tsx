import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/catering';
import { formatRupiah } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToOrder
}) => {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const totalPortions = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF4EB] w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 border-l border-[#D5C4B0]">
        
        {/* Header in Deep Espresso Brown */}
        <div className="p-4 sm:p-5 bg-[#3B2214] text-white flex items-center justify-between border-b border-[#52331F]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#E6AA68]" />
            <h3 className="text-base font-bold font-display">Keranjang Pesanan Katering</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#DFC8B4] hover:text-white rounded-xl hover:bg-[#2A180E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items list in Cream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#E2D4C1]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6F523E]">
              <div className="w-16 h-16 rounded-full bg-[#EFE5D6] flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-[#8B532E] stroke-[1.5]" />
              </div>
              <p className="text-sm font-bold text-[#2B170C]">Keranjang Anda masih kosong</p>
              <p className="text-xs text-[#6F523E] mt-1 max-w-xs font-medium">
                Pilih paket nasi kotak, prasmanan, tumpeng, atau snack box pada menu kami untuk memulai.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-5 py-2.5 bg-[#7A4B28] text-white text-xs font-bold rounded-xl hover:bg-[#653C1E] transition-colors shadow-xs"
              >
                Lihat Pilihan Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#6F523E] pb-2 font-bold">
                <span>{cart.length} Jenis Menu ({totalPortions} Porsi Total)</span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-red-700 hover:text-red-800 hover:underline flex items-center gap-1 font-bold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kosongkan</span>
                </button>
              </div>

              {cart.map((c) => (
                <div key={c.item.id} className="pt-3 pb-3 flex gap-3 items-start">
                  <img
                    src={c.item.image}
                    alt={c.item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-[#E2D4C1] shrink-0 border border-[#CFBCAB]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-[#2B170C] leading-snug truncate">
                        {c.item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(c.item.id)}
                        className="text-[#8E745E] hover:text-red-700 p-1 transition-colors"
                        title="Hapus dari keranjang"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs text-[#6F523E] mt-0.5 tabular-nums font-bold">
                      {formatRupiah(c.item.price)} /{c.item.unit}
                    </div>

                    {c.notes && (
                      <div className="text-[11px] text-[#5C3517] bg-[#EFE5D6] px-2 py-0.5 rounded-md mt-1 truncate border border-[#D5C4B0] font-bold">
                        Catatan: {c.notes}
                      </div>
                    )}

                    {/* Quantity modifier in cream */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center bg-[#E5D7C4] rounded-xl p-0.5 border border-[#CBB69F] shadow-2xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(c.item.id, Math.max(c.item.minOrder, c.quantity - 5))}
                          disabled={c.quantity <= c.item.minOrder}
                          className="w-6 h-6 flex items-center justify-center text-[#523828] hover:text-[#2B170C] disabled:opacity-30 disabled:cursor-not-allowed font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-xs font-bold text-[#2B170C] tabular-nums">
                          {c.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(c.item.id, c.quantity + 5)}
                          className="w-6 h-6 flex items-center justify-center text-[#523828] hover:text-[#2B170C] font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs sm:text-sm font-extrabold text-[#5C3517] tabular-nums">
                        {formatRupiah(c.item.price * c.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with subtotal and checkout in cream */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#EFE5D6] border-t border-[#D5C4B0] space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[#6F523E] font-bold">Total Estimasi Belanja:</span>
              <span className="text-xl font-bold font-display text-[#5C3517] tabular-nums">
                {formatRupiah(total)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToOrder();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#7A4B28] hover:bg-[#653C1E] active:bg-[#523016] text-[#FDFBF7] font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Lanjut Isi Data & Pesan via WA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-[#6F523E] font-bold">
              *Pesanan akan dikirim dalam format chat resmi ke WhatsApp Kurties Food
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
