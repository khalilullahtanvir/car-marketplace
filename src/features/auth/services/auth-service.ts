import type { OAuthProvider } from "../types";
import { sanitizeRedirectPath } from "../utils/redirect";
import { normalizeAuthError } from "../utils/auth-error";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { env } from "@/lib/config/env";

export async function signInWithEmail(email: string, password: string) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error: error ? normalizeAuthError(error) : null };
}

export async function signUpWithEmail(email: string, password: string, redirectTo?: string) {
  const supabase = createSupabaseBrowserClient();
  const emailRedirectTo = new URL(sanitizeRedirectPath(redirectTo, "/auth/verify"), env.NEXT_PUBLIC_SITE_URL).toString();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo }
  });

  return { data, error: error ? normalizeAuthError(error) : null };
}

export async function signInWithOAuth(provider: OAuthProvider, redirectTo?: string) {
  const supabase = createSupabaseBrowserClient();
  const redirectUrl = new URL(sanitizeRedirectPath(redirectTo, "/auth/callback"), env.NEXT_PUBLIC_SITE_URL).toString();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: redirectUrl }
  });

  return { data, error: error ? normalizeAuthError(error) : null };
}

export async function sendPasswordReset(email: string, redirectTo?: string) {
  const supabase = createSupabaseBrowserClient();
  const emailRedirectTo = new URL(sanitizeRedirectPath(redirectTo, "/auth/reset-password"), env.NEXT_PUBLIC_SITE_URL).toString();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: emailRedirectTo
  });

  return { data, error: error ? normalizeAuthError(error) : null };
}

export async function updatePassword(password: string) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.auth.updateUser({ password });
  return { data, error: error ? normalizeAuthError(error) : null };
}

export async function signOut() {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();
  return { error: error ? normalizeAuthError(error) : null };
}

export async function resendVerificationEmail(email: string) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email
  });
  return { data, error: error ? normalizeAuthError(error) : null };
}
