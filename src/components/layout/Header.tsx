"use client";

import Link from "next/link";
import { useState } from "react";

import { contacts } from "@/content/contacts";
import { submitLeadOrThrow } from "@/app/actions/leads";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Modal } from "@/components/ui/Modal";
import { LeadForm } from "@/components/forms/LeadForm";
import { reachGoal } from "@/lib/metrics";

const nav = [
  { href: "#services", label: "Услуги" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#about", label: "О компании" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#cddcea]/90 bg-[#fbfdff]/88 shadow-[0_18px_50px_-40px_rgba(12,40,76,0.45)] backdrop-blur-xl backdrop-saturate-150">
      <div className="hidden border-b border-white/10 bg-ink/95 text-white/86 md:block">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between px-10 py-2">
          <div className="flex items-center gap-4">
            <a
              className="text-[0.8125rem] font-bold tabular-nums tracking-tight text-white/90 hover:text-white"
              href={`tel:${contacts.phoneE164}`}
              onClick={() => reachGoal("phone_click", { placement: "topbar" })}
            >
              {contacts.phoneDisplay}
            </a>
            <a
              className="text-[0.8125rem] font-semibold text-white/80 hover:text-white"
              href={`mailto:${contacts.email}`}
            >
              {contacts.email}
            </a>
          </div>

          <div className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white/55">
            Москва и МО • Выезд и смета
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[92rem] items-center justify-between gap-4 px-5 py-[0.9rem] md:px-10">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-[-0.05em] text-ink sm:text-[1.2rem]"
        >
          Демонтаж МСК
        </Link>

        <nav className="hidden items-center gap-[1.7rem] md:flex">
          {nav.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-[0.875rem] font-semibold text-ink/67 transition hover:text-ink"
            >
              {i.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            className="text-[0.875rem] font-bold tabular-nums tracking-tight text-ink hover:text-ink/80"
            href={`tel:${contacts.phoneE164}`}
            onClick={() => reachGoal("phone_click", { placement: "header" })}
          >
            {contacts.phoneDisplay}
          </a>
          <Button
            onClick={() => {
              reachGoal("click_cta", { placement: "header" });
              setLeadOpen(true);
            }}
            variant="primary"
            size="sm"
            className="h-10 px-[1.1rem] font-bold shadow-[0_12px_32px_-10px_rgba(255,192,42,0.55)]"
          >
            Рассчитать стоимость
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-[#dbe6f5] bg-white/95 shadow-[0_12px_32px_-24px_rgba(12,40,76,0.35)] md:hidden"
          aria-label="Меню"
          onClick={() => setMenuOpen(true)}
        >
          <span className="block h-0.5 w-[1.375rem] bg-ink shadow-sm" />
          <span className="sr-only">Открыть меню</span>
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} nav={nav} />

      <Modal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        title="Рассчитать стоимость"
        className="p-4"
      >
        <LeadForm submitLabel="Отправить" onSubmitLead={submitLeadOrThrow} />
      </Modal>
    </header>
  );
}
