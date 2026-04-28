"use client";

import { contacts } from "@/content/contacts";
import { reachGoal } from "@/lib/metrics";

export function Footer() {
  return (
    <footer id="contacts" className="border-t border-border bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">Демонтаж МСК</p>
            <p className="mt-2 text-sm text-ink/70">Работаем в {contacts.city ?? "Москве и МО"}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Контакты</p>
            <a
              className="block text-sm text-ink/80 hover:text-ink"
              href={`tel:${contacts.phoneE164}`}
              onClick={() => reachGoal("phone_click", { placement: "footer" })}
            >
              {contacts.phoneDisplay}
            </a>
            <a
              className="block text-sm text-ink/80 hover:text-ink"
              href={`mailto:${contacts.email}`}
            >
              {contacts.email}
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Соцсети</p>
            <div className="flex flex-wrap gap-2">
              {contacts.socials.map((s) => (
                <a
                  key={`${s.type}:${s.href}`}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-ink hover:bg-surface"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-ink/60">© {new Date().getFullYear()} Демонтаж МСК</p>
      </div>
    </footer>
  );
}
