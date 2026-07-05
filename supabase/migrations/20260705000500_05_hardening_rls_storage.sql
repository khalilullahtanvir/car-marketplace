-- Phase 5: Index hardening, timestamp trigger, RLS, and storage buckets

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.current_profile_id()
returns uuid
language sql
stable
as $$
  select p.id
  from public.profiles p
  where p.auth_user_id = auth.uid()
    and p.deleted_at is null
  limit 1;
$$;

create or replace function public.current_profile_role()
returns public.app_role
language sql
stable
as $$
  select p.role
  from public.profiles p
  where p.auth_user_id = auth.uid()
    and p.deleted_at is null
  limit 1;
$$;

create or replace function public.is_admin_or_moderator()
returns boolean
language sql
stable
as $$
  select public.current_profile_role() in ('moderator', 'admin');
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select public.current_profile_role() = 'admin';
$$;

create or replace function public.is_dealer_member(p_dealer_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.dealer_members dm
    where dm.dealer_id = p_dealer_id
      and dm.profile_id = public.current_profile_id()
      and dm.status = 'active'
  );
$$;

create or replace function public.is_dealer_owner_or_manager(p_dealer_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.dealer_members dm
    where dm.dealer_id = p_dealer_id
      and dm.profile_id = public.current_profile_id()
      and dm.status = 'active'
      and dm.member_role in ('owner', 'manager')
  );
$$;

create or replace function public.is_dealer_staff(p_dealer_id uuid)
returns boolean
language sql
stable
as $$
  select public.is_dealer_member(p_dealer_id) or public.is_admin_or_moderator();
$$;

create or replace function public.is_car_owner_or_staff(p_car_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.cars c
    join public.dealer_members dm on dm.dealer_id = c.dealer_id
    where c.id = p_car_id
      and dm.profile_id = public.current_profile_id()
      and dm.status = 'active'
      and dm.member_role in ('owner', 'manager', 'staff')
  ) or public.is_admin_or_moderator();
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger brands_set_updated_at
before update on public.brands
for each row execute function public.set_updated_at();

create trigger car_models_set_updated_at
before update on public.car_models
for each row execute function public.set_updated_at();

create trigger dealers_set_updated_at
before update on public.dealers
for each row execute function public.set_updated_at();

create trigger dealer_members_set_updated_at
before update on public.dealer_members
for each row execute function public.set_updated_at();

create trigger cars_set_updated_at
before update on public.cars
for each row execute function public.set_updated_at();

create trigger car_specifications_set_updated_at
before update on public.car_specifications
for each row execute function public.set_updated_at();

create trigger car_features_set_updated_at
before update on public.car_features
for each row execute function public.set_updated_at();

create trigger wishlists_set_updated_at
before update on public.wishlists
for each row execute function public.set_updated_at();

create trigger compare_lists_set_updated_at
before update on public.compare_lists
for each row execute function public.set_updated_at();

create trigger saved_searches_set_updated_at
before update on public.saved_searches
for each row execute function public.set_updated_at();

create trigger inquiries_set_updated_at
before update on public.inquiries
for each row execute function public.set_updated_at();

create trigger reviews_set_updated_at
before update on public.reviews
for each row execute function public.set_updated_at();

create trigger reports_set_updated_at
before update on public.reports
for each row execute function public.set_updated_at();

create trigger ai_requests_set_updated_at
before update on public.ai_requests
for each row execute function public.set_updated_at();

alter table public.locations enable row level security;
alter table public.profiles enable row level security;
alter table public.brands enable row level security;
alter table public.car_models enable row level security;
alter table public.dealers enable row level security;
alter table public.dealer_members enable row level security;
alter table public.cars enable row level security;
alter table public.car_specifications enable row level security;
alter table public.car_images enable row level security;
alter table public.car_features enable row level security;
alter table public.favorites enable row level security;
alter table public.wishlists enable row level security;
alter table public.compare_lists enable row level security;
alter table public.compare_items enable row level security;
alter table public.saved_searches enable row level security;
alter table public.notifications enable row level security;
alter table public.inquiries enable row level security;
alter table public.reviews enable row level security;
alter table public.reports enable row level security;
alter table public.ai_requests enable row level security;
alter table public.admin_logs enable row level security;

-- Public reference data
create policy locations_select_public on public.locations
for select using (true);

create policy brands_select_public on public.brands
for select using (true);

create policy car_models_select_public on public.car_models
for select using (true);

-- Profiles
create policy profiles_select_own_or_admin on public.profiles
for select using (
  auth.uid() = auth_user_id
  or public.is_admin_or_moderator()
);

