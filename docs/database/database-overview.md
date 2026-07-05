# Database Overview

This database design supports a production-grade car marketplace on Supabase PostgreSQL without changing application architecture or introducing schema code yet.

## Design Goals

- Keep Supabase Auth as the source of identity for `users` through `auth.users`
- Separate identity, marketplace inventory, engagement, messaging, and operational audit data
- Favor normalized core entities with selective denormalization for search and moderation workflows
- Support multi-dealer operations, private user activity, and admin auditing
- Prepare for RLS-first access control from the start

## Core Domain Areas

- Identity and access: `profiles`, `dealers`, `dealer_members`
- Catalog: `brands`, `car_models`, `cars`, `car_images`, `car_features`, `car_specifications`, `locations`
- User engagement: `favorites`, `wishlists`, `compare_lists`, `compare_items`, `reviews`, `saved_searches`
- Transactions and communication: `inquiries`, `notifications`
- AI and moderation: `ai_requests`, `reports`, `admin_logs`

## Modeling Principles

- Use UUID primary keys everywhere
- Use `timestamptz` for audit timestamps
- Use soft-delete columns where lifecycle history matters
- Use explicit foreign keys and restrictive default behaviors
- Index all foreign keys and high-selectivity lookup columns
- Keep write-heavy operational tables narrow

## Supabase Fit

- `profiles` is the public application identity layer for authenticated users
- `dealers` and `dealer_members` model organizations and membership
- `cars` is the primary marketplace listing entity
- `car_images` can map to Supabase Storage objects through a bucket path and metadata
- `rls_plan` assumes all tables are protected by default and exposed through explicit policies

## Lifecycle Boundaries

- Identity records are created on signup or first app sync
- Dealers can be created independently of marketplace inventory
- Cars can be drafted, published, hidden, sold, or archived
- Moderation records preserve auditability even when a listing or message changes

