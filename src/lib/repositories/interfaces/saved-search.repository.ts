import type { CrudRepository, RepositoryEntity, SoftDeleteRepository, TimestampRepository, AuditRepository } from "../base/base-repository";

export interface SavedSearchEntity extends RepositoryEntity {
  profile_id: string;
  name: string | null;
  query_json: Record<string, unknown>;
  is_active: boolean;
}

export interface SavedSearchRepository
  extends CrudRepository<SavedSearchEntity>,
    SoftDeleteRepository<SavedSearchEntity>,
    TimestampRepository<SavedSearchEntity>,
    AuditRepository<SavedSearchEntity> {}

