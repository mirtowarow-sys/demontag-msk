import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#dbeaf7] bg-gradient-to-b from-[#ffffff] to-[#f8fcff] px-[0.7rem] py-[0.35rem] text-[0.75rem] font-bold text-ink/83 shadow-[0_6px_18px_-10px_rgba(12,40,76,0.18)]",
        className,
      )}
      {...props}
    />
  );
}
