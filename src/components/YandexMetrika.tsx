"use client";

import Image from "next/image";
import Script from "next/script";

export function YandexMetrika() {
  const raw = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
  const id = raw ? Number(raw) : NaN;
  if (!Number.isFinite(id)) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${id}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true
          });
        `}
      </Script>
      <noscript>
        <div>
          <Image
            src={`https://mc.yandex.ru/watch/${id}`}
            alt=""
            width={1}
            height={1}
            style={{ position: "absolute", left: "-9999px" }}
            unoptimized
          />
        </div>
      </noscript>
    </>
  );
}
