# ROADMAP — [Демонтаж МСК]

> Статусы: ⬜ Не начато · 🔄 В работе · ✅ Готово · ❌ Отменено · ⏸ На паузе
> Ответственный пишется в скобках: (Имя)
> Дата старта: —
> Дедлайн: —

---

## ЭТАП 0 — АУДИТ TILDA И ИЗВЛЕЧЕНИЕ ДАННЫХ

- [x] 0.1 Открыть экспорт в Cursor, НЕ редактировать файлы тильды
- [x] 0.2 Аудит структуры через ИИ → `_docs/site-audit.md`
          все секции, тексты, цвета, шрифты, формы, внешние сервисы
- [x] 0.3 Извлечь контакты → `src/content/contacts.ts`
          телефоны, email, адреса, соцсети, мессенджеры
- [x] 0.4 Составить список страниц → `src/content/pages.ts`
          URL, заголовок, мета-описание, тип страницы
- [x] 0.5 Извлечь УТП и офферы → `src/content/utp.ts`
          заголовки секций, подзаголовки, буллеты преимуществ
- [x] 0.6 Извлечь CTA-тексты и формы → `src/content/cta.ts`
- [x] 0.7 Собрать список медиафайлов → `src/content/media.ts`
          скачать все внешние картинки с tildacdn → `public/images/`
- [x] 0.8 Переместить весь экспорт в `legacy/tilda-export/` — больше не трогать
- [x] 0.9 Верификация: весь контент вынесен, оригинальные HTML не нужны

---

## ЭТАП 1 — ИНИЦИАЛИЗАЦИЯ ПРОЕКТА

