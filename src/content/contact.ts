/**
 * Contact page copy and form schema.
 *
 * Every string below is transcribed verbatim from Figma frame `33:792`
 * (file 6Lgtxs8zSUzruc8zu8tY0T). The node id is recorded against each one so a
 * future edit can be checked against the design rather than against memory.
 *
 * ⚠ The form dropped from seven fields to five on 2026-08-17, per the Figma and
 * confirmed by Gerald. The removed two were `service` ("What do you need?") and
 * `budget` ("Budget range"). The Figma draws no equivalent of either.
 */

/**
 * ⚠ Same-origin since 2026-08-18. This was `https://formspree.io/f/mvoeqbpk`,
 * posted to directly from the browser; it now goes to `api/contact.ts`, which
 * forwards to HubSpot.
 *
 * Three things follow, and all three are easy to undo by accident:
 *   • `connect-src` and `form-action` are back to `'self'` — formspree.io was
 *     removed from both. Re-pointing this at any third-party host means
 *     re-widening the CSP in `vercel.json`.
 *   • The no-JS native POST still works, because the function reads
 *     `request.formData()` and answers a 303 to /thank-you.
 *   • Which CRM is behind it is not knowable from here, on purpose. Swapping
 *     HubSpot for Klaviyo touches `api/contact.ts` and nothing else.
 *
 * ⚠ It needs HUBSPOT_PORTAL_ID and HUBSPOT_FORM_GUID set in Vercel. Without
 * them the route answers 503 and the form reports a neutral failure — see
 * `.env.example`.
 */
export const CONTACT_ENDPOINT = '/api/contact'

export interface Field {
  name: string
  label: string
  /** Figma node id of the label text, for traceability. */
  node: string
  type: 'text' | 'email' | 'select' | 'textarea'
  required: boolean
  placeholder?: string
  autocomplete?: string
  options?: string[]
}

export const FIELDS: Field[] = [
  {
    name: 'name',
    label: 'Your name', // 33:518
    node: '33:518',
    type: 'text',
    required: true,
    placeholder: 'Your Full Name', // 33:532
    autocomplete: 'name',
  },
  {
    name: 'email',
    label: 'Your email', // 33:519
    node: '33:519',
    type: 'email',
    required: true,
    placeholder: 'yourname@email.com', // 33:533
    autocomplete: 'email',
  },
  {
    /**
     * Optional, as it has always been. The Figma draws no "(optional)" marker
     * beside it and this build does not add one — that suffix is the only text
     * on the card with no node behind it.
     */
    name: 'company',
    label: 'Company', // 33:521
    node: '33:521',
    type: 'text',
    required: false,
    placeholder: 'Your Company Name', // 33:534
    autocomplete: 'organization',
  },
  {
    /**
     * ⚠ Figma `33:535` draws "Now" in white — the colour it uses for a filled
     * value, not for a placeholder. Shipping that literally would attribute an
     * urgency answer to every visitor who never opened the control, and would
     * make the required-select validation unreachable. The control therefore
     * opens on an empty option; "Now" stays selectable.
     */
    name: 'timeline',
    label: 'When do you need this?', // 33:523
    node: '33:523',
    type: 'select',
    required: true,
    options: ['Now', 'Next quarter', 'Just exploring'],
  },
  {
    name: 'message',
    label: "What's slowing you down?", // 33:525 — straight apostrophe, as in the design
    node: '33:525',
    type: 'textarea',
    required: true,
    // 33:537. The blank line between the two sentences is in the design.
    placeholder:
      'Tell me what is making creative production difficult or slow.\n\nThe more details you can share, the more useful our call will be.',
  },
]

export const CONTACT = {
  /**
   * 33:507 — Poppins Bold 64px, centred, two colours in one text node. The
   * accent run begins mid-sentence, so the heading is stored as two parts
   * rather than one string.
   */
  h1: {
    lead: 'Tell me what is ',
    accent: 'slowing your team down.',
  },

  /** 33:508 — Roboto Condensed 24px, centred. One entry per paragraph. */
  body: [
    'You do not need a perfect brief.',
    'Just tell me what is taking too much time.',
    'We can talk about it for 20 minutes and figure out whether I can help.',
    'No long sales call.',
    'If I do not think I am the right fit, I will tell you.',
  ],

  /** 33:511 — Roboto Condensed Bold 38px. NOT Poppins; only the h1 is Poppins on this page. */
  formHeading: 'Contact Form',

  /** 33:529 — Poppins Bold, black on the accent fill. */
  submitLabel: 'Send Message',
  submittingLabel: 'Sending…',

  /**
   * No node supplies this. Reusing the wording already in the codebase rather
   * than authoring a new line — see AGENTS.md rule 6.
   */
  selectPlaceholder: 'Select one',

  /**
   * Runtime states, INLINE VARIANT.
   *
   * ⚠ These are no longer what a visitor with JavaScript sees. As of the
   * 33:648 / 33:649 popups these are the fallback path only: they render in
   * the page for a browser without `<dialog>.showModal()`, and the success
   * panel is also what remains behind the popup once it is dismissed. The
   * popup copy is `DIALOGS` below — change both, or the two states disagree.
   */
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
} as const

/**
 * The two outcome popups — Figma `33:648` (Success) and `33:649` (Error).
 *
 * ⚠ EVERY STRING HERE IS THE FIGMA'S OWN TEXT NODE, not authored copy. The
 * design now supplies wording for states it previously left blank, so these
 * supersede `CONTACT.success` / `CONTACT.error` for anyone with JavaScript.
 * The older strings are kept, not deleted — see the note on them above.
 *
 * ⚠ Blank #8 (`contactErrorFallback`) is NOT resolved by this. 33:592 says what
 * failed, not how else to reach Gerald, so the popup publishes no address and
 * the blank still blocks nothing. Resolving it stays his call.
 */
export const DIALOGS = {
  success: {
    node: '33:648',
    heading: 'Success!', // 33:566
    body: 'Thanks. Your message was sent. I read every message myself and normally reply within two business days.', // 33:568
    /* 33:571. The arrow is drawn inside the text node; it is rendered as a
       separate aria-hidden span so a screen reader does not read it as a word. */
    action: { label: 'In the meantime, you can see how I work here', href: '/services', arrow: true },
  },
  error: {
    node: '33:649',
    heading: 'Error!', // 33:591
    body: 'Something went wrong and your message was not sent.', // 33:592
    /**
     * 33:595. ⚠ REPORTED DEVIATION IN BEHAVIOUR, NOT IN COPY. The design draws
     * this as a pill identical to the success one, but its text is a statement
     * rather than an action, and there is nowhere for it to lead. A pill that
     * looks pressable and does nothing is the worse of the two options, so it
     * dismisses the popup and returns the visitor to their filled-in form —
     * which is what "try again" means here. No `href`, so `FormDialog` renders
     * it as a button.
     */
    action: { label: 'Please try again in a moment.' },
  },
} as const

export const THANK_YOU = {
  h1: 'Got it — thanks.',
  body: 'I read every message myself and reply within two business days. If it’s urgent, say so in a reply to the confirmation email and I’ll move it up.',
  link: { label: 'Meanwhile, here’s how I work', href: '/services' },
} as const
