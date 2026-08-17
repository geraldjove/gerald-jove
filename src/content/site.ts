/**
 * Site-level copy: navigation, footer, meta, and the labels repeated across
 * pages.
 *
 * Navigation and footer strings are transcribed from Figma file
 * 6Lgtxs8zSUzruc8zu8tY0T (Navbar 33:611 / 33:621 / 33:630 / 33:639, Footer
 * 33:730 / 33:700 / 33:760). Everything else is still from
 * docs/website-copy-2026-08-09.md §6 unless noted.
 */

export const SITE_URL = 'https://geraldjove.com'

/** Used by the collapsed navigation bar below 90rem. The Figma navbar carries
 *  no wordmark at all — the small-viewport bar is authored. */
export const SITE_NAME = 'Gerald Jove'

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

/** Figma capitalisation: "Book a Call" (I33:611;33:608), not "Book a call". */
export const NAV_CTA = { label: 'Book a Call', href: '/contact' } as const

/**
 * FIVE items. The Figma navbar shows four and omits Work; shipping Work is a
 * fixed decision, and /work plus the /works → /work redirect stay. The order
 * below is the Figma's own (Home, About, Services, Contact) with Work inserted
 * before Contact.
 */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
] as const

/**
 * Footer — the three-page variant (33:730 / 33:700 / 33:760), which is the one
 * that ships everywhere. The homepage CTA frame carries an older variant with
 * Facebook / Instagram / YouTube icons; it is not used, because no URLs exist
 * for those accounts.
 */
export const FOOTER = {
  /**
   * 33:732 — one text node, two colours. The first clause is white and the
   * rest is accent, so it is stored as two strings rather than one.
   */
  tagline: {
    lead: 'Creative systems and 3D production',
    accent: ' for teams that need more content.',
  },

  /**
   * Three columns, 33:734 / 33:739 / 33:744. The Figma supplies the labels but
   * no destinations; the hrefs below are authored. The "Find me" URLs are the
   * real ones that were already here.
   */
  columns: [
    {
      heading: 'Services',
      links: [
        { label: 'Creative Automation', href: '/services' },
        { label: 'Managed Ad Creative', href: '/services' },
        { label: '3D Product Visuals', href: '/services' },
      ],
    },
    {
      heading: 'Explore',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      heading: 'Find me',
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/geraldjove' },
        { label: 'ArtStation', href: 'https://www.artstation.com/geraldjove' },
        { label: 'Behance', href: 'https://www.behance.net/gkbjove' },
        { label: 'GitHub', href: 'https://github.com/geraldjove' },
      ],
    },
  ],

  /** 33:757, verbatim. Replaces "© 2026 Gerald Jove. Metro Manila, Philippines." */
  legal: 'Copyright 2026. Gerald Jove. All rights reserved.',

  /** 33:751 / 33:752 / 33:756 — rendered only when NEWSLETTER_ENDPOINT is set. */
  newsletter: {
    lead: 'Subscribe',
    rest: ' to my newsletter',
    blurb: 'For news, updates, and tips on creative ads and ai system automations.',
    placeholder: 'yourname@email.com',
    submit: 'Submit',
  },
} as const

/**
 * The newsletter form has no provider yet.
 *
 * While this is null the entire newsletter block is omitted — heading, blurb,
 * field and Submit button — exactly the way `blanks.js` omits an unfilled
 * value. Never ship a Submit button that does nothing.
 *
 * To turn it on: create the form in Formspree (already permitted by the CSP in
 * both `connect-src` and `form-action`, so no vendor and no header change is
 * needed) and paste its endpoint here. A consent line and a privacy-policy
 * link are required before it collects a single address; neither exists yet.
 */
export const NEWSLETTER_ENDPOINT: string | null = null

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
