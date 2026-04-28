"use client";

import { contacts } from "@/content/contacts";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { reachGoal } from "@/lib/metrics";

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
            <a
              className="block text-sm text-ink/80"
              href={contacts.whatsapp.href}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          ) : null}
        </div>

        <Button
          className="w-full justify-center"
          onClick={() => {
            reachGoal("click_cta", { placement: "mobile_menu" });
            if (typeof window !== "undefined") window.location.hash = "#cta";
            onClose();
          }}
        >
          Рассчитать стоимость
        </Button>
      </div>
    </Modal>
  );
}
