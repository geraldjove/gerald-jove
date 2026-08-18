/**
 * "My Story" — scroll-pinned reading panel.
 *
 * The section becomes a tall scroll track with a sticky full-viewport panel.
 * The heading stays put while the story column is drawn upward through a masked
 * stage, so each sentence fades in at the top edge and out at the bottom as the
 * reader scrolls, and the page continues to the next section once the column
 * has run out.
 *
 * ⚠ THIS IS MOTION'S VANILLA API, NOT `motion/react`, AND THAT IS FORCED.
 * `motion/react` needs a React island, Astro injects an INLINE hydration runtime
 * for every `client:*` directive, and the production CSP is `script-src 'self'`
 * with no nonce — so a React island is silently dead in production. AGENTS.md
 * rule 2 records a Vue island built and removed for exactly this. `motion`'s
 * `scroll()` is framework-agnostic and bundles like any other module, which is
 * why it is safe here. Do not "upgrade" this to `motion/react`.
 *
 * ⚠ `scroll(callback)` RATHER THAN `scroll(animate(...))`, AND THE REASON IS
 * WEIGHT — measured, not assumed. Handing `scroll()` an `animate()` playback
 * gets native ScrollTimeline where the browser supports it, so the tween runs
 * off the main thread; it also pulls Motion's whole animation engine in, and
 * this page's bundle measured **24.1 KB gzipped**. The callback form writes one
 * transform per scroll frame and measured **6.4 KB gzipped** — the same 17.7 KB
 * the rest of this site spends on everything else, several times over. For a
 * SINGLE transform the visual result is indistinguishable and the per-frame
 * work is one style write, so the cheap form wins.
 *
 * If the pin ever feels less than smooth on a weak device, swapping back to
 * `animate` + `scroll` is the fix, and it costs 17.7 KB on /about alone.
 *
 * `motion/mini` is NOT an option: it exports `animate` and `animateSequence`
 * only, with no `scroll`.
 *
 * From the framer-motion skill, and applied deliberately:
 *  - only `transform` is written, never `top` or `height`, so no layout is
 *    recalculated on scroll;
 *  - `will-change: transform` is set on the column in CSS;
 *  - `prefers-reduced-motion` removes the pin entirely rather than shortening it.
 *
 * ⚠ Progressive enhancement is REQUIRED here, not a nicety. AGENTS.md: content
 * must never depend on JS to appear. The pinned layout lives behind
 * `[data-pinned]`, which only this file sets — so with no JS the section is an
 * ordinary column and all thirty-one lines are readable. Never move the pinned
 * geometry into the default CSS.
 */
import { scroll } from 'motion'

/**
 * Track length, in viewports. One screen is the panel itself, the rest is
 * travel. Derived from how much column actually overflows the stage, so a
 * narrow viewport — where the same copy wraps far taller — earns a longer track
 * instead of racing. Clamped so it can neither be a non-event nor a chore.
 *
 * ⚠ MIN is 3, not 2, and the difference is the whole effect. The bare formula
 * returns 2 at desktop size (935px of overflow against a 1015px viewport),
 * which drags the column at ~1:1 with the scroll — the copy then moves exactly
 * as it would with no pin at all, and the only visible change is that the
 * heading stays put. A third screen halves that to ~46%, so the page holds
 * still and the story is drawn through it, which is what was asked for.
 */
const MIN_SCREENS = 3
const MAX_SCREENS = 5

/** Below this the column fits and pinning would be a pin over nothing. */
const MIN_RANGE_PX = 8

/**
 * Depth of the stage's fade, as a fraction of stage height. Must stay in step
 * with the `mask-image` stops in AboutStory.astro, which read it back from the
 * `--story-fade` this file sets.
 */
const FADE_RATIO = 0.16

/**
 * A little more than the fade, so the first and last lines sit clear of it
 * rather than exactly on the boundary.
 */
const FADE_BUFFER_PX = 6

type Teardown = () => void

function pin(section: HTMLElement): Teardown | null {
  const stage = section.querySelector<HTMLElement>('[data-story-stage]')
  const column = section.querySelector<HTMLElement>('[data-story-column]')
  if (!stage || !column) return null

  // Switch the CSS into pinned geometry BEFORE measuring: the stage only has
  // its constrained height once `[data-pinned]` applies, and measuring first
  // would read the unpinned column and produce a range of zero.
  section.dataset.pinned = 'true'

  /**
   * Inset the column by the fade depth, top and bottom.
   *
   * ⚠ Without this the FIRST and LAST lines are never fully legible. The column
   * starts flush with the stage's top edge, which is where the mask is still
   * transparent, so at progress 0 the opening line is half dissolved; the same
   * happens to the closing line against the bottom edge at progress 1. Padding
   * the column by the fade depth means travel starts with the first line just
   * past the opaque threshold and ends with the last line just short of it.
   *
   * ⚠ It must be set in JS, and BEFORE `scrollHeight` is read. A percentage
   * padding in CSS would resolve against the stage's WIDTH, not its height,
   * which is the wrong axis entirely — and the padding has to be inside the
   * measurement, because it is part of the distance the column travels.
   */
  const fade = Math.round(stage.clientHeight * FADE_RATIO)
  stage.style.setProperty('--story-fade', `${fade}px`)
  column.style.paddingBlock = `${fade + FADE_BUFFER_PX}px`

  const range = column.scrollHeight - stage.clientHeight
  if (range <= MIN_RANGE_PX) {
    stage.style.removeProperty('--story-fade')
    column.style.paddingBlock = ''
    delete section.dataset.pinned
    return null
  }

  const screens = Math.min(
    MAX_SCREENS,
    Math.max(MIN_SCREENS, 1 + Math.ceil(range / Math.max(window.innerHeight, 1))),
  )
  section.style.setProperty('--story-screens', String(screens))

  // ⚠ Snap markers used to be built here — one 1px x 100svh `.about-story__beat`
  // per screen. REMOVED 2026-08-18 with the page's `scroll-snap-type`. They were
  // never part of the pin: mandatory snap had no rest position inside this tall
  // track, so it flung the reader from the section start to the next section and
  // skipped the story; the markers gave it somewhere to stop. With no snap there
  // is nothing to defend against. `--story-screens` above still sets the track
  // height and is unrelated. Do not reinstate these without reinstating snap.

  const stop = scroll(
    (progress: number) => {
      column.style.transform = `translateY(${-progress * range}px)`
    },
    { target: section, offset: ['start start', 'end end'] },
  )

  return () => {
    stop()
    column.style.transform = ''
    column.style.paddingBlock = ''
    stage.style.removeProperty('--story-fade')
    section.style.removeProperty('--story-screens')
    delete section.dataset.pinned
  }
}

function init(): void {
  const section = document.querySelector<HTMLElement>('[data-story-track]')
  if (!section) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  let teardown: Teardown | null = null

  const apply = (): void => {
    teardown?.()
    teardown = reduced.matches ? null : pin(section)
  }

  apply()
  reduced.addEventListener('change', apply)

  // Re-measure on resize: `range` depends on how the copy wraps, which changes
  // with width, and on the viewport height, which changes when mobile browser
  // chrome collapses. Debounced because each pass re-reads layout.
  let timer: number | undefined
  window.addEventListener('resize', () => {
    window.clearTimeout(timer)
    timer = window.setTimeout(apply, 150)
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true })
} else {
  init()
}

export {}
