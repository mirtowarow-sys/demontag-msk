export type UtpBlock = {
  title: string;
  subtitle?: string;
  bullets?: string[];
};

export const hero: UtpBlock = {
  title: "Профессиональный демонтаж квартир в Москве и Подмосковье",
  subtitle: "Цена от 150 ₽/м²",
  bullets: ["Работаем в Москве и МО", "Звоните — мы на связи!"],
};

export const keyBenefits: string[] = [
  "Уложимся в срок или заплатим за каждый день просрочки",
  "Без предоплат, работают славяне. От 50 руб за м2",
  "Уберем в подъезде и решим все вопросы с соседями",
  "Короткие сроки, проф. инструмент.",
];

export const serviceCategories: string[] = ["ЧАСТИЧНЫЙ ДЕМОНТАЖ", "ПОД КЛЮЧ", "СНОС ДОМОВ, ПОСТРОЕК"];

export const discounts: UtpBlock = {
  title: "Скидки",
  bullets: ["Больше демонтажа, больше скидка!", "Скидка 25% на демонтаж", "Бесплатный выезд"],
};

