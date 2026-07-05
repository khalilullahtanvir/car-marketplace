export const ROLES = {
  buyer: "buyer",
  seller: "seller",
  dealer_admin: "dealer_admin",
  moderator: "moderator",
  admin: "admin",
  super_admin: "super_admin"
} as const;

export type RoleName = keyof typeof ROLES;
export type RoleValue = (typeof ROLES)[RoleName];

export const ROLE_VALUES = Object.values(ROLES);

export function isRoleValue(value: string): value is RoleValue {
  return ROLE_VALUES.includes(value as RoleValue);
}

export function hasRole(userRoles: readonly RoleValue[], role: RoleValue): boolean {
  return userRoles.includes(role);
}
