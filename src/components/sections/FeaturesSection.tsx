import { keyBenefits, discounts } from "@/content/utp";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardClass } from "@/lib/card-styles";
import { premiumSectionWrap } from "@/lib/marketing-surfaces";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturesSection() {
  return (
    <section id="about" className={premiumSectionWrap}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div>
            <SectionHeading
              tag="(03) О команде и подходе"
              title="Почему выбирают нас"
              description="Работаем по смете, соблюдаем сроки и берём на себя организацию вывоза мусора."
            />

            {discounts.title ? (
              <div className="mt-10">
                <p className="text-[0.875rem] font-bold text-ink/88">{discounts.title}</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {discounts.bullets?.slice(0, 3).map((b) => (
                    <Badge key={b}>{b}</Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Reveal>

        <div className="grid gap-[0.9375rem] sm:grid-cols-2 sm:gap-4">
          {keyBenefits.map((b, i) => (
            <Reveal key={b} delay={i * 0.055}>
              <div
                className={`flex min-h-[5.75rem] items-center px-[1.25rem] py-[1.25rem] sm:min-h-[6.75rem] sm:px-[1.4rem] ${mutedCardClass}`}
              >
                <p className="text-[0.9rem] font-semibold leading-snug text-ink/84">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
