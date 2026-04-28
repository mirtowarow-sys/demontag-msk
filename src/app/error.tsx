"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-medium text-ink/70">Ошибка</p>
      <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight">
        Что-то пошло не так
      </h1>
      <p className="mt-3 text-sm text-ink/70">
        Попробуйте повторить действие. Если ошибка повторяется — вернитесь на главную.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset}>Повторить</Button>
        <Link href="/">
          <Button variant="outline">На главную</Button>
        </Link>
      </div>
    </main>
  );
}
