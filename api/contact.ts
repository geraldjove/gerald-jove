/**
 * Contact form — HubSpot Forms API, server side.
 *
 * Replaces the direct-to-Formspree POST. HubSpot's submission endpoint
 * (`api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}`)
 * needs no API key and DOES support CORS, so this could have been called from
 * the browser. It is proxied anyway, for three reasons:
 *
 *   1. `connect-src` and `form-action` stay `'self'`. No vendor host is added to
 *      the CSP, and swapping HubSpot for Klaviyo later touches no header.
 *   2. HubSpot's endpoint only accepts JSON, so a browser-direct version would
 *      have broken the no-JS native form POST — audit finding H3, deliberately
 *      fixed once already. Here the same handler serves both.
 *   3. The portal id and form guid stop being published in the page source.
 *
 * ⚠ SWAPPING TO KLAVIYO IS A CHANGE TO THIS FILE ONLY. Gerald asked for
 * "HubSpot or Klaviyo" and HubSpot is what shipped: the contact form is a
 * five-field qualification form whose answers want to become a sales
 * conversation, which is a CRM job. Klaviyo is built around email marketing and
 * ecommerce events. If that call is wrong, replace `submitToHubSpot` — nothing
 * else in the repository knows which vendor is behind this route.
 *
 * Vercel Web Standard signature — no `@vercel/node`, no config.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Where a no-JS submission lands. Must stay a real page in the build. */
const SUCCESS_PATH = '/thank-you'

interface Config {
  portalId: string
  formGuid: string
}

function config(): Config | null {
  const portalId = process.env.HUBSPOT_PORTAL_ID
  const formGuid = process.env.HUBSPOT_FORM_GUID
  if (!portalId || !formGuid) return null
  return { portalId, formGuid }
}

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })

/**
 * ⚠ The response SHAPE depends on how the form was submitted, not on the result.
 * `fetch` sets `Accept: application/json` and wants a body it can branch on; the
 * native no-JS POST is a document navigation and wants a redirect, or the
 * visitor is left staring at raw JSON. Getting this wrong is invisible with JS
 * enabled, which is exactly how it would ship broken.
 */
function respond(wantsJson: boolean, ok: boolean, status: number, message?: string): Response {
  if (wantsJson) return ok ? new Response(null, { status: 204 }) : json({ error: message }, status)
  // 303 so the browser re-issues as GET and a refresh cannot resubmit the form.
  if (ok) return new Response(null, { status: 303, headers: { location: SUCCESS_PATH } })
  return new Response(message ?? 'Something went wrong.', {
    status,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}

async function submitToHubSpot(cfg: Config, fields: FormData, pageUri: string): Promise<Response> {
  /* HubSpot takes a flat name/value list. `objectTypeId: '0-1'` is the Contact
     object; anything mapped to a property the form does not define is ignored
     rather than rejected, so field names here must match the HubSpot form. */
  const payload = {
    fields: Array.from(fields.entries())
      .filter(([name, value]) => name !== '_gotcha' && name !== '_next' && String(value).trim())
      .map(([name, value]) => ({ objectTypeId: '0-1', name, value: String(value) })),
    context: { pageUri, pageName: 'Contact — geraldjove.com' },
  }

  return fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${cfg.portalId}/${cfg.formGuid}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    },
  )
}

export async function POST(request: Request): Promise<Response> {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json')

  const cfg = config()
  if (!cfg) {
    return respond(wantsJson, false, 503, 'The contact form is not configured on this deployment.')
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return respond(wantsJson, false, 400, 'Malformed request.')
  }

  /* Honeypot. Answered as SUCCESS on purpose: a bot that is told it failed
     retries with the field removed. The client script does the same thing so a
     real visitor never sees a difference. */
  if (String(form.get('_gotcha') ?? '').trim()) return respond(wantsJson, true, 204)

  const email = String(form.get('email') ?? '').trim()
  if (!EMAIL.test(email)) {
    return respond(wantsJson, false, 400, 'Enter a valid email address.')
  }

  let res: Response
  try {
    res = await submitToHubSpot(cfg, form, request.headers.get('referer') ?? 'https://geraldjove.com/contact')
  } catch (error) {
    console.error('[contact] hubspot unreachable', error)
    return respond(wantsJson, false, 502, 'Could not send your message right now. Please try again.')
  }

  if (res.ok) return respond(wantsJson, true, 204)

  /* HubSpot returns 400 with a per-field breakdown. It is logged for the
     operator and NOT shown: its wording names HubSpot internals and would leak
     the vendor and the form guid into visitor-facing copy. */
  console.error('[contact] hubspot', res.status, await res.text().catch(() => ''))
  return respond(wantsJson, false, 502, 'Could not send your message right now. Please try again.')
}

export function GET(): Response {
  return json({ error: 'Method not allowed.' }, 405)
}
