import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase";
import { sanitizeRedirectPath } from "@/features/auth";

const PROTECTED_PREFIXES = ["/dashboard", "/account", "/dealer", "/admin"];
const GUEST_ONLY_PREFIXES = ["/login", "/signup", "/forgot-password", "/reset-password"];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isGuestOnlyPath(pathname: string) {
  return GUEST_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers }
  });

  const supabase = createSupabaseMiddlewareClient(request, response);
  const { data } = await supabase.auth.getSession();
  const pathname = request.nextUrl.pathname;

  if (isProtectedPath(pathname) && !data.session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", sanitizeRedirectPath(pathname, "/"));
    return NextResponse.redirect(url);
  }

  if (isGuestOnlyPath(pathname) && data.session) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]
};
