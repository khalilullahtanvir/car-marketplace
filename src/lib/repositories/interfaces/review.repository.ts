import type { CrudRepository, RepositoryEntity, SoftDeleteRepository, TimestampRepository, AuditRepository } from "../base/base-repository";

export interface ReviewEntity extends RepositoryEntity {
  profile_id: string;
  dealer_id: string | null;
  car_id: string | null;
  rating: number;
  status: string;
}

export interface ReviewRepository
  extends CrudRepository<ReviewEntity>,
    SoftDeleteRepository<ReviewEntity>,
    TimestampRepository<ReviewEntity>,
    AuditRepository<ReviewEntity> {}

