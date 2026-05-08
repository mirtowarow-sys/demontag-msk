import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand font-bold text-black shadow-[0_10px_30px_-10px_rgba(255,196,52,0.55)] hover:bg-ink hover:text-brand",
  secondary: "bg-[#eaf0f9] font-semibold text-ink hover:bg-ink hover:text-bg",
  outline:
    "border border-[#cddcea] bg-white/92 font-semibold text-ink shadow-[0_8px_24px_-16px_rgba(12,40,76,0.12)] hover:border-[#9eb6d8] hover:bg-[#fafcff]",
  ghost: "bg-transparent font-semibold text-ink hover:bg-[#eaf0f9]/85",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner className="size-4 border-black/20 border-t-black" /> : null}
      <span className={cn(loading ? "opacity-90" : undefined)}>{children}</span>
    </button>
  );
}
