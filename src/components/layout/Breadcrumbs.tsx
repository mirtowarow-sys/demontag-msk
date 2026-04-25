"use client";

import Link from "next/link";

export type BreadcrumbItem = {
  href: string;
  label: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav aria-label="Хлебные крошки" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-ink/70">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={it.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-ink">{it.label}</span>
              ) : (
                <Link className="hover:text-ink" href={it.href}>
                  {it.label}
                </Link>
              )}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

