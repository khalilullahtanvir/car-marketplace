import type { RoleValue } from "@/constants/roles";

export const PERMISSIONS = {
  create_car: "create_car",
  edit_car: "edit_car",
  delete_car: "delete_car",
  publish_car: "publish_car",
  feature_car: "feature_car",
  approve_listing: "approve_listing",
  review_listing: "review_listing",
  manage_reviews: "manage_reviews",
  manage_users: "manage_users",
  manage_roles: "manage_roles",
  manage_dealers: "manage_dealers",
  manage_reports: "manage_reports",
  manage_notifications: "manage_notifications",
  manage_ai: "manage_ai"
} as const;

export type PermissionName = keyof typeof PERMISSIONS;
export type PermissionValue = (typeof PERMISSIONS)[PermissionName];

export const ROLE_PERMISSION_MAP: Readonly<Record<RoleValue, readonly PermissionValue[]>> = {
  buyer: [],
  seller: [PERMISSIONS.create_car, PERMISSIONS.edit_car, PERMISSIONS.delete_car, PERMISSIONS.publish_car],
  dealer_admin: [
    PERMISSIONS.create_car,
    PERMISSIONS.edit_car,
    PERMISSIONS.delete_car,
    PERMISSIONS.publish_car,
    PERMISSIONS.feature_car,
    PERMISSIONS.manage_dealers
  ],
  moderator: [PERMISSIONS.review_listing, PERMISSIONS.approve_listing, PERMISSIONS.manage_reviews, PERMISSIONS.manage_reports],
  admin: [
    PERMISSIONS.review_listing,
    PERMISSIONS.approve_listing,
    PERMISSIONS.manage_reviews,
    PERMISSIONS.manage_users,
    PERMISSIONS.manage_roles,
    PERMISSIONS.manage_dealers,
    PERMISSIONS.manage_reports,
    PERMISSIONS.manage_notifications,
    PERMISSIONS.manage_ai
  ],
  super_admin: [...Object.values(PERMISSIONS)]
};

export function hasPermission(userPermissions: readonly PermissionValue[], permission: PermissionValue): boolean {
  return userPermissions.includes(permission);
}

export function canAccess(userRoles: readonly RoleValue[], permission: PermissionValue): boolean {
  return userRoles.some((role) => ROLE_PERMISSION_MAP[role].includes(permission));
}

export function getPermissionsForRoles(userRoles: readonly RoleValue[]): PermissionValue[] {
  return userRoles.flatMap((role) => ROLE_PERMISSION_MAP[role]);
}

export function isPermissionValue(value: string): value is PermissionValue {
  return Object.values(PERMISSIONS).includes(value as PermissionValue);
}
