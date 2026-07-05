-- Phase 4: Interaction and Trust

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid,
  dealer_id uuid,
  car_id uuid,
  full_name text not null,
  email text not null,
  phone text,
  message text not null,
  status public.inquiry_status not null default 'new',
  source public.inquiry_source not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inquiries_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete set null,
  constraint inquiries_dealer_id_fkey foreign key (dealer_id) references public.dealers (id) on delete set null,
  constraint inquiries_car_id_fkey foreign key (car_id) references public.cars (id) on delete set null,
  constraint inquiries_message_check check (char_length(trim(message)) > 0),
  constraint inquiries_full_name_check check (char_length(trim(full_name)) > 0),
  constraint inquiries_email_check check (char_length(trim(email)) > 0)
);

create index if not exists inquiries_profile_id_idx on public.inquiries (profile_id);
create index if not exists inquiries_dealer_id_idx on public.inquiries (dealer_id);
create index if not exists inquiries_car_id_idx on public.inquiries (car_id);
create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null,
  dealer_id uuid,
  car_id uuid,
  rating int not null,
  title text,
  body text not null,
  status public.review_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  moderated_at timestamptz,
  constraint reviews_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete cascade,
  constraint reviews_dealer_id_fkey foreign key (dealer_id) references public.dealers (id) on delete cascade,
  constraint reviews_car_id_fkey foreign key (car_id) references public.cars (id) on delete cascade,
  constraint reviews_rating_check check (rating between 1 and 5),
  constraint reviews_target_check check ((dealer_id is not null)::int + (car_id is not null)::int = 1),
  constraint reviews_title_check check (title is null or char_length(trim(title)) > 0),
  constraint reviews_body_check check (char_length(trim(body)) > 0)
);

create index if not exists reviews_profile_id_idx on public.reviews (profile_id);
create index if not exists reviews_dealer_id_idx on public.reviews (dealer_id);
create index if not exists reviews_car_id_idx on public.reviews (car_id);
create index if not exists reviews_status_idx on public.reviews (status);
create index if not exists reviews_created_at_idx on public.reviews (created_at);
create unique index if not exists reviews_profile_dealer_unique_idx
  on public.reviews (profile_id, dealer_id)
  where dealer_id is not null;
create unique index if not exists reviews_profile_car_unique_idx
  on public.reviews (profile_id, car_id)
  where car_id is not null;

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid,
  reporter_email text,
  target_type public.report_target_type not null,
  target_id uuid not null,
  reason text not null,
  details text,
  status public.report_status not null default 'open',
  reviewed_by_profile_id uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reports_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete set null,
  constraint reports_reviewed_by_profile_id_fkey foreign key (reviewed_by_profile_id) references public.profiles (id) on delete set null,
  constraint reports_reason_check check (char_length(trim(reason)) > 0)
);

create index if not exists reports_target_type_target_id_idx on public.reports (target_type, target_id);
create index if not exists reports_status_idx on public.reports (status);
create index if not exists reports_profile_id_idx on public.reports (profile_id);
create index if not exists reports_reviewed_by_profile_id_idx on public.reports (reviewed_by_profile_id);
create index if not exists reports_created_at_idx on public.reports (created_at);

create table if not exists public.ai_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid,
  dealer_id uuid,
  request_type public.ai_request_type not null,
  prompt text not null,
  input_payload jsonb,
  output_payload jsonb,
  status public.ai_request_status not null default 'queued',
  model_name text,
  token_usage int,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  constraint ai_requests_profile_id_fkey foreign key (profile_id) references public.profiles (id) on delete set null,
  constraint ai_requests_dealer_id_fkey foreign key (dealer_id) references public.dealers (id) on delete set null,
  constraint ai_requests_prompt_check check (char_length(trim(prompt)) > 0),
  constraint ai_requests_token_usage_check check (token_usage is null or token_usage >= 0)
);

create index if not exists ai_requests_profile_id_idx on public.ai_requests (profile_id);
create index if not exists ai_requests_dealer_id_idx on public.ai_requests (dealer_id);
create index if not exists ai_requests_request_type_idx on public.ai_requests (request_type);
create index if not exists ai_requests_status_idx on public.ai_requests (status);
create index if not exists ai_requests_created_at_idx on public.ai_requests (created_at);

create table if not exists public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now(),
  constraint admin_logs_actor_profile_id_fkey foreign key (actor_profile_id) references public.profiles (id) on delete set null,
  constraint admin_logs_action_check check (char_length(trim(action)) > 0),
  constraint admin_logs_entity_type_check check (char_length(trim(entity_type)) > 0)
);

create index if not exists admin_logs_actor_profile_id_idx on public.admin_logs (actor_profile_id);
create index if not exists admin_logs_entity_type_entity_id_idx on public.admin_logs (entity_type, entity_id);
create index if not exists admin_logs_created_at_idx on public.admin_logs (created_at);
