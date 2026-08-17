# CLAUDE.md — geraldjove.com

**`AGENTS.md` is canonical.** Read it before editing anything here: it carries the architecture,
commands, conventions, the six rules that will bite you, and the current session handoff. This file
holds only what changes how Claude should operate in this repository.

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
2. **Distinguish a real defect from a measurement artifact.** During the rebuild, a blank full-page
   screenshot and an element that looked permanently hidden were both artifacts of screenshot timing
   and a racing `setTimeout`, not bugs. Re-measure before reporting, and correct plainly if wrong.
3. **Say what was not checked.** There is no test suite. "Build passes" is not "works".

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
- **"Fixing" the missing SPA rewrite in `vercel.json`.** Its absence is deliberate and load-bearing.

## Reference documents

Local only, both gitignored — read them before substantial work on positioning or design:

- `docs/website-audit-2026-08-09.md` — findings and their severities, referenced by ID (H1–H4,
  M1–M6, L1–L6) throughout the code comments and commit messages.
- `docs/website-copy-2026-08-09.md` — the finished copy and the eleven deliberate blanks.
- `docs/design-system.md` — tokens, type scale, motion, and the measured contrast table.
- `tasks/PRE-LAUNCH-CHECKLIST.md` — what still blocks publication.

## Session continuity

The current handoff, next actions, and pending verification live in the
`SESSION-HANDOFF` section of `AGENTS.md`. Read that, not this file, to resume work.