create policy profiles_insert_own on public.profiles
for insert with check (auth.uid() = auth_user_id);

create policy profiles_update_own_or_admin on public.profiles
for update using (
  auth.uid() = auth_user_id
  or public.is_admin_or_moderator()
)
with check (
  auth.uid() = auth_user_id
  or public.is_admin_or_moderator()
);

-- Dealers and memberships
create policy dealers_select_public_or_member on public.dealers
for select using (
  status = 'active'
  and deleted_at is null
  or public.is_dealer_member(id)
  or public.is_admin_or_moderator()
);

create policy dealers_insert_authenticated on public.dealers
for insert with check (
  auth.uid() is not null
  and exists (
    select 1
    from public.profiles p
    where p.id = owner_profile_id
      and p.auth_user_id = auth.uid()
      and p.deleted_at is null
  )
);

create policy dealers_update_owner_member_or_admin on public.dealers
for update using (
  exists (
    select 1 from public.profiles p
    where p.id = owner_profile_id and p.auth_user_id = auth.uid() and p.deleted_at is null
  )
  or public.is_dealer_owner_or_manager(id)
  or public.is_admin_or_moderator()
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = owner_profile_id and p.auth_user_id = auth.uid() and p.deleted_at is null
  )
  or public.is_dealer_owner_or_manager(id)
  or public.is_admin_or_moderator()
);

create policy dealer_members_select_member_or_admin on public.dealer_members
for select using (
  public.is_dealer_member(dealer_id)
  or public.is_admin_or_moderator()
);

create policy dealer_members_insert_owner_or_admin on public.dealer_members
for insert with check (
  public.is_dealer_owner_or_manager(dealer_id)
  or public.is_admin_or_moderator()
);

create policy dealer_members_update_owner_or_admin on public.dealer_members
for update using (
  public.is_dealer_owner_or_manager(dealer_id)
  or public.is_admin_or_moderator()
)
with check (
  public.is_dealer_owner_or_manager(dealer_id)
  or public.is_admin_or_moderator()
);

create policy dealer_members_delete_owner_or_admin on public.dealer_members
for delete using (
  public.is_dealer_owner_or_manager(dealer_id)
  or public.is_admin_or_moderator()
);

-- Cars and related tables
create policy cars_select_public_or_owner on public.cars
for select using (
  (listing_status = 'published' and visibility_status = 'public' and deleted_at is null)
  or public.is_car_owner_or_staff(id)
);

create policy cars_insert_owner_or_staff on public.cars
for insert with check (
  public.is_dealer_owner_or_manager(dealer_id)
  or public.is_admin_or_moderator()
);

create policy cars_update_owner_or_staff on public.cars
for update using (
  public.is_car_owner_or_staff(id)
)
with check (
  public.is_car_owner_or_staff(id)
);

create policy cars_delete_owner_or_staff on public.cars
for delete using (
  public.is_car_owner_or_staff(id)
);

create policy car_specifications_select_related on public.car_specifications
for select using (
  exists (
    select 1
    from public.cars c
    where c.id = car_id
      and (
        (c.listing_status = 'published' and c.visibility_status = 'public' and c.deleted_at is null)
        or public.is_car_owner_or_staff(c.id)
      )
  )
);

create policy car_specifications_write_related on public.car_specifications
for all using (
  exists (
    select 1
    from public.cars c
    where c.id = car_id
      and public.is_car_owner_or_staff(c.id)
  )
)
with check (
  exists (
    select 1
    from public.cars c
    where c.id = car_id
      and public.is_car_owner_or_staff(c.id)
  )
);

create policy car_images_select_related on public.car_images
for select using (
  exists (
    select 1
    from public.cars c
    where c.id = car_id
      and (
        (c.listing_status = 'published' and c.visibility_status = 'public' and c.deleted_at is null)
        or public.is_car_owner_or_staff(c.id)
      )
  )
);

create policy car_images_write_related on public.car_images
for all using (
  exists (
    select 1
    from public.cars c
    where c.id = car_id
      and public.is_car_owner_or_staff(c.id)
  )
)
with check (
  exists (
    select 1
    from public.cars c
    where c.id = car_id
      and public.is_car_owner_or_staff(c.id)
  )
);

create policy car_features_select_related on public.car_features
for select using (
  exists (
    select 1
    from public.cars c
    where c.id = car_id
      and (
        (c.listing_status = 'published' and c.visibility_status = 'public' and c.deleted_at is null)
        or public.is_car_owner_or_staff(c.id)
      )
  )
);

