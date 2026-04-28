import { services } from "@/content/services";
import { serviceCategories } from "@/content/utp";
import { Badge } from "@/components/ui/Badge";

export function ServicesSection() {
  return (
    <section id="services" className="py-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Услуги</h2>
          <p className="mt-2 text-sm text-ink/70">
            Демонтажные работы под задачу — от частичного демонтажа до «под ключ».
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {serviceCategories.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.id} className="rounded-3xl border border-border bg-bg p-5 hover:bg-surface">
            <h3 className="text-base font-semibold">{s.title}</h3>
            {s.description ? <p className="mt-2 text-sm text-ink/70">{s.description}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

