import Link from "next/link";
import { fulfillBooking } from "@/lib/fulfillment";
import { formatEventDate, timeLabel, priceLabel } from "@/lib/booking";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let booking = null;
  let failed = false;
  if (session_id) {
    try {
      booking = await fulfillBooking(session_id);
    } catch (err) {
      console.error("fulfillBooking failed", err);
      failed = true;
    }
  }

  const paid = Boolean(booking);

  return (
    <main className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-neutral-950">
          {paid ? (
            <svg viewBox="0 0 20 20" className="h-8 w-8" fill="currentColor" aria-hidden>
              <path d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden>
              <path d="M2 7l4 3 6-7 6 7 4-3-2 12H4L2 7z" />
            </svg>
          )}
        </span>

        {paid && booking ? (
          <>
            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Your throne is booked!
            </h1>
            <p className="mt-4 max-w-md text-lg text-neutral-400">
              Thanks, {booking.firstName}. A confirmation is on its way and your
              throne is reserved exclusively for your event.
            </p>

            <div className="mt-10 w-full rounded-2xl border border-white/10 bg-neutral-900 p-6 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Booking details
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="Event date">
                  {formatEventDate(booking.eventDate)}
                  {booking.eventTime ? ` · ${timeLabel(booking.eventTime)}` : ""}
                </Row>
                <Row label="Chairs">{booking.chairs}</Row>
                <Row label="Delivery to">
                  {[booking.address, booking.city, booking.state, booking.zip]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </Row>
                <Row label="Contact">{booking.email}</Row>
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <dt className="font-semibold text-white">Paid</dt>
                  <dd className="text-lg font-extrabold text-white">
                    {priceLabel(booking.amountPaidCents)}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        ) : (
          <>
            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {failed ? "Something went wrong" : "Payment not confirmed"}
            </h1>
            <p className="mt-4 max-w-md text-lg text-neutral-400">
              {failed
                ? "We couldn't confirm your booking. If you were charged, please reach out to contact@atlthronechairs.com and we'll sort it out right away."
                : "We couldn't find a completed payment for this session. If you didn't finish checking out, you can pick your date again."}
            </p>
          </>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-gold rounded-xl px-7 py-3.5 text-base font-semibold">
            Back to home
          </Link>
          {!paid && (
            <Link
              href="/booking"
              className="rounded-xl border border-white/10 px-7 py-3.5 text-base font-semibold text-neutral-200 transition-colors hover:bg-white/10"
            >
              Choose a date
            </Link>
          )}
        </div>

        <p className="mt-8 text-sm text-neutral-500">
          Questions? Email{" "}
          <a href="mailto:contact@atlthronechairs.com" className="text-gold-400 hover:text-gold-300">
            contact@atlthronechairs.com
          </a>
        </p>
      </section>
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-neutral-400">{label}</dt>
      <dd className="text-right font-medium text-white">{children}</dd>
    </div>
  );
}
