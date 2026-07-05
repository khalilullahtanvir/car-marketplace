export type FilterValue = string | number | boolean | null | undefined | string[] | number[] | boolean[];

export interface FilterInput<TField extends string = string> {
  field: TField;
  value: FilterValue;
  operator?: "eq" | "neq" | "lt" | "lte" | "gt" | "gte" | "like" | "ilike" | "in" | "contains";
}

export interface FilterState<TField extends string = string> {
  field: TField;
  value: FilterValue;
  operator: NonNullable<FilterInput<TField>["operator"]>;
}

export type FilterGroup<TField extends string = string> = FilterState<TField>[];

export function normalizeFilter<TField extends string>(input: FilterInput<TField>): FilterState<TField> {
  return {
    field: input.field,
    value: input.value,
    operator: input.operator ?? "eq"
  };
}

