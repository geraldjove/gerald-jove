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

/** Services page header and the "what I don't do" block — copy §4 and §4.4. */
export const SERVICES_PAGE = {
  h1: 'Three services. One problem.',
  subheadline:
    'Every one of these exists to raise the amount of good creative your team can ship in a week.',
  exclusions: {
    heading: 'What I don’t do',
    body: 'I don’t build marketing websites, design logos or brand identities, run your ad accounts, or take one-off single-render jobs. If that’s what you need, I’m happy to point you to someone who does it well.',
  },
} as const

/** Resolve a service's card price: real string, or null when the blank is unfilled. */
export function cardPrice(service: Service): string | null {
  if (service.card.price) return service.card.price
  return service.card.priceBlank ? blankValue(service.card.priceBlank as never) : null
}
