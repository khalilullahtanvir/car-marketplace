import type { CarModel } from "../types/car-types";
import { isAdminRole, isDealerRole, isModeratorRole } from "@/features/auth/utils/roles";

export interface CarPermissionContext {
  actorId?: string | null;
  actorRole?: string | null;
  dealerId?: string | null;
  ownerId?: string | null;
}

export function canReadCar(context: CarPermissionContext): boolean {
  return Boolean(context.actorId || context.actorRole === undefined || context.actorRole);
}

export function canCreateCar(context: CarPermissionContext): boolean {
  return isDealerRole(context.actorRole) || isAdminRole(context.actorRole) || isModeratorRole(context.actorRole);
}

export function canUpdateCar(context: CarPermissionContext, car: Pick<CarModel, "dealer_id">): boolean {
  return isAdminRole(context.actorRole) || context.dealerId === car.dealer_id || context.ownerId === car.dealer_id || isDealerRole(context.actorRole);
}

export function canDeleteCar(context: CarPermissionContext, car: Pick<CarModel, "dealer_id">): boolean {
  return isAdminRole(context.actorRole) || context.dealerId === car.dealer_id || context.ownerId === car.dealer_id;
}

export function canPublishCar(context: CarPermissionContext): boolean {
  return isDealerRole(context.actorRole) || isAdminRole(context.actorRole);
}

export function canArchiveCar(context: CarPermissionContext): boolean {
  return isDealerRole(context.actorRole) || isAdminRole(context.actorRole);
}
