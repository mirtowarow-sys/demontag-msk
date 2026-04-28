export const SITE_NAME = "Демонтаж МСК";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "https://demontagmsk.ru";
  return raw.replace(/\/+$/, "");
}
