import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Демонтаж МСК",
  description: "Профессиональный демонтаж в Москве и МО.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

