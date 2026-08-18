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
  components/        .astro components (Icon, Nav, Footer, ServiceCard, Newsletter, CtaBlock, ContactForm)
  content/           all page copy, as typed modules
    blanks.js        values deliberately left empty — read the rule below
    site.ts          nav, footer, meta, CTA labels, availability line
    home.ts services.ts about.ts contact.ts
    insights/        schema only; no route, no entries yet
  layouts/BaseLayout.astro   meta, canonical, Open Graph, skip link, <main>
  pages/             one file per route
  scripts/           bundled enhancement scripts (nav, reveal, contact-form)
  styles/global.css  design tokens and component classes — authoritative
src/content.config.ts   collection definitions
public/            robots.txt, media/, logo
vercel.json        security headers, cache policy, /works -> /services 301
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
directory level — it misses `dist/404.html` and `dist/about/index.html` and reports a
false zero.

### 2. Do not add a UI framework island

Astro injects an *inline* hydration runtime for every `client:*` directive, which rule 1 blocks. A
Vue island was built and removed for this reason. Interactivity is static markup plus a bundled
script in `src/scripts/`.

⚠ **The rule is about ISLANDS, not about libraries — and the distinction now matters.**
`motion` (formerly Framer Motion) was added 2026-08-18 for the pinned About story. That is allowed
because it uses Motion's **vanilla** entry (`scroll`), which is a plain ES module bundled like any
other script. **`motion/react` is NOT allowed** — it needs a `client:*` island and dies to rule 1 in
production while working perfectly in `npm run dev`. If a request names Framer Motion, reach for the
vanilla API; do not add React.

⚠ **The "~3 KB total" figure is no longer true, and the budget is now per page.** Measured on the
built output, gzipped: **Home 924 B · Services 924 B · Contact 1.8 KB · About 7.4 KB.** About carries
Motion; the other three are untouched, which is why the story's script lives in `AboutStory.astro`
rather than `BaseLayout`. Keep it that way — moving that import to the layout puts 6.4 KB on every
route. `motion/mini` cannot help: it exports `animate` and `animateSequence` only, no `scroll`.

### 3. Never invent a figure

`src/content/blanks.js` holds values that are `null` **on purpose** — case-study outcomes, two
prices, testimonials, a share image. They are unfilled because nobody has supplied a real number.

- Do not fill them with estimates, plausible ranges, rounded guesses, or "contact for pricing".
- Where a value is null, the element that would display it is **omitted entirely**. Never render an
  orphan `Result:` label or a `from $—` placeholder.
- `npm run build` prints every blank still open, and flags the ones that block publication.

⚠ **One deliberate exception, and it carries its own pre-deploy gate.** Gerald asked on
2026-08-18 for the newsletter block to be finished as UI ahead of its backend, so it now renders
on all six pages while `NEWSLETTER_ENDPOINT` is still null. The omit-rather-than-fake principle
is not waived, it is enforced in the markup: with no endpoint the block is a `<div>`, not a
`<form>`, and its button is `type="button" disabled`, so **nothing can be collected or
dropped**. What it cannot prevent is a visitor reading a dead button as a broken site, so:

```bash
grep -rl 'data-newsletter="ui-only"' dist   # must print NOTHING before deploying
```

Clear it by setting `NEWSLETTER_ENDPOINT` (with the consent line and privacy link `site.ts`
requires) or by setting `NEWSLETTER_VISIBLE` to false. Do not clear it by deleting the
attribute — that is the only machine-readable trace of the state.

### 4. Do not name clients

Work is described as "a US creative agency". Do not add a client name, logo, screenshot, dashboard
image, or any code from a client engagement to this repository.

### The four Education nodes — exclusion LIFTED 2026-08-18 by Gerald

`33:214`, `33:215`, `33:216` and `33:217` were listed here from 2026-08-17 as permanently excluded —
two third-party trademarks and two third-party photographs, in the Education & Training collage
(mask group `33:220`). **They ship as of 2026-08-18.**

| Node | What it is | Shipped as |
|---|---|---|
| `33:216` | Mapúa University campus photograph | `about-education-mapua.jpg` |
| `33:215` | CIIT College of Arts and Technology campus photograph | `about-education-ciit.webp` |
| `33:214` | Zuitt Coding Bootcamp logo | `about-education-zuitt.png` |
| `33:217` | Filipino Institute logo | `about-education-filipino-institute.jpg` |

**Gerald supplied the four files himself and asked twice for the section to carry them**, the second
time after being shown in writing that they are the excluded nodes and that shipping them needs a
rights decision he alone can make. He instructed implementation. **That decision is his and is
recorded here so the next agent does not delete the images as a rule violation** — the rule is what
changed. The basis is presumably nominative use: each mark sits beside a truthful statement that he
studied there. **This is not legal advice and nobody in this repository has given any.** If that
basis is ever challenged, the revert is in `AboutEducation.astro`'s header comment.

What did NOT change:

- **The rule in §4's first paragraph still stands** for client names, logos, dashboards, screenshots
  and engagement code. This lifts four specific nodes, not the section.
- **Do not add a fifth institution visual, or any other third-party mark, on the strength of this.**
  It is a decision about four files, made once, on the record.
- The files were renamed on the way in. Their original names — two of them browser defaults and one
  a storage hash — matched the Figma layer names exactly, which is how they were identified.

⚠ **Removing the collage again is not a one-line revert.** `AboutEducation.astro` used to centre its
671px text block on the frame (x=384.5) *because* the left half was empty; that block is now back at
its Figma x=705. Drop the images without restoring the centring and the section ships with a 705px
hole down its left side.

#### `30:2` — was the fifth; now a resolution ceiling, not an exclusion

**Corrected 2026-08-18 by Gerald.** This node was listed here from 2026-08-17 as
"client-engagement material — a screen capture from a client engagement". **It is not a capture of
anything.** Gerald generated the artwork himself, so there is no client asset, no third-party
right, and nobody to obtain approval from. The 2026-08-17 entry was inferred from what the picture
*looks like*, and the picture looks like a screenshot because it was made to. **The exclusion is
lifted and case study one now ships with it.**

