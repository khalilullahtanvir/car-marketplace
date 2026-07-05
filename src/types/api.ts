import type { Pagination } from "@/types/domain";

export interface MetadataResponse {
  readonly pageTitle?: string;
  readonly description?: string;
}

export interface ApiResponse<TData> {
  readonly success: boolean;
  readonly data: TData;
  readonly message?: string;
}

export interface CursorResponse<TData> {
  readonly items: readonly TData[];
  readonly nextCursor?: string | null;
}

export interface PaginatedResponse<TData> {
  readonly items: readonly TData[];
  readonly pagination: Pagination;
}

export interface SuccessResponse<TData> {
  readonly success: true;
  readonly data: TData;
  readonly metadata?: MetadataResponse;
}

export interface ErrorResponse {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string;
  };
}

export interface ServerActionResult<TData> {
  readonly success: boolean;
  readonly data?: TData;
  readonly error?: string;
}

export type ApiResult<TData> = SuccessResponse<TData> | ErrorResponse;
export type ActionResult<TData> = ServerActionResult<TData>;
