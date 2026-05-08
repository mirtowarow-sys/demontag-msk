import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { canonicalArticleSlugs, canonicalServiceSlugs } from "@/content/canonical";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticUrls = ["/", "/contact", "/uslugi", "/articles"];
  const urls = [
    ...staticUrls,
    ...canonicalServiceSlugs.map((s) => `/uslugi/${s}`),
    ...canonicalArticleSlugs.map((s) => `/articles/${s}`),
  ];

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...urls
      .filter((u) => u !== "/")
      .map((u) => ({
        url: `${siteUrl}${u}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: u.startsWith("/uslugi/") || u.startsWith("/articles/") ? 0.7 : 0.8,
      })),
  ];
}