What survives is narrower and still binding. The right-hand half of the artwork renders source
code, and §4's first paragraph bars *code from a client engagement* independently of who owns the
image. So:

> **Only a copy downscaled until that code is illegible may enter this repository.** The shipped
> asset is `src/assets/img/home-proof-automation-split.jpg` — resampled to 276 × 140 and back up to
> 790 × 400, which destroys the glyphs irreversibly, then JPEG q82 (162 KB → 23 KB). Do not
> re-export this node at full resolution, and do not "improve" the asset by replacing it with a
> sharper one. It is soft on purpose and the softness is the control.

⚠ **A new render is a new source, not an exemption.** On 2026-08-18 Gerald supplied a second version
of the same composition and asked for the image to be swapped. The swap was done *through* the
ceiling: the v2 file went to `.scratch/quarantine/home-proof-automation-split-v2.png` and the shipped
JPEG was regenerated from it by the same 276 × 140 round trip. Shipping a supplied file at its native
790 × 400 would have been the "sharper replacement" this rule forbids — measured before the
downscale, identifiers such as `body.request_id` and `brand_folder_id` were still recoverable from
the v2 render at 4× zoom. If a future instruction is meant to lift the ceiling rather than change the
picture, it has to say so; "replace the image" does not.

The full-resolution originals stay quarantined at `.scratch/quarantine/`, which `.gitignore` covers
**for this reason** — that entry is a safety control, not tidiness. The content-hash gate in
*Definition of done* still compares against it and still blocks the full-res file; the shipped
downscale hashes differently and passes. Keep both facts true if you ever regenerate the asset.

⚠ Before 2026-08-18 this node was re-downloaded **three** times despite being flagged, because it is
the obvious visual for the Proof section. That reflex is now correct in its instinct and still wrong
in its method: fetch the node and you get the full-res original, which is the one thing that must
not be committed. Full reasoning, deliberately not repeated here, is in
`tasks/2026-08-17-figma-four-page-redesign-implementation.md` (gitignored).

If any *other* asset is missing from `src/assets/img/`, treat that as deliberate and check the table
above before fetching it.

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
- ⚠ **Section heights are no longer Figma values. Changed 2026-08-18 on Gerald's instruction:**
  every section fills the viewport and the page scroll-snaps one section per screen. The Figma
  **proportions** survive exactly; the Figma **absolute heights** do not. Read this before treating
  any section height in this repository as a copied number again.

  The mechanism is in `global.css` under "Viewport-height sections": at ≥90rem a section is scaled by
  `--fx-s: clamp(0.7, 100svh / var(--fx-h), 1.4)` so the fixed design canvas fits the viewport
  exactly; below 90rem it is `min-height: 100svh` and the content flows.

  ⚠ **It is a transform, not a re-layout, and that is forced rather than chosen.** At ≥90rem the
  children are `position: absolute` at Figma coordinates, so changing a section's height moves the
  BOX and not its CONTENTS — content spills into the next section, or is clipped silently where
  `overflow: hidden` is set. Scaling the canvas is the only change that hits 100svh while leaving
  every child where it was designed to sit.

  ⚠ **Three declarations are one mechanism** — `width`, `margin-inline`, `margin-block-end`. Delete
  any one and the other two break: without the width compensation every full-bleed background
  shrinks by (1−s) and leaves a bar of page colour down both edges of every section; without the
  end margin the section still occupies its unscaled height in flow.

- ⚠ **Each Services detail is ONE 100svh row with TWO balanced columns. Reworked 2026-08-18.**
  `/services` is **4 sections**: the intro plus one row per service. The title spans the text area,
  and the four blocks plus the CTA flow into two columns beside the rail — first part left, second
  right.

  ⚠ **This is the THIRD layout for these sections in one day.** Original: one 2069/2069/2316px frame
  each. Then: two stacked 100svh screens each (7 sections). Now: one row, two columns (4 sections).
  Do not resurrect the middle one; it exists only in git history.

  ⚠ **The Figma's per-node y coordinates are GONE from `services.astro`, deliberately.** Balanced
  columns cannot be expressed as pinned y values — where a block lands depends on how the one above
  it wrapped — so the blocks are in normal flow and the dead coordinates were deleted rather than
  left looking authoritative. Recoverable from git history. The rail's x/width survives and still
  drives which edge the gradient sits on.

  Four things that will bite:
  1. **`column-count`, not a hardcoded split index.** The blocks are very uneven (service 2 measures
     149 / 401 / 513 / 541px at 422px wide), so the balanced split differs per service — 2/3, 3/2,
     2/3 as it happens. The browser finds those; a constant would need re-tuning on every copy edit.
  2. **`break-inside: avoid` on the block and the CTA.** Without it a block is torn across the gap,
     heading at the foot of the left column and body at the head of the right.
  3. **`min-height: 0` on `.svc-detail__columns`.** It is a flex item, so it defaults to
     `min-height: auto` and refuses to shrink below its content — the box would grow past the row and
     `overflow: hidden` would eat the overspill silently.
  4. **`ROW_H` is MEASURED, not derived, and can go stale silently.** See the long warning in
     `services.astro`. After any `SERVICE_DETAILS` copy change, re-measure: every
     `.svc-detail__columns` child must stay inside its parent's box. Currently 1490px, which leaves
     the tightest service 37px of headroom; at the measured-exact 1463 it had **7px**.

  Trade-off to know: the rail keeps its full 413px, so the columns are ~422px each and the row scales
  to **0.681** — body copy renders at **16.3px** against 18.7px elsewhere on the site. Narrowing the
  rail is the one lever that buys it back, and it is a single number in `services.astro`.

