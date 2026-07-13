# Dalmasa live-site source inventory

Checked against the public Seoul temple site at `https://dalmasa.org` on 2026-07-13 (Asia/Seoul). The machine-readable source of truth is [`data/source-inventory.json`](../data/source-inventory.json); it contains verbatim Korean content blocks, source image URLs, important links, English copy guidance, and every legacy-to-canonical mapping.

## Completeness contract

- Live sitemap entries: **33**.
- Live routes checked: **33/33 returned HTTP 200**.
- Required migrated pages: **33 Korean + 33 English**.
- New task-focused Plan Your Visit page: **1 Korean + 1 English**.
- Expected canonical content pages: **68 total**.
- Unique live content experiences: **27**. Six parent routes currently duplicate their first child, but the rebuild deliberately turns them into distinct section landings.
- Exact duplicate pairs on the source site: `/18=/19`, `/24=/25`, `/31=/33`, `/34=/48`, `/36=/37`, `/40=/41`.
- The 33 sitemap routes are, in order: `/index`, `/contact`, `/18`, `/19`, `/20`, `/21`, `/22`, `/23`, `/24`, `/25`, `/26`, `/27`, `/28`, `/29`, `/31`, `/32`, `/33`, `/34`, `/35`, `/36`, `/37`, `/38`, `/39`, `/40`, `/41`, `/42`, `/43`, `/44`, `/45`, `/46`, `/47`, `/48`, `/49`.

## Exact migration map

All canonical paths receive `/ko` and `/en` prefixes. Legacy routes should redirect to the Korean counterpart. `/ko/visit` and `/en/visit` are new pages; they do not replace `/23`, which maps to the Directions page.

| Legacy | Korean title | English title | KO canonical | EN canonical | Source note |
| --- | --- | --- | --- | --- | --- |
| `/index` | 달마사 | Dalmasa Temple | `/ko` | `/en` | Home |
| `/contact` | 문의하기 | Contact & Inquiries | `/ko/contact` | `/en/contact` | Live page is unfinished starter copy |
| `/18` | 달마사 소개 | About Dalmasa | `/ko/about` | `/en/about` | Make a landing; live body duplicates `/19` |
| `/19` | 달마사 역사 | History | `/ko/about/history` | `/en/about/history` | History + timeline |
| `/20` | 달마사 비전 | Vision | `/ko/about/vision` | `/en/about/vision` | Three vision pillars |
| `/21` | 주지스님 인사말 | Greeting from the Abbot | `/ko/about/abbot` | `/en/about/abbot` | Venerable Ilhaeng portrait/greeting |
| `/22` | 전각 안내 | Temple Halls | `/ko/about/halls` | `/en/about/halls` | Fourteen places and 15 source images |
| `/23` | 오시는 길 | Directions | `/ko/about/directions` | `/en/about/directions` | Address + subway/bus text |
| `/24` | 기도·불공 | Prayer & Offerings | `/ko/prayer` | `/en/prayer` | Make a landing; live body duplicates `/25` |
| `/25` | 달마행자 | Dalmasa Practitioner Program | `/ko/prayer/dalmasa-practitioner` | `/en/prayer/dalmasa-practitioner` | Recurring-prayer membership |
| `/26` | 상시기도 | Daily Prayer | `/ko/prayer/daily` | `/en/prayer/daily` | Six daily/requested prayers |
| `/27` | 특별기도 | Special Prayer | `/ko/prayer/special` | `/en/prayer/special` | Nine annual/seasonal practices |
| `/28` | 재 및 제사 | Memorial Rites & Ancestral Services | `/ko/prayer/memorial-rites` | `/en/prayer/memorial-rites` | Eight rites/services |
| `/29` | 공양 | Gongyang (Offerings) | `/ko/prayer/gongyang` | `/en/prayer/gongyang` | Lantern, food, shared offerings |
| `/31` | 법회·행사 | Dharma Services & Events | `/ko/events` | `/en/events` | Make a landing; live body duplicates `/33` |
| `/32` | 주요행사 | Major Events | `/ko/events/major` | `/en/events/major` | Buddha's Birthday, Baekjung, Dragon King rite |
| `/33` | 정기법회 | Regular Dharma Services | `/ko/events/regular-services` | `/en/events/regular-services` | Lunar-first-day, Sunday, young adult |
| `/34` | 교육 | Buddhist Education | `/ko/education` | `/en/education` | Make a landing; live body duplicates `/48` |
| `/35` | 기본교육 | Buddhist Foundations | `/ko/education/foundations` | `/en/education/foundations` | Responsive conflict; see below |
| `/36` | 달마사 소식 | News | `/ko/news` | `/en/news` | Make a landing; live body duplicates `/37` |
| `/37` | 공지사항 | Notices | `/ko/news/notices` | `/en/news/notices` | Nine-page live archive |
| `/38` | 주요소식 | Temple Stories | `/ko/news/stories` | `/en/news/stories` | Reports + Naver Blog |
| `/39` | 달마사 봉사부 | Volunteer Group | `/ko/news/volunteer` | `/en/news/volunteer` | Live board content does not match title |
| `/40` | 봉안당 | Memorial Hall | `/ko/memorial` | `/en/memorial` | Make a landing; live body duplicates `/41` |
| `/41` | 봉안당 소개 | About the Memorial Hall | `/ko/memorial/about` | `/en/memorial/about` | Yeongildang/Yeongwoldang |
| `/42` | 봉안 안내 | Enshrinement Guide | `/ko/memorial/enshrinement` | `/en/memorial/enshrinement` | Live page is only image + phone |
| `/43` | 추모의 방 | Remembrance Room | `/ko/memorial/remembrance` | `/en/memorial/remembrance` | Public letter board; privacy review needed |
| `/44` | 월 정기기도 | Monthly Prayer | `/ko/prayer/monthly` | `/en/prayer/monthly` | Four monthly prayers |
| `/45` | 불교대학 | Buddhist College | `/ko/education/buddhist-college` | `/en/education/buddhist-college` | March–November |
| `/46` | 경전반 | Sutra Study | `/ko/education/sutra-study` | `/en/education/sutra-study` | Responsive conflict; see below |
| `/47` | 달마사 갤러리 | Gallery | `/ko/news/gallery` | `/en/news/gallery` | Nine-page live archive |
| `/48` | 달마사 불학원 | Dalmasa Buddhist Academy | `/ko/education/academy` | `/en/education/academy` | Academy overview/social channels |
| `/49` | 신묘장구대다라니 천일대정진기도 | 1,000-Day Great Dharani Practice | `/ko/prayer/dharani-1000-day` | `/en/prayer/dharani-1000-day` | Full 2025–2028 schedule |

