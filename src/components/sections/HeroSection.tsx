import { contacts } from "@/content/contacts";
import { hero } from "@/content/utp";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TrackedLink } from "@/components/TrackedLink";

export function HeroSection() {
  return (
    <section className="py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            {hero.title}
          </h1>
          {hero.subtitle ? (
            <p className="mt-3 text-lg text-ink/70 md:text-xl">{hero.subtitle}</p>
          ) : null}

          {hero.bullets?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {hero.bullets.map((b) => (
                <Badge key={b}>{b}</Badge>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <TrackedLink
            href={`tel:${contacts.phoneE164}`}
            goal="phone_click"
            params={{ placement: "hero" }}
          >
            <Button className="w-full sm:w-auto">Позвонить</Button>
          </TrackedLink>
          <a href={`mailto:${contacts.email}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              Написать email
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
