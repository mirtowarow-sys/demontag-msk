"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { leadSchema, type LeadInput } from "@/lib/schemas/lead";
import { reachGoal } from "@/lib/metrics";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

export function ContactForm({
  onSubmitLead,
  submitLabel = "Отправить",
}: {
  onSubmitLead?: (data: LeadInput) => Promise<void> | void;
  submitLabel?: string;
}) {
  const schema = useMemo(
    () => leadSchema.pick({ name: true, phone: true, email: true, message: true }),
    [],
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Pick<LeadInput, "name" | "phone" | "email" | "message">>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    setServerSuccess(null);
    if (!onSubmitLead) {
      setServerError("Форма временно недоступна. Пожалуйста, позвоните или напишите нам.");
      return;
    }
    try {
      await onSubmitLead({
        name: values.name || undefined,
        phone: values.phone,
        email: values.email || undefined,
        message: values.message || undefined,
      });
      reachGoal("form_submit", { form: "contact" });
      setServerSuccess("Сообщение отправлено. Мы скоро свяжемся с вами.");
      reset();
    } catch {
      setServerError("Не удалось отправить. Попробуйте ещё раз.");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="contact-name">Имя</Label>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Как к вам обращаться"
            {...register("name")}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div className="space-y-1">
          <Label htmlFor="contact-phone">Телефон</Label>
          <Input
            id="contact-phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7…"
            {...register("phone")}
          />
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </div>

      <div className="space-y-1">
        <Label htmlFor="contact-message">Сообщение</Label>
        <Textarea id="contact-message" placeholder="Опишите задачу" {...register("message")} />
        <ErrorMessage>{errors.message?.message}</ErrorMessage>
      </div>

      {serverError ? <ErrorMessage>{serverError}</ErrorMessage> : null}
      {serverSuccess ? <p className="text-sm text-ink/80">{serverSuccess}</p> : null}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        {submitLabel}
      </Button>
    </form>
  );
}
