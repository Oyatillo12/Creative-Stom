"use client";

import { useState } from "react";
import Image from "next/image";
import { useContent } from "./LocaleProvider";

export default function MapBlock() {
  const site = useContent();
  const { clinic, media, mapBlock } = site;
  const [mapOpen, setMapOpen] = useState(false);
  const { lat, lng } = clinic.coordinates;

  const embedSrc = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
  const googleDirections = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const yandexDirections = `https://yandex.uz/maps/?rtext=~${lat}%2C${lng}`;
  const twoGisDirections = `https://2gis.uz/tashkent/geo/${lng}%2C${lat}`;
  const phoneHref = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-line md:aspect-[16/9]">
        {mapOpen ? (
          <iframe
            src={embedSrc}
            title={mapBlock.iframeTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button type="button" onClick={() => setMapOpen(true)} className="group absolute inset-0 block h-full w-full">
            <Image
              src={media.mapFacade}
              alt={mapBlock.iframeTitle}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-navy/40 transition-colors group-hover:bg-navy/55" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="bg-gold px-8 py-4 font-body text-xs font-semibold tracking-[0.14em] text-navy uppercase transition-colors group-hover:bg-gold-dark group-hover:text-ivory">
                {mapBlock.openLabel}
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-7">
        <div className="font-body text-sm text-ink">
          <span className="font-semibold text-gold-dark">{mapBlock.landmarkLabel}:</span> {clinic.landmark}
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
