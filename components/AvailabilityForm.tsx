"use client";
import React, { FormEvent } from "react";
import { saveLeadInfo } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function AvailabilityForm() {
  const router = useRouter();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = (formData.get("firstName") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const chairs = (formData.get("chairs") as string) ?? "1";
    saveLeadInfo({ firstName, email, chairs });
    const params = new URLSearchParams({ chairs, firstName, email });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
    >
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-neutral-900 to-gold-600/10 px-8 py-7">
        <h2 className="text-xl font-bold text-white">Check availability</h2>
        <p className="mt-1.5 text-sm text-neutral-400">
          Fill out the info below to see if a chair is available for your event
          date.
        </p>
      </div>

      <div className="flex flex-col gap-6 px-8 py-8">
        {/* Name + email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1.5 block text-sm font-medium text-neutral-300"
            >
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              placeholder="Jane"
              className="w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-white placeholder:text-neutral-600 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-neutral-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-white placeholder:text-neutral-600 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
            />
          </div>
        </div>

        {/* Number of chairs */}
        <div>
          <label
            htmlFor="chairs"
            className="mb-1.5 block text-sm font-medium text-neutral-300"
          >
            How many chairs do you need?
          </label>
          <select
            id="chairs"
            name="chairs"
            defaultValue="1"
            className="w-full appearance-none rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-white focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-neutral-950/60 p-4 transition-colors hover:border-gold-500/30">
            <input
              type="checkbox"
              name="check1"
              value="true"
              className="mt-0.5 h-4 w-4 shrink-0 accent-gold-500"
            />
            <span className="text-sm leading-relaxed text-neutral-300">
              My event is in one of the following counties: Cobb, Fulton, DeKalb,
              Fayette, Clayton, Gwinnett or Cherokee.
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-neutral-950/60 p-4 transition-colors hover:border-gold-500/30">
            <input
              type="checkbox"
              name="check2"
              value="true"
              className="mt-0.5 h-4 w-4 shrink-0 accent-gold-500"
            />
            <span className="text-sm leading-relaxed text-neutral-300">
              I understand the only chair color available is white with gold
              trim.
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-gold mt-1 w-full rounded-xl px-7 py-3.5 text-base font-semibold"
        >
          Check availability →
        </button>
        <p className="text-center text-xs text-neutral-500">
          Free delivery &amp; setup — no deposit required.
        </p>
      </div>
    </form>
  );
}
