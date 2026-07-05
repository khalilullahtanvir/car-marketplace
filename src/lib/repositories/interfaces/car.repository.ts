import type { CrudRepository, RepositoryEntity, SoftDeleteRepository, TimestampRepository, AuditRepository } from "../base/base-repository";

export interface CarEntity extends RepositoryEntity {
  dealer_id: string;
  brand_id: string;
  car_model_id: string;
  location_id: string | null;
  title: string;
  slug: string;
  listing_status: string;
  visibility_status: string;
}

export interface CarRepository
  extends CrudRepository<CarEntity>,
    SoftDeleteRepository<CarEntity>,
    TimestampRepository<CarEntity>,
    AuditRepository<CarEntity> {}

