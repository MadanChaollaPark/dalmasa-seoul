/**
 * Single bilingual source of truth for Dalmasa's canonical site content.
 *
 * The semantic paths in this file never include a locale prefix. Use
 * `localizedPath()` when rendering a link. Facts that appear on several pages
 * (address, contacts, office hours, and recurring schedules) live once below
 * so Korean, English, desktop, and mobile views cannot drift apart.
 */

export type Locale = "ko" | "en";
export type Localized = Readonly<Record<Locale, string>>;

export type SiteSection =
  | "home"
  | "about"
  | "prayer"
  | "events"
  | "education"
  | "news"
  | "memorial"
  | "utility";

export type PageTemplate =
  | "home"
  | "contact"
  | "section-landing"
  | "story"
  | "story-timeline"
  | "story-portrait"
  | "place-directory"
  | "directions"
  | "program"
  | "schedule-collection"
  | "program-collection"
  | "course"
  | "archive"
  | "story-cta"
  | "story-facilities"
  | "guided-inquiry"
  | "moderated-archive"
  | "gallery"
  | "education-overview"
  | "visit";

export interface ContentSection {
  readonly heading: Localized;
  readonly body: readonly Localized[];
  readonly items?: readonly Localized[];
}

export interface Action {
  readonly label: Localized;
  /** Locale-neutral internal path, tel URI, or absolute external URL. */
  readonly href: string;
  readonly kind: "primary" | "secondary" | "contact";
}

export interface ProgramFacts {
  readonly audience: Localized;
  readonly schedule: Localized;
  readonly duration: Localized;
  readonly venue: Localized;
  readonly feeOrDonation: Localized;
  readonly availability: "open" | "waitlist" | "closed" | "ongoing" | "confirm";
  readonly eligibility: Localized;
  readonly preparation: Localized;
  readonly languageSupport: Localized;
  readonly contactRole: "general-office" | "education-office" | "memorial-office";
  readonly action: Action;
  readonly verificationNote?: Localized;
}

export interface HeroImage {
  /** Stable lookup key; visual components map this to an optimized local asset. */
  readonly key: string;
  readonly alt: Localized;
}

export interface BilingualPage {
  readonly id: string;
  readonly legacyPaths: readonly string[];
  /** Canonical semantic path without /ko or /en. */
  readonly path: string;
  readonly section: SiteSection;
  readonly template: PageTemplate;
  readonly navLabel: Localized;
  readonly title: Localized;
  readonly summary: Localized;
  readonly seo: {
    readonly title: Localized;
    readonly description: Localized;
  };
  readonly hero: HeroImage;
  readonly sections: readonly ContentSection[];
  readonly cta: Action;
  readonly programFacts?: ProgramFacts;
  readonly verificationNotes?: readonly Localized[];
  readonly sourceCheckedAt: string;
}

export interface LocalizedSection {
  readonly heading: string;
  /** Preferred display name used by page components. */
  readonly paragraphs: readonly string[];
  /** Compatibility alias for data-oriented consumers. */
  readonly body: readonly string[];
  readonly items?: readonly string[];
}

export interface LocalizedPage {
  readonly id: string;
  readonly legacyPaths: readonly string[];
  readonly path: string;
  readonly canonicalPath: string;
  readonly section: SiteSection;
  readonly template: PageTemplate;
  readonly navLabel: string;
  readonly title: string;
  readonly summary: string;
  readonly seo: { readonly title: string; readonly description: string };
  readonly hero: { readonly key: string; readonly alt: string };
  readonly sections: readonly LocalizedSection[];
  readonly cta: { readonly label: string; readonly href: string; readonly kind: Action["kind"] };
  readonly programFacts?: {
    readonly audience: string;
    readonly schedule: string;
    readonly duration: string;
    readonly venue: string;
    readonly feeOrDonation: string;
    readonly availability: ProgramFacts["availability"];
    readonly eligibility: string;
    readonly preparation: string;
    readonly languageSupport: string;
    readonly contactRole: ProgramFacts["contactRole"];
    readonly contact: string;
    readonly action: { readonly label: string; readonly href: string; readonly kind: Action["kind"] };
    readonly verificationNote?: string;
  };
  readonly verificationNotes: readonly string[];
}

const SOURCE_CHECKED_AT = "2026-07-13T17:00:00+09:00";

const L = (ko: string, en: string): Localized => Object.freeze({ ko, en });

const S = (
  headingKo: string,
  headingEn: string,
  bodyKo: string | readonly string[],
  bodyEn: string | readonly string[],
  items: readonly Localized[] = [],
): ContentSection => ({
  heading: L(headingKo, headingEn),
  body: (Array.isArray(bodyKo) ? bodyKo : [bodyKo]).map((text, index) =>
    L(text, (Array.isArray(bodyEn) ? bodyEn : [bodyEn])[index] ?? ""),
  ),
  ...(items.length ? { items } : {}),
});

const A = (
  labelKo: string,
  labelEn: string,
  href: string,
  kind: Action["kind"] = "primary",
): Action => ({ label: L(labelKo, labelEn), href, kind });

const page = (
  value: Omit<BilingualPage, "navLabel" | "hero" | "sourceCheckedAt"> & {
    navLabel?: Localized;
    hero?: HeroImage;
  },
): BilingualPage => ({
  ...value,
  navLabel: value.navLabel ?? value.title,
  hero: value.hero ?? HERO_LIBRARY[value.section],
  sourceCheckedAt: SOURCE_CHECKED_AT,
});

export const HERO_LIBRARY: Readonly<Record<SiteSection, HeroImage>> = Object.freeze({
  home: Object.freeze({
    key: "home",
    alt: L("서달산에서 한강과 서울을 바라보는 달마사 전경", "Dalmasa on Seodal Mountain overlooking the Han River and Seoul"),
  }),
  about: Object.freeze({
    key: "temple",
    alt: L("서달산 숲과 어우러진 달마사 전각", "Dalmasa's temple halls among the trees of Seodal Mountain"),
  }),
  prayer: Object.freeze({
    key: "practice",
    alt: L("달마사 대웅전의 고요한 수행 공간", "The quiet practice space inside Dalmasa's Daeungjeon"),
  }),
  events: Object.freeze({
    key: "service",
    alt: L("달마사 대웅전에서 함께하는 법회", "A community Dharma service in Dalmasa's Daeungjeon"),
  }),
  education: Object.freeze({
    key: "lanterns",
    alt: L("달마사 불학원에서 경전을 배우는 시간", "A Buddhist learning session at Dalmasa Academy"),
  }),
  news: Object.freeze({
    key: "forest",
    alt: L("기도와 법회에 함께한 달마사 공동체", "The Dalmasa community gathered for prayer and a Dharma service"),
  }),
  memorial: Object.freeze({
    key: "winter",
    alt: L("전통사찰 양식의 달마사 영일당과 영월당", "Dalmasa's traditional-style Yeongildang and Yeongwoldang memorial halls"),
  }),
  utility: Object.freeze({
    key: "temple",
    alt: L("서달로에서 달마사로 이어지는 방문 길", "The approach from Seodal-ro to Dalmasa Temple"),
  }),
});

export const SITE_FACTS = Object.freeze({
  canonicalOrigin: "https://dalmasa-seoul-bilingual.chaollapark.chatgpt.site",
  timeZone: "Asia/Seoul",
  name: L("대한불교조계종 흑석동 달마사", "Dalmasa Temple, Heukseok-dong"),
  affiliation: L("대한불교조계종", "Jogye Order of Korean Buddhism"),
  address: L(
    "서울특별시 동작구 서달로 50-26(흑석동)",
    "50-26 Seodal-ro, Dongjak-gu, Seoul, Republic of Korea",
  ),
  contacts: Object.freeze({
    generalOffice: Object.freeze({
      role: "general-office" as const,
      label: L("종무소 · 접수 문의", "General office · registration"),
      phoneDisplay: "02-813-7425",
      phoneHref: "tel:+8228137425",
      hours: L("매일 08:00–17:00", "Daily, 8:00 AM–5:00 PM"),
      verification: "published-footer" as const,
    }),
    educationOffice: Object.freeze({
      role: "education-office" as const,
      label: L("교육국 · 교육 문의", "Education office"),
      phoneDisplay: "010-8574-7475",
      phoneHref: "tel:+821085747475",
      hours: L("운영시간은 전화로 확인", "Call to confirm office hours"),
      verification: "published-footer" as const,
    }),
    memorialOffice: Object.freeze({
      role: "memorial-office" as const,
      label: L("봉안당 · 안치 문의", "Memorial hall · enshrinement"),
      phoneDisplay: "010-4803-8771",
      phoneHref: "tel:+821048038771",
      hours: L(
        "09:00–17:00 · 점심 11:30–12:30",
        "9:00 AM–5:00 PM · lunch 11:30 AM–12:30 PM",
      ),
      verification: "published-footer-role-needs-confirmation" as const,
    }),
    additionalMemorialNumber: Object.freeze({
      role: "memorial-office" as const,
      label: L(
        "봉안당 상세 페이지 기재 번호 · 역할 확인 필요",
        "Number printed on memorial detail pages · role confirmation required",
      ),
      phoneDisplay: "02-822-8771",
      phoneHref: "tel:+8228228771",
      hours: L("운영시간은 전화로 확인", "Call to confirm office hours"),
      verification: "published-detail-pages-role-needs-confirmation" as const,
    }),
  }),
  sourceCheckedAt: SOURCE_CHECKED_AT,
});

export const RECURRING_SCHEDULES = Object.freeze({
  daily: Object.freeze([
    L("새벽예불 · 매일 04:00 · 대웅전", "Dawn service · daily 4:00 AM · Daeungjeon"),
    L("사시불공 · 매일 10:00 · 대웅전", "Sasi offering · daily 10:00 AM · Daeungjeon"),
    L(
      "저녁예불 · 11월–3월 18:00, 4월–10월 18:30 · 대웅전",
      "Evening service · 6:00 PM Nov–Mar, 6:30 PM Apr–Oct · Daeungjeon",
    ),
  ]),
  monthly: Object.freeze([
    L("신중 3일기도 · 음력 1–3일 10:00", "Sinjung three-day prayer · lunar days 1–3 at 10:00 AM"),
    L("인등기도 · 음력 15일 10:00", "Individual lantern prayer · lunar day 15 at 10:00 AM"),
    L("지장재일기도 · 음력 18일 10:00", "Ksitigarbha observance · lunar day 18 at 10:00 AM"),
    L(
      "산신기도 · 넷째 토요일 · 하절기 18:30, 동절기 18:00",
      "Mountain-spirit prayer · fourth Saturday · 6:30 PM summer, 6:00 PM winter",
    ),
  ]),
  services: Object.freeze([
    L("초하루법회 · 음력 1일 신중기도 후 · 대웅전", "Lunar first-day service · after Sinjung prayer · Daeungjeon"),
    L("일요법회 · 매주 일요일 10:00 · 대웅전", "Sunday Dharma service · Sundays 10:00 AM · Daeungjeon"),
    L("청년법회 · 격주 토요일 14:00 · 교육관", "Young adult service · alternate Saturdays 2:00 PM · Education Hall"),
  ]),
});

const EDUCATION_CTA = A("교육국 문의처 보기", "See the education contact", "/contact", "contact");
const GENERAL_CTA = A("종무소 문의처 보기", "See the general-office contact", "/contact", "contact");
const MEMORIAL_CTA = A("봉안 상담 문의", "Ask about a memorial consultation", "/contact", "contact");

