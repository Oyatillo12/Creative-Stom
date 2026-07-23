import type { ReactNode } from "react";

// CSS-only infinite marquee: the track holds two copies of the content and
// translates -50%, so the loop is seamless. Paused under
// prefers-reduced-motion via the .marquee-track rule in globals.css.
// Decorative by default (aria-hidden).
export default function Marquee({
  children,
  className = "",
  durationSec = 40,
}: {
  children: ReactNode;
  className?: string;
  durationSec?: number;
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <div className="marquee-track inline-flex" style={{ animationDuration: `${durationSec}s` }}>
        <div className="inline-flex shrink-0">{children}</div>
        <div className="inline-flex shrink-0">{children}</div>
      </div>
    </div>
  );
}
