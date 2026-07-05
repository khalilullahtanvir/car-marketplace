import type { RepositoryContext } from "./repository-context";
import type { RepositoryResult } from "./repository-result";

export interface RepositoryEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface RepositoryCreateInput<TEntity> {
  values: Partial<TEntity>;
}

export interface RepositoryUpdateInput<TEntity> {
  id: string;
  values: Partial<TEntity>;
}

export interface RepositoryQueryInput {
  limit?: number;
  offset?: number;
}

export interface BaseRepository<TEntity extends RepositoryEntity> {
  readonly context: RepositoryContext;
  findById(id: string): Promise<RepositoryResult<TEntity>>;
  findMany(query?: RepositoryQueryInput): Promise<RepositoryResult<TEntity[]>>;
}

export interface ReadOnlyRepository<TEntity extends RepositoryEntity> {
  findById(id: string): Promise<RepositoryResult<TEntity>>;
  findMany(query?: RepositoryQueryInput): Promise<RepositoryResult<TEntity[]>>;
}

export interface WriteRepository<TEntity extends RepositoryEntity> {
  create(input: RepositoryCreateInput<TEntity>): Promise<RepositoryResult<TEntity>>;
  update(input: RepositoryUpdateInput<TEntity>): Promise<RepositoryResult<TEntity>>;
}

export interface CrudRepository<TEntity extends RepositoryEntity>
  extends ReadOnlyRepository<TEntity>,
    WriteRepository<TEntity> {}

export interface SoftDeleteRepository<TEntity extends RepositoryEntity> {
  softDelete(id: string): Promise<RepositoryResult<TEntity>>;
  restore(id: string): Promise<RepositoryResult<TEntity>>;
}

export interface TimestampRepository<TEntity extends RepositoryEntity> {
  touch(id: string): Promise<RepositoryResult<TEntity>>;
}

export interface AuditRepository<TEntity extends RepositoryEntity> {
  auditTrail(id: string): Promise<RepositoryResult<TEntity[]>>;
}

