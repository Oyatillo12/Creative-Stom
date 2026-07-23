// Conversion-event helper. No-ops unless the analytics scripts (gated by
// siteConfig.analytics IDs) have loaded on the page.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, action: string, target: string, params?: Record<string, unknown>) => void;
  }
}

export type LeadSource = "booking-modal" | "quiz" | "booking-band" | "sticky-bar";

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
  const metricaId = document.documentElement.dataset.metricaId;
  if (metricaId && window.ym) {
    window.ym(Number(metricaId), "reachGoal", name, params);
  }
}
