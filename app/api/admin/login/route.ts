import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth/session";
import { checkLoginRateLimit, clearLoginAttempts } from "@/lib/auth/rateLimiter";

export const runtime = "nodejs";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const rateLimit = checkLoginRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const { password } = body as Record<string, unknown>;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const storedHash = process.env.ADMIN_PASSWORD_HASH;
    if (!storedHash) {
      console.error("[admin/login] ADMIN_PASSWORD_HASH is not set.");
      return NextResponse.json(
        { ok: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    const valid = await verifyPassword(password, storedHash);

    // Do not leak whether the password was close/correct.
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Successful login — reset the attempt counter for this IP.
    clearLoginAttempts(ip);

    const token = createSessionToken();

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return response;
  } catch (err) {
    console.error("[admin/login] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
