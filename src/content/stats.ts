export type StatItem = {
  value: string;
  label: string;
  description?: string;
};

// TODO: заменить на реальные цифры (согласовать с клиентом)
export const stats: StatItem[] = [
  {
    value: "0 ₽",
    label: "предоплата",
    description: "Оплата по смете и договорённости",
  },
  {
    value: "1 день",
    label: "выезд на оценку",
    description: "Часто в день обращения",
  },
  {
    value: "10:00–18:00",
    label: "шумные работы",
    description: "В будни, по правилам тишины",
  },
  {
    value: "25%",
    label: "скидка",
    description: "На демонтаж по акциям",
  },
];

