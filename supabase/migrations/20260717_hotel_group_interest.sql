-- Migration: hotel_group_interest
-- HUMAN ACTION REQUIRED: Run this migration in the Supabase dashboard SQL editor
-- (https://supabase.com/dashboard → your project → SQL Editor) before deploying
-- the /places-to-stay page and /api/hotel-group-interest endpoint.

CREATE TABLE IF NOT EXISTS hotel_group_interest (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  hotel_slug text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT hotel_group_interest_email_hotel_unique UNIQUE (email, hotel_slug)
);
