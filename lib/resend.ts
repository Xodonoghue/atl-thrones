import "server-only";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set — emails will fail.");
}

export const resend = new Resend(process.env.RESEND_API_KEY ?? "");

// The "from" address must be on a domain you've verified in Resend.
// Override via RESEND_FROM if your verified domain/sender differs.
export const RESEND_FROM =
  process.env.RESEND_FROM ?? "ATL Thrones <bookings@atlthronechairs.com>";

// Where owner/admin booking notifications are sent.
export const OWNER_EMAIL = "xodonoghue@gmail.com";
