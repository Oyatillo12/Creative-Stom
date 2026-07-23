import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import ModalProvider from "@/components/ModalProvider";
import MotionProvider from "@/components/MotionProvider";
import LocaleProvider from "@/components/LocaleProvider";
import Preloader from "@/components/Preloader";
import Analytics from "@/components/Analytics";
import UtmCapture from "@/components/UtmCapture";
import { getContent, type Locale } from "@/content";
import { siteConfig } from "@/config/site.config";
import { inter, playfairDisplay } from "@/lib/fonts";

// Shared document shell used by both root layouts ((uz) and /ru).
export default function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const site = getContent(locale);

  return (
    <html
      lang={locale}
      className={`${playfairDisplay.variable} ${inter.variable}`}
      data-metrica-id={siteConfig.analytics.yandexMetricaId || undefined}
    >
      <body className="flex min-h-screen flex-col bg-ivory font-body text-ink antialiased">
        <MotionProvider>
          <LocaleProvider locale={locale}>
            <ModalProvider>
              {siteConfig.features.preloader && (
                <Preloader brand={site.clinic.name} ariaLabel={site.layout.preloader.ariaLabel} />
              )}
              <Header />
              <main className="flex-1 pb-16 md:pb-0">{children}</main>
              <Footer locale={locale} />
              {siteConfig.features.stickyMobileBar && <StickyMobileBar />}
              <UtmCapture />
              <Analytics />
            </ModalProvider>
          </LocaleProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