- [x] 1.1 `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [x] 1.2 Prod-зависимости:
          `framer-motion react-hook-form zod @hookform/resolvers resend`
- [x] 1.3 Dev-зависимости:
          `prettier prettier-plugin-tailwindcss lint-staged husky @types/node`
- [x] 1.4 `tsconfig.json`: strict + noUncheckedIndexedAccess + paths @/*
- [ ] 1.5 `.cursorrules` — заполнить PROJECT CONTEXT под конкретный проект
- [x] 1.6 `next.config.ts`: domains для images, redirects (со старых URL тильды)
- [x] 1.7 ESLint + Prettier + `prettier-plugin-tailwindcss`
- [x] 1.8 lint-staged + husky (pre-commit)
- [x] 1.9 `.env.local` локально + `.env.example` в git:
          RESEND_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, NEXT_PUBLIC_SITE_URL,
          NEXT_PUBLIC_YANDEX_METRIKA_ID
- [x] 1.10 Создать структуру папок src/components/ui|forms|sections|layout, src/lib, src/hooks, src/types
- [x] 1.11 `git init` → первый коммит `chore: project init` → push в remote

---

## ЭТАП 2 — ДИЗАЙН-СИСТЕМА И UI-КИТ

- [ ] 2.1 Токены дизайна в `src/app/globals.css` через `@theme {}` (Tailwind v4)
          цветовая палитра, типографика, spacing, shadows, radius
          (брать из `_docs/site-audit.md` — реальные цвета клиента)
- [ ] 2.2 Подключить шрифты через `next/font` в `src/app/layout.tsx`
- [ ] 2.3 Глобальные базовые стили в `globals.css` (reset, scroll-behavior, selection)
- [ ] 2.4 Framer Motion варианты → `src/lib/animations.ts`
          fadeIn, slideUp, slideIn, staggerContainer, scaleIn
- [ ] 2.5 UI-компоненты `src/components/ui/`:
          - [ ] Button (variant: primary|secondary|outline|ghost, size: sm|md|lg, loading)
          - [ ] Input + Label + ErrorMessage
          - [ ] Textarea
          - [ ] Select
          - [ ] Modal
          - [ ] Badge
          - [ ] Spinner
          - [ ] Tooltip
- [ ] 2.6 Компоненты форм `src/components/forms/`:
          - [ ] LeadForm (имя + телефон + отправка в Resend + Telegram)
          - [ ] ContactForm (расширенная)
          - [ ] CallbackForm (только телефон)
- [ ] 2.7 Layout-компоненты `src/components/layout/`:
          - [ ] Header (десктоп + логотип + nav + CTA-кнопка)
          - [ ] MobileMenu (burger + drawer)
          - [ ] Footer (контакты + соцсети + копирайт)
          - [ ] Breadcrumbs

---

## ЭТАП 3 — СБОРКА СТРАНИЦ

- [ ] 3.1 Главная `/` → `src/app/page.tsx`
          - [ ] Hero (заголовок + подзаголовок + CTA + медиа)
          - [ ] Social proof (цифры / логотипы клиентов)
          - [ ] УТП / Features
          - [ ] Services (список услуг)
          - [ ] Cases / Портфолио
          - [ ] Testimonials (отзывы)
          - [ ] CTA-секция (форма или кнопка)
          - [ ] FAQ
- [ ] 3.2 Остальные страницы из `src/content/pages.ts`
- [ ] 3.3 Страница 404 → `src/app/not-found.tsx`
- [ ] 3.4 Страница ошибки → `src/app/error.tsx`
- [ ] 3.5 `robots.ts` и `sitemap.ts` → `src/app/`
- [ ] 3.6 Metadata для всех страниц (title, description, og:image, canonical)
- [ ] 3.7 Мобильная адаптация: 320 / 375 / 768 / 1280 / 1440 / 1920px
- [ ] 3.8 Redirects со старых URL тильды → `next.config.ts`

---

## ЭТАП 4 — БИЗНЕС-ЛОГИКА И API

- [ ] 4.1 Server Action для лидов → `src/app/actions/leads.ts`
          валидация zod + отправка в Resend + отправка в Telegram
- [ ] 4.2 Zod-схемы → `src/lib/schemas/lead.ts`, `contact.ts`
- [ ] 4.3 Resend: шаблон письма менеджеру + авто-ответ клиенту
- [ ] 4.4 Telegram Bot: форматированное сообщение с данными лида
- [ ] 4.5 Rate limiting для форм (через headers / ip)
- [ ] 4.6 Toast-уведомления (успех / ошибка) — react-hot-toast или sonner
- [ ] 4.7 Яндекс.Метрика → `src/components/YandexMetrika.tsx`
          + цели: form_submit, phone_click, click_cta
- [ ] 4.8 Проверить что все формы реально отправляют (тест на staging)

---

## ЭТАП 5 — SEO И ПРОИЗВОДИТЕЛЬНОСТЬ

- [ ] 5.1 Все изображения через `next/image` с width + height + alt + priority (для above-fold)
- [ ] 5.2 Конвертировать все jpg/png в WebP (`npx sharp-cli` или squoosh)
- [ ] 5.3 Lazy loading тяжёлых секций (`dynamic(() => import(...), { ssr: false })`)
- [ ] 5.4 JSON-LD Structured Data:
          - [ ] Organization (главная)
          - [ ] Service (страницы услуг)
          - [ ] BreadcrumbList (внутренние страницы)
- [ ] 5.5 OG-изображение → `src/app/opengraph-image.tsx` (1200×630)
- [ ] 5.6 Проверить sitemap.xml и robots.txt на prod
- [ ] 5.7 Lighthouse: Performance > 85 mobile, > 95 desktop
- [ ] 5.8 Core Web Vitals: LCP < 2.5s · CLS < 0.1 · FID < 100ms

---

## ЭТАП 6 — ТЕСТИРОВАНИЕ

- [ ] 6.1 Кросс-браузер: Chrome, Firefox, Safari, Edge
- [ ] 6.2 Мобильные: iPhone (Safari), Android (Chrome), 375px минимум
- [ ] 6.3 Все формы реально отправляют письма и Telegram-уведомления
- [ ] 6.4 Все ссылки рабочие, нет 404
- [ ] 6.5 Нет console.error в продакшен-билде (`npm run build` — должен пройти чисто)
- [ ] 6.6 Проверить redirects со старых URL тильды
- [ ] 6.7 Проверить OG-теги через telegra.ph или og-check
- [ ] 6.8 Проверить метрику в режиме реального времени

---

## ЭТАП 7 — ДЕПЛОЙ НА TIMEWEB / REG.RU

### 7.1 Подготовка сервера (один раз)
- [ ] Подключиться: `ssh root@IP`
- [ ] Обновить систему: `apt update && apt upgrade -y`
- [ ] Установить nvm → Node LTS → PM2: `npm install -g pm2`
- [ ] Установить Nginx: `apt install nginx -y`
- [ ] Установить certbot: `apt install certbot python3-certbot-nginx -y`
- [ ] Создать папку проекта: `mkdir -p /var/www/[project-name]`

### 7.2 Первый деплой
- [ ] Клонировать репозиторий на сервер: `git clone [repo] /var/www/[project-name]`
- [ ] Создать `.env.local` на сервере вручную (не через git!)
- [ ] `npm install && npm run build`
- [ ] Создать `ecosystem.config.js` (шаблон ниже)
- [ ] `pm2 start ecosystem.config.js`
- [ ] `pm2 startup && pm2 save` — автозапуск при ребуте

### 7.3 Nginx
- [ ] Создать конфиг `/etc/nginx/sites-available/[project-name].conf` (шаблон ниже)
- [ ] `ln -s /etc/nginx/sites-available/[project-name].conf /etc/nginx/sites-enabled/`
- [ ] `nginx -t && systemctl reload nginx`

### 7.4 SSL и домен
- [ ] Добавить A-записи у регистратора: `@` и `www` → IP сервера
- [ ] Подождать DNS (15 мин — 24 ч), проверить `nslookup [domain]`
- [ ] Получить SSL: `certbot --nginx -d [domain] -d www.[domain]`
- [ ] Проверить автообновление: `certbot renew --dry-run`

### 7.5 Финальная проверка прод
- [ ] Сайт открывается по https://
- [ ] Редирект http → https работает
- [ ] Редирект www → без www (или наоборот) работает
- [ ] Формы работают в проде
- [ ] Метрика пишет данные
- [ ] PM2 процесс стабилен: `pm2 status`
- [ ] Логи чистые: `pm2 logs [project-name]`

---

## ЭТАП 8 — ПОСЛЕ СДАЧИ

- [ ] Передать клиенту доступы: хостинг, домен, метрика, git
- [ ] Написать краткую инструкцию по обновлению контента
- [ ] Добавить сайт в Яндекс.Вебмастер, залить sitemap
- [ ] Настроить мониторинг аптайма (UptimeRobot — бесплатно)
- [ ] Задокументировать нестандартные решения в `_docs/DECISIONS.md`

---

## ШАБЛОНЫ

### ecosystem.config.js
```js
module.exports = {
  apps: [{
    name: '[project-name]',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/[project-name]',
    instances: 2,
    exec_mode: 'cluster',
    env: { NODE_ENV: 'production', PORT: 3000 },
    max_memory_restart: '500M',
    error_file: '/var/log/pm2/[project-name]-error.log',
    out_file: '/var/log/pm2/[project-name]-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }],
};
```

### Команды обновления сайта
```bash
cd /var/www/[project-name]
git pull origin main
npm install          # только если менялись зависимости
npm run build
pm2 reload [project-name]
```

---

*Обновляй статусы по ходу работы. Один этап — один PR в main.*