- ⚠ **`AboutStory` is a scroll-pinned panel. Added 2026-08-18.** The section becomes a track of 3–5
  viewports with a sticky full-screen panel; the heading holds while the story column is drawn
  upward through a masked stage, so lines fade in at the top edge and out at the bottom.
  `src/scripts/story-pin.ts` drives it with Motion's vanilla `scroll()`.

  Four things that will bite:
  1. **`position: sticky` dies inside a transformed ancestor,** and the viewport fit transforms every
     other section. This one works *only* because it keeps `fx-tall`. Remove that class and the pin
     stops sticking silently — no error, it just stops.
  2. **The snap markers must stay `:global()`.** Astro scopes component CSS by a `data-astro-cid-*`
     attribute it can only add to template elements; the beats are created at runtime, so a scoped
     rule matches none of them. Measured when it was scoped: the track held no snap position at all,
     and `scroll-snap-type: y mandatory` threw the reader from the story's start straight to the next
     section — the whole section skipped, with nothing in the console.
  3. **`MIN_SCREENS` is 3 for a reason.** The bare formula returns 2 at desktop size, which drags the
     column at ~1:1 with scroll — indistinguishable from no pin. Three gives ~0.46×.
  4. **The column's `padding-block` and the mask's `--story-fade` are ONE mechanism.** The script sets
     both from the stage's measured height. Without the padding the column starts flush with the
     stage's top edge, where the mask is still transparent, so the FIRST line is half dissolved at
     progress 0 and the LAST line is at progress 1 — reported from the live page, not theoretical.
     The padding must be applied before `scrollHeight` is read, because it is part of the travel.
     ⚠ It cannot be done in CSS: a percentage padding resolves against the stage's WIDTH, not its
     height. Verified after the fix — first line 6px clear of the opaque threshold at progress 0,
     last line 6px clear at progress 1.
  4. **Everything is behind `[data-pinned]`, which only the script sets.** With no JS or with reduced
     motion the section is an ordinary 1985px column with all 31 lines readable. Verified by removing
     the attribute at runtime: height returns to exactly 1985, 0 paragraphs clipped, mask gone. Never
     promote the pinned geometry into the default CSS.

- ⚠ **About's "What I Do" cards take the homepage's card WIDTHS but hug their own content.
  Changed 2026-08-18** on request, in two steps — the second step is the one that stands.
  **Widths** are the homepage's exactly: 415 / 416 / 457 at x=54 / 491 / 928, replacing the Figma's
  three 282×348 cards in a 942px group. `HomeServices.astro`'s `.card` rules are the source; copy any
  change there to here. The unequal widths are the homepage's own and are not a mistake to even up.

  ⚠ **There is deliberately NO `height`.** Matching the homepage's 611px was tried first and rejected
  on sight: the homepage card carries a lede, body copy, a price, a timeline and a CTA, while these
  hold three short lists, so a matched height left every card roughly two-thirds empty. They now
  measure **305px**, set by the tallest of the three.

  `align-items` stays at its `stretch` default so all three equalise and their bottom edges hold one
  line. Do not "fix" that to `align-self: start` — each card would then find its own height and the
  row would end ragged.

  ⚠ **`AboutStory` (1985) is now the ONLY `fx-tall` section** — not viewport-fitted, taller than one
  screen, snapping to its own top edge. Fitting it would scale it to 0.51 and take its smallest text
  from 24px to **12.3px**. That is a weaker case than the Services one was and it was not part of the
  request; splitting it the same way is the obvious follow-up if the inconsistency shows.

  ⚠ **Corrected 2026-08-18, verified by measurement:** the Services body node is **24px**, not 18px.
  An earlier revision of this file justified `fx-tall` with "18px body copy at 8–9px". The real
  unsplit figures are **11.8px** (2069 frames) and **10.5px** (2316), against **18.7px** as they now
  ship. The decision stands; the retracted numbers must not be reused to set a threshold.
- **`svh`, never `vh`, for section heights.** `100vh` is the LARGE viewport on mobile, so a section
  sized with it hides its last line behind the address bar until the user scrolls.
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
  surfaces and one text colour, and those token names are still referenced by `/thank-you` and
  `/404`, which are out of scope for the rebuild. (`/work` and `/work/<slug>` were the other two
  consumers until 2026-08-18; both routes are gone.)
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
- ⚠ **No excluded asset staged — check by CONTENT HASH, before every commit:**
  ```bash
  git diff --cached --name-only --diff-filter=AM | grep -iE '\.(png|jpe?g|webp|svg|gif)$' \
    | while read -r f; do
        h=$(md5sum "$f" | cut -d' ' -f1)
        grep -q "$h" <<< "$(md5sum .scratch/quarantine/* 2>/dev/null)" \
          && echo "BLOCKED: $f matches a quarantined asset"
      done   # must print nothing
  ```
  **This has happened.** Node `30:2` was re-exported a **third** time, staged by `git add -A`, and
  committed — caught only by noticing its Figma layer name in the staged file list. It was removed by
  amend before any push. **Grepping staged content for client identifiers cannot catch this**: the
  payload is a binary image, so a text scan is structurally blind to it, and a renamed file defeats a
  filename check. Only the content hash is reliable. The quarantined copy in `.scratch/quarantine/`
  exists to be the reference for exactly this comparison.

  ⚠ **Since 2026-08-18 this gate guards a resolution, not an absence.** `30:2` ships — see §4 — but
  only as the downscaled `home-proof-automation-split.jpg`, which hashes differently from the
  quarantined full-res originals and therefore passes. A `BLOCKED:` line for that node now means
  someone re-exported it from Figma at full resolution, or swapped in a supplied render without
  downscaling it — exactly the mistakes the ceiling exists to stop. Do not resolve it by emptying
  `.scratch/quarantine/`; downscale instead, and quarantine every version so the gate keeps covering
  the ones it already knew about.

  ⚠ **The filter is `AM`, not `A`, and that matters now.** Once the shipped JPEG is tracked, a
  full-res replacement arrives as a *modification* to a path git already knows — which
  `--diff-filter=A` skips silently. Changed 2026-08-18, when the artwork was revised in place for
  the first time. Do not narrow it back.
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

**Last updated:** 2026-08-18

### Current: the four pages rebuilt 1:1 from Figma — built and verified, NOT COMMITTED

On branch **`redesign/figma-1to1`**, cut from `10df2b1`.

