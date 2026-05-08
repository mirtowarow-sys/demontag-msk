"use client";

import { contacts } from "@/content/contacts";
import { reachGoal } from "@/lib/metrics";

export function Footer() {
  return (
    <footer id="contacts" className="border-t border-[#cddcea] bg-white/93 backdrop-blur-md">
      <div className="mx-auto max-w-[92rem] px-5 py-[2.85rem] md:px-10">
        <div className="grid gap-11 md:grid-cols-3 md:gap-12">
          <div>
            <p className="text-[1rem] font-extrabold tracking-[-0.05em] text-ink md:text-[1.05rem]">
              Демонтаж МСК
            </p>
            <p className="mt-3 text-[0.875rem] font-medium leading-relaxed text-ink/64">
              Работаем в {contacts.city ?? "Москве и МО"}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-ink/40">
              Контакты
            </p>
            <a
              className="block text-[0.9rem] font-bold text-ink/78 hover:text-ink"
              href={`tel:${contacts.phoneE164}`}
              onClick={() => reachGoal("phone_click", { placement: "footer" })}
            >
              {contacts.phoneDisplay}
            </a>
            <a
              className="block text-[0.884rem] font-semibold text-ink/72 hover:text-ink"
              href={`mailto:${contacts.email}`}
            >
              {contacts.email}
            </a>
          </div>

          <div className="space-y-3">
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-ink/40">
              Соцсети
            </p>
            <div className="flex flex-wrap gap-2.5">
              {contacts.socials.map((s) => (
                <a
                  key={`${s.type}:${s.href}`}
                  className="rounded-full border border-[#dbe6f5] bg-white px-[0.9rem] py-2 text-[0.75rem] font-bold uppercase tracking-wide text-ink/75 shadow-[0_8px_24px_-16px_rgba(12,40,76,0.2)] hover:border-[#b8cae2]"
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

        <p className="mt-12 border-t border-[#e7eef9] pt-8 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-ink/44">
          © {new Date().getFullYear()} Демонтаж МСК
        </p>
      </div>
    </footer>
  );
}
