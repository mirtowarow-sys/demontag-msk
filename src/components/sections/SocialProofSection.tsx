import { stats } from "@/content/stats";

export function SocialProofSection() {
  return (
    <section id="social-proof" className="py-10">
      <h2 className="text-2xl font-semibold tracking-tight">Работаем прозрачно</h2>
      <p className="mt-2 text-sm text-ink/70">Коротко о том, как устроен процесс и что мы гарантируем.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={`${s.value}:${s.label}`} className="rounded-3xl border border-border bg-bg p-5">
            <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
            <div className="mt-1 text-sm font-medium">{s.label}</div>
            {s.description ? <div className="mt-2 text-sm text-ink/70">{s.description}</div> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

