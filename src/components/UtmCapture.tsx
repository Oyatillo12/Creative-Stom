"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/lead";

// Persists first-touch UTM params so every lead carries its ad source.
export default function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}
