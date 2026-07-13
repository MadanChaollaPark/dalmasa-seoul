# Dalmasa Seoul — bilingual redesign

An independent, accessibility-first redesign prototype for Dalmasa (달마사), a
Buddhist temple on Namsan in Seoul. It preserves every route in the current
public sitemap while replacing opaque numeric URLs with clear Korean and English
paths.

## What is included

- 34 canonical pages in Korean and 34 matching pages in English
- all 33 legacy Dalmasa sitemap routes mapped to permanent redirects
- mobile-first navigation, a visitor guide, schedule and contact actions
- unique page titles, descriptions, canonical URLs, hreflang and social cards
- favicon, Apple touch icon, web manifest, robots.txt and XML sitemap
- optimized responsive imagery and descriptive alternative text
- structured `BuddhistTemple` data and accessible landmarks/focus states
- automated build and rendered-HTML contract tests

Some schedule and phone details conflict across the current source website. The
prototype labels those items for confirmation instead of silently choosing one.
It does not replace the official site at [dalmasa.org](https://dalmasa.org).

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The development server normally opens at `http://localhost:3000/ko`.

## Verification

```bash
npm test
npm run lint
```

`npm test` creates a production vinext build and verifies the bilingual route,
metadata, redirect, accessibility, asset, and sitemap contracts.

## Content and audit references

- `lib/site-content.ts` is the bilingual content source of truth.
- `data/source-inventory.json` records the audited source-site inventory.
- `docs/source-inventory.md` explains route parity and source inconsistencies.
- `docs/qa-checklist.md` contains the website-quality checklist.
- `docs/asset-sources.md` records image provenance and processing.

## Technology

Next.js-compatible routes rendered with vinext on the Sites/Cloudflare Workers
runtime. The project is public content only and does not use a database or login.
