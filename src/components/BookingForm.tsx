"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useContent } from "./LocaleProvider";
import { formatUzPhone } from "@/lib/phone";
import { submitLead } from "@/lib/lead";
import type { LeadSource } from "@/lib/analytics";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { btn } from "@/lib/ui";

export function BookingFormFields({
  tone = "light",
  source = "booking-modal",
}: {
  tone?: "light" | "dark";
  source?: LeadSource;
}) {
  const site = useContent();
  const { bookingForm, services } = site;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [service, setService] = useState("any");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [submitted, setSubmitted] = useState(false);

  const dark = tone === "dark";
  const labelColor = dark ? "text-paper/60" : "text-ink/60";
  const inputCls = dark
    ? "border-paper/25 bg-violet-2 text-paper placeholder:text-paper/40 focus-visible:border-sky"
    : "border-ink/15 bg-card text-ink placeholder:text-ink/40 focus-visible:border-violet";
  const successColor = dark ? "text-paper" : "text-violet";

  if (submitted) {
    return (
      <p className={`font-display text-xl font-medium leading-snug md:text-2xl ${successColor}`}>
        {bookingForm.successMessage}
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={async (e) => {
        e.preventDefault();
        if (status === "sending") return;
        setStatus("sending");
        const ok = await submitLead({
          name,
          phone,
          source,
          // Send the localized title, not the slug, so the lead reads well.
          service: service === "any" ? undefined : services.find((s) => s.slug === service)?.title,
          time: time || undefined,
        });
        if (ok) setSubmitted(true);
        else setStatus("error");
      }}
    >
      <label className="block">
        <span className={`font-body text-xs font-semibold tracking-[0.14em] uppercase ${labelColor}`}>
          {bookingForm.nameLabel}
        </span>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={bookingForm.namePlaceholder}
          className={`mt-2.5 w-full rounded-2xl border-[1.5px] px-4 py-3.5 font-body text-base outline-none ${inputCls}`}
        />
      </label>

      <label className="block">
        <span className={`font-body text-xs font-semibold tracking-[0.14em] uppercase ${labelColor}`}>
          {bookingForm.phoneLabel}
        </span>
        <input
          required
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(formatUzPhone(e.target.value))}
          placeholder={bookingForm.phonePlaceholder}
          className={`mt-2.5 w-full rounded-2xl border-[1.5px] px-4 py-3.5 font-body text-base outline-none ${inputCls}`}
        />
      </label>

      <label className="block">
        <span className={`font-body text-xs font-semibold tracking-[0.14em] uppercase ${labelColor}`}>
          {bookingForm.serviceLabel}
        </span>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={`mt-2.5 w-full rounded-2xl border-[1.5px] px-4 py-3.5 font-body text-base outline-none ${inputCls}`}
        >
          <option value="any" className="text-ink">
            {bookingForm.serviceAnyLabel}
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug} className="text-ink">
              {s.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={`font-body text-xs font-semibold tracking-[0.14em] uppercase ${labelColor}`}>
          {bookingForm.timeLabel}
        </span>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder={bookingForm.timePlaceholder}
          className={`mt-2.5 w-full rounded-2xl border-[1.5px] px-4 py-3.5 font-body text-base outline-none ${inputCls}`}
        />
      </label>

      <button type="submit" disabled={status === "sending"} className={`mt-1 ${btn.primary} disabled:opacity-60`}>
        {status === "sending" ? bookingForm.sendingLabel : bookingForm.submitLabel}
      </button>

      {status === "error" && (
        <p role="alert" className="rounded-2xl bg-lemon px-4 py-3 font-body text-sm font-medium text-ink">
          {bookingForm.errorMessage}
        </p>
      )}
    </form>
  );
}

export default function BookingForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const site = useContent();
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, dialogRef);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 py-10">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="card-soft max-h-full w-full max-w-lg overflow-y-auto rounded-[28px] bg-paper p-7 md:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id={titleId} className="font-display text-xl font-medium text-ink md:text-2xl">
            {site.layout.header.ctaLabel}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink/15 font-body text-sm text-ink transition-colors hover:border-coral hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            ✕
          </button>
        </div>

        <div className="mt-7">
          <BookingFormFields />
        </div>
      </div>
    </div>
  );
}
