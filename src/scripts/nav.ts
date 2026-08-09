/**
 * Mobile navigation toggle.
 *
 * Vanilla rather than a framework island on purpose: hydrating a component for
 * a disclosure button would put the Vue runtime on every static page. Vue is
 * reserved for the contact form, which genuinely needs it.
 */
function init(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]')
  const panel = document.querySelector<HTMLElement>('[data-nav-panel]')
  if (!toggle || !panel) return

  const iconOpen = toggle.querySelector<SVGElement>('[data-icon="menu"]')
  const iconClose = toggle.querySelector<SVGElement>('[data-icon="close"]')

  const setOpen = (open: boolean): void => {
    toggle.setAttribute('aria-expanded', String(open))
    panel.hidden = !open
    iconOpen?.classList.toggle('hidden', open)
    iconClose?.classList.toggle('hidden', !open)
  }

  setOpen(false)

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true')
  })

  // Escape closes, and focus returns to the control that opened it.
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    if (toggle.getAttribute('aria-expanded') !== 'true') return
    setOpen(false)
    toggle.focus()
  })

  // Following a link inside the panel should close it.
  panel.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false)
  })

  // Leaving the mobile breakpoint should reset state rather than trap the menu.
  const desktop = window.matchMedia('(min-width: 48rem)')
  desktop.addEventListener('change', (event) => {
    if (event.matches) setOpen(false)
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true })
} else {
  init()
}

export {}
