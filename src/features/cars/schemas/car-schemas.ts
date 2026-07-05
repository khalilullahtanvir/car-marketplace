import { z } from "zod";
import {
  CAR_BODY_STYLES,
  CAR_CONDITIONS,
  CAR_DEFAULT_PAGE_SIZE,
  CAR_FUEL_TYPES,
  CAR_LISTING_STATUSES,
  CAR_MAX_PAGE_SIZE,
  CAR_MAX_YEAR,
  CAR_MILEAGE_UNITS,
  CAR_MIN_YEAR,
  CAR_SORT_FIELDS,
  CAR_TRANSMISSIONS,
  CAR_VISIBILITY_STATUSES
} from "../constants/car-constants";

const nullableString = z.string().trim().min(1).nullable().optional();

export const carListingStatusSchema = z.enum(CAR_LISTING_STATUSES);
export const carVisibilityStatusSchema = z.enum(CAR_VISIBILITY_STATUSES);
export const carConditionSchema = z.enum(CAR_CONDITIONS);
export const carBodyStyleSchema = z.enum(CAR_BODY_STYLES);
export const carDrivetrainSchema = z.enum(["fwd", "rwd", "awd", "4wd"]);
export const carTransmissionSchema = z.enum(CAR_TRANSMISSIONS);
export const carFuelTypeSchema = z.enum(CAR_FUEL_TYPES);
export const carMileageUnitSchema = z.enum(CAR_MILEAGE_UNITS);

export const createCarSchema = z.object({
  dealerId: z.string().uuid(),
  brandId: z.string().uuid(),
  carModelId: z.string().uuid(),
  locationId: z.string().uuid().nullable().optional(),
  title: z.string().trim().min(1).max(255),
  slug: z.string().trim().min(1).max(255),
  description: z.string().trim().max(5000).nullable().optional(),
  vin: z.string().trim().min(1).max(64).nullable().optional(),
  stockNumber: z.string().trim().min(1).max(64).nullable().optional(),
  year: z.number().int().min(CAR_MIN_YEAR).max(CAR_MAX_YEAR),
  price: z.number().nonnegative(),
  currencyCode: z.string().trim().length(3).default("USD").optional(),
  mileage: z.number().int().nonnegative().nullable().optional(),
  mileageUnit: carMileageUnitSchema.nullable().optional(),
  transmission: carTransmissionSchema.nullable().optional(),
  fuelType: carFuelTypeSchema.nullable().optional(),
  bodyType: carBodyStyleSchema.nullable().optional(),
  drivetrain: carDrivetrainSchema.nullable().optional(),
  engineSize: z.number().int().nonnegative().nullable().optional(),
  colorExterior: nullableString,
  colorInterior: nullableString,
  condition: carConditionSchema.default("used").optional(),
  listingStatus: carListingStatusSchema.default("draft").optional(),
  visibilityStatus: carVisibilityStatusSchema.default("private").optional(),
  featuredUntil: z.string().datetime().nullable().optional()
});

export const updateCarSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  slug: z.string().trim().min(1).max(255).optional(),
  description: z.string().trim().max(5000).nullable().optional(),
  vin: z.string().trim().min(1).max(64).nullable().optional(),
  stockNumber: z.string().trim().min(1).max(64).nullable().optional(),
  year: z.number().int().min(CAR_MIN_YEAR).max(CAR_MAX_YEAR).optional(),
  price: z.number().nonnegative().optional(),
  currencyCode: z.string().trim().length(3).optional(),
  mileage: z.number().int().nonnegative().nullable().optional(),
  mileageUnit: carMileageUnitSchema.nullable().optional(),
  transmission: carTransmissionSchema.nullable().optional(),
  fuelType: carFuelTypeSchema.nullable().optional(),
  bodyType: carBodyStyleSchema.nullable().optional(),
  drivetrain: carDrivetrainSchema.nullable().optional(),
  engineSize: z.number().int().nonnegative().nullable().optional(),
  colorExterior: nullableString,
  colorInterior: nullableString,
  condition: carConditionSchema.optional(),
  listingStatus: carListingStatusSchema.optional(),
  visibilityStatus: carVisibilityStatusSchema.optional(),
  featuredUntil: z.string().datetime().nullable().optional(),
  publishedAt: z.string().datetime().nullable().optional(),
  soldAt: z.string().datetime().nullable().optional()
});

export const carListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(CAR_MAX_PAGE_SIZE).default(CAR_DEFAULT_PAGE_SIZE),
  sortField: z.enum(CAR_SORT_FIELDS).optional(),
  sortDirection: z.enum(["asc", "desc"]).default("desc").optional(),
  dealerId: z.string().uuid().optional(),
  brandId: z.string().uuid().optional(),
  listingStatus: carListingStatusSchema.optional(),
  visibilityStatus: carVisibilityStatusSchema.optional()
});

export const carDetailSchema = z.object({
  id: z.string().uuid()
});

export type CreateCarSchema = z.infer<typeof createCarSchema>;
export type UpdateCarSchema = z.infer<typeof updateCarSchema>;
export type CarListQuerySchema = z.infer<typeof carListQuerySchema>;
export type CarDetailSchema = z.infer<typeof carDetailSchema>;
