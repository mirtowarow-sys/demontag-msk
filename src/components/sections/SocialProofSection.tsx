import { stats } from "@/content/stats";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardClass } from "@/lib/card-styles";
import { premiumSectionWrap } from "@/lib/marketing-surfaces";
import { Reveal } from "@/components/motion/Reveal";

export function SocialProofSection() {
  return (
    <section id="social-proof" className={premiumSectionWrap}>
      <Reveal>
        <SectionHeading
          tag="(02) Прозрачность"
          title="Работаем понятными сроками и сметой"
          description="Коротко о том, как устроен процесс и что мы гарантируем клиентам."
        />
      </Reveal>

      <div className="mt-12 grid gap-[0.9375rem] sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {stats.map((s, i) => (
          <Reveal key={`${s.value}:${s.label}`} delay={i * 0.05}>
            <div className={`flex flex-col px-7 py-[1.4rem] ${mutedCardClass}`}>
              <div className="text-[1.9375rem] font-extrabold tracking-[-0.05em] text-ink">
                {s.value}
              </div>
              <div className="mt-2 text-[0.9rem] font-bold leading-snug text-ink/88">{s.label}</div>
              {s.description ? (
                <div className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink/64">
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
