# Relationships

## One-to-One

- `auth.users` to `profiles`
- `cars` to `car_specifications`

## One-to-Many

- `brands` to `car_models`
- `car_models` to `cars`
- `locations` to `cars`
- `locations` to `dealers`
- `dealers` to `cars`
- `dealers` to `dealer_members`
- `profiles` to `favorites`
- `profiles` to `wishlists`
- `profiles` to `compare_lists`
- `profiles` to `saved_searches`
- `profiles` to `inquiries`
- `profiles` to `notifications`
- `profiles` to `ai_requests`
- `profiles` to `reports`
- `profiles` to `admin_logs`
- `cars` to `car_images`
- `cars` to `car_features`
- `cars` to `reviews`
- `cars` to `inquiries`
- `cars` to `reports`

## Many-to-Many

- `profiles` to `dealers` through `dealer_members`
- `profiles` to `cars` through `favorites`
- `profiles` to `cars` through `compare_lists` and `compare_items`
- `profiles` to `cars` through `wishlists` when wishlist items are added in a later phase

## Relationship Notes

- `profiles.auth_user_id` is the application bridge to Supabase Auth
- `dealer_members` enables owner, manager, and staff access patterns
- `reviews` may target either a dealer or a car, but not both at once
- `reports` should support polymorphic moderation targets
- `admin_logs` should remain append-only for audit integrity

