import type { Metadata } from "next";
import ServiceView, { serviceMetadata, serviceStaticParams } from "@/views/service";

export function generateStaticParams() {
  return serviceStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return serviceMetadata("ru", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceView locale="ru" slug={slug} />;
}
