"use client";

import { Fragment } from "react";
import { m } from "motion/react";
import { EASE_OUT } from "./motion-utils";

// Reveals a display heading word by word, each rising out of an
// overflow-hidden slot. Splits on plain spaces only, so Uzbek apostrophes
// (oʻ, g') always stay inside their word. Spaces live as bare text nodes
// BETWEEN the inline-block wrappers — inside them they would be trimmed.
// Screen readers get the intact string; the animated copy is aria-hidden.
export default function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.055,
  amount = 0.5,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  amount?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 ? " " : null}
            <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <m.span
                className="inline-block"
                variants={{
                  hidden: { y: "115%" },
                  visible: { y: "0%", transition: { duration: 0.7, ease: EASE_OUT } },
                }}
              >
                {word}
              </m.span>
            </span>
          </Fragment>
        ))}
      </m.span>
    </span>
  );
}
