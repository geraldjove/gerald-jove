import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
// `z` re-exported from astro:content is deprecated in Astro 7. Using the
// astro/zod subpath rather than a bare 'zod' import avoids depending on a
// package this project never declared.
import { z } from 'astro/zod'

/*
 * ⚠ The `work` collection was removed on 2026-08-18 with the `/work` route.
 * It held case studies on the audit's §6.3 skeleton (Context → Problem → What I
 * built → Result → Testimonial), one entry, and the schema is in git history if
 * case studies ever come back. Nothing else read it.
 *
 * The homepage's "What this looks like in real life" section does NOT — its two
 * narratives are hand-written in `home.ts` as `PROOF.cases`, and always were.
 * Do not wire that section to a collection to "restore" this one.
 */

/**
 * Phase 3 of the audit's plan — the authority content that makes the runway pay.
 *
 * Schema only. There is no /insights route and no article in this collection
 * yet, deliberately: shipping an empty section would be worse than shipping
 * none. When the first article is written, add the route.
 */
const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** The buyer question this article targets. */
    targets: z.string(),
    draft: z.boolean().default(true),
  }),
})

export const collections = { insights }
