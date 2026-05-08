import { faq } from "@/content/faq";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardClass } from "@/lib/card-styles";
import { premiumSectionWrap } from "@/lib/marketing-surfaces";
import { Reveal } from "@/components/motion/Reveal";

export function FaqSection() {
  return (
    <section id="faq" className={premiumSectionWrap}>
      <Reveal>
        <SectionHeading
          tag="(08) Вопросы"
          title="Частые вопросы"
          description="Коротко о договоре, сроках, шумных работах и вывозе мусора."
        />
      </Reveal>

      <div className="mt-14 space-y-3.5">
        {faq.map((item, i) => (
          <Reveal key={item.question} delay={Math.min(i * 0.04, 0.24)}>
            <details
              className={`group px-[1.25rem] py-[1.15rem] ${mutedCardClass} open:shadow-[0_16px_48px_-32px_rgba(12,40,76,0.16)]`}
            >
              <summary className="cursor-pointer select-none text-[0.9525rem] font-extrabold leading-snug tracking-[-0.028em] text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
              </summary>
              <p className="mt-[0.9rem] pb-1 text-[0.875rem] leading-relaxed text-ink/68">
                {item.answer}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