⚠ **The entire rebuild is uncommitted — 18 modified files and 28 new ones exist ONLY in the working
tree.** HEAD is still `10df2b1` and the sole stash holds the *previous* pass, so nothing here is in
any commit or stash. A `git clean -fd`, `git checkout -- .` or `git reset --hard` destroys it with no
recovery path. **Run no destructive git command on this branch.** This is not hypothetical: an agent
misread `git status` — reading "differs from HEAD" as "left over from the old pass" — and recommended
deleting three untracked components that were in fact the new work. It retracted before anyone acted.
`git status` tells you what differs from HEAD; it cannot tell you who wrote it.

**Gate as of 2026-08-18 BEFORE the `/work` removal — its page and asset counts are stale; the
current ones are in the third pass below. Run against the BUILT output, not the dev server:**
`npm run check` 0/0/0 · `npm run build` 8 pages · 0 inline `<script>` in `dist/` · 0 `[object Object]`
· no third-party asset host · 0 excluded assets in the build · 24 webp, no avif ·
**32/32 zero overflow** across 4 pages × 320/390/768/1024/1280/1440/1600/1920 with scrollbars shown.

⚠ **Re-run scope, 2026-08-18 (Proof case one gained its image).** Everything on the line above was
re-run except the 32/32 overflow matrix, which was **not**. What replaced it for this change: the
homepage alone at 320/375/1439/1440/1920 — zero page overflow at each, and case one's three overlay
nodes stay inside the figure box at each. At ≥90rem the figure measures **50, 224, 789.3 × 400
against the canvas — +0 on all four**, and the section is still 1173 tall. The webp count moved 22 →
24 because the new asset emits two widths. **If you touch layout, run the real matrix; do not read
the 32/32 above as covering this change.**

⚠ **SUPERSEDED 2026-08-18 — the height half of this no longer holds.** Gerald asked for every section
to be 100vh with scroll snap, was shown that it collides with the 1:1 height contract, and confirmed.
Sections are now viewport-fitted; see the section-height convention above. **What survives is the
proportions** — the canvas is uniformly scaled, so every child keeps its designed position *within*
its section, and the x-geometry is untouched. **What is gone is the absolute height claim below.**
Kept for the record, and because it is still the reference for anyone restoring 1:1:

> **Fidelity at ≥1440: every section on all four pages is +0 position and +0 height** against Figma
> geometry — Home 8/8, About 5/5, Services 4/4 (2069 / 2069 / 2316 exact), Contact 1/1. Measured with a
> harness fed by node values read independently of anything the page agents reported, because a harness
> fed by their own numbers can only confirm they were self-consistent.

**Verified after both changes (viewport fit, then the Services split), against the BUILD on the
preview server — not the dev server, and the preview was confirmed to be serving the new CSS first,
because a stale one was already running:**

`npm run check` 0/0/0 · `npm run build` 8 pages · 0 inline `<script>` · 0 `[object Object]` · 24 webp,
0 avif · **96/96 zero horizontal overflow** across 4 pages × 8 widths
(320/390/768/1024/1280/1440/1600/1920) × **3 heights (700/900/1200)** with scrollbars shown ·
**0/96 cells with any Services column child outside its box** — that last one is the gate that
matters, because `.svc-detail` sets `overflow: hidden` and would eat a dropped bullet silently. The
story pinned in 24/24 About cells. At 1920×1015 all four Services rows measure exactly 1015px with
37 / 58 / 93px of column headroom.

⚠⚠ **THE HEIGHT AXIS IS NOT OPTIONAL, AND OMITTING IT ALREADY HID A REAL BUG.** The first two passes
here ran every width at a single height of 900, where `--fx-s` is always < 1, and reported a clean
32/32 twice. Re-run with the height axis added, the SAME build produced **18 overflowing elements at
1440×1200 and 31 at 1440×1400** — caused by the viewport fit scaling up until the section's layout
box fell under the 1440px design canvas. Fixed by the `100vw / 90rem` cap in `global.css`; see the
warning on that rule. A single-height matrix is not a matrix.

At 1920×1015: all 8 Home sections exactly 1015px with **0px seams** and full-bleed backgrounds
spanning the full 1905px client width; all **7** Services sections exactly 1015px. Content survives
the split intact — **3 titles, 12 blocks, 3 CTAs**, and all three footer anchors
(`#creative-automation-systems`, `#managed-ad-creative`, `#3d-product-visuals`) still resolve, on the
first screen of each service. Minimum top slack on any Services screen is **24.9px** (it was 0 before
`SCREEN_PAD`). Rendered type at the 0.779 fit: body **18.7px**, block heading 28px, title 56.5px.

Snap: nudging 130px past each of the 7 Services boundaries lands flush on all 7, and 120px past each
of the 8 Home boundaries lands flush on all 8. The footer lands flush at the document bottom via
`scroll-snap-align: end`. Mandatory snap does not trap the one remaining `fx-tall` section.

⚠ **Not verified:** no real touch device, and no browser other than the Chromium the harness drives.
`calc()` length ÷ length is the one modern feature this leans on — confirmed working in that
Chromium, **unconfirmed in Safari and Firefox**. If the fit silently stops working in another
browser, that division is the first thing to check.

**The failure mode is benign, and that was tested rather than assumed.** Forcing `--fx-s` invalid
makes every declaration that references it compute to `unset` — `transform: none`, `width: auto`,
`margin-block-end: 0` — so the section falls back to `height: var(--fx-h)`: measured 1024px tall at
the full 1905px client width, full-bleed intact. **A browser that cannot do the division gets the
previous 1:1 layout, not a broken page.** So this needs no `@supports` guard.

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
1. `.gitignore` covers `.scratch/`, which holds the quarantined full-resolution `30:2` export.
   Without it, `git add .` stages legible engagement source code into a public repo. (The image
   itself is cleared as of 2026-08-18 and ships downscaled; the full-res file is not — see §4.)
2. This file and `CLAUDE.md`, which are absent from `10df2b1` and would have been deleted. They
   carry the excluded-node table, the CSP rule, and the letterform check for font verification.

### 2026-08-18 — Gerald's review corrections

