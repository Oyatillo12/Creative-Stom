"use client";

import { useEffect, useId, useState } from "react";
import { site } from "@/content/site";

export default function QuizModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { quiz: quizCopy } = site.homepage;
  const { steps } = site.quiz;
  const titleId = useId();
  const [stepIndex, setStepIndex] = useState<number | null>(null);

  const handleClose = () => {
    setStepIndex(null);
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStepIndex(null);
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const current = stepIndex !== null ? steps[stepIndex] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 px-4 py-10">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-full w-full max-w-lg overflow-y-auto bg-navy p-8 text-ivory md:p-12"
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id={titleId} className="font-display text-2xl md:text-3xl">
            {quizCopy.heading}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Yopish"
            className="font-body text-sm text-ivory/60 transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            ✕
          </button>
        </div>

        {current ? (
          <div className="mt-8">
            <div className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {stepIndex! + 1} / {steps.length}
            </div>
            <div className="mt-4 font-display text-xl leading-snug md:text-2xl">{current.question}</div>
            <div className="mt-6 flex flex-col gap-3">
              {current.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStepIndex((i) => (i !== null && i + 1 < steps.length ? i + 1 : null))}
                  className="border border-ivory/25 px-6 py-4 text-left font-body text-sm text-ivory transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <p className="font-body text-sm leading-relaxed text-ivory/70">{quizCopy.intro}</p>
            <button
              type="button"
              onClick={() => setStepIndex(0)}
              className="mt-8 bg-gold px-9 py-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-dark hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {quizCopy.startLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
