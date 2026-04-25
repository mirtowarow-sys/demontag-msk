import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full resize-y rounded-2xl border border-border bg-bg px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-ink focus:ring-2 focus:ring-brand",
        className,
      )}
      {...props}
    />
  );
}

