import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/config/env";

export function createSupabaseAdminClient() {
  if (typeof env.SUPABASE_SERVICE_ROLE_KEY !== "string") {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY for admin Supabase client.");
  }

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
