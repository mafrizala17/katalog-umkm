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
**Baca docs/user-stories.md bagian US-02. Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.**

**Hasil:**
**Pengerjaan US-02: Detail produk telah selesai. File yang Diubah app/produk/[id]/page.jsx: Mengambil data satu produk dari tabel produk di Supabase berdasarkan parameter id di URL menggunakan buatClientServer(). Memanggil notFound() dari Next.js jika data tidak ditemukan atau terjadi kesalahan query sehingga menampilkan halaman 404 bawaan aplikasi. Mempertahankan tampilan, tombol WhatsApp, dan layout halaman. Menghapus penggunaan data contoh serta komponen CatatanBelumAktif.**

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**
**Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)". Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.**

**Hasil:**
**Pengerjaan US-03: Pesan via WhatsApp telah selesai.File yang Diubah components/TombolWhatsApp.jsx: Mengubah elemen tombol menjadi tautan <a> dengan target _blank dan rel="noopener noreferrer". Mengarahkan ke format https://wa.me/<nomorWhatsApp>?text=<pesan> menggunakan nomor dari lib/toko.js. Pesan otomatis memuat nama dan harga produk dalam format rupiah menggunakan fungsi formatRupiah(), yang di-encode dengan encodeURIComponent. Mempertahankan tampilan tombol (inline-flex, warna bg-utama, hover, dsb.). Komponen CatatanBelumAktif di halaman detail produk (app/produk/[id]/page.jsx) sudah dipastikan bersih.**

**Perbaikan:**

## US-04 Login admin

**Prompt:**
**Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.**

**Hasil:**
**File yang Dibuat & Diubahlib/supabase/auth.js & lib/supabase/index.js:Membuat fungsi buatClientAuth() yang menginisialisasi @supabase/ssr (createServerClient) dengan cookies() dari next/headersmenggunakan SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. app/admin/actions.js:Membuat Server Action login(formData): memvalidasi input, memanggil supabase.auth.signInWithPassword({ email password }), danmengarahkan ke /admin jika berhasil atau kembali ke /admin/login?error=... jika gagal.Membuat Server Action keluar(): memanggil supabase.auth.signOut() dan mengarahkan kembali ke /admin/login. app/admin/login/page.jsx:Menyambungkan form ke action login.Menampilkan pesan error jika login gagal.Menghapus komponen CatatanBelumAktif.components/NavAdmin.jsx:Memfungsikan tombol "Keluar" menggunakan form Server Action keluar. Tampilan tombol tetap dipertahankan.**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**
**Baca docs/user-stories.md bagian US-05. Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
