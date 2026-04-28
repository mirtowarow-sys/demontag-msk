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

export function CallbackForm({
  onSubmitLead,
  submitLabel = "Отправить",
}: {
  onSubmitLead?: (data: LeadInput) => Promise<void> | void;
  submitLabel?: string;
}) {
  const schema = useMemo(() => leadSchema.pick({ phone: true }), []);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Pick<LeadInput, "phone">>({
    resolver: zodResolver(schema),
    defaultValues: { phone: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    setServerSuccess(null);
    try {
      await onSubmitLead?.({ phone: values.phone });
      reachGoal("form_submit", { form: "callback" });
      setServerSuccess("Спасибо! Мы скоро свяжемся с вами.");
      reset();
    } catch {
      setServerError("Не удалось отправить. Попробуйте ещё раз.");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="callback-phone">Телефон</Label>
        <Input id="callback-phone" inputMode="tel" placeholder="+7…" {...register("phone")} />
        <ErrorMessage>{errors.phone?.message}</ErrorMessage>
      </div>

      {serverError ? <ErrorMessage>{serverError}</ErrorMessage> : null}
      {serverSuccess ? <p className="text-sm text-ink/80">{serverSuccess}</p> : null}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        {submitLabel}
      </Button>
    </form>
  );
}
