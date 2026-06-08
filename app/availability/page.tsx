import AvailabilityForm from "@/components/AvailabilityForm";
import Link from "next/link";

const steps = [
  {
    n: "1",
    h: "Tell us about your event",
    p: "Share your name, email, and confirm your delivery area below.",
  },
  {
    n: "2",
    h: "Pick your date",
    p: "Browse the calendar and choose an available day for your celebration.",
  },
  {
    n: "3",
    h: "Reserve in minutes",
    p: "Check out securely — no deposit required, free delivery & setup.",
  },
];

export default function Page() {
  return (
    <main className="bg-neutral-950 text-neutral-100">
      {/* ===== Hero ===== */}
      <section className="mx-auto max-w-3xl px-5 pt-20 pb-10 text-center sm:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-400">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M2 7l4 3 6-7 6 7 4-3-2 12H4L2 7z" />
          </svg>
          Check your date
        </span>

        <h1 className="mt-8 text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl">
          See if your date
          <br /> is available.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
          Tell us a little about your event and we&apos;ll show you the calendar.
          Reserving your throne takes just a couple of minutes.
        </p>
      </section>

      {/* ===== Steps ===== */}
      <section className="mx-auto max-w-5xl px-5 pb-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-white/10 bg-neutral-900 p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-sm font-bold text-gold-400">
                {s.n}
              </span>
              <h3 className="mt-4 font-bold text-white">{s.h}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                {s.p}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Form ===== */}
      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <AvailabilityForm />
      </section>

      {/* ===== Reassurance ===== */}
      <section className="mx-auto max-w-5xl px-5 pb-24">
        <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-neutral-900 px-6 py-8 text-center sm:flex-row sm:gap-10 sm:text-left">
          {[
            "Free delivery & setup",
            "No deposit required",
            "Sanitized & inspected",
          ].map((t) => (
            <div key={t} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold text-neutral-200">{t}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-neutral-500">
          Questions? <Link href="/info" className="text-gold-400 hover:text-gold-300">Learn more about how it works</Link>.
        </p>
      </section>
    </main>
  );
}
