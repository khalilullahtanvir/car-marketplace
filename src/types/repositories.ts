import type {
  AISummary,
  Brand,
  Car,
  CompareList,
  Conversation,
  Dealer,
  Favorite,
  Message,
  Notification,
  Profile,
  Review
} from "@/types/domain";

export interface CarRepository {
  findById(id: string): Promise<Car | null>;
  list(): Promise<readonly Car[]>;
}

export interface ProfileRepository {
  findById(id: string): Promise<Profile | null>;
}

export interface BrandRepository {
  list(): Promise<readonly Brand[]>;
}

export interface ReviewRepository {
  listByCarId(carId: string): Promise<readonly Review[]>;
}

export interface NotificationRepository {
  listByProfileId(profileId: string): Promise<readonly Notification[]>;
}

export interface DealerRepository {
  list(): Promise<readonly Dealer[]>;
}

export interface FavoriteRepository {
  listByProfileId(profileId: string): Promise<readonly Favorite[]>;
}

export interface CompareListRepository {
  listByProfileId(profileId: string): Promise<readonly CompareList[]>;
}

export interface ConversationRepository {
  listByProfileId(profileId: string): Promise<readonly Conversation[]>;
}

export interface MessageRepository {
  listByConversationId(conversationId: string): Promise<readonly Message[]>;
}

export interface AISummaryRepository {
  listByCarId(carId: string): Promise<readonly AISummary[]>;
}
