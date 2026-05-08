import { cases } from "@/content/cases";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardClass } from "@/lib/card-styles";
import { premiumSectionWrap } from "@/lib/marketing-surfaces";
import { Reveal } from "@/components/motion/Reveal";

export function CasesSection() {
  return (
    <section id="cases" className={premiumSectionWrap}>
      <Reveal>
        <SectionHeading
          tag="(05) Портфолио"
          title="Примеры объектов и задач"
          description="Примеры объектов и типовых задач. Добавим фото и подробности после импорта кейсов."
        />
      </Reveal>

      <div className="mt-14 grid gap-[0.9375rem] lg:grid-cols-3 lg:gap-6">
        {cases.map((c, i) => (
          <Reveal key={c.id} delay={Math.min(i * 0.07, 0.28)}>
            <article className={`flex h-full min-h-[10.5rem] flex-col px-7 py-7 ${mutedCardClass}`}>
              <h3 className="text-[1.07rem] font-extrabold leading-snug tracking-[-0.03em] text-ink">
                {c.title}
              </h3>
              {c.location ? (
                <p className="mt-2 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink/45">
                  {c.location}
                </p>
              ) : null}
              {c.description ? (
                <p className="mt-5 flex-1 text-[0.884rem] leading-relaxed text-ink/68">
                  {c.description}
                </p>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
