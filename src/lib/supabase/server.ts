import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/config/env";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: { path?: string; maxAge?: number; httpOnly?: boolean; sameSite?: "lax" | "strict" | "none"; secure?: boolean }) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: { path?: string; maxAge?: number; httpOnly?: boolean; sameSite?: "lax" | "strict" | "none"; secure?: boolean }) {
        cookieStore.set({ name, value: "", ...options, maxAge: 0 });
      }
    }
  });
}
