import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pages } from "@/content/pages";
import { CtaSection } from "@/components/sections/CtaSection";
import { tildaBodies } from "@/content/tildaBodies";
import { TildaBody } from "@/components/TildaBody";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const url = `/articles/${slug}`;
  const p = pages.find((x) => x.url === url);
  if (!p) return { title: "Статья", alternates: { canonical: url } };
  return {
    title: p.title ?? "Статья",
    description: p.description ?? undefined,
    alternates: { canonical: url },
    openGraph: {
      images: [{ url: `${url}/opengraph-image` }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const url = `/articles/${slug}`;
  const p = pages.find((x) => x.url === url);
  if (!p) notFound();
  const body = tildaBodies[url];
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${url}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title ?? "Статья",
    description: p.description ?? undefined,
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Статьи", item: `${siteUrl}/articles` },
      { "@type": "ListItem", position: 3, name: p.title ?? slug, item: pageUrl },
    ],
  };

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <JsonLd data={jsonLd} />
        <JsonLd data={breadcrumbLd} />
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink/70">
          <Link href="/articles" className="hover:text-ink">
            Статьи
          </Link>
          <span aria-hidden>•</span>
          <span className="text-ink/80">{p.title ?? slug}</span>
        </div>

        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {p.title ?? "Статья"}
        </h1>
        {p.description ? <p className="mt-3 text-sm text-ink/70">{p.description}</p> : null}

        <article className="mt-8 rounded-3xl border border-border bg-bg p-6">
          {body ? (
            <TildaBody text={body} />
          ) : (
            <p className="text-sm text-ink/80">
              Текст статьи пока не найден в экспорте. Если пришлёте материалы — добавим полноценную
              версию.
            </p>
          )}
        </article>

        <div className="mt-10">
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
