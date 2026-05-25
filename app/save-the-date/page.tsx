"use client";

import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

type CondoSharing = "yes" | "no" | "not_sure";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  interestedInVenueCondo: boolean;
  interestedInNearbyHotel: boolean;
  lodgingInterestNotSure: boolean;
  condoSharingPreference: CondoSharing | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  lodging?: string;
  condoSharingPreference?: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
  interestedInVenueCondo: false,
  interestedInNearbyHotel: false,
  lodgingInterestNotSure: false,
  condoSharingPreference: null,
};

// ── Validation ─────────────────────────────────────────────────────────────────

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  const name = data.fullName.trim();
  if (!name) errors.fullName = "Name is required.";
  else if (name.length > 120) errors.fullName = "Name is too long.";

  const email = data.email.trim();
  if (!email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email address.";
  else if (email.length > 254) errors.email = "Email is too long.";

  if (data.phone.trim().length > 30)
    errors.phone = "Phone number is too long.";

  if (data.message.trim().length > 1000)
    errors.message = "Message is too long (max 1000 characters).";

  if (
    !data.interestedInVenueCondo &&
    !data.interestedInNearbyHotel &&
    !data.lodgingInterestNotSure
  ) {
    errors.lodging = "Please select at least one lodging option.";
  }

  if (
    data.lodgingInterestNotSure &&
    (data.interestedInVenueCondo || data.interestedInNearbyHotel)
  ) {
    errors.lodging = '"Not sure yet" cannot be combined with other options.';
  }

  if (data.interestedInVenueCondo && !data.condoSharingPreference) {
    errors.condoSharingPreference =
      "Please indicate your condo sharing preference.";
  }

  return errors;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function FieldLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs tracking-[0.12em] uppercase text-bark/55 mb-2"
    >
      {children}
      {optional && (
        <span className="ml-1.5 normal-case tracking-normal text-bark/30">
          optional
        </span>
      )}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

function CheckOption({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer select-none group">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        aria-hidden="true"
        className={`w-4 h-4 mt-0.5 flex-shrink-0 border flex items-center justify-center transition-colors ${
          checked
            ? "bg-bark border-bark"
            : "border-sand bg-white group-hover:border-mist"
        }`}
      >
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path
              d="M1 3l2 2 4-4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-sm text-bark/75 leading-snug">{children}</span>
    </label>
  );
}

function RadioOption({
  id,
  name,
  value,
  selected,
  onChange,
  children,
}: {
  id: string;
  name: string;
  value: CondoSharing;
  selected: CondoSharing | null;
  onChange: (v: CondoSharing) => void;
  children: React.ReactNode;
}) {
  const isSelected = selected === value;
  return (
    <label htmlFor={id} className="flex items-center gap-2.5 cursor-pointer select-none group">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div
        aria-hidden="true"
        className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
          isSelected ? "border-bark" : "border-sand bg-white group-hover:border-mist"
        }`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-bark" />}
      </div>
      <span className="text-sm text-bark/75">{children}</span>
    </label>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function SaveTheDatePage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleLodgingChange(
    key:
      | "interestedInVenueCondo"
      | "interestedInNearbyHotel"
      | "lodgingInterestNotSure",
    checked: boolean
  ) {
    setForm((f) => {
      const next = { ...f, [key]: checked };

      // "Not sure" clears the specific options and condo sharing
      if (key === "lodgingInterestNotSure" && checked) {
        next.interestedInVenueCondo = false;
        next.interestedInNearbyHotel = false;
        next.condoSharingPreference = null;
      }

      // Specific options clear "not sure"
      if (
        (key === "interestedInVenueCondo" ||
          key === "interestedInNearbyHotel") &&
        checked
      ) {
        next.lodgingInterestNotSure = false;
      }

      // Unchecking condo clears sharing preference
      if (key === "interestedInVenueCondo" && !checked) {
        next.condoSharingPreference = null;
      }

      return next;
    });
  }

  // Selecting a sharing answer implies condo interest
  function handleCondoSharingChange(value: CondoSharing) {
    setForm((f) => ({
      ...f,
      condoSharingPreference: value,
      interestedInVenueCondo: true,
      lodgingInterestNotSure: false,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || undefined,
          message: form.message.trim() || undefined,
          interestedInVenueCondo: form.interestedInVenueCondo,
          interestedInNearbyHotel: form.interestedInNearbyHotel,
          lodgingInterestNotSure: form.lodgingInterestNotSure,
          condoSharingPreference: form.condoSharingPreference,
          honeypot: "",
        }),
      });

      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  // ── Success ──
  if (status === "success") {
    return (
      <div className="bg-cream min-h-[calc(100vh-57px)] flex items-center justify-center px-6">
        <div className="max-w-sm mx-auto text-center">
          <p
            className="font-script text-gold mb-4"
            style={{ fontSize: "2rem" }}
          >
            Thank you
          </p>
          <div className="h-px w-10 bg-gold/40 mx-auto mb-6" />
          <p
            className="text-bark/70 leading-[1.9]"
            style={{ fontSize: "clamp(0.87rem, 1.4vw, 0.93rem)" }}
          >
            We&apos;ll send your private wedding details soon.
          </p>
        </div>
      </div>
    );
  }

  // ── Form ──
  return (
    <div className="bg-cream">
      {/* Header */}
      <div className="text-center pt-14 pb-10 px-6">
        <p className="text-[0.65rem] tracking-[0.22em] uppercase text-gold mb-4">
          June 12, 2027 &nbsp;·&nbsp; Grand Cayman
        </p>
        <h1
          className="font-display font-light text-bark leading-snug mb-5"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
        >
          Save the Date
        </h1>
        <div className="h-px w-10 bg-gold/40 mx-auto mb-6" />
        <p
          className="text-bark/60 leading-[1.9] max-w-sm mx-auto"
          style={{ fontSize: "clamp(0.85rem, 1.3vw, 0.9rem)" }}
        >
          Register your information and we&apos;ll send your private invitation
          with full ceremony and reception details.
        </p>
        <p
          className="text-bark/40 mt-3 max-w-xs mx-auto leading-relaxed"
          style={{ fontSize: "clamp(0.75rem, 1.1vw, 0.8rem)" }}
        >
          Only one submission per party is needed.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="max-w-lg mx-auto px-6 pb-24 space-y-8"
      >
        {/* ── Personal information ── */}
        <div className="space-y-5">
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-bark/35">
            Your Information
          </p>

          <div>
            <FieldLabel htmlFor="fullName">Full name</FieldLabel>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              className="w-full border border-sand bg-white px-3 py-2.5 text-bark text-sm focus:outline-none focus:border-gold/60 transition-colors"
            />
            <FieldError message={errors.fullName} />
          </div>

          <div>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className="w-full border border-sand bg-white px-3 py-2.5 text-bark text-sm focus:outline-none focus:border-gold/60 transition-colors"
            />
            <FieldError message={errors.email} />
          </div>

          <div>
            <FieldLabel htmlFor="phone" optional>
              Phone
            </FieldLabel>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              className="w-full border border-sand bg-white px-3 py-2.5 text-bark text-sm focus:outline-none focus:border-gold/60 transition-colors"
            />
            <FieldError message={errors.phone} />
          </div>

          <div>
            <FieldLabel htmlFor="message" optional>
              Message
            </FieldLabel>
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              className="w-full border border-sand bg-white px-3 py-2.5 text-bark text-sm focus:outline-none focus:border-gold/60 transition-colors resize-none"
            />
            <FieldError message={errors.message} />
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-sand" />

        {/* ── Lodging interest ── */}
        <div className="space-y-5">
          <div>
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-bark/35 mb-3">
              Lodging Interest
            </p>
            <p
              className="text-bark/60 leading-[1.85]"
              style={{ fontSize: "clamp(0.83rem, 1.3vw, 0.88rem)" }}
            >
              We&apos;re working to arrange group rates for guests. Which
              options would you like updates about?
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Condo option + always-visible sharing follow-up */}
            <div className="space-y-3">
              <CheckOption
                id="condo"
                checked={form.interestedInVenueCondo}
                onChange={(v) => handleLodgingChange("interestedInVenueCondo", v)}
              >
                I&apos;m interested in staying in a condo-style unit at the
                venue at a reduced group rate.
              </CheckOption>

              {/* Indented to align with checkbox label text (w-4 box + gap-3 = pl-7) */}
              <div className="pl-7 space-y-2.5">
                <p
                  className="text-bark/55 leading-snug"
                  style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.85rem)" }}
                >
                  Would you consider sharing a condo-style unit with other
                  guests you know?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                  <RadioOption
                    id="sharing-yes"
                    name="condoSharingPreference"
                    value="yes"
                    selected={form.condoSharingPreference}
                    onChange={handleCondoSharingChange}
                  >
                    Yes
                  </RadioOption>
                  <RadioOption
                    id="sharing-no"
                    name="condoSharingPreference"
                    value="no"
                    selected={form.condoSharingPreference}
                    onChange={handleCondoSharingChange}
                  >
                    No
                  </RadioOption>
                  <RadioOption
                    id="sharing-notsure"
                    name="condoSharingPreference"
                    value="not_sure"
                    selected={form.condoSharingPreference}
                    onChange={handleCondoSharingChange}
                  >
                    Not sure
                  </RadioOption>
                </div>
                <FieldError message={errors.condoSharingPreference} />
              </div>
            </div>

            <CheckOption
              id="hotel"
              checked={form.interestedInNearbyHotel}
              onChange={(v) =>
                handleLodgingChange("interestedInNearbyHotel", v)
              }
            >
              I&apos;m interested in staying at a nearby hotel at a reduced
              group rate.
            </CheckOption>

            <CheckOption
              id="notSure"
              checked={form.lodgingInterestNotSure}
              onChange={(v) =>
                handleLodgingChange("lodgingInterestNotSure", v)
              }
            >
              I&apos;m not sure yet.
            </CheckOption>

            <FieldError message={errors.lodging} />
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="pt-2 space-y-4">
          {status === "error" && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">
              Something went wrong. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-bark text-cream py-3 text-xs tracking-[0.18em] uppercase hover:bg-bark/85 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            {status === "submitting" ? "Submitting…" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
