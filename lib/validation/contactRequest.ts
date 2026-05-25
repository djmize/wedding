import { z } from "zod";

/**
 * Validation schema for POST /api/contact-requests.
 *
 * - honeypot: if present and non-empty the route handler silently accepts
 *   but does not insert (bot detection without revealing the check).
 * - phone / message: optional; empty strings are normalised to undefined
 *   so the database column stores NULL instead of an empty string.
 *
 * Lodging interest rules (cross-field, enforced via superRefine):
 *   - At least one of interestedInVenueCondo, interestedInNearbyHotel,
 *     or lodgingInterestNotSure must be true.
 *   - lodgingInterestNotSure is mutually exclusive with the specific options.
 *   - condoSharingPreference is required when interestedInVenueCondo is true.
 *   - condoSharingPreference must be absent/null when interestedInVenueCondo is false.
 */
export const contactRequestSchema = z
  .object({
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

    // ── Lodging interest ──────────────────────────────────────────────────────
    interestedInVenueCondo: z.boolean(),
    interestedInNearbyHotel: z.boolean(),
    lodgingInterestNotSure: z.boolean(),

    /** Required when interestedInVenueCondo is true; must be null/absent otherwise. */
    condoSharingPreference: z
      .enum(["yes", "no", "not_sure"])
      .nullish()
      .transform((v) => v ?? null),
  })
  .superRefine((data, ctx) => {
    // At least one lodging option must be selected.
    if (
      !data.interestedInVenueCondo &&
      !data.interestedInNearbyHotel &&
      !data.lodgingInterestNotSure
    ) {
      ctx.addIssue({
        code: "custom",
        message: "At least one lodging option must be selected.",
        path: ["lodgingInterestNotSure"],
      });
    }

    // "Not sure yet" is mutually exclusive with the specific options.
    if (
      data.lodgingInterestNotSure &&
      (data.interestedInVenueCondo || data.interestedInNearbyHotel)
    ) {
      ctx.addIssue({
        code: "custom",
        message:
          '"Not sure yet" cannot be combined with other lodging options.',
        path: ["lodgingInterestNotSure"],
      });
    }

    // condoSharingPreference required when condo is selected.
    if (data.interestedInVenueCondo && !data.condoSharingPreference) {
      ctx.addIssue({
        code: "custom",
        message: "Condo sharing preference is required.",
        path: ["condoSharingPreference"],
      });
    }

    // condoSharingPreference must be absent when condo is not selected.
    if (!data.interestedInVenueCondo && data.condoSharingPreference) {
      ctx.addIssue({
        code: "custom",
        message:
          "Condo sharing preference must not be provided when not interested in the venue condo.",
        path: ["condoSharingPreference"],
      });
    }
  });

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;
