import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { services } from "@/content/services";
import { pages } from "@/content/pages";
import { LeadForm } from "@/components/forms/LeadForm";
import { submitLeadOrThrow } from "@/app/actions/leads";
import { tildaBodies } from "@/content/tildaBodies";
import { TildaBody } from "@/components/TildaBody";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { canonicalServiceSlugs } from "@/content/canonical";
import { mutedCardClass } from "@/lib/card-styles";

/** Канонический URL на сайте; в экспорте Тильды тот же текст лежит под другим slug. */
const TILDA_BODY_URL_BY_SLUG: Record<string, string> = {
  "demontazh-konstrukciy": "/uslugi/demontazh-betonnykh-konstruktsij",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const url = `/uslugi/${slug}`;
  const p = pages.find((x) => x.url === url);
  const fallback = services.find((s) => s.id === slug)?.title;

  return {
    title: p?.title ?? fallback ?? "Услуга",
    description:
      p?.description ??
      "Описание услуги. Оставьте заявку — мы уточним детали и рассчитаем стоимость.",
    alternates: { canonical: url },
    openGraph: {
      images: [{ url: `${url}/opengraph-image` }],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  if (!canonicalServiceSlugs.includes(slug as never)) redirect("/uslugi");
  const svc = services.find((s) => s.id === slug);
  const url = `/uslugi/${slug}`;
  const p = pages.find((x) => x.url === url);
  const bodySourceUrl = TILDA_BODY_URL_BY_SLUG[slug];
  const body = tildaBodies[url] ?? (bodySourceUrl ? tildaBodies[bodySourceUrl] : undefined);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${url}`;
  const title = svc?.title ?? p?.title ?? "Услуга";
  const description =
    p?.description ?? "Демонтажные услуги в Москве и МО. Рассчитаем стоимость и сроки работ.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Москва и Московская область",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Услуги", item: `${siteUrl}/uslugi` },
      { "@type": "ListItem", position: 3, name: title, item: pageUrl },
    ],
  };

  if (!svc && !p) notFound();

  const card = mutedCardClass;

  return (
    <div className="min-h-full bg-bg">
      <Header />
      <main className="mx-auto max-w-[92rem] px-5 py-11 pb-20 md:px-10 md:py-13 md:pb-24">
        <JsonLd data={jsonLd} />
        <JsonLd data={breadcrumbLd} />

        <div className="flex flex-wrap items-center gap-3 text-[0.813rem] font-semibold text-ink/52">
          <Link
            href="/"
            className="font-bold text-ink/55 underline-offset-[3px] hover:text-ink hover:underline"
          >
            Главная
          </Link>
          <span className="-mt-px text-ink/32" aria-hidden>
            ›
          </span>
          <Link href="/uslugi" className="hover:text-ink">
            Услуги
          </Link>
          <span aria-hidden className="-mt-px text-ink/32">
            ›
          </span>
          <span className="max-w-[min(72vw,52ch)] truncate text-ink/78">
            {svc?.title ?? p?.title ?? slug}
          </span>
        </div>

        <h1 className="mt-5 max-w-[min(94vw,38ch)] text-balance text-[clamp(1.9rem,1.12rem+2.95vw,2.85rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-ink">
          {svc?.title ?? p?.title ?? "Услуга"}
        </h1>
        {p?.description ? (
          <p className="mt-4 max-w-3xl text-[0.95rem] font-medium leading-relaxed text-ink/66">
            {p.description}
          </p>
        ) : null}

        <div className="mt-11 grid gap-6 md:grid-cols-2">
          <div className={`p-[1.4rem] md:col-span-2 md:p-[1.7rem] ${card}`}>
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-ink/40">
              Описание
            </p>
            <div className="mt-[0.95rem] text-[0.92rem] leading-relaxed text-ink/78">
              {body ? (
                <TildaBody text={body} />
              ) : (
                <p className="text-[0.9rem] text-ink/72">
                  Текст услуги пока не найден в экспорте. Мы добавим его на следующем шаге.
                </p>
              )}
            </div>
          </div>

          <div className={`p-[1.4rem] md:p-[1.7rem] ${card}`}>
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-ink/40">
              Что входит
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9rem] leading-snug text-ink/74">
              {[
                "Оценка объёма работ и смета",
                "Демонтаж с соблюдением правил тишины",
                "Вынос и вывоз строительного мусора (по согласованию)",
                "Уборка после работ",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-[0.4rem] size-2 shrink-0 rounded-full bg-brand shadow-[0_0_10px_-1px_rgba(255,203,46,0.85)] ring-4 ring-brand/12" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-[1.4rem] md:p-[1.7rem] ${card}`}>
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-ink/40">
              Рассчитать стоимость
            </p>
            <p className="mt-[0.8rem] text-[0.9rem] leading-relaxed text-ink/66">
              Оставьте контакты — мы перезвоним и уточним детали.
            </p>
            <div className="mt-[1.1rem]">
              <LeadForm
                submitLabel="Отправить"
                presetService={svc?.title ?? p?.title ?? undefined}
                onSubmitLead={submitLeadOrThrow}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
