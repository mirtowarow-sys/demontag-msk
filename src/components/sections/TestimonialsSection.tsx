import { testimonials } from "@/content/testimonials";

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Отзывы</h2>
          <p className="mt-2 text-sm text-ink/70">Что говорят клиенты о нашей работе.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={`${t.name}:${t.text.slice(0, 16)}`} className="rounded-3xl border border-border bg-bg p-5">
            <blockquote className="text-sm text-ink/80">“{t.text}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold">{t.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

