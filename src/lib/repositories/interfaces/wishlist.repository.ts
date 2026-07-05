import type { CrudRepository, RepositoryEntity, SoftDeleteRepository, TimestampRepository } from "../base/base-repository";

export interface WishlistEntity extends RepositoryEntity {
  profile_id: string;
  name: string | null;
  is_default: boolean;
}

export interface WishlistRepository
  extends CrudRepository<WishlistEntity>,
    SoftDeleteRepository<WishlistEntity>,
    TimestampRepository<WishlistEntity> {}

