import { createSupabaseServerClient } from "@/lib/supabase";

export async function getCurrentSession() {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
}

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getUser();
}

export async function getCurrentProfileRole() {
  const user = await getCurrentUser();
  return (user.data.user?.app_metadata?.role as string | null) ?? null;
}
