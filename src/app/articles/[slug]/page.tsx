import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pages } from "@/content/pages";
import { CtaSection } from "@/components/sections/CtaSection";

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
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const url = `/articles/${slug}`;
  const p = pages.find((x) => x.url === url);
  if (!p) notFound();

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
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

        <article className="prose prose-invert mt-8 max-w-none">
          <p>
            Эта страница подготовлена на основе структуры старого сайта. Полный текст статьи мы
            добавим на следующем шаге (из экспорта/материалов клиента).
          </p>
        </article>

        <div className="mt-10">
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
