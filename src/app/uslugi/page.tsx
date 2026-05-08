import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { canonicalServiceSlugs } from "@/content/canonical";
import type { CanonicalServiceSlug } from "@/content/canonical";
import { pages } from "@/content/pages";
import { serviceCoverUrls } from "@/content/serviceCoverUrls";
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
  type Card = {
    slug: CanonicalServiceSlug;
    href: string;
    title: string;
    description?: string;
    coverUrl: string;
  };

  const list = canonicalServiceSlugs
    .map((slug): Card | null => {
      const href = `/uslugi/${slug}`;
      const p = pages.find((x) => x.url === href);
      const svc = services.find((s) => s.id === slug);
      if (!p && !svc) return null;
      return {
        slug,
        href,
        title: p?.title ?? svc?.title ?? href,
        description: p?.description ?? svc?.description ?? undefined,
        coverUrl: serviceCoverUrls[slug],
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
        <p className="mt-2 text-xs text-ink/50">В каталоге: {list.length} услуг</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-bg transition hover:border-ink/20 hover:bg-surface"
            >
              <div className="relative aspect-[5/4] bg-surface sm:aspect-[16/11]">
                <Image
                  src={s.coverUrl}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col p-5">
                <p className="line-clamp-2 text-base font-semibold">{s.title}</p>
                {s.description ? (
                  <p className="mt-2 line-clamp-3 text-sm text-ink/70">{s.description}</p>
                ) : null}
                <p className="mt-4 text-sm font-medium text-ink/80">Подробнее →</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
