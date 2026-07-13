/* The transparent source logo is pre-sized and does not need a runtime image optimizer. */
/* eslint-disable @next/next/no-img-element */
import type { Locale, LocalizedPage } from "@/lib/site-content";

const labels = {
  ko: {
    skip: "본문으로 바로가기",
    menu: "전체 메뉴",
    visit: "방문 안내",
    contact: "문의",
    language: "언어 선택",
    switchLanguage: "English",
    allPages: "전체 페이지",
    address: "서울특별시 동작구 서달로 50-26 (흑석동)",
    office: "종무소",
    education: "교육국",
    memorial: "봉안 상담",
    hours: "운영시간",
    officeHours: "종무소 08:00–17:00",
    memorialHours: "봉안당 09:00–17:00 · 점심 11:30–12:30",
    sourceNote: "달마사의 기존 공개 정보를 바탕으로 만든 한·영 웹사이트 개선안입니다.",
  },
  en: {
    skip: "Skip to main content",
    menu: "Full menu",
    visit: "Plan your visit",
    contact: "Contact",
    language: "Choose language",
    switchLanguage: "한국어",
    allPages: "All pages",
    address: "50-26 Seodal-ro, Dongjak-gu, Seoul (Heukseok-dong)",
    office: "Temple office",
    education: "Education office",
    memorial: "Memorial inquiries",
    hours: "Opening hours",
    officeHours: "Temple office 08:00–17:00",
    memorialHours: "Memorial hall 09:00–17:00 · lunch 11:30–12:30",
    sourceNote: "A Korean–English redesign based on Dalmasa’s existing public information.",
  },
} as const;

const primaryNav = [
  { path: "/about", ko: "달마사 소개", en: "About" },
  { path: "/prayer", ko: "기도·불공", en: "Prayer" },
  { path: "/events", ko: "법회·행사", en: "Services & events" },
  { path: "/education", ko: "교육", en: "Education" },
  { path: "/news", ko: "달마사 소식", en: "News" },
  { path: "/memorial", ko: "봉안당", en: "Memorial hall" },
] as const;

export function localizedHref(locale: Locale, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}

function isCurrent(currentPath: string, navPath: string) {
  return currentPath === navPath || currentPath.startsWith(`${navPath}/`);
}

export function SiteHeader({ locale, currentPath }: { locale: Locale; currentPath: string }) {
  const copy = labels[locale];
  const otherLocale: Locale = locale === "ko" ? "en" : "ko";

  return (
    <>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <div className="prototype-note" role="note">
        <span>{locale === "ko" ? "달마사 서울 · 한영 웹사이트 개선안" : "Dalmasa Seoul · bilingual website redesign"}</span>
        <a href={localizedHref(locale, "/contact")}>{copy.contact}</a>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href={localizedHref(locale, "/")} aria-label={locale === "ko" ? "달마사 홈" : "Dalmasa home"}>
            <img src="/images/dalmasa-logo.png" alt="" width="557" height="198" />
          </a>
          <nav className="desktop-nav" aria-label={locale === "ko" ? "주요 메뉴" : "Primary navigation"}>
            {primaryNav.map((item) => (
              <a key={item.path} href={localizedHref(locale, item.path)} aria-current={isCurrent(currentPath, item.path) ? "page" : undefined}>
                {item[locale]}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="language-link" href={localizedHref(otherLocale, currentPath)} aria-label={copy.language}>
              {copy.switchLanguage}
            </a>
            <a className="button button-small" href={localizedHref(locale, "/visit")}>{copy.visit}</a>
          </div>
          <details className="mobile-menu">
            <summary>{copy.menu}</summary>
            <nav aria-label={locale === "ko" ? "모바일 주요 메뉴" : "Mobile primary navigation"}>
              {primaryNav.map((item) => (
                <a key={item.path} href={localizedHref(locale, item.path)}>{item[locale]}</a>
              ))}
              <a href={localizedHref(locale, "/visit")}>{copy.visit}</a>
              <a href={localizedHref(locale, "/contact")}>{copy.contact}</a>
              <a href={localizedHref(otherLocale, currentPath)}>{copy.switchLanguage}</a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ locale, pages }: { locale: Locale; pages: LocalizedPage[] }) {
  const copy = labels[locale];
  const sectionPages = pages.filter((page) => ["about", "prayer", "events", "education", "news", "memorial"].includes(page.section));

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/images/dalmasa-logo.png" alt={locale === "ko" ? "대한불교조계종 달마사" : "Dalmasa, Jogye Order of Korean Buddhism"} width="557" height="198" />
          <p>{copy.address}</p>
          <p className="footer-note">{copy.sourceNote}</p>
        </div>
        <div>
          <h2>{copy.contact}</h2>
          <ul className="contact-list">
            <li><strong>{copy.office}</strong><a href="tel:+8228137425">02-813-7425</a></li>
            <li><strong>{copy.education}</strong><a href="tel:+821085747475">010-8574-7475</a></li>
            <li><strong>{copy.memorial}</strong><a href={localizedHref(locale, "/memorial/enshrinement")}>{locale === "ko" ? "번호 확인 및 상담 안내" : "Verify numbers and inquiry guidance"}</a></li>
          </ul>
        </div>
        <div>
          <h2>{copy.hours}</h2>
          <p>{copy.officeHours}</p>
          <p>{copy.memorialHours}</p>
          <div className="footer-actions">
            <a href={localizedHref(locale, "/about/directions")}>{locale === "ko" ? "오시는 길" : "Directions"}</a>
            <a href={localizedHref(locale, "/contact")}>{copy.contact}</a>
          </div>
        </div>
        <details className="footer-sitemap">
          <summary>{copy.allPages}</summary>
          <nav aria-label={copy.allPages}>
            {sectionPages.map((page) => <a key={page.path} href={localizedHref(locale, page.path)}>{page.navLabel}</a>)}
          </nav>
        </details>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Dalmasa Temple</span>
        <a href={localizedHref(locale === "ko" ? "en" : "ko", "/")}>{copy.switchLanguage}</a>
      </div>
    </footer>
  );
}

export function MobileActionBar({ locale }: { locale: Locale }) {
  return (
    <nav className="mobile-action-bar" aria-label={locale === "ko" ? "빠른 실행" : "Quick actions"}>
      <a href={localizedHref(locale, "/about/directions")}>{locale === "ko" ? "길찾기" : "Directions"}</a>
      <a href="tel:+8228137425">{locale === "ko" ? "전화" : "Call"}</a>
      <a href={localizedHref(locale, "/visit")}>{locale === "ko" ? "방문 안내" : "First visit"}</a>
    </nav>
  );
}
