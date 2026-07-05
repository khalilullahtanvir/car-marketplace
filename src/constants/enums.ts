export const FuelType = {
  petrol: "petrol",
  diesel: "diesel",
  hybrid: "hybrid",
  plugInHybrid: "plug_in_hybrid",
  electric: "electric",
  hydrogen: "hydrogen",
  cng: "cng",
  lpg: "lpg"
} as const;

export type FuelTypeValue = (typeof FuelType)[keyof typeof FuelType];

export const Transmission = {
  automatic: "automatic",
  manual: "manual",
  cvt: "cvt",
  dualClutch: "dual_clutch",
  singleSpeed: "single_speed"
} as const;

export type TransmissionValue = (typeof Transmission)[keyof typeof Transmission];

export const DriveType = {
  fwd: "fwd",
  rwd: "rwd",
  awd: "awd",
  fourWd: "4wd"
} as const;

export type DriveTypeValue = (typeof DriveType)[keyof typeof DriveType];

export const BodyType = {
  sedan: "sedan",
  suv: "suv",
  hatchback: "hatchback",
  coupe: "coupe",
  convertible: "convertible",
  wagon: "wagon",
  pickup: "pickup",
  van: "van",
  crossover: "crossover",
  sportsCar: "sports_car",
  luxurySedan: "luxury_sedan"
} as const;

export type BodyTypeValue = (typeof BodyType)[keyof typeof BodyType];

export const VehicleCondition = {
  new: "new",
  used: "used",
  certified: "certified"
} as const;

export type VehicleConditionValue = (typeof VehicleCondition)[keyof typeof VehicleCondition];

export const VehicleStatus = {
  draft: "draft",
  pending_review: "pending_review",
  published: "published",
  paused: "paused",
  rejected: "rejected",
  expired: "expired",
  sold: "sold",
  archived: "archived"
} as const;

export type VehicleStatusValue = (typeof VehicleStatus)[keyof typeof VehicleStatus];

export const ListingStatus = VehicleStatus;
export type ListingStatusValue = VehicleStatusValue;

export const Currency = {
  usd: "USD",
  eur: "EUR",
  gbp: "GBP"
} as const;

export type CurrencyValue = (typeof Currency)[keyof typeof Currency];

export const NotificationType = {
  account: "account",
  listing: "listing",
  priceDrop: "price_drop",
  lead: "lead",
  message: "message",
  report: "report",
  verification: "verification",
  system: "system",
  marketing: "marketing"
} as const;

export type NotificationTypeValue = (typeof NotificationType)[keyof typeof NotificationType];

export const ReviewStatus = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  hidden: "hidden"
} as const;

export type ReviewStatusValue = (typeof ReviewStatus)[keyof typeof ReviewStatus];

export const ConversationStatus = {
  open: "open",
  closed: "closed",
  archived: "archived"
} as const;

export type ConversationStatusValue = (typeof ConversationStatus)[keyof typeof ConversationStatus];

export const MessageType = {
  text: "text",
  system: "system",
  attachment: "attachment",
  lead: "lead"
} as const;

export type MessageTypeValue = (typeof MessageType)[keyof typeof MessageType];

export const DealerStatus = {
  pending: "pending",
  active: "active",
  suspended: "suspended",
  archived: "archived"
} as const;

export type DealerStatusValue = (typeof DealerStatus)[keyof typeof DealerStatus];

export const ImageType = {
  cover: "cover",
  gallery: "gallery",
  detail: "detail"
} as const;

export type ImageTypeValue = (typeof ImageType)[keyof typeof ImageType];

export const DocumentType = {
  registration: "registration",
  inspection: "inspection",
  warranty: "warranty",
  title: "title",
  serviceHistory: "service_history",
  other: "other"
} as const;

export type DocumentTypeValue = (typeof DocumentType)[keyof typeof DocumentType];

export const AIJobStatus = {
  queued: "queued",
  running: "running",
  succeeded: "succeeded",
  failed: "failed",
  canceled: "canceled"
} as const;

export type AIJobStatusValue = (typeof AIJobStatus)[keyof typeof AIJobStatus];

export const AIModel = {
  gpt5: "gpt-5",
  gpt5Mini: "gpt-5-mini",
  gpt5Nano: "gpt-5-nano"
} as const;

export type AIModelValue = (typeof AIModel)[keyof typeof AIModel];

export const SortOrder = {
  asc: "asc",
  desc: "desc"
} as const;

export type SortOrderValue = (typeof SortOrder)[keyof typeof SortOrder];

export const ThemeMode = {
  light: "light",
  dark: "dark",
  system: "system"
} as const;

export type ThemeModeValue = (typeof ThemeMode)[keyof typeof ThemeMode];
