/**
 * Where "Book a call" goes.
 *
 * ⚠ **THIS MODULE IMPORTS NOTHING, AND MUST NOT START.** It is a leaf on
 * purpose. `site.ts` already imports `services.ts` (to validate the footer's
 * deep links against `SERVICE_DETAILS`), so if `services.ts` imported
 * `site.ts` back for the booking href the two would form a cycle — and because
 * these are top-level `const`s, the cycle fails as a temporal-dead-zone error
 * at module init, not as a nice circular-import warning. Both `site.ts` and
 * `services.ts` import from here instead, and neither imports the other's
 * booking value.
 */

/**
 * Calendly scheduling link, e.g. `https://calendly.com/geraldjove/20min`.
 *
 * ⚠ **Book a Call needs no backend, and adding one would be worse.** Calendly is
 * a hosted scheduler: every "Book a call" button simply points at it. There is
 * nothing to proxy, no key to hide, and no request this site makes. It is the
 * one of the three integrations that is finished the moment this line is filled.
 *
 * ⚠ **A LINK, NOT AN EMBED, and that is why it needs no CSP change.** Calendly's
 * inline/popup widget loads `assets.calendly.com/assets/external/widget.js` and
 * injects an iframe, so embedding it their way needs BOTH:
 *   • `script-src https://assets.calendly.com` — a third-party script, against
 *     the whole intent of AGENTS.md rule 1; and
 *   • `frame-src https://calendly.com` — `frame-src` is not declared today, so
 *     it falls back to `default-src 'self'` and every foreign frame is blocked.
 *
 * An iframe embed WITHOUT their script is possible and needs only the
 * `frame-src` line, no third-party JS. That is the upgrade path if booking
 * should happen on-site. It also means authoring a section the Figma does not
 * draw, which is why it was not done unasked.
 *
 * While this is null every CTA falls back to `/contact` — where they already
 * pointed, and still a real page with a real form. Nothing breaks unset.
 */
export const CALENDLY_URL: string | null =
  'https://calendly.com/geraldjove/gerald-jove-creative-ai-solutions'

/**
 * ⚠ THE CALENDLY EVENT IS 30 MINUTES AND THE SITE SAYS 20. THAT IS CORRECT.
 *
 * Gerald books a 30-minute slot for a 20-minute call: the extra 10 minutes is
 * deliberate slack for a prospect who joins late or runs over. The call he is
 * selling is 20 minutes, so every "Book a 20-minute call" and every sentence
 * describing the call is accurate and must stay at 20.
 *
 * Recorded because the mismatch reads exactly like a copy bug from the outside.
 * On 2026-08-18 an agent read the event's `duration: 30` against the page's "20
 * minutes", concluded the page was wrong, and changed two Figma-sourced strings
 * to 30 — making the site understate the offer. Reverted the same day
 * (`ed245ab`, then its revert) once Gerald explained the buffer.
 *
 * **Do not reconcile these two numbers.** If the call length itself ever
 * changes, the source of truth is what Gerald sells, not what Calendly reserves.
 */

/**
 * The single destination for every "Book a call" button. ONE constant so the
 * fallback cannot disagree with itself across three content modules — `home.ts`
 * has two of these, `services.ts` one, and `site.ts` two more.
 */
export const BOOKING_HREF: string = CALENDLY_URL ?? '/contact'

/* ⚠ There is deliberately NO `BOOKING_IS_EXTERNAL` export, and no
   `target="_blank"` on any booking link.

   Once `CALENDLY_URL` is set these five call sites — `NAV_CTA`, `PRIMARY_CTA`,
   two in `home.ts`, one in `services.ts` — navigate away in the SAME tab. A new
   tab would be friendlier, but there is no shared CTA component to put it in
   (`fx-pill` is a class, not a component), so it would mean the same attribute
   pasted into five templates, and a half-done version where the nav opens a tab
   and the page buttons do not is worse than uniform behaviour.

   If it is wanted, do all five in one change. */
