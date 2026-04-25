import { cn } from "@/lib/utils";

export function ErrorMessage({ className, children }: { className?: string; children?: string }) {
  if (!children) return null;
  return <p className={cn("text-sm text-red-600", className)}>{children}</p>;
}

