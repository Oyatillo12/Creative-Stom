"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import BookingForm from "./BookingForm";
import Quiz from "./Quiz";

interface ModalContextValue {
  openBooking: () => void;
  openQuiz: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used within ModalProvider");
  return ctx;
}

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  const openBooking = useCallback(() => setBookingOpen(true), []);
  const openQuiz = useCallback(() => setQuizOpen(true), []);

  return (
    <ModalContext.Provider value={{ openBooking, openQuiz }}>
      {children}
      <BookingForm open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <Quiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </ModalContext.Provider>
  );
}
