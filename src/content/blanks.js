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
    value: null,
  },
  visualsStartingPrice: {
    ref: 3,
    what: 'Starting price for 3D Product Visuals — time one job first, do not publish a guess',
    blocksPublication: true,
    value: null,
  },
  secondCaseStudy: {
    ref: 4,
    what: 'A second case study (ideally 3D/product visualisation where CGI replaced a photoshoot) with its own hard number',
    value: null,
  },
  aboutHumanClose: {
    ref: 5,
    what: 'Two sentences of something true and non-professional for the About page — the line people quote back to you',
    value: null,
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
