// Shared, framework-agnostic booking config & helpers (safe on client & server).

export const RENTAL_PRICE_CENTS = 19900; // $199.00 per chair
export const RENTAL_DURATION_HOURS = 6;
export const ALLOWED_CHAIR_COUNTS = [1, 2] as const;
export const MAX_CHAIRS = 2;

/** Normalize any incoming chair-count value to a supported quantity (1 or 2). */
export function parseChairs(value?: string | number | null): number {
  return Number(value) === 2 ? 2 : 1;
}

export type TimeSlot = { value: string; label: string };

// Candidate delivery start times (24h "HH:MM" in America/New_York).
export const TIME_SLOTS: TimeSlot[] = [
  { value: "10:00", label: "10:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "18:00", label: "6:00 PM" },
];

export type SlotAvailability = TimeSlot & { available: boolean };

export type CheckoutInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
  eventDate: string; // YYYY-MM-DD
  eventTime: string; // HH:MM
  chairs: number;
};

export type Booking = CheckoutInput & {
  sessionId: string;
  amountPaidCents: number;
  currency: string;
  calendarEventId: string | null;
  createdAt: string; // ISO
};

export function priceLabel(cents: number = RENTAL_PRICE_CENTS): string {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  })}`;
}

export function timeLabel(value?: string): string | null {
  if (!value) return null;
  return TIME_SLOTS.find((s) => s.value === value)?.label ?? value;
}

export function formatEventDate(iso?: string): string | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function minutesToLabel(totalMinutes: number): string {
  const mins = ((totalMinutes % 1440) + 1440) % 1440; // wrap past midnight
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

/**
 * The full delivery window for a slot, e.g. "2:00 PM – 8:00 PM"
 * (start time through start + the standard rental duration).
 */
export function slotWindowLabel(value?: string): string | null {
  if (!value) return null;
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  const start = h * 60 + m;
  const end = start + RENTAL_DURATION_HOURS * 60;
  return `${minutesToLabel(start)} – ${minutesToLabel(end)}`;
}
