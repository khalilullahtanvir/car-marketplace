import type { CrudRepository, RepositoryEntity, SoftDeleteRepository, TimestampRepository, AuditRepository } from "../base/base-repository";

export interface DealerEntity extends RepositoryEntity {
  owner_profile_id: string;
  name: string;
  slug: string;
  location_id: string | null;
  status: string;
}

export interface DealerRepository
  extends CrudRepository<DealerEntity>,
    SoftDeleteRepository<DealerEntity>,
    TimestampRepository<DealerEntity>,
    AuditRepository<DealerEntity> {}

