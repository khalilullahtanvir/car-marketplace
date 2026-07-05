# Indexes

## Identity and Access

- `profiles(auth_user_id)` unique
- `profiles(role)`
- `profiles(status)`
- `profiles(location_id)`
- `dealers(owner_profile_id)`
- `dealers(status)`
- `dealers(location_id)`
- `dealer_members(dealer_id)`
- `dealer_members(profile_id)`
- `dealer_members(status)`

## Catalog

- `brands(slug)` unique
- `brands(is_active)`
- `car_models(brand_id)`
- `car_models(slug)`
- `car_models(is_active)`
- `locations(country, state, city)`
- `locations(postal_code)`

## Listings

- `cars(dealer_id)`
- `cars(posted_by_profile_id)`
- `cars(brand_id)`
- `cars(car_model_id)`
- `cars(location_id)`
- `cars(listing_status)`
- `cars(visibility_status)`
- `cars(year)`
- `cars(price)`
- `cars(featured_until)`
- `cars(published_at)`
- `cars(slug)` unique
- `car_images(car_id, sort_order)`
- `car_images(is_primary)`
- `car_features(car_id)`
- `car_features(feature_key)`
- `car_specifications(car_id)` unique

## Engagement

- `favorites(profile_id)` unique with `car_id`
- `favorites(car_id)`
- `wishlists(profile_id)`
- `wishlists(is_default)`
- `compare_lists(profile_id)`
- `compare_lists(session_key)` unique where applicable
- `compare_items(compare_list_id)`
- `compare_items(car_id)`
- `reviews(profile_id)`
- `reviews(dealer_id)`
- `reviews(car_id)`
- `reviews(status)`
- `inquiries(profile_id)`
- `inquiries(dealer_id)`
- `inquiries(car_id)`
- `inquiries(status)`
- `notifications(profile_id, read_at)`
- `notifications(type)`
- `saved_searches(profile_id)`
- `saved_searches(is_active)`

## Operations

- `ai_requests(profile_id)`
- `ai_requests(dealer_id)`
- `ai_requests(request_type)`
- `ai_requests(status)`
- `reports(target_type, target_id)`
- `reports(status)`
- `admin_logs(actor_profile_id)`
- `admin_logs(entity_type, entity_id)`
- `admin_logs(created_at)`

## Indexing Rules

- Every foreign key should have an index
- High-cardinality lookup fields should be indexed
- Unique business keys should be enforced with unique indexes
- Ordered child collections should use composite indexes with the parent key first
- Audit tables should index actor, entity, and timestamp columns

