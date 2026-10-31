"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { buatClientAuth } from "@/lib/supabase/auth";

export async function login(formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    redirect("/admin/login?error=" + encodeURIComponent("Email dan password wajib diisi."));
  }

  let pesanError = null;

  try {
    const supabase = await buatClientAuth();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message === "Invalid login credentials") {
        pesanError = "Email atau password salah.";
      } else {
        pesanError = error.message;
      }
    }
  } catch (err) {
    pesanError = err.message || "Terjadi kesalahan saat masuk.";
  }

  if (pesanError) {
    redirect("/admin/login?error=" + encodeURIComponent(pesanError));
  }

  revalidatePath("/admin", "layout");
  redirect("/admin");
}

export async function keluar() {
  try {
    const supabase = await buatClientAuth();
    await supabase.auth.signOut();
  } catch {
    // Tetap redirect ke login meski ada kendala saat signOut
  }

  revalidatePath("/", "layout");
  redirect("/admin/login");
}

