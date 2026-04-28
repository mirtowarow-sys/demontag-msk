import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-medium text-ink/70">Ошибка 404</p>
      <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight">Страница не найдена</h1>
      <p className="mt-3 text-sm text-ink/70">
        Возможно, ссылка устарела или страница была перенесена. Перейдите на главную и выберите нужный раздел.
      </p>

      <div className="mt-8">
        <Link href="/">
          <Button>На главную</Button>
        </Link>
      </div>
    </main>
  );
}

