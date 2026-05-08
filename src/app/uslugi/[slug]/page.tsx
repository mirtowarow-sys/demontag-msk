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
  const body = tildaBodies[url];
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

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <JsonLd data={jsonLd} />
        <JsonLd data={breadcrumbLd} />
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink/70">
          <Link href="/uslugi" className="hover:text-ink">
            Услуги
          </Link>
          <span aria-hidden>•</span>
          <span className="text-ink/80">{svc?.title ?? p?.title ?? slug}</span>
        </div>

        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {svc?.title ?? p?.title ?? "Услуга"}
        </h1>
        {p?.description ? <p className="mt-3 text-sm text-ink/70">{p.description}</p> : null}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-bg p-6 md:col-span-2">
            <p className="text-sm font-semibold">Описание</p>
            <div className="mt-4">
              {body ? (
                <TildaBody text={body} />
              ) : (
                <p className="text-sm text-ink/80">
                  Текст услуги пока не найден в экспорте. Мы добавим его на следующем шаге.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6">
            <p className="text-sm font-semibold">Что входит</p>
            <ul className="mt-4 space-y-2 text-sm text-ink/80">
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                <span>Оценка объёма работ и смета</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                <span>Демонтаж с соблюдением правил тишины</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                <span>Вынос и вывоз строительного мусора (по согласованию)</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                <span>Уборка после работ</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-bg p-6">
            <p className="text-sm font-semibold">Рассчитать стоимость</p>
            <p className="mt-2 text-sm text-ink/70">
              Оставьте контакты — мы перезвоним и уточним детали.
            </p>
            <div className="mt-5">
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
