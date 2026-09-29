export const categories = [
  {
    slug: 'bertani', emoji: '🌱', name: 'Tips & Cara Bertani', color: '#16a34a', soft: '#dcfce7',
    desc: 'Budidaya, perawatan tanaman, pemupukan, pengendalian hama, sampai tips menaikkan hasil panen.',
    intro: 'Hasil panen yang bagus dimulai dari tanah yang sehat, bibit yang tepat, dan perawatan yang rutin.',
    tips: [
      { icon: '🧪', title: 'Cek kondisi tanah dulu', text: 'Ukur pH tanah sebelum menanam. Kebanyakan sayuran tumbuh baik di pH 6–7. Tanah terlalu asam bisa diperbaiki dengan kapur pertanian atau dolomit.' },
      { icon: '💧', title: 'Siram di waktu yang tepat', text: 'Siram pagi (06.00–09.00) atau sore. Siram di siang terik membuat air cepat menguap dan daun mudah layu.' },
      { icon: '🐛', title: 'Kendalikan hama sejak dini', text: 'Periksa bagian bawah daun tiap 2–3 hari. Musuh alami seperti kepik dan laba-laba membantu mengurangi hama tanpa pestisida kimia.' },
      { icon: '🔄', title: 'Rotasi tanaman', text: 'Jangan menanam jenis yang sama di lahan yang sama terus-menerus. Gilir dengan kacang-kacangan agar tanah kembali kaya nitrogen.' },
      { icon: '🌾', title: 'Pupuk sesuai fase tumbuh', text: 'Fase vegetatif butuh banyak nitrogen (N), fase berbunga dan berbuah butuh fosfor (P) dan kalium (K). Pupuk berlebihan justru membakar akar.' },
      { icon: '📅', title: 'Catat jadwal tanam', text: 'Catat tanggal tanam, pemupukan, dan panen. Catatan ini membantu kamu membandingkan hasil antar musim.' }
    ],
    facts: ['Sistem tanam tumpang sari (dua tanaman satu lahan) bisa menambah pendapatan per meter persegi.', 'Mulsa jerami membantu menjaga kelembapan dan menekan gulma.', 'Benih bersertifikat umumnya punya daya tumbuh lebih seragam.']
  },
  {
    slug: 'peternakan', emoji: '🐄', name: 'Tips & Informasi Peternakan', color: '#d97706', soft: '#fef3c7',
    desc: 'Perawatan ternak, pakan, kesehatan hewan, kebersihan kandang, dan manajemen pemeliharaan.',
    intro: 'Ternak yang sehat lahir dari pakan seimbang, kandang bersih, dan pemantauan harian.',
    tips: [
      { icon: '🌿', title: 'Pakan seimbang', text: 'Ruminansia seperti sapi dan kambing butuh hijauan sebagai pakan utama, ditambah konsentrat sesuai fase (bunting, menyusui, penggemukan).' },
      { icon: '🧹', title: 'Kandang bersih & kering', text: 'Bersihkan kotoran setiap hari dan pastikan sirkulasi udara baik. Kandang lembap memicu penyakit kulit dan pernapasan.' },
      { icon: '💉', title: 'Vaksinasi & obat cacing', text: 'Buat jadwal vaksin dan obat cacing berkala. Konsultasikan program yang cocok dengan dokter hewan atau petugas kesehatan hewan setempat.' },
      { icon: '👀', title: 'Kenali tanda ternak sakit', text: 'Waspadai nafsu makan turun, bulu kusam, lesu, atau diare. Pisahkan ternak sakit dari kelompok agar tidak menular.' },
      { icon: '🚰', title: 'Air minum bersih', text: 'Sediakan air bersih sepanjang hari. Kekurangan air langsung menurunkan pertumbuhan dan produksi susu maupun telur.' },
      { icon: '📝', title: 'Catat rekam data ternak', text: 'Catat bobot, tanggal kawin, vaksin, dan produksi. Data ini memudahkan seleksi indukan terbaik.' }
    ],
    facts: ['Kotoran ternak bisa diolah jadi pupuk kandang atau biogas.', 'Fermentasi jerami dengan probiotik dapat meningkatkan daya cerna pakan.', 'Kepadatan kandang yang terlalu tinggi menaikkan risiko stres dan penyakit.']
  },
  {
    slug: 'perikanan', emoji: '🐟', name: 'Tips & Informasi Perikanan', color: '#0284c7', soft: '#e0f2fe',
    desc: 'Budidaya ikan, pemilihan benih, pemberian pakan, kualitas air, dan menjaga kesehatan ikan.',
    intro: 'Kunci budidaya ikan ada di kualitas air. Air yang baik membuat ikan sehat dan pakan lebih efisien.',
    tips: [
      { icon: '🐣', title: 'Pilih benih berkualitas', text: 'Pilih benih yang aktif bergerak, ukurannya seragam, dan tidak cacat. Beli dari pembenih yang terpercaya.' },
      { icon: '🌡️', title: 'Pantau kualitas air', text: 'Perhatikan suhu, pH (umumnya 6,5–8,5), dan oksigen terlarut. Air keruh atau berbau menandakan perlu pergantian air.' },
      { icon: '🍽️', title: 'Atur pemberian pakan', text: 'Beri pakan 2–3 kali sehari secukupnya. Pakan sisa yang membusuk menurunkan kualitas air dan memicu penyakit.' },
      { icon: '🫧', title: 'Jaga oksigen', text: 'Aerator atau kincir air membantu menambah oksigen, terutama di kolam padat tebar dan saat cuaca panas.' },
      { icon: '🩺', title: 'Cegah penyakit', text: 'Karantina ikan baru beberapa hari sebelum dicampur. Ikan yang berenang di permukaan atau berkumpul dekat aliran air bisa jadi tanda masalah.' },
      { icon: '⚖️', title: 'Padat tebar tepat', text: 'Jumlah ikan per meter persegi harus sesuai jenis dan sistem budidaya. Terlalu padat membuat pertumbuhan lambat.' }
    ],
    facts: ['Sistem bioflok memanfaatkan mikroorganisme untuk menjaga kualitas air dan mengurangi pemborosan pakan.', 'Akuaponik menggabungkan budidaya ikan dan sayuran dalam satu sirkulasi air.', 'Sampling bobot tiap 2 minggu membantu menghitung kebutuhan pakan.']
  },
  {
    slug: 'ramah-lingkungan', emoji: '♻️', name: 'Pertanian & Peternakan Ramah Lingkungan', color: '#0d9488', soft: '#ccfbf1',
    desc: 'Manfaatkan limbah, buat pupuk atau pakan alternatif, hemat sumber daya, dan terapkan praktik yang lebih lestari.',
    intro: 'Limbah dari satu kegiatan bisa jadi bahan baku kegiatan lain. Hemat biaya, tanah pun lebih sehat.',
    tips: [
      { icon: '🍂', title: 'Kompos dari sisa panen', text: 'Campur bahan hijau (daun, sisa sayur) dan bahan coklat (jerami, serbuk kayu), jaga tetap lembap dan balik tiap minggu. Kompos matang dalam 4–8 minggu.' },
      { icon: '🧴', title: 'Pupuk organik cair (POC)', text: 'Fermentasi sisa sayur atau air cucian beras dengan gula merah dan EM4 untuk pupuk cair murah.' },
      { icon: '🔥', title: 'Biogas dari kotoran ternak', text: 'Kotoran sapi atau babi dapat difermentasi dalam digester untuk menghasilkan gas memasak, ampasnya jadi pupuk.' },
      { icon: '🪱', title: 'Budidaya maggot & cacing', text: 'Maggot BSF dan cacing tanah mengurai sampah organik dan menjadi pakan alternatif kaya protein bagi ayam dan ikan.' },
      { icon: '🌧️', title: 'Tampung air hujan', text: 'Bak penampung air hujan menekan biaya air untuk penyiraman, terutama di musim kemarau.' },
      { icon: '🌳', title: 'Tanam pohon pelindung & pagar hidup', text: 'Pohon penaung dan tanaman pagar menahan erosi, menurunkan suhu, dan menyediakan pakan hijauan tambahan.' }
    ],
    facts: ['Sekam dan serbuk gergaji bisa jadi media tanam atau alas kandang.', 'Pupuk organik memperbaiki struktur tanah dalam jangka panjang.', 'Pestisida nabati dari daun mimba atau bawang putih bisa mengurangi ketergantungan pada bahan kimia.']
  },
  {
    slug: 'tanya-jawab', emoji: '💬', name: 'Forum Tanya Jawab & Berbagi Pengalaman', color: '#7c3aed', soft: '#ede9fe',
    desc: 'Tempat bertanya, memberi solusi, berbagi pengalaman lapangan, dan berdiskusi bebas dengan sesama.',
    intro: 'Pertanyaan yang jelas mendapat jawaban yang cepat dan tepat. Ceritakan kondisimu selengkap mungkin.',
    tips: [
      { icon: '✍️', title: 'Tulis judul yang spesifik', text: 'Contoh baik: "Daun cabai keriting dan menguning setelah hujan, apa penyebabnya?" Hindari judul seperti "Tolong bantu".' },
      { icon: '📸', title: 'Sertakan foto', text: 'Foto tanaman, ternak, atau kolam membantu pengguna lain mengenali masalahnya lebih cepat.' },
      { icon: '📍', title: 'Sebutkan kondisi lapangan', text: 'Tulis lokasi (dataran rendah/tinggi), umur, jenis, cuaca, dan apa yang sudah kamu coba.' },
      { icon: '🤝', title: 'Bagikan hasil akhirnya', text: 'Kalau masalahmu sudah selesai, tulis jawaban penutup. Pengalamanmu berguna untuk petani lain.' },
      { icon: '🙏', title: 'Hargai sesama', text: 'Setiap orang punya pengalaman berbeda. Beri saran dengan sopan dan jelaskan alasannya.' },
      { icon: '⚠️', title: 'Untuk kasus serius', text: 'Wabah penyakit hewan atau gagal panen besar sebaiknya juga dilaporkan ke penyuluh atau dinas setempat.' }
    ],
    facts: ['Semakin lengkap deskripsi, semakin tepat jawabannya.', 'Satu pertanyaan bisa mendapat banyak sudut pandang dari daerah berbeda.', 'Jawaban dari pengalaman langsung sangat berharga, ceritakan apa yang berhasil dan gagal.']
  }
];

export const bySlug = (slug) => categories.find((c) => c.slug === slug);
