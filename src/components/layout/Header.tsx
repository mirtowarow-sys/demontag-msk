"use client";

import Link from "next/link";
import { useState } from "react";

import { contacts } from "@/content/contacts";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

const nav = [
  { href: "#services", label: "Услуги" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#about", label: "О компании" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Демонтаж МСК
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((i) => (
            <a key={i.href} href={i.href} className="text-sm text-ink/80 hover:text-ink">
              {i.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a className="text-sm font-medium text-ink hover:text-ink/80" href={`tel:${contacts.phoneE164}`}>
            {contacts.phoneDisplay}
          </a>
          <Button onClick={() => setOpen(true)} variant="primary" size="sm">
            Рассчитать стоимость
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
          aria-label="Меню"
          onClick={() => setOpen(true)}
        >
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="sr-only">Открыть меню</span>
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} />
    </header>
  );
}

