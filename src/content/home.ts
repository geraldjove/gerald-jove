/**
 * Home page copy — transcribed verbatim from Figma `6Lgtxs8zSUzruc8zu8tY0T`,
 * frame `32:84` (Homepage, 1440 x 8341). Every export below carries the node id
 * of the text layer it came from, so a line can be traced back to the design.
 *
 * Nothing here is authored. Where a slot needed a line the Figma does not draw
 * (button `aria-label`s, image `alt` text), the value is derived from an
 * adjacent supplied line and flagged in the code comment — see AGENTS.md rule 6.
 *
 * Two shapes recur:
 *   `Run[][]` under a `lines` key   -> hard line breaks drawn in the Figma.
 *     Rendered with <br> at >=1440 and allowed to reflow below it.
 *     ⚠ EVERY line's LAST run must end in a space, or the words either side of
 *     the break run together below 1440 where the <br> is display:none. The
 *     space costs nothing at >=1440: a space immediately before a line break is
 *     dropped by the browser. This shipped broken once as "Makingthem".
 *   `Run[][]` under a `paragraphs`  -> separate paragraphs that wrap naturally.
 */

/** A run of text inside a line. `accent` = the #00AAFF fill; `bold` = 700. */
export type Run = {
  readonly t: string
  readonly accent?: true
  readonly bold?: true
}

/* -- Hero, node 1:2 -------------------------------------------------------- */

export const HERO = {
  /**
   * node 2:3 — Poppins Bold 72.504px, line-height 1, box 675px wide at x=50.
   * The Figma sets four hard lines; the accent run covers the first sentence.
   */
  h1: {
    lines: [
      [{ t: 'Your team needs ', accent: true }],
      [{ t: 'more ads.', accent: true }, { t: ' Making ' }],
      [{ t: 'them should not ' }],
      [{ t: 'slow you down.' }],
    ],
    /** Flat string for `aria-label`/meta use — the same words, no breaks. */
    plain: 'Your team needs more ads. Making them should not slow you down.',
  },

  /** node 4:6 — Roboto Condensed 21.278px. Two paragraphs, one blank line apart. */
  body: {
    paragraphs: [
      [
        { t: 'I build creative systems that ' },
        { t: 'help marketing teams', accent: true, bold: true },
        { t: ' make more ads, faster.' },
      ],
      [
        { t: 'I also ' },
        { t: 'create the 3D visuals, motion, and product content', accent: true, bold: true },
        { t: ' that run through those systems.' },
      ],
    ],
  },

  /** node 21:23 / 5:18 — accent pill, Poppins Bold 16.55px on black. */
  cta: { label: 'Book a 20-minute call', href: '/contact' },
} as const

/* -- The Problem, node 7:26 ------------------------------------------------ */

export const PROBLEM = {
  /** node 22:30 — Roboto Condensed Bold 18px, accent. */
  eyebrow: 'The Problem',

  /** node 22:31 — Roboto Condensed Bold 64px, centred, two hard lines. */
  h2: {
    lines: [
      [{ t: 'Good ideas are not the problem. ' }],
      [{ t: 'Getting them made is.', accent: true }],
    ],
    plain: 'Good ideas are not the problem. Getting them made is.',
  },

  /** node 22:33 — Roboto Condensed 24px, centred, 1112px box. */
  body: {
    paragraphs: [
      [
        {
          t:
            'You already know what you want to test. You have the ideas, offers, briefs, and ad budget. ' +
            'The problem is getting enough creative made each week. Your designers can only make so much. ' +
            'A winning idea may need 10, 20, or 40 new versions, but making them by hand takes time. ' +
            'Freelancers can help, but they also add more people to manage. And simple automation tools ' +
            'often work well at first, then break when things get more complex. That means your team ' +
            'spends too much time making files instead of testing ideas. ',
        },
      ],
      [{ t: 'I help fix that.' }],
    ],
  },
} as const

/* -- Services, node 8:27 --------------------------------------------------- */

