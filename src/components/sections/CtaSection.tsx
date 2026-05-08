import { LeadForm } from "@/components/forms/LeadForm";
import { leadForms } from "@/content/cta";
import { keyBenefits } from "@/content/utp";
import { submitLeadOrThrow } from "@/app/actions/leads";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { mutedCardClass } from "@/lib/card-styles";
import { premiumSectionWrap } from "@/lib/marketing-surfaces";

export function CtaSection() {
  const mainLeadForm = leadForms.find((f) => f.id === "form570548798") ?? leadForms[0];

  return (
    <section id="cta" className={premiumSectionWrap}>
      <Reveal>
        <SectionHeading
          tag="(07) Заявка"
          title="Узнайте стоимость работ"
          description="Оставьте контакты — мы перезвоним и уточним детали. Рассчитаем смету без скрытых платежей."
        />
      </Reveal>

      <div className="mt-14 grid gap-11 rounded-[2rem] border border-[#d9e8f9] bg-gradient-to-br from-[#f8fbff] via-white to-brand/[0.12] p-[1.6rem] ring-1 ring-white/95 shadow-strong md:grid-cols-2 md:gap-14 md:p-12 lg:p-14">
        <Reveal delay={0.05}>
          {keyBenefits.length ? (
            <ul className="space-y-[0.9rem] text-[0.915rem] text-ink/75">
              {keyBenefits.slice(0, 4).map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed">
                  <span className="mt-[0.35rem] size-2.5 shrink-0 rounded-full bg-brand shadow-[0_0_16px_-1px_rgba(255,203,46,1)] ring-4 ring-brand/15" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          <div className={`p-[1.35rem] sm:p-8 ${mutedCardClass} rounded-[1.75rem]`}>
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
