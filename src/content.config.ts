import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
// `z` re-exported from astro:content is deprecated in Astro 7. Using the
// astro/zod subpath rather than a bare 'zod' import avoids depending on a
// package this project never declared.
import { z } from 'astro/zod'

/**
 * Case studies, on the audit's §6.3 skeleton:
 *   Context → Problem → What I built → Result → (Testimonial)
 *
 * `context`, `problem` and `built` are frontmatter rather than prose so that
 * every case study is forced onto the same skeleton and nothing gets written
 * free-hand. `resultBlank` and `testimonialBlank` point at src/content/blanks.js;
 * while those are null the corresponding block is omitted from the page — never
 * rendered as an empty "Result:" label.
 *
 * No client may be named here. The engagement is "a US creative agency".
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    service: z.string(),
    /** Home-page proof teaser. */
    teaser: z.string(),
    context: z.string(),
    problem: z.string(),
    built: z.string(),
    /** Key in blanks.js holding the hard outcome number, when there is one. */
    resultBlank: z.string().nullable().default(null),
    /** Literal result, once a real number exists and is written inline instead. */
    result: z.string().nullable().default(null),
    testimonialBlank: z.string().nullable().default(null),
    /** Set true to keep a case study out of the build. */
    draft: z.boolean().default(false),
  }),
})

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

export const collections = { work, insights }
