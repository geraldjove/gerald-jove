/**
 * Progressive enhancement for the qualification form.
 *
 * Without this script the form still posts natively to Formspree and returns
 * the visitor to /thank-you. With it, the submission happens over fetch, the
 * visitor never leaves the site, and the success state replaces the form —
 * audit finding H3.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

function init(): void {
  const root = document.querySelector<HTMLElement>('[data-contact-root]')
  const form = root?.querySelector<HTMLFormElement>('[data-contact-form]')
  const success = root?.querySelector<HTMLElement>('[data-form-success]')
  const errorBox = form?.querySelector<HTMLElement>('[data-form-error]')
  const submit = form?.querySelector<HTMLButtonElement>('[data-submit]')
  if (!root || !form || !success || !errorBox || !submit) return

  const controls = Array.from(
    form.querySelectorAll<Control>('[data-label]'),
  )
  const submitLabel = submit.textContent?.trim() ?? 'Send it over'

  const setFieldError = (control: Control, message: string | null): void => {
    const slot = form.querySelector<HTMLElement>(`[data-error-for="${control.name}"]`)
    if (slot) {
      slot.textContent = message ?? ''
      slot.hidden = !message
    }
    if (message) control.setAttribute('aria-invalid', 'true')
    else control.removeAttribute('aria-invalid')
  }

  const validate = (): Control | null => {
    let firstInvalid: Control | null = null

    for (const control of controls) {
      const required = control.dataset.required === 'true'
      const value = control.value.trim()

      let message: string | null = null
      if (required && !value) {
        // Generic wording on purpose: several labels are questions ("What do you
        // need?"), and "<label> is required." reads as broken English against
        // them. The message is tied to its field by aria-describedby, so the
        // field's own label already supplies the context.
        message = control.tagName === 'SELECT' ? 'Please select an option.' : 'This field is required.'
      } else if (control.getAttribute('type') === 'email' && value && !EMAIL.test(value)) {
        message = 'Enter a valid email address.'
      }

      setFieldError(control, message)
      if (message && !firstInvalid) firstInvalid = control
    }

    return firstInvalid
  }

  // Clear a field's error as soon as the visitor starts fixing it.
  for (const control of controls) {
    control.addEventListener('input', () => {
      if (control.getAttribute('aria-invalid') === 'true') setFieldError(control, null)
    })
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (submit.disabled) return

    errorBox.hidden = true

    const firstInvalid = validate()
    if (firstInvalid) {
      firstInvalid.focus()
      return
    }

    const data = new FormData(form)

    // Bots that fill the honeypot get a success state and nothing sent.
    if (String(data.get('_gotcha') ?? '')) {
      form.hidden = true
      success.hidden = false
      return
    }
    data.delete('_gotcha')
    data.delete('_next')

    submit.disabled = true
    submit.textContent = submit.dataset.sending ?? 'Sending…'

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`)

      form.hidden = true
      success.hidden = false
      success.querySelector<HTMLElement>('[data-success-heading]')?.focus()
    } catch {
      // Nothing typed is discarded — the visitor can simply press send again.
      errorBox.hidden = false
      errorBox.focus()
    } finally {
      submit.disabled = false
      submit.textContent = submitLabel
    }
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true })
} else {
  init()
}

export {}
