import { MenuItem } from '../types/catering';

// Image paths from batch generation
export const KURTIES_LOGO = '/src/assets/images/kurties_food_logo_1794384279217.jpg';
export const HERO_IMAGE = '/src/assets/images/hero_catering_feast_1794383555052.jpg';
export const NASI_KOTAK_IMAGE = '/src/assets/images/nasi_kotak_premium_1794383555354.jpg';
export const TUMPENG_IMAGE = '/src/assets/images/tumpeng_syukuran_1794383556692.jpg';
export const PRASMANAN_IMAGE = '/src/assets/images/prasmanan_hajatan_1794383557310.jpg';

export const CATERING_CONTACT = {
  name: 'Kurties Food Katering',
  phoneDisplay: '0858-7654-3210',
  whatsappRaw: '6285876543210',
  address: 'Karanggintung RT 3 RW 4, Gandrungmangu, Cilacap, Jawa Tengah',
  postalCode: '53254',
  openingHours: 'Setiap Hari: 06.00 - 20.00 WIB',
  coverage: [
    'Gandrungmangu',
    'Karanggintung',
    'Bantarsari',
    'Sidareja',
    'Kedungreja',
    'Cinanggu',
    'Cipari',
    'Cilacap Barat'
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'nk-kremes',
    name: 'Nasi Kotak Ayam Kremes Komplit',
    category: 'nasi-kotak',
    price: 22000,
    minOrder: 15,
    unit: 'kotak',
    popular: true,
    image: NASI_KOTAK_IMAGE,
    description: 'Nasi putih pulen dengan ayam goreng bumbu rempah bertabur kremesan gurih renyah khas Kurties Food, disajikan dalam kemasan sekat higienis.',
    highlights: ['Ayam Goreng Lengkuas', 'Kremesan Renyah', 'Sambal Bajak'],
    includes: [
      'Nasi Putih Pulen Wangi',
      'Ayam Goreng Kremes (Potongan 1/4)',
      'Sambal Goreng Kentang Hati',
      'Perkedel Kentang / Tahu Bacem',
      'Lalapan Segar (Timun & Kemangi)',
      'Sambal Bajak / Terasi Gandrung',
      'Kerupuk Udang Renyah',
      'Air Mineral Cup 220ml & Sendok Tisu'
    ]
  },
  {
    id: 'nk-bakar-madu',
    name: 'Nasi Kotak Ayam Bakar Madu Spesial',
    category: 'nasi-kotak',
    price: 25000,
    minOrder: 15,
    unit: 'kotak',
    popular: true,
    image: NASI_KOTAK_IMAGE,
    description: 'Ayam bakar dengan marinasi kecap rempah dan madu asli, dibakar harum dengan bumbu meresap hingga ke tulang.',
    highlights: ['Ayam Bakar Madu Legit', 'Capcay Bakso', 'Kemasan Ramah Lingkungan'],
    includes: [
      'Nasi Putih Pulen Daun Pisang',
      'Ayam Bakar Madu Legit (Paha/Dada)',
      'Capcay Goreng Bakso Segar',
      'Bihun Goreng Jamur Gurih',
      'Sambal Terasi Tomat Matang',
      'Kerupuk Udang',
      'Buah Pisang / Semangka Potong',
      'Air Mineral & Sendok Tisu'
    ]
  },
  {
    id: 'nk-rendang',
    name: 'Nasi Kotak Rendang Sapi Padang Jawa',
    category: 'nasi-kotak',
    price: 32000,
    minOrder: 15,
    unit: 'kotak',
    popular: false,
    image: NASI_KOTAK_IMAGE,
    description: 'Daging sapi pilihan dimasak perlahan dengan santan kental dan rempah Nusantara hingga empuk dan gurih berkaramel.',
    highlights: ['Daging Sapi Empuk', 'Gulai Daun Singkong', 'Sambal Ijo'],
    includes: [
      'Nasi Putih Beras Rojolele',
      'Rendang Daging Sapi Pilihan',
      'Gulai Nangka / Daun Singkong',
      'Telur Balado Bulat',
      'Sambal Ijo Sedap',
      'Kerupuk Kulit Gurih',
      'Buah Segar',
      'Air Mineral & Alat Makan'
    ]
  },
  {
    id: 'nk-selamatan',
    name: 'Nasi Kotak Berkat / Syukuran Tradisional',
    category: 'nasi-kotak',
    price: 20000,
    minOrder: 20,
    unit: 'kotak',
    popular: false,
    image: NASI_KOTAK_IMAGE,
    description: 'Paket nasi kotak khusus acara hajatan, tahlilan, aqiqah, dan syukuran adat Jawa yang praktis dan lezat.',
    highlights: ['Urap Sayur Bumbu Kelapa', 'Ayam Opor / Ungkep', 'Ketan Serundeng'],
    includes: [
      'Nasi Putih Pulen / Nasi Uduk',
      'Ayam Ungkep Bumbu Kuning',
      'Sambal Goreng Tempe & Krecek',
      'Urap Sayur Bumbu Kelapa Gurih',
      'Telur Rebus Separuh / Balado',
      'Rempeyek Kacang Renyah',
      'Air Mineral Cup'
    ]
  },
  {
    id: 'prs-hajatan-mewah',
    name: 'Paket Prasmanan Hajatan & Pernikahan (VIP)',
    category: 'prasmanan',
    price: 48000,
    minOrder: 50,
    unit: 'porsi',
    popular: true,
    image: PRASMANAN_IMAGE,
    description: 'Layanan prasmanan lengkap untuk resepsi pernikahan, khitanan akbar, dan jamuan pesta. Termasuk meja dekorasi, chafing dish pemanas, dan waiter ramah.',
    highlights: ['Peralatan & Meja Dipinjamkan', '5 Menu Utama + 2 Dessert', 'Prasaji Standby'],
    includes: [
      'Nasi Putih & Nasi Goreng Spesial',
      'Sop Pengantin / Sop Kimlo Gurih Hangat',
      'Ayam Panggang Klaten / Rolade Daging',
      'Rendang Daging Sapi / Bestik Sapi',
      'Capcay Seafood / Cah Brokoli Jamur',
      'Sambal Goreng Ati Kentang & Krecek',
      'Kerupuk Udang & Acar Kuning Segar',
      'Puding Buah Vla Cokelat / Es Manado',
      'Buah Iris Segar (Melon, Semangka, Nanas)',
      'Es Teh Manis & Air Mineral Galon'
    ]
  },
  {
    id: 'prs-keluarga',
    name: 'Paket Prasmanan Syukuran Keluarga',
    category: 'prasmanan',
    price: 36000,
    minOrder: 30,
    unit: 'porsi',
    popular: false,
    image: PRASMANAN_IMAGE,
    description: 'Prasmanan santai untuk acara temu keluarga, reuni, arisan, pengajian akbar, atau syukuran rumah di Gandrungmangu.',
    highlights: ['Praktis & Higienis', 'Pemanas Chafing Dish', 'Rasa Khas Masakan Rumah'],
    includes: [
      'Nasi Putih Pulen Gandrungmangu',
      'Sop Ayam Jamur Sosis Bening',
      'Ayam Goreng Lengkuas / Rica Kemangi',
      'Ikan Gurame Goreng Tepung / Bakar Manis',
      'Bihun Goreng Sayuran Bakso',
      'Sambal Bajak & Lalapan Segar',
      'Es Kelapa Muda Jeruk / Es Dawet Ayu',
      'Buah Potong Segar'
    ]
  },
  {
    id: 'tmp-kuning-tampah',
    name: 'Tumpeng Kuning Komplit (15 - 20 Porsi)',
    category: 'tumpeng',
    price: 450000,
    minOrder: 1,
    unit: 'tampah',
    popular: true,
    image: TUMPENG_IMAGE,
    description: 'Tumpeng nasi kuning wangi gurih berbentuk kerucut megah beralas tampah anyaman bambu dan daun pisang hias, dikelilingi 7 lauk berkah.',
    highlights: ['Hiasan Daun Pisang & Sayur', 'Nasi Kuning Gurih Santan', 'Free Topper Acara'],
    includes: [
      'Nasi Kuning Harum Beras Pilihan (Bentuk Kerucut)',
      'Ayam Goreng Bumbu Rujak / Bakar Madu',
      'Sambal Goreng Ati Kentang Balado',
      'Perkedel Kentang Lembut',
      'Telur Balado / Dadar Rawis Halus',
      'Orek Tempe Manis Kering Kacang',
      'Urap Sayuran Segar Bumbu Kelapa Bakar',
      'Garnish Ukiran Cabai, Timun & Tomat Segar'
    ]
  },
  {
    id: 'tmp-mini-personal',
    name: 'Tumpeng Mini (Tumini) Personal Box',
    category: 'tumpeng',
    price: 28000,
    minOrder: 15,
    unit: 'box',
    popular: false,
    image: TUMPENG_IMAGE,
    description: 'Tumpeng mini dalam mika bening bulat cantik dan eksklusif. Sangat cocok untuk souvenir acara ulang tahun, syukuran kantor, dan peresmian.',
    highlights: ['Mika Eksklusif & Sendok', 'Porsi Pas Personal', 'Stiker Desain Custom'],
    includes: [
      'Nasi Kuning Kerucut Mini',
      'Ayam Suwir Pedas Manis',
      'Kering Tempe Teri Kacang',
      'Telur Dadar Rawis',
      'Perkedel Kentang Mini',
      'Sambal Bajak & Timun Iris',
      'Alas Daun Pisang & Sendok Higienis'
    ]
  },
  {
    id: 'snk-box-manis-asin',
    name: 'Snack Box Tradisional 3 Kue + Air Mineral',
    category: 'snack-box',
    price: 10000,
    minOrder: 20,
    unit: 'box',
    popular: true,
    image: NASI_KOTAK_IMAGE,
    description: 'Kombinasi kue basah manis dan gurih pilihan khas Jawa Tengah, dikemas dalam kotak cantik untuk rapat, pengajian, dan seminar.',
    highlights: ['Kue Fresh Tiap Pagi', 'Dus Rapi Bersih', 'Harga Terjangkau'],
    includes: [
      'Lemper Ayam Bakar Gurih',
      'Pastel Isi Sayur Daging Renyah',
      'Kue Lapis Legit / Bolu Kukus Merekah',
      'Air Mineral Gelas 220ml',
      'Tisu & Tusuk Gigi'
    ]
  },
  {
    id: 'snk-box-premium',
    name: 'Snack Box Premium 4 Variasi + Jus Buah',
    category: 'snack-box',
    price: 16000,
    minOrder: 20,
    unit: 'box',
    popular: false,
    image: NASI_KOTAK_IMAGE,
    description: 'Paket kue premium untuk acara resmi kedinasan, rapat penting instansi, dan tamu VIP di Gandrungmangu dan Cilacap.',
    highlights: ['Kue Modern & Tradisional', 'Jus Buah Segar', 'Kemasan Gold Box'],
    includes: [
      'Risoles Mayo Smoked Beef Keju',
      'Pie Buah Segar Vla Vanila',
      'Kroket Kentang Daging Gurih',
      'Kue Soes Cokelat Lumer',
      'Jus Kemasan Kotak / Air Mineral Botol',
      'Tisu Basah & Kering'
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: 'Hj. Siti Rohmah',
    role: 'Tuan Rumah Hajatan Pernikahan',
    location: 'Karanggintung, Gandrungmangu',
    event: 'Pernikahan Putri Pertama (500 Porsi Prasmanan)',
    content: 'Alhamdulillah hajatan putri kami sukses besar. Prasmanan dari Kurties Food masakannya sedap mantap, terutama ayam panggang dan sop kimlonya dapat pujian banyak dari para tamu. Pelayanan dan pengantaran tepat waktu sekali!',
    rating: 5,
    date: 'Oktober 2026'
  },
  {
    name: 'Bpk. Ahmad Fauzi',
    role: 'Ketua Panitia Pengajian Akbar',
    location: 'Cinanggu, Gandrungmangu',
    event: 'Pengajian Rutin (180 Nasi Kotak)',
    content: 'Pesan nasi kotak ayam bakar madu via WhatsApp prosesnya cepat dan tidak ribet. Admin Kurties Food sangat ramah, konfirmasinya jelas, dan pas dibuka kotak nasinya masih hangat. Harga sangat bersahabat untuk kualitas seenak ini.',
    rating: 5,
    date: 'November 2026'
  },
  {
    name: 'Ibu Ratna Dewi',
    role: 'Instansi Kantor Kecamatan',
    location: 'Gandrungmangu Kota, Cilacap',
    event: 'Rapat Koordinasi & Snack Box VIP',
    content: 'Langganan terbaik kantor kami untuk snack box dan tumpeng mini. Rasa kuenya higienis, manisnya pas, dan kemasannya rapi berkelas. Sangat direkomendasikan untuk warga Gandrungmangu dan sekitarnya!',
    rating: 5,
    date: 'September 2026'
  }
];

export const FAQS = [
  {
    question: 'Berapa hari sebelum acara pesanan harus masuk?',
    answer: 'Untuk Nasi Kotak dan Snack Box skala 15–100 kotak, pemesanan dapat dilakukan maksimal H-1 (sebelum jam 17.00 WIB). Untuk Tumpeng Tampah H-1, sedangkan untuk Prasmanan Hajatan skala besar (100–1000 porsi) disarankan H-5 atau H-3 agar persiapan bahan dan staf prasaji maksimal.'
  },
  {
    question: 'Apakah melayani pengantaran sampai ke lokasi di luar Gandrungmangu?',
    answer: 'Ya, Kurties Food melayani pengantaran ke seluruh area Gandrungmangu (Gratis ongkir untuk wilayah terdekat dengan syarat minimum order) serta kecamatan sekitarnya seperti Bantarsari, Sidareja, Kedungreja, Cipari, Kawunganten, hingga Cilacap Barat.'
  },
  {
    question: 'Bagaimana cara konfirmasi pemesanan dan pembayaran?',
    answer: 'Setelah memilih paket dan mengisi data pada formulir website, klik tombol "Pesan via WhatsApp". Anda akan langsung terhubung ke chat WhatsApp resmi Kurties Food. Pembayaran dapat melalui DP transfer (BCA/BRI/Mandiri) sebesar 30-50% atau datang langsung ke dapur kami di Karanggintung RT 3 RW 4, pelunasan saat pesanan diterima.'
  },
  {
    question: 'Apakah menu lauk pada paket nasi kotak atau prasmanan bisa diganti (custom)?',
    answer: 'Tentu bisa! Kami sangat fleksibel menyesuaikan menu dengan selera keluarga, anggaran, atau tema acara Anda. Cukup tuliskan catatan penggantian menu di formulir atau diskusikan langsung saat chat WhatsApp dengan tim kami.'
  },
  {
    question: 'Apakah makanan dijamin 100% Halal dan Higienis?',
    answer: 'Insya Allah 100% Halal. Kami menggunakan bahan-bahan segar berkualitas, daging bersertifikat halal, dan proses pengolahan bersih di dapur bersih kami di Karanggintung dengan standar kebersihan makanan tinggi.'
  }
];
