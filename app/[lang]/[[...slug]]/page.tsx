import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/app/components/PageView";
import { PAGE_RECORDS, getLocalizedPage, localizePage, type Locale } from "@/lib/site-content";

const SITE_URL = "https://dalmasa-seoul-bilingual.chaollapark.chatgpt.site";

function routePath(slug?: string[]) {
  return slug?.length ? `/${slug.join("/")}` : "/";
}

function asLocale(lang: string): Locale | null {
  return lang === "ko" || lang === "en" ? lang : null;
}

export function generateStaticParams() {
  return ["ko", "en"].flatMap((lang) => PAGE_RECORDS.map((page) => ({ lang, slug: page.path === "/" ? [] : page.path.slice(1).split("/") })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = asLocale(lang);
  if (!locale) return {};
  const page = getLocalizedPage(locale, routePath(slug));
  if (!page) return {};
  const canonicalPath = `/${locale}${page.path === "/" ? "" : page.path}`;
  const koreanPath = `/ko${page.path === "/" ? "" : page.path}`;
  const englishPath = `/en${page.path === "/" ? "" : page.path}`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const image = `${SITE_URL}/og.jpg`;

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical,
      languages: { ko: `${SITE_URL}${koreanPath}`, en: `${SITE_URL}${englishPath}`, "x-default": `${SITE_URL}${koreanPath}` },
    },
    openGraph: {
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      title: page.seo.title,
      description: page.seo.description,
      url: canonical,
      siteName: locale === "ko" ? "흑석동 달마사" : "Dalmasa Temple Seoul",
      images: [{ url: image, width: 1200, height: 630, alt: locale === "ko" ? "서울 흑석동 달마사 전경" : "Dalmasa Temple overlooking Seoul" }],
    },
    twitter: { card: "summary_large_image", title: page.seo.title, description: page.seo.description, images: [image] },
  };
}

export default async function LocalizedRoute({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
  const { lang, slug } = await params;
  const locale = asLocale(lang);
  if (!locale) notFound();
  const page = getLocalizedPage(locale, routePath(slug));
  if (!page) notFound();
  const pages = PAGE_RECORDS.map((record) => localizePage(record, locale));
  const canonical = `${SITE_URL}/${locale}${page.path === "/" ? "" : page.path}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BuddhistTemple",
    "@id": `${SITE_URL}/#temple`,
    name: locale === "ko" ? "대한불교조계종 흑석동 달마사" : "Dalmasa Temple, Heukseok-dong",
    url: canonical,
    image: `${SITE_URL}/images/dalmasa-seoul.webp`,
    telephone: "+82-2-813-7425",
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "ko" ? "서달로 50-26 (흑석동)" : "50-26 Seodal-ro, Heukseok-dong",
      addressLocality: "Seoul",
      addressRegion: "Dongjak-gu",
      addressCountry: "KR",
    },
    sameAs: ["https://www.youtube.com/@dalmasa", "https://www.instagram.com/dalmasa01/"],
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><PageView locale={locale} page={page} pages={pages} /></>;
}
