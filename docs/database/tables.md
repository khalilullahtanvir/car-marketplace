# Tables

## users

- Purpose: Supabase Auth identity reference only
- Columns: `id`
- Data types: `uuid`
- Nullable fields: none in this design document
- Default values: managed by Supabase Auth
- Primary key: `id`
- Foreign keys: none
- Unique constraints: Supabase Auth enforces the identity key
- Check constraints: none
- Suggested indexes: managed by Supabase Auth
- Cascade rules: not application-managed

## profiles

- Purpose: Public-facing profile for an authenticated user
- Columns: `id`, `auth_user_id`, `display_name`, `avatar_url`, `phone`, `bio`, `role`, `status`, `location_id`, `created_at`, `updated_at`, `deleted_at`
- Data types: `uuid`, `uuid`, `text`, `text`, `text`, `text`, `app_role`, `profile_status`, `uuid`, `timestamptz`, `timestamptz`, `timestamptz`
- Nullable fields: `avatar_url`, `phone`, `bio`, `location_id`, `deleted_at`
- Default values: `id = gen_random_uuid()`, `role = 'user'`, `status = 'active'`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `auth_user_id -> auth.users.id` on delete cascade, `location_id -> locations.id` on delete set null
- Unique constraints: `auth_user_id`, optionally normalized `phone`
- Check constraints: role/status limited to enum values
- Suggested indexes: `auth_user_id`, `role`, `status`, `location_id`
- Cascade rules: profile removed when auth user is removed

## dealers

- Purpose: Dealer organization record
- Columns: `id`, `owner_profile_id`, `name`, `slug`, `description`, `logo_url`, `cover_url`, `phone`, `email`, `website`, `license_number`, `location_id`, `status`, `verified_at`, `created_at`, `updated_at`, `deleted_at`
- Data types: `uuid`, `uuid`, `text`, `text`, `text`, `text`, `text`, `text`, `text`, `text`, `uuid`, `dealer_status`, `timestamptz`, `timestamptz`, `timestamptz`, `timestamptz`
- Nullable fields: most contact/media fields, `location_id`, `verified_at`, `deleted_at`
- Default values: `id = gen_random_uuid()`, `status = 'pending'`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `owner_profile_id -> profiles.id` on delete restrict, `location_id -> locations.id` on delete set null
- Unique constraints: `slug`, optionally `license_number`
- Check constraints: status limited to enum values
- Suggested indexes: `owner_profile_id`, `status`, `location_id`, `slug`
- Cascade rules: restrict owner deletion while dealer exists

## dealer_members

- Purpose: Many-to-many membership between profiles and dealers
- Columns: `id`, `dealer_id`, `profile_id`, `member_role`, `status`, `invited_by_profile_id`, `joined_at`, `created_at`, `updated_at`
- Data types: `uuid`, `uuid`, `uuid`, `dealer_member_role`, `membership_status`, `uuid`, `timestamptz`, `timestamptz`, `timestamptz`
- Nullable fields: `invited_by_profile_id`, `joined_at`
- Default values: `id = gen_random_uuid()`, `status = 'active'`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `dealer_id -> dealers.id` on delete cascade, `profile_id -> profiles.id` on delete cascade, `invited_by_profile_id -> profiles.id` on delete set null
- Unique constraints: `(dealer_id, profile_id)`
- Check constraints: member role/status limited to enum values
- Suggested indexes: `dealer_id`, `profile_id`, `status`
- Cascade rules: delete membership when dealer or profile is removed

## brands

- Purpose: Vehicle manufacturer catalog
- Columns: `id`, `name`, `slug`, `country`, `logo_url`, `is_active`, `created_at`, `updated_at`
- Data types: `uuid`, `text`, `text`, `text`, `text`, `boolean`, `timestamptz`, `timestamptz`
- Nullable fields: `country`, `logo_url`
- Default values: `id = gen_random_uuid()`, `is_active = true`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: none
- Unique constraints: `slug`, `name`
- Check constraints: `is_active` boolean
- Suggested indexes: `slug`, `is_active`
- Cascade rules: none

## car_models

- Purpose: Specific model catalog under a brand
- Columns: `id`, `brand_id`, `name`, `slug`, `body_style`, `year_from`, `year_to`, `is_active`, `created_at`, `updated_at`
- Data types: `uuid`, `uuid`, `text`, `text`, `car_body_style`, `int`, `int`, `boolean`, `timestamptz`, `timestamptz`
- Nullable fields: `body_style`, `year_to`
- Default values: `id = gen_random_uuid()`, `is_active = true`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `brand_id -> brands.id` on delete restrict
- Unique constraints: `(brand_id, slug)`, optionally `(brand_id, name, year_from)`
- Check constraints: `year_from <= year_to` when `year_to` exists
- Suggested indexes: `brand_id`, `slug`, `is_active`
- Cascade rules: brand deletion restricted

