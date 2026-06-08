"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAvailableSlots } from "@/lib/action";
import {
  priceLabel,
  slotWindowLabel,
  parseChairs,
  RENTAL_DURATION_HOURS,
  RENTAL_PRICE_CENTS,
  type SlotAvailability,
} from "@/lib/booking";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type DayCell = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isPast: boolean;
};

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function BookingCalendar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chairs = parseChairs(searchParams.get("chairs"));
  const firstName = searchParams.get("firstName") ?? "";
  const email = searchParams.get("email") ?? "";
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<Date | null>(null);

  const [slots, setSlots] = useState<SlotAvailability[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Fetch availability whenever a date is chosen.
  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    setLoadingSlots(true);
    setSlotError(false);
    setSelectedTime(null);
    setSlots([]);

    getAvailableSlots(toISODate(selected))
      .then((res) => {
        if (!cancelled) setSlots(res);
      })
      .catch(() => {
        if (!cancelled) setSlotError(true);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selected]);

  const cells: DayCell[] = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startOffset = first.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const result: DayCell[] = [];

    for (let i = 0; i < startOffset; i++) {
      const date = new Date(viewYear, viewMonth, i - startOffset + 1);
      result.push({ date, day: date.getDate(), isCurrentMonth: false, isPast: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d);
      result.push({ date, day: d, isCurrentMonth: true, isPast: date < today });
    }
    while (result.length % 7 !== 0) {
      const last = result[result.length - 1].date;
      const date = new Date(last);
      date.setDate(date.getDate() + 1);
      result.push({ date, day: date.getDate(), isCurrentMonth: false, isPast: false });
    }
    return result;
  }, [viewYear, viewMonth, today]);

  const goPrev = () => {
    setSelected(null);
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const goNext = () => {
    setSelected(null);
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const atCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const handleSelect = (cell: DayCell) => {
    if (!cell.isCurrentMonth || cell.isPast) return;
    setSelected(cell.date);
  };

  const proceed = () => {
    if (!selected || !selectedTime) return;
    const params = new URLSearchParams({
      date: toISODate(selected),
      time: selectedTime,
      chairs: String(chairs),
    });
    if (firstName) params.set("firstName", firstName);
    if (email) params.set("email", email);
    router.push(`/checkout?${params.toString()}`);
  };

  const totalCents = RENTAL_PRICE_CENTS * chairs;

  const selectedLabel = selected
    ? selected.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const anyAvailable = slots.some((s) => s.available);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {/* ── Calendar card ── */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <button
            type="button"
            onClick={goPrev}
            disabled={atCurrentMonth}
            aria-label="Previous month"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-neutral-300 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M12.7 4.3a1 1 0 010 1.4L8.4 10l4.3 4.3a1 1 0 11-1.4 1.4l-5-5a1 1 0 010-1.4l5-5a1 1 0 011.4 0z" />
            </svg>
          </button>
          <h2 className="text-lg font-bold text-white">
            {MONTHS[viewMonth]} {viewYear}
          </h2>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next month"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-neutral-300 transition-colors hover:bg-white/10"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M7.3 4.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 11-1.4-1.4l4.3-4.3-4.3-4.3a1 1 0 010-1.4z" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 px-4 pt-4 text-center">
          {WEEKDAYS.map((d) => (
            <span key={d} className="pb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5 p-4 pt-1">
          {cells.map((cell, i) => {
            const isSelected = isSameDay(cell.date, selected);
            const isToday = isSameDay(cell.date, today);
            if (!cell.isCurrentMonth) return <div key={i} aria-hidden className="aspect-square" />;
            const disabled = cell.isPast;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(cell)}
                disabled={disabled}
                aria-pressed={isSelected}
                className={[
                  "relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-semibold transition-all",
                  isSelected
                    ? "bg-gradient-to-br from-gold-400 to-gold-600 text-neutral-950 shadow-lg"
                    : disabled
                    ? "cursor-not-allowed text-neutral-700"
                    : "border border-white/10 bg-neutral-950 text-neutral-200 hover:border-gold-500/50 hover:text-white",
                  isToday && !isSelected ? "ring-1 ring-gold-500/40" : "",
                ].join(" ")}
              >
                {cell.day}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 px-6 py-4 text-xs text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold-500" /> Selectable
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full ring-1 ring-gold-500/60" /> Today
          </span>
          <span className="text-neutral-500">Pick a date, then choose a time.</span>
        </div>
      </div>

      {/* ── Selection summary card ── */}
      <div className="flex flex-col rounded-2xl border border-white/10 bg-neutral-900 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Your selection
        </h3>

        {!selected ? (
          <div className="mt-5 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 px-4 py-12 text-center">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-neutral-700" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <rect x="3" y="4.5" width="18" height="16" rx="2" />
              <path d="M3 9h18M8 2.5v4M16 2.5v4" />
            </svg>
            <p className="mt-4 text-sm text-neutral-400">
              Select a date to see available delivery times.
            </p>
          </div>
        ) : (
          <div className="mt-5 flex-1">
            <p className="font-bold text-white">{selectedLabel}</p>

            {/* Time slots */}
            <div className="mt-4">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Delivery time
                </p>
                <span className="text-xs text-neutral-500">
                  {RENTAL_DURATION_HOURS}-hour window
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-400">
                Every rental includes the throne for a {RENTAL_DURATION_HOURS}-hour
                window from your chosen start time.
              </p>

              {loadingSlots ? (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-10 animate-pulse rounded-lg bg-neutral-800" />
                  ))}
                </div>
              ) : slotError ? (
                <p className="mt-3 text-sm text-red-400">
                  Couldn&apos;t load availability. Please try another date.
                </p>
              ) : !anyAvailable ? (
                <p className="mt-3 rounded-lg border border-white/10 bg-neutral-950/60 p-3 text-sm text-neutral-400">
                  Fully booked on this date. Please choose another day.
                </p>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {slots.map((s) => {
                    const active = selectedTime === s.value;
                    return (
                      <button
                        key={s.value}
                        type="button"
                        disabled={!s.available}
                        onClick={() => setSelectedTime(s.value)}
                        className={[
                          "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all",
                          active
                            ? "border-transparent bg-gradient-to-br from-gold-400 to-gold-600 text-neutral-950"
                            : s.available
                            ? "border-white/10 bg-neutral-950 text-neutral-200 hover:border-gold-500/50"
                            : "cursor-not-allowed border-white/5 bg-neutral-950/40 text-neutral-700 line-through",
                        ].join(" ")}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Selected delivery window */}
            {selectedTime && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-gold-500/20 bg-gold-500/10 p-4">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gold-400" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gold-400/90">
                    Your {RENTAL_DURATION_HOURS}-hour window
                  </p>
                  <p className="font-bold text-white">
                    {slotWindowLabel(selectedTime)}
                  </p>
                </div>
              </div>
            )}

            {/* Pricing (only once a time is picked) */}
            {selectedTime && (
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-neutral-400">
                    Throne chair (1 day) × {chairs}
                  </dt>
                  <dd className="font-semibold text-white">{priceLabel(totalCents)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-neutral-400">Delivery &amp; setup</dt>
                  <dd className="font-semibold text-gold-400">Free</dd>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <dt className="font-semibold text-white">Due at checkout</dt>
                  <dd className="text-lg font-extrabold text-white">{priceLabel(totalCents)}</dd>
                </div>
              </dl>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={proceed}
          disabled={!selected || !selectedTime}
          className="btn-gold mt-6 w-full rounded-xl px-7 py-3.5 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          Proceed to checkout →
        </button>
        <p className="mt-3 text-center text-xs text-neutral-500">
          No deposit required — pay securely at checkout.
        </p>
      </div>
    </div>
  );
}
