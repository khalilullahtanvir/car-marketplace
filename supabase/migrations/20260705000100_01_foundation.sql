-- Phase 1: Foundation
-- Extensions, enums, and core reference tables

create extension if not exists pgcrypto;

do $$
begin
  create type public.app_role as enum (
    'user',
    'dealer_owner',
    'dealer_manager',
    'dealer_staff',
    'moderator',
    'admin'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.profile_status as enum ('active', 'suspended', 'deleted');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.dealer_status as enum ('pending', 'active', 'suspended', 'closed');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.dealer_member_role as enum ('owner', 'manager', 'staff');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.membership_status as enum ('invited', 'active', 'removed');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.listing_status as enum ('draft', 'pending_review', 'published', 'paused', 'sold', 'archived');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.visibility_status as enum ('private', 'unlisted', 'public');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.car_condition as enum ('new', 'used', 'certified_pre_owned');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.car_body_style as enum ('sedan', 'suv', 'hatchback', 'coupe', 'convertible', 'wagon', 'pickup', 'van', 'crossover', 'truck', 'other');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.drivetrain_type as enum ('fwd', 'rwd', 'awd', '4wd');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.transmission_type as enum ('manual', 'automatic', 'cvt', 'dual_clutch', 'other');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.fuel_type as enum ('gasoline', 'diesel', 'hybrid', 'plugin_hybrid', 'electric', 'lpg', 'cng', 'other');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.mileage_unit as enum ('km', 'mi');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.feature_source as enum ('manual', 'imported', 'ai_generated');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.inquiry_status as enum ('new', 'in_progress', 'replied', 'closed', 'spam');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.inquiry_source as enum ('website', 'phone', 'email', 'whatsapp', 'api');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.notification_type as enum ('system', 'listing', 'inquiry', 'review', 'moderation');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.ai_request_type as enum ('listing_description', 'photo_caption', 'price_suggestion', 'search_insight', 'summary');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.ai_request_status as enum ('queued', 'processing', 'completed', 'failed', 'cancelled');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.report_target_type as enum ('car', 'dealer', 'review', 'profile', 'message');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.report_status as enum ('open', 'under_review', 'resolved', 'rejected');
exception when duplicate_object then null; end $$;

do $$
begin
  create type public.review_status as enum ('pending', 'approved', 'rejected', 'hidden');
exception when duplicate_object then null; end $$;

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  state text not null,
  city text not null,
  area text,
  postal_code text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  display_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint locations_latitude_check check (latitude is null or (latitude between -90 and 90)),
  constraint locations_longitude_check check (longitude is null or (longitude between -180 and 180))
);

create unique index if not exists locations_country_state_city_area_postal_code_key
  on public.locations (
    lower(trim(country)),
    lower(trim(state)),
    lower(trim(city)),
    lower(nullif(btrim(area), '')),
    lower(nullif(btrim(postal_code), ''))
  );

create index if not exists locations_country_state_city_idx
  on public.locations (country, state, city);

create index if not exists locations_postal_code_idx
  on public.locations (postal_code);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null,
  display_name text,
  avatar_url text,
  phone text,
  bio text,
  role public.app_role not null default 'user',
  status public.profile_status not null default 'active',
  location_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint profiles_auth_user_id_key unique (auth_user_id),
  constraint profiles_auth_user_id_fkey foreign key (auth_user_id) references auth.users (id) on delete cascade,
  constraint profiles_location_id_fkey foreign key (location_id) references public.locations (id) on delete set null
);

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_status_idx on public.profiles (status);
create index if not exists profiles_location_id_idx on public.profiles (location_id);
create unique index if not exists profiles_phone_unique_idx
  on public.profiles (phone)
  where phone is not null;

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  country text,
  logo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint brands_name_key unique (name),
  constraint brands_slug_key unique (slug)
);

create index if not exists brands_is_active_idx on public.brands (is_active);

create table if not exists public.car_models (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null,
  name text not null,
  slug text not null,
  body_style public.car_body_style,
  year_from int not null,
  year_to int,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint car_models_brand_id_fkey foreign key (brand_id) references public.brands (id) on delete restrict,
  constraint car_models_brand_slug_key unique (brand_id, slug),
  constraint car_models_brand_name_year_key unique (brand_id, name, year_from),
  constraint car_models_year_range_check check (year_to is null or year_from <= year_to)
);

create index if not exists car_models_brand_id_idx on public.car_models (brand_id);
create index if not exists car_models_slug_idx on public.car_models (slug);
create index if not exists car_models_is_active_idx on public.car_models (is_active);
