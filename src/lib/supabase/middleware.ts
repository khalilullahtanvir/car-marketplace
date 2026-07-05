import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/config/env";

export function createSupabaseMiddlewareClient(request: NextRequest, response: NextResponse) {
  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
      flowType: "pkce"
    },
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: { path?: string; maxAge?: number; httpOnly?: boolean; sameSite?: "lax" | "strict" | "none"; secure?: boolean }) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: { path?: string; maxAge?: number; httpOnly?: boolean; sameSite?: "lax" | "strict" | "none"; secure?: boolean }) {
        response.cookies.set({ name, value: "", ...options, maxAge: 0 });
      }
    }
  });
}
