import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pages } from "@/content/pages";

export function generateMetadata(): Metadata {
  const p = pages.find((x) => x.url === "/articles");
  return {
    title: p?.title ?? "Статьи",
    description: p?.description ?? "Полезные статьи и новости по демонтажным работам.",
    alternates: { canonical: "/articles" },
  };
}

export default function ArticlesIndexPage() {
  const list = pages.filter((p) => p.url.startsWith("/articles/"));

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Статьи</h1>
        <p className="mt-3 text-sm text-ink/70">Подборка материалов и ответов на частые вопросы.</p>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {list.map((a) => (
            <Link
              key={a.url}
              href={a.url}
              className="rounded-3xl border border-border bg-bg p-6 hover:bg-surface"
            >
              <p className="text-base font-semibold">{a.title ?? a.url}</p>
              {a.description ? <p className="mt-2 text-sm text-ink/70">{a.description}</p> : null}
              <p className="mt-4 text-sm font-medium text-ink/80">Читать →</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