export const SERVICES_SECTION = {
  /** node 22:36 — Roboto Condensed Bold 64px, line-height 68px, centred. */
  h2: {
    lines: [[{ t: 'Three ways', accent: true }, { t: ' I can help.' }]],
    plain: 'Three ways I can help.',
  },

  /**
   * The three cards, left to right. Prices are the values Gerald confirmed and
   * are the ones drawn on this frame (nodes 22:42, 22:54, 22:64).
   */
  cards: [
    {
      node: '22:48',
      title: 'Creative Automation Systems', // 22:38
      lede: 'For teams that need a faster way to produce creative.', // 22:39
      // 22:40 — four paragraphs, each separated by one blank line in the Figma.
      paragraphs: [
        'I build custom systems that turn a brief into finished ad creative. ',
        'The system can handle things like file setup, resizing, asset management, creative versions, approvals, and other repeat work. ',
        'It is built around your process. And you own it. ',
        'No long chain of no-code tools that becomes harder to fix every month.',
      ],
      price: { prefix: 'From ', value: '$8,000' }, // 22:42
      timeline: 'Typical timeline: 4 to 8 weeks', // 22:43
    },
    {
      node: '22:50',
      title: 'Managed Ad Creative', // 22:52
      lede: 'For teams that need more creative without hiring a bigger team.', // 22:51
      paragraphs: [
        // 22:53
        'I handle creative production for you each month. ',
        'That can include concepts, static ads, motion ads, new versions, resizes, and updates to winning ideas. ',
        'The goal is simple. Give your team enough creative to keep testing.',
      ],
      price: { prefix: 'From ', value: '$4,500/month' }, // 22:54
      timeline: null,
    },
    {
      node: '22:60',
      title: '3D Product Visuals & CGI Ads', // 22:62
      lede: 'For brands that need more product content without another photoshoot.', // 22:61
      paragraphs: [
        // 22:63
        'I create realistic 3D product renders and animation. ',
        'Once your product is built in 3D, we can create new angles, colors, backgrounds, lighting setups, and animations without shooting the product again. ',
        'This is useful for new launches, new product colors, ads, landing pages, and social media.',
      ],
      price: { prefix: 'From ', value: '$3,500/month' }, // 22:64
      timeline: null,
    },
  ],

  /** nodes 22:44 / 33:810 / 33:814 — identical accent pill on all three cards. */
  cardCta: { label: 'Learn more →', href: '/services' },
} as const

/* -- Proof, node 8:28 ------------------------------------------------------ */

export const PROOF = {
  /** node 22:72 — Roboto Condensed Bold 13.792px, accent. */
  eyebrow: 'Real Work',

  /** node 22:73 — Roboto Condensed Bold 49.04px, centred, single line. */
  h2: {
    lines: [[{ t: 'What this looks like in ' }, { t: 'real life', accent: true }]],
    plain: 'What this looks like in real life',
  },

  /**
   * NOT used by the homepage, and NOT the same sentence as `h2` above.
   *
   * `/work` imports this as its own <h1>. That route is out of scope for the
   * rebuild and must keep the wording it already ships
   * (docs/website-copy-2026-08-09.md §2.4) — the Figma's "real life" line is
   * the homepage's, and pointing /work at `h2.plain` would silently re-word a
   * page nobody reviewed.
   *
   * It is a separate flat string on purpose: /work then depends on no part of
   * the homepage heading's SHAPE, so re-cutting `h2` for the design cannot
   * break that route again. It did once — `h2` became an object and /work
   * rendered "[object Object]", which `astro check` cannot catch because
   * interpolating an object into a template is legal.
   *
   * Delete this in the same change that restyles /work.
   */
  workH1: 'What this looks like in practice',

  /**
   * Two case narratives, alternating sides. Case one ships text-only: its Figma
   * visual (node 30:12, containing 30:2) is a permanently excluded node — see
   * the excluded-node table in AGENTS.md. Case two keeps its own image, 32:30.
   */
  cases: [
    {
      node: '22:80',
      title: 'Rebuilding an automation system that kept breaking', // 22:76
      body:
        // 22:74
        'A creative agency was running its ad production through a no-code automation setup. ' +
        'As the amount of work grew, the system became harder to manage. It would break, costs ' +
        'kept growing, and fixing problems took too much time. I rebuilt the process as a ' +
        'custom-coded system that the agency owns.',
      image: null,
    },
    {
      node: '22:83',
      title: 'Showing what a camera can’t see', // 22:85
      body:
        // 22:84
        'Some products are hard to explain with photos alone. I created detailed 3D models and ' +
        'animations to show how the products worked, including parts hidden inside. This gave the ' +
        'sales team a clear way to show the product in action instead of relying on still images ' +
        'and slides. The final visuals made complex product features easier to see, understand, ' +
        'and explain.',
      /**
       * node 32:30. The Figma supplies no alt text; this one is written, and is
       * a plain description of what the render shows rather than new positioning
       * copy. Flagged as authored in the delivery report.
       */
      image: {
        alt: 'Exploded 3D render of a blue U-shaped wearable device, its outer shells pulled apart to show the circuit board, battery and internal parts inside',
      },
    },
  ],
} as const

/* -- Process, node 8:29 ---------------------------------------------------- */