export const PAGE_RECORDS: readonly BilingualPage[] = Object.freeze([
  page({
    id: "home",
    legacyPaths: ["/index"],
    path: "/",
    section: "home",
    template: "home",
    title: L("달마사", "Dalmasa Temple"),
    summary: L(
      "한강과 남산을 바라보는 서달산의 전통사찰에서 예불, 기도, 법회와 불교교육을 만나보세요. 처음 오시는 분도 환영합니다.",
      "A traditional temple on Seodal Mountain overlooking the Han River and central Seoul. Join prayer, Dharma services, and Buddhist learning; first-time visitors are welcome.",
    ),
    seo: {
      title: L("달마사 | 서울 흑석동 전통사찰", "Dalmasa Temple | A Buddhist Temple in Seoul"),
      description: L(
        "서울 흑석동 서달산에 자리한 대한불교조계종 달마사의 방문 안내, 예불과 기도 일정, 법회, 불교교육, 소식과 봉안당 정보를 한곳에서 확인하세요.",
        "Plan a visit to Dalmasa Temple in Heukseok-dong, Seoul, and find verified prayer times, Dharma services, Buddhist classes, temple news, directions, and memorial information.",
      ),
    },
    sections: [
      S(
        "처음 오셨나요?",
        "First time at Dalmasa?",
        "주소와 대중교통, 도착 후 예절, 확인이 필요한 접근성 정보를 방문 전에 살펴보세요.",
        "Check the address, public transport, arrival etiquette, and clearly marked accessibility questions before you travel.",
      ),
      S(
        "달마사의 수행과 배움",
        "Practice and learning",
        "매일 예불과 정기기도, 일요법회, 기본교육부터 경전반까지 자신의 인연에 맞는 길을 찾을 수 있습니다.",
        "Find a path that fits: daily worship, recurring prayers, Sunday Dharma service, introductory learning, Buddhist College, or sutra study.",
        [
          L("기도·불공", "Prayer & Offerings"),
          L("법회·행사", "Dharma Services & Events"),
          L("불교교육", "Buddhist Education"),
          L("봉안당", "Memorial Hall"),
        ],
      ),
      S(
        "달마사 소식",
        "Current from Dalmasa",
        "기도와 교육 모집, 법회와 사찰 운영에 관한 최신 공지는 날짜와 상태를 확인한 뒤 참여해 주세요.",
        "Read dated notices for prayer programs, enrollment, Dharma services, and temple operations; confirm the current status before attending.",
      ),
      S(
        "찾아오시는 길",
        "Visit and contact",
        SITE_FACTS.address.ko,
        SITE_FACTS.address.en,
        [
          L("종무소 02-813-7425 · 08:00–17:00", "General office +82 2-813-7425 · 8:00 AM–5:00 PM"),
          L("교육국 010-8574-7475", "Education office +82 10-8574-7475"),
          L("봉안당 연락처 역할은 사찰 확인 필요", "Memorial contact roles require temple confirmation"),
        ],
      ),
    ],
    cta: A("방문 계획하기", "Plan your visit", "/visit"),
  }),

  page({
    id: "contact",
    legacyPaths: ["/contact"],
    path: "/contact",
    section: "utility",
    template: "contact",
    title: L("문의하기", "Contact & Inquiries"),
    summary: L(
      "방문과 접수는 종무소, 교육은 교육국, 봉안과 안치는 봉안당으로 문의할 수 있도록 연락처를 역할별로 안내합니다.",
      "Choose the right contact for a visit or registration, Buddhist education, or memorial and enshrinement questions.",
    ),
    seo: {
      title: L("달마사 문의 | 종무소·교육국·봉안당", "Contact Dalmasa | Temple, Education & Memorial Offices"),
      description: L(
        "달마사 종무소, 교육국, 봉안당의 전화번호와 운영시간, 문의 범위를 역할별로 확인하세요. 봉안 관련 두 번호의 정확한 담당 범위는 사찰 확인이 필요합니다.",
        "Find Dalmasa's general, education, and memorial office phone numbers, roles, and published hours. Two memorial numbers remain clearly labelled for staff role confirmation.",
      ),
    },
    sections: [
      S(
        "종무소",
        "General office",
        "방문, 기도 접수와 일반 문의를 받습니다. 운영시간은 매일 08:00–17:00으로 게시되어 있습니다.",
        "For visits, prayer registration, and general questions. Published hours are daily from 8:00 AM to 5:00 PM.",
        [L("02-813-7425", "+82 2-813-7425")],
      ),
      S(
        "교육국",
        "Education office",
        "기본교육, 불교대학, 경전반과 기타 교육과정의 모집 여부와 준비사항을 확인하세요.",
        "Ask about Buddhist Foundations, Buddhist College, sutra study, current enrollment, and preparation.",
        [L("010-8574-7475", "+82 10-8574-7475")],
      ),
      S(
        "봉안당",
        "Memorial office",
        "공통 하단에는 010-4803-8771, 봉안 상세 페이지에는 02-822-8771이 게시되어 있습니다. 각 번호의 담당 역할은 사찰이 확인해야 합니다.",
        "The site footer publishes +82 10-4803-8771 while memorial detail pages publish +82 2-822-8771. Temple staff must confirm the purpose of each number.",
        [
          L("010-4803-8771 · 역할 확인 필요", "+82 10-4803-8771 · role confirmation required"),
          L("02-822-8771 · 역할 확인 필요", "+82 2-822-8771 · role confirmation required"),
        ],
      ),
      S("주소", "Address", SITE_FACTS.address.ko, SITE_FACTS.address.en),
    ],
    cta: GENERAL_CTA,
    verificationNotes: [
      L(
        "봉안 관련 두 전화번호의 담당 업무를 사찰이 확인한 뒤 하나의 목적 라벨로 게시해야 합니다.",
        "Temple staff must confirm the purpose of both memorial numbers before each is published with a definitive role label.",
      ),
    ],
  }),

  page({
    id: "about",
    legacyPaths: ["/18"],
    path: "/about",
    section: "about",
    template: "section-landing",
    title: L("달마사 소개", "About Dalmasa"),
    summary: L(
      "1931년 창건한 달마사의 역사와 비전, 주지스님 인사말, 전각과 서달산의 풍경을 차례로 만나보세요.",
      "Learn about Dalmasa's 1931 founding, vision, abbot, temple halls, and setting on Seodal Mountain in Seoul.",
    ),
    seo: {
      title: L("달마사 소개 | 역사·비전·전각 안내", "About Dalmasa | History, Vision & Temple Halls"),
      description: L(
        "1931년 창건된 서울 흑석동 달마사의 역사, 공동체 비전, 주지 일행스님의 인사말과 대웅전·극락전 등 전각 정보를 살펴보세요.",
        "Explore the history of Dalmasa since 1931, its community vision, a greeting from Venerable Ilhaeng, and a guide to the temple's halls and sacred places.",
      ),
    },
    sections: [
      S(
        "서달산의 전통사찰",
        "A traditional temple on Seodal Mountain",
        "달마사는 한강과 남산을 바라보며 계절의 변화를 누릴 수 있는 대한불교조계종 사찰입니다.",
        "Dalmasa is a Jogye Order temple where visitors can look toward the Han River and Namsan through the changing seasons.",
      ),
      S(
        "달마사를 알아가는 길",
        "Explore Dalmasa",
        "역사와 비전, 주지스님 인사말, 전각 안내를 읽고 방문 정보로 이어가세요.",
        "Continue through the history, vision, abbot's greeting, hall guide, and practical directions.",
        [
          L("1931년부터 이어온 역사", "History since 1931"),
          L("수행과 지역 공동체의 비전", "A vision for practice and community"),
          L("14곳의 전각과 기도처", "Fourteen halls and sacred places"),
        ],
      ),
    ],
    cta: A("달마사 역사 보기", "Read Dalmasa's history", "/about/history"),
  }),

  page({
    id: "history",
    legacyPaths: ["/19"],
    path: "/about/history",
    section: "about",
    template: "story-timeline",
    title: L("달마사 역사", "History"),
    summary: L(
      "유심스님이 1931년 창건한 뒤 전통사찰 지정, 대웅전 중창과 전통문화체험관 준공으로 이어진 달마사의 발자취입니다.",
      "Dalmasa's story runs from its founding by Venerable Yusim in 1931 through traditional-temple designation, rebuilding, and new cultural facilities.",
    ),
    seo: {
      title: L("달마사 역사 | 1931년 창건부터 오늘까지", "Dalmasa History | From 1931 to Today"),
      description: L(
        "1931년 유심스님의 창건, 1988년 전통사찰 지정, 대웅전 중창, 보물 지정과 2022년 전통문화체험관·영일당·영월당 준공까지 연혁을 읽어보세요.",
        "Follow Dalmasa's timeline from its 1931 founding and 1988 traditional-temple designation to rebuilding, a designated treasure, and facilities completed in 2022.",
      ),
    },
    sections: [
      S(
        "서달산과 달마사",
        "Dalmasa and Seodal Mountain",
        "북한산에서 남산을 거쳐 관악산으로 이어지는 녹색축의 서달산이 달마사를 감싸며, 경내에서는 한강과 남산을 조망할 수 있습니다.",
        "Seodal Mountain, part of the green corridor linking Bukhansan, Namsan, and Gwanaksan, surrounds Dalmasa and opens views toward the Han River and Namsan.",
      ),
      S(
        "1931–1999",
        "1931–1999",
        "1931년 유심스님 창건 후 1962년 조계종 등록, 1968년 대웅전 신축과 다보탑 조성, 1988년 전통사찰 지정으로 이어졌습니다.",
        "Venerable Yusim founded Dalmasa in 1931. It joined the Jogye Order registry in 1962, built a new Daeungjeon and Dabotap in 1968, and was designated a traditional temple in 1988.",
      ),
      S(
        "2000–2019",
        "2000–2019",
        "사운당·자인당·자하루와 일주문을 새로 짓고, 2016년 새 대웅전을 완공했습니다. 2019년 상교정본 자비도량참법 권3이 보물 제875-3호로 지정되었습니다.",
        "Dalmasa added Saundang, Jaindang, Jaharu, and the gate, completed the new Daeungjeon in 2016, and saw volume three of the Sanggyojeongbon Jabi Doryang Chambeop designated Treasure No. 875-3 in 2019.",
      ),
      S(
        "2020–2022",
        "2020–2022",
        "제2차 천일기도를 시작하고 전통문화체험관, 극락전, 영월당의 공사를 거쳐 2022년 관련 시설을 준공했습니다.",
        "Dalmasa opened its second 1,000-day prayer cycle and completed work associated with the Traditional Culture Experience Center, Geungnakjeon, and Yeongwoldang in 2022.",
      ),
    ],
    cta: A("전각 둘러보기", "Explore the temple halls", "/about/halls"),
  }),

  page({
    id: "vision",
    legacyPaths: ["/20"],
    path: "/about/vision",
    section: "about",
    template: "story",
    title: L("달마사 비전", "Vision"),
    summary: L(
      "정법과 신행을 이어온 달마사는 수행과 교육, 봉사와 지역 포교를 통해 서울 남서부의 모범적인 전통사찰을 지향합니다.",
      "Dalmasa looks to its next century through Buddhist practice, education, service, and community outreach in southwestern Seoul.",
    ),
    seo: {
      title: L("달마사 비전 | 수행·교육·봉사의 도량", "Dalmasa's Vision | Practice, Learning & Community"),
      description: L(
        "서울 남서부 전통사찰로서 달마사가 지향하는 자등명·법등명의 수행, 체계적인 신행교육, 봉사활동과 지역 공동체 포교의 방향을 소개합니다.",
        "Read Dalmasa's vision for its next century: a trusted traditional temple shaped by self-reflection, Dharma learning, volunteer service, and local community outreach.",
      ),
    },
    sections: [
      S(
        "전통사찰의 위상",
        "A trusted traditional temple",
        "달마사는 만공스님이 이름을 지은 전통사찰로서 정법과 신행을 이어 온 바탕 위에 새로운 100년을 준비합니다.",
        "Named by the modern Buddhist master Mangong, Dalmasa is preparing for a new century grounded in orthodox teaching and lived practice.",
      ),
      S(
        "자등명·법등명",
        "Be a lamp unto yourself and the Dharma",
        "교육, 신행과 봉사를 통해 스스로 마음의 등불을 밝히고 꾸준히 수행 정진하는 도량을 지향합니다.",
        "Education, devotional life, and service help practitioners kindle inner clarity and continue steady practice.",
      ),
      S(
        "지역 공동체",
        "Community through local outreach",
        "흑석동과 함께 변화해 온 달마사는 주민에게 휴식과 위안을 전하고 전통과 현대가 만나는 문화공간이 되고자 합니다.",
        "Having grown alongside Heukseok-dong, Dalmasa aims to offer rest, reassurance, and a cultural meeting place where tradition and modern Seoul can coexist.",
      ),
    ],
    cta: A("주지스님 인사말", "Read the abbot's greeting", "/about/abbot"),
  }),

  page({
    id: "abbot",
    legacyPaths: ["/21"],
    path: "/about/abbot",
    section: "about",
    template: "story-portrait",
    title: L("주지스님 인사말", "Greeting from the Abbot"),
    summary: L(
      "주지 일행스님은 자연과 현대 서울이 만나는 달마사에서 자신의 발자취와 앞으로 걸어갈 방향을 천천히 돌아보길 권합니다.",
      "Venerable Ilhaeng welcomes visitors to pause where nature and modern Seoul meet, and to reflect on the path already travelled and the direction ahead.",
    ),
    seo: {
      title: L("주지 일행스님 인사말 | 달마사", "A Welcome from Venerable Ilhaeng | Dalmasa"),
      description: L(
        "달마사 주지 일행스님이 전하는 환영의 글입니다. 부처님의 가르침과 자연, 예스러움이 함께하는 고요한 도량에서 삶의 방향을 돌아보세요.",
        "Read Venerable Ilhaeng's welcome to Dalmasa, a quiet temple where Buddhist teaching, nature, traditional character, and contemporary Seoul meet.",
      ),
    },
    sections: [
      S(
        "아름답고 고요한 도량",
        "A quiet and beautiful temple",
        "낙엽과 풀, 오가는 사람의 삶이 현대 도시와 만나는 달마사는 부처님의 가르침과 예스러움을 품고 있습니다.",
        "Leaves, grasses, and the lives of passing visitors meet the modern city at Dalmasa, while Buddhist teaching and traditional character remain present.",
      ),
      S(
        "삶의 방향을 찾는 쉼터",
        "A place to pause and find direction",
        "달마사에서 지금까지 걸어온 발자취와 현재의 삶, 앞으로 걸어갈 방향을 돌아보는 시간을 가져보시기 바랍니다.",
        "May a visit offer time to consider where you have come from, where life stands now, and the direction you hope to take.",
      ),
      S(
        "합장",
        "With palms together",
        "달마사를 찾는 모든 분의 삶이 안팎으로 풍요로워지기를 바랍니다. 대한불교조계종 달마사 주지 일행(一行) 합장.",
        "May everyone who visits Dalmasa find a life enriched inwardly and outwardly. Venerable Ilhaeng, Abbot of Dalmasa.",
      ),
    ],
    cta: A("방문 안내 보기", "Plan a visit", "/visit"),
  }),

  page({
    id: "halls",
    legacyPaths: ["/22"],
    path: "/about/halls",
    section: "about",
    template: "place-directory",
    title: L("전각 안내", "Temple Halls"),
    summary: L(
      "진여문에서 대웅전과 극락전, 삼성각, 소림굴 영천, 봉안 전각과 서달산의 기도처까지 달마사 경내를 이해하는 안내입니다.",
      "Explore Dalmasa from Jinyeomun Gate to its main and memorial halls, shrines, sacred spring, statues, and outdoor prayer places.",
    ),
    seo: {
      title: L("달마사 전각 안내 | 대웅전·극락전·삼성각", "Dalmasa Temple Halls | A Guide to the Grounds"),
      description: L(
        "달마사의 진여문, 자인당, 사운당, 자하루, 대웅전, 삼성각, 소림굴 영천, 영일당·영월당, 극락전과 야외 불상·기도처를 안내합니다.",
        "Discover fourteen places across Dalmasa's grounds, including Jinyeomun Gate, Daeungjeon, Samseonggak, the sacred spring, memorial halls, statues, and Turtle Rock.",
      ),
    },
    sections: [
      S(
        "진여문과 생활 전각",
        "Gate and residential buildings",
        "첫 문인 진여문 위에는 누각이 있으며 별도 사천왕문은 없습니다. 자인당은 스님과 종무원의 생활공간, 사운당은 스님 전용 요사채, 자하루는 저녁노을과 부처님의 광명을 떠올리게 하는 전각입니다.",
        "Jinyeomun is Dalmasa's first gate, with a pavilion above and no separate Four Heavenly Kings gate. Jaindang houses monastics and staff, Saundang is monastic lodging, and Jaharu is named for its sunset light.",
      ),
      S(
        "대웅전·삼성각·극락전",
        "Main worship halls",
        "2016년 완공된 대웅전에서는 매일 예불과 사시불공이 봉행됩니다. 삼성각에는 치성광여래, 산신과 독성을 모시며, 극락전에서는 영가의 극락왕생을 발원하는 재를 봉행합니다.",
        "Completed in 2016, Daeungjeon hosts daily worship and the Sasi offering. Samseonggak enshrines Chiseonggwang Yeorae with mountain and solitary sages; Geungnakjeon hosts rites wishing the deceased a peaceful rebirth.",
      ),
      S(
        "영일당·영월당",
        "Yeongildang and Yeongwoldang",
        "국립현충원과 맞닿은 전통사찰 양식의 봉안시설로, 조상의 음덕과 자손의 효를 부처님 곁에서 기리는 추모 전각입니다.",
        "Traditional-style memorial facilities beside Seoul National Cemetery, these halls provide a Buddhist setting for remembrance and filial respect.",
      ),
      S(
        "소림굴과 야외 기도처",
        "Sacred spring and outdoor prayer places",
        "마르지 않는 샘인 소림굴 영천, 미륵부처님, 석조관세음보살님, 아미타부처님, 거북바위와 자연스러운 미소의 마애존불상을 경내에서 만날 수 있습니다.",
        "The grounds include Sorimgul's perennial sacred spring, Maitreya, stone Avalokitesvara and Amitabha statues, Turtle Rock, and a naturally expressive rock-carved Buddha.",
        [
          L("경내에서는 수행과 의식을 방해하지 않도록 조용히 이동해 주세요.", "Move quietly and avoid interrupting worship or ceremonies."),
          L("사진 촬영 가능 범위는 현장에서 종무소에 확인해 주세요.", "Ask the general office about photography before taking pictures."),
        ],
      ),
    ],
    cta: A("방문 동선 확인", "Plan your route through the temple", "/visit"),
  }),

  page({
    id: "directions",
    legacyPaths: ["/23"],
    path: "/about/directions",
    section: "about",
    template: "directions",
    title: L("오시는 길", "Directions"),
    summary: L(
      "달마사는 서울 동작구 서달로 50-26에 있으며 흑석역, 노량진역, 상도역에서 동작01번 또는 동작21번 마을버스로 찾아올 수 있습니다.",
      "Dalmasa is at 50-26 Seodal-ro in Dongjak-gu and can be reached from Heukseok, Noryangjin, or Sangdo station by local bus.",
    ),
    seo: {
      title: L("달마사 오시는 길 | 흑석역·노량진역·상도역", "Directions to Dalmasa | Subway and Bus from Seoul"),
      description: L(
        "서울 동작구 서달로 50-26 달마사까지 흑석역·노량진역·상도역에서 마을버스로 오는 방법, 정확한 주소, 종무소 연락처와 확인이 필요한 접근성 정보를 안내합니다.",
        "Get text directions to Dalmasa at 50-26 Seodal-ro from Heukseok, Noryangjin, and Sangdo stations, plus the address, office contact, and clearly marked accessibility questions.",
      ),
    },
    sections: [
      S("주소", "Address", SITE_FACTS.address.ko, SITE_FACTS.address.en),
      S(
        "지하철에서 마을버스로",
        "Subway and local bus",
        "9호선 흑석역 3·4번 출구에서 중앙대병원 쪽으로 이동해 동작01번 또는 동작21번을 타고 달마사입구에서 내립니다. 9호선 노량진역 3번 출구에서는 동작01번, 7호선 상도역 5번 출구에서는 동작01번 또는 동작21번을 이용합니다.",
        "From Heukseok Station exits 3 or 4, walk toward Chung-Ang University Hospital and take Dongjak 01 or 21 to Dalmasa Entrance. From Noryangjin exit 3 use Dongjak 01; from Sangdo exit 5 use Dongjak 01 or 21.",
      ),
      S(
        "간선·지선버스",
        "City buses",
        "151, 5511, 5517, 5524번은 흑석역에서, 452번은 중앙대병원에서 내려 동작01번 또는 동작21번으로 갈아탈 수 있습니다.",
        "Bus routes 151, 5511, 5517, and 5524 stop at Heukseok Station; route 452 stops at Chung-Ang University Hospital. Transfer to local bus Dongjak 01 or 21.",
      ),
      S(
        "도착 전 확인",
        "Confirm before arrival",
        "주차 가능 여부, 하차 지점, 경사와 계단, 휠체어 이동 경로는 현재 공개 정보만으로 확인되지 않았습니다. 이동 지원이 필요하면 종무소에 먼저 문의해 주세요.",
        "Published information does not yet verify parking, drop-off, slopes, stairs, or a wheelchair route. Contact the general office before travelling if you need mobility support.",
      ),
    ],
    cta: GENERAL_CTA,
    verificationNotes: [
      L(
        "주차, 승하차, 경사·계단과 휠체어 접근 경로는 사찰 현장 확인이 필요합니다.",
        "Parking, drop-off, gradients, stairs, and wheelchair access require on-site confirmation by temple staff.",
      ),
    ],
  }),

  page({
    id: "prayer",
    legacyPaths: ["/24"],
    path: "/prayer",
    section: "prayer",
    template: "section-landing",
    title: L("기도·불공", "Prayer & Offerings"),
    summary: L(
      "매일 예불과 상시기도, 월 정기기도, 특별기도, 재와 제사, 공양, 달마행자와 천일대정진기도를 한곳에서 살펴보세요.",
      "Explore daily worship, monthly and seasonal prayers, memorial rites, offerings, and longer practice programs at Dalmasa.",
    ),
    seo: {
      title: L("달마사 기도·불공 | 매일·월 정기·특별기도", "Prayer & Offerings at Dalmasa | Daily and Special Practice"),
      description: L(
        "달마사의 새벽예불과 사시불공, 월 정기기도, 특별기도, 재·제사, 등·떡·과일 공양, 달마행자와 신묘장구대다라니 천일기도를 안내합니다.",
        "Find Dalmasa's daily services, recurring and seasonal prayers, Buddhist memorial rites, offerings, practitioner membership, and 1,000-Day Great Dharani Practice.",
      ),
    },
    sections: [
      S(
        "매일과 매월의 수행",
        "Daily and monthly practice",
        "대웅전에서는 매일 새벽예불, 사시불공과 저녁예불을 봉행하며 음력과 절기에 따라 정기기도가 이어집니다.",
        "Daeungjeon hosts dawn, Sasi, and evening services every day, with recurring prayers following the lunar and seasonal calendar.",
        [...RECURRING_SCHEDULES.daily, ...RECURRING_SCHEDULES.monthly],
      ),
      S(
        "기도를 선택하는 방법",
        "Choose the appropriate practice",
        "개인 서원과 가족 축원, 조상과 영가를 위한 재, 절기기도와 공양은 의미와 접수 방법이 다릅니다. 일정과 동참금은 종무소에서 현재 내용을 확인하세요.",
        "Personal vows, family dedications, memorial rites, seasonal observances, and offerings have different meanings and arrangements. Confirm current dates and contributions with the general office.",
      ),
      S(
        "장기 수행",
        "Longer practice commitments",
        "달마행자는 정기기도와 가족 축원을 함께하는 수행 회원이며, 천일대정진기도는 사경과 독송을 1,000일 동안 이어가는 프로그램입니다.",
        "The Dalmasa Practitioner Program combines recurring prayers and family dedications, while the Great Dharani program sustains copying and recitation for 1,000 days.",
      ),
    ],
    cta: A("상시기도 일정 보기", "See the daily prayer schedule", "/prayer/daily"),
  }),

  page({
    id: "dalmasa-practitioner",
    legacyPaths: ["/25"],
    path: "/prayer/dalmasa-practitioner",
    section: "prayer",
    template: "program",
    title: L("달마행자", "Dalmasa Practitioner Program"),
    summary: L(
      "달마행자는 바쁜 일상에서도 정기기도, 가족 축원, 선망영가 기도와 인등을 이어가며 부처님의 가르침을 실천하는 수행 회원입니다.",
      "A recurring practice membership for family dedications, ancestor prayers, individual lanterns, and steady Buddhist practice alongside Dalmasa's monastics.",
    ),
    seo: {
      title: L("달마행자 수행기도 | 가족축원과 정기기도", "Dalmasa Practitioner Program | Recurring Prayer Membership"),
      description: L(
        "달마행자 수행기도의 의미와 포함되는 천일기도·신중기도·인등기도·지장재일·관음재일·산신기도, 직계가족 인등과 가입 문의 방법을 확인하세요.",
        "Understand the Dalmasa Practitioner Program, including recurring family and ancestor prayers, individual lanterns for close family, milestone support, and how to ask about joining.",
      ),
    },
    sections: [
      S(
        "달마행자란",
        "What is a Dalmasa practitioner?",
        "부처님의 가르침인 달마를 몸과 말과 생각으로 실천하고, 수행과 기도를 스님과 함께하는 불자를 뜻합니다.",
        "A Dalmasa practitioner seeks to embody the Dharma through body, speech, and mind while sharing prayer and practice with the monastic community.",
      ),
      S(
        "함께하는 정기기도",
        "Recurring prayers included",
        "매일 천일기도 가족축원, 음력 1–3일 신중기도, 음력 15일 인등기도, 음력 18일 지장재일기도, 음력 24일 관음재일기도와 매월 넷째 토요일 산신기도가 포함됩니다.",
        "The program includes daily 1,000-day prayer dedications, Sinjung prayer on lunar days 1–3, lantern prayer on day 15, Ksitigarbha prayer on day 18, Avalokitesvara prayer on day 24, and mountain-spirit prayer on the fourth Saturday.",
      ),
      S(
        "가족 인등과 경조사",
        "Family lanterns and milestones",
        "직계가족 최대 4인에게 1인 1등으로 대웅전 인등을 올리고 축원합니다. 직계가족 경조사에는 축하 또는 근조 화환 지원이 안내되어 있습니다.",
        "One lantern may be lit in Daeungjeon for each of up to four immediate family members. The published program also describes floral support for immediate-family milestones and bereavements.",
      ),
    ],
    cta: GENERAL_CTA,
    programFacts: {
      audience: L("정기적인 기도와 가족 축원을 이어가고 싶은 불자", "Buddhists seeking recurring practice and family dedications"),
      schedule: L("매일 및 음력·월별 정기기도", "Daily, lunar-calendar, and monthly recurring prayers"),
      duration: L("가입 기간은 종무소에 확인", "Contact the general office for membership duration"),
      venue: L("대웅전 등 각 기도처", "Daeungjeon and the relevant prayer locations"),
      feeOrDonation: L("동참금은 공개되지 않아 종무소 확인 필요", "The contribution is not published; ask the general office"),
      availability: "confirm",
      eligibility: L("가입 자격은 종무소에 확인", "Ask the general office about eligibility"),
      preparation: L("직계가족 축원 정보와 희망 기도를 준비", "Prepare close-family dedication details and the prayers requested"),
      languageSupport: L("외국어 지원 여부는 사전 확인", "Confirm language support before joining"),
      contactRole: "general-office",
      action: GENERAL_CTA,
    },
  }),

  page({
    id: "daily-prayer",
    legacyPaths: ["/26"],
    path: "/prayer/daily",
    section: "prayer",
    template: "schedule-collection",
    title: L("상시기도", "Daily Prayer"),
    summary: L(
      "새벽예불, 사시불공, 저녁예불과 생일기도, 당일·한달기도, 상담 후 정하는 독불공의 시간과 의미를 안내합니다.",
      "Find times and explanations for dawn, Sasi, and evening services, birthday prayers, request-based prayers, and privately arranged offerings.",
    ),
    seo: {
      title: L("달마사 상시기도 | 새벽·사시·저녁예불 시간", "Daily Prayer at Dalmasa | Worship and Offering Times"),
      description: L(
        "달마사 대웅전의 매일 새벽 4시 예불, 오전 10시 사시불공, 계절별 저녁예불과 생일기도·당일기도·한달기도·독불공의 이용 방법을 확인하세요.",
        "Check Dalmasa's 4:00 AM dawn service, 10:00 AM Sasi offering, seasonal evening service times, birthday prayers, request-based prayers, and private offering arrangements.",
      ),
    },
    sections: [
      S(
        "매일 예불과 불공",
        "Daily worship and offering",
        "새벽예불은 하루를 바르게 시작하고, 사시불공은 부처님과 스님들께 공양을 올리며, 저녁예불은 하루를 내려놓고 새날을 준비하는 시간입니다.",
        "Dawn worship begins the day with composure, the Sasi offering presents food to the Buddha and monastics, and evening worship closes the day and prepares for the next.",
        RECURRING_SCHEDULES.daily,
      ),
      S(
        "생일·당일·한달기도",
        "Birthday and request-based prayer",
        "생일기도, 특별한 목적이나 서원을 위한 당일기도와 한달기도는 매일 오전 10시 대웅전에서 봉행하는 것으로 안내되어 있습니다. 접수 가능 여부는 먼저 확인하세요.",
        "Birthday prayer and one-day or one-month prayers for a particular vow are published for 10:00 AM in Daeungjeon. Confirm registration before attending.",
      ),
      S(
        "독불공",
        "Private Buddhist offering",
        "가족 행사나 생일을 앞두고 공양을 올리는 독불공은 상담 후 시간과 장소를 정하며 대웅전 또는 삼성각에서 봉행합니다.",
        "A private offering for a family occasion or birthday is scheduled after consultation and may take place in Daeungjeon or Samseonggak.",
      ),
    ],
    cta: GENERAL_CTA,
  }),

  page({
    id: "special-prayer",
    legacyPaths: ["/27"],
    path: "/prayer/special",
    section: "prayer",
    template: "program-collection",
    title: L("특별기도", "Special Prayer"),
    summary: L(
      "성도재일, 정초산림, 입춘·삼재풀이, 출가열반, 참회기도, 안거, 학업성취, 칠석과 동지 등 연중 특별기도를 소개합니다.",
      "An annual guide to Bodhi Day, New Year, Ipchun, repentance, retreat, academic-achievement, Chilseok, and winter-solstice prayer periods.",
    ),
    seo: {
      title: L("달마사 특별기도 | 절기·안거·학업성취기도", "Special Prayers at Dalmasa | Seasonal Observances"),
      description: L(
        "달마사의 성도재일, 정초산림 7일기도, 입춘·삼재풀이, 출가열반재일, 자비도량참법, 하안거·동안거, 학업성취, 칠석과 동지기도 일정을 안내합니다.",
        "Explore Dalmasa's annual Bodhi Day, New Year, Ipchun, Parinirvana, repentance, retreat, academic-achievement, Chilseok, and winter-solstice prayer programs.",
      ),
    },
    sections: [
      S(
        "겨울과 새해",
        "Winter and New Year",
        "성도재일은 음력 12월 8일, 정초산림 7일기도는 음력 1월 3–9일 10:00, 입춘·삼재풀이기도는 양력 2월 2–4일 10:00에 봉행합니다.",
        "Bodhi Day falls on lunar 12/8. The seven-day New Year prayer is lunar 1/3–1/9 at 10:00 AM, and Ipchun and Samjae prayer is February 2–4 at 10:00 AM.",
      ),
      S(
        "출가·열반과 참회",
        "Renunciation, Parinirvana, and repentance",
        "출가열반재일 수행기간은 음력 2월 8–15일, 자비도량참법기도는 음력 2월 8–17일로 안내되어 있습니다.",
        "The Renunciation and Parinirvana practice period is lunar 2/8–2/15; Jabi Doryang Chambeop repentance prayer is lunar 2/8–2/17.",
      ),
      S(
        "안거기도",
        "Retreat prayer",
        "공개 원문은 하안거를 음력 10월 16일–다음 해 1월 15일, 동안거를 음력 4월 16일–7월 15일로 표기해 통상 명칭과 순서가 뒤바뀐 것으로 보입니다. 정확한 계절 구분은 사찰 확인이 필요합니다.",
        "The live source labels lunar 10/16–1/15 as summer retreat and lunar 4/16–7/15 as winter retreat, apparently reversing the customary seasonal names. Temple staff must verify the labels before publication.",
      ),
      S(
        "학업·칠석·동지",
        "Academic, Chilseok, and solstice prayer",
        "학업성취 백일기도는 매년 8–11월 10:00, 칠석 3일기도는 음력 7월 5–7일 10:00 삼성각, 동지 3일기도는 양력 12월 20–22일 10:00 대웅전으로 안내됩니다.",
        "The academic-achievement prayer runs August–November at 10:00 AM, Chilseok prayer is lunar 7/5–7/7 at 10:00 AM in Samseonggak, and solstice prayer is December 20–22 at 10:00 AM in Daeungjeon.",
      ),
    ],
    cta: GENERAL_CTA,
    verificationNotes: [
      L(
        "원문에서 하안거와 동안거 날짜 명칭이 뒤바뀐 것으로 보여 사찰 확인 전에는 계절 명칭을 확정하지 않습니다.",
        "The source appears to reverse summer and winter retreat labels, so the seasonal names must remain unconfirmed until temple staff verify them.",
      ),
    ],
  }),

  page({
    id: "memorial-rites",
    legacyPaths: ["/28"],
    path: "/prayer/memorial-rites",
    section: "prayer",
    template: "program-collection",
    title: L("재(齋) 및 제사(祭祀)", "Memorial Rites & Ancestral Services"),
    summary: L(
      "49재와 천도재, 기제와 생신제, 설·추석 차례, 합동천도재와 만년위패 등 영가와 조상을 위한 불교의식을 안내합니다.",
      "Understand Buddhist rites for the deceased and ancestors, including 49-day rites, Cheondojae, anniversaries, holiday rites, and memorial tablets.",
    ),
    seo: {
      title: L("달마사 재·제사 안내 | 49재·천도재·위패", "Buddhist Memorial Rites at Dalmasa | 49-Day Rites"),
      description: L(
        "달마사의 49재, 천도재, 기제, 생신제·사갑제, 설·추석 차례, 정초·중양절 합동천도재와 만년위패의 의미와 상담 방법을 차분히 안내합니다.",
        "Learn about Dalmasa's 49-day rites, Cheondojae, death anniversaries, birthday rites, holiday observances, joint rites, and permanent memorial tablets, with a clear consultation path.",
      ),
    },
    sections: [
      S(
        "49재와 천도재",
        "49-day rite and Cheondojae",
        "49재는 돌아가신 날부터 7일마다 일곱 차례 재를 올려 영가의 깨침과 극락왕생을 발원하는 불교의식입니다. 천도재는 인연 있는 영가가 극락왕생하도록 공양과 법문을 올리는 의식입니다.",
        "A 49-day rite is observed seven times at seven-day intervals, wishing the deceased awakening and a peaceful rebirth. Cheondojae offers food and teaching to guide a deceased relative or connected spirit.",
      ),
      S(
        "가족 기념 재",
        "Family memorial occasions",
        "기제는 제사일에, 생신제와 사갑제는 돌아가신 뒤 생일이나 회갑·칠순·팔순을 맞아 올립니다. 설과 추석에는 합동 또는 단독 차례를 모실 수 있습니다.",
        "A death-anniversary rite is held on the memorial date; birthday and milestone rites mark dates such as a birthday, sixtieth, seventieth, or eightieth year. Lunar New Year and Chuseok rites may be shared or private.",
      ),
      S(
        "합동천도재와 만년위패",
        "Joint rites and memorial tablets",
        "정초합동천도재는 음력 1월 15일 09:00, 중양절합동천도재는 음력 9월 9일 09:00 대웅전에서 봉행합니다. 만년위패는 영가의 극락왕생을 발원하며 위패를 봉안하는 방식입니다.",
        "The New Year joint Cheondojae is lunar 1/15 at 9:00 AM, and the Double Ninth joint rite is lunar 9/9 at 9:00 AM in Daeungjeon. Permanent memorial tablets support continuing remembrance and prayers for peaceful rebirth.",
      ),
      S(
        "상담과 준비",
        "Consultation and preparation",
        "의식의 날짜, 준비물, 비용 또는 공양 안내는 상황에 따라 달라질 수 있으므로 종무소와 상담한 뒤 정하세요.",
        "Dates, required information, preparation, and contribution guidance vary by family circumstances. Arrange the rite only after speaking with the general office.",
      ),
    ],
    cta: GENERAL_CTA,
  }),

  page({
    id: "gongyang",
    legacyPaths: ["/29"],
    path: "/prayer/gongyang",
    section: "prayer",
    template: "program",
    title: L("공양", "Gongyang (Offerings)"),
    summary: L(
      "부처님오신날 등공양, 가족의 기념일과 경조사를 위한 떡·과일 공양, 기도·법회·행사의 설판 공양 의미를 소개합니다.",
      "Learn about lantern offerings for Buddha's Birthday, rice cake or fruit for family occasions, and shared ceremonial offerings called seolpan.",
    ),
    seo: {
      title: L("달마사 공양 안내 | 등·떡·과일·설판", "Offerings at Dalmasa | Lanterns, Food & Seolpan"),
      description: L(
        "부처님오신날 사랑과 평화를 발원하는 등공양, 생일·시험·기일과 경조사의 떡·과일 공양, 기도와 법회 당일 함께 올리는 설판 공양을 안내합니다.",
        "Understand lantern offerings for Buddha's Birthday, rice cake and fruit offerings for family occasions, and seolpan contributions shared for prayers, services, and events.",
      ),
    },
    sections: [
      S(
        "등공양",
        "Lantern offering",
        "부처님오신날을 맞아 부처님이 오신 뜻을 새기고 가족, 이웃과 모든 생명의 평화를 발원하며 법당에 등을 밝힙니다.",
        "For Buddha's Birthday, lanterns are lit in the hall while reflecting on the Buddha's birth and wishing peace for family, neighbours, and all life.",
      ),
      S(
        "떡·과일 공양",
        "Rice cake and fruit offering",
        "생일, 시험, 기일과 집안 경조사에 떡이나 과일을 올려 그 의미를 기리고 소원 성취를 발원합니다.",
        "Rice cake or fruit may be offered for birthdays, examinations, memorial dates, and family occasions, marking the moment with a sincere wish.",
      ),
      S(
        "설판",
        "Seolpan shared offering",
        "주요 기도, 법회와 행사 당일 부처님 전에 올리는 상단 공양물을 여러 사람이 뜻을 모아 함께 준비하는 공양입니다.",
        "Seolpan is a shared contribution toward ceremonial offerings placed before the Buddha during a major prayer, Dharma service, or event.",
      ),
    ],
    cta: GENERAL_CTA,
    programFacts: {
      audience: L("공양으로 기도와 법회에 동참하고 싶은 분", "Anyone wishing to support prayer or a Dharma service through an offering"),
      schedule: L("기도·법회·기념일 일정에 따라 협의", "Arranged around the relevant prayer, service, or family date"),
      duration: L("해당 의식 또는 행사 당일", "For the relevant ceremony or event"),
      venue: L("대웅전 등 해당 법당", "Daeungjeon or the hall hosting the observance"),
      feeOrDonation: L("공양 금액은 공개되지 않아 종무소 확인 필요", "Offering amounts are not published; ask the general office"),
      availability: "confirm",
      eligibility: L("누구나 문의 가능", "Anyone may inquire"),
      preparation: L("공양 종류, 발원 내용과 희망 날짜를 준비", "Prepare the offering type, dedication, and requested date"),
      languageSupport: L("외국어 지원 여부는 사전 확인", "Confirm language support in advance"),
      contactRole: "general-office",
      action: GENERAL_CTA,
    },
  }),

  page({
    id: "monthly-prayer",
    legacyPaths: ["/44"],
    path: "/prayer/monthly",
    section: "prayer",
    template: "schedule-collection",
    title: L("월 정기기도", "Monthly Prayer"),
    summary: L(
      "음력 1–3일 신중기도, 보름 인등기도, 18일 지장재일기도와 매월 넷째 토요일 산신기도의 의미와 시간을 안내합니다.",
      "Four recurring monthly practices: Sinjung prayer, individual lantern prayer, Ksitigarbha observance, and mountain-spirit prayer.",
    ),
    seo: {
      title: L("달마사 월 정기기도 | 신중·인등·지장·산신", "Monthly Prayer at Dalmasa | Four Recurring Observances"),
      description: L(
        "달마사의 음력 1–3일 신중 3일기도, 음력 15일 인등기도, 음력 18일 지장재일기도, 매월 넷째 토요일 산신기도 시간과 의미를 확인하세요.",
        "See the meaning and published times for Dalmasa's monthly Sinjung, lantern, Ksitigarbha, and mountain-spirit prayers, following lunar dates and the fourth Saturday.",
      ),
    },
    sections: [
      S(
        "신중 3일기도",
        "Sinjung three-day prayer",
        "부처님의 법을 지키는 호법선신에게 가족의 건강과 평안을 발원하며 매월 음력 1–3일 오전 10시 대웅전에서 봉행합니다.",
        "Prayer to the Dharma-protecting deities for family health and peace, held in Daeungjeon at 10:00 AM on lunar days 1–3.",
      ),
      S(
        "인등기도",
        "Individual lantern prayer",
        "자신의 어리석음을 밝히고 맑은 마음을 드러내는 의미로 1인 1등을 밝히며 매월 음력 15일 오전 10시에 축원합니다.",
        "A personal lantern symbolises illuminating ignorance and revealing a clear mind; dedications are made at 10:00 AM on lunar day 15.",
      ),
      S(
        "지장재일기도",
        "Ksitigarbha observance",
        "선망조상의 위패를 모시고 극락왕생을 발원하며 매월 음력 18일 오전 10시 대웅전에서 봉행합니다.",
        "With memorial tablets for ancestors, this prayer wishes them a peaceful rebirth and is held in Daeungjeon at 10:00 AM on lunar day 18.",
      ),
      S(
        "산신기도",
        "Mountain-spirit prayer",
        "사업번창, 길상인연과 가족의 발원을 올리며 매월 넷째 토요일 하절기 18:30, 동절기 18:00에 봉행합니다. 원문은 장소를 대웅전으로 안내합니다.",
        "This prayer carries wishes for prosperity, auspicious relationships, and family wellbeing. It is held on the fourth Saturday at 6:30 PM in summer and 6:00 PM in winter; the source lists Daeungjeon as the venue.",
      ),
    ],
    cta: GENERAL_CTA,
  }),

  page({
    id: "dharani-1000-day",
    legacyPaths: ["/49"],
    path: "/prayer/dharani-1000-day",
    section: "prayer",
    template: "program",
    title: L("신묘장구대다라니 천일대정진기도", "1,000-Day Great Dharani Practice"),
    summary: L(
      "2025년 6월 28일부터 2028년 3월 23일까지 사경과 독송을 이어가며 100일마다 함께 회향하는 천일 수행입니다.",
      "A 1,000-day journey of Great Dharani copying and recitation from June 28, 2025 to March 23, 2028, gathering every 100 days.",
    ),
    seo: {
      title: L("신묘장구대다라니 천일대정진 | 달마사", "1,000-Day Great Dharani Practice | Dalmasa"),
      description: L(
        "2025년 6월 28일 입재해 2028년 3월 23일 회향하는 달마사 신묘장구대다라니 사경·독송 천일기도의 참여 방법, 동참금과 100일 일정을 확인하세요.",
        "Find participation details, published contribution amounts, the 100-day gathering schedule, and handling of completed copybooks for Dalmasa's 2025–2028 Great Dharani Practice.",
      ),
    },
    sections: [
      S(
        "동참 방법",
        "How to participate",
        "달마사에서 발행한 신묘장구대다라니 사경집을 지참한 누구나 참여할 수 있습니다. 100일 회향 때 독송한 사경집은 대웅전 석가모니불 상단에 봉안하고 천일 회향 때 소지합니다.",
        "Anyone with Dalmasa's Great Dharani copybook may join. At each 100-day completion, recited copybooks are enshrined above the Sakyamuni Buddha in Daeungjeon and ceremonially burned at the 1,000-day completion.",
      ),
      S(
        "동참금",
        "Published contributions",
        "기도 동참 10,000원에는 사경집과 펜이 포함됩니다. 설판은 50,000원 이상 자율 동참이며 당일 개인 축원을 올립니다. 특별법보시는 500권 기준 5,000,000원으로, 최대 가족 2인의 이름을 사경집에 싣고 100일마다 가족 축원을 올립니다.",
        "Prayer participation is KRW 10,000 and includes a copybook and pen. Seolpan is voluntary from KRW 50,000 with a personal dedication. A KRW 5,000,000 Dharma-material gift funds 500 books, prints up to two family names, and includes family dedications every 100 days.",
      ),
      S(
        "100일 일정",
        "100-day schedule",
        "400일 2026-08-01, 500일 2026-11-09, 600일 2027-02-17, 700일 2027-05-28, 800일 2027-09-05, 900일 2027-12-14, 전체 회향 2028-03-23이며 모두 오후 2시로 안내되어 있습니다.",
        "Upcoming published milestones are day 400 on Aug 1, 2026; 500 on Nov 9, 2026; 600 on Feb 17, 2027; 700 on May 28, 2027; 800 on Sep 5, 2027; 900 on Dec 14, 2027; and completion on Mar 23, 2028, all at 2:00 PM.",
      ),
    ],
    cta: GENERAL_CTA,
    programFacts: {
      audience: L("달마사 발행 사경집으로 사경과 독송을 이어갈 누구나", "Anyone practising with a Great Dharani copybook issued by Dalmasa"),
      schedule: L("100일마다 오후 2시 공동 독송·회향", "Shared recitation and completion every 100 days at 2:00 PM"),
      duration: L("2025-06-28–2028-03-23 · 1,000일", "June 28, 2025–March 23, 2028 · 1,000 days"),
      venue: L("대웅전", "Daeungjeon"),
      feeOrDonation: L("기도 10,000원 · 설판 50,000원 이상 자율 · 특별법보시 5,000,000원", "Prayer KRW 10,000 · seolpan voluntary from KRW 50,000 · special Dharma-material gift KRW 5,000,000"),
      availability: "ongoing",
      eligibility: L("달마사 발행 사경집 지참", "Bring a Great Dharani copybook issued by Dalmasa"),
      preparation: L("사경집과 사경펜 지참", "Bring the copybook and copying pen"),
      languageSupport: L("독송·안내의 외국어 지원은 사전 확인", "Confirm translated guidance or recitation support in advance"),
      contactRole: "general-office",
      action: GENERAL_CTA,
    },
  }),

  page({
    id: "events",
    legacyPaths: ["/31"],
    path: "/events",
    section: "events",
    template: "section-landing",
    title: L("법회·행사", "Dharma Services & Events"),
    summary: L(
      "초하루·일요·청년 정기법회와 부처님오신날, 백중 49일 지장기도, 소림굴 용왕재 등 달마사의 주요 행사를 안내합니다.",
      "Find Dalmasa's recurring Dharma services and major annual observances, including Buddha's Birthday, Baekjung prayer, and the sacred-spring rite.",
    ),
    seo: {
      title: L("달마사 법회·행사 | 정기법회와 주요 불교행사", "Dalmasa Dharma Services & Events | Seoul Temple Calendar"),
      description: L(
        "매주 일요일과 격주 토요일 법회, 음력 초하루법회, 부처님오신날, 백중 49일 지장기도와 소림굴 영천 용왕재 등 달마사 법회·행사를 확인하세요.",
        "See Dalmasa's weekly Sunday, alternate-Saturday young adult, and lunar first-day services alongside Buddha's Birthday, Baekjung prayer, and annual temple events.",
      ),
    },
    sections: [
      S(
        "정기법회",
        "Regular Dharma services",
        "부처님의 가르침을 함께 배우고 차담과 공동체 활동으로 이어지는 세 가지 정기법회가 있습니다.",
        "Three recurring gatherings combine Buddhist teaching with community, conversation, and shared practice.",
        RECURRING_SCHEDULES.services,
      ),
      S(
        "주요행사",
        "Major events",
        "부처님오신날 봉축기도와 법요식, 백중 49일 지장기도, 자연과 풍요를 발원하는 소림굴 영천 용왕재를 봉행합니다.",
        "Major observances include Buddha's Birthday prayer and ceremony, the Baekjung 49-day Ksitigarbha prayer, and a Dragon King rite at Sorimgul sacred spring.",
      ),
      S(
        "처음 참여한다면",
        "If this is your first service",
        "일정은 음력과 공지에 따라 달라질 수 있습니다. 시작 10–15분 전에 도착하고 복장·좌석·의식 참여 방법은 현장 안내를 따르세요.",
        "Lunar dates and notices may affect schedules. Arrive 10–15 minutes early and follow on-site guidance for seating, dress, and participation.",
      ),
    ],
    cta: A("정기법회 일정 보기", "See regular service times", "/events/regular-services"),
  }),

  page({
    id: "major-events",
    legacyPaths: ["/32"],
    path: "/events/major",
    section: "events",
    template: "program-collection",
    title: L("주요행사", "Major Events"),
    summary: L(
      "음력 4월 부처님오신날, 음력 5월 26일부터 7월 15일까지 백중기도, 소림굴 영천에서 봉행하는 용왕재를 소개합니다.",
      "Dalmasa's major observances include Buddha's Birthday, the 49-day Baekjung Ksitigarbha prayer, and the Dragon King rite at Sorimgul spring.",
    ),
    seo: {
      title: L("달마사 주요행사 | 부처님오신날·백중·용왕재", "Major Events at Dalmasa | Buddha's Birthday & Baekjung"),
      description: L(
        "달마사의 음력 4월 1–8일 봉축기도와 부처님오신날 법요식, 음력 5월 26일–7월 15일 백중 49일 지장기도, 소림굴 영천 용왕재를 안내합니다.",
        "Learn about Dalmasa's Buddha's Birthday prayer from lunar 4/1–4/8, Baekjung 49-day Ksitigarbha prayer from lunar 5/26–7/15, and sacred-spring rite.",
      ),
    },
    sections: [
      S(
        "부처님오신날",
        "Buddha's Birthday",
        "음력 4월 1일부터 8일까지 봉축 8일기도를 봉행하고 음력 4월 8일에는 부처님 탄생을 기리는 봉축법요식과 행사를 엽니다. 장소는 대웅전입니다.",
        "An eight-day celebration prayer runs from lunar 4/1 to 4/8, culminating in a ceremony and events marking the Buddha's birth on lunar 4/8 in Daeungjeon.",
      ),
      S(
        "백중 49일 지장기도",
        "Baekjung 49-day Ksitigarbha prayer",
        "부모와 조상에게 효를 실천하고 영가의 극락왕생을 발원합니다. 음력 5월 26일부터 7월 15일까지 매주 한 차례 천도재를 봉행하며 장소는 대웅전입니다.",
        "This observance expresses filial care and wishes ancestors a peaceful rebirth. From lunar 5/26 to 7/15, a Cheondojae is held once each week in Daeungjeon.",
      ),
      S(
        "소림굴 영천 용왕재",
        "Dragon King rite at Sorimgul",
        "마르지 않는 샘인 소림굴 영천에서 자연재해를 막고 풍요로운 삶을 발원하는 용왕재를 올립니다. 날짜와 참여 방법은 공지 또는 종무소에서 확인하세요.",
        "At Sorimgul's perennial spring, a Dragon King rite asks for protection from natural disaster and a flourishing life. Confirm the date and participation details in notices or with the office.",
      ),
    ],
    cta: A("최신 공지 확인", "Check current notices", "/news/notices"),
  }),

  page({
    id: "regular-services",
    legacyPaths: ["/33"],
    path: "/events/regular-services",
    section: "events",
    template: "schedule-collection",
    title: L("정기법회", "Regular Dharma Services"),
    summary: L(
      "음력 초하루법회, 매주 일요일 오전 10시 일요법회, 격주 토요일 오후 2시 20·30대 청년법회의 시간과 대상을 안내합니다.",
      "Recurring gatherings for the lunar first day, Sunday worship, and young adults in their twenties and thirties.",
    ),
    seo: {
      title: L("달마사 정기법회 | 초하루·일요·청년법회", "Regular Dharma Services at Dalmasa | Weekly & Young Adult"),
      description: L(
        "달마사 대웅전의 음력 1일 초하루법회와 매주 일요일 오전 10시 일요법회, 교육관에서 격주 토요일 오후 2시에 열리는 청년법회를 안내합니다.",
        "Find Dalmasa's lunar first-day service, Sunday Dharma service at 10:00 AM in Daeungjeon, and alternate-Saturday young adult service at 2:00 PM in the Education Hall.",
      ),
    },
    sections: [
      S(
        "초하루법회",
        "Lunar first-day service",
        "매월 음력 첫날 신중기도를 마친 뒤 대웅전에서 부처님의 가르침을 함께 배우는 자리입니다.",
        "After Sinjung prayer on the first day of each lunar month, the community gathers in Daeungjeon to learn the Buddha's teaching.",
      ),
      S(
        "일요법회",
        "Sunday Dharma service",
        "바쁜 직장인도 함께해 심신의 휴식과 위안을 찾을 수 있도록 매주 일요일 오전 10시 대웅전에서 봉행합니다.",
        "Held every Sunday at 10:00 AM in Daeungjeon, this service welcomes working people and others seeking rest and reassurance through the Dharma.",
      ),
      S(
        "청년법회",
        "Young adult service",
        "불교에 관심 있는 20–30대 누구나 참여할 수 있으며 격주 토요일 오후 2시 교육관에서 법회, 차담, 봉사와 문화활동을 함께합니다.",
        "Open to anyone in their twenties or thirties interested in Buddhism, the alternate-Saturday 2:00 PM gathering in the Education Hall combines worship, tea, volunteering, and cultural activities.",
      ),
    ],
    cta: A("방문 전 종무소에 확인", "Confirm before attending", "/contact", "contact"),
  }),

  page({
    id: "education",
    legacyPaths: ["/34"],
    path: "/education",
    section: "education",
    template: "section-landing",
    title: L("교육", "Buddhist Education"),
    summary: L(
      "불교를 처음 배우는 기본교육에서 불교대학과 경전반으로 이어지는 달마사 불학원의 단계별 교육과정을 살펴보세요.",
      "Choose a learning path from introductory Buddhist Foundations through Buddhist College and advanced sutra study at Dalmasa.",
    ),
    seo: {
      title: L("달마사 불교교육 | 기본교육·불교대학·경전반", "Buddhist Education at Dalmasa | Courses and Sutra Study"),
      description: L(
        "달마사 불학원의 기본교육, 불교대학, 천수경·금강경 경전반을 단계별로 비교하고 대상, 기간, 개강 시기와 교육국 문의 방법을 확인하세요.",
        "Compare Dalmasa's Buddhist Foundations, Buddhist College, and Thousand Hands and Diamond Sutra courses, including eligibility, duration, intake timing, and education contact.",
      ),
    },
    sections: [
      S(
        "배움의 순서",
        "A progressive learning path",
        "기본교육은 불교·예불·법회·수행의 기초를 다룹니다. 이수자는 불교대학에서 교리와 역사를 체계적으로 배우고, 졸업 후 경전반에서 천수경과 금강경을 공부할 수 있습니다.",
        "Foundations introduces Buddhism, worship, services, and practice. Graduates may continue to Buddhist College for structured doctrine and history, then deepen study through the Thousand Hands and Diamond Sutras.",
      ),
      S(
        "현재 모집 확인",
        "Confirm current enrollment",
        "과정별 개강 시기는 안내되어 있지만 모집 상태, 정원, 수강료와 외국어 지원은 공개 정보만으로 확정할 수 없습니다. 교육국에 문의한 뒤 신청하세요.",
        "Course windows are published, but current enrollment, capacity, fees, and language support are not fully confirmed. Contact the education office before applying.",
      ),
      S(
        "과정 선택",
        "Choose a course",
        "처음이라면 기본교육, 기본교육 이수자는 불교대학, 불교대학 졸업자는 경전반 안내를 먼저 확인하세요.",
        "Start with Foundations if you are new, Buddhist College after Foundations, and Sutra Study after graduating from Buddhist College.",
        [
          L("기본교육 · 토요일 13:00–15:00", "Foundations · Saturdays 1:00–3:00 PM"),
          L("불교대학 · 매년 3–11월", "Buddhist College · March–November"),
          L("경전반 · 3개월 과정", "Sutra Study · three-month course"),
        ],
      ),
    ],
    cta: A("교육과정 한눈에 보기", "See the learning pathway", "/education/academy"),
  }),

  page({
    id: "foundations",
    legacyPaths: ["/35"],
    path: "/education/foundations",
    section: "education",
    template: "course",
    title: L("기본교육", "Buddhist Foundations"),
    summary: L(
      "불교와 예불, 법회의 의미와 수행 방법을 쉽게 배우고 수계식을 거쳐 달마사 공동체와 봉사활동에 참여할 기초를 닦는 과정입니다.",
      "A Jogye Order-recognized introduction to Buddhism, worship, Dharma services, and practice, leading toward precepts and temple community participation.",
    ),
    seo: {
      title: L("달마사 기본교육 | 토요일 불교 입문과정", "Buddhist Foundations at Dalmasa | Saturday Introductory Course"),
      description: L(
        "매주 토요일 오후 1–3시에 열리고 2월과 9월에 개강하는 달마사 기본교육에서 불교, 예불, 법회와 수행 방법을 배우고 수계와 봉사 참여를 준비하세요.",
        "Learn Buddhism, worship, Dharma services, and practice in Dalmasa's Saturday 1:00–3:00 PM introductory course, with intakes in February and September and a path toward receiving precepts.",
      ),
    },
    sections: [
      S(
        "과정 소개",
        "Course overview",
        "불교를 알기 쉽게 배우는 종단 인가 기본과정으로, 불교의 기초와 예불, 법회의 의미와 가치, 수행의 종류와 방법을 다룹니다.",
        "A Jogye Order-recognized introductory course explaining the foundations of Buddhism, worship, the meaning and value of Dharma services, and forms of practice.",
      ),
      S(
        "수계와 공동체",
        "Precepts and community",
        "교육 이수 후 수계식을 통해 삼귀의와 오계를 수지하고, 달마사 신도회 구성원의 기본자격을 갖추며 사찰 봉사활동에 참여할 수 있습니다.",
        "After completing the course, students may receive the Three Refuges and Five Precepts, gain basic standing in the Dalmasa lay community, and join volunteer activities.",
      ),
      S(
        "일정",
        "Schedule",
        "주말반은 매주 토요일 오후 1–3시로 정리합니다. 연 2회, 상반기 2월과 하반기 9월 개강으로 안내되어 있습니다.",
        "The canonical schedule is Saturdays from 1:00 to 3:00 PM, with two published intakes each year: February and September.",
      ),
    ],
    cta: EDUCATION_CTA,
    programFacts: {
      audience: L("불교를 처음부터 쉽게 배우고 싶은 분", "People seeking a clear introduction to Buddhism"),
      schedule: L("매주 토요일 13:00–15:00", "Saturdays, 1:00–3:00 PM"),
      duration: L("연 2회 개강 · 2월과 9월", "Two intakes each year · February and September"),
      venue: L("교육 장소는 교육국에 확인", "Confirm the classroom with the education office"),
      feeOrDonation: L("수강료는 공개되지 않아 교육국 확인 필요", "The fee is not published; ask the education office"),
      availability: "confirm",
      eligibility: L("입문자 대상 · 세부 자격은 교육국 확인", "Introductory level; confirm any enrollment requirements"),
      preparation: L("개강일, 교재와 준비물을 교육국에 확인", "Confirm the start date, materials, and what to bring"),
      languageSupport: L("외국어 수업 지원 여부는 사전 확인", "Confirm non-Korean-language support before enrolling"),
      contactRole: "education-office",
      action: EDUCATION_CTA,
      verificationNote: L(
        "반응형 원문이 토요일과 토·일요일로 달라, 최신 모바일 안내와 2026년 공지를 근거로 토요일 13:00–15:00을 임시 표준으로 사용합니다. 사찰 최종 확인이 필요합니다.",
        "Responsive source variants disagree between Saturday and Saturday–Sunday. This record provisionally uses Saturday 1:00–3:00 PM based on the newer mobile copy and 2026 notice; temple confirmation is required.",
      ),
    },
    verificationNotes: [
      L(
        "기본교육 일정은 토요일 13:00–15:00으로 통일했지만 사찰의 최종 확인이 필요합니다.",
        "The Foundations schedule is canonicalized to Saturday 1:00–3:00 PM but still requires final confirmation by Dalmasa.",
      ),
    ],
  }),

  page({
    id: "buddhist-college",
    legacyPaths: ["/45"],
    path: "/education/buddhist-college",
    section: "education",
    template: "course",
    title: L("불교대학", "Buddhist College"),
    summary: L(
      "기본교육 이수자를 대상으로 부처님의 생애, 불교교리와 역사, 불교의식과 문화, 기도·수행·봉사를 체계적으로 배우는 전문과정입니다.",
      "A Jogye Order-recognized professional course for Foundations graduates, covering doctrine, history, ritual, culture, practice, and service.",
    ),
    seo: {
      title: L("달마사 불교대학 | 3월–11월 전문교육과정", "Dalmasa Buddhist College | March–November Course"),
      description: L(
        "기본교육 이수자를 위한 달마사 불교대학에서 매년 3–11월 부처님의 생애, 불교교리·역사·의식과 실천적인 기도·수행·봉사를 배우세요.",
        "Dalmasa Buddhist College offers Foundations graduates a March–November course in the Buddha's life, doctrine, Buddhist history and ritual, culture, prayer, practice, and service.",
      ),
    },
    sections: [
      S(
        "누가 배울 수 있나요?",
        "Who may enroll?",
        "달마사 기본교육을 이수한 불자라면 참여할 수 있는 종단 인가 전문교육과정입니다.",
        "This Jogye Order-recognized professional course is open to Buddhists who have completed Buddhist Foundations.",
      ),
      S(
        "교과과정",
        "Curriculum",
        "부처님의 생애, 불교교리, 불교사와 불교의식을 체계적으로 배우고 불교문화, 기도, 수행과 봉사 등 신행을 실천 중심으로 익힙니다.",
        "Students study the Buddha's life, doctrine, Buddhist history, and ritual while developing a practical devotional life through culture, prayer, practice, and service.",
      ),
      S(
        "기간과 접수",
        "Dates and enrollment",
        "교육기간은 매년 3월부터 11월이며 전년도 11월부터 접수할 수 있다고 안내되어 있습니다. 현재 모집 여부는 교육국에 확인하세요.",
        "The course runs from March through November, with applications published as opening the preceding November. Confirm current enrollment with the education office.",
      ),
    ],
    cta: EDUCATION_CTA,
    programFacts: {
      audience: L("달마사 기본교육 이수자", "Graduates of Buddhist Foundations"),
      schedule: L("매년 3월–11월 · 세부 요일과 시간은 확인", "March–November annually · confirm the day and time"),
      duration: L("약 9개월", "Approximately nine months"),
      venue: L("교육 장소는 교육국에 확인", "Confirm the classroom with the education office"),
      feeOrDonation: L("수강료는 공개되지 않아 교육국 확인 필요", "The fee is not published; ask the education office"),
      availability: "confirm",
      eligibility: L("기본교육 이수", "Completion of Buddhist Foundations"),
      preparation: L("전년도 11월부터 접수 가능 · 교재는 확인", "Applications may open the preceding November; confirm materials"),
      languageSupport: L("외국어 지원 여부는 사전 확인", "Confirm language support in advance"),
      contactRole: "education-office",
      action: EDUCATION_CTA,
    },
  }),

  page({
    id: "sutra-study",
    legacyPaths: ["/46"],
    path: "/education/sutra-study",
    section: "education",
    template: "course",
    title: L("경전반", "Sutra Study"),
    summary: L(
      "불교대학 졸업생이 천수경과 금강경을 통해 부처님의 말씀을 깊이 배우는 3개월 심화과정입니다.",
      "A three-month advanced course for Buddhist College graduates, studying the Thousand Hands Sutra and Diamond Sutra.",
    ),
    seo: {
      title: L("달마사 경전반 | 천수경·금강경 3개월 과정", "Dalmasa Sutra Study | Three-Month Advanced Course"),
      description: L(
        "불교대학 졸업생을 위한 달마사 경전반에서 3개월 동안 천수경 또는 금강경을 공부하세요. 2026년 천수경 4–7월, 금강경 8–11월 예정입니다.",
        "Dalmasa's three-month advanced sutra course is for Buddhist College graduates, with Thousand Hands Sutra planned for Apr–Jul 2026 and Diamond Sutra for Aug–Nov 2026.",
      ),
    },
    sections: [
      S(
        "심화과정",
        "Advanced study",
        "불교대학 졸업생을 위해 개설된 반으로 경전을 통해 부처님의 말씀을 깊이 배우는 과정입니다.",
        "Created for Buddhist College graduates, this course studies the Buddha's teaching in greater depth through scripture.",
      ),
      S(
        "천수경과 금강경",
        "Thousand Hands and Diamond Sutras",
        "천수경과 금강경을 과목으로 하며 2026년 천수경은 4–7월, 금강경은 8–11월 개강 예정으로 안내되어 있습니다.",
        "The curriculum covers the Thousand Hands Sutra and Diamond Sutra. The published 2026 windows are April–July and August–November respectively.",
      ),
      S(
        "교육기간",
        "Course length",
        "반응형 원문에 3개월과 3–4개월이 함께 노출되지만, 더 좁고 최신인 안내를 따라 3개월을 임시 표준으로 사용합니다.",
        "Responsive source variants show both three months and three to four months. This record provisionally uses the narrower, newer three-month wording.",
      ),
    ],
    cta: EDUCATION_CTA,
    programFacts: {
      audience: L("불교대학 졸업생", "Buddhist College graduates"),
      schedule: L("천수경 2026년 4–7월 예정 · 금강경 2026년 8–11월 예정", "Thousand Hands Sutra planned Apr–Jul 2026 · Diamond Sutra planned Aug–Nov 2026"),
      duration: L("3개월", "Three months"),
      venue: L("교육 장소는 교육국에 확인", "Confirm the classroom with the education office"),
      feeOrDonation: L("수강료는 공개되지 않아 교육국 확인 필요", "The fee is not published; ask the education office"),
      availability: "confirm",
      eligibility: L("불교대학 졸업", "Graduation from Buddhist College"),
      preparation: L("교재, 개강일과 반 편성을 교육국에 확인", "Confirm materials, the start date, and class assignment"),
      languageSupport: L("외국어 지원 여부는 사전 확인", "Confirm language support in advance"),
      contactRole: "education-office",
      action: EDUCATION_CTA,
      verificationNote: L(
        "원문 변형이 대상과 기간을 다르게 표기해 불교대학 졸업생 대상·3개월을 임시 표준으로 사용합니다. 사찰 최종 확인이 필요합니다.",
        "Source variants disagree on eligibility and duration. This record provisionally uses Buddhist College graduates and three months; temple confirmation is required.",
      ),
    },
    verificationNotes: [
      L(
        "경전반은 불교대학 졸업생 대상, 3개월 과정으로 통일했지만 사찰의 최종 확인이 필요합니다.",
        "Sutra Study is canonicalized to Buddhist College graduates and three months but still requires final confirmation by Dalmasa.",
      ),
    ],
  }),

  page({
    id: "academy",
    legacyPaths: ["/48"],
    path: "/education/academy",
    section: "education",
    template: "education-overview",
    title: L("달마사 불학원", "Dalmasa Buddhist Academy"),
    summary: L(
      "달마사 불학원은 입문자를 위한 기본교육, 실천 중심 전문과정인 불교대학, 졸업생을 위한 경전반을 운영합니다.",
      "Dalmasa Buddhist Academy offers introductory Foundations, a practical Buddhist College course, and advanced sutra study for graduates.",
    ),
    seo: {
      title: L("달마사 불학원 | 단계별 불교교육 안내", "Dalmasa Buddhist Academy | A Progressive Learning Path"),
      description: L(
        "달마사 불학원의 기본교육, 불교대학과 경전반이 어떻게 이어지는지 비교하고 각 과정의 대상, 기간, 개강 시기와 공식 교육국 문의처를 확인하세요.",
        "See how Dalmasa Buddhist Academy's Foundations, Buddhist College, and Sutra Study courses connect, with eligibility, duration, intake windows, and the official education contact.",
      ),
    },
    sections: [
      S(
        "기본교육",
        "Buddhist Foundations",
        "불교, 예불, 법회와 수행의 기초를 토요일 오후에 배우고 수계와 공동체 참여를 준비합니다.",
        "Learn the foundations of Buddhism, worship, Dharma services, and practice on Saturday afternoons, preparing for precepts and community participation.",
      ),
      S(
        "불교대학",
        "Buddhist College",
        "기본교육 이수자가 3월부터 11월까지 불교교리와 역사, 의식, 문화와 실천을 체계적으로 배웁니다.",
        "Foundations graduates study doctrine, history, ritual, culture, and lived practice from March through November.",
      ),
      S(
        "경전반",
        "Sutra Study",
        "불교대학 졸업생이 천수경과 금강경을 3개월 과정으로 깊이 공부합니다.",
        "Buddhist College graduates deepen their understanding through a three-month course on the Thousand Hands or Diamond Sutra.",
      ),
      S(
        "공식 교육 채널",
        "Official education channels",
        "모집 상태와 과정 변경은 교육국 전화, 달마사 공식 인스타그램·페이스북·네이버 블로그의 최신 공지를 함께 확인하세요.",
        "Confirm enrollment and course changes through the education office and current posts on Dalmasa's official Instagram, Facebook, and Naver Blog channels.",
      ),
    ],
    cta: EDUCATION_CTA,
  }),

  page({
    id: "news",
    legacyPaths: ["/36"],
    path: "/news",
    section: "news",
    template: "section-landing",
    title: L("달마사 소식", "News"),
    summary: L(
      "기도와 교육 모집 공지, 법회와 행사 기록, 봉사부 소식과 사진 갤러리를 날짜와 분야별로 찾아보세요.",
      "Find dated prayer and enrollment notices, stories from services and events, volunteer updates, and the Dalmasa photo gallery.",
    ),
    seo: {
      title: L("달마사 소식 | 공지·이야기·봉사·갤러리", "Dalmasa News | Notices, Stories, Volunteers & Gallery"),
      description: L(
        "달마사의 최신 기도·교육·법회 공지, 사찰 주요소식, 봉사부 참여 정보와 기도·행사 사진 갤러리를 날짜와 분야별로 확인하세요.",
        "Browse Dalmasa's current prayer, education, and service notices, temple stories, volunteer information, and dated photo galleries from ceremonies and community life.",
      ),
    },
    sections: [
      S(
        "공지사항",
        "Notices",
        "모집, 기도, 법회, 장학과 운영 관련 공지를 게시일과 상태와 함께 확인하세요.",
        "Check dated announcements for enrollment, prayer programs, services, scholarships, and temple operations.",
      ),
      S(
        "주요소식과 갤러리",
        "Stories and gallery",
        "기도와 법회, 부처님오신날과 공동체 행사의 기록을 글과 사진으로 모았습니다.",
        "Read reports and view photographs from prayers, services, Buddha's Birthday, and community events.",
      ),
      S(
        "봉사부",
        "Volunteer group",
        "달마사 공동체를 돕는 봉사활동의 역할과 현재 참여 가능 일정을 종무소에서 확인할 수 있습니다.",
        "Learn how volunteers support the Dalmasa community and contact the general office to confirm current opportunities and orientation.",
      ),
    ],
    cta: A("최신 공지 보기", "Read the latest notices", "/news/notices"),
  }),

  page({
    id: "notices",
    legacyPaths: ["/37"],
    path: "/news/notices",
    section: "news",
    template: "archive",
    title: L("공지사항", "Notices"),
    summary: L(
      "기도 동참, 불학원 개강, 법회, 장학과 사찰 운영에 관한 공식 공지를 게시일과 분야별로 확인하는 기록실입니다.",
      "The official archive for prayer participation, Buddhist Academy enrollment, Dharma services, scholarships, and temple operations.",
    ),
    seo: {
      title: L("달마사 공지사항 | 기도·교육·법회 최신 안내", "Dalmasa Notices | Prayer, Education & Service Updates"),
      description: L(
        "달마사의 학업성취 백일기도, 금강경·기본교육 개강, 백중 49일 기도, 법회, 장학과 사찰 운영 관련 최신 공지를 게시일 순으로 확인하세요.",
        "Read dated Dalmasa announcements for academic prayer, Diamond Sutra and Foundations enrollment, Baekjung prayer, Dharma services, scholarships, and temple operations.",
      ),
    },
    sections: [
      S(
        "2026년 최근 공지",
        "Recent 2026 notices",
        "공개 원문에서 확인한 최근 항목은 제1차 수능·학업성취 백일기도, 경전반 금강경 개강, 기본교육 개강, 우란분절 백중 49일 지장기도 안내입니다.",
        "Recent source items include the first 100-day academic-achievement prayer, Diamond Sutra enrollment, Buddhist Foundations enrollment, and the Baekjung 49-day Ksitigarbha prayer.",
        [
          L("2026-06-30 · 수능·학업성취 백일기도", "Jun 30, 2026 · 100-day academic-achievement prayer"),
          L("2026-06-06 · 경전반 금강경 개강", "Jun 6, 2026 · Diamond Sutra course enrollment"),
          L("2026-06-06 · 기본교육 개강", "Jun 6, 2026 · Buddhist Foundations enrollment"),
          L("2026-06-06 · 백중 49일 지장기도", "Jun 6, 2026 · Baekjung 49-day Ksitigarbha prayer"),
        ],
      ),
      S(
        "참여 전 확인",
        "Check before participating",
        "공지의 게시일, 접수 마감, 시작일과 변경 여부를 확인하세요. 오래된 공지는 현재 모집이나 운영 상태를 의미하지 않습니다.",
        "Check each notice's publication date, deadline, start date, and amendments. An archived notice does not indicate that registration remains open.",
      ),
    ],
    cta: A("문의처 확인", "Ask the appropriate office", "/contact", "contact"),
  }),

  page({
    id: "stories",
    legacyPaths: ["/38"],
    path: "/news/stories",
    section: "news",
    template: "archive",
    title: L("주요소식", "Temple Stories"),
    summary: L(
      "천일대정진 독송기도, 부처님오신날, 천도재와 선지식 초청법회 등 달마사에서 봉행한 의식과 공동체의 기록입니다.",
      "Reports and photographs from Dalmasa's Great Dharani practice, Buddha's Birthday, memorial rites, guest-teacher services, and community life.",
    ),
    seo: {
      title: L("달마사 주요소식 | 법회·기도·공동체 이야기", "Dalmasa Temple Stories | Services, Prayer & Community"),
      description: L(
        "신묘장구대다라니 천일대정진 독송기도, 부처님오신날, 정초합동천도재, 선지식 초청 일요법회 등 달마사의 지난 의식과 공동체 이야기를 읽어보세요.",
        "Read Dalmasa stories from Great Dharani recitation, Buddha's Birthday, New Year joint memorial rites, invited-teacher Sunday services, and the temple community.",
      ),
    },
    sections: [
      S(
        "수행과 법회 기록",
        "Practice and service records",
        "천일대정진 100일차 독송기도와 선지식 초청 일요법회처럼 함께 수행하고 법을 들은 순간을 기록합니다.",
        "Stories preserve shared moments of practice and teaching, including 100-day Great Dharani recitation and Sunday services with invited teachers.",
      ),
      S(
        "절기와 공동체",
        "Seasonal and community life",
        "부처님오신날, 정초합동천도재, 신중기도와 동지기도 등 절기마다 이어진 달마사의 모습을 만날 수 있습니다.",
        "The archive follows Dalmasa through Buddha's Birthday, New Year memorial rites, Sinjung prayer, winter-solstice prayer, and other seasons of temple life.",
      ),
      S(
        "공식 블로그",
        "Official Naver Blog",
        "더 많은 소식은 달마사 공식 네이버 블로그에서도 확인할 수 있습니다.",
        "Additional reports are available through Dalmasa's official Naver Blog.",
      ),
    ],
    cta: A("달마사 소식 전체 보기", "See all Dalmasa news", "/news", "secondary"),
  }),

  page({
    id: "volunteer",
    legacyPaths: ["/39"],
    path: "/news/volunteer",
    section: "news",
    template: "story-cta",
    title: L("달마사 봉사부", "Volunteer Group"),
    summary: L(
      "달마사의 법회와 교육, 행사와 공동체 운영을 돕는 봉사활동에 관심 있는 분을 위한 참여 안내입니다.",
      "A practical starting point for people interested in supporting Dalmasa's services, education, events, and community life through volunteering.",
    ),
    seo: {
      title: L("달마사 봉사부 | 사찰 봉사 참여 안내", "Volunteer at Dalmasa | Join the Temple Community"),
      description: L(
        "달마사의 법회, 행사, 교육과 공동체 활동을 돕는 봉사부의 역할을 알아보고 현재 필요한 봉사, 일정, 오리엔테이션과 참여 조건을 종무소에 문의하세요.",
        "Learn how volunteers may support Dalmasa's services, events, education, and community, then ask the general office about current roles, schedules, orientation, and eligibility.",
      ),
    },
    sections: [
      S(
        "함께 돕는 공동체",
        "A community of service",
        "봉사는 사찰의 법회와 교육, 행사 준비와 방문객 응대 등 공동체의 다양한 일을 함께 나누는 수행이 될 수 있습니다.",
        "Volunteering can be a form of practice that shares the work of services, education, event preparation, and welcoming visitors.",
      ),
      S(
        "현재 역할과 일정",
        "Current roles and times",
        "기존 페이지에는 활동 목록, 정기 일정이나 신청 절차가 충분히 게시되지 않았습니다. 관심 분야와 가능한 시간을 준비해 종무소에 문의하세요.",
        "The current source does not publish a complete role list, recurring timetable, or application process. Contact the general office with your interests and availability.",
      ),
      S(
        "참여 전 확인",
        "Before joining",
        "오리엔테이션, 연령이나 교육 요건, 복장, 식사와 활동 중 보험 여부는 봉사 종류에 따라 다를 수 있으므로 사전에 확인해야 합니다.",
        "Orientation, age or training requirements, clothing, meals, and activity insurance may vary by role and should be confirmed before joining.",
      ),
    ],
    cta: GENERAL_CTA,
  }),

  page({
    id: "gallery",
    legacyPaths: ["/47"],
    path: "/news/gallery",
    section: "news",
    template: "gallery",
    title: L("달마사 갤러리", "Gallery"),
    summary: L(
      "산신기도, 초하루 신중기도와 법회 등 달마사의 수행과 의식을 사진과 영상으로 기록한 날짜별 갤러리입니다.",
      "A dated photo and video archive documenting Dalmasa's mountain-spirit prayer, lunar first-day Sinjung prayer, services, and ceremonies.",
    ),
    seo: {
      title: L("달마사 갤러리 | 기도·법회 사진과 영상", "Dalmasa Gallery | Prayer and Dharma Service Photos"),
      description: L(
        "달마사의 산신기도, 음력 초하루 신중기도, 법회와 주요 행사를 담은 사진·영상 앨범을 날짜와 설명, 접근 가능한 캡션과 함께 살펴보세요.",
        "Browse dated and captioned photographs and videos from Dalmasa's mountain-spirit prayer, lunar first-day Sinjung prayer, Dharma services, and major ceremonies.",
      ),
    },
    sections: [
      S(
        "기도와 법회 앨범",
        "Prayer and service albums",
        "공개 아카이브에는 산신기도 법회와 음력 3월 초하루 신중기도 법회 등 달마사의 의식 기록이 포함되어 있습니다.",
        "The source archive includes records of mountain-spirit prayer services and a lunar third-month first-day Sinjung service.",
      ),
      S(
        "사진을 보는 방법",
        "Using the gallery",
        "앨범 제목과 촬영일, 설명을 함께 제공하고 큰 사진 보기는 키보드로도 열고 닫을 수 있어야 합니다. 사진 속 인물의 사생활을 존중해 주세요.",
        "Albums should retain a title, date, and caption, with a large-image view operable by keyboard. Please respect the privacy of people shown.",
      ),
      S(
        "지난 기록",
        "Archive",
        "오래된 사진은 당시의 행사 기록이며 현재 일정이나 프로그램 운영 상태를 뜻하지 않습니다.",
        "Older photographs document past events and do not indicate that a schedule or program is currently active.",
      ),
    ],
    cta: A("최근 소식 읽기", "Read recent temple stories", "/news/stories"),
  }),

  page({
    id: "memorial",
    legacyPaths: ["/40"],
    path: "/memorial",
    section: "memorial",
    template: "section-landing",
    title: L("봉안당", "Memorial Hall"),
    summary: L(
      "국립서울현충원과 맞닿은 영일당·영월당의 유래와 시설, 봉안 상담 과정과 고인을 기억하는 추모의 방을 차분히 안내합니다.",
      "A dignified introduction to Yeongildang and Yeongwoldang beside Seoul National Cemetery, with enshrinement guidance and a remembrance space.",
    ),
    seo: {
      title: L("달마사 봉안당 | 영일당·영월당과 봉안 안내", "Dalmasa Memorial Hall | Yeongildang & Yeongwoldang"),
      description: L(
        "국립서울현충원 인근 달마사 영일당·영월당의 역사와 등록 정보, 봉안 상담과 방문 절차, 추모의 방을 차분히 살펴보고 담당 연락처를 확인하세요.",
        "Learn about Dalmasa's Yeongildang and Yeongwoldang memorial halls near Seoul National Cemetery, their history and registration, consultation steps, and remembrance room.",
      ),
    },
    sections: [
      S(
        "전통사찰 안의 추모공간",
        "Memorial space within a traditional temple",
        "달마사는 1988년 전통사찰 제13호로 지정되었고, 봉안시설은 2012년 동작구 설치신고 제2호를 마쳤다고 안내되어 있습니다.",
        "Dalmasa was designated Traditional Temple No. 13 in 1988. Its memorial facility is published as having completed Dongjak-gu installation registration No. 2 in 2012.",
      ),
      S(
        "영일당과 영월당",
        "Yeongildang and Yeongwoldang",
        "2011년 영산전에 봉안당을 조성한 뒤 2022년 중창 과정에서 기존 시설을 영일당으로 이름 짓고 영월당을 추가 조성했습니다.",
        "After a memorial facility was created in Yeongsanjeon in 2011, the 2022 rebuilding renamed the existing facility Yeongildang and added Yeongwoldang.",
      ),
      S(
        "봉안 상담",
        "Enshrinement consultation",
        "시설 이해, 방문과 선택, 필요한 서류와 일정, 봉안 당일 절차, 이후 추모에 관해 순서대로 상담하세요. 가격과 잔여 공간은 공개 정보만으로 확인할 수 없습니다.",
        "A consultation should cover the facilities, visit and selection, documents and timing, the enshrinement day, and continuing remembrance. Pricing and availability are not verified in public copy.",
      ),
    ],
    cta: MEMORIAL_CTA,
    verificationNotes: [
      L(
        "010-4803-8771과 02-822-8771의 정확한 담당 역할은 사찰 확인이 필요합니다.",
        "Temple staff must confirm the precise roles of +82 10-4803-8771 and +82 2-822-8771.",
      ),
    ],
  }),

  page({
    id: "memorial-about",
    legacyPaths: ["/41"],
    path: "/memorial/about",
    section: "memorial",
    template: "story-facilities",
    title: L("봉안당 소개", "About the Memorial Hall"),
    summary: L(
      "영일당과 영월당은 국립서울현충원과 맞닿은 전통사찰 양식의 봉안시설로, 2012년 신고 후 2022년 확장되었습니다.",
      "Yeongildang and Yeongwoldang are traditional-style memorial facilities beside Seoul National Cemetery, registered in 2012 and expanded in 2022.",
    ),
    seo: {
      title: L("달마사 봉안당 소개 | 역사와 시설", "About Dalmasa Memorial Hall | History and Facilities"),
      description: L(
        "국립서울현충원과 인접한 달마사 봉안당이 2011년 조성, 2012년 동작구 설치신고, 2022년 영일당 개칭과 영월당 추가 조성으로 이어진 과정을 확인하세요.",
        "Read the history of Dalmasa's memorial facilities beside Seoul National Cemetery, from creation in 2011 and Dongjak-gu registration in 2012 to Yeongildang and Yeongwoldang in 2022.",
      ),
    },
    sections: [
      S(
        "위치와 성격",
        "Location and purpose",
        "영일당과 영월당은 국립서울현충원과 맞닿은 자리에 있으며 조상의 음덕과 자손의 효를 부처님 곁에서 기리는 추모전각입니다.",
        "Yeongildang and Yeongwoldang stand beside Seoul National Cemetery and provide a Buddhist setting for remembering ancestors and expressing filial care.",
      ),
      S(
        "조성과 등록",
        "Creation and registration",
        "2011년 12월 영산전 전각에 봉안당을 조성하고 2012년 4월 동작구에 봉안시설 설치신고 제2호를 마쳤다고 소개합니다.",
        "The published history says a memorial facility was created in Yeongsanjeon in December 2011 and completed Dongjak-gu installation registration No. 2 in April 2012.",
      ),
      S(
        "2022년 확장",
        "Expansion in 2022",
        "중창불사를 통해 기존 봉안당을 영일당으로 개칭하고 영월당을 추가 조성해 두 전각으로 운영한다고 안내합니다.",
        "During the 2022 rebuilding, the existing facility was renamed Yeongildang and Yeongwoldang was added, creating two memorial halls.",
      ),
    ],
    cta: MEMORIAL_CTA,
    verificationNotes: [
      L(
        "페이지 기재 번호 02-822-8771과 공통 하단 번호 010-4803-8771의 담당 범위는 확인이 필요합니다.",
        "The roles of +82 2-822-8771 on this page and +82 10-4803-8771 in the footer require confirmation.",
      ),
    ],
  }),

  page({
    id: "enshrinement",
    legacyPaths: ["/42"],
    path: "/memorial/enshrinement",
    section: "memorial",
    template: "guided-inquiry",
    title: L("봉안 안내", "Enshrinement Guide"),
    summary: L(
      "달마사 봉안시설을 알아보고 방문 상담, 위치 선택, 필요 서류와 일정, 봉안 당일과 이후 추모를 준비하는 단계별 안내입니다.",
      "A calm step-by-step guide to learning about Dalmasa's memorial facilities and preparing for consultation, documents, scheduling, enshrinement, and continuing remembrance.",
    ),
    seo: {
      title: L("달마사 봉안 안내 | 상담부터 봉안까지", "Dalmasa Enshrinement Guide | From Consultation to Memorial Care"),
      description: L(
        "달마사 영일당·영월당 봉안을 고려하는 가족을 위해 시설 이해, 방문 상담, 위치 선택, 서류와 예약, 봉안 당일, 이후 추모까지 필요한 질문을 순서대로 안내합니다.",
        "For families considering Dalmasa's memorial halls, this guide organises questions about facilities, consultation, selection, documents, appointments, the enshrinement day, and ongoing remembrance.",
      ),
    },
    sections: [
      S(
        "1. 시설 이해",
        "1. Understand the facilities",
        "영일당과 영월당의 위치, 관리 방식, 참배 가능 시간과 가족에게 중요한 조건을 먼저 확인하세요.",
        "Begin by understanding Yeongildang and Yeongwoldang, their location, management, visiting hours, and the conditions important to your family.",
      ),
      S(
        "2. 방문 상담",
        "2. Arrange a consultation",
        "방문 가능 시간과 담당자를 정하고, 잔여 공간, 위치 선택, 비용과 포함 서비스, 환불·이전 조건을 서면으로 확인하세요.",
        "Arrange a time and named contact, then request written information about availability, position selection, pricing, included services, refunds, and transfers.",
      ),
      S(
        "3. 서류와 일정",
        "3. Documents and timing",
        "필요한 신분·가족관계·화장 관련 서류, 계약자와 참배 가족 정보, 봉안 가능한 날짜와 의식 준비물을 담당자에게 확인하세요.",
        "Confirm identity, family-relationship, and cremation documents, contract and visitor details, available dates, and anything required for the ceremony.",
      ),
      S(
        "4. 봉안과 이후 추모",
        "4. Enshrinement and continuing remembrance",
        "당일 도착시간, 의식 순서, 위패·사진·유품 규정과 이후 참배, 재, 관리비와 연락 방법을 확인해 가족에게 공유하세요.",
        "Confirm arrival time, ceremony order, rules for tablets, photographs and keepsakes, later visits and rites, maintenance charges, and future contact arrangements.",
      ),
    ],
    cta: MEMORIAL_CTA,
    programFacts: {
      audience: L("달마사 봉안시설을 알아보는 유가족", "Bereaved families considering Dalmasa's memorial facilities"),
      schedule: L("방문 상담과 봉안 일정은 담당자와 협의", "Consultation and enshrinement dates are arranged with the office"),
      duration: L("상담과 의식 시간은 상황별 확인", "Confirm consultation and ceremony length for the family's circumstances"),
      venue: L("영일당·영월당", "Yeongildang and Yeongwoldang"),
      feeOrDonation: L("가격과 관리비는 공개되지 않아 서면 확인 필요", "Pricing and maintenance charges are not published; request written confirmation"),
      availability: "confirm",
      eligibility: L("안치 가능 대상과 계약 조건은 담당자 확인", "Confirm eligibility and contract conditions with the office"),
      preparation: L("필요 서류, 사진·위패·유품 규정과 당일 준비물 확인", "Confirm documents, photograph, tablet and keepsake rules, and ceremony preparation"),
      languageSupport: L("외국어 상담 가능 여부는 예약 전에 확인", "Confirm non-Korean consultation support before booking"),
      contactRole: "memorial-office",
      action: MEMORIAL_CTA,
      verificationNote: L(
        "봉안 관련 두 번호가 서로 다른 위치에 게시되어 있어 담당 역할을 사찰이 확인해야 합니다.",
        "Two memorial numbers are published in different places; temple staff must confirm the role of each.",
      ),
    },
    verificationNotes: [
      L(
        "잔여 공간, 가격, 서류, 계약조건과 연락처 역할은 사찰의 최신 서면 확인이 필요합니다.",
        "Availability, pricing, documents, contract terms, and contact roles require current written confirmation from Dalmasa.",
      ),
    ],
  }),

  page({
    id: "remembrance",
    legacyPaths: ["/43"],
    path: "/memorial/remembrance",
    section: "memorial",
    template: "moderated-archive",
    title: L("추모의 방", "Remembrance Room"),
    summary: L(
      "고인에게 전하고 싶은 편지와 기억을 나누는 공간으로, 공개 범위와 개인정보, 검토·삭제 절차가 확인된 글만 게시해야 합니다.",
      "A space for letters and memories addressed to those who have died, with publication, privacy, moderation, and removal rules made clear before submission.",
    ),
    seo: {
      title: L("달마사 추모의 방 | 고인에게 보내는 편지", "Dalmasa Remembrance Room | Letters and Memories"),
      description: L(
        "달마사 추모의 방에서 고인에게 보내는 편지와 기억을 읽고, 글을 보내기 전 공개 범위, 개인정보 보관, 사전 검토, 수정과 삭제 절차를 확인하세요.",
        "Read letters and memories in Dalmasa's Remembrance Room, and review publication scope, personal-data retention, moderation, editing, and removal rules before submitting anything.",
      ),
    },
    sections: [
      S(
        "추모의 공간",
        "A space for remembrance",
        "고인에게 하고 싶은 이야기를 편지로 쓰고 기억을 나누는 공간입니다. 공개 원문에는 조부모·부모님께 드리는 글과 친구에게 보내는 편지가 게시되어 있습니다.",
        "This is a place to write to someone who has died and share memories. The source archive includes a letter to grandparents and parents and a letter to a friend.",
      ),
      S(
        "공개와 검토",
        "Publication and moderation",
        "누가 글을 볼 수 있는지, 게시 전 검토 기준, 게시까지 걸리는 시간, 부적절한 내용 처리와 신고 방법을 명확히 안내한 뒤에만 글쓰기를 제공해야 합니다.",
        "Writing should be enabled only after the site clearly explains who can read a letter, pre-publication review, expected timing, unsuitable-content handling, and reporting.",
      ),
      S(
        "개인정보와 삭제",
        "Privacy and removal",
        "이름, 연락처와 고인 정보의 수집 목적, 보관기간, 공개 범위, 수정·삭제 요청 방법을 고지해야 합니다. 이 정책이 준비되기 전에는 공개 글쓰기 기능을 제공하지 않습니다.",
        "The site must disclose why names, contact details, and information about the deceased are collected, how long they are retained, what becomes public, and how to request editing or deletion. Public writing remains disabled until that policy exists.",
      ),
    ],
    cta: MEMORIAL_CTA,
    verificationNotes: [
      L(
        "개인정보·검토·삭제 정책과 실제 처리 담당이 확인되기 전에는 글쓰기 기능을 열지 않습니다.",
        "Do not enable letter submission until privacy, moderation, deletion policy, and the responsible staff workflow are confirmed.",
      ),
    ],
  }),

  page({
    id: "visit",
    legacyPaths: [],
    path: "/visit",
    section: "utility",
    template: "visit",
    title: L("방문 안내", "Plan Your Visit"),
    summary: L(
      "주소와 교통, 도착 전 확인사항, 매일 예불 시간과 처음 사찰에 오는 분을 위한 기본 예절을 한곳에 모았습니다.",
      "Everything a first-time visitor needs in one place: address, transport, questions to confirm, daily worship times, and basic temple etiquette.",
    ),
    seo: {
      title: L("달마사 방문 안내 | 처음 오시는 분을 위한 길잡이", "Plan Your Visit to Dalmasa | A First-Time Guide"),
      description: L(
        "서울 흑석동 달마사 방문 전 주소와 대중교통, 종무소 운영시간, 매일 예불 일정, 도착과 참배 예절, 주차·경사·휠체어 접근 확인 방법을 살펴보세요.",
        "Prepare for a first visit to Dalmasa with the Seoul address, transit steps, office hours, daily worship schedule, arrival etiquette, and questions about parking and accessible routes.",
      ),
    },
    sections: [
      S(
        "오늘 방문할 수 있나요?",
        "Can I visit today?",
        "종무소 운영시간은 08:00–17:00으로 게시되어 있습니다. 의식, 공사나 출입 변경 가능성이 있으므로 먼 길을 오거나 도움이 필요하면 당일 종무소에 확인하세요.",
        "Published general-office hours are 8:00 AM–5:00 PM. Ceremonies, works, or access changes may occur, so call the office the same day if travelling far or needing assistance.",
      ),
      S(
        "주소와 대중교통",
        "Address and public transport",
        SITE_FACTS.address.ko,
        SITE_FACTS.address.en,
        [
          L("흑석역 3·4번 출구 → 동작01·21 → 달마사입구", "Heukseok exits 3 or 4 → Dongjak 01 or 21 → Dalmasa Entrance"),
          L("노량진역 3번 출구 → 동작01 → 달마사입구", "Noryangjin exit 3 → Dongjak 01 → Dalmasa Entrance"),
          L("상도역 5번 출구 → 동작01·21 → 달마사입구", "Sangdo exit 5 → Dongjak 01 or 21 → Dalmasa Entrance"),
        ],
      ),
      S(
        "주차와 접근성",
        "Parking and accessibility",
        "현재 공개 정보에는 주차 가능 여부, 승하차 지점, 경사·계단, 휠체어 이동 경로와 장애인 화장실 정보가 충분하지 않습니다. 이동 지원이 필요하면 구체적인 필요를 종무소에 알려 확인하세요.",
        "Published information does not fully verify parking, drop-off, gradients, stairs, wheelchair routes, or accessible toilets. Tell the general office your specific needs and request confirmation before travelling.",
      ),
      S(
        "도착하면",
        "When you arrive",
        "처음이라면 종무소에 방문 목적을 알리고 안내를 받으세요. 법당에서는 휴대전화를 무음으로 하고 의식 중인 분을 방해하지 않으며, 신발·좌석·촬영은 현장 표지와 스님의 안내를 따릅니다.",
        "If this is your first visit, tell the general office why you have come and ask for guidance. Silence your phone, do not interrupt worship, and follow on-site signs and monastic guidance for shoes, seating, and photography.",
      ),
      S(
        "매일 예불",
        "Daily worship",
        "참관이나 참여 가능 여부와 도착 시각은 종무소에 확인하는 것이 좋습니다.",
        "Ask the general office whether observation or participation is appropriate and when to arrive.",
        RECURRING_SCHEDULES.daily,
      ),
      S(
        "처음 법회에 참여한다면",
        "Joining a service for the first time",
        "시작 10–15분 전에 도착해 안내를 받고, 절과 합장 등 익숙하지 않은 동작은 주변 참여자와 집전자의 안내를 천천히 따르면 됩니다. 참여를 원하지 않는 의식은 조용히 관찰해도 되는지 먼저 물어보세요.",
        "Arrive 10–15 minutes early and ask for guidance. If bows or other actions are unfamiliar, follow the officiant and community at your own pace; ask whether quiet observation is appropriate for anything you prefer not to join.",
      ),
    ],
    cta: GENERAL_CTA,
    verificationNotes: [
      L(
        "주차, 승하차, 경사·계단, 휠체어 경로, 화장실, 촬영과 영어 안내는 사찰 현장 확인이 필요합니다.",
        "Parking, drop-off, gradients, stairs, wheelchair routes, toilets, photography, and English-language guidance require on-site confirmation.",
      ),
    ],
  }),
]);

