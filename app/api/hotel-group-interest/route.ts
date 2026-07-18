import { NextRequest, NextResponse } from "next/server";
import { hotelGroupInterestSchema } from "@/lib/validation/hotelGroupInterest";
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

    const result = hotelGroupInterestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid request data." },
        { status: 400 }
      );
    }

    const { email, hotelSlug } = result.data;

    const supabase = getAdminClient();

    const { error } = await supabase.from("hotel_group_interest").upsert(
      { email, hotel_slug: hotelSlug },
      { onConflict: "email,hotel_slug", ignoreDuplicates: true }
    );

    if (error) {
      console.error(
        "[hotel-group-interest] Supabase upsert error:",
        error.message
      );
      return NextResponse.json(
        { ok: false, error: "Could not save your request. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[hotel-group-interest] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
