import Link from "next/link";

import { services } from "@/content/services";
import { serviceCategories } from "@/content/utp";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardInteractiveClass } from "@/lib/card-styles";
import { Reveal } from "@/components/motion/Reveal";

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-28 py-14 md:py-16">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <SectionHeading
            tag="(04) Направления"
            title="Демонтажные услуги"
            description="Подберём технологию и состав бригады под тип объекта и срок."
          />
        </Reveal>

        <Reveal
          delay={0.06}
          className="flex flex-shrink-0 flex-wrap gap-2 md:max-w-xl md:justify-end"
        >
          {serviceCategories.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={Math.min(i * 0.05, 0.32)}>
            <Link
              href={`/uslugi/${s.id}`}
              className={`flex h-full flex-col px-[1.2rem] py-[1.35rem] ${mutedCardInteractiveClass}`}
            >
              <h3 className="font-display text-[1.08rem] font-semibold tracking-[-0.015em]">
                {s.title}
              </h3>
              {s.description ? (
                <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-ink/72">
                  {s.description}
                </p>
              ) : null}
              <span className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-ink/80">
                Подробнее <span aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12} className="mt-12">
        <Link
          href="/uslugi"
          className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-bg px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-surface"
        >
          Смотреть все услуги
          <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
