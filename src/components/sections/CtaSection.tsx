import { LeadForm } from "@/components/forms/LeadForm";
import { leadForms } from "@/content/cta";
import { keyBenefits } from "@/content/utp";
import { submitLeadOrThrow } from "@/app/actions/leads";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { mutedCardClass } from "@/lib/card-styles";

export function CtaSection() {
  const mainLeadForm = leadForms.find((f) => f.id === "form570548798") ?? leadForms[0];

  return (
    <section id="cta" className="scroll-mt-28 py-14 md:py-16">
      <Reveal>
        <SectionHeading
          tag="(07) Заявка"
          title="Узнайте стоимость работ"
          description="Оставьте контакты — мы перезвоним и уточним детали. Рассчитаем смету без скрытых платежей."
        />
      </Reveal>

      <div className="mt-12 grid gap-10 rounded-[1.5rem] border border-black/[0.07] bg-gradient-to-br from-surface via-bg to-brand/[0.09] p-8 shadow-soft md:grid-cols-2 md:gap-12 md:p-12">
        <Reveal delay={0.05}>
          {keyBenefits.length ? (
            <ul className="space-y-3 text-[0.9rem] text-ink/78">
              {keyBenefits.slice(0, 4).map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed">
                  <span className="mt-[0.4rem] size-2 shrink-0 rounded-full bg-brand shadow-[0_0_12px_-2px_rgba(255,203,46,0.95)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          <div className={`p-[1.25rem] sm:p-[1.5rem] ${mutedCardClass} bg-bg/92`}>
            <LeadForm
              submitLabel={mainLeadForm?.submitLabel ?? "Отправить"}
              onSubmitLead={submitLeadOrThrow}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
