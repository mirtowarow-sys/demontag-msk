"use client";

import { motion, useReducedMotion } from "framer-motion";

import { contacts } from "@/content/contacts";
import { hero } from "@/content/utp";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TrackedLink } from "@/components/TrackedLink";
import { heroShowcaseBandClass } from "@/lib/marketing-surfaces";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={heroShowcaseBandClass}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[18%] -top-[40%] size-[28rem] rounded-full bg-brand/34 blur-[2px] md:size-[34rem]"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-[-30%] size-[22rem] rounded-full bg-sky-200/35 blur-[60px]"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.9 }}
      />

      <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-14">
        <motion.div
          className="max-w-[40rem] space-y-[1.1rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-ink/45">
            (01) Демонтаж в Москве и МО
          </p>
          <h1 className="text-balance text-[clamp(2.125rem,1.15rem+3.85vw,3.5rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-ink md:leading-[0.96]">
            {hero.title}
          </h1>
          {hero.subtitle ? (
            <p className="max-w-xl text-[1.0625rem] leading-[1.62] text-ink/71 md:text-lg md:leading-[1.55]">
              {hero.subtitle}
            </p>
          ) : null}

          {hero.bullets?.length ? (
            <motion.div
              className="flex flex-wrap gap-2.5 pt-1"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              transition={{ duration: 0.42, delay: 0.12 }}
            >
              {hero.bullets.map((b) => (
                <Badge key={b}>{b}</Badge>
              ))}
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          className="flex w-full shrink-0 flex-col gap-3.5 sm:max-w-sm sm:flex-row md:w-auto md:flex-col lg:gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <TrackedLink
            href={`tel:${contacts.phoneE164}`}
            goal="phone_click"
            params={{ placement: "hero" }}
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full shadow-[0_12px_32px_-8px_rgba(255,192,42,0.65)] hover:brightness-[1.02] md:w-auto"
            >
              Позвонить
            </Button>
          </TrackedLink>
          <a href={`mailto:${contacts.email}`} className="w-full sm:flex-1 md:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-[#cddcea] bg-white/72 backdrop-blur-md md:w-auto"
            >
              Написать email
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
