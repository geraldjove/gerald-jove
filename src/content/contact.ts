/**
 * Contact page copy and form schema — verbatim from
 * docs/website-copy-2026-08-09.md §5.
 *
 * The form's real job is qualification, not message-taking. Budget band is the
 * required field: the audit calls it the most important field on the site,
 * because it is what converts enquiries into a sustainable rate.
 */

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvoeqbpk'

export interface Field {
  name: string
  label: string
  type: 'text' | 'email' | 'select' | 'textarea'
  required: boolean
  placeholder?: string
  autocomplete?: string
  options?: string[]
  rows?: number
}

export const FIELDS: Field[] = [
  { name: 'name', label: 'Your name', type: 'text', required: true, autocomplete: 'name' },
  {
    name: 'email',
    label: 'Work email',
    type: 'email',
    required: true,
    placeholder: 'you@company.com',
    autocomplete: 'email',
  },
  { name: 'company', label: 'Company', type: 'text', required: false, autocomplete: 'organization' },
  {
    name: 'service',
    label: 'What do you need?',
    type: 'select',
    required: true,
    options: [
      'Creative automation system',
      'Managed ad creative',
      '3D product visuals',
      'Not sure yet',
    ],
  },
  {
    name: 'budget',
    label: 'Budget range',
    type: 'select',
    required: true,
    options: ['Under $5,000', '$5,000–$10,000', '$10,000–$25,000', '$25,000+', 'Not sure yet'],
  },
  {
    name: 'timeline',
    label: 'When do you need this?',
    type: 'select',
    required: true,
    options: ['Now', 'Next quarter', 'Just exploring'],
  },
  {
    name: 'message',
    label: 'What’s the bottleneck?',
    type: 'textarea',
    required: true,
    rows: 6,
    placeholder: 'Tell me what’s slowing production down — the more specific, the better.',
  },
]

export const CONTACT = {
  h1: 'Tell me where your production breaks.',
  subheadline:
    'Twenty minutes on a call, no pitch. If I’m not the right fit, I’ll say so and point you somewhere better.',
  formIntro: 'The more specific you are about the bottleneck, the more useful the call is.',
  submitLabel: 'Send it over',
  submittingLabel: 'Sending…',
  success: {
    heading: 'Got it — thanks.',
    body: 'I read every message myself and reply within two business days. If it’s urgent, say so in a reply to the confirmation email and I’ll move it up.',
    link: { label: 'Meanwhile, here’s how I work', href: '/services' },
  },
  error: {
    heading: 'That didn’t send.',
    /**
     * Blank #8. Until Gerald picks a fallback, this stays neutral — the audit
     * advises against publishing a raw email address, so none is shown.
     */
    fallbackBlank: 'contactErrorFallback',
    neutralBody: 'Try again in a moment.',
  },
  alternative: {
    prefix: 'Prefer LinkedIn?',
    label: 'Message me there',
    href: 'https://www.linkedin.com/in/geraldjove',
  },
} as const

export const THANK_YOU = {
  h1: 'Got it — thanks.',
  body: 'I read every message myself and reply within two business days. If it’s urgent, say so in a reply to the confirmation email and I’ll move it up.',
  link: { label: 'Meanwhile, here’s how I work', href: '/services' },
} as const
