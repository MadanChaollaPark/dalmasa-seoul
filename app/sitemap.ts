import type { MetadataRoute } from "next";
import { PAGE_RECORDS } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dalmasa-seoul-bilingual.chaollapark.chatgpt.site";
  const lastModified = new Date("2026-07-13T00:00:00+09:00");
  return (["ko", "en"] as const).flatMap((locale) => PAGE_RECORDS.map((page) => ({
    url: `${base}/${locale}${page.path === "/" ? "" : page.path}`,
    lastModified,
    changeFrequency: page.path === "/" || page.section === "news" ? "weekly" as const : "monthly" as const,
    priority: page.path === "/" ? 1 : page.path.split("/").length === 2 ? 0.8 : 0.7,
    alternates: {
      languages: {
        ko: `${base}/ko${page.path === "/" ? "" : page.path}`,
        en: `${base}/en${page.path === "/" ? "" : page.path}`,
      },
    },
  })));
}
