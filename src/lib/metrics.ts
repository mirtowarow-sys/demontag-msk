export type YandexGoal = "form_submit" | "phone_click" | "click_cta";

declare global {
  interface Window {
    ym?: (id: number, method: "reachGoal", goal: string, params?: Record<string, unknown>) => void;
  }
}

function getMetrikaId() {
  const raw = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
  const id = raw ? Number(raw) : NaN;
  return Number.isFinite(id) ? id : null;
}

export function reachGoal(goal: YandexGoal, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const id = getMetrikaId();
  if (!id) return;
  window.ym?.(id, "reachGoal", goal, params);
}
