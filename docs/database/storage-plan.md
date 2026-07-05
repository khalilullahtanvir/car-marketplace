# Storage Plan

## Bucket Strategy

### `car-images`

- Purpose: Primary image storage for vehicle listings
- Access: Public read for published listings, restricted write through authenticated app flows
- File path pattern: `cars/{car_id}/{image_id}.{ext}`
- Metadata: `car_id`, `sort_order`, `is_primary`, `mime_type`
- Lifecycle: delete or orphan-cleanup when a car is removed

### `dealer-assets`

- Purpose: Dealer logos, banners, and branding assets
- Access: Public read, restricted write to dealer owners and admins
- File path pattern: `dealers/{dealer_id}/{asset_id}.{ext}`

### `profile-assets`

- Purpose: Avatars and user media
- Access: Private write, public read only if policy allows
- File path pattern: `profiles/{profile_id}/{asset_id}.{ext}`

### `moderation-evidence`

- Purpose: Sensitive supporting material for reports and reviews
- Access: Restricted to admins and moderators
- File path pattern: `moderation/{report_id}/{asset_id}.{ext}`

## Recommended Storage Rules

- Validate MIME type and size before upload
- Store canonical object path in database rather than raw binary
- Use a single primary image per car
- Prefer signed URLs for restricted assets
- Remove storage objects when referenced records are hard-deleted

## Database Linkage

- `car_images` should reference bucket name and object path
- `dealers` and `profiles` should store only asset URLs or object paths
- Storage metadata should be small and queryable

## TODO: Storage Object RLS

- Bucket object-level RLS will be implemented in a future storage migration
- This migration set only creates the buckets
- Object read/write/delete policies should be added after application access paths are finalized
