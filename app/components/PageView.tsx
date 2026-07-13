/* Assets are already compressed WebP files with fixed dimensions; native img keeps the Sites worker self-contained. */
/* eslint-disable @next/next/no-img-element */
import type { Locale, LocalizedPage } from "@/lib/site-content";
import { SiteFooter, SiteHeader, MobileActionBar, localizedHref } from "./SiteChrome";

const imageByKey: Record<string, { src: string; width: number; height: number }> = {
  home: { src: "/images/dalmasa-seoul.webp", width: 1920, height: 1280 },
  temple: { src: "/images/dalmasa-seoul.webp", width: 1920, height: 1280 },
  lanterns: { src: "/images/lanterns.webp", width: 1920, height: 1280 },
  practice: { src: "/images/practice.webp", width: 1920, height: 1280 },
  service: { src: "/images/dharma-service.webp", width: 1000, height: 473 },
  forest: { src: "/images/forest.webp", width: 1600, height: 1067 },
  winter: { src: "/images/winter.webp", width: 1001, height: 1334 },
};

function heroImage(page: LocalizedPage) {
  return imageByKey[page.hero.key] ?? imageByKey.temple;
}

function actionHref(locale: Locale, href: string) {
  return href.startsWith("/") ? localizedHref(locale, href) : href;
}

function QuickActions({ locale }: { locale: Locale }) {
  const items = locale === "ko"
    ? [
        ["오시는 길", "/about/directions", "지하철·버스·지도"],
        ["이번 주 일정", "/events/regular-services", "법회와 기도 시간"],
        ["기도·교육", "/education", "과정과 접수 안내"],
        ["봉안 상담", "/memorial/enshrinement", "차분한 상담 안내"],
      ]
    : [
        ["Directions", "/about/directions", "Transit and map links"],
        ["This week", "/events/regular-services", "Services and prayers"],
        ["Prayer & learning", "/education", "Programs and enrollment"],
        ["Memorial inquiry", "/memorial/enshrinement", "A respectful guide"],
      ];

  return (
    <section className="quick-actions" aria-label={locale === "ko" ? "빠른 메뉴" : "Quick links"}>
      {items.map(([label, path, note], index) => (
        <a href={localizedHref(locale, path)} key={path}>
          <span className="quick-number">0{index + 1}</span>
          <strong>{label}</strong>
          <small>{note}</small>
        </a>
      ))}
    </section>
  );
}

