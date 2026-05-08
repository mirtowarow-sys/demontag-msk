import { cases } from "@/content/cases";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardClass } from "@/lib/card-styles";
import { Reveal } from "@/components/motion/Reveal";

export function CasesSection() {
  return (
    <section id="cases" className="scroll-mt-28 py-14 md:py-16">
      <Reveal>
        <SectionHeading
          tag="(05) Портфолио"
          title="Примеры объектов и задач"
          description="Примеры объектов и типовых задач. Добавим фото и подробности после импорта кейсов."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cases.map((c, i) => (
          <Reveal key={c.id} delay={Math.min(i * 0.07, 0.28)}>
            <article className={`flex flex-col px-7 py-[1.5rem] ${mutedCardClass} h-full`}>
              <h3 className="font-display text-[1.1rem] font-semibold">{c.title}</h3>
              {c.location ? (
                <p className="mt-2 text-[0.8125rem] font-medium text-ink/55">{c.location}</p>
              ) : null}
              {c.description ? (
                <p className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-ink/75">
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
