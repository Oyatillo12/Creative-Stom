"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const STEP = 2;

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  className = "",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - STEP));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + STEP));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative touch-none overflow-hidden select-none ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="absolute inset-0">
        <Image src={afterSrc} alt={afterAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={beforeSrc} alt={beforeAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>

      <span className="pointer-events-none absolute top-4 left-4 font-body text-xs font-semibold tracking-[0.2em] text-ivory uppercase md:top-6 md:left-6">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 font-body text-xs font-semibold tracking-[0.2em] text-ivory uppercase md:top-6 md:right-6">
        {afterLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-gold" style={{ left: `${position}%` }} />

      <div
        role="slider"
        tabIndex={0}
        aria-label={`${beforeLabel} / ${afterLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-ivory text-navy shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        style={{ left: `${position}%` }}
      >
        <span aria-hidden="true" className="font-body text-xs font-semibold tracking-[0.05em]">
          ‹ ›
        </span>
      </div>
    </div>
  );
}
