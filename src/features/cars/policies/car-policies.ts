import type { CarPermissionContext } from "../permissions/car-permissions";
import { canArchiveCar, canCreateCar, canDeleteCar, canPublishCar, canReadCar, canUpdateCar } from "../permissions/car-permissions";
import type { CarModel } from "../types/car-types";

export interface CarPolicyResult {
  allowed: boolean;
  reason?: string;
}

export function evaluateCarReadPolicy(context: CarPermissionContext): CarPolicyResult {
  return canReadCar(context) ? { allowed: true } : { allowed: false, reason: "Car read access denied." };
}

export function evaluateCarCreatePolicy(context: CarPermissionContext): CarPolicyResult {
  return canCreateCar(context) ? { allowed: true } : { allowed: false, reason: "Car create access denied." };
}

export function evaluateCarUpdatePolicy(context: CarPermissionContext, car: Pick<CarModel, "dealer_id">): CarPolicyResult {
  return canUpdateCar(context, car) ? { allowed: true } : { allowed: false, reason: "Car update access denied." };
}

export function evaluateCarDeletePolicy(context: CarPermissionContext, car: Pick<CarModel, "dealer_id">): CarPolicyResult {
  return canDeleteCar(context, car) ? { allowed: true } : { allowed: false, reason: "Car delete access denied." };
}

export function evaluateCarPublishPolicy(context: CarPermissionContext): CarPolicyResult {
  return canPublishCar(context) ? { allowed: true } : { allowed: false, reason: "Car publish access denied." };
}

export function evaluateCarArchivePolicy(context: CarPermissionContext): CarPolicyResult {
  return canArchiveCar(context) ? { allowed: true } : { allowed: false, reason: "Car archive access denied." };
}

