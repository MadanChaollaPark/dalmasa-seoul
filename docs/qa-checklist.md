# Dalmasa website quality checklist

This checklist is the release contract for the rebuilt Dalmasa site. Items marked **automated** are enforced by `npm test`; items marked **manual** must be checked in a browser before publishing.

## Content and language coverage

- [x] **Automated:** All 33 URLs in the current Dalmasa sitemap redirect to distinct, improved canonical pages; the six currently duplicated parent pages become useful section landings instead of disappearing.
- [x] **Automated:** All 33 migrated pages plus the new first-visit page have Korean and English versions, for 34 one-to-one route pairs.
- [x] **Automated:** Every page declares the correct `lang` and links to Korean, English, and `x-default` alternates.
- [x] **Automated:** No page renders placeholder, missing-translation, or starter-preview copy.
- [x] **Manual:** Dates, schedules, fees, phone numbers, eligibility, and application instructions agree across languages and viewport sizes; disputed source facts are labelled for confirmation in both languages.
- [x] **Manual:** Every action-oriented page clearly states audience, schedule, cost or donation guidance, availability, preparation, and how to apply.

## Navigation and links

- [x] **Automated:** Every same-origin link resolves successfully.
- [x] **Automated:** Links do not use insecure `http://dalmasa.org` URLs.
- [x] **Automated:** Navigation, language switching, logo/home links, and footer links use valid destinations.
- [x] **Automated:** Legacy Dalmasa paths remain reachable through an explicit page or redirect.
- [x] **Manual:** Mobile navigation uses a native keyboard-operable disclosure and was opened and traversed at 390 CSS pixels.
- [ ] **Manual:** Telephone, directions, application, and consultation actions work on a phone.

## Search, sharing, and site identity

- [x] **Automated:** Every page has a non-empty, page-specific title and meta description.
- [x] **Automated:** Every canonical URL is absolute, HTTPS, and on the current public deployment host.
- [x] **Automated:** Titles, descriptions, and canonical URLs are unique within each locale.
- [x] **Automated:** `robots.txt` exists, allows public pages, and references the HTTPS sitemap.
- [x] **Automated:** `sitemap.xml` exists and contains every Korean and English canonical page.
- [x] **Automated:** A real favicon and web-app manifest exist and are referenced from the document.
- [x] **Automated:** Open Graph and social-card metadata are present with absolute HTTPS URLs.
- [x] **Manual:** The social card was visually reviewed at 1200×630 and uses the Dalmasa wordmark and temple panorama.

## Accessibility

- [x] **Automated:** Every page has exactly one `<h1>` and one `<main>` landmark.
- [x] **Automated:** Every page provides a keyboard skip link and labelled primary navigation.
- [x] **Automated:** Every image has an `alt` attribute; content images have localized text and decorative images use `alt=""`.
- [x] **Automated:** Images declare intrinsic width and height to reduce layout shift.
- [x] **Automated:** Forms and icon-only controls have accessible names.
- [x] **Automated:** Browser zoom is not disabled in viewport metadata.
- [x] **Manual:** DOM order is logical and `:focus-visible` supplies a three-pixel high-contrast outline.
- [ ] **Manual:** Text, controls, focus indicators, and meaningful graphics meet WCAG AA contrast.
- [ ] **Manual:** The experience is understandable with VoiceOver in Korean and English.
- [x] **Manual:** Motion respects `prefers-reduced-motion` through a dedicated reduced-motion media query.

## Responsive design and performance

- [x] **Automated:** Every route server-renders successfully and the production build completes.
- [x] **Automated:** A mobile viewport declaration is present and permits zoom.
- [x] **Manual:** Browser QA found zero horizontal overflow at 320, 375, 390, 768, 1024, and 1440 CSS pixels.
- [x] **Manual:** Browser QA measured every visible link, button, and disclosure at a minimum of 44 by 44 CSS pixels.
- [ ] **Manual:** The primary task and language switcher remain usable at 200% browser zoom.
- [x] **Manual:** Hero media is responsive and only the homepage hero receives high fetch priority.
- [x] **Manual:** Hero and supporting photographs use optimized WebP sources; the homepage hero is 276 KB.
- [ ] **Manual:** Lighthouse mobile targets: Performance 85+, Accessibility 95+, Best Practices 95+, SEO 95+.

## Trust, safety, and operations

- [x] **Automated:** Public metadata and internal links use HTTPS.
- [ ] **Manual:** HTTP and `www` requests redirect once to the HTTPS canonical host.
- [ ] **Manual:** HSTS and appropriate security headers are enabled by the production host.
- [x] **Manual:** The prototype contains no login, payment, or personal-data form.
- [x] **Manual:** General-office and education numbers are labelled; conflicting memorial contact roles remain explicitly flagged for temple confirmation.
- [ ] **Manual:** Address, transit, parking, accessibility, and map links have been verified against authoritative sources.
- [x] **Manual:** No analytics script or third-party embed is included.

## Release verification — 2026-07-13

- `npm test`: 8/8 checks passed after a production build.
- `npm run lint`: passed with no warnings or errors.
- Production dependency audit: zero known vulnerabilities.
- Browser QA: Korean and English homepages, language switching, mobile menu, and an action-oriented memorial page inspected.
- Still requires temple-owner confirmation: conflicting memorial phone ownership, source discrepancies on `/35` and `/46`, live accessibility/parking details, and the final official-domain cutover.

## Release commands

Run `npm test` for the production build plus the rendered-site contract. Run `npm run lint` separately. A release is ready only when both commands pass and the manual checks above are complete.
