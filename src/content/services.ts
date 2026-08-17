/**
 * The three services. One source of truth: the home page renders `card`, the
 * services page renders `detail`. Text is verbatim from
 * docs/website-copy-2026-08-09.md §2.3 and §4.
 *
 * `priceBlank` marks a price that is not yet real. Where it is set, the price
 * line is omitted entirely rather than guessed — see src/content/blanks.js.
 */
import { blankValue } from './blanks.js'

export interface Service {
  slug: string
  name: string
  /** Home-page card */
  card: { forWhom: string; summary: string; price: string | null; priceBlank?: string }
  /** Services-page detail block */
  detail: {
    forWhom: string
    problem: string
    whatIDo: { heading: string; body: string }
    included: Array<{ text: string; blank?: string }>
    howItWorks?: string
    timelineAndPrice: string | null
    timelineBlank?: string
  }
  testimonialBlank: string
}

export const SERVICES: Service[] = [
  {
    slug: 'creative-automation-systems',
    name: 'Creative Automation Systems',
    card: {
      forWhom: 'For teams whose production process is the ceiling.',
      summary:
        'I design and build the pipeline that turns a brief into finished, on-brand ad variants — coded infrastructure you own, not a no-code chain you rent.',
      price: 'From $8,000 · 4–8 weeks',
    },
    detail: {
      forWhom:
        'Marketing teams and agencies where production process — not budget or ideas — is the constraint. Usually you already tried a no-code tool and it broke.',
      problem:
        'Every ad variant passes through a human hand that doesn’t need to touch it. Briefs get retyped. Assets get renamed. Resizes get made one at a time. And the automation you bolted on last year is a chain of services nobody can debug, billing you monthly for something that fails silently.',
      whatIDo: {
        heading: 'What I build',
        body: 'A coded production pipeline that takes a brief and returns finished, on-brand variants — with human review where it matters and automation everywhere it doesn’t. Built on infrastructure you own: your repository, your accounts, your data.',
      },
      included: [
        { text: 'A mapped production process, with the actual bottleneck identified and measured' },
        { text: 'The working pipeline, deployed' },
        { text: 'Human approval gates at the points where brand risk is real' },
        { text: 'Documentation and a handover session, so you are not dependent on me' },
        { text: '30 days of support after delivery' },
      ],
      howItWorks: 'Diagnose → scope with a fixed price → build in weekly increments → hand over.',
      timelineAndPrice: '4–8 weeks. From $8,000, fixed price, scoped before anything starts.',
    },
    testimonialBlank: 'testimonialAutomation',
  },
  {
    slug: 'managed-ad-creative',
    name: 'Managed Ad Creative',
    card: {
      forWhom: 'For teams who need the output, not the system.',
      summary:
        'I run production for you on a monthly retainer — concepts, static and motion variants, resizes, and the iteration your testing schedule demands.',
      price: 'From $4,500/month',
    },
    detail: {
      forWhom:
        'Teams that need the output rather than the machine — running paid social at volume without the in-house production capacity to feed it.',
      problem:
        'Your testing schedule is written for a team twice your size. Every new angle costs designer days you don’t have, so you test less than you planned, and you learn slower than your competitors.',
      whatIDo: {
        heading: 'What I do',
        body: 'I run creative production for you on a monthly retainer, using the same pipeline I build for clients. Concepts, static and motion variants, resizes across placements, and the fast iteration that testing actually requires.',
      },
      included: [
        // Blank #2 — the figure buyers compare against every competitor. Omitted until real.
        { text: '', blank: 'retainerMonthlyVolume' },
        { text: 'Static and motion, sized for every placement you run' },
        { text: 'A weekly turnaround cycle, so iteration keeps pace with your testing' },
        { text: 'One monthly review call' },
        { text: 'Direct access to me, not an account manager' },
      ],
      // Blank #7 (minimum term) is part of this sentence, so the whole line waits on it.
      timelineAndPrice: null,
      timelineBlank: 'retainerMinimumTerm',
    },
    testimonialBlank: 'testimonialManaged',
  },
  {
    slug: '3d-product-visuals',
    name: '3D Product Visuals & CGI Ads',
    card: {
      forWhom: 'For brands whose product photography can’t keep pace.',
      summary:
        'Photoreal renders and product animation — new angles, colourways, and environments without booking another shoot.',
      // Blank #3 — the copy is explicit: do not publish until one job has been timed.
      price: null,
      priceBlank: 'visualsStartingPrice',
    },
    detail: {
      forWhom:
        'Brands whose product photography can’t keep up with the number of SKUs, colourways, or campaigns they need to show.',
      problem:
        'A photoshoot is a fixed cost and a fixed date. Every new variant, background, or angle means booking it again — and you can’t shoot a product that isn’t manufactured yet.',
      whatIDo: {
        heading: 'What I make',
        body: 'Photoreal 3D renders and product animation. Once your product exists as a model, new angles, colourways, environments and motion are production work, not another shoot.',
      },
      included: [
        { text: 'Product modelling, texturing and lighting to your reference' },
        { text: 'Hero renders in the sizes and placements you need' },
        { text: 'Optional product animation and motion for paid social' },
        { text: 'Source files, so the model is reusable for every future campaign' },
      ],
      timelineAndPrice: null,
      timelineBlank: 'visualsStartingPrice',
    },
    testimonialBlank: 'testimonialVisuals',
  },
]

