-- Wedding website: contact requests table
-- Run this in the Supabase SQL editor to set up the schema.

create table if not exists public.contact_requests (
  id          uuid        primary key default gen_random_uuid(),
  full_name   text        not null,
  email       text        not null,
  phone       text,
  message     text,
  status      text        not null default 'pending_review',
  user_agent  text,
  ip_address  text,
  created_at  timestamptz not null default now()
);

-- RLS enabled; no public policies — all reads/writes go through the service role key in the API layer.
alter table public.contact_requests enable row level security;
