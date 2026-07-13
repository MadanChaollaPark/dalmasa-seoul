import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const canonicalRequestOrigin = "https://dalmasa-seoul-bilingual.chaollapark.chatgpt.site";
const localePattern = /^\/(ko|en)(?:\/|$)/;
const expectedPageCountPerLocale = 34;
const legacyDestinations = {
  "/index": "/ko",
  "/contact": "/ko/contact",
  "/18": "/ko/about",
  "/19": "/ko/about/history",
  "/20": "/ko/about/vision",
  "/21": "/ko/about/abbot",
  "/22": "/ko/about/halls",
  "/23": "/ko/about/directions",
  "/24": "/ko/prayer",
  "/25": "/ko/prayer/dalmasa-practitioner",
  "/26": "/ko/prayer/daily",
  "/27": "/ko/prayer/special",
  "/28": "/ko/prayer/memorial-rites",
  "/29": "/ko/prayer/gongyang",
  "/31": "/ko/events",
  "/32": "/ko/events/major",
  "/33": "/ko/events/regular-services",
  "/34": "/ko/education",
  "/35": "/ko/education/foundations",
  "/36": "/ko/news",
  "/37": "/ko/news/notices",
  "/38": "/ko/news/stories",
  "/39": "/ko/news/volunteer",
  "/40": "/ko/memorial",
  "/41": "/ko/memorial/about",
  "/42": "/ko/memorial/enshrinement",
  "/43": "/ko/memorial/remembrance",
  "/44": "/ko/prayer/monthly",
  "/45": "/ko/education/buddhist-college",
  "/46": "/ko/education/sutra-study",
  "/47": "/ko/news/gallery",
  "/48": "/ko/education/academy",
  "/49": "/ko/prayer/dharani-1000-day",
};
const legacyPaths = Object.keys(legacyDestinations);
const additionalCanonicalPaths = ["/ko/visit"];

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

let workerPromise;
let sitemapPromise;
const pageCache = new Map();

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getTags(html, name) {
  const expression = new RegExp(`<${escapeRegExp(name)}\\b[^>]*>`, "gi");
  return html.match(expression) ?? [];
}

