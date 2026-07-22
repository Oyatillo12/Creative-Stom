"use client";

import { useEffect, useId, useReducer, useRef } from "react";
import { site } from "@/content/site";
import { formatUzPhone } from "@/lib/phone";
import { useFocusTrap } from "@/hooks/useFocusTrap";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 px-4 py-10">
      <div
        ref={dialogRef}
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
            onClick={onClose}
            aria-label="Yopish"
            className="font-body text-sm text-ivory/60 transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
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
  const { steps, contactStep, backLabel, closeLabel, successTemplate } = site.quiz;
  const [state, dispatch] = useReducer(reducer, initialState);
  const totalSteps = steps.length + 1;
  const progress = ((state.stepIndex + 1) / totalSteps) * 100;
  const isContactStep = state.stepIndex === steps.length;

  if (state.submitted) {
    const message = successTemplate.replace("{name}", state.name.trim());
    return (
      <div className="mt-10 text-center">
        <p className="font-display text-2xl leading-snug md:text-3xl">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 bg-gold px-9 py-4 font-body text-xs font-semibold tracking-[0.12em] text-navy uppercase transition-colors hover:bg-gold-dark hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
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
        className="h-1 w-full overflow-hidden bg-ivory/15"
      >
        <div className="h-full bg-gold transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-6 font-body text-xs font-semibold tracking-[0.2em] text-gold uppercase">
        {state.stepIndex + 1} / {totalSteps}
      </div>

      {isContactStep ? (
        <form
          className="mt-4 flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("quiz submitted", { ...state.answers, name: state.name, phone: state.phone });
            dispatch({ type: "SUBMIT" });
          }}
        >
          <label className="block">
            <span className="font-body text-xs font-semibold tracking-[0.18em] text-ivory/50 uppercase">
              {contactStep.nameLabel}
            </span>
            <input
              required
              type="text"
              value={state.name}
              onChange={(e) => dispatch({ type: "SET_NAME", value: e.target.value })}
              placeholder={contactStep.namePlaceholder}
              className="mt-3 w-full border-b border-ivory/30 bg-transparent py-3 font-body text-base text-ivory outline-none placeholder:text-ivory/40 focus-visible:border-gold"
            />
          </label>

          <label className="block">
            <span className="font-body text-xs font-semibold tracking-[0.18em] text-ivory/50 uppercase">
              {contactStep.phoneLabel}
            </span>
            <input
              required
              type="tel"
              inputMode="tel"
              value={state.phone}
              onChange={(e) => dispatch({ type: "SET_PHONE", value: formatUzPhone(e.target.value) })}
              placeholder={contactStep.phonePlaceholder}
              className="mt-3 w-full border-b border-ivory/30 bg-transparent py-3 font-body text-base text-ivory outline-none placeholder:text-ivory/40 focus-visible:border-gold"
            />
          </label>

          <div className="mt-2 flex items-center gap-8">
            <button
              type="button"
              onClick={() => dispatch({ type: "BACK" })}
              className="font-body text-xs font-semibold tracking-[0.14em] text-ivory/60 uppercase transition-colors hover:text-ivory"
            >
              ← {backLabel}
            </button>
            <button
              type="submit"
              className="flex-1 bg-gold px-9 py-4 text-center font-body text-xs font-semibold tracking-[0.12em] text-navy uppercase transition-colors hover:bg-gold-dark hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {contactStep.submitLabel}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-4">
          <div className="font-display text-xl leading-snug md:text-2xl">{steps[state.stepIndex].question}</div>
          <div className="mt-6 flex flex-col gap-3">
            {steps[state.stepIndex].options.map((option) => {
              const field = CHOICE_FIELDS[state.stepIndex];
              const selected = state.answers[field] === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => dispatch({ type: "ANSWER", field, value: option.value })}
                  className={`border px-6 py-4 text-left font-body text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    selected ? "border-gold text-gold" : "border-ivory/25 text-ivory hover:border-gold hover:text-gold"
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
              className="mt-6 font-body text-xs font-semibold tracking-[0.14em] text-ivory/60 uppercase transition-colors hover:text-ivory"
            >
              ← {backLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
