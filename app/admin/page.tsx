"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ContactRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: string;
  createdAt: string;
  interestedInVenueCondo: boolean;
  interestedInNearbyHotel: boolean;
  lodgingInterestNotSure: boolean;
  condoSharingPreference: "yes" | "no" | "not_sure" | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const CONDO_SHARING_LABELS: Record<string, string> = {
  yes: "Would share condo",
  no: "Would not share condo",
  not_sure: "Not sure about sharing",
};

const STATUS_STYLES: Record<string, string> = {
  pending_review: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  declined: "bg-red-50 text-red-700 border-red-200",
  waitlisted: "bg-blue-50 text-blue-700 border-blue-200",
};

const STATUS_LABELS: Record<string, string> = {
  pending_review: "Pending",
  approved: "Approved",
  declined: "Declined",
  waitlisted: "Waitlisted",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block text-xs px-2 py-0.5 border ${
        STATUS_STYLES[status] ?? "bg-sand text-bark/60 border-sand"
      }`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

function LodgingTags({ r }: { r: ContactRequest }) {
  return (
    <div className="flex flex-wrap gap-1">
      {r.interestedInVenueCondo && (
        <span className="text-xs px-2 py-0.5 bg-gold/10 text-gold border border-gold/30">
          Venue condo
        </span>
      )}
      {r.interestedInNearbyHotel && (
        <span className="text-xs px-2 py-0.5 bg-sage/10 text-sage border border-sage/30">
          Nearby hotel
        </span>
      )}
      {r.lodgingInterestNotSure && (
        <span className="text-xs px-2 py-0.5 bg-sand/60 text-bark/55 border border-sand">
          Not sure yet
        </span>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-cream border border-sand px-4 py-3 text-center">
      <p className="text-2xl font-light text-bark font-display">{value}</p>
      <p className="text-[0.65rem] text-bark/50 tracking-[0.1em] uppercase mt-0.5">
        {label}
      </p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch("/api/admin/contact-requests")
      .then(async (res) => {
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        if (!res.ok) throw new Error("Unexpected response");
        const json = await res.json();
        setRequests(json.data ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load contact requests.");
        setLoading(false);
      });
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  // Derived stats
  const total = requests.length;
  const condoCount = requests.filter((r) => r.interestedInVenueCondo).length;
  const hotelCount = requests.filter((r) => r.interestedInNearbyHotel).length;
  const notSureCount = requests.filter((r) => r.lodgingInterestNotSure).length;
  const shareCount = requests.filter(
    (r) => r.condoSharingPreference === "yes"
  ).length;
  const pendingCount = requests.filter(
    (r) => r.status === "pending_review"
  ).length;

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-57px)] bg-ivory flex items-center justify-center">
        <p className="text-bark/40 text-sm tracking-wide">Loading…</p>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-[calc(100vh-57px)] bg-ivory flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-bark/60 underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ── Authenticated view ──
  return (
    <div className="min-h-[calc(100vh-57px)] bg-ivory">
      {/* Admin header bar */}
      <div className="bg-bark text-cream px-6 py-3.5 flex items-center justify-between">
        <p className="text-xs tracking-[0.18em] uppercase text-cream/60">
          Contact Requests
        </p>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="text-xs tracking-[0.15em] uppercase text-cream/60 hover:text-cream disabled:opacity-40 transition-colors cursor-pointer"
        >
          {loggingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">

        {/* Summary stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 mb-8">
          <StatCard label="Total" value={total} />
          <StatCard label="Venue condo" value={condoCount} />
          <StatCard label="Nearby hotel" value={hotelCount} />
          <StatCard label="Not sure" value={notSureCount} />
          <StatCard label="Would share" value={shareCount} />
          <StatCard label="Pending" value={pendingCount} />
        </div>

        {requests.length === 0 ? (
          <p className="text-center text-bark/40 text-sm py-16">
            No contact requests yet.
          </p>
        ) : (
          <>
            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto rounded-sm border border-sand">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-sand/40 text-bark/55 text-[0.65rem] tracking-[0.1em] uppercase border-b border-sand">
                    <th className="text-left px-4 py-3 font-normal whitespace-nowrap">Date</th>
                    <th className="text-left px-4 py-3 font-normal">Guest</th>
                    <th className="text-left px-4 py-3 font-normal">Lodging interest</th>
                    <th className="text-left px-4 py-3 font-normal whitespace-nowrap">Condo sharing</th>
                    <th className="text-left px-4 py-3 font-normal">Status</th>
                    <th className="text-left px-4 py-3 font-normal">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`border-b border-sand last:border-0 ${
                        i % 2 === 0 ? "bg-cream" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-3 text-bark/50 text-xs whitespace-nowrap">
                        {formatDate(r.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-bark font-medium leading-tight">
                          {r.fullName}
                        </p>
                        <p className="text-bark/55 text-xs mt-0.5">{r.email}</p>
                        {r.phone && (
                          <p className="text-bark/40 text-xs mt-0.5">{r.phone}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <LodgingTags r={r} />
                      </td>
                      <td className="px-4 py-3 text-bark/60 text-xs whitespace-nowrap">
                        {r.condoSharingPreference
                          ? CONDO_SHARING_LABELS[r.condoSharingPreference]
                          : <span className="text-bark/30">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-4 py-3 text-bark/60 text-xs max-w-[180px]">
                        {r.message ? (
                          <p className="truncate" title={r.message}>
                            {r.message}
                          </p>
                        ) : (
                          <span className="text-bark/30">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked cards */}
            <div className="md:hidden space-y-3">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="bg-cream border border-sand px-5 py-4 space-y-3"
                >
                  {/* Name / status row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-bark font-medium truncate">{r.fullName}</p>
                      <p className="text-bark/55 text-xs mt-0.5 truncate">{r.email}</p>
                      {r.phone && (
                        <p className="text-bark/40 text-xs mt-0.5">{r.phone}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <StatusBadge status={r.status} />
                      <p className="text-bark/35 text-xs">{formatDate(r.createdAt)}</p>
                    </div>
                  </div>

                  {/* Lodging */}
                  <div>
                    <p className="text-[0.6rem] text-bark/40 tracking-[0.12em] uppercase mb-1.5">
                      Lodging interest
                    </p>
                    <LodgingTags r={r} />
                  </div>

                  {/* Condo sharing — only show when relevant */}
                  {r.interestedInVenueCondo && (
                    <div>
                      <p className="text-[0.6rem] text-bark/40 tracking-[0.12em] uppercase mb-1">
                        Condo sharing
                      </p>
                      <p className="text-sm text-bark/65">
                        {r.condoSharingPreference
                          ? CONDO_SHARING_LABELS[r.condoSharingPreference]
                          : "—"}
                      </p>
                    </div>
                  )}

                  {/* Message */}
                  {r.message && (
                    <div>
                      <p className="text-[0.6rem] text-bark/40 tracking-[0.12em] uppercase mb-1">
                        Message
                      </p>
                      <p className="text-sm text-bark/65 leading-relaxed">{r.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
