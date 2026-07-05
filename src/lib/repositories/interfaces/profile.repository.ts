import type { CrudRepository, RepositoryEntity, SoftDeleteRepository, TimestampRepository, AuditRepository } from "../base/base-repository";

export interface ProfileEntity extends RepositoryEntity {
  auth_user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  role: string;
  status: string;
  location_id: string | null;
}

export interface ProfileRepository
  extends CrudRepository<ProfileEntity>,
    SoftDeleteRepository<ProfileEntity>,
    TimestampRepository<ProfileEntity>,
    AuditRepository<ProfileEntity> {}

