import type { RepositoryEntity } from "@/lib/repositories";
import type {
  CAR_BODY_STYLES,
  CAR_CONDITIONS,
  CAR_DRIVETRAINS,
  CAR_FUEL_TYPES,
  CAR_LISTING_STATUSES,
  CAR_MILEAGE_UNITS,
  CAR_TRANSMISSIONS,
  CAR_VISIBILITY_STATUSES
} from "../constants/car-constants";

export type CarListingStatus = (typeof CAR_LISTING_STATUSES)[number];
export type CarVisibilityStatus = (typeof CAR_VISIBILITY_STATUSES)[number];
export type CarCondition = (typeof CAR_CONDITIONS)[number];
export type CarBodyStyle = (typeof CAR_BODY_STYLES)[number];
export type CarDrivetrain = (typeof CAR_DRIVETRAINS)[number];
export type CarTransmission = (typeof CAR_TRANSMISSIONS)[number];
export type CarFuelType = (typeof CAR_FUEL_TYPES)[number];
export type CarMileageUnit = (typeof CAR_MILEAGE_UNITS)[number];

export interface CarModel extends RepositoryEntity {
  dealer_id: string;
  brand_id: string;
  car_model_id: string;
  location_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  vin: string | null;
  stock_number: string | null;
  year: number;
  price: number;
  currency_code: string;
  mileage: number | null;
  mileage_unit: CarMileageUnit | null;
  transmission: CarTransmission | null;
  fuel_type: CarFuelType | null;
  body_type: CarBodyStyle | null;
  drivetrain: CarDrivetrain | null;
  engine_size: number | null;
  color_exterior: string | null;
  color_interior: string | null;
  condition: CarCondition;
  listing_status: CarListingStatus;
  visibility_status: CarVisibilityStatus;
  featured_until: string | null;
  published_at: string | null;
  sold_at: string | null;
  deleted_at: string | null;
}

export type CarListItem = Pick<
  CarModel,
  | "id"
  | "dealer_id"
  | "brand_id"
  | "car_model_id"
  | "title"
  | "slug"
  | "year"
  | "price"
  | "currency_code"
  | "listing_status"
  | "visibility_status"
  | "featured_until"
  | "published_at"
>;

export type CarDetail = CarModel & {
  is_featured: boolean;
};

export interface CreateCarDto {
  dealerId: string;
  brandId: string;
  carModelId: string;
  locationId?: string | null;
  title: string;
  slug: string;
  description?: string | null;
  vin?: string | null;
  stockNumber?: string | null;
  year: number;
  price: number;
  currencyCode?: string;
  mileage?: number | null;
  mileageUnit?: CarMileageUnit | null;
  transmission?: CarTransmission | null;
  fuelType?: CarFuelType | null;
  bodyType?: CarBodyStyle | null;
  drivetrain?: CarDrivetrain | null;
  engineSize?: number | null;
  colorExterior?: string | null;
  colorInterior?: string | null;
  condition?: CarCondition;
  listingStatus?: CarListingStatus;
  visibilityStatus?: CarVisibilityStatus;
  featuredUntil?: string | null;
}

export interface UpdateCarDto {
  title?: string;
  slug?: string;
  description?: string | null;
  vin?: string | null;
  stockNumber?: string | null;
  year?: number;
  price?: number;
  currencyCode?: string;
  mileage?: number | null;
  mileageUnit?: CarMileageUnit | null;
  transmission?: CarTransmission | null;
  fuelType?: CarFuelType | null;
  bodyType?: CarBodyStyle | null;
  drivetrain?: CarDrivetrain | null;
  engineSize?: number | null;
  colorExterior?: string | null;
  colorInterior?: string | null;
  condition?: CarCondition;
  listingStatus?: CarListingStatus;
  visibilityStatus?: CarVisibilityStatus;
  featuredUntil?: string | null;
  publishedAt?: string | null;
  soldAt?: string | null;
}

export interface CarListDto {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
  items: CarListItem[];
}

export type CarDetailDto = CarDetail;
