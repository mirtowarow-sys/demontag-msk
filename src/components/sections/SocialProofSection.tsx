import { stats } from "@/content/stats";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardClass } from "@/lib/card-styles";
import { Reveal } from "@/components/motion/Reveal";

export function SocialProofSection() {
  return (
    <section id="social-proof" className="scroll-mt-28 py-14 md:py-16">
      <Reveal>
        <SectionHeading
          tag="(02) Прозрачность"
          title="Работаем понятными сроками и сметой"
          description="Коротко о том, как устроен процесс и что мы гарантируем клиентам."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={`${s.value}:${s.label}`} delay={i * 0.05}>
            <div className={`flex flex-col px-6 py-[1.35rem] ${mutedCardClass}`}>
              <div className="font-display text-[1.875rem] font-semibold tracking-[-0.03em] text-ink">
                {s.value}
              </div>
              <div className="mt-2 text-[0.9rem] font-semibold">{s.label}</div>
              {s.description ? (
                <div className="mt-2 text-[0.8125rem] leading-relaxed text-ink/70">
                  {s.description}
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