## Verified global facts

| Item | Published value |
| --- | --- |
| Temple | 대한불교조계종 흑석동 달마사 / Dalmasa Temple, Heukseok-dong |
| Address | 서울특별시 동작구 서달로 50-26(흑석동) / 50-26 Seodal-ro, Dongjak-gu, Seoul |
| General office | `02-813-7425`; footer labels this for registration inquiries |
| Education office | `010-8574-7475` |
| Memorial office in footer | `010-4803-8771` |
| Additional memorial number on `/41`–`/43` | `02-822-8771` |
| General-office hours | 08:00–17:00 |
| Memorial hours | 09:00–17:00; lunch 11:30–12:30 |
| YouTube | `https://www.youtube.com/@dalmasa` |
| Temple Instagram | `https://www.instagram.com/dalmasa01/` |
| Young-adult Instagram | `https://www.instagram.com/dalmajigi` |
| Naver Blog | `https://blog.naver.com/dalmasa1931` |

The two published memorial numbers must not be silently merged or relabelled. Temple staff should state the owner/purpose of each number; until then, present both as “please confirm” or keep the memorial CTA noncommittal.

## Responsive contradictions and canonical recommendation

### `/35` Buddhist Foundations

- Mobile: `주말반 | 매주 토요일 오후 1시~3시`.
- Desktop: `주말반 | 매주 토요일·일요일 오후 1시~3시`.
- Both: two intakes, February and September; curriculum covers Buddhism, worship, the meaning/value of Dharma services, and practice methods.
- Provisional canonical: **Saturdays, 1:00–3:00 PM**. The mobile widget is newer and the current 2026 homepage also advertises a Saturday 1:00 PM opening. Education-office confirmation remains required.

### `/46` Sutra Study

- Mobile: for Buddhist College graduates; duration three months.
- Desktop: adds that any member interested in meditation may join; duration three to four months.
- Both: Thousand Hands Sutra and Diamond Sutra; source lists April–July 2026 and August–November 2026 course windows.
- Provisional canonical: **Buddhist College graduates; three months**. Do not publish the expanded desktop eligibility/duration unless the education office confirms it.

### `/27` retreat labels

The live Special Prayer page appears to pair summer retreat (`하안거`) with lunar 10/16–1/15 and winter retreat (`동안거`) with lunar 4/16–7/15. Those labels appear seasonally reversed. Do not silently fix or reproduce them; obtain temple confirmation.

## Key schedules to preserve

### Daily prayer (`/26`)

- Dawn service: daily 04:00, Daeungjeon.
- Sasi offering: daily 10:00, Daeungjeon.
- Evening service: 18:00 November–March; 18:30 April–October, Daeungjeon.
- Birthday prayer: daily 10:00, Daeungjeon.
- One-day/one-month prayer: daily 10:00, Daeungjeon.
- Private offering: time after consultation; Daeungjeon or Samseonggak.

### Monthly prayer (`/44`)

