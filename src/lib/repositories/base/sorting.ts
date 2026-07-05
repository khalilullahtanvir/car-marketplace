export type SortDirection = "asc" | "desc";

export interface SortInput<TField extends string = string> {
  field: TField;
  direction?: SortDirection;
}

export interface SortState<TField extends string = string> {
  field: TField;
  direction: SortDirection;
}

export function normalizeSort<TField extends string>(
  input: SortInput<TField> | undefined,
  fallback: SortState<TField>
): SortState<TField> {
  if (!input?.field) {
    return fallback;
  }

  return {
    field: input.field,
    direction: input.direction ?? fallback.direction
  };
}

