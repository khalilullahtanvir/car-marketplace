export type FeatureName =
  | "home"
  | "cars"
  | "auth"
  | "profile"
  | "dashboard"
  | "wishlist"
  | "compare"
  | "search"
  | "notifications"
  | "reviews"
  | "dealers"
  | "ai";

export interface FeatureBoundaryContract {
  readonly name: FeatureName;
  readonly publicExports: readonly string[];
}
