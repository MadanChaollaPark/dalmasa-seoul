# Dalmasa Seoul bilingual design system and information architecture

## Product direction

The rebuilt site should feel like a calm, living Seoul temple: contemporary enough to trust, warm enough to visit, and restrained enough that Dalmasa's photography and practice remain central. Use hanji-like neutrals, deep temple green, earthen red, and a small bronze accent. Avoid decorative “Asian” typefaces, generic lotus ornament, auto-rotating carousels, and dense blocks of centered text.

The live site has strong photography and a complete six-section content inventory, but its visitor journeys are weak. Important program pages describe a practice or class without consistently stating cost, availability, preparation, or how to join. The live `/contact` page still contains English starter text, and the memorial pages show two different contact numbers. The replacement must use one content source for desktop, mobile, Korean, and English so facts cannot drift between variants.

Core user outcomes, in priority order:

1. Plan a first visit and get reliable directions.
2. Find this week's prayers, services, classes, and events.
3. Understand and join a prayer or education program.
4. Contact the correct temple office.
5. Learn about Dalmasa, its halls, history, and community.
6. Find memorial-hall information in a private, dignified flow.

## Information architecture

### Global navigation

| Korean | English | Canonical path | Purpose |
| --- | --- | --- | --- |
| 달마사 소개 | About Dalmasa | `/about` | History, vision, abbot, halls, directions |
| 기도·불공 | Prayer & Offerings | `/prayer` | Daily, monthly, special, memorial, and membership practices |
| 법회·행사 | Dharma Services & Events | `/events` | Recurring services and major events |
| 교육 | Buddhist Education | `/education` | Academy, foundations, college, and sutra study |
| 달마사 소식 | News | `/news` | Notices, stories, gallery, volunteer group |
| 봉안당 | Memorial Hall | `/memorial` | Memorial-hall introduction, enshrinement, remembrance |

Keep **방문 안내 / Plan your visit** as the persistent primary header action and **문의 / Contact** in the utility area and footer. Do not make login or membership account controls visually prominent unless the rebuilt site provides a genuine visitor-facing account service.

All canonical pages exist under both locale prefixes: `/ko{path}` and `/en{path}`. Home is `/ko` and `/en`. The locale switch changes only the locale segment and keeps the visitor on the equivalent page. Use the same stable slug in both languages; translate the title and navigation label, not the URL key.

### Complete 33-page migration map

These are the 33 entries in the live sitemap. Each row requires a Korean and English canonical page. Legacy paths remain explicit redirects to the Korean counterpart; they are compatibility routes, not additional canonical pages.

| Legacy | Korean title | English title | Canonical path | Template |
| --- | --- | --- | --- | --- |
| `/index` | 달마사 | Dalmasa Temple | `/` | Home |
| `/contact` | 문의하기 | Contact & Inquiries | `/contact` | Contact |
| `/18` | 달마사 소개 | About Dalmasa | `/about` | Section landing |
| `/19` | 달마사 역사 | History | `/about/history` | Story + timeline |
| `/20` | 달마사 비전 | Vision | `/about/vision` | Story |
| `/21` | 주지스님 인사말 | Greeting from the Abbot | `/about/abbot` | Story + portrait |
| `/22` | 전각 안내 | Temple Halls | `/about/halls` | Place directory |
| `/23` | 오시는 길 | Directions | `/about/directions` | Directions |
| `/24` | 기도·불공 | Prayer & Offerings | `/prayer` | Section landing |
| `/25` | 달마행자 | Dalmasa Practitioner Program | `/prayer/dalmasa-practitioner` | Program |
| `/26` | 상시기도 | Daily Prayer | `/prayer/daily` | Schedule collection |
| `/27` | 특별기도 | Special Prayer | `/prayer/special` | Program collection |
| `/28` | 재(齋) 및 제사(祭祀) | Memorial Rites & Ancestral Services | `/prayer/memorial-rites` | Program collection |
| `/29` | 공양 | Gongyang (Offerings) | `/prayer/gongyang` | Program |
| `/31` | 법회·행사 | Dharma Services & Events | `/events` | Section landing |
| `/32` | 주요행사 | Major Events | `/events/major` | Event collection |
| `/33` | 정기법회 | Regular Dharma Services | `/events/regular-services` | Schedule collection |
| `/34` | 교육 | Buddhist Education | `/education` | Section landing |
| `/35` | 기본교육 | Buddhist Foundations | `/education/foundations` | Course |
| `/36` | 달마사 소식 | News | `/news` | Section landing |
| `/37` | 공지사항 | Notices | `/news/notices` | Archive |
| `/38` | 주요소식 | Temple Stories | `/news/stories` | Archive |
| `/39` | 달마사 봉사부 | Volunteer Group | `/news/volunteer` | Story + CTA |
| `/40` | 봉안당 | Memorial Hall | `/memorial` | Section landing |
| `/41` | 봉안당 소개 | About the Memorial Hall | `/memorial/about` | Story + facilities |
| `/42` | 봉안 안내 | Enshrinement Guide | `/memorial/enshrinement` | Guided inquiry |
| `/43` | 추모의 방 | Remembrance Room | `/memorial/remembrance` | Moderated archive |
| `/44` | 월 정기기도 | Monthly Prayer | `/prayer/monthly` | Schedule collection |
| `/45` | 불교대학 | Buddhist College | `/education/buddhist-college` | Course |
| `/46` | 경전반 | Sutra Study | `/education/sutra-study` | Course |
| `/47` | 달마사 갤러리 | Gallery | `/news/gallery` | Gallery |
| `/48` | 달마사 불학원 | Dalmasa Buddhist Academy | `/education/academy` | Education overview |
| `/49` | 신묘장구대다라니 천일대정진기도 | 1,000-Day Great Dharani Practice | `/prayer/dharani-1000-day` | Program |

