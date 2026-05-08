import Link from "next/link";

import { services } from "@/content/services";
import { serviceCategories } from "@/content/utp";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardInteractiveClass } from "@/lib/card-styles";
import { premiumSectionWrap } from "@/lib/marketing-surfaces";
import { Reveal } from "@/components/motion/Reveal";

export function ServicesSection() {
  return (
    <section id="services" className={premiumSectionWrap}>
      <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
        <Reveal>
          <SectionHeading
            tag="(04) Направления"
            title="Демонтажные услуги"
            description="Подберём технологию и состав бригады под тип объекта и срок."
          />
        </Reveal>

        <Reveal
          delay={0.06}
          className="flex flex-shrink-0 flex-wrap gap-2.5 xl:max-w-[28rem] xl:justify-end"
        >
          {serviceCategories.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </Reveal>
      </div>

      <div className="mt-14 grid gap-[0.9375rem] sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={Math.min(i * 0.05, 0.32)}>
            <Link
              href={`/uslugi/${s.id}`}
              className={`flex min-h-[11.5rem] flex-col px-[1.25rem] py-[1.35rem] ${mutedCardInteractiveClass}`}
            >
              <h3 className="text-[1.065rem] font-extrabold leading-snug tracking-[-0.035em] text-ink">
                {s.title}
              </h3>
              {s.description ? (
                <p className="mt-3 flex-1 text-[0.8825rem] leading-relaxed text-ink/66">
                  {s.description}
                </p>
              ) : null}
              <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-extrabold text-ink/78 transition group-hover:text-ink">
                Подробнее <span aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.14} className="mt-14">
        <Link
          href="/uslugi"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#cddcea] bg-white px-6 text-[0.875rem] font-bold tracking-tight text-ink shadow-[0_14px_40px_-30px_rgba(12,40,80,0.35)] ring-1 ring-[#eef5ff]/90 transition hover:border-[#aabfd6]"
        >
          Смотреть все услуги<span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
