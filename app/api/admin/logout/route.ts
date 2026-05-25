import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  // Overwrite cookie with empty value and maxAge 0 to force immediate expiry.
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
