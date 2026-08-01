# Phạm Quang Huy — Portfolio

Studio-grade personal portfolio for a Korean–Vietnamese localization
specialist / game localization / interpreter. Vite + vanilla JS, GSAP +
ScrollTrigger, Lenis smooth scroll, a lazily-loaded Three.js hero, and a
bilingual (한국어 / Tiếng Việt) content system with no page reload.

## Stack

- **Build**: Vite (vanilla JS, no framework)
- **Motion**: GSAP + ScrollTrigger, Lenis (smooth scroll)
- **3D**: Three.js — dynamically imported, hero-only, gated behind a perf
  check (skips to a static CSS mesh-gradient fallback on reduced-motion,
  mid-range mobile heuristics, or missing WebGL)
- **Fonts**: Fraunces (display, VI+Latin), Inter (body, VI+Latin),
  Pretendard (Korean — lazy-loaded only when 한국어 is active)

## Structure

```
/src
  /assets    — slot for future real photography/art (currently empty by design)
  /styles    — tokens.css, fonts.css, base.css, layout.css, components.css
  /scripts   — i18n.js, motion.js, cursor.js, hero-scene.js, motif.js, eases.js
  /locales   — vi.json, ko.json (bilingual content, kept in parallel structure)
/public
  /fonts     — self-hosted, subset by unicode-range (latin/latin-ext/vietnamese
               eager; Korean dynamic-subset chunks lazy-loaded on demand)
  robots.txt, sitemap.xml, favicon.svg
```

## Commands

```bash
npm run dev      # start dev server (see .claude/launch.json, port 5183)
npm run build    # production build to /dist
npm run preview  # preview the production build locally
```

## Design system

All color/spacing/type/motion values are CSS custom properties in
`src/styles/tokens.css` — nothing is hardcoded elsewhere. The two motion
eases (`--ease`, `--ease-inout`) are also registered as exact GSAP
CustomEase instances in `src/scripts/eases.js` so JS-driven animation
matches the CSS tokens precisely.

## i18n

Default language is Vietnamese; if `navigator.language` starts with `ko`
and there's no saved preference, Korean is used instead. The toggle button
swaps `document.documentElement.lang`/`[data-lang]` (which switches the
font stack via `:lang()`/`[data-lang]` CSS) and re-renders all
`[data-i18n]` text plus the four dynamic list sections (Expertise,
Process, Works, Achievements) from `src/locales/*.json`, without a page
reload and while preserving scroll position.

## Known placeholders — replace before shipping

- **Contact links**: LinkedIn/GitHub URLs in `index.html` are placeholders
  (`#`, fake usernames). Email is real (`huyndx9@gmail.com`).
- **Resume**: the "Tải Resume / 이력서 다운로드" button links to
  `/resume.pdf`, which does not exist yet — add the real file to `/public`.
- **Selected Works**: all three case studies are placeholder copy pending
  real project details (NDA-safe copy can replace the bracketed
  "[Đang cập nhật]" / "[업데이트 예정]" titles).
- **og-cover.png**: referenced in `index.html` OG/Twitter meta tags but not
  yet created — add a 1200×630 image for social share previews.
- **canonical/sitemap domain**: currently `https://phamquanghuy.dev/` as a
  placeholder — update to the real deployed domain.
