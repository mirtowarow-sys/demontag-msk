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
import { Select, type SelectOption } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

export function LeadForm({
  onSubmitLead,
  submitLabel = "Отправить",
  serviceOptions,
}: {
  onSubmitLead?: (data: LeadInput) => Promise<void> | void;
  submitLabel?: string;
  serviceOptions?: SelectOption[];
}) {
  const schema = useMemo(
    () => leadSchema.pick({ name: true, phone: true, service: true, message: true }),
    [],
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Pick<LeadInput, "name" | "phone" | "service" | "message">>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", service: "", message: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    setServerSuccess(null);
    try {
      await onSubmitLead?.({
        name: values.name || undefined,
        phone: values.phone,
        service: values.service || undefined,
        message: values.message || undefined,
      });
      reachGoal("form_submit", { form: "lead" });
      setServerSuccess("Заявка отправлена. Мы скоро свяжемся с вами.");
      reset();
    } catch {
      setServerError("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="lead-name">Имя</Label>
          <Input
            id="lead-name"
            autoComplete="name"
            placeholder="Как к вам обращаться"
            {...register("name")}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div className="space-y-1">
          <Label htmlFor="lead-phone">Телефон</Label>
          <Input
            id="lead-phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7…"
            {...register("phone")}
          />
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>
        </div>
      </div>

      {serviceOptions?.length ? (
        <div className="space-y-1">
          <Label htmlFor="lead-service">Услуга</Label>
          <Select
            id="lead-service"
            placeholder="Выберите услугу"
            options={serviceOptions}
            defaultValue=""
            {...register("service")}
          />
          <ErrorMessage>{errors.service?.message}</ErrorMessage>
        </div>
      ) : null}

      <div className="space-y-1">
        <Label htmlFor="lead-message">Комментарий</Label>
        <Textarea
          id="lead-message"
          placeholder="Опишите задачу (не обязательно)"
          {...register("message")}
        />
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
