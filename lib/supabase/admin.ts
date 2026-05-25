/**
 * Server-only Supabase client using the service role key.
 * This file must only be imported from route handlers and other server code.
 * The `server-only` import below causes a build error if this is ever
 * bundled into a client component.
 */
import "server-only";
import { createClient } from "@supabase/supabase-js";

export function getAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
