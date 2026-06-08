import "server-only";
import { db } from "./firebaseAdmin";
import { stripe } from "./stripe";
import { zonedDateTime, createCalendarEvent } from "./google";
import { resend, RESEND_FROM, OWNER_EMAIL } from "./resend";
import {
  RENTAL_DURATION_HOURS,
  RENTAL_PRICE_CENTS,
  formatEventDate,
  timeLabel,
  priceLabel,
  parseChairs,
  type Booking,
} from "./booking";

const DURATION_MS = RENTAL_DURATION_HOURS * 60 * 60 * 1000;

function bookingFromMetadata(
  sessionId: string,
  md: Record<string, string>,
  amount: number,
  currency: string
): Booking {
  return {
    sessionId,
    firstName: md.firstName ?? "",
    lastName: md.lastName ?? "",
    email: md.email ?? "",
    phone: md.phone ?? "",
    address: md.address ?? "",
    city: md.city ?? "",
    state: md.state ?? "",
    zip: md.zip ?? "",
    notes: md.notes ?? "",
    eventDate: md.eventDate ?? "",
    eventTime: md.eventTime ?? "",
    chairs: parseChairs(md.chairs),
    amountPaidCents: amount,
    currency,
    calendarEventId: null,
    createdAt: new Date().toISOString(),
  };
}

