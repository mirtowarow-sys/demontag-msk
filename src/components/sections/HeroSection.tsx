"use client";

import { motion, useReducedMotion } from "framer-motion";

import { contacts } from "@/content/contacts";
import { hero } from "@/content/utp";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TrackedLink } from "@/components/TrackedLink";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative mb-14 overflow-hidden rounded-[2rem] border border-black/[0.06] bg-gradient-to-br from-bg via-[#eef3f6] to-brand/15 px-6 py-12 shadow-soft md:mb-18 md:px-10 md:py-14">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 size-[22rem] rounded-full bg-brand/18 blur-[100px]"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.9 }}
      />
      <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
        <motion.div
          className="max-w-3xl space-y-4"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-ink/40">
            (01) Старт страницы
          </p>
          <h1 className="text-balance font-display text-[clamp(2rem,1.2rem+2.75vw,3.125rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
            {hero.title}
          </h1>
          {hero.subtitle ? (
            <p className="max-w-xl text-[1rem] leading-[1.6] text-ink/73 md:text-lg">
              {hero.subtitle}
            </p>
          ) : null}

          {hero.bullets?.length ? (
            <motion.div
              className="flex flex-wrap gap-2 pt-1"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              {hero.bullets.map((b) => (
                <Badge key={b}>{b}</Badge>
              ))}
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          className="flex w-full shrink-0 flex-col gap-3 sm:max-w-sm sm:flex-row md:w-auto md:flex-col"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <TrackedLink
            href={`tel:${contacts.phoneE164}`}
            goal="phone_click"
            params={{ placement: "hero" }}
            className="w-full sm:w-auto"
          >
            <Button className="w-full shadow-[0_8px_24px_-6px_rgba(255,203,46,0.55)] md:w-auto">
              Позвонить
            </Button>
          </TrackedLink>
          <a href={`mailto:${contacts.email}`} className="w-full sm:flex-1 md:w-auto">
            <Button variant="outline" className="w-full backdrop-blur-sm md:w-auto">
              Написать email
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