Nine of eleven findings implemented; see `tasks/2026-08-18-post-rebuild-design-corrections.md`
(gitignored) for the brief and the measurements. **Five deliberate deviations from the Figma were
introduced and each is labelled `AUTHORED 2026-08-18` at the line that changed** — Proof arrow
(30:17) centred at 50% instead of 66.1%, Proof eyebrow (22:72) raised from 13.792px to 18px to match
22:30, Services rails narrowed 413 → 360 with the right-hand rail re-anchored to x=1030, Services
block rhythm re-cut, and the shared footer given an `ink` surface on Services and Contact where
33:700 / 33:760 are #242424. Do not "restore fidelity" on any of them.

One structural fix worth knowing about: **`HomeHero` and `HomeAboutStrip` were scaling their
artwork with the viewport while the copy stayed pinned to the 1440 canvas** — measured 1.32× at
1920px. Both layers are now capped to `--fx-frame`. It was invisible at exactly 1440, which is why
a 1:1 rebuild never caught it; check any new full-bleed image layer for the same thing.

The newsletter (33:750) now lives in `Newsletter.astro` and is rendered by both `Footer` and
`HomeClosing` (into the 24:230 panel). **It still renders nowhere, because `NEWSLETTER_ENDPOINT` is
still null** — that is item 0 below.

**Second pass, same day** (`tasks/2026-08-18-hero-background-newsletter-and-education-images.md`):

- **The homepage has no footer at all now.** The endpoint gate described above was removed — Gerald
  asked for the tagline block gone a second time with the endpoint still unset, so `index.astro`
  passes a flat `footer={false}` and the page ends on the empty 24:230 panel. `/` therefore carries
  no link columns and **no copyright line**; nothing else renders them. Setting the endpoint fills
  the panel but does not bring those back.
