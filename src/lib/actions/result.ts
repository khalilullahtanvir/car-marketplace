import type { ApiResponse } from "@/types/api";
import type { ServerActionResult } from "@/types/api";

export function success<TData>(data: TData): ServerActionResult<TData> {
  return { success: true, data };
}

export function failure(message: string): ServerActionResult<never> {
  return { success: false, error: message };
}

export function validationFailure(message: string): ServerActionResult<never> {
  return { success: false, error: message };
}

export function unauthorized(message = "Unauthorized"): ServerActionResult<never> {
  return { success: false, error: message };
}

export function forbidden(message = "Forbidden"): ServerActionResult<never> {
  return { success: false, error: message };
}

export function apiSuccess<TData>(data: TData): ApiResponse<TData> {
  return { success: true, data };
}
