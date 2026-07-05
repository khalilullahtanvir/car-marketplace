"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { loginSchema, passwordResetSchema, signupSchema, updatePasswordSchema, authProviderSchema } from "../schemas/auth-schemas";
import { normalizeAuthError } from "../utils/auth-error";
import { sanitizeRedirectPath } from "../utils/redirect";
import { sendPasswordReset, signInWithEmail, signInWithOAuth, signOut, signUpWithEmail, updatePassword, resendVerificationEmail } from "../services/auth-service";
import type { AuthErrorShape, OAuthProvider } from "../types";
import { createSupabaseServerClient } from "@/lib/supabase";

type ActionResult<T = unknown> = {
  data: T | null;
  error: AuthErrorShape | null;
};

async function getOrigin() {
  const headerStore = await headers();
  return headerStore.get("origin") ?? "/";
}

export async function loginAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { data: null, error: { code: "invalid_credentials", message: parsed.error.issues[0]?.message ?? "Invalid input." } };
  }

  const result = await signInWithEmail(parsed.data.email, parsed.data.password);
  return { data: result.data?.user ?? null, error: result.error };
}

export async function signupAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!parsed.success) {
    return { data: null, error: { code: "signup_error", message: parsed.error.issues[0]?.message ?? "Invalid input." } };
  }

  const result = await signUpWithEmail(parsed.data.email, parsed.data.password, `${await getOrigin()}/auth/verify`);
  return { data: result.data?.user ?? null, error: result.error };
}

export async function passwordResetRequestAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = passwordResetSchema.safeParse({
    email: formData.get("email")
  });

  if (!parsed.success) {
    return { data: null, error: { code: "password_reset_error", message: parsed.error.issues[0]?.message ?? "Invalid input." } };
  }

  const result = await sendPasswordReset(parsed.data.email, `${await getOrigin()}/auth/reset-password`);
  return { data: result.data ?? null, error: result.error };
}

export async function updatePasswordAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = updatePasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!parsed.success) {
    return { data: null, error: { code: "password_reset_error", message: parsed.error.issues[0]?.message ?? "Invalid input." } };
  }

  const result = await updatePassword(parsed.data.password);
  revalidatePath("/");
  return { data: result.data?.user ?? null, error: result.error };
}

export async function logoutAction(): Promise<ActionResult> {
  const result = await signOut();
  revalidatePath("/");
  return { data: null, error: result.error };
}

export async function oauthAction(provider: OAuthProvider, redirectTo?: string): Promise<ActionResult<{ url: string }>> {
  const parsed = authProviderSchema.safeParse(provider);
  if (!parsed.success) {
    return { data: null, error: { code: "oauth_error", message: "Unsupported OAuth provider." } };
  }

  const result = await signInWithOAuth(parsed.data, sanitizeRedirectPath(redirectTo, "/auth/callback"));
  return { data: result.data?.url ? { url: result.data.url } : null, error: result.error };
}

export async function resendVerificationAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = passwordResetSchema.safeParse({
    email: formData.get("email")
  });

  if (!parsed.success) {
    return { data: null, error: { code: "verification_error", message: parsed.error.issues[0]?.message ?? "Invalid input." } };
  }

  const result = await resendVerificationEmail(parsed.data.email);
  return { data: result.data ?? null, error: result.error };
}

export async function syncSessionAction() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  return { session: data.session };
}
