import type { Metadata } from "next";
import { Cormorant, Manrope } from "next/font/google";

import "./globals.css";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { YandexMetrika } from "@/components/YandexMetrika";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-humanist",
  display: "swap",
});

const cormorant = Cormorant({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display-serif",
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
      <body
        className={`${manrope.variable} ${cormorant.variable} ${manrope.className} antialiased`}
      >
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
