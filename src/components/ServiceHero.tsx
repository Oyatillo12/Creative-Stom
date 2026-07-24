"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { useModals } from "@/components/ModalProvider";
import { btn } from "@/lib/ui";

interface Crumb {
  label: string;
  href?: string;
}

// Service-page hero: breadcrumb pill above a wide rounded photo card carrying
// the heading, intro, and booking CTA on its lower edge.
export default function ServiceHero({
  image,
  imageAlt,
  breadcrumb,
  heading,
  intro,
  ctaLabel,
}: {
  image: string;
  imageAlt: string;
  breadcrumb: Crumb[];
  heading: string;
  intro?: string;
  ctaLabel?: string;
}) {
  const { openBooking } = useModals();

  return (
    <section className="pt-28 md:pt-32">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="inline-flex flex-wrap items-center gap-x-2 rounded-full border-[1.5px] border-ink/15 bg-card px-4 py-2 font-body text-xs font-semibold text-ink/70 md:text-sm"
        >
          {breadcrumb.map((crumb, i) => (
            <span key={crumb.label}>
              {i > 0 && <span className="mx-1.5 text-ink/40">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors hover:text-violet">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-ink">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="sticker relative mt-5 min-h-[420px] w-full overflow-hidden rounded-[36px] bg-violet md:min-h-[520px]">
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/45" />

          <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-8 md:min-h-[520px] md:p-12 lg:p-14">
            <h1 className="max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.3rem)] font-semibold leading-[1.1] text-paper">
              {heading}
            </h1>

            {(intro || ctaLabel) && (
              <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                {intro && (
                  <p className="max-w-xl font-body text-base leading-relaxed text-paper/85 md:text-lg">{intro}</p>
                )}
                {ctaLabel && (
                  <button type="button" onClick={openBooking} className={`shrink-0 ${btn.primary}`}>
                    {ctaLabel}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
