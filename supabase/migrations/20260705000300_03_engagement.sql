-- Phase 3: User Engagement

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null,
  car_id uuid not null,
  created_at timestamptz not null default now(),
  constraint favorites_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete cascade,
  constraint favorites_car_id_fkey foreign key (car_id) references public.cars (id) on delete cascade,
  constraint favorites_profile_car_key unique (profile_id, car_id)
);

create index if not exists favorites_profile_id_idx on public.favorites (profile_id);
create index if not exists favorites_car_id_idx on public.favorites (car_id);

create table if not exists public.wishlists (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null,
  name text,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint wishlists_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete cascade,
  constraint wishlists_profile_name_key unique (profile_id, name),
  constraint wishlists_name_check check (name is null or char_length(trim(name)) > 0)
);

create index if not exists wishlists_profile_id_idx on public.wishlists (profile_id);
create index if not exists wishlists_is_default_idx on public.wishlists (is_default);

create table if not exists public.compare_lists (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid,
  session_key text,
  name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint compare_lists_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete cascade,
  constraint compare_lists_session_key_key unique (session_key),
  constraint compare_lists_profile_name_key unique (profile_id, name),
  constraint compare_lists_owner_check check (profile_id is not null or session_key is not null)
);

create index if not exists compare_lists_profile_id_idx on public.compare_lists (profile_id);
create index if not exists compare_lists_session_key_idx on public.compare_lists (session_key);

create table if not exists public.compare_items (
  id uuid primary key default gen_random_uuid(),
  compare_list_id uuid not null,
  car_id uuid not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  constraint compare_items_compare_list_id_fkey foreign key (compare_list_id) references public.compare_lists (id) on delete cascade,
  constraint compare_items_car_id_fkey foreign key (car_id) references public.cars (id) on delete cascade,
  constraint compare_items_compare_list_car_key unique (compare_list_id, car_id),
  constraint compare_items_sort_order_check check (sort_order >= 0)
);

create index if not exists compare_items_compare_list_id_idx on public.compare_items (compare_list_id);
create index if not exists compare_items_car_id_idx on public.compare_items (car_id);
create index if not exists compare_items_compare_list_sort_order_idx on public.compare_items (compare_list_id, sort_order);

create table if not exists public.saved_searches (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null,
  name text,
  query_json jsonb not null,
  is_active boolean not null default true,
  last_matched_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint saved_searches_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete cascade,
  constraint saved_searches_profile_name_key unique (profile_id, name),
  constraint saved_searches_query_json_check check (jsonb_typeof(query_json) = 'object'),
  constraint saved_searches_name_check check (name is null or char_length(trim(name)) > 0)
);

create index if not exists saved_searches_profile_id_idx on public.saved_searches (profile_id);
create index if not exists saved_searches_is_active_idx on public.saved_searches (is_active);
create index if not exists saved_searches_created_at_idx on public.saved_searches (created_at);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null,
  type public.notification_type not null,
  title text not null,
  body text not null,
  read_at timestamptz,
  metadata jsonb,
  created_at timestamptz not null default now(),
  constraint notifications_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete cascade,
  constraint notifications_title_check check (char_length(trim(title)) > 0),
  constraint notifications_body_check check (char_length(trim(body)) > 0)
);

create index if not exists notifications_profile_id_idx on public.notifications (profile_id);
create index if not exists notifications_profile_id_read_at_idx on public.notifications (profile_id, read_at);
create index if not exists notifications_type_idx on public.notifications (type);
create index if not exists notifications_created_at_idx on public.notifications (created_at);

