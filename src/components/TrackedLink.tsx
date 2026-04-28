"use client";

import { reachGoal, type YandexGoal } from "@/lib/metrics";

export function TrackedLink({
  href,
  goal,
  params,
  className,
  children,
  target,
  rel,
}: {
  href: string;
  goal: YandexGoal;
  params?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => reachGoal(goal, params)}
    >
      {children}
    </a>
  );
}
