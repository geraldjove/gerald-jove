/**
 * Progressive enhancement for the qualification form.
 *
 * Without this script the form still posts natively to `/api/contact`, which
 * answers a 303 to /thank-you. With it, the submission happens over fetch, the
 * visitor never leaves the site, and the success state replaces the form —
 * audit finding H3.
 *
 * ⚠ BOTH PATHS HIT THE SAME ROUTE, and that is what keeps the no-JS fallback
 * alive. `api/contact.ts` reads `request.formData()`, so it does not care that
 * fetch sends multipart and a native form POST sends urlencoded; it branches on
 * the `Accept` header to decide between 204 and a redirect. Sending JSON from
 * here instead would work perfectly with JS on and silently break the fallback.
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

  /* The static form keeps native constraint validation for the no-JS path.
     Once enhancement is active, disable the browser bubbles so the accessible
     inline errors below remain the single validation experience. */
  form.noValidate = true

  const controls = Array.from(
    form.querySelectorAll<Control>('[data-label]'),
  )
  const submitLabel = submit.textContent?.trim() ?? 'Send Message'

  /**
   * Outcome popups — Figma 33:648 / 33:649, rendered by FormDialog.astro.
   *
   * ⚠ FEATURE-DETECTED, NOT ASSUMED. `showModal` is what gives us `::backdrop`
   * (the blur), the focus trap and Escape; without it a `<dialog>` is an inert
   * block that `hidden` does not even hide. So every call site below falls back
   * to the in-page panels, which is also the no-JS path and is already built.
   */
  const dialogs = {
    success: root.querySelector<HTMLDialogElement>('[data-form-dialog="success"]'),
    error: root.querySelector<HTMLDialogElement>('[data-form-dialog="error"]'),
  }

  const canOpen = (d: HTMLDialogElement | null): d is HTMLDialogElement =>
    d !== null && typeof d.showModal === 'function'

  for (const dialog of [dialogs.success, dialogs.error]) {
    if (!canOpen(dialog)) continue

    // The X, and the error popup's pill. `close()` restores focus to whatever
    // was focused when the dialog opened, so nothing extra is needed here.
    for (const button of dialog.querySelectorAll<HTMLElement>('[data-dialog-close]')) {
      button.addEventListener('click', () => dialog.close())
    }

    /* Click outside to dismiss. The dialog's own box is exactly the card (the
       component zeroes its padding and border), so an event whose target is the
       dialog element itself landed on the backdrop, not on the card. */
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close()
    })
  }

  /** Success: the in-page panel is the state left behind once the popup closes. */
  const showSuccess = (): void => {
    form.hidden = true
    success.hidden = false
    if (canOpen(dialogs.success)) dialogs.success.showModal()
    else success.querySelector<HTMLElement>('[data-success-heading]')?.focus()
  }

  /** Failure: nothing typed is discarded — the form is still there behind it. */
  const showError = (): void => {
    if (canOpen(dialogs.error)) {
      dialogs.error.showModal()
      return
    }
    errorBox.hidden = false
    errorBox.focus()
  }

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
        // Generic wording on purpose: two labels are questions ("When do you
        // need this?", "What's slowing you down?"), and "<label> is required."
        // reads as broken English against them. The message is tied to its
        // field by aria-describedby, so the label already supplies the context.
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
      showSuccess()
      return
    }
    data.delete('_gotcha')
    data.delete('_next')

    submit.disabled = true
    submit.textContent = submit.dataset.sending ?? 'Sending…'

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        // Selects the 204/JSON branch in api/contact.ts rather than the 303.
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error(`/api/contact responded ${response.status}`)

      showSuccess()
    } catch {
      showError()
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
