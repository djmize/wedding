/**
 * HMAC-SHA256 signed session tokens for the admin cookie.
 *
 * Token format: base64url(payload).base64url(HMAC-SHA256(payload))
 * Payload: JSON { iat: unixMs, exp: unixMs }
 *
 * No external JWT libraries — uses Node's built-in crypto.
 */
import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set.");
  return secret;
}

export function createSessionToken(): string {
  const now = Date.now();
  const payload = Buffer.from(
    JSON.stringify({ iat: now, exp: now + EXPIRY_MS })
  ).toString("base64url");

  const sig = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return false;

    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);

    const expectedSig = createHmac("sha256", getSecret())
      .update(payload)
      .digest("base64url");

    // Timing-safe comparison
    const sigBuf = Buffer.from(sig, "base64url");
    const expectedBuf = Buffer.from(expectedSig, "base64url");
    if (sigBuf.length !== expectedBuf.length) return false;
    if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

    // Check expiry
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}
