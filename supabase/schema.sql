-- Wedding website: contact requests table
-- Run this in the Supabase SQL editor to set up the schema.

-- ── Fresh install ─────────────────────────────────────────────────────────────
create table if not exists public.contact_requests (
  id          uuid        primary key default gen_random_uuid(),
  full_name   text        not null,
  email       text        not null,
  phone       text,
  message     text,
  status      text        not null default 'pending_review',
  user_agent  text,
  ip_address  text,
  created_at  timestamptz not null default now(),

  -- Lodging interest (save-the-date collection, not official booking)
  interested_in_venue_condo  boolean not null default false,
  interested_in_nearby_hotel boolean not null default false,
  lodging_interest_not_sure  boolean not null default false,
  condo_sharing_preference   text,

  -- status must be a known value
  constraint contact_requests_status_check
    check (status in ('pending_review', 'approved', 'declined', 'waitlisted')),

  -- condo_sharing_preference must be a known value or null
  constraint contact_requests_condo_sharing_values
    check (condo_sharing_preference is null
           or condo_sharing_preference in ('yes', 'no', 'not_sure')),

  -- at least one lodging option must be selected
  constraint contact_requests_lodging_at_least_one
    check (interested_in_venue_condo
           or interested_in_nearby_hotel
           or lodging_interest_not_sure),

  -- "not sure" is mutually exclusive with the specific options
  constraint contact_requests_not_sure_exclusive
    check (not lodging_interest_not_sure
           or (not interested_in_venue_condo and not interested_in_nearby_hotel)),

  -- condo_sharing_preference is non-null iff interested_in_venue_condo is true
  constraint contact_requests_condo_sharing_iff_condo
    check (interested_in_venue_condo = (condo_sharing_preference is not null))
);

-- Fast descending reads for the admin endpoint.
create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

-- RLS enabled; no public policies — all reads/writes go through the service role key in the API layer.
alter table public.contact_requests enable row level security;
