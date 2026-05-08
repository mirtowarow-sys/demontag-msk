import { keyBenefits, discounts } from "@/content/utp";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardClass } from "@/lib/card-styles";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturesSection() {
  return (
    <section id="about" className="scroll-mt-28 py-14 md:py-16">
      <div className="grid gap-12 md:grid-cols-2 md:gap-14">
        <Reveal>
          <div>
            <SectionHeading
              tag="(03) О команде и подходе"
              title="Почему выбирают нас"
              description="Работаем по смете, соблюдаем сроки и берём на себя организацию вывоза мусора."
            />

            {discounts.title ? (
              <div className="mt-8">
                <p className="text-[0.875rem] font-semibold">{discounts.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {discounts.bullets?.slice(0, 3).map((b) => (
                    <Badge key={b}>{b}</Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Reveal>

        <div className="grid gap-[0.875rem] sm:grid-cols-2">
          {keyBenefits.map((b, i) => (
            <Reveal key={b} delay={i * 0.055}>
              <div className={`flex h-full px-6 py-[1.35rem] ${mutedCardClass}`}>
                <p className="text-[0.9rem] font-medium leading-relaxed">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
