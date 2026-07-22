"use client";

import { useEffect, useId } from "react";
import { site } from "@/content/site";

export default function BookingFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { bookingForm, doctors } = site;
  const titleId = useId();

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

        <form
          className="mt-8 flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <label className="block">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {bookingForm.nameLabel}
            </span>
            <input
              type="text"
              placeholder={bookingForm.namePlaceholder}
              className="mt-3 w-full border-b border-line bg-transparent py-3 font-body text-base text-ink outline-none focus-visible:border-gold"
            />
          </label>

          <label className="block">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {bookingForm.phoneLabel}
            </span>
            <input
              type="tel"
              placeholder={bookingForm.phonePlaceholder}
              className="mt-3 w-full border-b border-line bg-transparent py-3 font-body text-base text-ink outline-none focus-visible:border-gold"
            />
          </label>

          <fieldset>
            <legend className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {bookingForm.doctorLabel}
            </legend>
            <div className="mt-3 flex flex-wrap gap-6">
              <label className="flex items-center gap-2 font-body text-sm text-ink">
                <input type="radio" name="doctor" value="any" defaultChecked className="accent-gold" />
                {bookingForm.doctorAnyLabel}
              </label>
              {doctors.map((doctor) => (
                <label key={doctor.slug} className="flex items-center gap-2 font-body text-sm text-ink">
                  <input type="radio" name="doctor" value={doctor.slug} className="accent-gold" />
                  {doctor.name}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {bookingForm.timeLabel}
            </span>
            <input
              type="text"
              placeholder={bookingForm.timePlaceholder}
              className="mt-3 w-full border-b border-line bg-transparent py-3 font-body text-base text-ink outline-none focus-visible:border-gold"
            />
          </label>

          <button
            type="submit"
            className="mt-2 bg-gold px-9 py-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-dark hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {bookingForm.submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
