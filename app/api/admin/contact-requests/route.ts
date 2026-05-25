import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth/session";
import { getAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("contact_requests")
      .select(
        "id, full_name, email, phone, message, status, created_at, interested_in_venue_condo, interested_in_nearby_hotel, lodging_interest_not_sure, condo_sharing_preference"
      )
      .order("created_at", { ascending: false })
      .limit(250);

    if (error) {
      console.error("[admin/contact-requests] Supabase error:", error.message);
      return NextResponse.json(
        { ok: false, error: "Failed to fetch contact requests." },
        { status: 500 }
      );
    }

    const requests = (data ?? []).map((row) => ({
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      message: row.message,
      status: row.status,
      createdAt: row.created_at,
      interestedInVenueCondo: row.interested_in_venue_condo,
      interestedInNearbyHotel: row.interested_in_nearby_hotel,
      lodgingInterestNotSure: row.lodging_interest_not_sure,
      condoSharingPreference: row.condo_sharing_preference,
    }));

    return NextResponse.json({ ok: true, data: requests });
  } catch (err) {
    console.error("[admin/contact-requests] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
