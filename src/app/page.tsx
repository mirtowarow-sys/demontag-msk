import { contacts } from "@/content/contacts";
import { hero } from "@/content/utp";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadForm } from "@/components/forms/LeadForm";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-balance text-3xl font-semibold tracking-tight">{hero.title}</h1>
        {hero.subtitle ? <p className="mt-2 text-lg text-ink/70">{hero.subtitle}</p> : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="rounded-full bg-brand px-5 py-3 font-medium text-black shadow-[var(--shadow-soft)]"
            href={`tel:${contacts.phoneE164}`}
          >
            Позвонить
          </a>
          <a
            className="rounded-full border border-border bg-bg px-5 py-3 font-medium text-ink"
            href={`mailto:${contacts.email}`}
          >
            Написать email
          </a>
        </div>

        <section id="services" className="mt-14 rounded-3xl bg-surface p-6">
          <h2 className="text-xl font-semibold">Рассчитать стоимость</h2>
          <p className="mt-2 text-sm text-ink/70">Оставьте контакты — мы перезвоним и уточним детали.</p>
          <div className="mt-5">
            <LeadForm submitLabel="Узнать стоимость" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

