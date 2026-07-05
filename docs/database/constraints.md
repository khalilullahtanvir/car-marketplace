# Constraints

## Global Constraints

- All tables use UUID primary keys
- All audit timestamps use `timestamptz`
- `created_at` defaults to `now()`
- `updated_at` should be maintained on update
- Soft-deleted rows use `deleted_at`

## Table-Level Rules

- `profiles.auth_user_id` must be unique and required
- `profiles.role` must use `app_role`
- `profiles.status` must use `profile_status`
- `dealers.slug` must be unique and normalized
- `dealers.status` must use `dealer_status`
- `dealer_members(dealer_id, profile_id)` must be unique
- `dealer_members.member_role` must use `dealer_member_role`
- `dealer_members.status` must use `membership_status`
- `brands.slug` must be unique
- `car_models(brand_id, slug)` must be unique
- `cars.slug` must be unique
- `cars.price` must be non-negative
- `cars.year` must be within a sensible automotive range
- `cars.vin` should be unique when present
- `car_images(car_id, storage_path)` must be unique
- `car_images.sort_order` must be non-negative
- `car_features(car_id, feature_key)` must be unique
- `car_specifications.car_id` must be unique
- `favorites(profile_id, car_id)` must be unique
- `wishlists(profile_id, name)` should be unique
- `compare_items(compare_list_id, car_id)` must be unique
- `reviews.rating` must be between 1 and 5
- `reviews` must reference exactly one target context if dealer/car polymorphism is used
- `inquiries.message` must not be empty
- `notifications.title` and `notifications.body` must not be empty
- `saved_searches.query_json` must be a valid JSON object
- `ai_requests.prompt` must not be empty
- `ai_requests.token_usage` must be non-negative when present
- `reports.reason` must not be empty
- `admin_logs.action` must not be empty

## Recommended Check Constraints

- Positive values for price, mileage, engine capacity, horsepower, torque, doors, and seating
- Latitude and longitude within valid geographic bounds
- Status and enum-backed fields constrained to their enum values
- Normalized text keys stored in lower-case form where used for slugs

