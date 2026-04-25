import { cn } from "@/lib/utils";

import { useEffect } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!open) return null;

  // Basic UX: ESC to close + lock page scroll while open
  // (kept dependency-free; good enough for stage 2)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Закрыть"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:w-[560px] md:-translate-x-1/2">
        <div className={cn("rounded-3xl bg-bg p-6 text-ink shadow-[var(--shadow-soft)]", className)}>
          {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
          <div className={cn(title ? "mt-4" : undefined)}>{children}</div>
        </div>
      </div>
    </div>
  );
}

