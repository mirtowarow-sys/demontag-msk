import { cn } from "@/lib/utils";

type Props = {
  tag: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ tag, title, description, className }: Props) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="text-[0.65rem] font-semibold uppercase leading-normal tracking-[0.26em] text-ink/45">
        {tag}
      </p>
      <h2 className="mt-[0.9rem] text-[clamp(1.625rem,1.05rem+2.1vw,2.625rem)] font-extrabold leading-[1.06] tracking-[-0.045em] text-ink">
        {title}
      </h2>
      {description ? (
        <p className="mt-[0.85rem] max-w-xl text-[0.9375rem] leading-relaxed text-ink/68">
          {description}
        </p>
      ) : null}
    </div>
  );
}
