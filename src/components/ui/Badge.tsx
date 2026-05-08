import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/[0.07] bg-bg/80 px-3 py-1 text-[0.75rem] font-medium text-ink/88 shadow-[0_1px_4px_rgba(28,36,48,0.04)] backdrop-blur-[2px]",
        className,
      )}
      {...props}
    />
  );
}
