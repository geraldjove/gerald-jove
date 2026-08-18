# CLAUDE.md — geraldjove.com

**`AGENTS.md` is canonical.** Read it before editing anything here: it carries the architecture,
commands, conventions, the six rules that will bite you, and the current session handoff. This file
holds only what changes how Claude should operate in this repository.

Four sections of it earn a look before you touch anything visual or infrastructural:
**Deliberate deviations from the Figma** (an index of everything that is intentionally NOT the
design — check it before “restoring fidelity”), **Verification harnesses** (what exists in
`.scratch/`, and four measurement traps that have each produced a false result here),
**Hosting** (Shopify was evaluated and rejected — do not start a Liquid port), and
**Definition of done**.

**This repository is public.** Never write commercial terms, pricing rationale, client names, or
strategy notes into a tracked file. The private material lives in `docs/` and `tasks/`, both
gitignored. Check `.gitignore` before creating any new top-level directory that will hold notes.

---

## Operating mode

Critical thinking is always on (supplied by the global config). In this repository it cashes out as
three specific habits:

1. **Verify against the build, not the dev server.** Several defects here are invisible in
   `npm run dev` and only appear in `dist/` — inlined scripts blocked by CSP being the worst. Grep
   the build output before claiming something works.
2. **Distinguish a real defect from a measurement artifact.** This has cost time repeatedly: a
   blank screenshot, an element that looked permanently hidden, eight phantom overflow failures,
   and a sticky pin that looked broken were **all** artifacts of the probe rather than defects.
   AGENTS.md → Verification harnesses lists the four traps. Re-measure before reporting, and
   correct plainly if wrong.
3. **Say what was not checked.** There is no test suite. "Build passes" is not "works", and
   "`npm run check` passes" is not "the build passes" — an Astro `{/* */}` comment between
   attributes compiles fine and fails `check`, and a literal `*/` inside one fails the build only.

## Before you finish any change

```bash
npm run check     # must be 0 errors
npm run build
find dist -name "*.html" -exec grep -o '<script[^>]*>[^<]' {} + | grep -vc 'src='   # must be 0
```

The third command is not optional. An inline script passes every local check and is silently blocked
in production by `script-src 'self'`.

Use `find`, not `dist/**/*.html` — `globstar` is off in this environment, so the glob searches only
one level deep and returns a false zero.

## Things Claude specifically gets wrong here

- **Writing copy instead of implementing it.** Page text comes from a written copy document. If a
  slot has no supplied line, prefer reusing an existing supplied one; if you do write something,
  flag it in your report as a deviation. Do not quietly author headings, CTAs, or captions.
- **Filling in a number to make a section look finished.** `src/content/blanks.js` is `null` on
  purpose. An invented metric is the single worst failure mode in this project — the whole content
  layer is built to make omission the default.
- **Reaching for a framework island.** It seems like the obvious way to build the contact form. It
  breaks production via the inline hydration runtime. The form is static markup plus
  `src/scripts/contact-form.ts`.
- **Assuming the site is still purely static.** ⚠ It has a server runtime since 2026-08-18 — two
  Vercel Functions in `api/`, for the newsletter and the contact form. `output: 'static'` is
  unchanged; `api/` is picked up separately. Client code posts SAME-ORIGIN to them, which is why
  `connect-src` and `form-action` are `'self'`. Do not point a form at a vendor host without
  widening the CSP, and prefer not to.
- **"Fixing" the missing SPA rewrite in `vercel.json`.** Its absence is deliberate and load-bearing.

## Reference documents

Local only, both gitignored — read them before substantial work on positioning or design:

- `docs/website-audit-2026-08-09.md` — findings and their severities, referenced by ID (H1–H4,
  M1–M6, L1–L6) throughout the code comments and commit messages.
- `docs/website-copy-2026-08-09.md` — the finished copy and the eleven deliberate blanks.
- `docs/design-system.md` — tokens, type scale, motion, and the measured contrast table.
- `tasks/PRE-LAUNCH-CHECKLIST.md` — ⚠ **stale.** It predates both the `/work` removal and the
  backends, and still lists blanks that stopped blocking because their consumers were deleted. The
  handoff in `AGENTS.md` is the current answer; re-check this file before trusting it.

## Session continuity

The current handoff, next actions, and pending verification live in the
`SESSION-HANDOFF` section of `AGENTS.md`. Read that, not this file, to resume work.
