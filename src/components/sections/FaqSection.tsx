import { faq } from "@/content/faq";

export function FaqSection() {
  return (
    <section id="faq" className="py-10">
      <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
      <p className="mt-2 text-sm text-ink/70">Ответы на частые вопросы.</p>

      <div className="mt-6 space-y-3">
        {faq.map((item) => (
          <details key={item.question} className="rounded-3xl border border-border bg-bg p-5 open:bg-surface">
            <summary className="cursor-pointer list-none text-sm font-semibold">
              {item.question}
            </summary>
            <p className="mt-3 text-sm text-ink/80">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

