import { keyBenefits, discounts } from "@/content/utp";
import { Badge } from "@/components/ui/Badge";

export function FeaturesSection() {
  return (
    <section id="features" className="py-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Почему выбирают нас</h2>
          <p className="mt-2 text-sm text-ink/70">
            Работаем по смете, соблюдаем сроки и берём на себя организацию вывоза мусора.
          </p>

          {discounts.title ? (
            <div className="mt-5">
              <p className="text-sm font-semibold">{discounts.title}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {discounts.bullets?.slice(0, 3).map((b) => (
                  <Badge key={b}>{b}</Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {keyBenefits.map((b) => (
            <div key={b} className="rounded-3xl border border-border bg-bg p-5">
              <p className="text-sm font-medium">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

