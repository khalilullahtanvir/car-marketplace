import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sanitizeRedirectPath } from "../utils/redirect";
import { isAdminRole, isDealerRole, isModeratorRole } from "../utils/roles";
import { getCurrentSession } from "./session-service";

export async function requireAuth(redirectTo = "/login") {
  const session = await getCurrentSession();
  if (!session.data.session) {
    redirect(redirectTo);
  }
  return session.data.session;
}

export async function requireGuest(redirectTo = "/") {
  const session = await getCurrentSession();
  if (session.data.session) {
    redirect(redirectTo);
  }
}

export async function requireRole(allowed: readonly string[], redirectTo = "/") {
  const session = await requireAuth();
  const role = session.user.role ?? null;
  if (!role || !allowed.includes(role)) {
    redirect(redirectTo);
  }
  return session;
}

export async function requireAdmin(redirectTo = "/") {
  return requireRole(["admin"], redirectTo);
}

export async function requireModerator(redirectTo = "/") {
  return requireRole(["moderator", "admin"], redirectTo);
}

export async function requireDealerMember(redirectTo = "/") {
  const session = await requireAuth();
  const role = session.user.role ?? null;
  if (!role || !isDealerRole(role)) {
    redirect(redirectTo);
  }
  return session;
}

export async function getSafeRedirectFromCookies(fallback = "/") {
  const cookieStore = await cookies();
  return sanitizeRedirectPath(cookieStore.get("next-path")?.value, fallback);
}

export function canAccessRole(role: string | null | undefined, required: readonly string[]) {
  if (!role) return false;
  if (required.includes(role)) return true;
  if (isAdminRole(role)) return true;
  if (isModeratorRole(role) && required.includes("moderator")) return true;
  return false;
}
