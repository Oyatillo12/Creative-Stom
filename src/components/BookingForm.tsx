"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";
import { formatUzPhone } from "@/lib/phone";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function BookingFormFields({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { bookingForm, doctors } = site;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [doctor, setDoctor] = useState("any");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dark = tone === "dark";
  const labelColor = dark ? "text-ivory/50" : "text-muted";
  const inputColor = dark ? "border-ivory/30 text-ivory placeholder:text-ivory/40" : "border-line text-ink";
  const successColor = dark ? "text-ivory" : "text-navy";

  if (submitted) {
    return (
      <p className={`font-display text-2xl leading-snug md:text-3xl ${successColor}`}>{bookingForm.successMessage}</p>
    );
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        console.log("booking submitted", { name, phone, doctor, time });
        setSubmitted(true);
      }}
    >
      <label className="block">
        <span className={`font-body text-xs font-semibold tracking-[0.18em] uppercase ${labelColor}`}>
          {bookingForm.nameLabel}
        </span>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={bookingForm.namePlaceholder}
          className={`mt-3 w-full border-b bg-transparent py-3 font-body text-base outline-none focus-visible:border-gold ${inputColor}`}
        />
      </label>

      <label className="block">
        <span className={`font-body text-xs font-semibold tracking-[0.18em] uppercase ${labelColor}`}>
          {bookingForm.phoneLabel}
        </span>
        <input
          required
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(formatUzPhone(e.target.value))}
          placeholder={bookingForm.phonePlaceholder}
          className={`mt-3 w-full border-b bg-transparent py-3 font-body text-base outline-none focus-visible:border-gold ${inputColor}`}
        />
      </label>

      <label className="block">
        <span className={`font-body text-xs font-semibold tracking-[0.18em] uppercase ${labelColor}`}>
          {bookingForm.doctorLabel}
        </span>
        <select
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          className={`mt-3 w-full border-b bg-transparent py-3 font-body text-base outline-none focus-visible:border-gold ${inputColor}`}
        >
          <option value="any" className="text-ink">
            {bookingForm.doctorAnyLabel}
          </option>
          {doctors.map((d) => (
            <option key={d.slug} value={d.slug} className="text-ink">
              {d.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={`font-body text-xs font-semibold tracking-[0.18em] uppercase ${labelColor}`}>
          {bookingForm.timeLabel}
        </span>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder={bookingForm.timePlaceholder}
          className={`mt-3 w-full border-b bg-transparent py-3 font-body text-base outline-none focus-visible:border-gold ${inputColor}`}
        />
      </label>

      <button
        type="submit"
        className="mt-2 bg-gold px-9 py-4 font-body text-xs font-semibold tracking-[0.12em] text-navy uppercase transition-colors hover:bg-gold-dark hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        {bookingForm.submitLabel}
      </button>
    </form>
  );
}

export default function BookingForm({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 px-4 py-10">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-full w-full max-w-lg overflow-y-auto bg-ivory p-8 md:p-12"
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id={titleId} className="font-display text-2xl text-navy md:text-3xl">
            {site.layout.header.ctaLabel}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="font-body text-sm text-muted transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            ✕
          </button>
        </div>

        <div className="mt-8">
          <BookingFormFields />
        </div>
      </div>
    </div>
  );
}
