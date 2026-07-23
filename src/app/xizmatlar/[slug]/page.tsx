import Link from "next/link";
import Container from "@/components/Container";
import ServiceHero from "../_components/ServiceHero";
import { site } from "@/content";

export async function generateStaticParams() {
  const { surgical, general } = site.services;
  return [...surgical, ...general]
    .filter((service) => service.slug !== "implantatsiya")
    .map((service) => ({ slug: service.slug }));
}

export default async function ServiceStubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { services, servicePageStub, media } = site;
  const service = [...services.surgical, ...services.general].find((item) => item.slug === slug);
  const heading = service?.title ?? servicePageStub.genericHeading;

  return (
    <>
      <ServiceHero
        image={media.processWide}
        imageAlt={heading}
        breadcrumb={[
          { label: "Bosh sahifa", href: "/" },
          { label: servicePageStub.breadcrumbLabel, href: "/#services" },
          { label: heading },
        ]}
        heading={heading}
      />

      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <p className="font-display text-2xl text-navy md:text-3xl">{servicePageStub.message}</p>
          <Link
            href="/#services"
            className="mt-8 inline-block font-body text-sm font-semibold tracking-[0.12em] text-gold-dark uppercase transition-colors hover:text-navy"
          >
            {servicePageStub.backLabel}
          </Link>
        </Container>
      </section>
    </>
  );
}
