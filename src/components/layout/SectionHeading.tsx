import { cn } from "@/lib/utils";

type Props = {
  /** Например (02) Социальное доказательство — в духе крупных лендингов */
  tag: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ tag, title, description, className }: Props) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">{tag}</p>
      <h2 className="font-display mt-3 text-[clamp(1.5rem,1.1rem+1.9vw,2.35rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink/72">{description}</p>
      ) : null}
    </div>
  );
}