## cars

- Purpose: Primary marketplace listing
- Columns: `id`, `dealer_id`, `posted_by_profile_id`, `brand_id`, `car_model_id`, `location_id`, `title`, `slug`, `description`, `vin`, `stock_number`, `year`, `price`, `currency_code`, `mileage`, `mileage_unit`, `transmission`, `fuel_type`, `body_type`, `drivetrain`, `engine_size`, `color_exterior`, `color_interior`, `condition`, `listing_status`, `visibility_status`, `featured_until`, `published_at`, `sold_at`, `created_at`, `updated_at`, `deleted_at`
- Data types: `uuid`, `uuid`, `uuid`, `uuid`, `uuid`, `uuid`, `text`, `text`, `text`, `text`, `text`, `int`, `numeric`, `char(3)`, `int`, `mileage_unit`, `transmission_type`, `fuel_type`, `car_body_style`, `drivetrain_type`, `text`, `text`, `text`, `car_condition`, `listing_status`, `visibility_status`, `timestamptz`, `timestamptz`, `timestamptz`, `timestamptz`, `timestamptz`, `timestamptz`
- Nullable fields: `description`, `vin`, `stock_number`, `mileage`, `engine_size`, `color_interior`, `featured_until`, `published_at`, `sold_at`, `deleted_at`
- Default values: `id = gen_random_uuid()`, `currency_code = 'USD'`, `condition = 'used'`, `listing_status = 'draft'`, `visibility_status = 'private'`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `dealer_id -> dealers.id` on delete cascade, `posted_by_profile_id -> profiles.id` on delete set null, `brand_id -> brands.id` on delete restrict, `car_model_id -> car_models.id` on delete restrict, `location_id -> locations.id` on delete set null
- Unique constraints: `slug`, optional `(dealer_id, stock_number)`, optional `vin`
- Check constraints: positive `year`, positive `price`, sensible mileage, published cars must have required core fields
- Suggested indexes: `dealer_id`, `brand_id`, `car_model_id`, `location_id`, `listing_status`, `visibility_status`, `year`, `price`, `featured_until`, `published_at`, `slug`
- Cascade rules: delete listing when owning dealer is deleted

## car_images

- Purpose: Listing media gallery metadata
- Columns: `id`, `car_id`, `storage_bucket`, `storage_path`, `sort_order`, `alt_text`, `is_primary`, `width`, `height`, `mime_type`, `created_at`
- Data types: `uuid`, `uuid`, `text`, `text`, `int`, `text`, `boolean`, `int`, `int`, `text`, `timestamptz`
- Nullable fields: `alt_text`, `width`, `height`, `mime_type`
- Default values: `id = gen_random_uuid()`, `sort_order = 0`, `is_primary = false`, `created_at = now()`
- Primary key: `id`
- Foreign keys: `car_id -> cars.id` on delete cascade
- Unique constraints: `(car_id, storage_path)`
- Check constraints: `sort_order >= 0`
- Suggested indexes: `car_id`, `(car_id, sort_order)`, `is_primary`
- Cascade rules: delete media when car is deleted

## car_features

- Purpose: Structured list of boolean or categorical listing features
- Columns: `id`, `car_id`, `feature_key`, `feature_value`, `source`, `created_at`, `updated_at`
- Data types: `uuid`, `uuid`, `text`, `text`, `feature_source`, `timestamptz`, `timestamptz`
- Nullable fields: `feature_value`
- Default values: `id = gen_random_uuid()`, `source = 'manual'`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `car_id -> cars.id` on delete cascade
- Unique constraints: `(car_id, feature_key)`
- Check constraints: feature key must be non-empty
- Suggested indexes: `car_id`, `feature_key`
- Cascade rules: delete features when car is deleted

## car_specifications

- Purpose: Normalized mechanical and technical specs for a car
- Columns: `id`, `car_id`, `engine_type`, `engine_capacity_cc`, `horsepower`, `torque_nm`, `fuel_economy_city`, `fuel_economy_highway`, `seating_capacity`, `doors`, `color_exterior`, `color_interior`, `created_at`, `updated_at`
- Data types: `uuid`, `uuid`, `text`, `int`, `int`, `int`, `numeric`, `numeric`, `int`, `int`, `text`, `text`, `timestamptz`, `timestamptz`
- Nullable fields: most technical fields are nullable for incomplete inventory data
- Default values: `id = gen_random_uuid()`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `car_id -> cars.id` on delete cascade
- Unique constraints: `car_id`
- Check constraints: positive numeric values where applicable
- Suggested indexes: `car_id`
- Cascade rules: delete specs when car is deleted

## locations

