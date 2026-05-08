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
    <div className="grid gap-9 md:grid-cols-2">
      {items.map((a, i) => (
        <Reveal key={a.href} delay={Math.min(i * 0.06, 0.28)}>
          <Link
            href={a.href}
            className={`flex min-h-[9.75rem] flex-col p-[1.5rem] sm:p-[1.7rem] ${listingCardClass}`}
          >
            <p className="text-[1.15rem] font-extrabold leading-snug tracking-[-0.045em] text-ink">
              {a.title}
            </p>
            {a.description ? (
              <p className="mt-[0.9rem] text-[0.9rem] font-medium leading-relaxed text-ink/66">
                {a.description}
              </p>
            ) : null}
            <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.884rem] font-extrabold text-ink/72 transition-[gap,color] duration-300 group-hover:gap-2.5 group-hover:text-ink">
              Читать<span aria-hidden>→</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
