import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceListingGrid } from "@/components/uslugi/ServiceListingGrid";
import { canonicalServiceSlugs } from "@/content/canonical";
import type { CanonicalServiceSlug } from "@/content/canonical";
import { pages } from "@/content/pages";
import { serviceCoverUrls } from "@/content/serviceCoverUrls";
import { services } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";

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
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pb-22 md:pt-12">
        <Reveal>
          <section className="relative mb-11 overflow-hidden rounded-[2rem] border border-black/[0.06] bg-gradient-to-br from-bg via-surface to-brand/12 px-6 py-9 shadow-soft md:mb-14 md:px-9 md:py-11">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-ink/40">
              (04) Полный каталог
            </p>
            <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(1.875rem,1.2rem+2.35vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.032em] text-ink">
              Услуги
            </h1>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink/72">
              Выберите услугу или оставьте заявку — мы уточним детали и рассчитаем стоимость.
            </p>
            <p className="mt-5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink/45">
              В каталоге: {list.length} услуг
            </p>
          </section>
        </Reveal>

        <ServiceListingGrid
          items={list.map(({ href, title, description, coverUrl }) => ({
            href,
            title,
            description,
            coverUrl,
          }))}
        />
      </main>
      <Footer />
    </div>
  );
}
