# PostgreSQL Enums

## app_role

- `user`
- `dealer_owner`
- `dealer_manager`
- `dealer_staff`
- `moderator`
- `admin`

## profile_status

- `active`
- `suspended`
- `deleted`

## dealer_status

- `pending`
- `active`
- `suspended`
- `closed`

## dealer_member_role

- `owner`
- `manager`
- `staff`

## membership_status

- `invited`
- `active`
- `removed`

## listing_status

- `draft`
- `pending_review`
- `published`
- `paused`
- `sold`
- `archived`

## visibility_status

- `private`
- `unlisted`
- `public`

## car_condition

- `new`
- `used`
- `certified_pre_owned`

## car_body_style

- `sedan`
- `suv`
- `hatchback`
- `coupe`
- `convertible`
- `wagon`
- `pickup`
- `van`
- `crossover`
- `truck`
- `other`

## drivetrain_type

- `fwd`
- `rwd`
- `awd`
- `4wd`

## transmission_type

- `manual`
- `automatic`
- `cvt`
- `dual_clutch`
- `other`

## fuel_type

- `gasoline`
- `diesel`
- `hybrid`
- `plugin_hybrid`
- `electric`
- `lpg`
- `cng`
- `other`

## mileage_unit

- `km`
- `mi`

## feature_source

- `manual`
- `imported`
- `ai_generated`

## inquiry_status

- `new`
- `in_progress`
- `replied`
- `closed`
- `spam`

## inquiry_source

- `website`
- `phone`
- `email`
- `whatsapp`
- `api`

## notification_type

- `system`
- `listing`
- `inquiry`
- `review`
- `moderation`

## ai_request_type

- `listing_description`
- `photo_caption`
- `price_suggestion`
- `search_insight`
- `summary`

## ai_request_status

- `queued`
- `processing`
- `completed`
- `failed`
- `cancelled`

## report_target_type

- `car`
- `dealer`
- `review`
- `profile`
- `message`

## report_status

- `open`
- `under_review`
- `resolved`
- `rejected`

## review_status

- `pending`
- `approved`
- `rejected`
- `hidden`
