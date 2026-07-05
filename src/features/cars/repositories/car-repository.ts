import { RepositoryError, type RepositoryContext, type RepositoryQueryInput, type RepositoryResult } from "@/lib/repositories";
import type { CarListItem, CarModel } from "../types/car-types";
import { mapCarRowToListItem, mapCarRowToModel, type CarRepositoryRow } from "../mappers/car-mapper";

export interface CarsRepository {
  findById(id: string): Promise<RepositoryResult<CarModel>>;
  findMany(query?: RepositoryQueryInput): Promise<RepositoryResult<CarListItem[]>>;
}

export class SupabaseCarsRepository implements CarsRepository {
  readonly context: RepositoryContext;

  constructor(context: RepositoryContext) {
    this.context = context;
  }

  private get client() {
    return this.context.supabase;
  }

  async findById(id: string): Promise<RepositoryResult<CarModel>> {
    const { data, error } = await this.client.from("cars").select("*").eq("id", id).maybeSingle();

    if (error) {
      return { data: null, error: new RepositoryError(error.message, "UNKNOWN", error) };
    }

    if (!data) {
      return { data: null, error: new RepositoryError("Car not found", "NOT_FOUND") };
    }

    return { data: mapCarRowToModel(data as CarRepositoryRow), error: null };
  }

  async findMany(query?: RepositoryQueryInput): Promise<RepositoryResult<CarListItem[]>> {
    const limit = query?.limit ?? 20;
    const offset = query?.offset ?? 0;
    const { data, error } = await this.client.from("cars").select("*").range(offset, offset + limit - 1);

    if (error) {
      return { data: null, error: new RepositoryError(error.message, "UNKNOWN", error) };
    }

    return {
      data: (data ?? []).map((row) => mapCarRowToListItem(row as CarRepositoryRow)),
      error: null
    };
  }
}
