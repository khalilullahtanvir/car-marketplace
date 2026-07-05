import type { APIResponse, ErrorResponse, PaginatedResponse } from "../contracts/api-contracts";
import { mapErrorToApiError } from "../errors/error-mapper";

export function createSuccessResponse<T>(data: T, meta?: Record<string, unknown>): APIResponse<T> {
  return {
    success: true,
    data,
    meta
  };
}

export function createPaginatedResponse<T>(
  data: T[],
  meta: PaginatedResponse<T>["meta"]
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    meta
  };
}

export function createErrorResponse(error: unknown): ErrorResponse {
  return {
    success: false,
    error: mapErrorToApiError(error)
  };
}

