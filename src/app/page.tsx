import type { Metadata } from "next";

import { CasesSection } from "@/components/sections/CasesSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/JsonLd";
import { contacts } from "@/content/contacts";
import { pages } from "@/content/pages";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const home = pages.find((p) => p.url === "/");
  const title = home?.title?.replace(/^«|»$/g, "").trim() || SITE_NAME;
  const description = home?.description?.trim() || "Профессиональный демонтаж в Москве и МО.";

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/`,
      siteName: SITE_NAME,
      type: "website",
      locale: "ru_RU",
      images: [{ url: "/opengraph-image" }],
    },
  };
}

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    email: contacts.email,
    telephone: contacts.phoneDisplay,
    areaServed: {
      "@type": "AdministrativeArea",
      name: contacts.city ?? "Москва и МО",
    },
  };

  return (
    <div className="min-h-full bg-bg">
      <Header />
      <main className="mx-auto flex max-w-[92rem] flex-col gap-6 px-5 pb-[4.75rem] pt-10 md:gap-10 md:px-10 md:pb-24 md:pt-11">
        <JsonLd data={organizationLd} />
        <HeroSection />
        <SocialProofSection />
        <FeaturesSection />
        <ServicesSection />
        <CasesSection />
        <TestimonialsSection />
        <CtaSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
