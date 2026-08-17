/**
 * The eleven [[ NEEDS YOUR INPUT ]] markers from docs/website-copy-2026-08-09.md §7.
 *
 * Every one is `null` until Gerald supplies a real figure. Nothing in this file
 * may be invented, estimated, or rounded into place: the copy document states
 * that not one metric in it was fabricated, and a made-up statistic is the
 * fastest way to lose a buyer who checks.
 *
 * To fill one in, replace `value: null` with the real string. Components that
 * depend on it start rendering automatically. Until then they omit the element
 * entirely — never an orphan "Result:" label with nothing after it.
 *
 * Plain JS, not TS, because astro.config.mjs imports it to report open blanks
 * at build time.
 */

/** @typedef {{ ref: number, what: string, blocksPublication?: boolean, value: string | null }} Blank */

/** @type {Record<string, Blank>} */
export const blanks = {
  automationCaseResult: {
    ref: 1,
    what: 'One real outcome number for the automation case study (variants/month before vs after, hours saved, tool cost removed, or turnaround time)',
    blocksPublication: true,
    value: null,
  },
  retainerMonthlyVolume: {
    ref: 2,
    what: 'Monthly deliverable volume for the Managed Ad Creative retainer (e.g. "up to 100 ad variants per month")',
    blocksPublication: true,
    /* Verbatim from Figma `33:353`, filled 2026-08-18 on Gerald's instruction.
       Two sentences in one value because the design draws two bullets; the
       consumer splits on the sentence boundary rather than storing a list, so
       the stored string stays comparable to the node's own text. */
    value: 'Up to 100 creative variants per month. 2 3D animations of top performing ads per month.',
  },
  visualsStartingPrice: {
    ref: 3,
    /* Was "Starting price"; Gerald confirmed 2026-08-17 that 3D Product Visuals
       is a monthly engagement, not a project. */
    what: 'Monthly price for 3D Product Visuals',
    blocksPublication: true,
    /* Figma `22:64` draws "From $3,500/month" on the homepage card; `33:404`
       draws "Starting From $3,500" on the Services detail page. The two
       disagree and Gerald ruled for monthly, so 33:404 is the one that is
       wrong. Filled 2026-08-18. */
    value: 'From $3,500/month',
  },
  secondCaseStudy: {
    ref: 4,
    what: 'A second case study (ideally 3D/product visualisation where CGI replaced a photoshoot) with its own hard number',
    value: null,
  },
  aboutHumanClose: {
    ref: 5,
    what: 'Two sentences of something true and non-professional for the About page — the line people quote back to you',
    /* Figma `33:227`, the "A Little More About Me" section, filled 2026-08-18.
       The design supplies exactly what this blank was holding a slot for: two
       sentences, non-professional. Rendered from `about.ts` `personal.body`,
       which is the same text — this entry records that the slot is satisfied so
       the build stops listing it as outstanding. */
    value:
      'In my free time, I enjoy VR games and creating fun community events where people can play, compete, and share the experience together. ' +
      'I also love building apps when an idea hits me, even if it starts as a small experiment and turns into something much bigger.',
  },
  ogImage: {
    ref: 6,
    what: 'A 1200x630 social share image (strongest product render with the headline overlaid beats a portrait)',
    value: null,
  },
  retainerMinimumTerm: {
    ref: 7,
    what: 'Retainer minimum term — 1 or 3 months. Affects the contract, not just the copy.',
    value: null,
  },
  contactErrorFallback: {
    ref: 8,
    what: 'Preferred contact-form error fallback. Audit advises against publishing a raw address; consider a forwarding alias.',
    value: null,
  },
  testimonialAutomation: {
    ref: 9,
    what: 'Testimonial for Creative Automation Systems — real quotes only',
    value: null,
  },
  testimonialManaged: {
    ref: 10,
    what: 'Testimonial for Managed Ad Creative — real quotes only',
    value: null,
  },
  testimonialVisuals: {
    ref: 11,
    what: 'Testimonial for 3D Product Visuals — real quotes only',
    value: null,
  },
}

/**
 * Resolved value for a blank, or null. Callers must branch on null and omit the
 * surrounding element rather than render a placeholder.
 * @param {keyof typeof blanks} key
 * @returns {string | null}
 */
export function blankValue(key) {
  const entry = blanks[key]
  return entry && entry.value != null && entry.value !== '' ? entry.value : null
}

/** Every blank still unfilled, blocking ones first. */
export function unresolvedBlanks() {
  return Object.entries(blanks)
    .filter(([, b]) => b.value == null || b.value === '')
    .map(([key, b]) => ({
      key,
      id: `#${b.ref}`,
      what: b.what,
      blocksPublication: Boolean(b.blocksPublication),
    }))
    .sort((a, b) => Number(b.blocksPublication) - Number(a.blocksPublication) || a.id.localeCompare(b.id))
}
