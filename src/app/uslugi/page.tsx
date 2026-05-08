import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceListingGrid } from "@/components/uslugi/ServiceListingGrid";
import { canonicalServiceSlugs } from "@/content/canonical";
import type { CanonicalServiceSlug } from "@/content/canonical";
import { pages } from "@/content/pages";
import { serviceCoverUrls } from "@/content/serviceCoverUrls";
import { services } from "@/content/services";
import { pageHeroBandClass } from "@/lib/marketing-surfaces";

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
    <div className="min-h-full bg-bg">
      <Header />
      <main className="mx-auto max-w-[92rem] px-5 pb-[4.5rem] pt-10 md:px-10 md:pb-[5.75rem] md:pt-12">
        <Reveal>
          <section className={pageHeroBandClass}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-ink/45">
              (04) Полный каталог
            </p>
            <h1 className="mt-[0.8rem] max-w-[22ch] text-[clamp(1.975rem,1.2rem+2.95vw,2.95rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-ink md:leading-[0.96]">
              Услуги
            </h1>
            <p className="mt-4 max-w-xl text-[0.9775rem] leading-relaxed text-ink/68 md:text-[1.03rem]">
              Выберите услугу или оставьте заявку — мы уточним детали и рассчитаем стоимость.
            </p>
            <p className="mt-[0.95rem] text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ink/38">
              В каталоге: {list.length} услуг
            </p>
          </section>
        </Reveal>

        <div className="mt-14">
          <ServiceListingGrid
            items={list.map(({ href, title, description, coverUrl }) => ({
              href,
              title,
              description,
              coverUrl,
            }))}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
