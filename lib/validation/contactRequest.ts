import { z } from "zod";

/**
 * Validation schema for POST /api/contact-requests.
 *
 * - honeypot: if present and non-empty the route handler silently accepts
 *   but does not insert (bot detection without revealing the check).
 * - phone / message: optional; empty strings are normalised to undefined
 *   so the database column stores NULL instead of an empty string.
 */
export const contactRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(120, "Name is too long."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address.")
    .max(254, "Email is too long."),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),

  message: z
    .string()
    .trim()
    .max(1000, "Message is too long.")
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),

  /** Honeypot — must be absent or empty string. Validated in the route handler. */
  honeypot: z.string().optional(),
});

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;
