"use client";

import { m } from "motion/react";
import { useModals } from "./ModalProvider";

// Server-component-friendly booking CTA: parents pass the label (from content)
// and the button styling; this only contributes the modal trigger + press feel.
export default function BookingTrigger({ label, className = "" }: { label: string; className?: string }) {
  const { openBooking } = useModals();

  return (
    <m.button type="button" whileTap={{ scale: 0.98 }} onClick={openBooking} className={className}>
      {label}
    </m.button>
  );
}
