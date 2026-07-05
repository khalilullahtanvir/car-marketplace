import type {
  AIJobStatusValue,
  AIModelValue,
  BodyTypeValue,
  ConversationStatusValue,
  CurrencyValue,
  DealerStatusValue,
  DocumentTypeValue,
  DriveTypeValue,
  FuelTypeValue,
  ImageTypeValue,
  ListingStatusValue,
  MessageTypeValue,
  NotificationTypeValue,
  ReviewStatusValue,
  SortOrderValue,
  ThemeModeValue,
  TransmissionValue,
  VehicleConditionValue,
  VehicleStatusValue
} from "@/constants";
import type { RoleValue } from "@/constants";

export interface Profile {
  readonly id: string;
  readonly userId: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: RoleValue;
}

export interface Brand {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
}

export interface Model {
  readonly id: string;
  readonly brandId: string;
  readonly name: string;
  readonly slug: string;
}

export interface Generation {
  readonly id: string;
  readonly modelId: string;
  readonly name: string;
  readonly slug: string;
}

export interface Car {
  readonly id: string;
  readonly profileId: string;
  readonly brandId: string;
  readonly modelId: string;
  readonly generationId?: string | null;
  readonly title: string;
  readonly status: VehicleStatusValue | ListingStatusValue;
}

export interface CarImage {
  readonly id: string;
  readonly carId: string;
  readonly imageType: ImageTypeValue;
  readonly url: string;
}

export interface CarDocument {
  readonly id: string;
  readonly carId: string;
  readonly documentType: DocumentTypeValue;
  readonly url: string;
}

export interface Favorite {
  readonly id: string;
  readonly profileId: string;
  readonly carId: string;
}

export interface CompareList {
  readonly id: string;
  readonly profileId: string;
  readonly title: string;
}

export interface Review {
  readonly id: string;
  readonly profileId: string;
  readonly carId: string;
  readonly status: ReviewStatusValue;
}

export interface Conversation {
  readonly id: string;
  readonly carId: string;
  readonly buyerProfileId: string;
  readonly sellerProfileId: string;
  readonly status: ConversationStatusValue;
}

export interface Message {
  readonly id: string;
  readonly conversationId: string;
  readonly senderProfileId: string;
  readonly type: MessageTypeValue;
}

export interface Notification {
  readonly id: string;
  readonly profileId: string;
  readonly type: NotificationTypeValue;
}

export interface Dealer {
  readonly id: string;
  readonly name: string;
  readonly status: DealerStatusValue;
}

export interface Address {
  readonly id: string;
  readonly profileId: string;
  readonly line1: string;
  readonly city: string;
}

export interface UserPreference {
  readonly id: string;
  readonly profileId: string;
  readonly themeMode: ThemeModeValue;
}

export interface AISummary {
  readonly id: string;
  readonly carId: string;
  readonly model: AIModelValue;
  readonly status: AIJobStatusValue;
}

export interface SearchFilters {
  readonly query: string;
  readonly brandIds?: readonly string[];
  readonly modelIds?: readonly string[];
  readonly fuelTypes?: readonly FuelTypeValue[];
  readonly transmission?: TransmissionValue[];
  readonly bodyTypes?: readonly BodyTypeValue[];
  readonly conditions?: readonly VehicleConditionValue[];
  readonly driveTypes?: readonly DriveTypeValue[];
  readonly currency?: CurrencyValue;
  readonly sort?: SortOrderValue;
}

export interface Pagination {
  readonly page: number;
  readonly pageSize: number;
  readonly total?: number;
}
