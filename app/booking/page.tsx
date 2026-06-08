import { Suspense } from "react";
import BookingCalendar from "@/components/BookingCalendar";

export default function Page() {
  return (
    <main className="bg-neutral-950 text-neutral-100">
      <section className="mx-auto max-w-5xl px-5 pt-20 pb-10 text-center sm:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-400">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M2 7l4 3 6-7 6 7 4-3-2 12H4L2 7z" />
          </svg>
          Step 2 of 3
        </span>

        <h1 className="mt-8 text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-5xl">
          Choose your event date.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-400">
          Tap an available day below to reserve your throne. Booked dates are
          greyed out.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24">
        <Suspense fallback={null}>
          <BookingCalendar />
        </Suspense>
      </section>
    </main>
  );
}
