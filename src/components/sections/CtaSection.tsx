import { LeadForm } from "@/components/forms/LeadForm";
import { leadForms } from "@/content/cta";
import { keyBenefits } from "@/content/utp";

export function CtaSection() {
  const mainLeadForm = leadForms.find((f) => f.id === "form570548798") ?? leadForms[0];

  return (
    <section id="cta" className="py-10">
      <div className="grid gap-6 rounded-3xl bg-surface p-6 md:grid-cols-2 md:p-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Рассчитать стоимость работ</h2>
          <p className="mt-2 text-sm text-ink/70">
            Оставьте контакты — мы перезвоним и уточним детали. Рассчитаем смету без скрытых платежей.
          </p>

          {keyBenefits.length ? (
            <ul className="mt-5 space-y-2 text-sm text-ink/80">
              {keyBenefits.slice(0, 4).map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="rounded-3xl border border-border bg-bg p-5 md:p-6">
          <LeadForm submitLabel={mainLeadForm?.submitLabel ?? "Отправить"} />
        </div>
      </div>
    </section>
  );
}