/* ---------------------------------------------------------------------------
   Services page — transcribed from Figma frame 33:504 (1440 x 7837).

   Everything below is verbatim from the design. Nothing here is authored, and
   nothing is reworded: where the Figma reads oddly, it is reproduced as drawn
   and flagged in the rebuild report rather than tidied up in code.

   Two exceptions, both recorded:

   1. Node 33:404 draws "Starting From $3,500". Gerald confirmed 3D Product
      Visuals is a monthly engagement, so the price ships as "From $3,500/month"
      to match how the other two are drawn. The Figma is wrong here, not this
      file — it needs the same correction before the next export.
   2. Node 33:306's last bullet reads "A handover session 30 days of support
      after launch" — two items collapsed into one list row in the Figma. It is
      reproduced exactly as drawn, because a 1:1 copy is the brief; splitting it
      is a change for the Figma to make first.

   "What I don't do" is deliberately absent: the Figma has no such section.
--------------------------------------------------------------------------- */

/**
 * A bullet. Plain text, or a price row where one figure is set in the accent
 * colour two steps up the scale — nodes 33:306, 33:353, 33:404 all do this.
 */
export type ServiceListItem = string | { before?: string; figure: string; after?: string }

/**
 * One run of content inside a detail block. The Figma stores each block as a
 * single text node with internal paragraph and list runs; `runs` is that
 * structure made explicit so the page can render real <p> and <ul> elements
 * instead of one pre-wrapped blob.
 *
 * `gapPx` overrides the standard 28px (one blank line) gap above a run. Only
 * node 33:353 needs it: the blank line before "Monthly Output" is set at 36px,
 * so that gap measures 42px, not 28px.
 */
export type ServiceRun =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: ServiceListItem[] }
  | { kind: 'label'; text: string; gapPx?: number }

export interface ServiceDetailBlock {
  /** Figma node of the heading, e.g. "33:298". */
  headingNode: string
  heading: string
  /** Figma node of the body text, e.g. "33:300". */
  bodyNode: string
  runs: ServiceRun[]
}

export interface ServiceDetailSection {
  /** In-page anchor. */
  id: string
  /** Figma section frame node. */
  node: string
  title: string
  titleNode: string
  blocks: ServiceDetailBlock[]
  /** Figma node of the CTA group. */
  ctaNode: string
}

/** Intro section — Figma 33:285. */
export const SERVICES_PAGE = {
  node: '33:285',
  /**
   * Node 33:287. Poppins Bold 72.504px — the only Poppins heading on this page.
   * Drawn as two colour runs on two lines; `lead` is white, `accent` is #0af.
   */
  h1: { node: '33:287', lead: 'Three services.', accent: 'One goal.' },
  /** Node 33:288. Roboto Condensed Regular 24px. */
  subheadline: {
    node: '33:288',
    text: 'Help your team make more good creative without making production harder',
  },
  /** Node 33:292. */
  image: { node: '33:292', alt: 'Four interlocking puzzle pieces forming a single connected system' },
} as const

/** Every CTA on this page is the same button — nodes 33:339, 33:354, 33:405. */
export const SERVICES_CTA = { label: 'Book a 20-minute call', href: '/contact' } as const

