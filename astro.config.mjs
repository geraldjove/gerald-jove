// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

import { unresolvedBlanks } from './src/content/blanks.js'

// Astro runs a client and a server Vite build; report open blanks once, not twice.
let blanksReported = false

/**
 * Static output on purpose. Every route ships as real HTML, which is what closes
 * the audit's H2 (empty SPA for crawlers and link previews) and M2 (soft 404s).
 * The SPA rewrite that used to live in vercel.json has been removed to match.
 */
export default defineConfig({
  site: 'https://geraldjove.com',
  output: 'static',
  trailingSlash: 'never',
  /**
   * No UI framework integration. The only interactive parts — the mobile nav
   * toggle and the contact form — are static markup enhanced by small bundled
   * scripts. A framework island would make Astro inject an inline hydration
   * runtime, which the live `script-src 'self'` CSP blocks, and would ship a
   * framework runtime for two disclosure widgets.
   */
  integrations: [
    sitemap({
      // /thank-you is a post-submit destination, not a page worth ranking.
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
  build: {
    // Keep CSS in a real stylesheet rather than a <style> block, for the same
    // CSP reason as the scripts below.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      /**
       * Never inline a bundled script into the HTML.
       *
       * The live Content-Security-Policy sets `script-src 'self'` with no
       * 'unsafe-inline' and no nonce (a static host cannot issue one), so an
       * inlined <script> is silently blocked by the browser — the mobile nav
       * and the scroll reveals would simply not run in production while
       * working perfectly in dev. Verified by grepping the build output for
       * inline <script> blocks.
       */
      assetsInlineLimit: 0,
    },
    plugins: [
      tailwindcss(),
      {
        // Surfaces every unfilled [[ NEEDS YOUR INPUT ]] from the copy document at
        // build time. These are deliberately null, never invented — see
        // src/content/blanks.js and tasks/PRE-LAUNCH-CHECKLIST.md.
        name: 'report-unresolved-content-blanks',
        apply: 'build',
        buildStart() {
          if (blanksReported) return
          blanksReported = true
          const open = unresolvedBlanks()
          if (!open.length) return
          const blocking = open.filter((b) => b.blocksPublication)
          console.log(
            `\n[33m⚠  ${open.length} unresolved content blank(s); ` +
              `${blocking.length} block publication.[0m`,
          )
          for (const b of open) {
            console.log(`   ${b.blocksPublication ? '[31m[BLOCKING][0m' : '          '} ${b.id} — ${b.what}`)
          }
          console.log('   Sections depending on these are omitted from the build, not faked.\n')
        },
      },
    ],
  },
})
