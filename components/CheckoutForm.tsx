"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createCheckoutSession } from "@/lib/action";
import {
  priceLabel,
  timeLabel,
  formatEventDate,
  parseChairs,
  RENTAL_PRICE_CENTS,
  type CheckoutInput,
} from "@/lib/booking";

export default function CheckoutForm({
  date,
  time,
  chairs: chairsParam,
  firstName,
  email,
}: {
  date?: string;
  time?: string;
  chairs?: string;
  firstName?: string;
  email?: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eventDate = formatEventDate(date);
  const eventTime = timeLabel(time);
  const hasSlot = Boolean(date && time);
  const chairs = parseChairs(chairsParam);
  const totalCents = RENTAL_PRICE_CENTS * chairs;

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-white placeholder:text-neutral-600 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/30";
  const labelClass = "mb-1.5 block text-sm font-medium text-neutral-300";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasSlot || submitting) return;
    setError(null);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const data: CheckoutInput = {
      firstName: (fd.get("firstName") as string) ?? "",
      lastName: (fd.get("lastName") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      phone: (fd.get("phone") as string) ?? "",
      address: (fd.get("address") as string) ?? "",
      city: (fd.get("city") as string) ?? "",
      state: (fd.get("state") as string) ?? "",
      zip: (fd.get("zip") as string) ?? "",
      notes: (fd.get("notes") as string) ?? "",
      eventDate: date as string,
      eventTime: time as string,
      chairs,
    };

    try {
      const { url } = await createCheckoutSession(data);
      if (url) {
        window.location.href = url;
      } else {
        setError("Couldn't start checkout. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setError("Something went wrong starting checkout. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* ── Left: details form ── */}
      <form
        id="checkout-form"
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
      >
        <div className="border-b border-white/10 px-7 pb-7 pt-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Contact
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={labelClass}>First name</label>
              <input id="firstName" name="firstName" required defaultValue={firstName} placeholder="Jane" className={inputClass} />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>Last name</label>
              <input id="lastName" name="lastName" required placeholder="Doe" className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" name="email" type="email" required defaultValue={email} placeholder="you@example.com" className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="(404) 555-0199" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="px-7 pb-7 pt-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Delivery address
          </p>
          <div className="mt-5 grid gap-4">
            <div>
              <label htmlFor="address" className={labelClass}>Street address</label>
              <input id="address" name="address" required placeholder="123 Peachtree St NE" className={inputClass} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="city" className={labelClass}>City</label>
                <input id="city" name="city" required placeholder="Atlanta" className={inputClass} />
              </div>
              <div>
                <label htmlFor="state" className={labelClass}>State</label>
                <input id="state" name="state" defaultValue="GA" className={inputClass} />
              </div>
              <div>
                <label htmlFor="zip" className={labelClass}>ZIP</label>
                <input id="zip" name="zip" required placeholder="30303" className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="notes" className={labelClass}>
                Setup notes <span className="text-neutral-500">(optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Gate code, where to place the throne, best time to arrive…"
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-7 py-6 lg:hidden">
          <SubmitButton
            submitting={submitting}
            disabled={!hasSlot}
            totalCents={totalCents}
          />
        </div>
      </form>

      {/* ── Right: order summary ── */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
          <img
            src="/thrones/throne-white.jpg"
            alt="White and gold throne chair"
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Order summary
            </h2>

            <div className="mt-4 rounded-xl border border-white/10 bg-neutral-950/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Event date &amp; time
              </p>
              {hasSlot ? (
                <p className="mt-1 font-bold text-white">
                  {eventDate}
                  <span className="block text-sm font-medium text-neutral-400">
                    Delivery at {eventTime}
                  </span>
                </p>
              ) : (
                <p className="mt-1 text-sm text-neutral-400">
                  No date selected.{" "}
                  <Link href="/booking" className="text-gold-400 hover:text-gold-300">
                    Pick a date &amp; time
                  </Link>
                </p>
              )}
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-neutral-300">
                  White-and-gold throne (1 day) × {chairs}
                </dt>
                <dd className="font-semibold text-white">{priceLabel(totalCents)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-neutral-300">Delivery &amp; setup</dt>
                <dd className="font-semibold text-gold-400">Free</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-neutral-300">Pickup</dt>
                <dd className="font-semibold text-gold-400">Free</dd>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <dt className="font-bold text-white">Total due</dt>
                <dd className="text-xl font-extrabold text-white">{priceLabel(totalCents)}</dd>
              </div>
            </dl>

            {error && (
              <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <div className="mt-6 hidden lg:block">
              <SubmitButton
                submitting={submitting}
                disabled={!hasSlot}
                totalCents={totalCents}
              />
            </div>

            <ul className="mt-5 space-y-2 text-xs text-neutral-500">
              {[
                "Secure checkout powered by Stripe",
                "Free cancellation up to 7 days before",
                "Sanitized & inspected before delivery",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-gold-400" fill="currentColor" aria-hidden>
                    <path d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-neutral-500">
          Need a different day?{" "}
          <Link href="/booking" className="text-gold-400 hover:text-gold-300">
            Back to calendar
          </Link>
        </p>
      </aside>
    </div>
  );
}

function SubmitButton({
  submitting,
  disabled,
  totalCents,
}: {
  submitting: boolean;
  disabled: boolean;
  totalCents: number;
}) {
  return (
    <button
      type="submit"
      form="checkout-form"
      disabled={submitting || disabled}
      className="btn-gold w-full rounded-xl px-7 py-3.5 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-40"
    >
      {submitting
        ? "Redirecting to payment…"
        : `Pay ${priceLabel(totalCents)} & confirm`}
    </button>
  );
}
