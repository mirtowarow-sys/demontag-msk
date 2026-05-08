import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pages } from "@/content/pages";
import { canonicalServiceSlugs } from "@/content/canonical";
import { services } from "@/content/services";

export function generateMetadata(): Metadata {
  const p = pages.find((x) => x.url === "/uslugi");
  return {
    title: p?.title ?? "Услуги",
    description: p?.description ?? "Демонтажные услуги в Москве и МО. Подберём решение под задачу.",
    alternates: { canonical: "/uslugi" },
  };
}

export default function ServicesIndexPage() {
  type Card = { href: string; title: string; description?: string };

  const list = canonicalServiceSlugs
    .map((slug): Card | null => {
      const href = `/uslugi/${slug}`;
      const p = pages.find((x) => x.url === href);
      const svc = services.find((s) => s.id === slug);
      if (!p && !svc) return null;
      return {
        href,
        title: p?.title ?? svc?.title ?? href,
        description: p?.description ?? svc?.description ?? undefined,
      };
    })
    .filter((s): s is Card => Boolean(s));

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
              key={s.href}
              href={s.href}
              className="rounded-3xl border border-border bg-bg p-5 hover:bg-surface"
            >
              <p className="text-base font-semibold">{s.title}</p>
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
