# Dalmasa visual asset sources

All temple photography and the logo in this rebuild come from Dalmasa's existing public website rather than stock photography or generated imagery. The source assets were retrieved from the live site's Imweb CDN on 2026-07-13 and locally optimized for this rebuild. Confirm publication rights with Dalmasa before using these files outside the temple's own website project.

| Local asset | Dimensions | Size | Live-site source | Treatment |
| --- | ---: | ---: | --- | --- |
| `/images/dalmasa-seoul.webp` | 1920×1280 | 276,262 B | [Scenic temple and Seoul view](https://cdn.imweb.me/thumbnail/20260606/330b7ad403bab.jpg) | WebP conversion; metadata removed. Primary hero. |
| `/images/lanterns.webp` | 1920×1280 | 291,694 B | [Buddha's Birthday lanterns](https://cdn.imweb.me/thumbnail/20260606/4df7aff7bf4b5.png) | WebP conversion; metadata removed. |
| `/images/practice.webp` | 1920×1280 | 144,324 B | [Scripture and prayer beads](https://cdn.imweb.me/thumbnail/20251005/4ad0294a03bad.png) | WebP conversion; metadata removed. |
| `/images/dharma-service.webp` | 1000×473 | 129,218 B | [Dharma service in the main hall](https://cdn.imweb.me/thumbnail/20231128/79b5345a27d1c.jpeg) | WebP conversion; metadata removed. |
| `/images/forest.webp` | 1600×1067 | 363,062 B | [Temple forest and stone pagoda](https://cdn.imweb.me/thumbnail/20260606/0efba169f0920.jpg) | Resized from 1920×1280 and converted to WebP; metadata removed. |
| `/images/winter.webp` | 1001×1334 | 157,680 B | [Snow-covered temple courtyard](https://cdn.imweb.me/thumbnail/20260606/bdf87b7b0ca1e.jpg) | WebP conversion; metadata removed. |
| `/images/dalmasa-logo.png` | 557×198 | 30,437 B | [Official Dalmasa logo](https://cdn.imweb.me/thumbnail/20231201/6e61e2c0f29e4.png) | Palette-optimized PNG with transparency. |
| `/og.jpg` | 1200×630 | 247,624 B | Scenic view and official logo above | Social card crop using only the official source photo and logo; no new wording added. |

## Site identity assets

The existing logo-derived identity assets were retained and optimized where useful:

- `/favicon.png`: 512×512, 58,028 B
- `/icon-192.png`: 192×192, 14,232 B
- `/apple-touch-icon.png`: 180×180, 11,773 B
- `/favicon.ico`: 64×64, 17,014 B

`/site.webmanifest` references the 192px and 512px icons. The generic starter SVG icons were removed so they cannot be shipped accidentally.