function CurrentSchedule({ locale }: { locale: Locale }) {
  const events = locale === "ko"
    ? [
        { date: "08.01", title: "신묘장구대다라니 400일차 독송기도", time: "토요일 오후 2시", href: "/prayer/dharani-1000-day" },
        { date: "08.11", title: "수능·학업성취 백일기도 입재", time: "화요일 오전 10시", href: "/prayer/special" },
        { date: "08.19", title: "경전반 금강경 개강", time: "주간 오후 1시 · 야간 오후 7시", href: "/education/sutra-study" },
        { date: "09.05", title: "달마사 불학원 기본교육 개강", time: "토요일 오후 1시", href: "/education/foundations" },
      ]
    : [
        { date: "AUG 01", title: "Day 400 of the Great Dharani practice", time: "Saturday, 2:00 PM", href: "/prayer/dharani-1000-day" },
        { date: "AUG 11", title: "100-day student-exam prayer begins", time: "Tuesday, 10:00 AM", href: "/prayer/special" },
        { date: "AUG 19", title: "Diamond Sutra course begins", time: "1:00 PM or 7:00 PM", href: "/education/sutra-study" },
        { date: "SEP 05", title: "Buddhist Foundations begins", time: "Saturday, 1:00 PM", href: "/education/foundations" },
      ];

  return (
    <section className="schedule-section">
      <div className="section-heading-row">
        <div><p className="eyebrow">{locale === "ko" ? "2026년 여름·가을" : "Summer & autumn 2026"}</p><h2>{locale === "ko" ? "다가오는 일정" : "Coming up at Dalmasa"}</h2></div>
        <a href={localizedHref(locale, "/news/notices")}>{locale === "ko" ? "공지 전체보기" : "All notices"}</a>
      </div>
      <div className="schedule-list">
        {events.map((event) => (
          <a href={localizedHref(locale, event.href)} key={`${event.date}-${event.title}`}>
            <time>{event.date}</time>
            <span><strong>{event.title}</strong><small>{event.time}</small></span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <p className="verification-copy">{locale === "ko" ? "일정은 방문 전 종무소 또는 최신 공지에서 다시 확인해 주세요." : "Please confirm schedules with the temple office or the latest notice before visiting."}</p>
    </section>
  );
}

function ProgramFacts({ page, locale }: { page: LocalizedPage; locale: Locale }) {
  if (!page.programFacts) return null;
  const facts = [
    [locale === "ko" ? "대상" : "For", page.programFacts.audience],
    [locale === "ko" ? "일정" : "Schedule", page.programFacts.schedule],
    [locale === "ko" ? "기간" : "Duration", page.programFacts.duration],
    [locale === "ko" ? "장소" : "Venue", page.programFacts.venue],
    [locale === "ko" ? "비용·동참금" : "Fee or donation", page.programFacts.feeOrDonation],
    [locale === "ko" ? "문의" : "Contact", page.programFacts.contact],
  ].filter(([, value]) => value);

  return (
    <section className="facts-panel" aria-labelledby="facts-title">
      <div>
        <p className="eyebrow">{locale === "ko" ? "참여 정보" : "Participation details"}</p>
        <h2 id="facts-title">{locale === "ko" ? "한눈에 보기" : "At a glance"}</h2>
      </div>
      <dl>
        {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
    </section>
  );
}

function RelatedPages({ locale, page, pages }: { locale: Locale; page: LocalizedPage; pages: LocalizedPage[] }) {
  const related = pages.filter((candidate) => candidate.section === page.section && candidate.path !== page.path).slice(0, 4);
  if (!related.length) return null;
  return (
    <section className="related-section">
      <p className="eyebrow">{locale === "ko" ? "같은 주제" : "In this section"}</p>
      <h2>{locale === "ko" ? "함께 살펴보세요" : "Continue exploring"}</h2>
      <div className="related-grid">
        {related.map((item) => <a key={item.path} href={localizedHref(locale, item.path)}><strong>{item.title}</strong><span>{item.summary}</span><small>{locale === "ko" ? "자세히 보기" : "Read more"} ↗</small></a>)}
      </div>
    </section>
  );
}

export function PageView({ locale, page, pages }: { locale: Locale; page: LocalizedPage; pages: LocalizedPage[] }) {
  const hero = heroImage(page);
  const isHome = page.path === "/";
  const isDirections = page.path === "/about/directions" || page.path === "/visit";

  return (
    <>
      <SiteHeader locale={locale} currentPath={page.path} />
      <main id="main-content">
        <section className={isHome ? "hero hero-home" : "hero hero-inner"}>
          <img src={hero.src} alt={page.hero.alt} width={hero.width} height={hero.height} fetchPriority={isHome ? "high" : "auto"} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">{page.navLabel}</p>
            <h1>{page.title}</h1>
            <p>{page.summary}</p>
            <div className="hero-actions">
              <a className="button" href={actionHref(locale, page.cta?.href ?? "/visit")}>{page.cta?.label ?? (locale === "ko" ? "방문 안내" : "Plan your visit")}</a>
              {isHome && <a className="text-button" href={localizedHref(locale, "/events/regular-services")}>{locale === "ko" ? "이번 주 일정" : "This week's schedule"} <span aria-hidden="true">↗</span></a>}
            </div>
          </div>
        </section>

        {isHome && <QuickActions locale={locale} />}
        {isHome && <CurrentSchedule locale={locale} />}
        <ProgramFacts page={page} locale={locale} />

        <div className="content-sections">
          {page.sections.map((section, index) => (
            <section className={index % 2 === 0 ? "content-section" : "content-section content-section-tint"} key={`${section.heading}-${index}`}>
              <div className="content-section-inner">
                <div className="content-heading"><span>0{index + 1}</span><h2>{section.heading}</h2></div>
                <div className="prose">
                  {section.paragraphs.map((paragraph, paragraphIndex) => <p key={`${paragraph.slice(0, 24)}-${paragraphIndex}`}>{paragraph}</p>)}
                  {section.items?.length ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                </div>
              </div>
            </section>
          ))}
        </div>

        {isDirections && (
          <section className="map-actions">
            <div><p className="eyebrow">{locale === "ko" ? "서울 동작구 흑석동" : "Heukseok-dong, Dongjak-gu"}</p><h2>{locale === "ko" ? "지도 앱으로 길찾기" : "Open directions in your map app"}</h2></div>
            <div>
              <a href="https://map.naver.com/p/search/%EB%8B%AC%EB%A7%88%EC%82%AC" rel="noreferrer">Naver Map ↗</a>
              <a href="https://map.kakao.com/link/search/%EB%8B%AC%EB%A7%88%EC%82%AC" rel="noreferrer">Kakao Map ↗</a>
              <a href="https://www.google.com/maps/search/?api=1&query=Dalmasa+Seoul" rel="noreferrer">Google Maps ↗</a>
            </div>
          </section>
        )}

        {page.verificationNotes?.length ? (
          <aside className="verification-panel" aria-label={locale === "ko" ? "확인 안내" : "Verification note"}>
            <strong>{locale === "ko" ? "방문 전 확인해 주세요" : "Please confirm before relying on this information"}</strong>
            {page.verificationNotes.map((note) => <p key={note}>{note}</p>)}
          </aside>
        ) : null}

        <RelatedPages locale={locale} page={page} pages={pages} />
        <section className="closing-cta">
          <p className="eyebrow">{locale === "ko" ? "처음 오시나요?" : "New to Dalmasa?"}</p>
          <h2>{locale === "ko" ? "도심 가까이에서 잠시 마음을 쉬어가세요." : "Pause, practice, and learn at a quiet temple in Seoul."}</h2>
          <a className="button" href={localizedHref(locale, "/visit")}>{locale === "ko" ? "첫 방문 안내 보기" : "Read the first-visit guide"}</a>
        </section>
      </main>
      <SiteFooter locale={locale} pages={pages} />
      <MobileActionBar locale={locale} />
    </>
  );
}
