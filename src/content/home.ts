/**
 * Home page copy — verbatim from docs/website-copy-2026-08-09.md §2.
 * Section order follows the audit's §6.3: one screen per idea, one CTA repeated.
 */

export const HERO = {
  h1: 'Your creative can’t keep up with your ad spend.',
  subheadline:
    'I build the production systems — and the 3D creative that runs through them — so your team ships more variants, faster, without adding headcount.',
  secondaryCta: { label: 'See how it works', href: '/services' },
} as const

export const PROBLEM = {
  h2: 'The bottleneck isn’t ideas. It’s production.',
  body: [
    'You know which angles you want to test. You have the briefs, the offers, and the budget. What you don’t have is a way to get forty variants out the door this week.',
    'So testing slows to whatever your designers can physically produce. Winning concepts don’t get iterated because iteration costs another three days. Freelancers add coordination work instead of removing it. And the no-code automation someone wired together last year breaks quietly every time a platform changes an endpoint — usually on a Friday.',
    'The result is a team doing expensive, skilled work at the speed of manual production, on ad platforms that reward volume.',
  ],
} as const

export const SERVICES_SECTION = {
  h2: 'Three ways I fix that',
  intro: 'Pick the one that matches where your constraint actually is.',
} as const

export const PROOF = {
  h2: 'What this looks like in practice',
} as const

export const PROCESS = {
  h2: 'How we’d work together',
  steps: [
    {
      label: 'Diagnose',
      note: 'free, 20 minutes',
      body: 'We walk through your current production process and find where the time actually goes. If I’m not the right fit, I’ll tell you on that call and point you somewhere better.',
    },
    {
      label: 'Scope',
      note: null,
      body: 'I map the pipeline or the production plan, with a fixed price and a delivery date. You approve it before anything is built.',
    },
    {
      label: 'Build',
      note: null,
      body: 'You see working output every week, not a status update. Nothing is a black box.',
    },
    {
      label: 'Hand over, or keep running',
      note: null,
      body: 'Systems are handed over documented and owned by you. Retainers keep running with a monthly review and a standing cost ceiling.',
    },
  ],
} as const

export const DIFFERENTIATOR = {
  h2: 'Why the combination matters',
  body: [
    'Most people who can build automation have never had to make an ad look right. Most people who can make an ad look right have never shipped production code.',
    'I’ve spent ten years in 3D and CGI — product visualisation, animation, motion graphics — and the last several building the systems that produce that work at scale. That means the pipeline I build is designed by someone who knows what breaks a render at 2am, and the creative I produce is designed by someone who knows it has to survive automation.',
    'It’s an unusual pairing. It’s also the entire reason the systems work.',
  ],
} as const

export const ABOUT_STRIP = {
  h2: 'Gerald Jove',
  body: '3D artist and creative-automation engineer, based in Metro Manila. Ten years making product visuals and animation for brands; now building the production systems behind them.',
  link: { label: 'More about me', href: '/about' },
} as const

export const CLOSING = {
  h2: 'Let’s find out where your bottleneck actually is.',
  body: 'Twenty minutes, no pitch. You’ll leave with a clear read on whether your production problem is a process problem, a tooling problem, or a capacity problem — whether or not you work with me.',
} as const