create policy car_features_write_related on public.car_features
for all using (
  exists (
    select 1
    from public.cars c
    where c.id = car_id
      and public.is_car_owner_or_staff(c.id)
  )
)
with check (
  exists (
    select 1
    from public.cars c
    where c.id = car_id
      and public.is_car_owner_or_staff(c.id)
  )
);

-- Engagement
create policy favorites_select_own_or_admin on public.favorites
for select using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy favorites_insert_own on public.favorites
for insert with check (profile_id = public.current_profile_id());

create policy favorites_delete_own_or_admin on public.favorites
for delete using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy wishlists_select_own_or_admin on public.wishlists
for select using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy wishlists_write_own_or_admin on public.wishlists
for all using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
)
with check (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy compare_lists_select_own_or_admin on public.compare_lists
for select using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy compare_lists_write_own_or_admin on public.compare_lists
for all using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
)
with check (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy compare_items_select_owner_or_admin on public.compare_items
for select using (
  exists (
    select 1
    from public.compare_lists cl
    where cl.id = compare_list_id
      and (cl.profile_id = public.current_profile_id() or public.is_admin_or_moderator())
  )
);

create policy compare_items_write_owner_or_admin on public.compare_items
for all using (
  exists (
    select 1
    from public.compare_lists cl
    where cl.id = compare_list_id
      and (cl.profile_id = public.current_profile_id() or public.is_admin_or_moderator())
  )
)
with check (
  exists (
    select 1
    from public.compare_lists cl
    where cl.id = compare_list_id
      and (cl.profile_id = public.current_profile_id() or public.is_admin_or_moderator())
  )
);

create policy saved_searches_select_own_or_admin on public.saved_searches
for select using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy saved_searches_write_own_or_admin on public.saved_searches
for all using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
)
with check (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy notifications_select_own_or_admin on public.notifications
for select using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy notifications_update_own_or_admin on public.notifications
for update using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
)
with check (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

-- Interaction and trust
create policy inquiries_select_related_or_own on public.inquiries
for select using (
  profile_id = public.current_profile_id()
  or public.is_dealer_staff(dealer_id)
  or public.is_admin_or_moderator()
);

create policy inquiries_insert_public_or_own on public.inquiries
for insert with check (
  auth.uid() is null
  or profile_id = public.current_profile_id()
);

create policy inquiries_update_related_or_admin on public.inquiries
for update using (
  profile_id = public.current_profile_id()
  or public.is_dealer_staff(dealer_id)
  or public.is_admin_or_moderator()
)
with check (
  profile_id = public.current_profile_id()
  or public.is_dealer_staff(dealer_id)
  or public.is_admin_or_moderator()
);

create policy reviews_select_public_or_related on public.reviews
for select using (
  status = 'approved'
  or profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy reviews_insert_authenticated on public.reviews
for insert with check (
  profile_id = public.current_profile_id()
);

create policy reviews_update_owner_or_admin on public.reviews
for update using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
)
with check (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy reviews_delete_owner_or_admin on public.reviews
for delete using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy reports_select_owner_or_admin on public.reports
for select using (
  profile_id = public.current_profile_id()
  or reviewed_by_profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy reports_insert_own_or_anonymous on public.reports
for insert with check (
  auth.uid() is null
  or profile_id = public.current_profile_id()
);

create policy reports_update_admin_only on public.reports
for update using (
  public.is_admin()
)
with check (
  public.is_admin()
);

create policy ai_requests_select_owner_or_admin on public.ai_requests
for select using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy ai_requests_insert_owner_or_staff on public.ai_requests
for insert with check (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy ai_requests_update_owner_or_admin on public.ai_requests
for update using (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
)
with check (
  profile_id = public.current_profile_id()
  or public.is_admin_or_moderator()
);

create policy admin_logs_select_admin_only on public.admin_logs
for select using (public.is_admin());

create policy admin_logs_insert_admin_only on public.admin_logs
for insert with check (public.is_admin());

create policy admin_logs_update_admin_only on public.admin_logs
for update using (public.is_admin()) with check (public.is_admin());

create policy admin_logs_delete_admin_only on public.admin_logs
for delete using (public.is_admin());

-- Storage buckets
insert into storage.buckets (id, name, public)
values
  ('car-images', 'car-images', true),
  ('dealer-assets', 'dealer-assets', true),
  ('profile-assets', 'profile-assets', true),
  ('moderation-evidence', 'moderation-evidence', false)
on conflict (id) do nothing;