/** Backwards-friendly descriptive alias for consumers that prefer a content name. */
export const SITE_CONTENT = PAGE_RECORDS;

export const ROUTE_PATHS: readonly string[] = Object.freeze(
  PAGE_RECORDS.map((record) => record.path),
);

export const PAGE_BY_PATH: Readonly<Record<string, BilingualPage>> = Object.freeze(
  Object.fromEntries(PAGE_RECORDS.map((record) => [record.path, record])),
);

export const LEGACY_REDIRECTS: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(
    PAGE_RECORDS.flatMap((record) =>
      record.legacyPaths.map((legacyPath) => [legacyPath, localizedPath("ko", record.path)]),
    ),
  ),
);

export interface NavItem {
  readonly path: string;
  readonly label: Localized;
}

export interface NavGroup extends NavItem {
  readonly id: Exclude<SiteSection, "home" | "utility">;
  readonly children: readonly NavItem[];
}

const navItem = (path: string): NavItem => {
  const record = PAGE_BY_PATH[path];
  if (!record) throw new Error(`Missing canonical navigation page: ${path}`);
  return Object.freeze({ path, label: record.navLabel });
};

const navGroup = (
  id: NavGroup["id"],
  path: string,
  children: readonly string[],
): NavGroup => Object.freeze({ ...navItem(path), id, children: Object.freeze(children.map(navItem)) });

