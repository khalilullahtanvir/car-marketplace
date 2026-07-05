import type { RepositoryError } from "./repository-error";

export type RepositoryResult<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: RepositoryError;
    };

export type RepositoryListResult<T> = RepositoryResult<{
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}>;

