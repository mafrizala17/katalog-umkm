import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function buatClientAuth() {
  const cookieStore = await cookies();

  const rawUrl = process.env.SUPABASE_URL;
  const rawKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  let supabaseUrl = rawUrl?.trim().replace(/^["']|["']$/g, "");
  const supabasePublishableKey = rawKey?.trim().replace(/^["']|["']$/g, "");

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY belum diatur di environment variable."
    );
  }

  try {
    const parsed = new URL(supabaseUrl);
    supabaseUrl = parsed.origin;
  } catch {
    // Biarkan apa adanya jika bukan format URL standar
  }

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Abaikan jika dipanggil dari Server Component yang tidak mengizinkan penulisan cookie
        }
      },
    },
  });
}

