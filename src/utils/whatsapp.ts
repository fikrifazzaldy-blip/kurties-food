import { CartItem, CustomerOrder } from '../types/catering';
import { CATERING_CONTACT } from '../data/cateringData';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateWhatsAppMessage(
  cart: CartItem[],
  order: CustomerOrder,
  customTotal?: number
): string {
  const total = customTotal !== undefined 
    ? customTotal 
    : cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const paymentLabels = {
    dp_transfer: 'DP Transfer Bank (30-50%)',
    cod: 'Bayar Tunai saat Antar (COD)',
    cash_dapur: 'Bayar Tunai di Dapur Karanggintung'
  };

  const lines = [
    `*FORM PEMESANAN KATERING - KURTIES FOOD*`,
    `_Dapur: Karanggintung RT 3 RW 4, Gandrungmangu, Cilacap_`,
    `------------------------------------------`,
    `*DATA PEMESAN:*`,
    `• Nama Lengkap : ${order.customerName || '-'}`,
    `• No. WhatsApp : ${order.whatsappNumber || '-'}`,
    `• Jenis Acara  : ${order.eventType || '-'}`,
    `• Tanggal Acara: ${order.eventDate || '-'}`,
    `• Jam Acara    : ${order.eventTime || '-'} WIB`,
    `• Alamat Kirim : ${order.deliveryAddress || '-'}`,
    `------------------------------------------`,
    `*RINCIAN MENU / PAKET:*`
  ];

  if (cart.length > 0) {
    cart.forEach((c, idx) => {
      const subtotal = c.item.price * c.quantity;
      lines.push(`${idx + 1}. *${c.item.name}*`);
      lines.push(`   └ ${c.quantity} ${c.item.unit} x ${formatRupiah(c.item.price)} = *${formatRupiah(subtotal)}*`);
      if (c.notes) {
        lines.push(`   └ Catatan: _${c.notes}_`);
      }
    });
  } else {
    lines.push(`(Paket Katering Khusus / Konsultasi Custom)`);
  }

  lines.push(`------------------------------------------`);
  lines.push(`*ESTIMASI TOTAL : ${formatRupiah(total)}*`);
  lines.push(`• Sistem Bayar  : ${paymentLabels[order.paymentMethod] || 'Transfer'}`);
  
  if (order.specialNotes && order.specialNotes.trim()) {
    lines.push(`• Request Khusus: ${order.specialNotes.trim()}`);
  }

  lines.push(`------------------------------------------`);
  lines.push(`Mohon konfirmasi ketersediaan jadwal dan total pembayaran. Terima kasih Kurties Food! 🙏🍱`);

  return lines.join('\n');
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}

export function generateQuickChatUrl(
  type: 'consult' | 'menu' | 'delivery',
  phoneNumber = CATERING_CONTACT.whatsappRaw
): string {
  let message = '';
  switch (type) {
    case 'consult':
      message = 'Halo Kurties Food Karanggintung Gandrungmangu, saya mau konsultasi rencana katering untuk acara keluarga/hajatan kami. Bisa minta info paket dan ketersediaan tanggal?';
      break;
    case 'menu':
      message = 'Halo Admin Kurties Food, saya ingin melihat daftar menu lengkap dan pricelist nasi kotak & prasmanan terbaru.';
      break;
    case 'delivery':
      message = 'Halo Kurties Food, mau tanya jangkauan pengantaran katering dan ketentuan gratis ongkir untuk area Gandrungmangu dan sekitarnya.';
      break;
  }
  return buildWhatsAppUrl(phoneNumber, message);
}
