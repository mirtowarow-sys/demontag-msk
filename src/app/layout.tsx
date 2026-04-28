import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { YandexMetrika } from "@/components/YandexMetrika";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: "Профессиональный демонтаж в Москве и МО.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ru_RU",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
