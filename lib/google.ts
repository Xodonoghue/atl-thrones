import "server-only";
import { google } from "googleapis";

// Atlanta business timezone — used for all event scheduling.
export const TIMEZONE = "America/New_York";

/**
 * OAuth2 client authenticated via the long-lived refresh token. The client
 * id/secret are required to exchange the refresh token for access tokens.
 */
function oauthClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

export function calendarClient() {
  return google.calendar({ version: "v3", auth: oauthClient() });
}

// ── Timezone helpers ────────────────────────────────────────────────
// Convert a wall-clock time in a given IANA timezone to an absolute Date,
// without pulling in a date library. Good enough for scheduling (ignores
// the rare ambiguous instant during a DST transition).
function tzOffsetMs(instant: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(instant)
    .reduce<Record<string, number>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = Number(p.value);
      return acc;
    }, {});

  const asUTC = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour === 24 ? 0 : parts.hour,
    parts.minute,
    parts.second
  );
  return asUTC - instant.getTime();
}

/**
 * Build an absolute Date from a calendar date (YYYY-MM-DD), an hour and a
 * minute interpreted in `timeZone`.
 */
export function zonedDateTime(
  dateISO: string,
  hour: number,
  minute: number,
  timeZone: string = TIMEZONE
): Date {
  const [y, m, d] = dateISO.split("-").map(Number);
  const utcGuess = Date.UTC(y, m - 1, d, hour, minute, 0);
  const offset = tzOffsetMs(new Date(utcGuess), timeZone);
  return new Date(utcGuess - offset);
}

// ── Calendar / Gmail actions ────────────────────────────────────────

/** Busy intervals on the primary calendar within [timeMin, timeMax]. */
export async function getBusyIntervals(
  timeMin: Date,
  timeMax: Date
): Promise<{ start: string; end: string }[]> {
  const cal = calendarClient();
  const res = await cal.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: TIMEZONE,
      items: [{ id: "primary" }],
    },
  });
  return (res.data.calendars?.primary?.busy ?? []).map((b) => ({
    start: b.start as string,
    end: b.end as string,
  }));
}

/**
 * Create an event on the primary calendar. Returns the event id.
 * Internal-only: no attendees are added so customers don't receive invites.
 */
export async function createCalendarEvent(opts: {
  summary: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}): Promise<string | null> {
  const cal = calendarClient();
  const res = await cal.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: opts.summary,
      description: opts.description,
      location: opts.location,
      start: { dateTime: opts.start.toISOString(), timeZone: TIMEZONE },
      end: { dateTime: opts.end.toISOString(), timeZone: TIMEZONE },
    },
  });
  return res.data.id ?? null;
}
