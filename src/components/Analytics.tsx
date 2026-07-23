import Script from "next/script";
import { siteConfig } from "@/config/site.config";

// Renders nothing until real IDs are configured in site.config. Scripts load
// lazily so they never compete with page rendering.
export default function Analytics() {
  const { gaId, yandexMetricaId } = siteConfig.analytics;
  if (!gaId && !yandexMetricaId) return null;

  return (
    <>
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
