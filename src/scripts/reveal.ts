/**
 * Scroll reveal.
 *
 * Deliberately not a framework island: hydrating every section just to fade it
 * in would ship the whole Vue runtime on otherwise-static pages and give up the
 * reason this site is built with Astro at all.
 *
 * Content is visible by default (see .reveal in global.css). This script only
 * ever *hides* things, and only ones already below the fold, so:
 *   - with no JS, everything renders normally;
 *   - with reduced motion requested, nothing is armed and nothing animates;
 *   - nothing above the fold is hidden after paint, so there is no flash.
 */
const ARM_RATIO = 0.92

function init(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!('IntersectionObserver' in window)) return

  const candidates = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
  if (candidates.length === 0) return

  const armLine = window.innerHeight * ARM_RATIO
  const armed: HTMLElement[] = []

  for (const el of candidates) {
    // Already on screen: leave it alone rather than hide-then-show it.
    if (el.getBoundingClientRect().top < armLine) continue
    el.classList.add('reveal-armed')
    armed.push(el)
  }

  if (armed.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.04 },
  )

  for (const el of armed) observer.observe(el)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true })
} else {
  init()
}

export {}