export const SERVICE_DETAILS: ServiceDetailSection[] = [
  {
    id: 'creative-automation-systems',
    node: '33:293',
    title: 'Creative Automation Systems',
    titleNode: '33:295',
    ctaNode: '33:339',
    blocks: [
      {
        headingNode: '33:298',
        heading: 'Who is this for?',
        bodyNode: '33:300',
        runs: [
          {
            kind: 'p',
            text: 'Marketing teams and creative agencies that already have ideas, people, and ad budget but cannot produce creative fast enough. You may also have tried no-code automation before and found that it became difficult to manage as your workflow grew.',
          },
        ],
      },
      {
        headingNode: '33:301',
        heading: 'The Problem',
        bodyNode: '33:302',
        runs: [
          { kind: 'p', text: 'A lot of creative work is still done by hand.' },
          { kind: 'p', text: 'Briefs get copied.' },
          { kind: 'p', text: 'Files get renamed.' },
          { kind: 'p', text: 'Images get resized one at a time.' },
          { kind: 'p', text: 'Assets get moved between tools.' },
          { kind: 'p', text: 'Someone has to check everything.' },
          { kind: 'p', text: 'A few manual steps may not seem like much.' },
          {
            kind: 'p',
            text: 'But when your team needs hundreds of files, those small steps turn into hours of work.',
          },
        ],
      },
      {
        headingNode: '33:303',
        heading: 'What I Build',
        bodyNode: '33:304',
        runs: [
          { kind: 'p', text: 'I build a custom production system around your workflow.' },
          {
            kind: 'p',
            text: 'The system handles repeat tasks automatically while keeping people involved where creative judgment is needed.',
          },
          { kind: 'p', text: 'It runs on accounts and tools you control.' },
          { kind: 'p', text: 'Your code. Your data. Your system.' },
        ],
      },
      {
        headingNode: '33:305',
        heading: 'What You Get',
        bodyNode: '33:306',
        runs: [
          {
            kind: 'ul',
            items: [
              'A clear map of your current production process',
              'The main production problems identified',
              'A working automation system',
              'Human approval steps where needed',
              'Documentation',
              // Drawn as one row in the Figma. See the note at the top of this block.
              'A handover session 30 days of support after launch',
            ],
          },
          { kind: 'label', text: 'Timeline' },
          { kind: 'ul', items: ['Usually 4 to 8 weeks.'] },
          { kind: 'label', text: 'Price' },
          {
            kind: 'ul',
            items: [
              { before: 'From ', figure: '$8,000', after: ' Fixed project price.' },
              'The full scope and cost are agreed on before work starts.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'managed-ad-creative',
    node: '33:431',
    title: 'Managed Ad Creative',
    titleNode: '33:345',
    ctaNode: '33:354',
    blocks: [
      {
        headingNode: '33:346',
        heading: 'Who is this for?',
        bodyNode: '33:350',
        runs: [
          {
            kind: 'p',
            text: 'Teams running paid ads that need more creative than their current team can make.',
          },
        ],
      },
      {
        headingNode: '33:347',
        heading: 'The Problem',
        bodyNode: '33:351',
        runs: [
          { kind: 'p', text: 'Your media team wants to test more ideas.' },
          { kind: 'p', text: 'But every new idea takes design time.' },
          { kind: 'p', text: 'So tests get delayed.' },
          { kind: 'p', text: 'Winning ads do not get enough new versions.' },
          { kind: 'p', text: 'Your team ends up testing less than planned.' },
        ],
      },
      {
        headingNode: '33:348',
        heading: 'What I Do',
        bodyNode: '33:352',
        runs: [
          { kind: 'p', text: 'I handle ongoing creative production for you.' },
          { kind: 'p', text: 'This can include:' },
          {
            kind: 'ul',
            items: [
              'New ad concepts',
              'Static ads',
              'Motion ads',
              'Different sizes',
              'New versions of winning ads',
              'Creative updates',
              'Product visuals',
            ],
          },
          { kind: 'p', text: 'The goal is to keep new creative moving every week.' },
        ],
      },
      {
        headingNode: '33:349',
        heading: 'What You Get',
        bodyNode: '33:353',
        runs: [
          {
            kind: 'ul',
            items: [
              'Static and motion ads',
              'Sizes for the placements you use',
              'Weekly production cycles',
              'Monthly review call',
              'Direct access to me',
            ],
          },
          { kind: 'label', text: 'Price' },
          { kind: 'ul', items: [{ before: 'From ', figure: '$4,500/month' }] },
          // The blank line above this label is set at 36px in the Figma, so the
          // gap measures 42px rather than the 28px used everywhere else.
          /* Label and list are emitted together by one helper so an unfilled
             blank removes BOTH. Emitting them separately would leave an orphan
             "Monthly Output" heading with nothing under it, which is precisely
             what `AGENTS.md` rule 3 forbids — the renderer has no null path. */
          ...monthlyOutputRuns(),
        ],
      },
    ],
  },
  {
    id: '3d-product-visuals',
    node: '33:447',
    title: '3D Product Visuals & CGI Ads',
    titleNode: '33:396',
    ctaNode: '33:405',
    blocks: [
      {
        headingNode: '33:397',
        heading: 'Who is this for?',
        bodyNode: '33:401',
        runs: [
          {
            kind: 'p',
            text: 'Brands that need more product images than a normal photoshoot can easily provide.',
          },
          { kind: 'p', text: 'This is useful if you have:' },
          {
            kind: 'ul',
            items: [
              'Many products',
              'Different product colors',
              'New launches',
              'Products that are not manufactured yet',
              'Lots of campaigns',
              'A constant need for new ads',
            ],
          },
        ],
      },
      {
        headingNode: '33:398',
        heading: 'The Problem',
        bodyNode: '33:402',
        runs: [
          { kind: 'p', text: 'Photoshoots take planning.' },
          { kind: 'p', text: 'You need the product.' },
          { kind: 'p', text: 'The location.' },
          { kind: 'p', text: 'The camera setup.' },
          { kind: 'p', text: 'The lighting.' },
          { kind: 'p', text: 'The photographer.' },
          { kind: 'p', text: 'And usually a fixed shoot date.' },
          {
            kind: 'p',
            text: 'If you need another angle or background later, you may need another shoot.',
          },
        ],
      },
      {
        headingNode: '33:399',
        heading: 'What I Make',
        bodyNode: '33:403',
        runs: [
          { kind: 'p', text: 'I create a digital 3D version of your product.' },
          {
            kind: 'p',
            text: 'Once the model is ready, I can create new product images without photographing it again.',
          },
          { kind: 'p', text: 'That can include:' },
          {
            kind: 'ul',
            items: [
              'Different camera angles',
              'Different colors',
              'New backgrounds',
              'New lighting',
              'Product animations',
              'Ad creative',
              'Launch visuals',
            ],
          },
        ],
      },
      {
        headingNode: '33:400',
        heading: 'What You Get',
        bodyNode: '33:404',
        runs: [
          {
            kind: 'ul',
            items: [
              'Product modeling',
              'Materials and textures',
              'Lighting',
              'Hero product renders',
              'Multiple sizes',
              'Optional animation',
              'Source files for future projects',
            ],
          },
          /* Figma `33:404` draws "Starting From $3,500"; Gerald confirmed 3D is
             monthly, so the value lives in blanks.js and this reads it rather
             than restating it. Label and row are emitted together so an
             unfilled blank removes both instead of orphaning "Price". */
          ...visualsPriceRuns(),
        ],
      },
    ],
  },
]

/** Resolve a service's card price: real string, or null when the blank is unfilled. */
export function cardPrice(service: Service): string | null {
  if (service.card.price) return service.card.price
  return service.card.priceBlank ? blankValue(service.card.priceBlank as never) : null
}

/* ---------------------------------------------------------------------------
   Blank-backed runs.

   These are function declarations, not consts, because SERVICES above spreads
   their return values while the module is initialising — declarations hoist,
   `const` arrow functions do not, and using one here fails at import time.

   Each returns the label AND its rows together, or an empty array. That pairing
   is the point: emitting a label separately from a blank-backed list leaves an
   orphan heading with nothing under it when the value is unfilled, which is the
   failure `AGENTS.md` rule 3 exists to prevent. `ServiceRuns.astro` renders runs
   verbatim and has no null path, so the omission has to happen here.
--------------------------------------------------------------------------- */

/** Managed Ad Creative's "Monthly Output" label and rows — blank #2 (`33:353`). */
function monthlyOutputRuns(): ServiceRun[] {
  const value = blankValue('retainerMonthlyVolume')
  if (!value) return []
  /* The design draws two bullets from one text node, so the stored value is one
     string split on the sentence boundary. A single-sentence value degrades to
     one bullet rather than breaking. */
  const items = value
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
  return [
    // 36px blank line above this label in the Figma, so the gap is 42px not 28.
    { kind: 'label', text: 'Monthly Output', gapPx: 42 },
    { kind: 'ul', items },
  ]
}

/** 3D Product Visuals' "Price" label and row — blank #3 (`22:64`, not `33:404`). */
function visualsPriceRuns(): ServiceRun[] {
  const value = blankValue('visualsStartingPrice')
  if (!value) return []
  /* The row renders its amount in an accent span, so the stored
     "From $3,500/month" is split into lead-in and figure. Anything that does not
     match that shape renders whole rather than being silently mangled. */
  const match = value.match(/^(\D*)(\$.*)$/)
  return [
    { kind: 'label', text: 'Price' },
    { kind: 'ul', items: [match ? { before: match[1], figure: match[2] } : value] },
  ]
}
