// Canonical URLs from the current production site (demontagmsk.ru).
// Used to avoid duplicate/competing pages and to keep sitemap clean.

export const canonicalArticleSlugs = [
  "metody-demontazha",
  "opaznozti-pri-demontazhe",
  "razresheniya-i-documenty",
] as const;

export const canonicalServiceSlugs = [
  "almaznaya-rezka",
  "demontaj-bany",
  "demontaj-betona",
  "demontaj-derevyannyh-domov",
  "demontaj-dverey",
  "demontaj-fundamenta",
  "demontaj-garazha",
  "demontaj-kanalizatsii",
  "demontaj-karkasnih-zdaniy",
  "demontaj-kuhny",
  "demontaj-monolita",
  "demontaj-ofisa",
  "demontaj-parketa",
  "demontaj-plitky",
  "demontaj-promishlennyh-zdaniy",
  "demontaj-saraya",
  "demontaj-vanny",
  "demontaj-verandy",
  "demontaj-vivezky",
  "demontazh-doma",
  "demontazh-inzhenernyh-setej-i-kommunikacij",
  "demontazh-konstrukciy",
  "demontazh-metallokonstrukcij",
  "demontazh-nalivnogo-pola",
  "demontazh-santehkabiny",
  "demontazh-sten",
  "demontazh_potolka",
  "demontazh_stjazhki",
  "snos-zdaniy",
  "vyvoz-musora-posle-demontazha",
] as const;

export type CanonicalArticleSlug = (typeof canonicalArticleSlugs)[number];
export type CanonicalServiceSlug = (typeof canonicalServiceSlugs)[number];
