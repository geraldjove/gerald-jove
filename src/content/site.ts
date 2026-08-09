/**
 * Site-level copy: navigation, footer, meta, and the labels repeated across
 * pages. Verbatim from docs/website-copy-2026-08-09.md §6 unless noted.
 */

export const SITE_URL = 'https://geraldjove.com'

/**
 * Availability is dated, never open. This respects the exclusivity term the
 * audit describes in §3, and the copy document notes it is also better copy
 * than "available now" — scarcity converts, eagerness does not.
 *
 * Do not soften this to "available now" and do not wire a live booking
 * scheduler to the CTA. Both are deliberate.
 */
export const AVAILABILITY = {
  long: 'Taking on new client projects from January 2027. Booking conversations now.',
  short: 'Taking on new client projects from January 2027.',
} as const

/** The one primary action on the site. It routes to /contact — there is no scheduler. */
export const PRIMARY_CTA = {
  label: 'Book a 20-minute fit call',
  href: '/contact',
} as const

export const NAV_CTA = { label: 'Book a call', href: '/contact' } as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const FOOTER = {
  tagline: 'Creative production systems for teams that ship at volume.',
  columns: [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  /**
   * Text links, as the copy specifies. These moved here from the row of cards
   * that used to sit above Gerald's own work on the Works page — the audit's
   * "the site leaks its own traffic" finding.
   */
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/geraldjove' },
    { label: 'ArtStation', href: 'https://www.artstation.com/geraldjove' },
    { label: 'Behance', href: 'https://www.behance.net/gkbjove' },
    { label: 'GitHub', href: 'https://github.com/geraldjove' },
  ],
  legal: '© 2026 Gerald Jove. Metro Manila, Philippines.',
} as const

/** Per-page meta, exactly as written in copy §6. */
export const META = {
  home: {
    title: 'Gerald Jove — Creative Production Systems',
    description:
      'I build the automation pipelines and 3D creative that let marketing teams ship ad variants at volume, without adding headcount.',
  },
  services: {
    title: 'Services — Creative Automation & 3D',
    description:
      'Creative automation systems, managed ad creative production, and photoreal 3D product visuals. Fixed scope, fixed price.',
  },
  about: {
    title: 'About Gerald Jove — 3D & Automation',
    description:
      'Ten years in 3D and CGI, now building the production systems behind high-volume ad creative. Based in Metro Manila.',
  },
  contact: {
    title: 'Contact Gerald Jove',
    description:
      'Tell me where your creative production breaks. Twenty minutes, no pitch. Taking new projects from January 2027.',
  },
  /** Not in copy §6 — written to the same pattern. */
  work: {
    title: 'Work — Case Studies',
    description:
      'How the production systems and 3D creative worked in practice: the problem, what I built, and the result.',
  },
  thankYou: {
    title: 'Thanks — Gerald Jove',
    description: 'Your message is in. Here is what happens next.',
  },
  notFound: {
    title: 'Page not found — Gerald Jove',
    description: 'That page does not exist.',
  },
} as const

/** Shared Open Graph defaults, copy §6. og:image is blank #6 and stays omitted until real. */
export const OG_DEFAULTS = {
  title: 'Gerald Jove — Creative Production Systems',
  description:
    'I build the automation pipelines and 3D creative that let marketing teams ship ad variants at volume.',
} as const
