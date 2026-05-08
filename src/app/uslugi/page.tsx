import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pages } from "@/content/pages";
import type { PageDef } from "@/content/pages";
import { canonicalServiceSlugs } from "@/content/canonical";

export function generateMetadata(): Metadata {
  const p = pages.find((x) => x.url === "/uslugi");
  return {
    title: p?.title ?? "Услуги",
    description: p?.description ?? "Демонтажные услуги в Москве и МО. Подберём решение под задачу.",
    alternates: { canonical: "/uslugi" },
  };
}

export default function ServicesIndexPage() {
  const list = canonicalServiceSlugs
    .map((slug) => pages.find((p) => p.url === `/uslugi/${slug}`))
    .filter((p): p is PageDef => Boolean(p));

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Услуги</h1>
        <p className="mt-3 text-sm text-ink/70">
          Выберите услугу или оставьте заявку — мы уточним детали и рассчитаем стоимость.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <Link
              key={s.url}
              href={s.url}
              className="rounded-3xl border border-border bg-bg p-5 hover:bg-surface"
            >
              <p className="text-base font-semibold">{s.title ?? s.url}</p>
              {s.description ? <p className="mt-2 text-sm text-ink/70">{s.description}</p> : null}
              <p className="mt-4 text-sm font-medium text-ink/80">Подробнее →</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
