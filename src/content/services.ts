export type ServiceItem = {
  id: string;
  title: string;
  description?: string;
};

export const services: ServiceItem[] = [
  { id: "demontazh-styazhki", title: "Демонтаж стяжки пола" },
  { id: "demontazh-potolka", title: "Демонтаж натяжного потолока" },
  { id: "demontazh-kommunikacij", title: "Демонтаж коммуникаций" },
  { id: "demontazh-santehkabiny", title: "Демонтаж сантехкабины" },
  { id: "demontazh-doma", title: "Демонтаж дома" },
  { id: "demontazh-metallokonstrukcij", title: "Демонтаж металлоконструкций" },
  { id: "vyvoz-musora", title: "Вывоз строительного мусора после демонтажа" },
  { id: "almaznaya-rezka", title: "Алмазная резка" },
  { id: "demontazh-sten", title: "Демонтаж стен и перегородок" },
];