function getAttribute(tag, name) {
  const expression = new RegExp(
    `(?:^|\\s)${escapeRegExp(name)}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i",
  );
  const match = tag.match(expression);
  return match ? decodeEntities(match[1] ?? match[2] ?? match[3] ?? "") : null;
}

function getMeta(html, key, value) {
  for (const tag of getTags(html, "meta")) {
    if (getAttribute(tag, key)?.toLowerCase() === value.toLowerCase()) {
      return getAttribute(tag, "content");
    }
  }
  return null;
}

function getLink(html, rel, hreflang) {
  for (const tag of getTags(html, "link")) {
    const relValues = (getAttribute(tag, "rel") ?? "")
      .toLowerCase()
      .split(/\s+/);
    if (!relValues.includes(rel.toLowerCase())) continue;
    if (
      hreflang &&
      getAttribute(tag, "hreflang")?.toLowerCase() !== hreflang.toLowerCase()
    ) {
      continue;
    }
    return getAttribute(tag, "href");
  }
  return null;
}

function stripMarkup(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function documentTitle(html) {
  return stripMarkup(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
}

function pathnameOf(value) {
  const pathname = new URL(value, canonicalRequestOrigin).pathname;
  return pathname !== "/" && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

function semanticPath(pathname) {
  return pathname.replace(localePattern, "/").replace(/\/$/, "") || "/";
}

async function builtWorker() {
  workerPromise ??= (async () => {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("qa", `${process.pid}-${Date.now()}`);
    return (await import(workerUrl.href)).default;
  })();
  return workerPromise;
}

async function assetResponse(request) {
  const pathname = decodeURIComponent(new URL(request.url).pathname);
  if (pathname.includes("..")) return new Response("Not found", { status: 404 });

  for (const root of ["public", "dist/client"]) {
    const filePath = join(projectRoot, root, pathname.replace(/^\/+/, ""));
    try {
      if (!(await stat(filePath)).isFile()) continue;
      return new Response(await readFile(filePath), {
        headers: {
          "content-type":
            mimeTypes[extname(filePath).toLowerCase()] ??
            "application/octet-stream",
        },
      });
    } catch {
      // Try the next public-asset root.
    }
  }

  return new Response("Not found", { status: 404 });
}

async function request(path, { accept = "text/html" } = {}) {
  const worker = await builtWorker();
  return worker.fetch(
    new Request(new URL(path, canonicalRequestOrigin), {
      headers: { accept },
      redirect: "manual",
    }),
    { ASSETS: { fetch: assetResponse } },
    {
      passThroughOnException() {},
      waitUntil() {},
    },
  );
}

async function renderedPage(path) {
  const normalizedPath = pathnameOf(path);
  if (!pageCache.has(normalizedPath)) {
    pageCache.set(
      normalizedPath,
      (async () => {
        const response = await request(normalizedPath);
        assert.equal(
          response.status,
          200,
          `${normalizedPath} should render successfully (received ${response.status})`,
        );
        assert.match(
          response.headers.get("content-type") ?? "",
          /^text\/html\b/i,
          `${normalizedPath} should return HTML`,
        );
        return response.text();
      })(),
    );
  }
  return pageCache.get(normalizedPath);
}

async function sitemapEntries() {
  sitemapPromise ??= (async () => {
    const response = await request("/sitemap.xml", { accept: "application/xml" });
    assert.equal(response.status, 200, "sitemap.xml should resolve");
    assert.match(
      response.headers.get("content-type") ?? "",
      /(?:application|text)\/(?:xml|plain)/i,
      "sitemap.xml should have an XML-compatible content type",
    );
    const xml = await response.text();
    const entries = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) =>
      decodeEntities(match[1].trim()),
    );
    assert.equal(
      new Set(entries).size,
      entries.length,
      "sitemap.xml must not contain duplicate URLs",
    );
    return entries;
  })();
  return sitemapPromise;
}

test("publishes 33 migrated pages plus the first-visit page in Korean and English", async () => {
  assert.equal(legacyPaths.length, 33, "the live-site baseline should stay at 33 pages");

  const entries = await sitemapEntries();
  const byLocale = { ko: [], en: [] };

  for (const entry of entries) {
    const url = new URL(entry);
    assert.equal(url.protocol, "https:", `${entry} must use HTTPS`);
    assert.ok(!/^(?:localhost|127\.0\.0\.1)$/i.test(url.hostname), `${entry} must use a public host`);
    const locale = url.pathname.match(localePattern)?.[1];
    assert.ok(locale, `${entry} must be locale-prefixed with /ko or /en`);
    byLocale[locale].push(pathnameOf(url.href));
  }

  assert.equal(byLocale.ko.length, expectedPageCountPerLocale);
  assert.equal(byLocale.en.length, expectedPageCountPerLocale);

  const koreanSemantics = byLocale.ko.map(semanticPath).sort();
  const englishSemantics = byLocale.en.map(semanticPath).sort();
  assert.deepEqual(
    koreanSemantics,
    englishSemantics,
    "every canonical Korean route must have the same canonical English route",
  );

  const sitemapPaths = new Set([...byLocale.ko, ...byLocale.en]);
  const expectedKoreanCanonicals = new Set([
    ...Object.values(legacyDestinations),
    ...additionalCanonicalPaths,
  ]);
  assert.equal(expectedKoreanCanonicals.size, expectedPageCountPerLocale);
  for (const koreanPath of expectedKoreanCanonicals) {
    assert.ok(sitemapPaths.has(koreanPath), `${koreanPath} must be in sitemap.xml`);
    assert.ok(
      sitemapPaths.has(koreanPath.replace(/^\/ko(?=\/|$)/, "/en")),
      `${koreanPath} must have an English sitemap counterpart`,
    );
  }
});

test("keeps every route from the current Dalmasa sitemap reachable as an explicit redirect", async () => {
  for (const path of legacyPaths) {
    const response = await request(path);
    assert.ok(
      [301, 302, 307, 308].includes(response.status),
      `${path} should explicitly redirect (received ${response.status})`,
    );
    const location = response.headers.get("location");
    assert.ok(location, `${path} should include a redirect destination`);
    const destination = new URL(location, canonicalRequestOrigin);
    assert.equal(destination.origin, canonicalRequestOrigin, `${path} should redirect internally`);
    assert.match(destination.pathname, localePattern, `${path} should redirect to a localized page`);
    assert.equal(
      pathnameOf(destination.href),
      legacyDestinations[path],
      `${path} should preserve its current content identity`,
    );
    const destinationResponse = await request(destination.pathname);
    assert.equal(destinationResponse.status, 200, `${path} redirect destination should render`);
  }
});

test("renders complete, unique metadata for every canonical page", async () => {
  const entries = await sitemapEntries();
  const seenTitles = { ko: new Set(), en: new Set() };
  const seenDescriptions = { ko: new Set(), en: new Set() };
  const seenCanonicals = new Set();

  for (const entry of entries) {
    const path = pathnameOf(entry);
    const locale = path.match(localePattern)?.[1];
    const html = await renderedPage(path);
    const title = documentTitle(html);
    const description = getMeta(html, "name", "description")?.trim() ?? "";
    const canonical = getLink(html, "canonical");

    assert.ok(title.length >= 8, `${path} needs a descriptive title`);
    assert.ok(description.length >= 40, `${path} needs a useful meta description`);
    assert.ok(canonical, `${path} needs a canonical link`);

    const canonicalUrl = new URL(canonical);
    assert.equal(canonicalUrl.protocol, "https:", `${path} canonical must use HTTPS`);
    assert.equal(pathnameOf(canonicalUrl.href), path, `${path} canonical should be self-referential`);
    assert.ok(!seenCanonicals.has(canonicalUrl.href), `${path} canonical must be unique`);
    seenCanonicals.add(canonicalUrl.href);

    assert.ok(!seenTitles[locale].has(title), `${path} title must be unique within ${locale}`);
    assert.ok(
      !seenDescriptions[locale].has(description),
      `${path} description must be unique within ${locale}`,
    );
    seenTitles[locale].add(title);
    seenDescriptions[locale].add(description);

    assert.equal(getMeta(html, "property", "og:title"), title, `${path} needs matching og:title`);
    assert.equal(
      getMeta(html, "property", "og:description"),
      description,
      `${path} needs matching og:description`,
    );
    assert.match(getMeta(html, "property", "og:image") ?? "", /^https:\/\//, `${path} needs an absolute HTTPS social image`);
    assert.equal(getMeta(html, "property", "og:url"), canonicalUrl.href, `${path} needs matching og:url`);
  }
});

test("declares language parity and accessibility basics on every canonical page", async () => {
  for (const entry of await sitemapEntries()) {
    const path = pathnameOf(entry);
    const locale = path.match(localePattern)?.[1];
    const html = await renderedPage(path);
    const htmlTag = getTags(html, "html")[0] ?? "";
    const viewport = getMeta(html, "name", "viewport") ?? "";

    assert.equal(getAttribute(htmlTag, "lang"), locale, `${path} should set html[lang]=${locale}`);
    const koreanAlternate = getLink(html, "alternate", "ko");
    const englishAlternate = getLink(html, "alternate", "en");
    assert.ok(koreanAlternate, `${path} needs a Korean hreflang`);
    assert.ok(englishAlternate, `${path} needs an English hreflang`);
    assert.ok(getLink(html, "alternate", "x-default"), `${path} needs x-default hreflang`);
    assert.equal(
      pathnameOf(koreanAlternate),
      path.replace(/^\/en(?=\/|$)/, "/ko"),
      `${path} Korean alternate must identify the same page`,
    );
    assert.equal(
      pathnameOf(englishAlternate),
      path.replace(/^\/ko(?=\/|$)/, "/en"),
      `${path} English alternate must identify the same page`,
    );

    assert.equal(getTags(html, "h1").length, 1, `${path} should have exactly one h1`);
    assert.equal(getTags(html, "main").length, 1, `${path} should have exactly one main`);
    assert.match(html, /<a\b[^>]*href=["']#main-content["'][^>]*>/i, `${path} needs a skip link`);
    assert.match(html, /<main\b[^>]*id=["']main-content["'][^>]*>/i, `${path} needs a skip-link target`);
    assert.ok(
      getTags(html, "nav").some((tag) => (getAttribute(tag, "aria-label") ?? "").trim()),
      `${path} needs labelled navigation`,
    );

    assert.match(viewport, /width\s*=\s*device-width/i, `${path} needs a mobile viewport`);
    assert.doesNotMatch(viewport, /user-scalable\s*=\s*no/i, `${path} must allow zoom`);
    assert.doesNotMatch(viewport, /maximum-scale\s*=\s*1(?:\.0+)?(?:,|$)/i, `${path} must allow zoom`);
    assert.doesNotMatch(
      html,
      /codex-preview|Your site is taking shape|Get In Touch\.\.\.|I(?:&apos;|&#x27;|')m a paragraph|\b(?:TODO|TBD)\b/i,
      `${path} must not expose starter or placeholder copy`,
    );
  }
});

test("gives images stable dimensions and accessible alternatives", async () => {
  for (const entry of await sitemapEntries()) {
    const path = pathnameOf(entry);
    const html = await renderedPage(path);
    for (const image of getTags(html, "img")) {
      assert.notEqual(getAttribute(image, "alt"), null, `${path} image is missing alt`);
      assert.match(getAttribute(image, "width") ?? "", /^\d+$/, `${path} image needs numeric width`);
      assert.match(getAttribute(image, "height") ?? "", /^\d+$/, `${path} image needs numeric height`);
    }
  }
});

test("gives links and controls accessible names", async () => {
  for (const entry of await sitemapEntries()) {
    const path = pathnameOf(entry);
    const html = await renderedPage(path);
    const labels = new Set(
      getTags(html, "label")
        .map((tag) => getAttribute(tag, "for"))
        .filter(Boolean),
    );

    for (const match of html.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
      const tag = `<${match[1]} ${match[2]}>`;
      const name =
        getAttribute(tag, "aria-label") ||
        getAttribute(tag, "title") ||
        stripMarkup(match[3]);
      assert.ok(name.trim(), `${path} has an unnamed ${match[1].toLowerCase()}`);
    }

    for (const tagName of ["input", "select", "textarea"]) {
      for (const tag of getTags(html, tagName)) {
        if (getAttribute(tag, "type")?.toLowerCase() === "hidden") continue;
        const labelled =
          (getAttribute(tag, "aria-label") ?? "").trim() ||
          (getAttribute(tag, "aria-labelledby") ?? "").trim() ||
          (getAttribute(tag, "title") ?? "").trim() ||
          labels.has(getAttribute(tag, "id"));
        assert.ok(labelled, `${path} has an unlabelled ${tagName}`);
      }
    }
  }
});

test("does not ship broken or insecure internal links", async () => {
  const paths = (await sitemapEntries()).map(pathnameOf);
  const internalPaths = new Set(paths);

  for (const path of paths) {
    const html = await renderedPage(path);
    for (const anchor of getTags(html, "a")) {
      const href = getAttribute(anchor, "href");
      if (!href || /^(?:#|mailto:|tel:|sms:|javascript:)/i.test(href)) continue;
      assert.doesNotMatch(href, /^http:\/\/(?:www\.)?dalmasa\.org/i, `${path} contains an insecure Dalmasa link`);
      const url = new URL(href, canonicalRequestOrigin);
      if (url.origin === canonicalRequestOrigin) internalPaths.add(pathnameOf(url.href));
    }
  }

  for (const path of internalPaths) {
    const response = await request(path);
    assert.ok(
      (response.status >= 200 && response.status < 400) || response.status === 405,
      `${path} is linked internally but returned ${response.status}`,
    );
  }
});

test("publishes favicon, manifest, robots, sitemap, and social identity", async () => {
  const firstPagePath = pathnameOf((await sitemapEntries())[0]);
  const html = await renderedPage(firstPagePath);
  const iconHref = getLink(html, "icon") || getLink(html, "shortcut");
  const manifestHref = getLink(html, "manifest");

  assert.ok(iconHref, "the document should reference a favicon");
  assert.ok(manifestHref, "the document should reference a web-app manifest");

  const iconResponse = await request(iconHref, { accept: "image/*" });
  assert.equal(iconResponse.status, 200, "favicon should resolve");
  const icon = await iconResponse.text();
  assert.ok(icon.length >= 100, "favicon should not be empty");
  assert.doesNotMatch(icon, /#68C4FF|M22 19\.2727/, "favicon should not be the Sites starter icon");

  const manifestResponse = await request(manifestHref, { accept: "application/manifest+json" });
  assert.equal(manifestResponse.status, 200, "manifest should resolve");
  const manifest = await manifestResponse.json();
  assert.ok(manifest.name?.toLowerCase().includes("dalmasa") || manifest.name?.includes("달마사"));
  assert.ok(manifest.short_name);
  assert.ok(["standalone", "minimal-ui", "browser"].includes(manifest.display));
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0);

  const robotsResponse = await request("/robots.txt", { accept: "text/plain" });
  assert.equal(robotsResponse.status, 200, "robots.txt should resolve");
  const robots = await robotsResponse.text();
  assert.match(robots, /User-agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:\s*https:\/\//i);
  assert.doesNotMatch(robots, /Sitemap:\s*http:\/\//i);
});

test("adds browser security and privacy headers", async () => {
  const response = await request("/en");
  assert.match(response.headers.get("strict-transport-security") ?? "", /max-age=31536000/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/i);
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/i);
});