export const PROCESS = {
  /** node 22:88 — Roboto Condensed Bold 64px, centred. */
  h2: {
    lines: [[{ t: 'How We Work ' }, { t: 'Together', accent: true }]],
    plain: 'How We Work Together',
  },

  /** Four numbered steps, nodes 22:119 / 22:118 / 22:117 / 22:116. */
  steps: [
    {
      node: '22:119',
      label: 'Talk', // 22:92
      body:
        // 22:112
        'We start with a free 20-minute call. You show me how your current process works and where ' +
        'things get slow. If I do not think I am the right person for the job, I will tell you.',
    },
    {
      node: '22:118',
      label: 'Plan', // 22:99
      body:
        // 22:113
        'I map out what needs to be built or produced. You get a clear price, timeline, and project ' +
        'plan before work starts. No surprise costs.',
    },
    {
      node: '22:117',
      label: 'Build', // 22:103
      body:
        // 22:114
        'I build the system or create the work. You see real progress each week. Not just status updates.',
    },
    {
      node: '22:116',
      label: 'Hand Over or Keep Going', // 22:107
      body:
        // 22:115
        'For automation projects, you get the system, documentation, and access you need to run it. ' +
        'For managed creative, production keeps running each month.',
    },
  ],

  /**
   * node 27:3, the left-hand panel image. The Figma gives no alt text; written
   * here, describing only what is visible. Flagged as authored in the report.
   */
  panelAlt: 'A person on a video call at a home-office desk, seen from behind',
} as const

/* -- Differentiator, node 8:30 --------------------------------------------- */

export const DIFFERENTIATOR = {
  /** node 23:179 — Roboto Condensed Bold 64px, centred. */
  h2: {
    lines: [[{ t: 'Why I Do ' }, { t: 'Both', accent: true }]],
    plain: 'Why I Do Both',
  },

  /** node 23:181 — Roboto Condensed Bold 36.78px, single line. */
  lede: 'I understand the creative and the system behind it.',

  /** node 23:183 — Roboto Condensed 18px, centred, 976px box. */
  body:
    'Many developers know how to automate a process. But they may not know what makes an ad or 3D ' +
    'render look good. Many artists know how to make great creative. But they may not know how to ' +
    'build the system that produces hundreds of versions. I work on both sides. I have spent about ' +
    'ten years working in 3D, CGI, animation, and product visuals. I also build the tools and ' +
    'systems used to produce creative at a larger scale. That means I understand what the artist ' +
    'needs and what the system needs. That is what makes this combination useful.',
} as const

/* -- About strip, node 8:31 ------------------------------------------------ */

export const ABOUT_STRIP = {
  /** node 24:187 — Roboto Condensed Bold 64px, centred over the right column. */
  h2: {
    lines: [[{ t: 'About ' }, { t: 'Gerald', accent: true }]],
    plain: 'About Gerald',
  },

  /** node 24:189 — Roboto Condensed 18px, 531px box. */
  body:
    '3D Artist and Creative Automation Engineer based in Metro Manila, Philippines. I have spent ' +
    'about ten years creating product visuals, animation, and digital content. Today, I also build ' +
    'the systems that help teams produce more of that work.',

  /** node 24:190 / 24:192 — accent pill, Poppins Bold 11.085px. */
  cta: { label: 'More about me →', href: '/about' },

  /**
   * node 24:195. No alt text in the Figma; written, and deliberately a plain
   * description rather than a caption. Flagged as authored in the report.
   */
  portraitAlt: 'Gerald Jove, leaning against a light wall in a dark checked shirt',
} as const

/* -- Closing CTA, node 8:32 ------------------------------------------------ */

export const CLOSING = {
  /**
   * node 24:197 — Poppins Bold 69.618px, line-height 1, 628px box. This is the
   * one Poppins node on the page that is not the page H1; it renders as an h2.
   */
  h2: {
    lines: [
      [{ t: 'Want to know ' }],
      [{ t: 'what is ' }, { t: 'slowing ', accent: true }],
      [{ t: 'your team down?', accent: true }],
    ],
    plain: 'Want to know what is slowing your team down?',
  },

  /**
   * node 24:199 — one text layer holding a 23.045px bold opener followed by
   * five 17.284px paragraphs, each separated by a blank line.
   */
  opener: 'Give me 20 minutes.',
  paragraphs: [
    'Show me your current creative process and I will help you find where the problem is. ',
    'It may be your process. ',
    'It may be your tools. ',
    'Or your team may simply need more production support. ',
    'Either way, you will have a clearer idea of what to fix.',
  ],

  /** node 24:201 / 24:203 — accent pill, Poppins Bold 17.284px. */
  cta: { label: 'Book a 20-minute call', href: '/contact' },
} as const
