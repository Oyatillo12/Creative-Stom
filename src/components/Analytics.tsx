import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { siteConfig } from "@/config/site.config";

// Renders analytics scripts including Vercel Web Analytics, Google Analytics,
// and Yandex Metrica. Scripts load lazily so they never compete with page rendering.
export default function Analytics() {
  const { gaId, yandexMetricaId } = siteConfig.analytics;

  return (
    <>
      {/* Vercel Web Analytics */}
      <VercelAnalytics />

      {/* Google Analytics */}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
          <Script id="ga-init" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      )}

      {/* Yandex Metrica */}
      {yandexMetricaId && (
        <Script id="ym-init" strategy="lazyOnload">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],
k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${yandexMetricaId}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true});`}
        </Script>
      )}
    </>
  );
}
