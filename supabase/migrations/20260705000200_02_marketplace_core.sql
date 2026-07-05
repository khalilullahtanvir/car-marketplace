-- Phase 2: Marketplace Core

create table if not exists public.dealers (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null,
  name text not null,
  slug text not null,
  description text,
  logo_url text,
  cover_url text,
  phone text,
  email text,
  website text,
  license_number text,
  location_id uuid,
  status public.dealer_status not null default 'pending',
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint dealers_owner_profile_id_fkey foreign key (owner_profile_id) references public.profiles (id) on delete restrict,
  constraint dealers_location_id_fkey foreign key (location_id) references public.locations (id) on delete set null,
  constraint dealers_slug_key unique (slug),
  constraint dealers_license_number_key unique (license_number)
);

create index if not exists dealers_owner_profile_id_idx on public.dealers (owner_profile_id);
create index if not exists dealers_status_idx on public.dealers (status);
create index if not exists dealers_location_id_idx on public.dealers (location_id);

create table if not exists public.dealer_members (
  id uuid primary key default gen_random_uuid(),
  dealer_id uuid not null,
  profile_id uuid not null,
  member_role public.dealer_member_role not null,
  status public.membership_status not null default 'active',
  invited_by_profile_id uuid,
  joined_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint dealer_members_dealer_id_fkey foreign key (dealer_id) references public.dealers (id) on delete cascade,
  constraint dealer_members_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete cascade,
  constraint dealer_members_invited_by_profile_id_fkey foreign key (invited_by_profile_id) references public.profiles (id) on delete set null,
  constraint dealer_members_dealer_profile_key unique (dealer_id, profile_id)
);

create index if not exists dealer_members_dealer_id_idx on public.dealer_members (dealer_id);
create index if not exists dealer_members_profile_id_idx on public.dealer_members (profile_id);
create index if not exists dealer_members_status_idx on public.dealer_members (status);

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  dealer_id uuid not null,
  posted_by_profile_id uuid,
  brand_id uuid not null,
  car_model_id uuid not null,
  location_id uuid,
  title text not null,
  slug text not null,
  description text,
  vin text,
  stock_number text,
  year int not null,
  price numeric(12,2) not null,
  currency_code char(3) not null default 'USD',
  mileage int,
  mileage_unit public.mileage_unit,
  transmission public.transmission_type,
  fuel_type public.fuel_type,
  body_type public.car_body_style,
  drivetrain public.drivetrain_type,
  engine_size int,
  color_exterior text,
  color_interior text,
  condition public.car_condition not null default 'used',
  listing_status public.listing_status not null default 'draft',
  visibility_status public.visibility_status not null default 'private',
  featured_until timestamptz,
  published_at timestamptz,
  sold_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint cars_dealer_id_fkey foreign key (dealer_id) references public.dealers (id) on delete cascade,
  constraint cars_posted_by_profile_id_fkey foreign key (posted_by_profile_id) references public.profiles (id) on delete set null,
  constraint cars_brand_id_fkey foreign key (brand_id) references public.brands (id) on delete restrict,
  constraint cars_car_model_id_fkey foreign key (car_model_id) references public.car_models (id) on delete restrict,
  constraint cars_location_id_fkey foreign key (location_id) references public.locations (id) on delete set null,
  constraint cars_slug_key unique (slug),
  constraint cars_vin_key unique (vin),
  constraint cars_year_check check (year between 1900 and 2100),
  constraint cars_price_check check (price >= 0),
  constraint cars_mileage_check check (mileage is null or mileage >= 0),
  constraint cars_engine_size_check check (engine_size is null or engine_size >= 0)
);

create index if not exists cars_dealer_id_idx on public.cars (dealer_id);
create index if not exists cars_posted_by_profile_id_idx on public.cars (posted_by_profile_id);
create index if not exists cars_brand_id_idx on public.cars (brand_id);
create index if not exists cars_car_model_id_idx on public.cars (car_model_id);
create index if not exists cars_location_id_idx on public.cars (location_id);
create index if not exists cars_listing_status_idx on public.cars (listing_status);
create index if not exists cars_visibility_status_idx on public.cars (visibility_status);
create index if not exists cars_year_idx on public.cars (year);
create index if not exists cars_price_idx on public.cars (price);
create index if not exists cars_featured_until_idx on public.cars (featured_until);
create index if not exists cars_published_at_idx on public.cars (published_at);
create unique index if not exists cars_stock_number_per_dealer_unique_idx
  on public.cars (dealer_id, stock_number)
  where stock_number is not null;

create table if not exists public.car_specifications (
  id uuid primary key default gen_random_uuid(),
  car_id uuid not null,
  engine_type text,
  engine_capacity_cc int,
  horsepower int,
  torque_nm int,
  fuel_economy_city numeric(5,2),
  fuel_economy_highway numeric(5,2),
  seating_capacity int,
  doors int,
  color_exterior text,
  color_interior text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint car_specifications_car_id_fkey foreign key (car_id) references public.cars (id) on delete cascade,
  constraint car_specifications_car_id_key unique (car_id),
  constraint car_specifications_engine_capacity_check check (engine_capacity_cc is null or engine_capacity_cc >= 0),
  constraint car_specifications_horsepower_check check (horsepower is null or horsepower >= 0),
  constraint car_specifications_torque_check check (torque_nm is null or torque_nm >= 0),
  constraint car_specifications_fuel_economy_city_check check (fuel_economy_city is null or fuel_economy_city >= 0),
  constraint car_specifications_fuel_economy_highway_check check (fuel_economy_highway is null or fuel_economy_highway >= 0),
  constraint car_specifications_seating_capacity_check check (seating_capacity is null or seating_capacity > 0),
  constraint car_specifications_doors_check check (doors is null or doors > 0)
);

create index if not exists car_specifications_car_id_idx on public.car_specifications (car_id);

create table if not exists public.car_images (
  id uuid primary key default gen_random_uuid(),
  car_id uuid not null,
  storage_bucket text not null,
  storage_path text not null,
  sort_order int not null default 0,
  alt_text text,
  is_primary boolean not null default false,
  width int,
  height int,
  mime_type text,
  created_at timestamptz not null default now(),
  constraint car_images_car_id_fkey foreign key (car_id) references public.cars (id) on delete cascade,
  constraint car_images_car_id_storage_path_key unique (car_id, storage_path),
  constraint car_images_sort_order_check check (sort_order >= 0)
);

create index if not exists car_images_car_id_idx on public.car_images (car_id);
create index if not exists car_images_car_id_sort_order_idx on public.car_images (car_id, sort_order);
create index if not exists car_images_is_primary_idx on public.car_images (is_primary);

create table if not exists public.car_features (
  id uuid primary key default gen_random_uuid(),
  car_id uuid not null,
  feature_key text not null,
  feature_value text,
  source public.feature_source not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint car_features_car_id_fkey foreign key (car_id) references public.cars (id) on delete cascade,
  constraint car_features_car_id_feature_key_key unique (car_id, feature_key),
  constraint car_features_feature_key_check check (char_length(trim(feature_key)) > 0)
);

create index if not exists car_features_car_id_idx on public.car_features (car_id);
create index if not exists car_features_feature_key_idx on public.car_features (feature_key);
