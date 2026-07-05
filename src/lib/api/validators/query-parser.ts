import type { QueryCriteria } from "../contracts/api-contracts";
import { normalizePagination, type PaginationInput } from "@/lib/repositories";
import { normalizeSort, type SortInput } from "@/lib/repositories";

export interface ParsedQuery<TFilter extends Record<string, unknown> = Record<string, unknown>> {
  pagination: ReturnType<typeof normalizePagination>;
  sort: ReturnType<typeof normalizeSort<string>>;
  filters: TFilter;
}

export function parsePagination(query: URLSearchParams): PaginationInput {
  const page = Number.parseInt(query.get("page") ?? "", 10);
  const pageSize = Number.parseInt(query.get("pageSize") ?? query.get("limit") ?? "", 10);

  return {
    page: Number.isFinite(page) ? page : undefined,
    pageSize: Number.isFinite(pageSize) ? pageSize : undefined
  };
}

export function parseSort(query: URLSearchParams): SortInput {
  const field = query.get("sort") ?? query.get("sortField") ?? undefined;
  const direction = query.get("direction") === "desc" ? "desc" : query.get("direction") === "asc" ? "asc" : undefined;

  return {
    field: field ?? "",
    direction
  };
}

export function parseFilters(query: URLSearchParams, excludedKeys: string[] = ["page", "pageSize", "limit", "sort", "sortField", "direction"]): Record<string, string> {
  const filters: Record<string, string> = {};

  for (const [key, value] of query.entries()) {
    if (!excludedKeys.includes(key)) {
      filters[key] = value;
    }
  }

  return filters;
}

export function parseQuery(query: URLSearchParams): QueryCriteria {
  const pagination = parsePagination(query);
  const sort = parseSort(query);
  const filters = parseFilters(query);

  return {
    page: pagination.page,
    pageSize: pagination.pageSize,
    sortField: sort.field || undefined,
    sortDirection: sort.direction,
    filters
  };
}

