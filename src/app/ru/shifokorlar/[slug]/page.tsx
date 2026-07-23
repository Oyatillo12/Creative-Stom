import type { Metadata } from "next";
import DoctorProfileView, { doctorMetadata, doctorStaticParams } from "@/views/doctor-profile";

export function generateStaticParams() {
  return doctorStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return doctorMetadata("ru", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DoctorProfileView locale="ru" slug={slug} />;
}