- Sinjung three-day prayer: lunar 1st–3rd, 10:00.
- Mountain-spirit prayer: fourth Saturday, 18:30 in summer / 18:00 in winter.
- Ksitigarbha observance: lunar 18th, 10:00.
- Individual lantern prayer: lunar 15th, 10:00.

### Regular services (`/33`)

- First-day-of-lunar-month service: after Sinjung prayer.
- Sunday Dharma service: every Sunday 10:00, Daeungjeon.
- Young-adult service: every other Saturday 14:00, Education Hall; open to people in their 20s and 30s interested in Buddhism.

### Buddhist education

- Foundations (`/35`): provisional Saturday 13:00–15:00; February/September intakes.
- Buddhist College (`/45`): March–November; applications from the preceding November; Foundations completion required.
- Sutra Study (`/46`): provisional three months for Buddhist College graduates; 2026 windows published as April–July and August–November.

### 1,000-Day Great Dharani Practice (`/49`)

- Entry: 2025-06-28 14:00.
- Day 100: 2025-10-02 14:00.
- Day 200: 2026-01-13 14:00.
- Day 300: 2026-04-23 14:00.
- Day 400: 2026-08-01 14:00.
- Day 500: 2026-11-09 14:00.
- Day 600: 2027-02-17 14:00.
- Day 700: 2027-05-28 14:00.
- Day 800: 2027-09-05 14:00.
- Day 900: 2027-12-14 14:00.
- Completion: 2028-03-23 14:00.
- Published participation amounts: KRW 10,000; voluntary Seolpan contribution from KRW 50,000; special Dharma-material offering KRW 5,000,000 for 500 books. Clarify whether amounts are one-time or per gathering before creating an online application.

## Content-quality findings that affect the rebuild

- `/contact` still says “Get In Touch” and “I'm a paragraph. Click here to add your own text and edit me.” Replace it; do not translate it.
- All 33 live pages have the same HTML title, `달마사`; 32 use the same generic description.
- Every live canonical tag and every sitemap URL is `http://`, not HTTPS.
- Page-specific widgets contain 80 unique images; 78 have empty alt text. The five home background images also lack semantic alt text.
- `/42` has no process, documents, cost, availability, or appointment instructions—only an image and phone prompt.
- `/39` is labelled Volunteer Group but the board heading says Participation Board and visible posts are about Buddhist education. Request actual volunteer roles and joining information.
- `/43` publishes named letters but gives no visible privacy/moderation/retention explanation. Do not republish names or letter bodies without permission.
- `/38` and `/47` contain older archives. Always distinguish reports from upcoming events and retain publication dates.
- The history page repeats “construction began” for both 2021 and 2022 before saying the same buildings were completed in 2022. Staff should confirm the intended 2022 milestone.

## English translation policy

- Use **Dalmasa Temple** on first reference and **Dalmasa** thereafter.
- Use **Jogye Order of Korean Buddhism** for 대한불교조계종.
- Preserve Korean hall/ritual names in romanization when a direct English label would erase meaning, then add a plain-language gloss: for example, `Daeungjeon (Main Buddha Hall)` and `Cheondojae (a rite guiding the deceased)`.
- Translate lunar dates explicitly as lunar; do not silently turn them into Gregorian dates.
- Keep honorifics respectful and natural. The abbot is **Venerable Ilhaeng**; render `합장` as a respectful closing, not a literal gesture description.
- Translate claims about geomancy and sacred tradition as the temple's stated tradition/belief, not as independently proven guarantees.
- Korean and English must share one factual record for phone numbers, prices, eligibility, dates, times, duration, and status.
- When an article body is not translated, label the English item as a summary linking to the Korean original; never imply full archive parity.

## New Plan Your Visit page

Create `/ko/visit` and `/en/visit` from verified material on `/23`, `/26`, `/33`, and the footer/contact information. Required order: current/open status; address and map apps; subway/bus directions; parking/accessibility; arrival and etiquette; service times; general-office contact.

Do not invent parking, drop-off, wheelchair access, slope/stair detail, restrooms, photography, dress, children, or English-language support. Mark these for staff review until verified.

## QA acceptance counts

Automated tests should assert:

1. The exact 33 legacy routes above exist as redirects/compatibility routes.
2. There are 33 distinct canonical paths per locale, not 27 collapsed pages.
3. Every migrated path resolves in Korean and English: **66 pages**.
4. `/ko/visit` and `/en/visit` both resolve, bringing the total to **68 canonical content pages**.
5. Locale switching preserves the canonical path key.
6. Every route has one H1, a unique localized title/description, a canonical URL, and reciprocal `hreflang` entries.
7. No Korean-only factual field is missing from its English equivalent.
8. The `/35` and `/46` canonical facts are identical on mobile and desktop.
9. No source `http://` canonical or sitemap URL survives in the rebuild.
10. Contact numbers are role-labelled and the memorial-number uncertainty is not hidden.
