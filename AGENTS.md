# AGENTS.md — geraldjove.com

Guidance for any coding agent or contributor working in this repository.
`README.md` covers setup; this file covers the rules that are not obvious from the code.

**This repository is public.** Do not add commercial terms, pricing rationale, client names, or
strategy notes to any tracked file. `docs/` and `tasks/` are gitignored for exactly that reason.

---

## Architecture

Static [Astro](https://astro.build) site. No client-side router and no UI framework. ⚠ **It DOES have
a server runtime since 2026-08-18** — two Vercel Functions in `api/`, for the newsletter and the
contact form. `api/` sits outside `src/` and Vercel picks it up independently of the Astro build.
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

⚠ **One deliberate exception, and it SHIPS.** Gerald asked on 2026-08-18 for the newsletter block
to be finished as UI ahead of its backend, then the same day: *"keep the Newsletter but disable it
for the time being."* It therefore renders on all six pages while `NEWSLETTER_ENDPOINT` is null.

The omit-rather-than-fake principle is not waived, it is enforced in the markup: with no endpoint
the block is a `<div>`, not a `<form>`, and **both** controls carry `disabled`. **Nothing can be
collected, dropped, or even typed.**

⚠ **The old gate here — `grep -rl 'data-newsletter="ui-only"' dist` "must print NOTHING before
deploying" — is WITHDRAWN.** It forbade a state Gerald has since chosen. Its reasoning was that a
visitor types an address and finds the button dead; disabling the field removes the premise. The
replacement checks the property that actually matters, not the state's existence:

```bash
# In dist, the ui-only block must never be a form and must never carry an enabled control.
grep -rl 'data-newsletter="ui-only"' dist --include=*.html | while read -r f; do
  grep -o '<form[^>]*data-newsletter[^>]*>' "$f"
  grep -o '<input[^>]*newsletter__field[^>]*>' "$f" | grep -v disabled
  grep -o '<button[^>]*newsletter__submit[^>]*>' "$f" | grep -v disabled
done   # must print nothing
```

⚠ **Match the whole tag — start the pattern at `<input` / `<button`, not at the class name.** Astro
emits `disabled` BEFORE `class`, so a pattern anchored on the class name ends its match after the
attribute it is looking for and reports every control as enabled. That exact mistake produced six
false failures the first time this gate was run, which is trap #7 in spirit: the probe was wrong,
the page was fine.

`data-newsletter="ui-only"` stays in the markup. It is no longer a blocker but it is still the only
machine-readable trace of the state — do not delete it, and do not read its absence as approval.

To go live: set `NEWSLETTER_ENDPOINT` **with** the consent line and privacy link `site.ts` requires.
Setting `NEWSLETTER_VISIBLE` to false hides the block entirely, which is a different decision.

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

## Hosting — Vercel, and Shopify was rejected

⚠ **Do not start a Liquid port.** Gerald asked for the site to be converted to run inside Shopify on
2026-08-18, was shown the cost, and decided against it the same day. Nothing was built.

| today (Astro / Vercel) | on Shopify |
|---|---|
| 7 response headers incl. a strict CSP | **none** — the storefront cannot set headers |
| `astro:assets` → 36 optimised webp | re-authored against Shopify's `image_url` filters |
| typed content modules + `blanks.js` | Liquid has no type checking |
| bundled JS, no inline script | theme assets, but **no build step** |
| free static hosting | $39/mo minimum |

The content layer was the real cost, not the markup: `blanks.js` is what makes §3 enforceable at
build time, and Liquid has no equivalent.

⚠ **The only Shopify store connected to this tooling is AGNTcy / agntcy.app**, which is the Space
Ape engagement side. Gerald's personal site must never be deployed there — no code or
infrastructure crosses between the two in either direction. If Shopify is ever revisited it needs a
store of his own.

---

## Deliberate deviations from the Figma

The design is **one 1440px frame per page, with no smaller designs**, so 1:1 is only defined at
1440 and up. Below that the layout is authored, and every such decision must be reported as
authored rather than presented as copied.

Everything below departs from the design **on Gerald's instruction or to fix a defect the design
itself carries**. Each is also marked `AUTHORED <date>` at the line that changed. **Do not “restore
fidelity” on any of them** — the Figma value is recorded so nobody has to guess what moved.

| Node / area | Figma | Ships as |
|---|---|---|
| Hero `1:2` figure | one flattened raster `19:12` | CSS gradient + transparent cut-out, cropped to **scale 0.66841 at (252.9, −75.3)**, TOP-anchored |
| Hero figure below 64rem | present | **hidden** — removes the scrim seam with it |
| Homepage footer | full footer | **absent** — `index.astro` passes `footer={false}`; no link columns, no copyright |
| Newsletter `33:750` in footer | y=40, level with the tagline | **vertically centred** (`top:50%`), 18.223px flow gap below 90rem |
| Newsletter in `24:230` | an older footer variant | the newsletter block |
| Proof arrow `30:17` | x=66.1% | centred 50% |
| Proof eyebrow `22:72` | 13.792px | 18px, to match `22:30` |
| Services rails | 413 wide | 360, right rail re-anchored to x=1030 |
| Services titles `33:295` / `33:345` / `33:396` | **#00aaff** | **white** (`--color-fg`) |
| Footer on Services / Contact | #242424 (`33:700` / `33:760`) | `ink` surface |
| Zuitt `33:214` | 309 × 309 at y=715 | **288 × 288 at y=739**, level with `33:217` |
| Filipino Institute `33:217` | y=736 | y=739 — both cards now sit ON CIIT's bottom edge, not over it |
| White band behind the two logo cards | no node | added, at 71.792% — 3px above the cards, tucked behind CIIT |
| `About Gerald` / `A Little More About Me` | — | vertically centred below 90rem, `display: block` at ≥90rem |
| Scroll snap | not in the design at all | **removed 2026-08-18**; sections are still 100svh |
| Card + footer service links | `/services` | `/services#<id>`, resolved against `SERVICE_DETAILS` |
| Popup body `33:568` / `33:592` | leading-none (18px on 18px) | **1.4 leading** — the design's value is set for a headline, not a centred paragraph |
| Popup pill `33:570` / `33:594` | x=53 in a 539 frame (53 left, 43 right) | **centred**; the 5px reads as a nudge |
| Popup error pill `33:595` | a pill that says "Please try again in a moment." | same text, but it **dismisses** — a pill that looks pressable and leads nowhere is worse |
| Popup error body `33:592` | ~5.5px above the gap centre | **centred**, same rule as the success node — a 4.9px difference |
| Popup close X | no node | **added**, blue, top-right on both — Gerald asked for it |

⚠ **Two more that are corrections, not preferences.** `HomeHero` and `HomeAboutStrip` were scaling
their artwork with the viewport while the copy stayed pinned to the 1440 canvas — measured 1.32× at
1920. Both layers are capped to `--fx-frame`. It is invisible at exactly 1440, which is why a 1:1
rebuild never caught it; check any new full-bleed image layer for the same thing.

---

## Verification harnesses

⚠ **`.scratch/` is gitignored, so none of these survive a clean checkout.** They are recorded here
because rebuilding one from scratch is what costs the time, not running it.

⚠ **The playwright `chrome-headless-shell-1228` that the older scripts hardcode is NOT on this
machine** — `verify.mjs`, `fidelity.mjs` and friends fail with ENOENT until repointed. The current
harnesses drive system Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`.

| Harness | Checks |
|---|---|
| `matrix.mjs` | 96 cells — 4 pages × 8 widths × 3 heights, horizontal overflow + newsletter inertness |
| `anchors.mjs`, `anchor-click.mjs` | the three `/services` anchors land, by URL and by click |
| `story-pin-check.mjs` | the My Story sticky pin still runs |
| `mobile-check.mjs` | hero figure hidden below 64rem; the two sections centre |
| `api-test.mts` | both Vercel Functions, 15 branches, **no credentials needed** |
| `hero-fit.mjs`, `hero-compare.mjs` | derives and then re-checks the hero crop against the design render |
| `band-edge.mjs` | the collage white band stays under the CIIT photo |
| `dialog-check.mjs` | the two outcome popups end-to-end at 1440 and 390 — opened by the real submit path with `fetch` stubbed, geometry, focus, `::backdrop` blur, and all four dismiss routes |
| `dialog-body.mjs` | the popup body TEXT position, measured with a `Range` rather than off the flex spacer's box |

**Six measurement traps, each of which has already produced a false result here:**

1. ⚠ **A bounding box outside the viewport is not overflow if an ancestor clips it.** The Education
   collage deliberately oversizes its children inside `overflow: hidden`. A naive test reported 8
   phantom failures; walk up for a clipping ancestor before reporting.
2. ⚠ **`html` sets `scroll-behavior: smooth`, so `window.scrollTo` ANIMATES.** A probe that samples
   too early reads a sticky panel that has not stuck yet — indistinguishable from a broken pin. Use
   `behavior: 'instant'`.
3. ⚠ **Sections reveal on scroll.** `captureBeyondViewport` shoots them before they are revealed and
   returns a blank image. Scroll down in steps first, then capture the viewport.
4. ⚠ **A single-height matrix is not a matrix.** Running every width at one height hid 18 real
   overflowing elements at 1440×1200. The height axis is not optional.
5. ⚠ **A flex spacer's box top is not where its text is.** `.d-body` in `FormDialog.astro` fills the
   whole gap and centres its copy inside; reading its `getBoundingClientRect().top` as the type
   position reported the body 27px out. Use a `Range` over the text node.
6. ⚠ **An entrance animation ends on a transform.** `.d-dialog[open]` animates from
   `scale(0.97)`, so anything measured before it settles comes back **3% small on every box** — a
   539px card reads 522.8. Wait for it, or the numbers are uniformly and plausibly wrong.

---

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

⚠ `git stash@{0}` on `redesign/figma-2026-08` still holds a discarded pixel-exact pass, and
commit `4f39e96` on that branch holds the first Figma attempt. Both superseded; neither is needed.
Do not drop the stash without asking — it is the only copy.

Branch `redesign/figma-1to1`, eight commits ahead of `2863d4a`, **working tree clean, nothing
pushed, nothing deployed.** `master` still serves the old Vue site in production.

### Completed
- Home, About, Services and Contact rebuilt 1:1 from Figma at ≥1440; below that authored. Sections
  are viewport-fitted (100svh), which **supersedes the old absolute-height contract** but keeps the
  proportions — the canvas scales uniformly.
- `/work` and `/work/<slug>` removed with their collection, entry, `CaseTeaser` and four images.
  `/works` re-pointed to `/services` (it is a live URL on the Vue site `master` still serves).
- Newsletter, contact and booking backends built — `api/subscribe.ts` (Mailchimp),
  `api/contact.ts` (HubSpot), Calendly as a plain link. **The CSP got tighter**: `formspree.io`
  removed from `connect-src` and `form-action`, both back to `'self'`.
- Scroll snap removed site-wide; the My Story sticky pin kept and verified.
- Shopify evaluated as a host and rejected — see **Hosting** above; Vercel stays.
- ⚠ `.env` was not gitignored in a public repo. Fixed.

### Completed this session (2026-08-18, after the five commits above)
- **Contact-form outcome popups, Figma `33:648` / `33:649`.** New `src/components/FormDialog.astro`
  (native `<dialog>` + `showModal()`, so the blurred `::backdrop`, the focus trap and Escape come
  from the platform), copy in `DIALOGS` in `contact.ts`, wiring in `contact-form.ts`. The old
  in-page success/error panels are kept as the no-JS and no-`showModal()` fallback — change both or
  the two states disagree. The blue X is authored, not a Figma node; Gerald asked for it.
- **`CALENDLY_URL` set** in `src/content/booking.ts`. 17 CTA hrefs across the six pages now point at
  `calendly.com/geraldjove/gerald-jove-creative-ai-solutions`, which answers 200. It is a plain
  link, not an embed, so no CSP change was needed.
- Two defects found by measuring and fixed in the same pass — the popup body sat 15.7px high
  because the pill's 22px top margin shrank the box it centres in, and the focused heading drew the
  global accent focus ring around "Success!". Both are documented at the point of the fix.
- ⚠ **Two new measurement traps, both hit while verifying the above.** `.d-body` is a flex spacer
  filling the gap, so its box top is *not* the type position — measure the text with a `Range`. And
  the open animation ends on `scale(0.97)`, so measuring before it settles reports every box 3%
  small. Both are in the traps list and in `.scratch/dialog-check.mjs` / `.scratch/dialog-body.mjs`.

### In progress
- Nothing. Every change is committed and the gates are green.

### Blockers and risks
- **The newsletter ships disabled, by decision, and is no longer a blocker.** `NEWSLETTER_ENDPOINT`
  stays null; the block renders on all six pages as a `<div>` with both controls `disabled`. Gerald,
  2026-08-18: *"keep the Newsletter but disable it for the time being."* §3's old grep gate is
  withdrawn and replaced there. It goes live only with the consent line and privacy page, which he
  is writing.
- ⚠ **`/api/contact` still needs `HUBSPOT_PORTAL_ID=247085184` and
  `HUBSPOT_FORM_GUID=750c1b94-c69a-41ea-9a8f-a5c2fc0a66e5` set in Vercel**, or it answers 503. The
  two Mailchimp variables are set (Gerald, 2026-08-18) but unused while the endpoint is null, and
  unverifiable from here — the Vercel connector cannot read env vars or even see that project.
- ✅ The HubSpot `timeline` option values now match the site exactly — read back from the API and
  compared by string equality on 2026-08-18. Details in
  `tasks/2026-08-18-integration-configuration.md`.
- **Nothing has been deployed at all**, including `c33e8c6` on `master`, which only removes
  exposure and fixes audit findings.
- No blank blocks publication any more — but #1 stopped blocking because its consumers were
  deleted, **not because a number was supplied**. `tasks/PRE-LAUNCH-CHECKLIST.md` predates this.
- Not verified anywhere: a real touch device, and any browser other than the Chromium the
  harnesses drive. The viewport fit leans on `calc()` length ÷ length — unconfirmed in Safari and
  Firefox. Its failure mode was tested and is benign: the section falls back to the 1:1 layout.

### Next actions
1. Set `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID`, `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID` in
   Vercel — `.env.example` says where each is found.
2. **Then** flip `NEWSLETTER_ENDPOINT` to `'/api/subscribe'` in `site.ts`. Not before: the client
   cannot see whether the server is configured, and flipping early ships a form that 503s.
3. ~~Set `CALENDLY_URL`~~ — **done, uncommitted.** Commit it with the popups.
4. Get the newsletter consent line **in Gerald's words** (rule 6) and a privacy-policy page; both
   are recorded in `site.ts` as preconditions and neither exists.
5. Push, merge to `master`, deploy.
6. Confirm on the deployed site: `/works` → `/services` 301, real 404 status, security headers
   present, `robots.txt` and `sitemap-index.xml` served as their own files.
7. Click one real Calendly CTA on the deployed site. The URL answers 200 to `curl`; that it is the
   **right** event type is Gerald's to confirm, not something a status code establishes.

### Verification pending
- ⚠ **The popups were driven with `window.fetch` stubbed**, at 1440 and 390 in headless Chrome only.
  What was exercised is the real `contact-form.ts` submit path, the geometry, the focus, and all
  four dismiss routes — not a real send. `<dialog>.showModal()` and `::backdrop` are unconfirmed in
  Safari and Firefox; the fallback if `showModal` is missing is the old in-page panel, which is
  feature-detected rather than assumed, but has not been run with the method removed.
- ⚠ **Neither function has run against a real vendor.** `api-test.mts` covers 15 branches with
  stubbed outbound calls; nothing has actually reached Mailchimp or HubSpot.
- ⚠ **HubSpot silently DROPS values whose property it does not recognise.** The form's internal
  field names must match the `name` attributes in `contact.ts`. Send one real submission and check
  **every** field arrived — a submission can succeed with fields missing and nothing reports it.
- `vercel.json` behaviour is not exercisable by `astro preview`: the redirect and live header
  delivery need the deployed site.
- Lighthouse was not re-run. The audit's mobile baseline was Accessibility 92, Best Practices 73,
  SEO 83, and a fair comparison needs production.
- The hero scrim seam at 1024–1439 is a **known deferral**, not an oversight — fixing it means
  spanning the scrim across the section so it has no left edge.

### Still open — needs Gerald, not an agent
1. **The dated sentence in `about.ts` → `story.body[23]`.** It conflates two things that began at
   different times and implies the wrong date. The replacement must be **his** words (rule 6) and
   must go into the Figma too, or the next export reintroduces it.
2. **The Education italic.** Four institution names render a synthesised oblique, visibly wider and
   over-slanted at 24px. Full Roboto Condensed Italic is 56,956 B; a subset of the 33 glyphs used
   is 10,032 B. Recommendation: subset or drop, leaning drop.
3. **`0001_website_image_6_ver_1_1.png` is committed but unused** — a 770 × 946 cut-out Gerald added
   mid-session. Too small for the hero, which renders the figure 1443.8px wide. Delete it, or
   supply a high-resolution export of the same framing. Recorded in `MANIFEST.md`.
4. **`src/components/ServiceCard.astro` is dead code** — nothing imports it. It already linked to
   `/services#<slug>` — the pattern the live cards had to re-create. Delete or revive.

<!-- SESSION-HANDOFF:END -->
