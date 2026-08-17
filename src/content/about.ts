/**
 * About page copy — transcribed verbatim from Figma `6Lgtxs8zSUzruc8zu8tY0T`,
 * frame `33:284` (1440 x 6440). Every string below is the exact text of a Figma
 * text node; the node id is named in the comment above it.
 *
 * ⚠ Transcription rules applied here, and nowhere else:
 * - Nothing is reworded, corrected, shortened or added. See `story.body[23]`.
 * - Trailing spaces present in the Figma runs are trimmed; they are the artefact
 *   of typing in a text box and render identically in HTML.
 * - Apostrophes are the straight U+0027 the Figma uses, not curly quotes.
 * - "Mapúa" keeps its ú.
 *
 * Two-tone headings are stored as runs rather than one string, because the
 * design colours the second half accent and the split point is not derivable
 * from the text. `accent: true` marks the accent-coloured run.
 *
 * No client is named anywhere; the engagement is "a US creative agency", which
 * is the wording the Figma itself uses.
 */

export type Run = {
  readonly text: string
  readonly accent?: boolean
}

export const ABOUT = {
  /* --- Hero, node 32:90 -------------------------------------------------- */
  hero: {
    /** 33:110 — Poppins Bold 72.504px. The accent run comes FIRST here; every
     *  other heading on the page is white-then-accent. */
    heading: [
      { text: 'I make the creative.', accent: true },
      { text: ' I also build the system that helps ship it.' },
    ] as readonly Run[],

    /** 33:112 — Roboto Condensed Regular 24px, one blank line between. */
    body: [
      'I have spent about ten years working in 3D and CGI.',
      'Today, I use that experience to help marketing teams create more content without turning production into a mess.',
    ],

    /** 33:91. The Figma supplies no alt text; this reuses the alt the previous
     *  About page already carried rather than authoring a new line. */
    portraitAlt: 'Gerald Jove',
  },

  /* --- My Story, node 33:116 --------------------------------------------- */
  story: {
    /** 33:117 — Roboto Condensed Bold 64px, centred. */
    heading: [{ text: 'My ' }, { text: 'Story', accent: true }] as readonly Run[],

    /**
     * 33:119 is a SINGLE text node in Figma holding all thirty sentences, each
     * on its own line with a blank line between. Split only at those existing
     * blank lines — one <p> per entry, nothing merged and nothing split further.
     *
     * ⚠ `body[23]` ("Since 2026, ...") is transcribed exactly as the Figma has
     * it and is NOT to be corrected here. Gerald has flagged the date as needing
     * rewording and owes the replacement, which must also go into the Figma or
     * the next export reintroduces this wording.
     */
    body: [
      'I started working in 3D in 2015 at an animation studio in Manila.',
      'That job taught me something early.',
      'Making good work is only part of the job.',
      'You also need to solve problems, work fast, and hit deadlines.',
      'After that, I worked in multimedia and product visualization.',
      'I created realistic product renders, animation, medical visuals, and other digital content for different companies.',
      'Over time, I started seeing the same problem again and again.',
      'Clients did not need one perfect image.',
      'They needed lots of good images.',
      'Different angles.',
      'Different sizes.',
      'Different versions.',
      'Different ads.',
      'And they usually needed them fast.',
      'There is only so much one artist can make by hand.',
      'So I started learning how to build tools.',
      'First, I made small scripts.',
      'Then I started building full applications.',
      'Interfaces.',
      'Databases.',
      'Automation.',
      'APIs.',
      'Internal tools.',
      'Since 2026, I have worked on both creative production and the systems behind it for a US creative agency.',
      'I helped make the creative while also building tools that made the production process faster.',
      "When the agency's old no-code automation started having problems at higher volume, I helped move the workflow into a custom-coded system.",
      'That mix of creative and engineering is now the main type of work I want to do.',
      'I am not just a 3D artist who knows a little code.',
      'And I am not a developer who happens to know 3D.',
      'I use both skills to solve the same problem:',
    ],

    /** The last run of 33:119 — Roboto Condensed Bold 36px, accent. */
    close: 'Helping teams make more good creative without making production harder.',
  },

  /* --- What I Do, node 33:121 -------------------------------------------- */
  capabilities: {
    /** 33:123 — Roboto Condensed Bold 64px, centred. */
    heading: [{ text: 'What I ' }, { text: 'Do', accent: true }] as readonly Run[],

    /**
     * Three cards. `33:130` and `33:167` are bulleted lists in the Figma and are
     * rebuilt as real <ul>. `33:171` is NOT bulleted — it is two labelled prose
     * runs — so it is modelled separately below and rendered without markers.
     */
    cards: [
      {
        /** 33:129 / 33:130 */
        label: 'Creative',
        items: [
          '3D modeling',
          'Product visualization',
          'Sculpting',
          'Texturing',
          'Lighting',
          'Rendering',
          'Product animation',
          'Motion graphics',
          'Video editing',
        ],
      },
      {
        /** 33:166 / 33:167 */
        label: 'Engineering',
        items: [
          'Creative production systems',
          'Automation',
          'API integrations',
          'Internal tools',
          'Dashboards',
          'AI-assisted creative tools',
          'Production pipelines',
        ],
      },
    ],

    /** 33:170 / 33:171 — the third card. Two labelled groups, prose not bullets. */
    tools: {
      label: 'Tools',
      groups: [
        {
          label: 'For creative work:',
          body: 'Blender, Maya, 3ds Max, ZBrush, Substance Painter, Redshift, V-Ray, Arnold, Adobe Creative Cloud, and Figma.',
        },
        {
          label: 'For development:',
          body: 'React, Vue, Node.js, Python, PostgreSQL, and other modern web tools.',
        },
      ],
    },
  },

  /* --- Education & Training, node 33:172 ---------------------------------- */
  education: {
    /** 33:173 — Roboto Condensed Bold 64px. */
    heading: [
      { text: 'Education & ' },
      { text: 'Training', accent: true },
    ] as readonly Run[],

    /**
     * 33:190–33:193. Title is Roboto Condensed Bold 30px accent; institution is
     * Roboto Condensed Bold Italic 24px white. The markers on the rail
     * (33:194–33:198) are plain 41px rings — they carry no numerals.
     */
    entries: [
      {
        /** 33:179 / 33:181 */
        title: 'Bachelors of Science in Multimedia Arts & Science',
        institution: 'Mapúa University',
      },
      {
        /** 33:182 / 33:183 */
        title: '3ds Max Specialist',
        institution: 'CIIT College of Arts and Technology',
      },
      {
        /** 33:184 / 33:185 */
        title: 'Full-Stack Web Development',
        institution: 'Zuitt Coding Bootcamp',
      },
      {
        /** 33:186 / 33:187 */
        title: 'Business Entrepreneurship | Sales & Marketing',
        institution: 'Filipino Institute Doha, Qatar',
      },
    ],
  },

  /* --- A Little More About Me, node 33:246 -------------------------------- */
  more: {
    /** 33:225 — Roboto Condensed Bold 64px. */
    heading: [
      { text: 'A Little More ' },
      { text: 'About Me', accent: true },
    ] as readonly Run[],

    /** 33:227 — Roboto Condensed Regular 24px, one blank line between. */
    body: [
      'In my free time, I enjoy VR games and creating fun community events where people can play, compete, and share the experience together.',
      'I also love building apps when an idea hits me, even if it starts as a small experiment and turns into something much bigger.',
    ],
  },
} as const
