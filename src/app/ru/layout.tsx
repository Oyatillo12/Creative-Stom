import type { Metadata } from "next";
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { getContent } from "@/content";
import { siteConfig } from "@/config/site.config";

const site = getContent("ru");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="ru">{children}</SiteShell>;
}
