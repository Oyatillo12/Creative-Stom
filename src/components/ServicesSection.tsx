import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { site } from "@/content";

export default function ServicesSection() {
  const { services } = site.homepage;
  const { surgical, general } = site.services;

  return (
    <section id="services" className="bg-navy py-24 text-ivory md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[380px_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow={services.eyebrow}
              heading={services.heading}
              description={services.intro}
              tone="dark"
            />
          </Reveal>

          <Reveal>
            <div>
              <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                {services.surgicalLabel}
              </div>

              <div className="mt-2">
                {surgical.map((item, i) => (
                  <a
                    key={item.slug}
                    href={`/xizmatlar/${item.slug}`}
                    className="group -mx-2 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-ivory/15 px-2 py-6 transition-colors last:border-b hover:bg-navy-2 sm:flex-nowrap sm:py-7"
                  >
                    <span className="w-8 shrink-0 font-body text-xs text-ivory/40">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-display text-xl leading-snug sm:text-2xl md:text-3xl">
                      {item.title}
                    </span>
                    <span className="hidden max-w-[220px] font-body text-sm text-ivory/50 sm:block">{item.line}</span>
                    <span className="ml-auto shrink-0 font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold transition-transform duration-200 group-hover:translate-x-1 sm:ml-0">
                      {services.linkLabel}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-ivory/45">
                {services.generalLabel}
              </div>
              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-6">
                {general.map((item) => (
                  <a key={item.slug} href={`/xizmatlar/${item.slug}`} className="group flex flex-col gap-2">
                    <span className="font-body text-base font-medium text-ivory/85 transition-colors group-hover:text-gold">
                      {item.title}
                    </span>
                    <span className="font-body text-xs text-ivory/40 transition-transform duration-200 group-hover:translate-x-1">
                      {item.line} · {services.linkLabel}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
