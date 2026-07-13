import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dalmasa-seoul-bilingual.chaollapark.chatgpt.site"),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "64x64" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f2e8",
};

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "ko" && lang !== "en") notFound();
  return <html lang={lang}><body>{children}</body></html>;
}
