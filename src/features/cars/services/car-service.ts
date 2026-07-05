import { RepositoryError, type RepositoryContext, type RepositoryResult } from "@/lib/repositories";
import type { CarListDto, CarDetailDto, CreateCarDto, UpdateCarDto } from "../types/car-types";
import type { CarsRepository } from "../repositories/car-repository";
import { mapCarListToDto, mapCarModelToDetailDto, mapCreateCarDtoToPayload, mapUpdateCarDtoToPayload } from "../mappers/car-mapper";
import type { CarPermissionContext } from "../permissions/car-permissions";
import { evaluateCarArchivePolicy, evaluateCarCreatePolicy, evaluateCarDeletePolicy, evaluateCarPublishPolicy, evaluateCarReadPolicy, evaluateCarUpdatePolicy } from "../policies/car-policies";
import { CAR_DEFAULT_PAGE_SIZE } from "../constants/car-constants";

export interface CarService {
  findById(id: string, context: CarPermissionContext): Promise<RepositoryResult<CarDetailDto>>;
  findMany(context: CarPermissionContext, page?: number, pageSize?: number): Promise<RepositoryResult<CarListDto>>;
  create(input: CreateCarDto, context: CarPermissionContext): Promise<RepositoryResult<CarDetailDto>>;
  update(id: string, input: UpdateCarDto, context: CarPermissionContext): Promise<RepositoryResult<CarDetailDto>>;
  remove(id: string, context: CarPermissionContext): Promise<RepositoryResult<void>>;
  publish(id: string, context: CarPermissionContext): Promise<RepositoryResult<CarDetailDto>>;
  archive(id: string, context: CarPermissionContext): Promise<RepositoryResult<CarDetailDto>>;
}

export class DefaultCarService implements CarService {
  constructor(private readonly repository: CarsRepository, private readonly repositoryContext: RepositoryContext) {}

  private static denied<T>(message: string): RepositoryResult<T> {
    return { data: null, error: new RepositoryError(message, "FORBIDDEN") };
  }

  async findById(id: string, context: CarPermissionContext): Promise<RepositoryResult<CarDetailDto>> {
    const policy = evaluateCarReadPolicy(context);
    if (!policy.allowed) {
      return DefaultCarService.denied<CarDetailDto>(policy.reason ?? "Access denied");
    }

    const result = await this.repository.findById(id);
    if (result.error) {
      return { data: null, error: result.error };
    }

    return { data: mapCarModelToDetailDto({ ...result.data, is_featured: Boolean(result.data.featured_until) }), error: null };
  }

  async findMany(context: CarPermissionContext, page = 1, pageSize = CAR_DEFAULT_PAGE_SIZE): Promise<RepositoryResult<CarListDto>> {
    const policy = evaluateCarReadPolicy(context);
    if (!policy.allowed) {
      return DefaultCarService.denied<CarListDto>(policy.reason ?? "Access denied");
    }

    const result = await this.repository.findMany({ limit: pageSize, offset: (page - 1) * pageSize });
    if (result.error) {
      return { data: null, error: result.error };
    }

    return {
      data: mapCarListToDto(result.data, result.data.length, page, pageSize),
      error: null
    };
  }

  async create(input: CreateCarDto, context: CarPermissionContext): Promise<RepositoryResult<CarDetailDto>> {
    const policy = evaluateCarCreatePolicy(context);
    if (!policy.allowed) {
      return DefaultCarService.denied<CarDetailDto>(policy.reason ?? "Access denied");
    }

    void mapCreateCarDtoToPayload(input);
    return { data: null, error: new RepositoryError("Not implemented", "UNKNOWN") };
  }

  async update(id: string, input: UpdateCarDto, context: CarPermissionContext): Promise<RepositoryResult<CarDetailDto>> {
    const existing = await this.repository.findById(id);
    if (existing.error) {
      return { data: null, error: existing.error };
    }

    const policy = evaluateCarUpdatePolicy(context, existing.data);
    if (!policy.allowed) {
      return DefaultCarService.denied<CarDetailDto>(policy.reason ?? "Access denied");
    }

    void mapUpdateCarDtoToPayload(input);
    return { data: null, error: new RepositoryError("Not implemented", "UNKNOWN") };
  }

  async remove(id: string, context: CarPermissionContext): Promise<RepositoryResult<void>> {
    const existing = await this.repository.findById(id);
    if (existing.error) {
      return { data: null, error: existing.error };
    }

    const policy = evaluateCarDeletePolicy(context, existing.data);
    if (!policy.allowed) {
      return DefaultCarService.denied<void>(policy.reason ?? "Access denied");
    }

    return { data: undefined, error: null };
  }

  async publish(id: string, context: CarPermissionContext): Promise<RepositoryResult<CarDetailDto>> {
    const policy = evaluateCarPublishPolicy(context);
    if (!policy.allowed) {
      return DefaultCarService.denied<CarDetailDto>(policy.reason ?? "Access denied");
    }

    const car = await this.repository.findById(id);
    if (car.error) {
      return { data: null, error: car.error };
    }

    return {
      data: { ...mapCarModelToDetailDto({ ...car.data, is_featured: Boolean(car.data.featured_until) }), listing_status: "published" },
      error: null
    };
  }

  async archive(id: string, context: CarPermissionContext): Promise<RepositoryResult<CarDetailDto>> {
    const policy = evaluateCarArchivePolicy(context);
    if (!policy.allowed) {
      return DefaultCarService.denied<CarDetailDto>(policy.reason ?? "Access denied");
    }

    const car = await this.repository.findById(id);
    if (car.error) {
      return { data: null, error: car.error };
    }

    return {
      data: { ...mapCarModelToDetailDto({ ...car.data, is_featured: Boolean(car.data.featured_until) }), listing_status: "archived" },
      error: null
    };
  }
}

export function createCarService(repository: CarsRepository, repositoryContext: RepositoryContext): CarService {
  return new DefaultCarService(repository, repositoryContext);
}