- Purpose: Geographic hierarchy and reusable listing location
- Columns: `id`, `country`, `state`, `city`, `area`, `postal_code`, `latitude`, `longitude`, `display_name`, `created_at`, `updated_at`
- Data types: `uuid`, `text`, `text`, `text`, `text`, `text`, `numeric`, `numeric`, `text`, `timestamptz`, `timestamptz`
- Nullable fields: `area`, `postal_code`, `latitude`, `longitude`
- Default values: `id = gen_random_uuid()`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: none
- Unique constraints: recommended composite uniqueness across normalized display fields where feasible
- Check constraints: valid coordinate ranges
- Suggested indexes: `country`, `state`, `city`, `postal_code`, `(country, state, city)`
- Cascade rules: none

## favorites

- Purpose: Save a car as a favorite
- Columns: `id`, `profile_id`, `car_id`, `created_at`
- Data types: `uuid`, `uuid`, `uuid`, `timestamptz`
- Nullable fields: none
- Default values: `id = gen_random_uuid()`, `created_at = now()`
- Primary key: `id`
- Foreign keys: `profile_id -> profiles.id` on delete cascade, `car_id -> cars.id` on delete cascade
- Unique constraints: `(profile_id, car_id)`
- Check constraints: none
- Suggested indexes: `profile_id`, `car_id`
- Cascade rules: remove favorite if profile or car is removed

## wishlists

- Purpose: User-owned wishlist container
- Columns: `id`, `profile_id`, `name`, `is_default`, `created_at`, `updated_at`
- Data types: `uuid`, `uuid`, `text`, `boolean`, `timestamptz`, `timestamptz`
- Nullable fields: `name`
- Default values: `id = gen_random_uuid()`, `is_default = false`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `profile_id -> profiles.id` on delete cascade
- Unique constraints: `(profile_id, name)` and optionally one default wishlist per profile
- Check constraints: `name` non-empty when provided
- Suggested indexes: `profile_id`, `is_default`
- Cascade rules: delete wishlists with profile

## compare_lists

- Purpose: Named or session-based comparison container
- Columns: `id`, `profile_id`, `session_key`, `name`, `created_at`, `updated_at`
- Data types: `uuid`, `uuid`, `text`, `text`, `timestamptz`, `timestamptz`
- Nullable fields: `profile_id`, `name`
- Default values: `id = gen_random_uuid()`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `profile_id -> profiles.id` on delete cascade
- Unique constraints: `session_key` for anonymous usage, `(profile_id, name)` for authenticated users
- Check constraints: at least one owner reference required
- Suggested indexes: `profile_id`, `session_key`
- Cascade rules: delete compare lists with profile

## compare_items

- Purpose: Cars selected within a comparison list
- Columns: `id`, `compare_list_id`, `car_id`, `sort_order`, `created_at`
- Data types: `uuid`, `uuid`, `uuid`, `int`, `timestamptz`
- Nullable fields: none
- Default values: `id = gen_random_uuid()`, `sort_order = 0`, `created_at = now()`
- Primary key: `id`
- Foreign keys: `compare_list_id -> compare_lists.id` on delete cascade, `car_id -> cars.id` on delete cascade
- Unique constraints: `(compare_list_id, car_id)`
- Check constraints: `sort_order >= 0`
- Suggested indexes: `compare_list_id`, `car_id`, `(compare_list_id, sort_order)`
- Cascade rules: delete items when list or car is deleted

## reviews

- Purpose: User reviews for dealers or cars
- Columns: `id`, `profile_id`, `dealer_id`, `car_id`, `rating`, `title`, `body`, `status`, `created_at`, `updated_at`, `moderated_at`
- Data types: `uuid`, `uuid`, `uuid`, `uuid`, `int`, `text`, `text`, `review_status`, `timestamptz`, `timestamptz`, `timestamptz`
- Nullable fields: `dealer_id`, `car_id`, `title`, `moderated_at`
- Default values: `id = gen_random_uuid()`, `status = 'pending'`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `profile_id -> profiles.id` on delete cascade, `dealer_id -> dealers.id` on delete cascade, `car_id -> cars.id` on delete cascade
- Unique constraints: one review per profile per target context can be enforced by composite uniqueness
- Check constraints: rating between 1 and 5, exactly one of dealer or car required
- Suggested indexes: `profile_id`, `dealer_id`, `car_id`, `status`, `created_at`
- Cascade rules: delete reviews with profile, dealer, or car

## inquiries

- Purpose: Lead and message intake for a car or dealer
- Columns: `id`, `profile_id`, `dealer_id`, `car_id`, `full_name`, `email`, `phone`, `message`, `status`, `source`, `created_at`, `updated_at`
- Data types: `uuid`, `uuid`, `uuid`, `uuid`, `text`, `text`, `text`, `text`, `inquiry_status`, `inquiry_source`, `timestamptz`, `timestamptz`
- Nullable fields: `profile_id`, `dealer_id`, `car_id`, `phone`
- Default values: `id = gen_random_uuid()`, `status = 'new'`, `source = 'website'`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `profile_id -> profiles.id` on delete set null, `dealer_id -> dealers.id` on delete set null, `car_id -> cars.id` on delete set null
- Unique constraints: none recommended
- Check constraints: `message` non-empty
- Suggested indexes: `profile_id`, `dealer_id`, `car_id`, `status`, `created_at`
- Cascade rules: preserve inquiries if target records are deleted

