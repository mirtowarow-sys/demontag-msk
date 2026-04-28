import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { submitLeadOrThrow } from "@/app/actions/leads";
import { contacts } from "@/content/contacts";
import { pages } from "@/content/pages";

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
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Контакты</h1>
        <p className="mt-3 text-sm text-ink/70">
          Работаем в {contacts.city ?? "Москве и МО"}. Позвоните или оставьте заявку — мы перезвоним
          и уточним детали.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <p className="text-sm font-semibold">Связаться с нами</p>
            <div className="mt-4 space-y-2 text-sm">
              <a className="block text-ink hover:text-ink/80" href={`tel:${contacts.phoneE164}`}>
                {contacts.phoneDisplay}
              </a>
              <a className="block text-ink hover:text-ink/80" href={`mailto:${contacts.email}`}>
                {contacts.email}
              </a>
            </div>

            {contacts.socials.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {contacts.socials.map((s) => (
                  <a
                    key={`${s.type}:${s.href}`}
                    className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-ink hover:bg-surface"
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

          <div className="rounded-3xl border border-border bg-bg p-6">
            <p className="text-sm font-semibold">Напишите нам</p>
            <p className="mt-2 text-sm text-ink/70">Ответим в ближайшее время.</p>
            <div className="mt-5">
              <ContactForm submitLabel="Отправить" onSubmitLead={submitLeadOrThrow} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
