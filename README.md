# Vennas 2026 Website

Website resmi untuk **Konvensi Nasional Asosiasi Ilmu Hubungan Internasional Indonesia (Vennas AIHII ke-17)** yang diselenggarakan pada tahun 2026 di Jababeka, Indonesia (Tuan rumah: President University).

## Fitur Utama
- **Desain Modern & Responsif**: Tampilan sangat bersih, rapi, dan responsif untuk semua perangkat (Desktop, Tablet, dan Mobile).
- **Animasi AOS**: Transisi kemunculan elemen yang sangat mulus saat menggulir halaman (*Animate on Scroll*).
- **Sistem Komponen Dinamis**: Navigasi (`nav.html`) dan Footer (`footer.html`) dimuat secara dinamis menggunakan Vanilla JavaScript agar mudah dikelola dan tidak berulang di setiap halaman.
- **Peta Interaktif**: Menggunakan integrasi embed Google Maps langsung untuk kemudahan pelacakan lokasi (*Venues*).
- **Grid Layout Lanjutan**: Dibangun dengan Tailwind CSS (versi terbaru), memanfaatkan 12-kolom grid yang fleksibel.

## Teknologi yang Digunakan
- **HTML5** & **Vanilla JavaScript**
- **Tailwind CSS** (via PostCSS)
- **AOS** (Animate On Scroll Library)
- **Node.js & npm** (Untuk manajemen kompilasi CSS)

## Struktur Proyek
```text
vennas_website/
├── assets/
│   ├── css/
│   │   ├── input.css      # File sumber Tailwind CSS
│   │   └── style.css      # File CSS hasil kompilasi
│   ├── images/            # Aset gambar, logo, dan ilustrasi
│   └── js/
│       └── components.js  # Skrip utama (Load Navbar & Footer, dll)
├── components/
│   ├── footer.html        # Potongan komponen Footer
│   └── nav.html           # Potongan komponen Navbar (Desktop & Mobile)
├── about-presuni.html     # Halaman Tentang President University
├── about.html             # Halaman Tentang Vennas & Call for Papers
├── contact.html           # Halaman Kontak
├── important-date.html    # Halaman Tanggal Penting (Timeline UI)
├── index.html             # Halaman Utama (Beranda)
├── location.html          # Halaman Lokasi & Akomodasi (Google Maps)
└── package.json           # Konfigurasi dependensi Node.js
```

## Cara Menjalankan & Pengembangan

1. **Instalasi Dependensi**
   Pastikan Anda sudah menginstal Node.js di komputer Anda. Buka terminal di folder proyek ini dan jalankan:
   ```bash
   npm install
   ```

2. **Kompilasi Tailwind CSS**
   Setiap kali Anda membuat perubahan kelas CSS di dalam file `.html`, Anda wajib menjalankan perintah berikut agar perubahannya di-*compile* ke dalam `style.css`:
   ```bash
   npm run build
   ```
   *(Perintah ini akan menjalankan `postcss assets/css/input.css -o assets/css/style.css`)*

3. **Menjalankan di Browser**
   Karena website ini menggunakan Vanilla JavaScript `fetch()` untuk memuat komponen (`nav.html` dan `footer.html`), Anda **tidak bisa** langsung mengklik dua kali file `index.html` (akan terkena isu *CORS* di browser).
   Gunakan ekstensi seperti **Live Server** (VS Code) atau jalankan server lokal Python:
   ```bash
   python3 -m http.server 8000
   ```
   Kemudian buka `http://localhost:8000` di browser Anda.

## Panduan Desain (*Design System*)
- **Tipografi utama**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) untuk teks paragraf/konten.
- **Tipografi tombol & aksen**: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) / Libre untuk judul atau tombol (contoh: "BACA SELENGKAPNYA").
- **Warna Identitas**: Vennas Blue (`bg-vennas-blue`).
- **Pendekatan Layout**: Menghindari batasan `max-w` berlebihan. Lebih mengutamakan *fluid padding* `px-6 md:px-12 lg:px-20 xl:px-32` untuk kesan profesional.


