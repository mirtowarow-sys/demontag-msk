import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-label="Загрузка"
      className={cn(
        "inline-block size-4 animate-spin rounded-full border-2 border-ink/20 border-t-ink",
        className,
      )}
    />
  );
}

