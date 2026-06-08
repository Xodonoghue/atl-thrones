"use server";

import { headers } from "next/headers";
import { db } from "./firebaseAdmin";
import { stripe } from "./stripe";
import { zonedDateTime, getBusyIntervals } from "./google";
import {
  TIME_SLOTS,
  RENTAL_DURATION_HOURS,
  RENTAL_PRICE_CENTS,
  type SlotAvailability,
  type CheckoutInput,
} from "./booking";

const DURATION_MS = RENTAL_DURATION_HOURS * 60 * 60 * 1000;

// ── Lead capture (availability page) ────────────────────────────────
interface AvailabilityFormData {
  firstName: string;
  email: string;
  chairs: string;
}

export const saveLeadInfo = async (
  data: AvailabilityFormData
): Promise<void> => {
  await db.collection("leads").add({
    firstName: data.firstName ?? "",
    email: data.email ?? "",
    chairs: data.chairs ?? "1",
    createdAt: new Date().toISOString(),
  });
};

// ── Legacy rental-request capture (/info RentalForm) ────────────────
interface RentalFormData {
  firstName: string;
  lastName: string;
  email: string;
  zipcode: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}

export const createRental = async (data: RentalFormData): Promise<void> => {
  await db.collection("rentalRequests").add({
    ...data,
    createdAt: new Date().toISOString(),
  });
};

// ── Availability: check candidate slots against Google Calendar ─────
export const getAvailableSlots = async (
  dateISO: string
): Promise<SlotAvailability[]> => {
  const dayStart = zonedDateTime(dateISO, 0, 0);
  const dayEnd = zonedDateTime(dateISO, 23, 59);

  let busy: { start: string; end: string }[] = [];
  try {
    busy = await getBusyIntervals(dayStart, dayEnd);
  } catch (err) {
    console.error("freebusy query failed", err);
    // Fail safe: if we can't reach the calendar, treat the day as open
    // rather than blocking all bookings.
    busy = [];
  }

  const now = Date.now();

  return TIME_SLOTS.map((slot) => {
    const [h, m] = slot.value.split(":").map(Number);
    const start = zonedDateTime(dateISO, h, m);
    const end = new Date(start.getTime() + DURATION_MS);

    const overlaps = busy.some((b) => {
      const bs = new Date(b.start).getTime();
      const be = new Date(b.end).getTime();
      return bs < end.getTime() && be > start.getTime();
    });

    const inFuture = start.getTime() > now;
    return { ...slot, available: inFuture && !overlaps };
  });
};

// ── Stripe Checkout ─────────────────────────────────────────────────
async function getOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export const createCheckoutSession = async (
  data: CheckoutInput
): Promise<{ url: string | null }> => {
  const origin = await getOrigin();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: data.email || undefined,
    line_items: [
      {
        quantity: data.chairs,
        price_data: {
          currency: "usd",
          unit_amount: RENTAL_PRICE_CENTS,
          product: process.env.STRIPE_THRONE_RENTAL_PRODUCT_ID,
          tax_behavior: "inclusive",
        },
      },
    ],
    metadata: {
      firstName: data.firstName?.slice(0, 200) ?? "",
      lastName: data.lastName?.slice(0, 200) ?? "",
      email: data.email?.slice(0, 200) ?? "",
      phone: data.phone?.slice(0, 50) ?? "",
      address: data.address?.slice(0, 200) ?? "",
      city: data.city?.slice(0, 100) ?? "",
      state: data.state?.slice(0, 50) ?? "",
      zip: data.zip?.slice(0, 20) ?? "",
      notes: data.notes?.slice(0, 480) ?? "",
      eventDate: data.eventDate ?? "",
      eventTime: data.eventTime ?? "",
      chairs: String(data.chairs ?? 1),
    },
    success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?date=${encodeURIComponent(
      data.eventDate
    )}&time=${encodeURIComponent(data.eventTime)}&chairs=${data.chairs}`,
  });

  return { url: session.url };
};
