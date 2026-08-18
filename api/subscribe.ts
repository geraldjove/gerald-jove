/**
 * Newsletter subscribe — Mailchimp, server side.
 *
 * ⚠ THIS FUNCTION EXISTS BECAUSE MAILCHIMP HAS NO CORS, AND THAT IS NOT A
 * PREFERENCE. Mailchimp deliberately serves no `Access-Control-Allow-Origin` on
 * its subscribe endpoints, so a browser `fetch` cannot reach them. The two
 * browser-only workarounds both fail against this site:
 *
 *   1. Native form POST to `<dc>.list-manage.com/subscribe/post` — works, but
 *      navigates the visitor away to a Mailchimp-branded confirmation page.
 *   2. `/subscribe/post-json` + JSONP — injects a <script> from list-manage.com,
 *      which `script-src 'self'` blocks outright. AGENTS.md rule 1.
 *
 * Going through this function instead means the browser only ever talks to its
 * own origin, so `connect-src` and `form-action` stay `'self'` and the API key
 * never reaches the client. The CSP got TIGHTER by adding a backend, not looser.
 *
 * Vercel Web Standard signature — no `@vercel/node`, no config. See
 * https://vercel.com/docs/functions/runtimes/node-js.
 *
 * ⚠ Reads `request.formData()`, NOT JSON, so ONE handler serves both the
 * enhanced path (fetch sends multipart) and the no-JS native form POST (sends
 * urlencoded). Do not "simplify" this to `request.json()` — that silently kills
 * the no-JS fallback, which nothing in the build would catch.
 */

/** Deliberately loose. Mailchimp is the authority on deliverability; this only
 *  catches obvious typos before spending a round trip. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

interface Config {
  apiKey: string
  audienceId: string
  /** Mailchimp datacenter, e.g. `us21`. */
  dc: string
}

/**
 * ⚠ Returns null rather than throwing when unconfigured, and the caller answers
 * 503. A missing env var is an operator error, not a visitor error — it must not
 * read as "your address was rejected".
 */
function config(): Config | null {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
  if (!apiKey || !audienceId) return null

  /* The datacenter is the suffix of the key itself (`…-us21`), so it is derived
     rather than asked for again — one fewer env var to set inconsistently.
     MAILCHIMP_SERVER_PREFIX overrides it if a key ever stops carrying one. */
  const dc = process.env.MAILCHIMP_SERVER_PREFIX ?? apiKey.split('-')[1]
  if (!dc) return null

  return { apiKey, audienceId, dc }
}

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })

/** Where a no-JS subscribe lands. Must stay a real page in the build. */
const SUCCESS_PATH = '/thank-you'

/**
 * ⚠ The response SHAPE depends on how the form was submitted, not on the result.
 * `fetch` sets `Accept: application/json` and branches on the status; the native
 * no-JS POST is a document navigation, so a bare 204 would leave the visitor on
 * the page with no sign anything happened. It gets a 303 instead.
 *
 * This is invisible with JS enabled, which is exactly how it would ship broken.
 */
const ok = (wantsJson: boolean): Response =>
  wantsJson
    ? new Response(null, { status: 204 })
    // 303 so the browser re-issues as GET and a refresh cannot resubmit.
    : new Response(null, { status: 303, headers: { location: SUCCESS_PATH } })

const fail = (wantsJson: boolean, status: number, message: string): Response =>
  wantsJson
    ? json({ error: message }, status)
    : new Response(message, {
        status,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      })

export async function POST(request: Request): Promise<Response> {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json')

  const cfg = config()
  if (!cfg) {
    return fail(wantsJson, 503, 'The newsletter is not configured on this deployment.')
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return fail(wantsJson, 400, 'Malformed request.')
  }

  /* Same honeypot name the contact form uses. A bot that fills it is answered as
     SUCCESS and nothing is sent — telling it that it failed only teaches it to
     retry with the field removed. */
  if (String(form.get('_gotcha') ?? '').trim()) return ok(wantsJson)

  const email = String(form.get('email') ?? '').trim()
  if (!EMAIL.test(email)) return fail(wantsJson, 400, 'Enter a valid email address.')

  /* ⚠ `pending`, NOT `subscribed`. `pending` triggers Mailchimp's confirmation
     email, i.e. double opt-in: the address is only added once its owner clicks
     through. It is the honest default for a form that collects an address with
     one field and no account, and it is what keeps this defensible under GDPR
     and CAN-SPAM. Switching to `subscribed` adds people who never confirmed. */
  const res = await fetch(
    `https://${cfg.dc}.api.mailchimp.com/3.0/lists/${cfg.audienceId}/members`,
    {
      method: 'POST',
      headers: {
        // Mailchimp Basic auth: any username, the API key as the password.
        authorization: `Basic ${Buffer.from(`anystring:${cfg.apiKey}`).toString('base64')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email_address: email, status: 'pending' }),
    },
  )

  if (res.ok) return ok(wantsJson)

  const detail = (await res.json().catch(() => ({}))) as { title?: string }

  /* ⚠ An address already on the list answers 204, the same as a new one, and
     that is deliberate. Reporting "you are already subscribed" turns this form
     into an oracle that discloses whether a given address is on Gerald's list to
     anyone who can type. Nothing is gained by telling the honest visitor. */
  if (res.status === 400 && detail.title === 'Member Exists') return ok(wantsJson)

  /* Log for the operator, tell the visitor nothing about Mailchimp — the vendor
     is an implementation detail and its error strings are not visitor copy. */
  console.error('[subscribe] mailchimp', res.status, detail.title ?? '(no title)')
  return fail(wantsJson, 502, 'Could not subscribe right now. Please try again.')
}

/** Anything that is not a POST. Keeps the route from 405-ing as a Vercel default. */
export function GET(): Response {
  return json({ error: 'Method not allowed.' }, 405)
}
