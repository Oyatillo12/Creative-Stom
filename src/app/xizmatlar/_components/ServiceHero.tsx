"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { useModals } from "@/components/ModalProvider";

interface Crumb {
  label: string;
  href?: string;
}

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
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-navy">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-navy/55" />
      <span data-hero-sentinel aria-hidden className="absolute bottom-24 left-0 h-px w-px" />

      <div className="relative z-10 flex h-full flex-col justify-end">
        <Container className="pb-14 md:pb-20">
          <nav aria-label="Breadcrumb" className="font-body text-xs text-ivory/60 md:text-sm">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label}>
                {i > 0 && <span className="mx-2">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-ivory">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ivory">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="mt-6 h-0.5 w-14 bg-gold" />

          <h1 className="mt-6 max-w-2xl text-[clamp(2.2rem,5vw,4.75rem)] leading-[1.05] font-display font-medium text-ivory">
            {heading}
          </h1>

          {(intro || ctaLabel) && (
            <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
              {intro && <p className="max-w-xl font-body text-base leading-relaxed text-ivory/80 md:text-lg">{intro}</p>}
              {ctaLabel && (
                <button
                  type="button"
                  onClick={openBooking}
                  className="shrink-0 bg-gold px-9 py-4 font-body text-xs font-semibold tracking-[0.12em] text-navy uppercase transition-colors hover:bg-gold-dark hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {ctaLabel}
                </button>
              )}
            </div>
          )}
        </Container>
      </div>
    </section>
  );
}
