import { contacts } from "@/content/contacts";
import { hero } from "@/content/utp";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-balance text-3xl font-semibold tracking-tight">{hero.title}</h1>
      {hero.subtitle ? <p className="mt-2 text-lg text-black/70">{hero.subtitle}</p> : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          className="rounded-full bg-[--color-brand] px-5 py-3 font-medium text-black"
          href={`tel:${contacts.phoneE164}`}
        >
          Позвонить
        </a>
        <a className="rounded-full border px-5 py-3 font-medium" href={`mailto:${contacts.email}`}>
          Написать email
        </a>
      </div>
    </main>
  );
}

