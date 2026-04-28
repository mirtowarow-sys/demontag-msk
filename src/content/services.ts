export type ServiceItem = {
  id: string;
  title: string;
  description?: string;
};

export const services: ServiceItem[] = [
  { id: "demontazh_stjazhki", title: "Демонтаж стяжки пола" },
  { id: "demontazh_potolka", title: "Демонтаж натяжного потолока" },
  { id: "demontazh-inzhenernyh-setej-i-kommunikacij", title: "Демонтаж коммуникаций" },
  { id: "demontazh-santehkabiny", title: "Демонтаж сантехкабины" },
  { id: "demontazh-doma", title: "Демонтаж дома" },
  { id: "demontazh-metallokonstrukcij", title: "Демонтаж металлоконструкций" },
  { id: "vyvoz-musora-posle-demontazha", title: "Вывоз строительного мусора после демонтажа" },
  { id: "almaznaya-rezka", title: "Алмазная резка" },
  { id: "demontazh-sten", title: "Демонтаж стен и перегородок" },
];
