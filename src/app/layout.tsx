import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import ModalProvider from "@/components/ModalProvider";
import MotionProvider from "@/components/MotionProvider";
import Preloader from "@/components/Preloader";
import Analytics from "@/components/Analytics";
import UtmCapture from "@/components/UtmCapture";
import { site } from "@/content";
import { siteConfig } from "@/config/site.config";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${playfairDisplay.variable} ${inter.variable}`}
      data-metrica-id={siteConfig.analytics.yandexMetricaId || undefined}
    >
      <body className="flex min-h-screen flex-col bg-ivory font-body text-ink antialiased">
        <MotionProvider>
          <ModalProvider>
            {siteConfig.features.preloader && (
              <Preloader brand={site.clinic.name} ariaLabel={site.layout.preloader.ariaLabel} />
            )}
            <Header />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <Footer />
            {siteConfig.features.stickyMobileBar && <StickyMobileBar />}
            <UtmCapture />
            <Analytics />
          </ModalProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
