import type { Metadata } from "next";

import { ArticlesListingGrid } from "@/components/articles/ArticlesListingGrid";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Reveal } from "@/components/motion/Reveal";
import { canonicalArticleSlugs } from "@/content/canonical";
import { pages } from "@/content/pages";
import type { PageDef } from "@/content/pages";
import { pageHeroBandClass } from "@/lib/marketing-surfaces";

export function generateMetadata(): Metadata {
  const p = pages.find((x) => x.url === "/articles");
  return {
    title: p?.title ?? "Статьи",
    description: p?.description ?? "Полезные статьи и новости по демонтажным работам.",
    alternates: { canonical: "/articles" },
  };
}

export default function ArticlesIndexPage() {
  const list = canonicalArticleSlugs
    .map((slug) => pages.find((p) => p.url === `/articles/${slug}`))
    .filter((p): p is PageDef => Boolean(p));

  return (
    <div className="min-h-full bg-bg">
      <Header />
      <main className="mx-auto max-w-[92rem] px-5 pb-[4.75rem] pt-10 md:px-10 md:pb-24 md:pt-12">
        <Reveal>
          <section className={pageHeroBandClass}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-ink/45">
              (06) Полезное
            </p>
            <h1 className="mt-[0.8rem] text-[clamp(1.975rem,1.2rem+2.95vw,2.95rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-ink md:leading-[0.96]">
              Статьи
            </h1>
            <p className="mt-4 max-w-xl text-[0.9775rem] leading-relaxed text-ink/68 md:text-[1.03rem]">
              Подборка материалов и ответов на частые вопросы.
            </p>
          </section>
        </Reveal>

        <div className="mt-14">
          <ArticlesListingGrid
            items={list.map((a) => ({
              href: a.url,
              title: a.title ?? a.url,
              description: a.description,
            }))}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
