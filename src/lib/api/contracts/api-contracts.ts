import type { RepositoryResult } from "@/lib/repositories";

export interface APIErrorShape {
  code: string;
  message: string;
  details?: unknown;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ErrorResponse {
  success: false;
  error: APIErrorShape;
}

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
}

export interface RequestContext {
  requestId: string;
  pathname: string;
  method: string;
  url: string;
  headers: Headers;
  query: URLSearchParams;
  params: Record<string, string>;
  userId?: string | null;
  role?: string | null;
}

export interface EndpointResult<T> {
  status: number;
  body: APIResponse<T> | ErrorResponse | PaginatedResponse<T>;
}

export interface ApiHandlerInput<TBody = unknown> {
  context: RequestContext;
  body?: TBody;
}

export type ApiHandler<TInput = unknown, TOutput = unknown> = (
  input: ApiHandlerInput<TInput>
) => Promise<EndpointResult<TOutput>> | EndpointResult<TOutput>;

export interface QueryCriteria {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, unknown>;
}

export interface RepositoryApiAdapter<TEntity, TDto = TEntity> {
  toDto(entity: TEntity): TDto;
  toRepositoryResult(result: RepositoryResult<TEntity>): RepositoryResult<TDto>;
}
