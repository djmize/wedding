import { NextRequest, NextResponse } from "next/server";
import { contactRequestSchema } from "@/lib/validation/contactRequest";
import { getAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const result = contactRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid request data." },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      message,
      honeypot,
      interestedInVenueCondo,
      interestedInNearbyHotel,
      lodgingInterestNotSure,
      condoSharingPreference,
    } = result.data;

    // Honeypot filled — likely a bot. Return success without inserting.
    if (honeypot && honeypot.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      null;

    const userAgent = request.headers.get("user-agent") ?? null;

    const supabase = getAdminClient();

    const { error } = await supabase.from("contact_requests").insert({
      full_name: fullName,
      email,
      phone: phone ?? null,
      message: message ?? null,
      status: "pending_review",
      user_agent: userAgent,
      ip_address: ip,
      interested_in_venue_condo: interestedInVenueCondo,
      interested_in_nearby_hotel: interestedInNearbyHotel,
      lodging_interest_not_sure: lodgingInterestNotSure,
      condo_sharing_preference: condoSharingPreference,
    });

    if (error) {
      console.error("[contact-requests] Supabase insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "Could not save your request. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact-requests] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
