"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "./LocaleProvider";
import { btn } from "@/lib/ui";

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

  const embedSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1094.929571863686!2d69.17829092135635!3d41.28035743098084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae89a433849c71%3A0x999c27b6182d3c90!2sStomatologiya%20%22creative_stom%22!5e0!3m2!1sen!2s!4v1784812224542!5m2!1sen!2s`;
  const googleDirections = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const yandexDirections = `https://yandex.uz/maps/?rtext=~${lat}%2C${lng}`;
  const twoGisDirections = `https://2gis.uz/tashkent/geo/${lng}%2C${lat}`;
  const phoneHref = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;

  const labelCls =
    "inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink/15 bg-card px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink";
  const dot = <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
      <div
        ref={frameRef}
        className="sticker relative aspect-[16/10] w-full overflow-hidden rounded-[32px] bg-sky md:aspect-[16/9]"
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

      <div className="flex flex-col gap-6">
        <div>
          <div className={labelCls}>
            {dot}
            {mapBlock.landmarkLabel}
          </div>
          <div className="mt-3 font-body text-sm text-ink">{clinic.landmark}</div>
        </div>

        <div>
          <div className={labelCls}>
            {dot}
            {mapBlock.phoneLabel}
          </div>
          <a
            href={phoneHref}
            className="mt-3 block font-body text-sm font-semibold text-ink transition-colors hover:text-violet"
          >
            {clinic.phone}
          </a>
        </div>

        <div>
          <div className={labelCls}>
            {dot}
            {mapBlock.hoursLabel}
          </div>
          <div className="mt-3 font-body text-sm text-ink">{clinic.workHours}</div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-6">
          <a href={googleDirections} target="_blank" rel="noopener noreferrer" className={btn.light}>
            {mapBlock.googleLabel}
          </a>
          <a href={yandexDirections} target="_blank" rel="noopener noreferrer" className={btn.sky}>
            {mapBlock.yandexLabel}
          </a>
          <a href={twoGisDirections} target="_blank" rel="noopener noreferrer" className={btn.lemon}>
            {mapBlock.twoGisLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
