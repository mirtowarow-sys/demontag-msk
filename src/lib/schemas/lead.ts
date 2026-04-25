import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80, "Слишком длинное имя").optional(),
  phone: z.string().trim().min(7, "Укажите телефон").max(30, "Слишком длинный телефон"),
  email: z.string().trim().email("Некорректный email").optional().or(z.literal("")),
  message: z.string().trim().max(2000, "Сообщение слишком длинное").optional(),
  service: z.string().trim().max(120, "Слишком длинное значение").optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