Add one new task-focused page, `/ko/visit` and `/en/visit`, without counting it as a migrated legacy page. It consolidates first-visit expectations, etiquette, arrival, accessibility, schedule, and contact details. `/` should redirect to `/ko`; `x-default` may point to the Korean canonical because Dalmasa is a Seoul temple. Preserve query-based legacy article links only when an imported article has a verified destination; never send every old article URL to an unrelated homepage.

## Homepage

Use a single responsive hero image, not a carousel. The first screen should answer what Dalmasa is, where it is, and what a visitor can do next.

1. **Service notice strip:** only for a genuinely current closure, ceremony, or access notice; includes an expiry date.
2. **Header:** logo, six primary sections, same-page language switch, search if implemented, and Plan your visit CTA.
3. **Hero:** temple/Seoul view, one `<h1>`, two-line value proposition, `Plan your visit` primary CTA, `See this week's schedule` secondary CTA.
4. **Four quick actions:** Directions, Today's schedule, Prayer & education applications, Memorial inquiry. On mobile these are compact labelled controls, never icon-only.
5. **This week at Dalmasa:** three to five verified schedule cards with category, local date/time, venue, status, and clear detail/application action.
6. **First time at a Buddhist temple?:** concise welcome, what to expect, etiquette, accessibility/terrain information, and a link to the full visit page.
7. **Practice and learning:** equal-weight entry cards for Prayer & Offerings, Dharma Services, and Education.
8. **Temple story:** a short history statement, one strong image, and links to history, abbot greeting, and halls.
9. **Latest notices and stories:** current content only, with visible publication dates and category labels.
10. **Visit/contact block:** address, verified hours, labelled office numbers, text transit directions, and Naver/Kakao/Google map links.
11. **Footer:** complete section navigation, contact roles, hours, address, language links, privacy/accessibility links, copyright.

Homepage headline direction:

> **KO:** 한강과 남산을 바라보는 서달산의 전통사찰  
> 흑석동 달마사에서 예불·기도·불교교육에 함께하세요. 처음 오시는 분도 환영합니다.
>
> **EN:** A traditional Buddhist temple on Seodal Mountain, overlooking the Han River and central Seoul.  
> Join Dalmasa for prayer, Dharma services, and Buddhist learning. First-time visitors are welcome.

Treat this as editorial direction, not verified historical copy; temple leadership should approve final Korean and English wording.

## First-visit and action flows

### Plan your visit

Sequence the page in the order a first-time visitor needs it:

1. Today/open status and office hours.
2. Exact address with copy button and labelled map-app links.
3. Subway and bus steps, including the final walk from the stop.
4. Parking, drop-off, slope/stairs, wheelchair access, restrooms, and weather considerations. Mark unverified facts for staff review rather than guessing.
5. What happens on arrival: where to enter, whom to ask, shoes, photography, dress, children, and joining a service.
6. Today's/weekly service times.
7. Tap-to-call general office and a short contact form only if submissions are genuinely handled.

### Prayer, education, and event conversion

Every program/course/event page uses the same `ProgramFacts` block near the top:

- who it is for and whether first-time/non-Korean speakers can join;
- date, day, local time, duration, frequency, and venue;
- registration window and current status (`open`, `waitlist`, `closed`, `ongoing`, `call to confirm`);
- fee or donation guidance, including a truthful `Contact the temple` state when not published;
- eligibility, preparation, language support, and what to bring;
- named contact role and one primary action (`Apply`, `Call`, or `Ask a question`).

Never show a decorative button that cannot complete or clearly hand off the action. After a form submission, provide a reference, expected response time, privacy notice, and accessible success/error state.

### Memorial flow

