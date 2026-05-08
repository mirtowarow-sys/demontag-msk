"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { listingCardClass } from "@/lib/card-styles";

export type ServiceCardPayload = {
  href: string;
  title: string;
  description?: string;
  coverUrl: string;
};

export function ServiceListingGrid({ items }: { items: ServiceCardPayload[] }) {
  return (
    <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <Reveal key={s.href} delay={Math.min(i * 0.04, 0.36)}>
          <Link href={s.href} className={`flex flex-col overflow-hidden ${listingCardClass}`}>
            <div className="relative aspect-[5/4] bg-surface sm:aspect-[16/11]">
              <Image
                src={s.coverUrl}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col p-[1.15rem] sm:p-5">
              <p className="line-clamp-2 font-display text-[1.02rem] font-semibold tracking-[-0.01em] text-ink">
                {s.title}
              </p>
              {s.description ? (
                <p className="mt-2 line-clamp-3 text-[0.875rem] leading-relaxed text-ink/70">
                  {s.description}
                </p>
              ) : null}
              <span className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-ink/85 transition group-hover:gap-2.5">
                Подробнее
                <span aria-hidden className="-mt-px text-base">
                  →
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
