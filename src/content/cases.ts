export type CaseItem = {
  id: string;
  title: string;
  location?: string;
  description?: string;
};

// TODO: заменить на реальные кейсы/фото из раздела "Наши работы" (Tilda экспорт)
export const cases: CaseItem[] = [
  {
    id: "case-1",
    title: "Демонтаж перегородок в квартире",
    location: "Москва",
    description: "Аккуратный демонтаж, вывоз мусора, соблюдение правил тишины.",
  },
  {
    id: "case-2",
    title: "Демонтаж стяжки пола",
    location: "МО",
    description: "Быстрые сроки, подготовка к ремонту, уборка после работ.",
  },
  {
    id: "case-3",
    title: "Демонтаж сантехкабины",
    location: "Москва",
    description: "Разбор с выносом и утилизацией, без лишнего шума.",
  },
];

