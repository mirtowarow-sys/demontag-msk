import type { Metadata } from "next";

import { ArticlesListingGrid } from "@/components/articles/ArticlesListingGrid";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { canonicalArticleSlugs } from "@/content/canonical";
import { pages } from "@/content/pages";
import type { PageDef } from "@/content/pages";

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
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pb-22 md:pt-12">
        <Reveal>
          <section className="relative mb-11 overflow-hidden rounded-[2rem] border border-black/[0.06] bg-gradient-to-br from-bg via-surface to-brand/12 px-6 py-9 shadow-soft md:mb-14 md:px-9 md:py-11">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-ink/40">
              (06) Полезное
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.875rem,1.2rem+2.35vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.032em] text-ink">
              Статьи
            </h1>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink/72">
              Подборка материалов и ответов на частые вопросы.
            </p>
          </section>
        </Reveal>

        <ArticlesListingGrid
          items={list.map((a) => ({
            href: a.url,
            title: a.title ?? a.url,
            description: a.description,
          }))}
        />
      </main>
      <Footer />
    </div>
  );
}