/** Six primary navigation groups, each with every current canonical child page. */
export const NAV_GROUPS: readonly NavGroup[] = Object.freeze([
  navGroup("about", "/about", [
    "/about/history",
    "/about/vision",
    "/about/abbot",
    "/about/halls",
    "/about/directions",
  ]),
  navGroup("prayer", "/prayer", [
    "/prayer/dalmasa-practitioner",
    "/prayer/dharani-1000-day",
    "/prayer/daily",
    "/prayer/monthly",
    "/prayer/special",
    "/prayer/memorial-rites",
    "/prayer/gongyang",
  ]),
  navGroup("events", "/events", ["/events/regular-services", "/events/major"]),
  navGroup("education", "/education", [
    "/education/academy",
    "/education/foundations",
    "/education/buddhist-college",
    "/education/sutra-study",
  ]),
  navGroup("news", "/news", [
    "/news/notices",
    "/news/stories",
    "/news/gallery",
    "/news/volunteer",
  ]),
  navGroup("memorial", "/memorial", [
    "/memorial/about",
    "/memorial/enshrinement",
    "/memorial/remembrance",
  ]),
]);

export const UTILITY_NAV: readonly NavItem[] = Object.freeze([
  navItem("/visit"),
  navItem("/contact"),
]);

export function localizedPath(locale: Locale, semanticPath: string): string {
  const path = semanticPath === "/" ? "" : `/${semanticPath.replace(/^\/+|\/+$/g, "")}`;
  return `/${locale}${path}`;
}

