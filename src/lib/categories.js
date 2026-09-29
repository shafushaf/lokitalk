// Data forum + konten informasi tiap forum.
// Foto opsional: taruh file di static/photos/<slug>.jpg (lihat README).

export const categories = [
	{
		slug: 'tani',
		emoji: '🌱',
		name: 'Tips & Cara Bertani',
		short: 'Tani',
		scene: 'tani',
		color: '#1aa58f',
		tagline: 'Dari benih sampai panen, tanya apa saja.',
		description:
			'Panduan budidaya tanaman, perawatan, pemupukan, pengendalian hama, sampai cara meningkatkan hasil panen.',
		topics: ['padi', 'cabai', 'jagung', 'sayuran', 'pupuk', 'hama', 'irigasi', 'hidroponik'],
		tips: [
			{
				title: 'Mulai dari tanah yang sehat',
				text: 'Cek pH tanah sebelum menanam. Sebagian besar sayuran tumbuh baik di pH 6–7. Tanah terlalu asam bisa dinetralkan dengan kapur pertanian (dolomit).'
			},
			{
				title: 'Pilih benih unggul dan uji daya tumbuh',
				text: 'Rendam sejumlah kecil benih di air. Benih yang tenggelam umumnya bernas dan layak tanam. Benih yang mengapung sebaiknya dibuang.'
			},
			{
				title: 'Pemupukan berimbang',
				text: 'Padukan pupuk organik (kompos, pupuk kandang) dengan pupuk anorganik sesuai fase tumbuh. Pupuk dasar saat tanam, susulan saat vegetatif dan menjelang berbunga.'
			},
			{
				title: 'Kendalikan hama secara terpadu',
				text: 'Pantau kebun tiap pagi. Gunakan musuh alami, perangkap, dan pestisida nabati dulu. Pestisida kimia jadi pilihan terakhir dan patuhi dosis pada label.'
			},
			{
				title: 'Atur air dengan bijak',
				text: 'Siram pagi atau sore agar air tidak cepat menguap. Mulsa jerami atau plastik menjaga kelembapan dan menekan gulma.'
			},
			{
				title: 'Rotasi tanaman',
				text: 'Jangan menanam jenis yang sama terus-menerus di lahan yang sama. Rotasi memutus siklus hama dan penyakit tanah.'
			}
		]
	},
	{
		slug: 'ternak',
		emoji: '🐄',
		name: 'Tips & Informasi Peternakan',
		short: 'Ternak',
		scene: 'ternak',
		color: '#e88a3c',
		tagline: 'Ternak sehat, kandang bersih, usaha lancar.',
		description:
			'Informasi perawatan ternak, pakan, kesehatan hewan, kebersihan kandang, dan manajemen pemeliharaan.',
		topics: ['sapi', 'kambing', 'ayam', 'bebek', 'pakan', 'vaksin', 'kandang', 'penggemukan'],
		tips: [
			{
				title: 'Kandang bersih, ternak tenang',
				text: 'Bersihkan kotoran setiap hari, atur sirkulasi udara, dan pastikan lantai tidak licin atau becek. Kandang yang lembap memicu penyakit kaki dan pernapasan.'
			},
			{
				title: 'Pakan cukup dan seimbang',
				text: 'Ruminansia membutuhkan hijauan sebagai pakan utama, ditambah konsentrat sesuai fase produksi. Berikan air minum bersih tanpa batas.'
			},
			{
				title: 'Jadwalkan vaksinasi dan obat cacing',
				text: 'Catat tanggal vaksin dan obat cacing tiap ekor. Konsultasikan program vaksin dengan dokter hewan atau petugas kesehatan hewan setempat.'
			},
			{
				title: 'Kenali tanda ternak sakit',
				text: 'Nafsu makan turun, bulu kusam, lesu, mata berair, atau kotoran tidak normal. Pisahkan ternak yang sakit dari kelompoknya segera.'
			},
			{
				title: 'Karantina hewan baru',
				text: 'Tempatkan ternak baru di kandang terpisah sekitar 2 minggu sebelum digabung agar tidak membawa penyakit ke kelompok lama.'
			},
			{
				title: 'Catat semuanya',
				text: 'Pencatatan bobot, pakan, dan kesehatan membantu menghitung untung rugi dan menemukan masalah lebih cepat.'
			}
		]
	},
	{
		slug: 'ikan',
		emoji: '🐟',
		name: 'Tips & Informasi Perikanan',
		short: 'Ikan',
		scene: 'ikan',
		color: '#2b8fd6',
		tagline: 'Air jernih, ikan sehat, panen melimpah.',
		description:
			'Panduan budidaya ikan, pemilihan benih, pemberian pakan, kualitas air, hingga menjaga kesehatan ikan.',
		topics: ['lele', 'nila', 'gurame', 'kolam terpal', 'bioflok', 'benih', 'pakan ikan', 'kualitas air'],
		tips: [
			{
				title: 'Pilih benih seragam dan aktif',
				text: 'Benih yang sehat berenang lincah, ukuran seragam, tidak cacat, dan tidak ada luka. Beli dari pembenih yang terpercaya.'
			},
			{
				title: 'Jaga kualitas air',
				text: 'Pantau pH (ideal sekitar 6,5–8,5), suhu, dan kejernihan air. Air berbau menyengat tanda amonia tinggi, segera ganti sebagian air.'
			},
			{
				title: 'Takar pakan, jangan berlebihan',
				text: 'Beri pakan 2–3 kali sehari sedikit demi sedikit. Pakan sisa yang menumpuk membusuk dan merusak air.'
			},
			{
				title: 'Atur kepadatan tebar',
				text: 'Kepadatan terlalu tinggi membuat ikan stres, oksigen cepat habis, dan penyakit mudah menular. Sesuaikan dengan jenis ikan dan sistem kolam.'
			},
			{
				title: 'Sediakan oksigen cukup',
				text: 'Aerator atau aliran air masuk membantu menambah oksigen, terutama saat cuaca panas dan menjelang pagi.'
			},
			{
				title: 'Cegah penyakit sejak awal',
				text: 'Keringkan dan bersihkan kolam antar siklus, jangan berbagi alat dengan kolam lain, dan pisahkan ikan yang terlihat sakit.'
			}
		]
	},
	{
		slug: 'ramah-lingkungan',
		emoji: '♻️',
		name: 'Pertanian & Peternakan Ramah Lingkungan',
		short: 'Ramah Lingkungan',
		scene: 'eco',
		color: '#5fae3a',
		tagline: 'Limbah jadi berkah, alam tetap lestari.',
		description:
			'Cara memanfaatkan limbah, membuat pupuk atau pakan alternatif, menghemat sumber daya, dan menerapkan praktik yang lebih ramah lingkungan.',
		topics: ['kompos', 'pupuk organik cair', 'biogas', 'maggot', 'fermentasi pakan', 'mulsa', 'hemat air'],
		tips: [
			{
				title: 'Ubah sisa dapur dan kebun jadi kompos',
				text: 'Campur bahan hijau (sisa sayur, rumput) dengan bahan cokelat (daun kering, jerami) sekitar 1:2, jaga tetap lembap, dan balik tiap 1–2 minggu.'
			},
			{
				title: 'Manfaatkan kotoran ternak',
				text: 'Kotoran ternak yang sudah difermentasi menjadi pupuk kandang berkualitas atau bahan biogas untuk energi memasak.'
			},
			{
				title: 'Maggot BSF untuk pakan dan olah limbah',
				text: 'Larva black soldier fly dapat mengurai limbah organik dan menjadi pakan kaya protein bagi ikan dan unggas.'
			},
			{
				title: 'Fermentasi pakan',
				text: 'Jerami dan limbah pertanian bisa difermentasi agar lebih mudah dicerna ternak sekaligus mengurangi biaya pakan.'
			},
			{
				title: 'Hemat air lewat mulsa dan tetes',
				text: 'Mulsa organik menahan penguapan, sedangkan irigasi tetes mengantar air langsung ke akar dengan pemborosan lebih kecil.'
			},
			{
				title: 'Kurangi bahan kimia',
				text: 'Gunakan pestisida nabati dan pupuk hayati bila memungkinkan. Tanah dan air di sekitar lahan tetap sehat untuk jangka panjang.'
			}
		]
	},
	{
		slug: 'tanya-jawab',
		emoji: '💬',
		name: 'Forum Tanya Jawab & Berbagi Pengalaman',
		short: 'Tanya Jawab',
		scene: 'forum',
		color: '#0d8f85',
		tagline: 'Punya masalah di lapangan? Tanyakan di sini.',
		description:
			'Tempat mengajukan pertanyaan, memberi solusi, berbagi pengalaman lapangan, dan berdiskusi dengan pengguna lain.',
		topics: ['pengalaman', 'modal usaha', 'pemasaran hasil', 'alat & mesin', 'musim', 'komunitas'],
		tips: [
			{
				title: 'Tulis judul yang spesifik',
				text: 'Contoh baik: "Daun cabai keriting dan menguning setelah hujan, penyebabnya apa?" Judul yang jelas mempercepat datangnya jawaban.'
			},
			{
				title: 'Jelaskan kondisi lapangan',
				text: 'Sebutkan jenis tanaman atau hewan, umur, lokasi, cuaca, dan apa yang sudah dicoba. Semakin lengkap, semakin tepat jawabannya.'
			},
			{
				title: 'Sertakan foto',
				text: 'Foto daun, hewan, atau kolam sering membantu penjawab mengenali masalah lebih cepat.'
			},
			{
				title: 'Tandai jawaban terbaik',
				text: 'Jika sudah terbantu, pemilik pertanyaan bisa menandai jawaban yang berhasil supaya berguna bagi pembaca berikutnya.'
			},
			{
				title: 'Bagikan hasilnya',
				text: 'Ceritakan apa yang akhirnya berhasil. Pengalaman nyata dari lapangan adalah ilmu yang paling berharga di forum ini.'
			}
		]
	}
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const categorySlugs = categories.map((c) => c.slug);
