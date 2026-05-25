/**
 * Generate an ADMIN_PASSWORD_HASH value for your .env file.
 *
 * Usage:
 *   node scripts/hash-password.mjs yourpassword
 *
 * Copy the output into your .env:
 *   ADMIN_PASSWORD_HASH=scrypt:...
 */
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const KEYLEN = 64;

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = await scryptAsync(password, salt, KEYLEN);
const result = `scrypt:${salt}:${hash.toString("hex")}`;

console.log("\nAdd this to your .env:\n");
console.log(`ADMIN_PASSWORD_HASH=${result}`);
console.log();
