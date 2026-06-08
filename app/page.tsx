import React from "react";
import Link from "next/link";

const occasions = [
  "Fulton",
  "Cobb",
  "Gwinnett",
  "Dekalb",
  "Clayton",
  "Fayette",
  "Forsyth",
  "Cherokee"
];

const features = [
  {
    title: "Free delivery & setup.",
    body: "We deliver, place, and collect your throne for free across metro Atlanta — you don't lift a thing.",
    image: "/thrones/throne-white.jpg",
  },
  {
    title: "Booked in minutes.",
    body: "Check a date, reserve online, and we'll handle the rest. No deposits, no hassle.",
    image: "/thrones/throne-gold.jpg",
  },
];

const testimonials = [
  {
    quote:
      "The throne was the centerpiece of my daughter's quinceañera. It arrived early, setup was effortless, and every photo looked absolutely regal.",
    name: "Marisol R.",
    role: "Quinceañera · Marietta",
  },
  {
    quote:
      "Booked it for our wedding and it exceeded every expectation. Spotless, gorgeous, and the delivery team was so professional. Worth every penny.",
    name: "Jordan & Tia",
    role: "Wedding · Atlanta",
  },
];

export default function Home() {
  return (
    <main className="bg-neutral-950 text-neutral-100">
      {/* ===== Hero ===== */}
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-12 sm:pt-28">
        <div className="text-center">
          <Link
            href="/availability"
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-400"
          >
            Atlanta&apos;s #1 throne chair rental
            <span aria-hidden>→</span>
          </Link>

          <h1 className="mt-8 text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl">
            Make Any Celebration
            <br /> Extra Special.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
            ATL Thrones elevates your event with luxury white-and-gold throne
            chair rentals — featuring hassle-free delivery and unforgettable
            style.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="/availability"
              className="btn-gold rounded-xl px-7 py-3.5 text-base font-semibold"
            >
              Check availability
            </Link>
            <p className="text-sm text-neutral-400">
              Free delivery &amp; setup — no deposit required.
            </p>
          </div>

          {/* Image below the CTA, in its original aspect ratio */}
          <div className="mx-auto mt-12 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]">
            <img
              src="/thrones/throne-white.jpg"
              alt="White and gold throne chair styled at an Atlanta event"
              className="aspect-[5/3] w-full object-cover object-[90%_100%]"
            />
          </div>
        </div>
      </section>

      {/* ===== Occasion band ===== */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-2xl bg-neutral-900 px-6 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            We deliver all over the grater atlanta area
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {occasions.map((o) => (
              <span
                key={o}
                className="text-lg font-semibold text-neutral-500 transition-colors hover:text-neutral-200"
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Feature section ===== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Everything your event needs.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
            From the perfect chair to white-glove delivery, we handle every detail.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
            >
              <img
                src={f.image}
                alt={f.title}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-7">
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Image feature row ===== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Make it unforgettable.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
            A throne chair is more than a seat — it&apos;s the moment everyone
            remembers and photographs.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg">
            <img
              src="/thrones/throne-gold.jpg"
              alt="Throne chair at a rooftop birthday celebration"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <ul className="space-y-7">
              {[
                {
                  h: "Built for the spotlight.",
                  p: "Tall, ornate, and finished in gold — designed to anchor your backdrop and steal every photo.",
                },
                {
                  h: "Delivered on your schedule.",
                  p: "Tell us when and where. We arrive on time, set up, and return after your event.",
                },
                {
                  h: "Serving all of metro Atlanta.",
                  p: "Free delivery throughout Fulton, DeKalb, Cobb, Gwinnett, Clayton, Fayette & Cherokee.",
                },
              ].map((item) => (
                <li key={item.h} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                      <path d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{item.h}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-neutral-400">
                      {item.p}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-white/10 bg-neutral-900 p-8"
            >
              <blockquote className="text-lg leading-relaxed text-neutral-200">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-neutral-400">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===== Gold accent block ===== */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 px-6 py-20 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/10 text-neutral-950">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
              <path d="M2 7l4 3 6-7 6 7 4-3-2 12H4L2 7z" />
            </svg>
          </span>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl">
            Reserved just for you.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-neutral-900/80">
            Once your date is booked, your throne is held exclusively for your
            event — sanitized, set up, and ready to impress.
          </p>
          <Link
            href="/availability"
            className="mt-8 inline-block rounded-xl bg-neutral-950 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            Check your date
          </Link>
        </div>
      </section>

      {/* ===== Footer CTA ===== */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h2 className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Ready to add the perfect touch?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-neutral-400">
          See if your date is available and reserve your throne in minutes.
        </p>
        <Link
          href="/availability"
          className="btn-gold mt-8 inline-block rounded-xl px-8 py-4 text-base font-semibold"
        >
          Check availability
        </Link>
        <p className="mt-3 text-sm text-neutral-400">
          Free delivery &amp; setup — no deposit required.
        </p>
      </section>

      {/* ===== Footer bar ===== */}
      <footer className="border-t border-white/10 bg-neutral-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold-400" fill="currentColor" aria-hidden>
              <path d="M2 7l4 3 6-7 6 7 4-3-2 12H4L2 7z" />
            </svg>
            <span className="text-[15px] font-extrabold tracking-tight text-white">
              ATL THRONES
            </span>
          </div>
          <nav className="flex items-center gap-7 text-sm text-neutral-400">
            <Link href="/info" className="transition-colors hover:text-white">
              About
            </Link>
            <Link href="/availability" className="transition-colors hover:text-white">
              Availability
            </Link>
            <Link href="/booking" className="transition-colors hover:text-white">
              Book
            </Link>
          </nav>
          <p className="text-sm text-neutral-400">
            © 2025 ATL Throne Chairs.
          </p>
        </div>
      </footer>
    </main>
  );
}
