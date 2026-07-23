import type { Metadata } from "next";
import CaseStudyView, { caseMetadata, caseStaticParams } from "@/views/case-study";

export function generateStaticParams() {
  return caseStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return caseMetadata("uz", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyView locale="uz" slug={slug} />;
}
