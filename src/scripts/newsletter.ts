/**
 * Progressive enhancement for the newsletter block.
 *
 * Without this script the form still posts natively to `/api/subscribe`, which
 * answers a 303 to /thank-you. With it, the submission happens over fetch and
 * the visitor never leaves the page they were reading — which matters more here
 * than on the contact page, because this block sits in the footer of whatever
 * they were part-way through.
 *
 * ⚠ Bundled, never inline. `script-src 'self'` blocks an inline <script>
 * silently in production while it works perfectly in dev — AGENTS.md rule 1.
 *
 * ⚠ There can be TWO instances on one page: `Footer` renders one and
 * `HomeClosing` renders another into the 24:230 panel. Everything below is
 * per-form, and ids are passed in by the component for exactly this reason.
 * Never `querySelector` a single form here.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function enhance(form: HTMLFormElement): void {
  const field = form.querySelector<HTMLInputElement>('input[type="email"]')
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  const success = form.querySelector<HTMLElement>('[data-newsletter-success]')
  const error = form.querySelector<HTMLElement>('[data-newsletter-error]')
  if (!field || !submit || !success || !error) return

  const submitLabel = submit.textContent?.trim() ?? ''

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (submit.disabled) return

    success.hidden = true
    error.hidden = true

    const value = field.value.trim()
    if (!EMAIL.test(value)) {
      /* Hand back to the browser's own validation rather than inventing a
         message: the input is `type="email" required`, so the native bubble is
         already localised and already wired to the field. */
      field.setCustomValidity('')
      form.reportValidity()
      field.focus()
      return
    }

    submit.disabled = true

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        // Selects the 204 branch in api/subscribe.ts rather than the 303.
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!response.ok) throw new Error(`/api/subscribe responded ${response.status}`)

      /* The row is replaced rather than reset. An empty field beside an
         unchanged button reads as "nothing happened", which is precisely the
         wrong impression when the next step is to go and check their email. */
      form.querySelector<HTMLElement>('.newsletter__row')?.setAttribute('hidden', '')
      success.hidden = false
    } catch {
      // Nothing typed is discarded — the visitor can simply press submit again.
      error.hidden = false
      submit.disabled = false
      submit.textContent = submitLabel
    }
  })
}

function init(): void {
  for (const form of document.querySelectorAll<HTMLFormElement>('[data-newsletter-form]')) {
    enhance(form)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true })
} else {
  init()
}

export {}
