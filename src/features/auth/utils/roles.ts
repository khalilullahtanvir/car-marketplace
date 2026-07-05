export const AUTH_ROLES = ["user", "dealer_owner", "dealer_manager", "dealer_staff", "moderator", "admin"] as const;

export type AuthRole = (typeof AUTH_ROLES)[number];

export function isAuthRole(value: string | null | undefined): value is AuthRole {
  return typeof value === "string" && AUTH_ROLES.includes(value as AuthRole);
}

export function isAdminRole(role: string | null | undefined): role is "admin" {
  return role === "admin";
}

export function isModeratorRole(role: string | null | undefined): role is "moderator" | "admin" {
  return role === "moderator" || role === "admin";
}

export function isDealerRole(role: string | null | undefined): role is "dealer_owner" | "dealer_manager" | "dealer_staff" {
  return role === "dealer_owner" || role === "dealer_manager" || role === "dealer_staff";
}

