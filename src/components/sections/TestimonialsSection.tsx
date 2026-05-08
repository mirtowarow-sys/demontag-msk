import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { mutedCardClass } from "@/lib/card-styles";
import { Reveal } from "@/components/motion/Reveal";

export function TestimonialsSection() {
  return (
    <section id="reviews" className="scroll-mt-28 py-14 md:py-16">
      <Reveal>
        <SectionHeading
          tag="(06) Отзывы"
          title="Что говорят клиенты"
          description="Отзывы о нашей работе — без выдумки, только живой опыт."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={`${t.name}:${t.text.slice(0, 16)}`} delay={Math.min(i * 0.08, 0.24)}>
            <figure className={`flex h-full flex-col px-7 py-[1.55rem] ${mutedCardClass}`}>
              <blockquote className="text-[0.9rem] leading-relaxed text-ink/76">
                «{t.text}»
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-[0.875rem] font-semibold">
                {t.name}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
