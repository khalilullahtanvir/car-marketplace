import type { RepositoryContext } from "../base/repository-context";
import type { ProfileRepository } from "../interfaces/profile.repository";
import type { CarRepository } from "../interfaces/car.repository";
import type { DealerRepository } from "../interfaces/dealer.repository";
import type { ReviewRepository } from "../interfaces/review.repository";
import type { WishlistRepository } from "../interfaces/wishlist.repository";
import type { FavoritesRepository } from "../interfaces/favorites.repository";
import type { CompareRepository, CompareItemRepository } from "../interfaces/compare.repository";
import type { NotificationRepository } from "../interfaces/notification.repository";
import type { SavedSearchRepository } from "../interfaces/saved-search.repository";

export interface RepositoryFactory {
  createProfileRepository(context: RepositoryContext): ProfileRepository;
  createCarRepository(context: RepositoryContext): CarRepository;
  createDealerRepository(context: RepositoryContext): DealerRepository;
  createReviewRepository(context: RepositoryContext): ReviewRepository;
  createWishlistRepository(context: RepositoryContext): WishlistRepository;
  createFavoritesRepository(context: RepositoryContext): FavoritesRepository;
  createCompareRepository(context: RepositoryContext): CompareRepository;
  createCompareItemRepository(context: RepositoryContext): CompareItemRepository;
  createNotificationRepository(context: RepositoryContext): NotificationRepository;
  createSavedSearchRepository(context: RepositoryContext): SavedSearchRepository;
}

export type RepositoryName =
  | "profiles"
  | "cars"
  | "dealers"
  | "reviews"
  | "wishlists"
  | "favorites"
  | "compare"
  | "compareItems"
  | "notifications"
  | "savedSearches";

