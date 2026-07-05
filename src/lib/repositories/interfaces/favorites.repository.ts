import type { CrudRepository, RepositoryEntity, TimestampRepository } from "../base/base-repository";

export interface FavoriteEntity extends RepositoryEntity {
  profile_id: string;
  car_id: string;
}

export interface FavoritesRepository extends CrudRepository<FavoriteEntity>, TimestampRepository<FavoriteEntity> {}
