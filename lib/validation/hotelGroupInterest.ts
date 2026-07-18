import { z } from "zod";

export const hotelGroupInterestSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address.")
    .max(254, "Email is too long."),

  hotelSlug: z.enum([
    "caribbean-club",
    "hampton-inn",
    "westin",
    "sunshine-hotel",
  ]),
});

export type HotelGroupInterestInput = z.infer<typeof hotelGroupInterestSchema>;