## notifications

- Purpose: User-facing system notifications
- Columns: `id`, `profile_id`, `type`, `title`, `body`, `read_at`, `metadata`, `created_at`
- Data types: `uuid`, `uuid`, `notification_type`, `text`, `text`, `timestamptz`, `jsonb`, `timestamptz`
- Nullable fields: `read_at`, `metadata`
- Default values: `id = gen_random_uuid()`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `profile_id -> profiles.id` on delete cascade
- Unique constraints: none
- Check constraints: title/body non-empty
- Suggested indexes: `profile_id`, `(profile_id, read_at)`, `type`, `created_at`
- Cascade rules: delete notifications with profile

## saved_searches

- Purpose: Persist search criteria for alerts and quick reuse
- Columns: `id`, `profile_id`, `name`, `query_json`, `is_active`, `last_matched_at`, `created_at`, `updated_at`
- Data types: `uuid`, `uuid`, `text`, `jsonb`, `boolean`, `timestamptz`, `timestamptz`, `timestamptz`
- Nullable fields: `name`, `last_matched_at`
- Default values: `id = gen_random_uuid()`, `is_active = true`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `profile_id -> profiles.id` on delete cascade
- Unique constraints: `(profile_id, name)`
- Check constraints: `query_json` must be valid JSON object
- Suggested indexes: `profile_id`, `is_active`, `created_at`
- Cascade rules: delete saved searches with profile

## ai_requests

- Purpose: Record AI-assisted generation or analysis requests
- Columns: `id`, `profile_id`, `dealer_id`, `request_type`, `prompt`, `input_payload`, `output_payload`, `status`, `model_name`, `token_usage`, `created_at`, `completed_at`
- Data types: `uuid`, `uuid`, `uuid`, `ai_request_type`, `text`, `jsonb`, `jsonb`, `ai_request_status`, `text`, `int`, `timestamptz`, `timestamptz`
- Nullable fields: `profile_id`, `dealer_id`, `output_payload`, `completed_at`, `token_usage`
- Default values: `id = gen_random_uuid()`, `status = 'queued'`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `profile_id -> profiles.id` on delete set null, `dealer_id -> dealers.id` on delete set null
- Unique constraints: none
- Check constraints: prompt non-empty, token usage non-negative
- Suggested indexes: `profile_id`, `dealer_id`, `request_type`, `status`, `created_at`
- Cascade rules: preserve request logs after parent deletion

## reports

- Purpose: Moderation and abuse reporting
- Columns: `id`, `profile_id`, `reporter_email`, `target_type`, `target_id`, `reason`, `details`, `status`, `reviewed_by_profile_id`, `reviewed_at`, `created_at`, `updated_at`
- Data types: `uuid`, `uuid`, `text`, `report_target_type`, `uuid`, `text`, `text`, `report_status`, `uuid`, `timestamptz`, `timestamptz`, `timestamptz`
- Nullable fields: `profile_id`, `reviewed_by_profile_id`, `reviewed_at`, `details`
- Default values: `id = gen_random_uuid()`, `status = 'open'`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `profile_id -> profiles.id` on delete set null, `reviewed_by_profile_id -> profiles.id` on delete set null
- Unique constraints: none
- Check constraints: reason non-empty, target_id required, target_type limited to enum values
- Suggested indexes: `target_type`, `target_id`, `status`, `profile_id`, `reviewed_by_profile_id`, `created_at`
- Cascade rules: preserve reports for audit even if target content is deleted

## admin_logs

- Purpose: Immutable admin audit trail
- Columns: `id`, `actor_profile_id`, `action`, `entity_type`, `entity_id`, `before_data`, `after_data`, `ip_address`, `user_agent`, `created_at`
- Data types: `uuid`, `uuid`, `text`, `text`, `uuid`, `jsonb`, `jsonb`, `inet`, `text`, `timestamptz`
- Nullable fields: `entity_id`, `before_data`, `after_data`, `ip_address`, `user_agent`
- Default values: `id = gen_random_uuid()`, timestamps default to `now()`
- Primary key: `id`
- Foreign keys: `actor_profile_id -> profiles.id` on delete set null
- Unique constraints: none
- Check constraints: action/entity_type non-empty
- Suggested indexes: `actor_profile_id`, `entity_type`, `entity_id`, `created_at`
- Cascade rules: logs are retained after actor deletion

