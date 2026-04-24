export type Cta = {
  id: string;
  label: string;
};

export type LeadField =
  | { type: "text"; name: string; label: string; required?: boolean }
  | { type: "phone"; name: string; label: string; required?: boolean }
  | { type: "email"; name: string; label: string; required?: boolean }
  | { type: "textarea"; name: string; label: string; required?: boolean };

export type LeadFormDef = {
  id: string;
  submitLabel: string;
  fields: LeadField[];
};

export const ctas: Cta[] = [
  { id: "calc_price", label: "Рассчитать стоимость" },
  { id: "get_price", label: "Узнать стоимость" },
  { id: "call_master", label: "Вызвать мастера" },
  { id: "order", label: "Заказать" },
  { id: "details", label: "Подробнее" },
  { id: "send", label: "Отправить" },
];

export const leadForms: LeadFormDef[] = [
  {
    id: "form570548798",
    submitLabel: "Узнать стоимость",
    fields: [
      { type: "text", name: "1. Тип объекта", label: "Тип объекта" },
      { type: "text", name: "Площадь объекта", label: "Площадь объекта" },
      { type: "text", name: "Тип демонтажа", label: "Тип демонтажа" },
      { type: "phone", name: "Phone", label: "Телефон", required: true },
      { type: "textarea", name: "Напишите подробности задачи не обязательно", label: "Подробности (не обязательно)" },
    ],
  },
  {
    id: "form570548799",
    submitLabel: "Вызвать мастера",
    fields: [
      { type: "text", name: "Name", label: "Имя" },
      { type: "phone", name: "Phone", label: "Телефон", required: true },
    ],
  },
  {
    id: "form570548825",
    submitLabel: "Отправить",
    fields: [
      { type: "text", name: "Name", label: "Имя" },
      { type: "phone", name: "Phone", label: "Телефон", required: true },
      { type: "email", name: "Email", label: "Email" },
      { type: "textarea", name: "Textarea", label: "Сообщение" },
    ],
  },
];

