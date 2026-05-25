/**
 * Password hashing using Node's built-in crypto.scrypt.
 * No native addons — safe for Vercel's serverless runtime.
 *
 * Hash format: scrypt:<salt-hex>:<derived-key-hex>
 *
 * To generate ADMIN_PASSWORD_HASH for your .env:
 *   node scripts/hash-password.mjs yourpassword
 */
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const KEYLEN = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(password, salt, KEYLEN)) as Buffer;
  return `scrypt:${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  try {
    const parts = stored.split(":");
    if (parts.length !== 3 || parts[0] !== "scrypt") return false;
    const [, salt, storedHash] = parts;

    const derived = (await scryptAsync(password, salt, KEYLEN)) as Buffer;
    const storedBuf = Buffer.from(storedHash, "hex");

    // Buffers must be same length for timingSafeEqual
    if (derived.length !== storedBuf.length) return false;
    return timingSafeEqual(derived, storedBuf);
  } catch {
    return false;
  }
}
