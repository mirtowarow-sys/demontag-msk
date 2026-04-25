import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-full border border-border bg-bg px-4 text-ink outline-none transition-colors placeholder:text-muted focus:border-ink focus:ring-2 focus:ring-brand",
        className,
      )}
      {...props}
    />
  );
}

