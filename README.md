# geraldjove.com

Personal site for Gerald Jove — 3D artist and creative-automation engineer.

Built with [Astro](https://astro.build) as a fully static site. Every route ships as real HTML: no
client-side router, and no framework runtime on any page.

## Commands

```bash
npm install
npm run dev      # dev server on :4321
npm run build    # static output to dist/
npm run preview  # serve dist/ locally
npm run check    # astro check (types + template diagnostics)
```

Node 20.19+ / 22.12+ recommended. Verified on Node v24.18.0.

## Layout

```
src/
  assets/img/      images, optimised at build time by astro:assets
  components/      .astro components
  content/         page copy as typed modules, plus content collections
    blanks.js      values that are deliberately unfilled — see below
    work/          case studies (collection)
    insights/      schema only; no route yet
  layouts/         BaseLayout — meta, canonical, Open Graph
  pages/           one file per route
  scripts/         small bundled enhancement scripts
  styles/global.css  design tokens and component classes
public/            robots.txt, media, favicon
```

`src/content.config.ts` defines the collections.

## Two things to know before editing

**1. Copy lives in `src/content/`, not in markup.** Text is edited there; components render it.

**2. `src/content/blanks.js` holds values that are intentionally empty.** These are figures — case
study outcomes, prices, testimonials — that must not be guessed. While a value is `null`, the element
that would display it is omitted from the page rather than filled with a placeholder. `npm run build`
lists everything still open. See `tasks/PRE-LAUNCH-CHECKLIST.md` (local, not committed).

## Interactivity

Only two things are interactive, and both are static HTML enhanced by a small bundled script: the
mobile nav toggle and the contact form. Both work without JavaScript — the form falls back to a
native POST that returns to `/thank-you`.

No UI framework is installed. Scripts are never inlined into the HTML, because the production
Content-Security-Policy is `script-src 'self'` with no nonce; an inline script would be silently
blocked in production while working in dev.

## Deployment

Vercel, static output. `vercel.json` carries the security headers, the `/works` → `/work` redirect
and the immutable cache policy for hashed assets. There is no SPA rewrite — every route is a real
file, which is what keeps `robots.txt`, `sitemap-index.xml` and 404 statuses correct.

## Design system

Tokens, type scale, spacing rhythm, motion and measured contrast ratios are documented in
`docs/design-system.md` (local, not committed). `src/styles/global.css` is authoritative.
