import { Golos_Text, Unbounded } from "next/font/google";

export const displayFont = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const bodyFont = Golos_Text({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});
