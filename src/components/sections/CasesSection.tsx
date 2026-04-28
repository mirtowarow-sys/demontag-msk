import { cases } from "@/content/cases";

export function CasesSection() {
  return (
    <section id="cases" className="py-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Наши работы</h2>
          <p className="mt-2 text-sm text-ink/70">
            Примеры объектов и типовых задач. Добавим фото и подробности после импорта кейсов.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {cases.map((c) => (
          <article key={c.id} className="rounded-3xl border border-border bg-bg p-5">
            <h3 className="text-base font-semibold">{c.title}</h3>
            {c.location ? <p className="mt-1 text-sm text-ink/70">{c.location}</p> : null}
            {c.description ? <p className="mt-3 text-sm text-ink/80">{c.description}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