Use restrained language and no marketing urgency. The flow is: understand the facility → read the enshrinement process → see what documents/appointment are required → contact the memorial office. The live `/42` and `/43` pages show `02-822-8771`, while the global footer shows `010-4803-8771`; do not choose between them in code. Require temple staff to verify number ownership, then display one labelled purpose per number. The Remembrance Room must state whether letters are public, how moderation works, and what personal data is retained. If writing is not implemented, omit the write button rather than simulate it.

## Reusable content schema

Keep copy and facts in locale-aware content records, not duplicated JSX or breakpoint-specific widgets.

```ts
type Locale = "ko" | "en";
type Localized = Record<Locale, string>;

type RouteRecord = {
  id: string;
  legacyPath: string;
  path: string;
  section: "about" | "prayer" | "events" | "education" | "news" | "memorial" | "utility";
  template: PageTemplate;
  navLabel: Localized;
  title: Localized;
  summary: Localized;
  seo: { title: Localized; description: Localized };
  hero?: { src: string; alt: Localized | ""; focalPoint?: string };
  sections: ContentSection[];
  cta?: Action;
  lastVerified: string;
  verifiedBy: string;
};

type ProgramFacts = {
  audience: Localized;
  schedule: Localized;
  duration: Localized;
  venue: Localized;
  feeOrDonation: Localized;
  availability: "open" | "waitlist" | "closed" | "ongoing" | "confirm";
  eligibility?: Localized;
  preparation?: Localized;
  languageSupport?: Localized;
  contactRole: "general-office" | "education-office" | "memorial-office";
  action: Action;
  lastVerified: string;
};
```

No localized field may be empty in production. Shared factual values such as phone numbers, coordinates, prices, and timestamps should be stored once and formatted per locale. Use `Asia/Seoul` for event times and locale-aware display, for example `2026년 8월 1일 토요일 오후 2시` and `Sat, Aug 1, 2026, 2:00 PM`.

## Component and page-template system

### Global components

- `SkipLink`
- `ServiceNotice`
- `SiteHeader`, `DesktopNav`, `MobileNavDrawer`
- `LanguageSwitch` (text labels `한국어` and `English`, never flags)
- `Breadcrumbs` and `SectionNav`
- `PageHero`, `SectionIntro`, `RichText`
- `Button`, `TextLink`, `IconLabel`, `StatusBadge`
- `FactGrid`, `ScheduleCard`, `ProgramCard`, `EventCard`
- `ContactRoleCard`, `MapLinkGroup`, `ActionPanel`
- `NoticeList`, `FilterBar`, `Pagination`
- `Timeline`, `HallCard`, `GalleryGrid`, accessible `Lightbox`
- `EmptyState`, `ErrorState`, `FormField`, `FormStatus`
- `MobileActionBar` and `SiteFooter`

All icon components require an adjacent visible label except purely decorative icons, which are hidden from assistive technology.

### Templates

| Template | Required structure |
| --- | --- |
| Home | Hero, quick actions, current schedule, first visit, practices, story, latest content, contact |
| Section landing | Section hero, concise orientation, child-page cards, current related schedule/notices, contextual CTA |
| Story | Breadcrumbs, one H1, standfirst, dated/structured sections, optional media, related links |
| Story + timeline | Story plus semantic ordered timeline; do not use position-only decorative dates |
| Place directory | Hall cards with localized name, purpose, etiquette, accessible image, and location relationship |
| Directions | Address, map links, text transit steps, parking/accessibility facts, hours, tap-to-call |
| Program/Course | Summary, `ProgramFacts`, benefits/curriculum, schedule, preparation, verified CTA, related programs |
| Collection | Filterable cards with dates/status and a useful empty state; filters remain optional without JavaScript |
| Archive | Search/category filters, semantic list, dates, pagination, article detail routes |
| Gallery | Captioned responsive images, keyboard-operable lightbox, no image-only links without names |
| Contact | Labelled office cards, hours, response expectations, consent-aware form or phone-only fallback |
| Guided inquiry | Calm step sequence, required documents/facts, labelled contact, no fake price or availability |
| Moderated archive | Privacy/moderation explanation, letters list, optional authenticated writing flow |

## Visual tokens

### Color

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#1E211D` | Primary text, dark UI |
| `muted-ink` | `#50574F` | Secondary text; passes AA on light surfaces |
| `hanji` | `#F7F2E8` | Main warm page background |
| `paper` | `#FFFDF8` | Cards and reading surfaces |
| `line` | `#E5DCCC` | Rules and quiet borders |
| `temple-green` | `#1F4D3D` | Primary actions, selected state |
| `earth-red` | `#6F2E25` | Important accent, secondary action |
| `bronze` | `#B78643` | Small decorative accents only; never white text on bronze |

