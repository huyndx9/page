# Phạm Quang Huy — Portfolio

Single-file static portfolio site. No build step, no dependencies — just
`index.html` with everything inlined (CSS, JS, portrait + certificate
images as base64). Google Fonts loaded via CDN link.

Positioning: Business-minded Bridge Engineer connecting Vietnam, Korea,
and Technology. Content is grounded in the real CV — actual education,
work history (AHQ-mobile founder 2019–2023, 택이네 branch manager
2023–present), TOPIK 6 / HSK 3 scores, and verified Coursera
certificates.

## Structure

```
index.html    — the entire site (markup, inline <style>, inline <script>)
favicon.svg
robots.txt
sitemap.xml
```

## Local preview

```bash
python -m http.server 5183
```
then open `http://localhost:5183/`. (Or just double-click `index.html` —
it has no server-only dependencies.)

## i18n

Three languages (VI / KO / EN) via a `DICT` object in the inline
`<script>` at the bottom of `index.html`. `setLang()` swaps
`[data-i18n]`/`[data-i18n-ph]` text content, persists the choice to
`localStorage`, and runs on load.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) copies `index.html`,
`favicon.svg`, `robots.txt`, and `sitemap.xml` into a `_site/` folder and
publishes it to GitHub Pages — no build step. Push to `main` to deploy.

## Known gaps

- **Contact form**: the form in the Contact section has no submit
  handler yet — it's decorative. Needs a backend (e.g. Formspree,
  a serverless function) or should be replaced with mailto/tel links only.
- **Canonical domain**: meta tags reference `https://pqh.dev` — update if
  that domain isn't live, or point to the actual GitHub Pages URL.
- **Projects section**: lists Job Search Platform, AI Translation
  Assistant, and an AI/Video pipeline — confirm these have real
  repos/demos to link before a recruiter asks.
