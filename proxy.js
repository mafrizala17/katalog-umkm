import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function proxy(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const rawUrl = process.env.SUPABASE_URL;
  const rawKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  let supabaseUrl = rawUrl?.trim().replace(/^["']|["']$/g, "");
  const supabasePublishableKey = rawKey?.trim().replace(/^["']|["']$/g, "");

  if (!supabaseUrl || !supabasePublishableKey) {
    return response;
  }

  try {
    const parsed = new URL(supabaseUrl);
    supabaseUrl = parsed.origin;
  } catch {
    // Biarkan apa adanya jika bukan format URL standar
  }

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Semua rute /admin kecuali /admin/login wajib login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      const urlLogin = request.nextUrl.clone();
      urlLogin.pathname = "/admin/login";
      return NextResponse.redirect(urlLogin);
    }
  }

  // Jika sudah login dan mengakses halaman /admin/login, alihkan ke /admin
  if (pathname === "/admin/login" && user) {
    const urlAdmin = request.nextUrl.clone();
    urlAdmin.pathname = "/admin";
    return NextResponse.redirect(urlAdmin);
  }

  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export default proxy;

