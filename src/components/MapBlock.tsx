"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "./LocaleProvider";

export default function MapBlock() {
  const site = useContent();
  const { clinic, mapBlock } = site;
  const { lat, lng } = clinic.coordinates;
  const frameRef = useRef<HTMLDivElement>(null);
  // The map is always open; the iframe itself mounts only once the block
  // approaches the viewport so Google's embed doesn't load at initial paint.
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const embedSrc = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
  const googleDirections = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const yandexDirections = `https://yandex.uz/maps/?rtext=~${lat}%2C${lng}`;
  const twoGisDirections = `https://2gis.uz/tashkent/geo/${lng}%2C${lat}`;
  const phoneHref = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <div
        ref={frameRef}
        className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-bone md:aspect-[16/9]"
      >
        {nearViewport && (
          <iframe
            src={embedSrc}
            title={mapBlock.iframeTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        )}
      </div>

      <div className="flex flex-col gap-7">
        <div>
          <div className="font-body text-xs font-semibold tracking-[0.2em] text-gold-dark uppercase">
            {mapBlock.landmarkLabel}
          </div>
          <div className="mt-2 font-body text-sm text-ink">{clinic.landmark}</div>
        </div>

        <div>
          <div className="font-body text-xs font-semibold tracking-[0.2em] text-gold-dark uppercase">
            {mapBlock.phoneLabel}
          </div>
          <a
            href={phoneHref}
            className="mt-2 block font-body text-sm text-ink transition-colors hover:text-gold-dark"
          >
            {clinic.phone}
          </a>
        </div>

        <div>
          <div className="font-body text-xs font-semibold tracking-[0.2em] text-gold-dark uppercase">
            {mapBlock.hoursLabel}
          </div>
          <div className="mt-2 font-body text-sm text-ink">{clinic.workHours}</div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-7">
          <a
            href={googleDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-navy px-6 py-3 text-center font-body text-xs font-semibold tracking-[0.12em] text-navy uppercase transition-colors hover:bg-navy hover:text-ivory"
          >
            {mapBlock.googleLabel}
          </a>
          <a
            href={yandexDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-navy px-6 py-3 text-center font-body text-xs font-semibold tracking-[0.12em] text-navy uppercase transition-colors hover:bg-navy hover:text-ivory"
          >
            {mapBlock.yandexLabel}
          </a>
          <a
            href={twoGisDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-navy px-6 py-3 text-center font-body text-xs font-semibold tracking-[0.12em] text-navy uppercase transition-colors hover:bg-navy hover:text-ivory"
          >
            {mapBlock.twoGisLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
