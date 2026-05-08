import { faq } from "@/content/faq";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardClass } from "@/lib/card-styles";
import { Reveal } from "@/components/motion/Reveal";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-28 py-14 md:py-16">
      <Reveal>
        <SectionHeading
          tag="(08) Вопросы"
          title="Частые вопросы"
          description="Коротко о договоре, сроках, шумных работах и вывозе мусора."
        />
      </Reveal>

      <div className="mt-12 space-y-4">
        {faq.map((item, i) => (
          <Reveal key={item.question} delay={Math.min(i * 0.04, 0.24)}>
            <details
              className={`group px-6 py-[1rem] [&[open]]:shadow-[inset_0_0_0_1px_rgba(223,229,234,0.95)] shadow-[inset_0_0_0_1px_rgba(223,229,234,0)] ${mutedCardClass}`}
            >
              <summary className="cursor-pointer select-none font-display text-[0.9625rem] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                {item.question}
              </summary>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-ink/74">{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
