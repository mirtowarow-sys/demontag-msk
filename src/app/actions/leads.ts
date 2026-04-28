"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { leadSchema, type LeadInput } from "@/lib/schemas/lead";
import { contacts } from "@/content/contacts";

type SubmitLeadResult = { ok: true } | { ok: false; message: string };

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

declare global {
  var __leadRateLimit: Map<string, number[]> | undefined;
}

function getRateLimitStore() {
  if (!globalThis.__leadRateLimit) globalThis.__leadRateLimit = new Map<string, number[]>();
  return globalThis.__leadRateLimit;
}

async function getClientIp() {
  const h = await headers();
  const xff = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return xff || h.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string) {
  const store = getRateLimitStore();
  const now = Date.now();
  const from = now - RATE_LIMIT_WINDOW_MS;
  const prev = store.get(ip) ?? [];
  const recent = prev.filter((t) => t >= from);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  store.set(ip, recent);
  return true;
}

function formatLeadText(lead: LeadInput) {
  const parts: string[] = [];
  if (lead.name) parts.push(`Имя: ${lead.name}`);
  parts.push(`Телефон: ${lead.phone}`);
  if (lead.email) parts.push(`Email: ${lead.email}`);
  if (lead.service) parts.push(`Услуга: ${lead.service}`);
  if (lead.message) parts.push(`Комментарий: ${lead.message}`);
  return parts.join("\n");
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
}

async function sendEmail(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const to = contacts.email;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    text,
  });
}

export async function submitLead(input: LeadInput): Promise<SubmitLeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Проверьте поля формы и попробуйте ещё раз." };

  const ip = await getClientIp();
  if (!checkRateLimit(ip)) {
    return {
      ok: false,
      message: "Слишком много запросов. Попробуйте ещё раз через несколько минут.",
    };
  }

  const lead = parsed.data;
  const text = formatLeadText(lead);

  try {
    await Promise.all([
      sendTelegram(
        `<b>Новая заявка</b>\n\n${text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}`,
      ),
      sendEmail("Новая заявка с сайта Демонтаж МСК", text),
    ]);
    return { ok: true };
  } catch {
    return { ok: false, message: "Не удалось отправить заявку. Попробуйте ещё раз." };
  }
}

export async function submitLeadOrThrow(input: LeadInput): Promise<void> {
  const result = await submitLead(input);
  if (!result.ok) throw new Error(result.message);
}
