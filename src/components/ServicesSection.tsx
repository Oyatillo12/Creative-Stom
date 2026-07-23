import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { getContent, localePrefix, type Locale } from "@/content";

export default function ServicesSection({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { services } = site.homepage;
  const catalogue = site.services;

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
              {catalogue.map((item, i) => (
                <a
                  key={item.slug}
                  href={`${prefix}/xizmatlar/${item.slug}`}
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
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
