import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardClass } from "@/lib/card-styles";
import { premiumSectionWrap } from "@/lib/marketing-surfaces";
import { Reveal } from "@/components/motion/Reveal";

export function TestimonialsSection() {
  return (
    <section id="reviews" className={premiumSectionWrap}>
      <Reveal>
        <SectionHeading
          tag="(06) Отзывы"
          title="Что говорят клиенты"
          description="Отзывы о нашей работе — без выдумки, только живой опыт."
        />
      </Reveal>

      <div className="mt-14 grid gap-[0.9375rem] lg:grid-cols-3 lg:gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={`${t.name}:${t.text.slice(0, 16)}`} delay={Math.min(i * 0.08, 0.24)}>
            <figure className={`flex h-full flex-col px-[1.6rem] py-[1.55rem] ${mutedCardClass}`}>
              <div className="text-[3.25rem] font-extrabold leading-none text-brand/35" aria-hidden>
                «
              </div>
              <blockquote className="relative -mt-2 text-[0.913rem] font-medium leading-relaxed tracking-[-0.01em] text-ink/76">
                {t.text}
              </blockquote>
              <figcaption className="mt-auto pt-6 text-[0.875rem] font-extrabold tracking-[-0.02em] text-ink">
                {t.name}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
