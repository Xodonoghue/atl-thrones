# CLAUDE.md

Guidance for working in the **ATL Thrones** codebase.

> Project rules live in `.claude/rules/` (auto-loaded every session). Currently:
> never read `.env`, and don't undo manual code edits unless asked.

## What this is

A marketing + booking site for a luxury throne-chair rental business serving metro
Atlanta (Fulton, DeKalb, Cobb, Gwinnett, Clayton, Fayette, Cherokee counties). Visitors
check availability, pick a date/time, pay via Stripe, and receive a confirmation. The
owner gets notified and a Google Calendar event is created.

Single product: a white-and-gold throne chair, **$199.00/chair** (`RENTAL_PRICE_CENTS`),
**1 or 2 chairs max**, **6-hour rental window** (`RENTAL_DURATION_HOURS`). Free delivery &
setup, no deposit.

## Stack

- **Next.js 15.2** (App Router) + **React 18** + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `app/globals.css`, no `tailwind.config`)
- **Stripe** (Checkout + webhooks), **Firebase Admin / Firestore**, **Google Calendar**
  (googleapis, refresh-token OAuth), **Resend** (transactional email)
- Path alias `@/*` → repo root. Fonts: Geist via `next/font`.

## Commands

```bash
npm run dev     # dev server (localhost:3000)
npm run build   # production build
npm run start   # serve production build
npm run lint    # next lint
```

There is no test suite. To verify Stripe webhooks locally, forward events with the Stripe
CLI to `/api/webhooks/stripe`.

## Booking flow (the core of the app)

1. `/` (`app/page.tsx`) — marketing landing, CTAs link to `/availability`.
2. `/availability` — `AvailabilityForm` captures name/email/chairs, saves a **lead** to
   Firestore (`saveLeadInfo`), then routes to `/booking?chairs=&firstName=&email=`.
3. `/booking` — `BookingCalendar` (client). Picks a date, calls `getAvailableSlots(dateISO)`
   which checks `TIME_SLOTS` against Google Calendar free/busy. Routes to
   `/checkout?date=&time=&chairs=&firstName=&email=`.
4. `/checkout` — `CheckoutForm` collects contact + delivery address, calls
   `createCheckoutSession`, redirects to Stripe Checkout. All booking data is stuffed into
   Stripe session **metadata** (there is no pending-order record before payment).
5. Stripe → `/thank-you?session_id=...` on success. The page calls `fulfillBooking`.
6. `/api/webhooks/stripe` also calls `fulfillBooking` on
   `checkout.session.completed` / `async_payment_succeeded`.

**Idempotency:** `fulfillBooking` (`lib/fulfillment.ts`) is called from BOTH the thank-you
page and the webhook, possibly concurrently. It uses a Firestore doc in `bookings` keyed by
the Stripe `sessionId` and `ref.create()` (which throws gRPC `ALREADY_EXISTS` code 6) to
ensure exactly one caller proceeds to create the calendar event and send emails. Always
preserve this guard when editing fulfillment.

## Key modules

- `lib/booking.ts` — **client-safe** shared config & formatters (prices, time slots, label
  helpers, `CheckoutInput`/`Booking` types). No server-only imports — safe to import anywhere.
- `lib/action.ts` — `"use server"` actions: `saveLeadInfo`, `createRental` (legacy),
  `getAvailableSlots`, `createCheckoutSession`.
- `lib/fulfillment.ts` — `fulfillBooking` + email HTML templates. Server-only.
- `lib/google.ts` — Calendar client + timezone helpers. `zonedDateTime()` converts a
  wall-clock Atlanta time to an absolute `Date` without a date library. `TIMEZONE = "America/New_York"`.
- `lib/stripe.ts`, `lib/firebaseAdmin.ts`, `lib/resend.ts` — singletons, all start with
  `import "server-only"`. Firebase project id `atl-thrones` is hardcoded; owner email
  `xodonoghue@gmail.com` is hardcoded in `lib/resend.ts`.
- `config/firebase.ts` — client-side Firebase config (analytics only; not used by booking).

## Firestore collections

- `leads` — availability-form captures (firstName, email, chairs, createdAt)
- `rentalRequests` — legacy `/info` RentalForm submissions
- `bookings` — fulfilled paid bookings, doc id = Stripe session id (idempotency key)

## Environment variables

Live in `.env` (gitignored). **Do not read `.env`** — ask the user if you need a value.
Names (see also the auto-memory):

- Stripe: `STRIPE_PK`, `STRIPE_SK`, `STRIPE_THRONE_RENTAL_PRODUCT_ID`, `STRIPE_WHS` (webhook secret)
- Google: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` (Calendar only)
- Firebase: `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (newlines escaped as `\n`)
- Resend: `RESEND_API_KEY`; optional `RESEND_FROM` (must be a Resend-verified domain)

Server modules log a warning rather than crash when their key is missing.

## Conventions

- **Server-only modules** start with `import "server-only"`; keep secrets out of anything a
  client component imports. `lib/booking.ts` is the shared boundary.
- **Styling**: dark theme (`bg-neutral-950`, `text-neutral-100`) with a gold accent palette
  (`gold-50/100/400/500/600`, defined in `globals.css`). Reuse the `.btn-gold` CSS class for
  primary CTAs. Pages share a layout idiom: badge pill → big `font-extrabold tracking-tight`
  heading → `max-w-*` centered copy.
- Money is always handled in **integer cents**; format with `priceLabel()`.
- Dates passed around as `YYYY-MM-DD` strings; times as 24h `"HH:MM"`. Use the helpers in
  `lib/booking.ts` (`formatEventDate`, `timeLabel`, `slotWindowLabel`) for display.

## Legacy / cleanup notes

- `/info` page + `components/RentalForm.tsx` + `createRental` action are an older,
  off-theme (indigo) flow superseded by the `/availability → /booking → /checkout` funnel.
  The footer/header still link to `/info` as "About".
- `git status` shows `components/Calendar.tsx`, `lib/models.ts`, `lib/utils.ts` deleted and
  much of the booking pipeline (`lib/booking.ts`, `lib/stripe.ts`, `app/api/`, `app/checkout/`,
  etc.) as untracked — the Stripe/Resend booking system is a large in-progress change not yet
  committed. MongoDB was removed from the project.
