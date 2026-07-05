import type { CrudRepository, RepositoryEntity, SoftDeleteRepository, TimestampRepository } from "../base/base-repository";

export interface CompareListEntity extends RepositoryEntity {
  profile_id: string | null;
  session_key: string | null;
  name: string | null;
}

export interface CompareItemEntity extends RepositoryEntity {
  compare_list_id: string;
  car_id: string;
  sort_order: number;
}

export interface CompareRepository
  extends CrudRepository<CompareListEntity>,
    SoftDeleteRepository<CompareListEntity>,
    TimestampRepository<CompareListEntity> {}

export interface CompareItemRepository
  extends CrudRepository<CompareItemEntity>,
    SoftDeleteRepository<CompareItemEntity>,
    TimestampRepository<CompareItemEntity> {}