- **The hero frame fill is `--color-void` (#000000), not `--color-ink`.** New token, and it exists
  for one element. `.hero__bg::before` continues the artwork's right-hand wash past 1440 with a
  five-stop gradient sampled from the raster itself — the two edges are not the same colour (left
  is pure black at every height, right ramps to `rgb(1,56,86)`). **Re-measure both if the hero
  artwork is ever re-exported**; nothing in the build checks those stops against the file.
- **The Education collage ships** — see §4, which now records the lifted exclusion.
- **The hero is now two layers, and its background is not an image.** Gerald supplied a transparent
  full-body cut-out (`home-hero-portrait.png`) and asked for the flattened raster to be replaced by
  it plus a CSS gradient. Done: `.hero` carries a `radial-gradient` reconstructed by sampling the
  old export on a 6 × 5 grid, and `.hero__portrait` holds the cut-out, bottom-anchored inside the
  1440 canvas. This supersedes both the `--color-void` seam fix and the `::before` flank described
  above — those were the best available while the hero was one raster, and neither survives.
  `home-hero-bg.jpg` is unused but **kept on disk**: it is the only reference for the gradient
  stops. Details in `MANIFEST.md` under Homepage.

**Third pass, same day — `/work` removed everywhere.**

Gerald reversed a decision `site.ts` had recorded as fixed and asked for **Work gone from the whole
site**. Deleted: `src/pages/work/index.astro`, `src/pages/work/[slug].astro`, the `work` content
collection and its schema, its single entry `no-code-pipeline-migration.md`, `CaseTeaser.astro`, and
four images that only those pages used (`product-hairdryer.jpg`, `product-mouse.jpg`,
`product-animation-poster.jpg`, `profile-photo.jpg`). The nav was already four items, so nothing
moved there. `404.astro`’s Work link became About.

⚠ **The `/works` redirect was deleted in that pass and has been RESTORED pointing at `/services`**
(2026-08-18, after the pass). `/works` is a **live production URL on the Vue site `master` still
serves** — it is in `master:src/router/index.js` — so deleting the rule outright would have 404’d a
real, possibly-indexed page on the next deploy. `/services` is the authored choice of destination;
the portfolio content it replaces no longer exists anywhere. **`/work` itself is deliberately left
to 404** — that route only ever existed in this unreleased branch.

Nothing was written to replace the removed pages. The homepage’s “What this looks like in real
life” section is unaffected: its two narratives are hand-written in `home.ts` as `PROOF.cases` and
never read the collection. **Do not wire that section to a collection to “restore” this one.**

**Gate re-run after the removal and the redirect restore:** `npm run check` 0 errors / 0 warnings /
0 hints · `npm run build` **6 pages** (was 8) · **0** inline `<script>` in `dist/` · 0
`[object Object]` · **36 webp, 0 avif** (the count rose from 24 with the Education collage and hero
portrait, not with this change) · **0** `href="/work…"` anywhere in `dist/` · `vercel.json` parses.
⚠ **The overflow matrix was NOT re-run** — this pass deleted routes and touched no layout, but that
is reasoning, not measurement. Say so rather than inheriting the 96/96 above.

Three blanks were annotated rather than deleted — `automationCaseResult` (downgraded to
`blocksPublication: false`, **not filled**), `secondCaseStudy` and `testimonialAutomation` (both
marked orphaned). The gap each one names is still real; only the page that would have shown it is
gone.

**Fourth pass, same day — the newsletter shipped as UI, and centred.**

Gerald: “complete the Subscribe to my newsletter feature as a UI for now — do not add any backend
coding to it just yet”, then “properly center vertically … aligned to the left side content”.

`NEWSLETTER_VISIBLE` (new, `site.ts`) now decides whether the block is **drawn**;
`NEWSLETTER_ENDPOINT` still decides whether it can **post**. Splitting them is the whole design:

| | endpoint set | endpoint null, visible (today) |
|---|---|---|
| element | `<form method="post">` | `<div data-newsletter="ui-only">` |
| control | `type="submit"` | `type="button" disabled` |
| can transmit an address | yes | **no — there is no form to submit** |

Verified in the build: **exactly one `<form>` in all six pages**, and it is the contact form on
`/contact`. The newsletter contributes none. So the old “never ship a Submit button that posts
nowhere” rule is satisfied more strictly than hiding the block was — what is gone is the
protection against a visitor reading a dead button as breakage, which is why §3 now carries a
`grep -rl 'data-newsletter="ui-only"' dist` pre-deploy gate. **It is currently expected to print
six files. That is the blocker, not a warning.**

⚠ **The disabled pill deliberately keeps its full accent fill** (`rgb(0,170,255)`), so the preview
shows the real design; only `cursor` changes, to `not-allowed`. Do not add a greyed `:disabled`
style “for clarity”.

**Two placement fixes, both AUTHORED 2026-08-18 and both departures from 33:750's y=40:**

1. **Vertical centre in the footer.** At the Figma y the block hugged the top edge with 239px of
   dead space beneath it. Now `top: 50%` + `translateY(-50%)`. The two readings of Gerald's
   instruction converge exactly — left content spans y=38→321 (centre **179.5**) and the frame is
   359 tall (centre **179.5**) — so centring in the frame *is* centring against the left column.
   Measured 120.4 slack above and below on About, Services and Contact at 1440/1600/1920/2560.
   Percentage-based rather than a computed top because the block's height is type-dependent.
2. **An 18.223px gap above it below 90rem.** In flow the block had a **0px** gap — the only zero in
   the footer stack — and collided with the last link-list item at every width 320→1439. It had
   never been seen because the block was hidden until now. 18.223 is the footer's own number, the
   gap the column block already owns below itself in the 359 budget. ⚠ It is reset to 0 inside the
   ≥90rem query: `margin-block-start` on an absolutely positioned box **adds to `top`** and would
   push it 18.2px below the centre.

**The homepage instance needed nothing** — measured centre-to-centre against `.closing__canvas` at
1440/1600/1920/2560: **delta 0.0 at every width.** Do not “fix” it to match the footer's rule; it is
centred by a different mechanism and is already correct.

**Gate:** `npm run check` 0/0/0 · `npm run build` 6 pages · 0 inline `<script>` · 0
`[object Object]` · 36 webp, 0 avif · 1 `<form>` in the whole build · **96/96 zero overflow** across
4 pages × 8 widths × 3 heights, with the newsletter's inertness re-asserted in every cell.

⚠ **The 96-cell harness had to be rebuilt** (`.scratch/matrix.mjs`): the playwright
`chrome-headless-shell-1228` every older `.scratch` script hardcodes **is no longer on this
machine**, so `verify.mjs`, `fidelity.mjs` and the rest will all fail with ENOENT until repointed.
The rebuild drives system Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`.

⚠ **And it over-reported on its first run** — 8 About cells flagged
`img.about-education__collage-img` as overflowing. It is not a defect: the collage deliberately
oversizes its children (`max-width: none`) inside a mask with `overflow: hidden`, so nothing is
painted outside. A bounding-box overflow test is blind to a clipping ancestor; the harness now
walks up for one before reporting. **Keep that check in any future matrix** or the collage will
produce eight phantom failures every time.

**Fifth pass, same day — the hero crop, and the Zuitt card.**

Two of Gerald's reports, both fixed by measuring the design rather than adjusting by eye.

**1. Homepage hero — “crop the png image of me and zoom it in just like the Figma.”**

The cut-out was rendering full-body and small (`object-fit: contain`, bottom-anchored); the design
is a waist-up crop bleeding off the bottom. `home-hero-bg.jpg` **is** the design's own 1440 × 1024
render of frame `1:2`, so it is the target, not a memory of one. Solving for the transform that
maps the 2160 × 3840 cut-out onto it gives **scale 0.66841, translate (252.9, −75.3)** — a
1443.8 × 2566.7 box in a 1024-tall frame. Three independent estimators agreed to **0.3%**.

Checked back against the design render afterwards, which is the part that matters:

| landmark | design | rendered | delta |
|---|---|---|---|
| forehead y | 158 | 158 | **0** |
| head width | 239 | 238 | −1 |
| head left / right | 853 / 1091 | 855 / 1092 | +2 / +1 |
| skin run (head+neck) | 465 | 466 | +1 |

⚠ **TOP-anchored now, and that is a change in kind.** The old rule pinned his feet to the section
bottom. A waist-up crop has no feet, so the head is the only landmark that can hold, and it is
fixed 100.5px below the frame top. Bottom-anchoring would slide his head with the viewport-fit
height. It relies on `.hero`'s `overflow: hidden`; remove that and 1542px of figure escapes.

⚠ **Two follow-ons the crop forced, both easy to lose:** `max-width: none` on `.hero__img` (the
global `img { max-width: 100% }` clamped it to 1425 and rendered a 1.3% under-scale that looks
nearly right), and `widths`/`sizes` **576/1152 → 720/1440/2160** — 576 was being upscaled 2.5× into
a 1443.8px box. Detail and re-run instructions: `MANIFEST.md` under Homepage.

**2. About — the Zuitt card overlapped CIIT and was taller than the Filipino Institute card.**

Both true, and **both were in the Figma's own node boxes** — `33:214` is 309 × 309 at y=715 while
CIIT `33:215` ends at y=739, so the design overlaps them by 24px, and `33:217` is 288 × 288 at
y=736. It is visible here because the logo ships on an opaque **white** field, so the overlap
paints a white notch across the photo. The two cards also overlapped each other by 4px.

Zuitt is now vertically identical to `33:217` — 288 × 288 at y=736, same top, same bottom, the same
3px tuck under CIIT that `33:217` always had and nobody objected to, and a 17px gap between the
cards instead of a 4px overlap. Kept square because the source is 447 × 447 and `cover` would crop
a non-square box. **This is the only child of the collage that is not its node box** — the Figma
value is recorded beside it in `MANIFEST.md` so the deviation is legible rather than lost.

**Gate after both:** `npm run check` 0/0/0 · `npm run build` 6 pages · 0 inline `<script>` · 0
`[object Object]` · 1 `<form>` · 36 webp, 0 avif · 0 excluded assets · **96/96 zero overflow**
re-run after each layout change.

⚠ **`npm run build` PASSED while `npm run check` FAILED** during this pass — an Astro `{/* */}`
comment between attributes compiles fine and throws ts(1005) in check. Both gates, every time; the
build alone would have shipped it. (And a literal `*/` inside such a comment terminates it early —
that one does break the build.)

⚠ **A blank screenshot of the About collage was a reveal-timing artifact, not a defect** — the
section is `fx-fit` with scroll-triggered reveals, so `captureBeyondViewport` shoots it before it
is revealed. Scroll down in steps, then capture the viewport. This is the third time that class of
artifact has cost time here; `.scratch/edu2.mjs` does it correctly.

**Sixth pass, same day — white service headlines, and the deep links wired up.**

**1. The three `/services` headlines are now white.** `33:295`, `33:345` and `33:396` are **#00aaff
in the design**; Gerald asked for white, so `.svc-detail__title` is `--color-fg` and carries an
`AUTHORED 2026-08-18` note. The accent still leads one level down — the block headings (`h3`,
`33:298` etc) stay #00aaff, so the section reads the same, the title just stops competing.

**2. “Learn more →” and the footer's three Services links now deep-link to their own section.**
All four surfaces pointed at bare `/services` before, landing every reader at the top of the page
to find the right one themselves — which was the entire job of the link.

⚠ **Both resolvers THROW rather than falling back**, and that is the point. A dead in-page anchor
fails **silently**: the page is served, the browser stays put, no 404, no console error, and no
build gate here would catch it. `HomeServices.astro` matches card title → `SERVICE_DETAILS.title`;
`site.ts` passes ids explicitly (its footer labels are the short forms — ‘Creative Automation’,
‘3D Product Visuals’ — so they cannot be title-matched) and checks them against the same array.
Edit an id or a title and the build fails with the known values listed. **Do not soften either to
`?? '/services'`.** Import direction is safe: `site.ts` imported nothing, `services.ts` pulls in
`blanks.js` only.

**3. ⚠ A REAL BUG found while testing this: every `/services` anchor landed 128px low below 90rem.**

Two independent offsets existed for the *same* 64px sticky header, and per spec a target's
`scroll-margin` and its scroll container's `scroll-padding` **sum**:

| where | value | purpose |
|---|---|---|
| `html` in `global.css` | `scroll-padding-top: 4rem` | the 64px bar — **and** where scroll-snap rests every section |
| `.svc-detail` in `ServiceDetail.astro` | `scroll-margin-top: 4rem` | the 64px bar |

Both carried a comment reading “4rem = that 64px exactly”; each author believed theirs was the
only one. Measured 128 at 390/768/1280 when the intent was 64. **The `.svc-detail` one was removed**
— the container rule is the one snap also reads, and it already zeroes itself at ≥90rem. Its
`scroll-margin-top: 0` reset in the 90rem block went with it. A comment at the site explains why
there is deliberately no offset there.

⚠ **This class of bug cannot be caught by reading either file.** Both are locally correct; only the
rendered scroll position shows it. When adding a scroll offset, grep for the other property.

**Verification — landing, not just resolving.** An anchor that resolves can still scroll wrong on a
scroll-snap page, so both were measured: **15/15** direct navigations and **18/18** click paths
(footer links clicked from `/services` itself, which is a same-page anchor and does no page load,
plus each homepage card) land with the section top at **0** at ≥90rem and **64** below it, flush
under the bar — across 390/768/1280/1440/1920. Each link's destination title was checked against
its own label. Harnesses: `.scratch/anchors.mjs`, `.scratch/anchor-click.mjs`.

**Gate:** `npm run check` 0/0/0 · `npm run build` 6 pages · 0 inline `<script>` · 0 `[object
Object]` · 1 `<form>` · 36 webp, 0 avif · **96/96 zero overflow** · the 20 remaining bare
`/services` links are all the generic ‘Services’ nav/Explore item, as they should be.

⚠ **`src/components/ServiceCard.astro` is DEAD CODE** — nothing imports it (the live homepage uses
`HomeServices.astro`). Amusingly it already linked to `/services#${service.slug}`, i.e. the pattern
this pass had to re-create. Left in place rather than deleted unasked; delete it or revive it, but
do not read it as the shipping card.

**Seventh pass — scroll snap removed site-wide; the collage overlap closed.**

**1. ⚠ `scroll-snap-type: y mandatory` IS GONE.** Gerald: “remove the snap scroll for the entire
website but keep the sticky scroll for the My Story section.” It had lived on `html` for one day.

⚠ **Do not put it back without asking.** Every section is still exactly `100svh`, so the site looks
like it is missing the other half of that design — it is not. Removed with it, because all of it
was scaffolding for that one declaration:

| what | where |
|---|---|
| `scroll-snap-align: start` | `.fx-frame`, `.fx-fit` in `global.css` |
| `scroll-snap-align: end` | `.fx-footer` |
| `scroll-snap-align: none` | `.about-story[data-pinned]` |
| the runtime beat markers | `story-pin.ts`, its container in `AboutStory.astro`, and their CSS |

The beats were **one 1px × 100svh marker per screen**, created at runtime purely so mandatory snap
had somewhere to rest inside the tall story track — without them the scroller flung the reader from
the section start to the next section and skipped the story end to end. No snap, no need.

⚠ **`scroll-padding-top: 4rem` STAYS and is not snap scaffolding.** It is now the only thing
keeping a deep-linked `/services` section from landing under the 64px sticky header below 90rem.
Re-verified after the removal: **15/15** anchor navigations and **18/18** click paths still land.

**The “My Story” pin was kept and is verified intact.** It never depended on snap — it is
`position: sticky` plus a `scroll()` callback writing one transform. Measured at 390/1440/1920:
`data-pinned` set, sticky panel top held at **0** through the whole track, column translateY
monotonic with **1097 / 1271 / 1167px** of travel, and **0** leftover beat elements.
Harness: `.scratch/story-pin-check.mjs`.

⚠ **That harness needs `behavior: 'instant'`.** `html` sets `scroll-behavior: smooth`, so
`window.scrollTo` ANIMATES; the first long jump was still in flight when the sample was taken and
read a panel that had not stuck yet — which looked exactly like a broken pin. It was the probe.
Any future scroll harness on this site has the same trap.

**2. The two logo cards no longer overlap the CIIT photo.** Gerald: “parts of the Zuitt and
Filipino Institute image are overlapping with the CIIT image.” Both now start at mask-local **736**,
exactly CIIT `33:215`'s bottom edge, instead of 733. `33:217` had carried that 3px tuck from the
design all along; it only became visible once both logos sat on a continuous white field. They keep
288 square and run 3px past the mask, where the clip takes white padding rather than artwork.

⚠ **The white band behind them deliberately did NOT move.** It stays at 71.792% (733), 3px above
the cards and tucked behind CIIT, which paints over it. Sitting it exactly on the edge would risk a
1px dark seam wherever the viewport-fit scale lands on a fraction. Verified with
`.scratch/band-edge.mjs`, which reads the gap column across the boundary: photo at 730/734, white
from 736 down.

**Gate:** `npm run check` 0/0/0 · `npm run build` 6 pages · 0 inline `<script>` · 0 `[object
Object]` · 1 `<form>` · **0 `scroll-snap-*` properties in `dist/`** · **96/96 zero overflow** ·
15/15 anchors · 18/18 click paths · pin intact at 3 widths.

### Still open — needs Gerald, not an agent
0. **`NEWSLETTER_ENDPOINT` in `site.ts`, plus a consent line and a privacy-policy link.** ⚠ Since
   2026-08-18 the block **does** render everywhere — as inert UI, see the fourth pass — so this is
   no longer “it is invisible”, it is **“it ships dead unless you close this”**. Still needed: a real
   Formspree URL (the CSP already allows it) and the consent copy `site.ts` records as a
   precondition. The consent line must be **Gerald's words**, rule 6.
0b. ~~**Education & Training left visual.**~~ **CLOSED 2026-08-18.** Gerald supplied the four files
   and instructed implementation after being shown they are the excluded nodes; the collage ships
   and §4 records the decision as his. Nothing further is needed from him unless the rights basis
   is challenged.
1. **The dated sentence in `about.ts` → `story.body[23]`.** Gerald has flagged it as needing
   rewording: it conflates two things that began at different times, and the date it implies is not
   the one he means. The replacement must be **his** words — rule 6, do not author copy — and must go
   into the Figma as well, or the next export reintroduces the old wording. Detail is in
   `tasks/2026-08-17-figma-four-page-redesign-implementation.md`, which is gitignored.
2. **The Education italic.** Four institution names render a synthesised oblique, visibly wider and
   over-slanted at 24px. Full Roboto Condensed Italic is 56,956 B; a subset of the 33 glyphs used is
   10,032 B. Recommendation is subset-or-drop, leaning drop.
3. ~~**Blank #1 still blocks publication.**~~ **NO LONGER BLOCKING as of 2026-08-18 — and it was
   not answered.** `/work` and `/work/<slug>` were its only consumers and both were deleted, so no
   page is waiting on the number. `blanks.js` now sets `blocksPublication: false` with that
   reasoning inline. **The number is still missing.** Restore `true` the moment any page shows a
   case-study outcome again.

### Carried over from the discarded pass — true of the design, not of this code
- ~~**`/work/<slug>` collides** the "← All work" link and the eyebrow on one line.~~ **MOOT
  2026-08-18 — the route is gone.** Kept only for the cause, which is still live: `.eyebrow` is
  `display: inline-block`, so any future page that puts an eyebrow beside an inline link gets the
  same adjacency. Fix it with `block` on that one `<p>`, never on the shared class.
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
- New routes: `/services`, `/thank-you`, real 404. ⚠ `/work` and `/work/<slug>` shipped here too and
  were **removed 2026-08-18** at Gerald’s instruction — see the third pass below. `/works` now 301s
  to `/services`.
- Contact form rebuilt with `fetch` submission, inline success and error states, and a working no-JS
  fallback. ⚠ It had **seven** qualification fields; 2026-08-17 cut it to **five** per the Figma.
  The removed two were `service` ("What do you need?") and `budget` ("Budget range").
- Assets self-hosted and optimised; fonts self-hosted, which let the CSP drop both Google hosts.
  ⚠ The families changed 2026-08-17 — see the typeface rules above.

### In progress
- ⚠ **Superseded 2026-08-17.** `redesign/figma-2026-08` has uncommitted work; see the top of this
  handoff. `master` and `redesign/astro-service-site` are still clean.

### Blockers and risks
- ⚠ **Superseded twice. No blank blocks publication as of 2026-08-18.** #2 and #3 were filled from
  the Figma on 2026-08-17; #1 stopped blocking on 2026-08-18 because its only consumers were
  deleted, **not because a number was supplied**. `tasks/PRE-LAUNCH-CHECKLIST.md` (local,
  gitignored) has not been re-checked against this and may still list three.
- ~~The single case study has no body narrative.~~ Moot with the route. The homepage’s two proof
  narratives are hand-written in `home.ts` as `PROOF.cases` and were never part of that collection.
- Nothing has been deployed. `master` still serves the old Vue site in production.

### Next actions
1. Deploy `master` (`c33e8c6`) — it only removes exposure and fixes findings, and adds no positioning.
2. ~~Fill the three blocking blanks.~~ None block now — see Blockers. Re-check
   `tasks/PRE-LAUNCH-CHECKLIST.md`, which predates both changes.
3. Merge `redesign/astro-service-site` into `master` and deploy.
4. Confirm on the deployed site: `/works` → `/services` 301, real 404 status, `robots.txt` and `sitemap-index.xml`
   served as their own files, and all security headers present.
5. Submit the contact form once for real and confirm delivery.
6. Re-run Lighthouse against production and record the numbers.

### Verification pending
- `/works` → `/services` redirect and live header delivery — `vercel.json` behaviour, not
  exercisable by `astro preview`. ⚠ The destination changed 2026-08-18; a stale or indexed
  `/works` URL is the only reason this redirect exists. `/work` itself now 404s by design — it
  never shipped to production, so nothing external points at it.
- Lighthouse was not re-run; the audit's mobile baseline was Accessibility 92, Best Practices 73,
  SEO 83, and a fair comparison needs the deployed site.
- Contact form was driven end to end with a stubbed `fetch`; no message has actually been sent.
<!-- SESSION-HANDOFF:END -->
