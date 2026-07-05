import type { CrudRepository, RepositoryEntity, SoftDeleteRepository, TimestampRepository, AuditRepository } from "../base/base-repository";

export interface NotificationEntity extends RepositoryEntity {
  profile_id: string;
  type: string;
  title: string;
  body: string;
  read_at: string | null;
}

export interface NotificationRepository
  extends CrudRepository<NotificationEntity>,
    SoftDeleteRepository<NotificationEntity>,
    TimestampRepository<NotificationEntity>,
    AuditRepository<NotificationEntity> {}

