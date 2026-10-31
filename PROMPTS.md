# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
**Baca AGENTS.md dan docs/user-stories.md bagian US-01.Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.**

**Hasil:**
**Pengerjaan US-01: Katalog dari database telah selesai.File yang Dibuat & Diubahlib/supabase/server.js & lib/supabase/index.js:Membuat fungsi buatClientServer() untuk inisialisasi koneksi Supabase di sisi server menggunakan SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. app/page.jsx:Mengambil data produk dari tabel produk di Supabase secara asinkron di server.Menampilkan daftar produk menggunakan komponen KartuProduk yang sudah ada.Menampilkan pesan error yang jelas jika pengambilan data gagal. Menampilkan teks "Belum ada produk" jika tabel tidak memiliki data produk.Menghapus komponen CatatanBelumAktif dan data contoh.**

**Perbaikan:**
**Solusi untuk Memperbaiki Buka dashboard supabase.com dan pilih proyek Anda. Masuk ke menu Project Settings (ikon gerigi di kiri bawah) > API (atau API Keys). Salin nilai di bagian Project URL (formatnya: https://<id-proyek>.supabase.co). Buka file .env.local di proyek Anda dan ganti nilai SUPABASE_URL: env SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co SUPABASE_PUBLISHABLE_KEY=sb_publishable_... SUPABASE_SECRET_KEY=sb_secret_... (Pastikan tidak ada tanda kutip ekstra atau trailing slash di akhir URL). Simpan file .env.local, lalu restart server development jika sedang berjalan (npm run dev). Jika dideploy ke Vercel, perbarui juga nilai SUPABASE_URL di Vercel > Project Settings > Environment Variables lalu lakukan Redeploy.Selain itu, penanganan error di app/page.jsx dan sanitasi tanda petik di lib/supabase/server.js sudah diperbarui agar menampilkan pesan yang lebih ramah jika respons database tidak valid.**

## US-02 Detail produk

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
