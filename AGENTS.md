# AGENTS.md — geraldjove.com

Guidance for any coding agent or contributor working in this repository.
`README.md` covers setup; this file covers the rules that are not obvious from the code.

**This repository is public.** Do not add commercial terms, pricing rationale, client names, or
strategy notes to any tracked file. `docs/` and `tasks/` are gitignored for exactly that reason.

---

## Architecture

Static [Astro](https://astro.build) site. No client-side router, no UI framework, no server runtime.
Every route is a real HTML file in `dist/`.

```
src/
  assets/img/        source images; optimised at build time by astro:assets
  components/        .astro components (Icon, Nav, Footer, ServiceCard, CaseTeaser, CtaBlock, ContactForm)
  content/           all page copy, as typed modules
    blanks.js        values deliberately left empty — read the rule below
    site.ts          nav, footer, meta, CTA labels, availability line
    home.ts services.ts about.ts contact.ts
    work/            case studies (content collection)
    insights/        schema only; no route, no entries yet
  layouts/BaseLayout.astro   meta, canonical, Open Graph, skip link, <main>
  pages/             one file per route
  scripts/           bundled enhancement scripts (nav, reveal, contact-form)
  styles/global.css  design tokens and component classes — authoritative
src/content.config.ts   collection definitions
public/            robots.txt, media/, logo
vercel.json        security headers, /works -> /work redirect, cache policy
```

## Commands

```bash
npm install
npm run dev      # :4321
npm run build    # static output to dist/
npm run preview  # serve dist/
npm run check    # astro check — types and template diagnostics
```

There is no test runner and no linter. `npm run check` plus `npm run build` are the gates. Do not
claim tests passed; there are none.

---

## Rules that will bite you

### 1. Never inline a script

The production CSP is `script-src 'self'` with no nonce (static host — it cannot issue one). An
inline `<script>` is silently blocked in production while working perfectly in `npm run dev`.

`astro.config.mjs` sets `vite.build.assetsInlineLimit: 0` and `build.inlineStylesheets: 'never'` to
prevent this. **Do not remove either.** After any change that touches scripts, verify:

```bash
find dist -name "*.html" -exec grep -o '<script[^>]*>[^<]' {} + | grep -vc 'src='   # must be 0
```

Use `find`, not `dist/**/*.html`. Git Bash here has `globstar` off, so the glob matches only one
directory level — it misses `dist/404.html` and `dist/work/<slug>/index.html` and reports a
false zero.

### 2. Do not add a UI framework island

Astro injects an *inline* hydration runtime for every `client:*` directive, which rule 1 blocks. A
Vue island was built and removed for this reason. Interactivity is static markup plus a bundled
script in `src/scripts/`. Total JS across the whole site is ~3 KB; keep it that way.

### 3. Never invent a figure

`src/content/blanks.js` holds values that are `null` **on purpose** — case-study outcomes, two
prices, testimonials, a share image. They are unfilled because nobody has supplied a real number.

- Do not fill them with estimates, plausible ranges, rounded guesses, or "contact for pricing".
- Where a value is null, the element that would display it is **omitted entirely**. Never render an
  orphan `Result:` label or a `from $—` placeholder.
- `npm run build` prints every blank still open, and flags the ones that block publication.

### 4. Do not name clients

Work is described as "a US creative agency". Do not add a client name, logo, screenshot, dashboard
image, or any code from a client engagement to this repository.

⚠ **Five Figma nodes are permanently excluded. Do not export them, and do not describe their
contents in any tracked file** — writing down what is in them republishes as text the thing the
exclusion prevents. Established 2026-08-17 after each was opened and read directly.

| Node | Why |
|---|---|
| `30:2` | **Client-engagement material** — a screen capture from a client engagement. Both halves are in scope, so cropping does not help. |
| `33:214` | Third-party trademark |
| `33:215` | Third-party photograph |
| `33:216` | Third-party photograph |
| `33:217` | Third-party trademark |

`30:2` has been requested and re-downloaded **twice** despite being flagged, because it is the
obvious visual for the homepage Proof section. **The Proof section ships without it**: case study
one is text-only, case study two keeps its own image. If an asset is missing from
`src/assets/img/`, treat that as deliberate and check this table before fetching it.

A copy is quarantined at `.scratch/quarantine/`, which `.gitignore` covers **for this reason** —
that entry is a safety control, not tidiness. Full reasoning, which is deliberately not repeated
here, is in `tasks/2026-08-17-figma-four-page-redesign-implementation.md` (gitignored).

### 5. Availability wording is fixed

Every call to action reads *"from January 2027"* (`AVAILABILITY` in `src/content/site.ts`). Do not
soften it to "available now", do not reinstate an availability badge, and do not wire a live booking
scheduler. The primary CTA routes to `/contact`.

### 6. Copy lives in `src/content/`, not in markup

Add or edit text there; components render it. Copy is sourced from a written copy document — match
it rather than improving it. If a page needs a heading the copy document does not supply, prefer
reusing an existing supplied line over writing a new one, and say so in your report.

---

## Conventions

- **Design tokens only.** `src/styles/global.css` defines colour, type scale, spacing, surfaces and
  motion. Do not hardcode hex values, font sizes, or ad-hoc `py-*` section padding.
- **Palette is the Figma's, changed 2026-08-17.** Was `#0b1120` / `#009efa`; is now
  `#161616` (page) / `#242424` (raised) / `#00aaff` (accent), sampled from a render of frame
  `33:505` rather than from `get_design_context` metadata. Gerald asked for a 1:1 copy and had
  already chosen the design over the locked spec once, on typefaces; copying every coordinate to
  ±2px while shipping a different background is not a copy. Re-measured against every surface
  before shipping — the new palette is **better** than the old one, not a concession:

  | | on `#161616` | on `#242424` | on `#2e2e2e` |
  |---|---|---|---|
  | `#ffffff` fg | 18.10 | 15.52 | 13.58 |
  | `#d4d4d4` fg-muted | 12.21 | 10.47 | 9.16 |
  | `#a8a8a8` fg-subtle | 7.61 | 6.53 | 5.71 |
  | `#959595` fg-quiet / placeholder | 5.68 | 4.87 | 4.53 |
  | `#00aaff` accent | 7.06 | 6.06 | 5.30 |

  `#000000` on `#00aaff` is **8.19:1** — the design's own black-on-accent pill is safe, and
  `accent-ink` is now literal black rather than `#05101f`. The old accent measured 6.27 on the old
  page colour, so the floor rose. The worst pairing anywhere is **4.53:1** against a 4.5:1 AA floor.
  ⚠ **The Figma's own placeholder/helper grey `#515151` is 1.96:1 on `#242424`** — unreadable, not
  marginal, and it carries real instructional copy on the contact form (`33:537`), not just
  placeholders. It ships raised to `#959595`. That is the single deliberate colour deviation from 1:1.
  `--color-inset` `#2e2e2e` and the three `fg-*` greys are **authored**: the design has only two
  surfaces and one text colour, and those token names are still referenced by `/work`,
  `/work/<slug>`, `/thank-you` and `/404`, which are out of scope for the rebuild.
- **Leading is `round(fontSize × 2400/2048)`, per size — not a ratio, and not `normal`.**
  Corrected 2026-08-18; an earlier version of this line said "7/6" and was wrong above 36px.
  `line-height: normal` for the *variable* Roboto Condensed measures ~1.208 in Chrome and drifts
  **+3px over three lines and +9px over nine**, so it is wrong under any reading. But Figma does not
  apply a flat ratio either: it takes the **static** Roboto Condensed hhea ratio,
  (1900 + 500)/2048 = 1.171875, and rounds the result to a whole pixel per font size.

  | px | raw | Figma | 7/6 gives | 7/6 error per line |
  |---|---|---|---|---|
  | 18 | 21.094 | **21** | 21.000 | 0.000 |
  | 24 | 28.125 | **28** | 28.000 | 0.000 |
  | 30 | 35.156 | **35** | 35.000 | 0.000 |
  | 36 | 42.188 | **42** | 42.000 | 0.000 |
  | 64 | 75.000 | **75** | 74.667 | 0.333 |

  ⚠ **7/6 is a coincidence, not a design decision.** It equals the rounded value at exactly
  18 / 24 / 30 / 36 and diverges at 34, 38, 40, 49, 62 and 64 — six of the ten heading sizes. That
  is why this took three rounds to settle: sampling body copy gives 7/6, sampling headings gives
  1.171875, and both measurements are correct. Verified by reading `text-[Npx]` from
  `get_design_context` and dividing the node's own box — never by inferring the size from the ratio
  under test, which is the circular step that made it look settled early: `33:130` is `text-[18px]`
  with 9 `<li>` in a 189px box; `33:227` is `text-[24px]`, 3 lines, 84px; `33:173` is `text-[64px]`,
  1 line, **75px** (also `33:225`, `33:117`, `24:187`, `23:179`).

  Use the `--leading-fx-<px>` token that pairs with your `--text-fx-<px>` size step. `.fx-frame`
  applies the `--leading-fx` ratio by default at ≥90rem as a safety net — kept at 7/6 because it is
  exact at 18 and 24, the sizes that carry multi-line body copy where error accumulates — and `body`
  keeps 1.68 below, for the authored layout. Poppins headings are **line-height 1** (baseline pitch
  measured at 72.5px on `33:287`) and carry it via `.fx-display`, which sets the face and the
  leading together so the two cannot be applied separately.
- **Typefaces: Poppins and Roboto Condensed. The switch landed 2026-08-17** — Archivo and Space
  Grotesk are uninstalled and appear nowhere in `dist/`. Self-hosted via fontsource, because
  `font-src` is `'self'` and the CSP does not allow the Google hosts — never reintroduce them.
  `@fontsource/poppins/latin-500.css` + `latin-700.css` (Poppins has **no** variable build) and
  `@fontsource-variable/roboto-condensed/wght.css`. Roman only; no italic face is loaded.
- **Which face goes where — use the enumeration, not a rule of thumb.** Established 2026-08-17 by
  reading the `font-[...]` value of every text node in all four frames. **Three earlier heuristics
  were each falsified in turn** ("Poppins is the body face"; "only two H1s are Poppins"; "every
  page-level H1 and nothing else"), each derived from whichever nodes someone happened to check.
  The failure is silent — a heading in the wrong face looks fine.

  **Poppins — 19 nodes, and that is all of them:**
  - The four page `h1`s: `2:3`, `33:110`, `33:287`, `33:507`.
  - `24:197`, the homepage closing-CTA heading — an **`h2`**, 69.6px Bold.
  - Every interactive control label without exception: nav links (Medium 500), every button and
    pill (Bold 700), the footer newsletter heading and Submit (currently omitted, endpoint null).

  **Roboto Condensed carries everything else** — every other heading at 30, 36, 38, 40, 49, 62, 64
  **and 72.504px**, plus all body copy.

  ⚠ **Size does not predict the face, and neither does the element.** `24:197` is an `h2` in Poppins
  at 69.6px; the Services detail headings `33:295` / `33:345` / `33:396` are `h2`s in Roboto
  Condensed at 72.504px — the same size as the Poppins `h1`s. Do not copy `font-display` onto them.

  *Interpretation, not a rule:* Poppins marks the page's ask — opening line, closing line, every
  button — while Roboto Condensed does the informational work. It predicts all 19 nodes, but it is
  the fourth framing offered and is a gloss on the enumeration, not a substitute for it. **If a new
  heading needs a face, read its node.**

  ⚠ **How to check a node, and why the obvious method is not enough.** The table above was built by
  reading `font-[...]` from `get_design_context`, and that source returned **different values for the
  same node on different calls** (`33:511` came back as both `Poppins:Bold` and
  `Roboto_Condensed:Bold`). Comparing the design metadata against the built site does **not** catch
  this: the code was written from the same metadata, so both agree and both are wrong together. The
  only independent check is to render the node with `get_screenshot`, upscale it, and read the
  letterforms — **Poppins has a single-storey 'a' and a circular 'o'; Roboto Condensed has a
  double-storey 'a' and narrow oval forms.** Upscale 6× with nearest-neighbour so the shapes stay
  crisp. If the text has no 'a', fall back to overall width and aperture: Poppins is geometric and
  wide with near-circular bowls, Roboto Condensed is visibly narrowed with oval ones. That test
  settled every font dispute in this project.
  ⚠ **A node whose text is black renders as a solid black rectangle** when screenshot on its own —
  the CTA labels `5:18` and `22:46` both do. That looks like a tool failure and is not: screenshot
  the **parent group** that carries the accent pill behind it (`21:23` and `22:44` respectively).
  Eight of the nineteen nodes above are render-confirmed, with no mismatches; the rest rest on
  metadata alone. Render before trusting, and never "fix" a face on metadata alone.

  `global.css` defaults `h1`–`h6` to `--font-sans`; Poppins is opted into with `font-display`.
  ⚠ The token names read backwards against their content: `--font-display` is the accent/UI face and
  `--font-sans` is the workhorse.

- **No italic face is loaded — six runs synthesise an oblique.** `32:88` and `24:205` at 11.5px, and
  **`33:181` / `33:183` / `33:185` / `33:187` — the four institution names on About Education — at
  24px Bold Italic.** At 11.5px the synthesis is invisible; at 24px it is not.
  ⚠ **It is not a choice between 56,956 B and nothing.** The full Roboto Condensed italic woff2 is
  56,956 B — larger than the entire rest of the font payload — but a subset of the **33 glyphs those
  four names actually use is 10,032 B**. So the decision is subset / drop / full, not load / drop.
  Look at About before launch. Gerald's call, not an agent's.
- **Contrast**: every text token passes 4.5:1 on every surface it can sit on (worst case 4.98:1). If
  you add a colour token, measure it against all four surfaces before using it. White on the accent
  fill fails (2.89:1) — accent buttons take `accent-ink`.
- **Accent is for the primary action**, not decoration.
- **Motion**: one reveal mechanism (`src/scripts/reveal.ts`). Content is visible by default; the
  script only hides elements already below the fold. Never make content depend on JS to appear.
- **Images** go through `astro:assets` (`<Image />` / `getImage`). Nothing is hotlinked — no
  third-party asset hosts appear in the build, and the CSP no longer allows them.
- **Security headers** live in `vercel.json`. Do not weaken them. There is deliberately **no SPA
  rewrite**; adding one would break every route and reintroduce soft 404s.

## Definition of done

- `npm run check` reports 0 errors.
- `npm run build` succeeds. ⚠ **`check` passing is not the build passing** — a malformed comment has
  already produced exactly that, clean diagnostics and a compiler error. Run both.
- 0 inline `<script>` blocks in `dist/`.
- **0 occurrences of `[object Object]` in `dist/`:**
  ```bash
  grep -rl "\[object Object\]" dist --include=*.html | wc -l   # must be 0
  ```
  This has shipped into `dist/` once. **No existing gate catches it** — interpolating an object into
  a template is legal TypeScript and legal Astro, so `astro check` is silent by design. Any change to
  the shape of a content module can reintroduce it.
- No third-party asset host in the build.
- No invented figures; unfilled blanks still render as omissions.
- Verified at 390×844 with no horizontal overflow. Measure by **bounding box against
  `document.documentElement.clientWidth`**, with scrollbars **shown** — `scrollWidth` is a false pass
  because `body { overflow-x: hidden }`, and `--hide-scrollbars` grants 15px a real user does not have.
- **Assert position, not only size.** A page translated uniformly passes every size assertion. An
  85px offset shipped once and was invisible to a suite that only checked dimensions.
- ⚠ **Verify the transport before believing a visual result.** Three separate faults here have looked
  exactly like page defects and were not: an `image/heif` Content-Type, a dead preview server
  answering every request, and a long-running dev server holding stale `sharp` state and returning
  500 for every image. In each case the evidence-gathering mechanism was broken, not the page. Before
  trusting a screenshot or a measurement, confirm the page actually loaded and the images actually
  served.
- Report what was verified and what was not. Do not report unrun checks as passing.

<!-- SESSION-HANDOFF:START -->
## Current Session Handoff

**Last updated:** 2026-08-17

### Current: the four pages rebuilt 1:1 from Figma — built and verified, NOT COMMITTED

On branch **`redesign/figma-1to1`**, cut from `10df2b1`.

⚠ **The entire rebuild is uncommitted — 18 modified files and 28 new ones exist ONLY in the working
tree.** HEAD is still `10df2b1` and the sole stash holds the *previous* pass, so nothing here is in
any commit or stash. A `git clean -fd`, `git checkout -- .` or `git reset --hard` destroys it with no
recovery path. **Run no destructive git command on this branch.** This is not hypothetical: an agent
misread `git status` — reading "differs from HEAD" as "left over from the old pass" — and recommended
deleting three untracked components that were in fact the new work. It retracted before anyone acted.
`git status` tells you what differs from HEAD; it cannot tell you who wrote it.

**Gate as of 2026-08-18, run against the BUILT output rather than the dev server:**
`npm run check` 0/0/0 · `npm run build` 8 pages · 0 inline `<script>` in `dist/` · 0 `[object Object]`
· no third-party asset host · 0 excluded assets in the build · 22 webp, no avif ·
**32/32 zero overflow** across 4 pages × 320/390/768/1024/1280/1440/1600/1920 with scrollbars shown.

**Fidelity at ≥1440: every section on all four pages is +0 position and +0 height** against Figma
geometry — Home 8/8, About 5/5, Services 4/4 (2069 / 2069 / 2316 exact), Contact 1/1. Measured with a
harness fed by node values read independently of anything the page agents reported, because a harness
fed by their own numbers can only confirm they were self-consistent.

⚠ **Two limits on that result, so the zeros are not read as stronger than they are:**
1. **Section-level `+0` does not prove internal fidelity.** `.fx-frame` declares an explicit height,
   so content can sit at the wrong rhythm inside a correctly-sized box and pass every assertion.
2. The harness cannot see the footer — it sits outside `<main>`, which is why per-page main heights
   read 359px short. That is the footer's height, not a defect.

**A first Figma pass exists and was deliberately discarded.** It is commit `4f39e96` on
`redesign/figma-2026-08`, with a later pixel-exact attempt in `git stash` (`stash@{0}`). Both are
intact; nothing was destroyed. It was rejected as an *interpretation* of the design — measurements
landed within a few pixels in places (rail 409 vs 413, contact card 540 vs 539) but headings wrapped
differently and section heights ran long. **Gerald wants a 1:1 copy, not a faithful reading.**

**The governing decision:** the Figma is one 1440px frame per page with **no smaller designs**, so
1:1 is only defined at 1440. Reproduce Figma coordinates exactly at 1440 and up; author the
responsive layout below it. Below 1440 is ours, and every such decision must be reported as authored
rather than presented as copied.

Plan of record, and the full correction log from the discarded pass — still accurate about the
*design* even though the code is gone: `tasks/2026-08-17-figma-four-page-redesign-implementation.md`
(gitignored). Read it before starting; it records four wrong turns already taken, including the
Proof section that is not a slider and the client-material image that must never be exported.

**Two things were deliberately NOT reverted, because they are safety, not design:**
1. `.gitignore` covers `.scratch/`, which holds the quarantined client-material image. Without it,
   `git add .` stages client source code into a public repo.
2. This file and `CLAUDE.md`, which are absent from `10df2b1` and would have been deleted. They
   carry the excluded-node table, the CSP rule, and the letterform check for font verification.

### Still open — needs Gerald, not an agent
1. **The dated sentence in `about.ts` → `story.body[23]`.** Gerald has flagged it as needing
   rewording: it conflates two things that began at different times, and the date it implies is not
   the one he means. The replacement must be **his** words — rule 6, do not author copy — and must go
   into the Figma as well, or the next export reintroduces the old wording. Detail is in
   `tasks/2026-08-17-figma-four-page-redesign-implementation.md`, which is gitignored.
2. **The Education italic.** Four institution names render a synthesised oblique, visibly wider and
   over-slanted at 24px. Full Roboto Condensed Italic is 56,956 B; a subset of the 33 glyphs used is
   10,032 B. Recommendation is subset-or-drop, leaning drop.
3. **Blank #1 still blocks publication** — the automation case study has no outcome number. The Figma
   supplies none either.

### Carried over from the discarded pass — true of the design, not of this code
- **`/work/<slug>` collides** the "← All work" link and the eyebrow on one line. **Pre-existing and
  still present**, unrelated to any Figma work — proved by toggling `--shell` at runtime, identical
  adjacency at both widths. Cause is `.eyebrow` being `display: inline-block`; the fix is `block` on
  that one `<p>` in the page, not on the shared class.
- **The Figma's content measure is 1340px** (x=50→1390 in a 1440 frame). `--shell` is currently
  76rem, giving 1136px — 204px narrower. Note this is a *measure* vs a *box*: `.shell` subtracts two
  gutters from `max-width`, so matching 1340px of measure needs an 88.75rem box, not 83.75rem.
  Getting that wrong cost a full round of rework last time.
- **A wider container alone makes some layouts worse.** The About hero's copy column absorbed the
  whole increase and its H1 went from 4 lines to 3, losing the design's line breaks. Grids sized
  against the old width have to be re-proportioned in the same change, not after it.
- **Whatever sets the content width must also apply to `Nav` and `Footer`.** Changing the pages
  alone puts the chrome 102px inboard of the content on every route, and no page-level check catches
  it — it only shows against the shared components.

### Earlier work, still true
- Migrated the site from a Vue 3 SPA to static Astro 7 and rebuilt the design system, information
  architecture and copy. Committed as `10df2b1` on branch `redesign/astro-service-site`.
- Separate de-risking commit `c33e8c6` on `master` removes employment-facing framing and fixes the
  blocked analytics beacon, footer contrast, missing `<main>` landmark, and two dead deploy configs.
  It introduces no new positioning copy.
- New routes: `/services`, `/work`, `/work/<slug>`, `/thank-you`, real 404. `/works` 301s to `/work`.
- Contact form rebuilt with `fetch` submission, inline success and error states, and a working no-JS
  fallback. ⚠ It had **seven** qualification fields; 2026-08-17 cut it to **five** per the Figma.
  The removed two were `service` ("What do you need?") and `budget` ("Budget range").
- Assets self-hosted and optimised; fonts self-hosted, which let the CSP drop both Google hosts.
  ⚠ The families changed 2026-08-17 — see the typeface rules above.

### In progress
- ⚠ **Superseded 2026-08-17.** `redesign/figma-2026-08` has uncommitted work; see the top of this
  handoff. `master` and `redesign/astro-service-site` are still clean.

### Blockers and risks
- ⚠ **Superseded 2026-08-17: one blank blocks publication, not three.** #2 (retainer monthly volume)
  and #3 (3D price) were filled from the Figma. **#1, the automation case-study outcome number, is
  still unfilled and still blocking** — the Figma supplies no figure for it either. See
  `tasks/PRE-LAUNCH-CHECKLIST.md` (local, gitignored).
- The single case study has no body narrative. The copy document supplies a teaser only; writing
  more would mean inventing detail about a client engagement.
- Nothing has been deployed. `master` still serves the old Vue site in production.

### Next actions
1. Deploy `master` (`c33e8c6`) — it only removes exposure and fixes findings, and adds no positioning.
2. Fill the three blocking blanks in `src/content/blanks.js`.
3. Merge `redesign/astro-service-site` into `master` and deploy.
4. Confirm on the deployed site: `/works` 301, real 404 status, `robots.txt` and `sitemap-index.xml`
   served as their own files, and all security headers present.
5. Submit the contact form once for real and confirm delivery.
6. Re-run Lighthouse against production and record the numbers.

### Verification pending
- `/works` → `/work` redirect and live header delivery — `vercel.json` behaviour, not exercisable by
  `astro preview`.
- Lighthouse was not re-run; the audit's mobile baseline was Accessibility 92, Best Practices 73,
  SEO 83, and a fair comparison needs the deployed site.
- Contact form was driven end to end with a stubbed `fetch`; no message has actually been sent.
<!-- SESSION-HANDOFF:END -->