function semanticPath(input: string): string {
  const pathname = input.startsWith("http")
    ? new URL(input).pathname
    : input.split(/[?#]/, 1)[0] || "/";
  const withoutLocale = pathname.replace(/^\/(?:ko|en)(?=\/|$)/, "") || "/";
  if (withoutLocale === "/") return "/";
  return `/${withoutLocale.replace(/^\/+|\/+$/g, "")}`;
}

export function getPageRecord(path: string): BilingualPage | undefined {
  return PAGE_BY_PATH[semanticPath(path)];
}

function localizeAction(action: Action, locale: Locale) {
  return {
    label: action.label[locale],
    // Keep internal links semantic; the rendering shell owns locale prefixing.
    href: action.href,
    kind: action.kind,
  } as const;
}

function localizedContact(role: ProgramFacts["contactRole"], locale: Locale): string {
  const contact = role === "general-office"
    ? SITE_FACTS.contacts.generalOffice
    : role === "education-office"
      ? SITE_FACTS.contacts.educationOffice
      : SITE_FACTS.contacts.memorialOffice;
  return `${contact.label[locale]} · ${contact.phoneDisplay}`;
}

export function localizePage(record: BilingualPage, locale: Locale): LocalizedPage {
  const program = record.programFacts;
  return {
    id: record.id,
    legacyPaths: record.legacyPaths,
    path: record.path,
    canonicalPath: localizedPath(locale, record.path),
    section: record.section,
    template: record.template,
    navLabel: record.navLabel[locale],
    title: record.title[locale],
    summary: record.summary[locale],
    seo: {
      title: record.seo.title[locale],
      description: record.seo.description[locale],
    },
    hero: { key: record.hero.key, alt: record.hero.alt[locale] },
    sections: record.sections.map((section) => {
      const paragraphs = section.body.map((paragraph) => paragraph[locale]);
      return {
        heading: section.heading[locale],
        paragraphs,
        body: paragraphs,
        ...(section.items ? { items: section.items.map((item) => item[locale]) } : {}),
      };
    }),
    cta: localizeAction(record.cta, locale),
    ...(program
      ? {
          programFacts: {
            audience: program.audience[locale],
            schedule: program.schedule[locale],
            duration: program.duration[locale],
            venue: program.venue[locale],
            feeOrDonation: program.feeOrDonation[locale],
            availability: program.availability,
            eligibility: program.eligibility[locale],
            preparation: program.preparation[locale],
            languageSupport: program.languageSupport[locale],
            contactRole: program.contactRole,
            contact: localizedContact(program.contactRole, locale),
            action: localizeAction(program.action, locale),
            ...(program.verificationNote
              ? { verificationNote: program.verificationNote[locale] }
              : {}),
          },
        }
      : {}),
    verificationNotes: (record.verificationNotes ?? []).map((note) => note[locale]),
  };
}

export function getLocalizedPage(locale: Locale, path: string): LocalizedPage | undefined {
  const record = getPageRecord(path);
  return record ? localizePage(record, locale) : undefined;
}
