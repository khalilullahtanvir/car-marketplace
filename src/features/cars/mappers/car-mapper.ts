import type { RepositoryEntity } from "@/lib/repositories";
import type {
  CarDetail,
  CarDetailDto,
  CarListDto,
  CarListItem,
  CarModel,
  CreateCarDto,
  UpdateCarDto
} from "../types/car-types";

export interface CarRepositoryRow extends RepositoryEntity {
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
  mileage_unit: string | null;
  transmission: string | null;
  fuel_type: string | null;
  body_type: string | null;
  drivetrain: string | null;
  engine_size: number | null;
  color_exterior: string | null;
  color_interior: string | null;
  condition: string;
  listing_status: string;
  visibility_status: string;
  featured_until: string | null;
  published_at: string | null;
  sold_at: string | null;
  deleted_at: string | null;
}

export function mapCarRowToModel(row: CarRepositoryRow): CarModel {
  return {
    ...row,
    mileage_unit: row.mileage_unit as CarModel["mileage_unit"],
    transmission: row.transmission as CarModel["transmission"],
    fuel_type: row.fuel_type as CarModel["fuel_type"],
    body_type: row.body_type as CarModel["body_type"],
    drivetrain: row.drivetrain as CarModel["drivetrain"],
    condition: row.condition as CarModel["condition"],
    listing_status: row.listing_status as CarModel["listing_status"],
    visibility_status: row.visibility_status as CarModel["visibility_status"]
  };
}

export function mapCarRowToListItem(row: CarRepositoryRow): CarListItem {
  return {
    id: row.id,
    dealer_id: row.dealer_id,
    brand_id: row.brand_id,
    car_model_id: row.car_model_id,
    title: row.title,
    slug: row.slug,
    year: row.year,
    price: row.price,
    currency_code: row.currency_code,
    listing_status: row.listing_status as CarListItem["listing_status"],
    visibility_status: row.visibility_status as CarListItem["visibility_status"],
    featured_until: row.featured_until,
    published_at: row.published_at
  };
}

export function mapCarModelToDetailDto(model: CarDetail): CarDetailDto {
  return model;
}

export function mapCreateCarDtoToPayload(dto: CreateCarDto): Record<string, unknown> {
  return {
    dealer_id: dto.dealerId,
    brand_id: dto.brandId,
    car_model_id: dto.carModelId,
    location_id: dto.locationId ?? null,
    title: dto.title,
    slug: dto.slug,
    description: dto.description ?? null,
    vin: dto.vin ?? null,
    stock_number: dto.stockNumber ?? null,
    year: dto.year,
    price: dto.price,
    currency_code: dto.currencyCode ?? "USD",
    mileage: dto.mileage ?? null,
    mileage_unit: dto.mileageUnit ?? null,
    transmission: dto.transmission ?? null,
    fuel_type: dto.fuelType ?? null,
    body_type: dto.bodyType ?? null,
    drivetrain: dto.drivetrain ?? null,
    engine_size: dto.engineSize ?? null,
    color_exterior: dto.colorExterior ?? null,
    color_interior: dto.colorInterior ?? null,
    condition: dto.condition ?? "used",
    listing_status: dto.listingStatus ?? "draft",
    visibility_status: dto.visibilityStatus ?? "private",
    featured_until: dto.featuredUntil ?? null
  };
}

export function mapUpdateCarDtoToPayload(dto: UpdateCarDto): Record<string, unknown> {
  return {
    title: dto.title,
    slug: dto.slug,
    description: dto.description,
    vin: dto.vin,
    stock_number: dto.stockNumber,
    year: dto.year,
    price: dto.price,
    currency_code: dto.currencyCode,
    mileage: dto.mileage,
    mileage_unit: dto.mileageUnit,
    transmission: dto.transmission,
    fuel_type: dto.fuelType,
    body_type: dto.bodyType,
    drivetrain: dto.drivetrain,
    engine_size: dto.engineSize,
    color_exterior: dto.colorExterior,
    color_interior: dto.colorInterior,
    condition: dto.condition,
    listing_status: dto.listingStatus,
    visibility_status: dto.visibilityStatus,
    featured_until: dto.featuredUntil,
    published_at: dto.publishedAt,
    sold_at: dto.soldAt
  };
}

export function mapCarListToDto(items: CarListItem[], total: number, page: number, pageSize: number): CarListDto {
  return {
    items,
    total,
    page,
    pageSize,
    pageCount: pageSize > 0 ? Math.ceil(total / pageSize) : 0
  };
}
