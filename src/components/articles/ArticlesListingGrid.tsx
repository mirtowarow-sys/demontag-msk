"use client";

import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { listingCardClass } from "@/lib/card-styles";

export type ArticleCardPayload = {
  href: string;
  title: string;
  description: string | null;
};

export function ArticlesListingGrid({ items }: { items: ArticleCardPayload[] }) {
  return (
    <div className="mt-10 grid gap-7 md:grid-cols-2">
      {items.map((a, i) => (
        <Reveal key={a.href} delay={Math.min(i * 0.06, 0.28)}>
          <Link href={a.href} className={`flex flex-col p-6 ${listingCardClass}`}>
            <p className="font-display text-[1.15rem] font-semibold tracking-[-0.012em]">
              {a.title}
            </p>
            {a.description ? (
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink/72">{a.description}</p>
            ) : null}
            <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-ink/85 transition group-hover:gap-2.5">
              Читать
              <span aria-hidden className="text-base">
                →
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
