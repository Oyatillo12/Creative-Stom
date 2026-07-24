"use client";

import { useEffect, useId, useReducer, useRef, useState } from "react";
import { useContent } from "./LocaleProvider";
import { formatUzPhone } from "@/lib/phone";
import { submitLead } from "@/lib/lead";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { btn } from "@/lib/ui";

const CHOICE_FIELDS = ["toothCount", "duration", "hasCt", "timeline"] as const;
type ChoiceField = (typeof CHOICE_FIELDS)[number];

interface QuizState {
  stepIndex: number;
  answers: Partial<Record<ChoiceField, string>>;
  name: string;
  phone: string;
  submitted: boolean;
}

type QuizAction =
  | { type: "ANSWER"; field: ChoiceField; value: string }
  | { type: "BACK" }
  | { type: "SET_NAME"; value: string }
  | { type: "SET_PHONE"; value: string }
  | { type: "SUBMIT" };

const initialState: QuizState = { stepIndex: 0, answers: {}, name: "", phone: "+998", submitted: false };

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.field]: action.value },
        stepIndex: Math.min(state.stepIndex + 1, CHOICE_FIELDS.length),
      };
    case "BACK":
      return { ...state, stepIndex: Math.max(state.stepIndex - 1, 0) };
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_PHONE":
      return { ...state, phone: action.value };
    case "SUBMIT":
      return { ...state, submitted: true };
    default:
      return state;
  }
}

export default function Quiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const site = useContent();
  const { quiz: quizCopy } = site.homepage;
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
        className="card-soft max-h-full w-full max-w-lg overflow-y-auto rounded-[28px] bg-violet p-7 text-paper md:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id={titleId} className="font-display text-xl font-medium md:text-2xl">
            {quizCopy.heading}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-paper/30 font-body text-sm text-paper/80 transition-colors hover:border-sky hover:text-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
          >
            ✕
          </button>
        </div>

        <QuizFlow onClose={onClose} />
      </div>
    </div>
  );
}

function QuizFlow({ onClose }: { onClose: () => void }) {
  const site = useContent();
  const { steps, contactStep, backLabel, closeLabel, successTemplate } = site.quiz;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const totalSteps = steps.length + 1;
  const progress = ((state.stepIndex + 1) / totalSteps) * 100;
  const isContactStep = state.stepIndex === steps.length;

  const inputCls =
    "mt-2.5 w-full rounded-2xl border-[1.5px] border-paper/25 bg-violet-2 px-4 py-3.5 font-body text-base text-paper outline-none placeholder:text-paper/40 focus-visible:border-sky";

  if (state.submitted) {
    const message = successTemplate.replace("{name}", state.name.trim());
    return (
      <div className="mt-10 text-center">
        <p className="font-display text-xl font-medium leading-snug md:text-2xl">{message}</p>
        <button type="button" onClick={onClose} className={`mt-8 ${btn.primary}`}>
          {closeLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="h-2 w-full overflow-hidden rounded-full bg-paper/15"
      >
        <div
          className="h-full rounded-full bg-coral transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 font-body text-xs font-semibold tracking-[0.2em] text-sky uppercase">
        {state.stepIndex + 1} / {totalSteps}
      </div>

      {isContactStep ? (
        <form
          className="mt-4 flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            if (status === "sending") return;
            setStatus("sending");
            const ok = await submitLead({
              name: state.name,
              phone: state.phone,
              source: "quiz",
              quizAnswers: state.answers as Record<string, string>,
            });
            if (ok) dispatch({ type: "SUBMIT" });
            else setStatus("error");
          }}
        >
          <label className="block">
            <span className="font-body text-xs font-semibold tracking-[0.14em] text-paper/60 uppercase">
              {contactStep.nameLabel}
            </span>
            <input
              required
              type="text"
              value={state.name}
              onChange={(e) => dispatch({ type: "SET_NAME", value: e.target.value })}
              placeholder={contactStep.namePlaceholder}
              className={inputCls}
            />
          </label>

          <label className="block">
            <span className="font-body text-xs font-semibold tracking-[0.14em] text-paper/60 uppercase">
              {contactStep.phoneLabel}
            </span>
            <input
              required
              type="tel"
              inputMode="tel"
              value={state.phone}
              onChange={(e) => dispatch({ type: "SET_PHONE", value: formatUzPhone(e.target.value) })}
              placeholder={contactStep.phonePlaceholder}
              className={inputCls}
            />
          </label>

          <div className="mt-2 flex items-center gap-6">
            <button
              type="button"
              onClick={() => dispatch({ type: "BACK" })}
              className="font-body text-xs font-semibold tracking-[0.14em] text-paper/60 uppercase transition-colors hover:text-paper"
            >
              ← {backLabel}
            </button>
            <button
              type="submit"
              disabled={status === "sending"}
              className={`flex-1 ${btn.primary} disabled:opacity-60`}
            >
              {status === "sending" ? site.bookingForm.sendingLabel : contactStep.submitLabel}
            </button>
          </div>

          {status === "error" && (
            <p role="alert" className="rounded-2xl bg-lemon px-4 py-3 font-body text-sm font-medium text-ink">
              {site.bookingForm.errorMessage}
            </p>
          )}
        </form>
      ) : (
        <div className="mt-4">
          <div className="font-display text-lg font-medium leading-snug md:text-xl">
            {steps[state.stepIndex].question}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {steps[state.stepIndex].options.map((option) => {
              const field = CHOICE_FIELDS[state.stepIndex];
              const selected = state.answers[field] === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => dispatch({ type: "ANSWER", field, value: option.value })}
                  className={`rounded-2xl border-[1.5px] px-6 py-4 text-left font-body text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky ${
                    selected
                      ? "border-sky bg-violet-2 text-sky"
                      : "border-paper/25 text-paper hover:border-sky hover:text-sky"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {state.stepIndex > 0 && (
            <button
              type="button"
              onClick={() => dispatch({ type: "BACK" })}
              className="mt-6 font-body text-xs font-semibold tracking-[0.14em] text-paper/60 uppercase transition-colors hover:text-paper"
            >
              ← {backLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
