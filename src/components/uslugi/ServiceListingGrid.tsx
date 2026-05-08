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
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-9">
      {items.map((s, i) => (
        <Reveal key={s.href} delay={Math.min(i * 0.04, 0.36)}>
          <Link href={s.href} className={`flex flex-col overflow-hidden ${listingCardClass}`}>
            <div className="relative aspect-[5/4] bg-[#f0f7ff] sm:aspect-[16/11]">
              <Image
                src={s.coverUrl}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
              />
            </div>
            <div className="flex flex-col p-[1.15rem] sm:p-[1.35rem]">
              <p className="line-clamp-2 text-[1.04rem] font-extrabold leading-snug tracking-[-0.042em] text-ink md:text-[1.055rem]">
                {s.title}
              </p>
              {s.description ? (
                <p className="mt-[0.6rem] line-clamp-3 text-[0.875rem] leading-relaxed text-ink/64">
                  {s.description}
                </p>
              ) : null}
              <span className="mt-6 inline-flex items-center gap-[0.4rem] text-[0.875rem] font-extrabold text-ink/72 transition-[gap,color] duration-300 group-hover:gap-[0.55rem] group-hover:text-ink">
                Подробнее<span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