function ownerEmailHtml(b: Booking): string {
  const dateLabel = formatEventDate(b.eventDate) ?? b.eventDate;
  const tLabel = timeLabel(b.eventTime) ?? b.eventTime;
  const fullAddress = [b.address, b.city, b.state, b.zip]
    .filter(Boolean)
    .join(", ");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
    <h2 style="color:#a87a13">👑 New throne booking</h2>
    <p>A throne chair has been booked and paid for.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:6px 0;color:#666">Name</td><td style="padding:6px 0;font-weight:600">${b.firstName} ${b.lastName}</td></tr>
      <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0">${b.email}</td></tr>
      <tr><td style="padding:6px 0;color:#666">Phone</td><td style="padding:6px 0">${b.phone || "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#666">Chairs</td><td style="padding:6px 0;font-weight:600">${b.chairs}</td></tr>
      <tr><td style="padding:6px 0;color:#666">Event date</td><td style="padding:6px 0;font-weight:600">${dateLabel} at ${tLabel}</td></tr>
      <tr><td style="padding:6px 0;color:#666">Delivery address</td><td style="padding:6px 0">${fullAddress || "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#666">Setup notes</td><td style="padding:6px 0">${b.notes || "—"}</td></tr>
      <tr><td style="padding:6px 0;color:#666">Amount paid</td><td style="padding:6px 0;font-weight:600">${priceLabel(b.amountPaidCents)}</td></tr>
    </table>
    <p style="font-size:12px;color:#999;margin-top:24px">Stripe session: ${b.sessionId}</p>
  </div>`;
}

function customerEmailHtml(b: Booking): string {
  const dateLabel = formatEventDate(b.eventDate) ?? b.eventDate;
  const tLabel = timeLabel(b.eventTime) ?? b.eventTime;
  const fullAddress = [b.address, b.city, b.state, b.zip]
    .filter(Boolean)
    .join(", ");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
    <div style="text-align:center;padding:8px 0 16px">
      <h1 style="color:#a87a13;margin:0">👑 Your throne is booked!</h1>
    </div>
    <p>Hi ${b.firstName || "there"},</p>
    <p>Thank you for booking with <strong>ATL Thrones</strong>. Your white-and-gold
    throne ${b.chairs > 1 ? `chairs are` : `chair is`} reserved for your event — we'll
    deliver, set up, and collect ${b.chairs > 1 ? "them" : "it"} for you.</p>

    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px;border:1px solid #eee;border-radius:8px">
      <tr><td style="padding:10px 12px;color:#666;background:#faf7ef">Event date</td><td style="padding:10px 12px;font-weight:600">${dateLabel} at ${tLabel}</td></tr>
      <tr><td style="padding:10px 12px;color:#666;background:#faf7ef">Chairs</td><td style="padding:10px 12px">${b.chairs}</td></tr>
      <tr><td style="padding:10px 12px;color:#666;background:#faf7ef">Delivery address</td><td style="padding:10px 12px">${fullAddress || "—"}</td></tr>
      <tr><td style="padding:10px 12px;color:#666;background:#faf7ef">Total paid</td><td style="padding:10px 12px;font-weight:600">${priceLabel(b.amountPaidCents)}</td></tr>
    </table>

    <p style="margin-top:20px">We can't wait to make your celebration feel truly royal.
    If you have any questions, just reply to this email or reach us at
    <a href="mailto:contact@atlthronechairs.com" style="color:#a87a13">contact@atlthronechairs.com</a>.</p>

    <p style="margin-top:24px">— The ATL Thrones team</p>
    <p style="font-size:12px;color:#999;margin-top:24px">Confirmation #${b.sessionId}</p>
  </div>`;
}

/**
 * Verify a Stripe Checkout session was paid, then (idempotently) persist the
 * booking to Firestore, add it to Google Calendar, and email the owner.
 * Safe to call from both the Stripe webhook and the confirmation page — the
 * Firestore doc (keyed by session id) guards against double-fulfillment.
 * Returns the booking, or null if the session isn't paid.
 */
export async function fulfillBooking(
  sessionId: string
): Promise<Booking | null> {
  if (!sessionId) return null;

  const ref = db.collection("bookings").doc(sessionId);
  const existing = await ref.get();
  if (existing.exists) {
    // Already fulfilled — return the stored record (idempotent).
    return existing.data() as Booking;
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") return null;

  const booking = bookingFromMetadata(
    sessionId,
    (session.metadata ?? {}) as Record<string, string>,
    session.amount_total ?? RENTAL_PRICE_CENTS,
    (session.currency ?? "usd").toUpperCase()
  );

  // 1) Atomically claim this booking. The webhook and the thank-you page can
  // call fulfillBooking concurrently; create() fails if the doc already exists,
  // so exactly one caller proceeds to send emails / create the calendar event.
  try {
    await ref.create(booking);
  } catch (err) {
    // gRPC ALREADY_EXISTS (6) → another caller already claimed it.
    if ((err as { code?: number }).code === 6) {
      const snap = await ref.get();
      return (snap.data() as Booking) ?? booking;
    }
    throw err;
  }

  // 2) Google Calendar event
  try {
    const [h, m] = (booking.eventTime || "10:00").split(":").map(Number);
    const start = zonedDateTime(booking.eventDate, h, m);
    const end = new Date(start.getTime() + DURATION_MS);
    const location = [booking.address, booking.city, booking.state, booking.zip]
      .filter(Boolean)
      .join(", ");

    booking.calendarEventId = await createCalendarEvent({
      summary: `Throne rental (×${booking.chairs}) — ${booking.firstName} ${booking.lastName}`.trim(),
      description: `Throne chair rental.\nChairs: ${booking.chairs}\nContact: ${booking.email} ${booking.phone}\nNotes: ${booking.notes || "—"}\nPaid: ${priceLabel(booking.amountPaidCents)} (${booking.sessionId})`,
      location,
      start,
      end,
    });
    await ref.update({ calendarEventId: booking.calendarEventId });
  } catch (err) {
    console.error("calendar event creation failed", err);
  }

  const dateLabel = formatEventDate(booking.eventDate) ?? booking.eventDate;

  // 3) Notify the owner via Resend
  try {
    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: OWNER_EMAIL,
      subject: `New throne booking — ${booking.firstName} ${booking.lastName} (${dateLabel})`,
      html: ownerEmailHtml(booking),
    });
    if (error) throw error;
  } catch (err) {
    console.error("owner notification email failed", err);
  }

  // 4) Send the customer their order confirmation via Resend
  if (booking.email) {
    try {
      const { error } = await resend.emails.send({
        from: RESEND_FROM,
        to: booking.email,
        replyTo: OWNER_EMAIL,
        subject: `Your ATL Thrones booking is confirmed — ${dateLabel}`,
        html: customerEmailHtml(booking),
      });
      if (error) throw error;
    } catch (err) {
      console.error("customer confirmation email failed", err);
    }
  }

  return booking;
}