Use `temple-green` or `earth-red` with white text; both exceed WCAG AA for normal text. Use `bronze` with `ink`, not as a text/button background with white. Do not ship an automatic dark theme in the first release; it would double image, contrast, and brand QA without helping the core visitor journey.

### Typography

- Display/headings: `Noto Serif KR`, `Noto Serif`, Georgia, serif.
- Body/UI: `Noto Sans KR`, `Noto Sans`, system-ui, sans-serif.
- Self-host Korean-subset WOFF2 files when licensing permits; use `font-display: swap` and preload only the critical face.
- Korean body: 16px minimum on mobile, 18px preferred for long reading, line-height 1.7–1.8.
- English body: 16–18px, line-height 1.55–1.7.
- H1: `clamp(2.25rem, 4.8vw, 4.5rem)`; H2: `clamp(1.75rem, 3vw, 2.75rem)`; H3: `clamp(1.25rem, 2vw, 1.75rem)`.
- Use `word-break: keep-all` for Korean headings and short labels; cap reading text at `70ch`.
- Keep body copy left-aligned. Center only short hero or ceremonial statements.

### Layout, shape, and motion

- 8px spacing base: `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- Page max width 1200px; reading max width 760px; responsive gutters 20px, 32px, and 48px.
- Card radius 12px; buttons 8px; avoid pill shapes except status chips.
- Shadow only for overlays and raised action panels; use borders/spacing for ordinary cards.
- Minimum interactive target 44×44px; focus ring 3px `#1F4D3D` with 2px light offset.
- Transitions 160–240ms. Disable nonessential motion with `prefers-reduced-motion`.

## Responsive navigation and action behavior

- **1024px and wider:** full six-item navigation; restrained mega-menu or two-column section panel; language and visit CTA visible.
- **Below 1024px:** logo, language control, search if present, and labelled Menu button. The drawer contains all six sections and their children, supports Escape, traps focus while open, restores focus on close, and prevents background scroll.
- Use `aria-expanded`, `aria-controls`, and `aria-current="page"`. Never depend on hover.
- On inner pages, an `In this section` navigation shows sibling pages. It may become a disclosure on narrow screens but must expose the active page and work without horizontal page overflow.
- A mobile bottom bar may show Directions, Call, and one contextual action. Account for `env(safe-area-inset-bottom)` and remove it when a form field or dialog needs the space.
- At 320px and 200% zoom, the menu, language switch, title, and primary action must remain operable without two-dimensional scrolling.

## Accessibility and bilingual rules

- Set `<html lang="ko">` or `<html lang="en">`; mark isolated foreign-language phrases with their own `lang`.
- Exactly one H1 and one main landmark per page; use logical headings, semantic lists/tables, breadcrumbs, and a keyboard skip link.
- Keep browser zoom enabled. Maintain visible focus, sensible focus order, and keyboard parity for every pointer interaction.
- Meet WCAG 2.2 AA: 4.5:1 normal text, 3:1 large text and meaningful non-text UI.
- Every informative image gets localized alt text; decorative texture and redundant hero imagery use `alt=""`. Give all images intrinsic dimensions.
- Maps supplement text directions; they never replace them. Phone links use international `tel:` values and locally familiar display formatting.
- No auto-advancing carousel, autoplay audio/video, hover-only reveal, or color-only status.
- Form errors identify the field, explain the fix, and are announced. Success messages use an appropriate live region without moving keyboard focus unexpectedly.
- Translate meaning, not just labels. Maintain an approved terminology glossary for `법회`, `불공`, `공양`, `재`, `수계`, and `신묘장구대다라니`; on first English use, pair the accessible English explanation with the Korean/Buddhist term when useful.
- Language switching must never discard query/filter context that has a valid counterpart or send the visitor back to home.

## Global site contract

The visual system is not complete until the site identity and trust basics are present:

- `favicon.svg`, fallback `favicon.ico`, `apple-touch-icon.png`, and referenced `site.webmanifest`;
- unique localized title and description on every canonical page;
- HTTPS canonical, `hreflang` for `ko`, `en`, and `x-default`, Open Graph/social image, and suitable Organization/Place/Event JSON-LD;
- HTTPS sitemap and robots file, helpful localized 404, and explicit legacy redirects;
- responsive AVIF/WebP images with `srcset`, intrinsic sizes, one eager hero only, and lazy loading below the fold;
- verified address, hours, map destinations, and one clearly owned purpose for every published phone number;
- a published privacy policy before collecting inquiries, remembrance letters, analytics, or other personal data.

The release checklist in `docs/qa-checklist.md` remains the test contract. Design acceptance should include Korean and English review at 320, 390, 768, 1024, and 1440px, keyboard-only navigation, VoiceOver spot checks, 200% zoom, reduced motion, and a no-JavaScript content pass.

