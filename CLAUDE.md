# Shvil Lavan (שביל לבן) - Landing Page

## Project
Static landing page for a trail logistics company in Israel. Pure HTML/CSS/JS, deployed on Netlify.

## Stack
- HTML5, CSS3, vanilla JavaScript
- Google Fonts: Open Sans (Hebrew subset)
- Font Awesome (CDN)
- Netlify Forms for contact
- No frameworks or build tools

## Conventions
- All text content in Hebrew, RTL layout
- Color palette: browns (#8B5E3C, #5C3A1E), orange (#E8A044), cream (#F5F0E8)
- Mobile-first responsive design
- Images in `/images/`, CSS in `/css/`, JS in `/js/`

## Key Files
- `index.html` - single-page landing
- `services/`, `shvil-golan/`, `shvil-israel/`, `yam-el-yam/`, `family-hosting/` - subpage directories
- `css/style.css` - all styles
- `js/main.js` - interactions
- `404.html` - custom 404 page
- `sitemap.xml`, `robots.txt` - crawl config
- `design.jpeg` - reference design (do not modify)

---

## SEO Rules (enforce on every page)

### Meta tags (`<head>`)
- `<html lang="he" dir="rtl">`
- `<title>` — up to 60 chars, primary keyword near the start, always includes "שביל לבן"
- `<meta name="description">` — 140–160 chars, action-oriented Hebrew
- `<meta name="keywords">` — page-specific keywords
- `<link rel="canonical">` — must point to the page's own URL (not the home URL)
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale=he_IL`) — `og:url` and `og:title` must match the page
- Twitter Card (`summary_large_image`)
- JSON-LD structured data: `LocalBusiness` on home, `Service` or `WebPage` + `BreadcrumbList` on subpages

### Target keywords (use naturally, no stuffing)
- Primary: ליווי מסעות בשטח, לוגיסטיקה למטיילים
- Per-page primary:
  - `/services/` — הובלת ציוד למטיילים, הקמת מחנות
  - `/shvil-israel/` — ליווי לוגיסטי שביל ישראל
  - `/shvil-golan/` — ליווי לוגיסטי שביל הגולן
  - `/yam-el-yam/` — ליווי לוגיסטי ים אל ים
  - `/family-hosting/` — אירוח משפחות בטבע
- Place primary keyword in: title, meta description, H1, first paragraph

### On-page structure
- Exactly one `<h1>` per page containing the page's primary keyword
- Logical H2/H3 hierarchy, no skipped levels
- Every `<img>` needs descriptive Hebrew `alt` (empty `alt=""` only for purely decorative images)
- Internal links use descriptive Hebrew anchor text (never "לחץ כאן" / "כאן")

### Performance (affects Core Web Vitals + ranking)
- **Render-blocking CSS**: load external stylesheets (Google Fonts, Font Awesome) async via the `media="print" onload="this.media='all'"` pattern with a `<noscript>` fallback
- **Modern image formats**: every `<img src="*.jpg">` must be wrapped in `<picture>` with a `<source srcset="*.webp" type="image/webp">` sibling
- **Image dimensions**: every `<img>` needs explicit `width` and `height` attributes (prevents CLS + distortion)
- **Image sizes**: compress sources under ~150KB; for thumbnails rendered at 600×400, do not ship 1920w source — resize or add `srcset`
- **Preload hero**: use `<link rel="preload" as="image" href="...hero.webp" type="image/webp">`
- **Preconnect**: to `fonts.googleapis.com`, `fonts.gstatic.com`, and `cdnjs.cloudflare.com`

### Local / Israeli SEO
- Use Hebrew region/trail names naturally (שביל ישראל, שביל הגולן, ים אל ים, גליל, גולן, נגב)
- `LocalBusiness` JSON-LD with `areaServed: Israel`, phone, email, logo

### Ops
- Netlify headers (see `netlify.toml`) set long cache on `/images`, `/css`, `/js`
- Custom 404 (`/404.html`) must link back to main sections
- SPF record needed at DNS level (not in code) to prevent mail spoofing
- `sitemap.xml` and `robots.txt` live at repo root — update `sitemap.xml` when adding pages
