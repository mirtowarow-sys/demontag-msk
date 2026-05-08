import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { submitLeadOrThrow } from "@/app/actions/leads";
import { contacts } from "@/content/contacts";
import { pages } from "@/content/pages";
import { pageHeroBandClass } from "@/lib/marketing-surfaces";
import { mutedCardClass } from "@/lib/card-styles";

export function generateMetadata(): Metadata {
  const p = pages.find((x) => x.url === "/contact");
  return {
    title: p?.title ?? "Контакты",
    description:
      p?.description ?? "Контакты компании. Позвоните или напишите — ответим и проконсультируем.",
    alternates: { canonical: "/contact" },
  };
}

export default function ContactPage() {
  const card = mutedCardClass;

  return (
    <div className="min-h-full bg-bg">
      <Header />
      <main className="mx-auto max-w-[92rem] px-5 pb-[4.75rem] pt-11 md:px-10 md:pb-[5.75rem]">
        <section className={pageHeroBandClass}>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-ink/45">
            (09) Контакты
          </p>
          <h1 className="mt-[0.85rem] text-[clamp(1.85rem,1.1rem+2.85vw,2.75rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-ink">
            Контакты
          </h1>
          <p className="mt-[0.9rem] max-w-2xl text-[0.95rem] font-medium leading-relaxed text-ink/66 md:text-[1.02rem]">
            Работаем в {contacts.city ?? "Москве и МО"}. Позвоните или оставьте заявку — мы
            перезвоним и уточним детали.
          </p>
        </section>

        <div className="mt-12 grid gap-7 lg:gap-10 md:grid-cols-2">
          <div className={`p-[1.4rem] md:p-[1.65rem] ${card}`}>
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-ink/40">
              Связаться с нами
            </p>
            <div className="mt-5 space-y-2">
              <a
                className="block text-[0.9175rem] font-bold tabular-nums text-ink/85 hover:text-ink"
                href={`tel:${contacts.phoneE164}`}
              >
                {contacts.phoneDisplay}
              </a>
              <a
                className="block text-[0.9rem] font-semibold text-ink/75 hover:text-ink"
                href={`mailto:${contacts.email}`}
              >
                {contacts.email}
              </a>
            </div>

            {contacts.socials.length ? (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {contacts.socials.map((s) => (
                  <a
                    key={`${s.type}:${s.href}`}
                    className="rounded-full border border-[#dbe6f5] bg-white px-3 py-[0.45rem] text-[0.72rem] font-bold uppercase tracking-wide text-ink/72 shadow-[0_8px_24px_-16px_rgba(12,40,76,0.16)] hover:border-[#b8cae2]"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className={`p-[1.4rem] md:p-[1.65rem] ${card}`}>
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-ink/40">
              Напишите нам
            </p>
            <p className="mt-[0.75rem] text-[0.9rem] leading-relaxed text-ink/64">
              Ответим в ближайшее время.
            </p>
            <div className="mt-6">
              <ContactForm submitLabel="Отправить" onSubmitLead={submitLeadOrThrow} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
