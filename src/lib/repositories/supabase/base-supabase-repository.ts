import type { SupabaseClient } from "@supabase/supabase-js";
import type { BaseRepository, RepositoryEntity, RepositoryQueryInput } from "../base/base-repository";
import type { RepositoryContext } from "../base/repository-context";
import type { RepositoryResult } from "../base/repository-result";

export abstract class SupabaseBaseRepository<TEntity extends RepositoryEntity> implements BaseRepository<TEntity> {
  constructor(public readonly context: RepositoryContext) {}

  protected get client(): SupabaseClient {
    return this.context.supabase;
  }

  abstract findById(id: string): Promise<RepositoryResult<TEntity>>;
  abstract findMany(query?: RepositoryQueryInput): Promise<RepositoryResult<TEntity[]>>;
}

