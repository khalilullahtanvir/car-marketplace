# Migration Roadmap

## Phase 1: Foundation

1. Enable required PostgreSQL extensions
2. Create enums
3. Create core identity tables: `profiles`, `locations`
4. Create catalog tables: `brands`, `car_models`

## Phase 2: Marketplace Core

1. Create `dealers`
2. Create `dealer_members`
3. Create `cars`
4. Create `car_specifications`
5. Create `car_images`
6. Create `car_features`

## Phase 3: User Engagement

1. Create `favorites`
2. Create `wishlists`
3. Create `compare_lists`
4. Create `compare_items`
5. Create `saved_searches`
6. Create `notifications`

## Phase 4: Interaction and Trust

1. Create `inquiries`
2. Create `reviews`
3. Create `reports`
4. Create `ai_requests`
5. Create `admin_logs`

## Phase 5: Policy and Hardening

1. Add indexes
2. Add unique constraints
3. Add check constraints
4. Enable RLS on every table
5. Add policies in least-privilege order
6. Add triggers for timestamps and derived state

## Phase Ordering Notes

- Create parent tables before child tables
- Create lookup tables before referencing tables
- Create enum types before dependent columns
- Apply RLS after base data model is stable
- Add storage buckets and policies after image-related tables are defined

