import { createClient } from "@supabase/supabase-js";

export function buatClientServer() {
  const rawUrl = process.env.SUPABASE_URL;
  const rawSecret = process.env.SUPABASE_SECRET_KEY;

  let supabaseUrl = rawUrl?.trim().replace(/^["']|["']$/g, "");
  const supabaseSecretKey = rawSecret?.trim().replace(/^["']|["']$/g, "");

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  // Bersihkan path seperti /rest/v1 atau trailing slash jika terbawa di SUPABASE_URL
  try {
    const parsed = new URL(supabaseUrl);
    supabaseUrl = parsed.origin;
  } catch {
    // Biarkan apa adanya jika bukan format URL standar
  }

  return createClient(supabaseUrl, supabaseSecretKey);
}

export const createClientServer = buatClientServer;
export default buatClientServer;

