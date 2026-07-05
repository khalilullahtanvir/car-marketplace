export interface PaginationInput {
  page?: number;
  pageSize?: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  offset: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

export function normalizePagination(input: PaginationInput = {}): PaginationState {
  const page = Number.isFinite(input.page) && (input.page ?? 1) > 0 ? Math.floor(input.page ?? 1) : 1;
  const pageSize = Number.isFinite(input.pageSize) && (input.pageSize ?? 20) > 0 ? Math.floor(input.pageSize ?? 20) : 20;

  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
    limit: pageSize
  };
}

export function buildPaginationMeta(total: number, page: number, pageSize: number): PaginationMeta {
  return {
    page,
    pageSize,
    total,
    pageCount: pageSize > 0 ? Math.ceil(total / pageSize) : 0
  };
}

