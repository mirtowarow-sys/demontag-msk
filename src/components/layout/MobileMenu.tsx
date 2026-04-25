"use client";

import { contacts } from "@/content/contacts";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function MobileMenu({
  open,
  onClose,
  nav,
}: {
  open: boolean;
  onClose: () => void;
  nav: Array<{ href: string; label: string }>;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Меню" className="p-4">
      <div className="space-y-3">
        <nav className="grid gap-2">
          {nav.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="rounded-2xl px-3 py-2 text-sm font-medium text-ink hover:bg-surface"
              onClick={onClose}
            >
              {i.label}
            </a>
          ))}
        </nav>

        <div className="h-px bg-border" />

        <div className="space-y-2">
          <a className="block text-sm font-medium" href={`tel:${contacts.phoneE164}`}>
            {contacts.phoneDisplay}
          </a>
          <a className="block text-sm text-ink/80" href={`mailto:${contacts.email}`}>
            {contacts.email}
          </a>
          {contacts.whatsapp ? (
            <a className="block text-sm text-ink/80" href={contacts.whatsapp.href} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          ) : null}
        </div>

        <Button className="w-full justify-center" onClick={onClose}>
          Рассчитать стоимость
        </Button>
      </div>
    </Modal>
  );
}

