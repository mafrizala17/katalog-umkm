import KartuProduk from "@/components/KartuProduk";
import { toko } from "@/lib/toko";
import { buatClientServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog() {
  let daftarProduk = [];
  let errorPesan = null;

  try {
    const supabase = buatClientServer();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      const isHtml = typeof error.message === "string" && error.message.trim().startsWith("<");
      errorPesan = isHtml
        ? "Gagal memuat produk: Respons database tidak valid. Pastikan SUPABASE_URL mengarah ke Project URL Supabase (https://<project-ref>.supabase.co), bukan URL Vercel."
        : `Gagal memuat produk: ${error.message}`;
    } else {
      daftarProduk = data ?? [];
    }
  } catch (err) {
    const isHtml = typeof err.message === "string" && err.message.trim().startsWith("<");
    errorPesan = isHtml
      ? "Gagal memuat produk: Respons database tidak valid. Pastikan SUPABASE_URL mengarah ke Project URL Supabase (https://<project-ref>.supabase.co), bukan URL Vercel."
      : `Gagal memuat produk: ${err.message}`;
  }

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5">
        <h2 id="judul-produk" className="text-xl font-bold">
          Produk kami
        </h2>

        {errorPesan ? (
          <p className="rounded-xl border border-garis bg-permukaan p-4 text-sm text-bahaya">
            {errorPesan}
          </p>
        ) : daftarProduk.length === 0 ? (
          <p className="py-8 text-teks-lembut">Belum ada produk</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
