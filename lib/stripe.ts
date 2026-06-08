import "server-only";
import Stripe from "stripe";

if (!process.env.STRIPE_SK) {
  // Surface misconfiguration early rather than failing deep in a request.
  console.warn("STRIPE_SK is not set — Stripe calls will fail.");
}

export const stripe = new Stripe(process.env.STRIPE_SK ?? "", {
  apiVersion: "2026-05-27.dahlia",
});
