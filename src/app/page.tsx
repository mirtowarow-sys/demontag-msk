import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { SITE_NAME, getSiteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { contacts } from "@/content/contacts";

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
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:pb-20 md:pt-10">
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
