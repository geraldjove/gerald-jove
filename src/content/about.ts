/**
 * About page copy — verbatim from docs/website-copy-2026-08-09.md §3.
 *
 * The education timeline and the 26-tag skills cloud from the old site are
 * deliberately gone (audit §6.4). Credentials are one line, as the copy has it.
 *
 * No client is named anywhere: the engagement is described as "a US agency",
 * which is what the audit's §7 permits without written consent.
 */

export const ABOUT = {
  h1: 'I make the creative — and I build the machine that ships it.',
  subheadline:
    'Ten years in 3D and CGI, now spent building the production systems that let marketing teams keep up with their own testing schedule.',

  story: {
    heading: 'The story',
    body: [
      'I started in 3D in 2015, at an animation studio in Manila, building models and troubleshooting the problems that show up when a shot has to be delivered on Friday. From there it was in-house multimedia work, then years of product visualisation — realistic renders, product animation, medical explainers — for companies that needed visuals faster than a photoshoot could produce them.',
      'Somewhere in there I hit the ceiling every production artist hits. The work was good. The throughput wasn’t. Clients didn’t need one perfect render; they needed forty good ones, this week, in nine aspect ratios. Craft alone doesn’t solve that.',
      'So I learned to build. First scripts, then real applications — front to back, database to interface. Since 2025 I’ve been the creative production lead on a US agency’s ad platform, where I did both jobs at once: made the creative and built the system that produces it. When their no-code automation started failing at volume, I migrated the whole pipeline onto coded infrastructure they own outright.',
      'That’s the work I do now. Not “3D artist who dabbles in code,” and not “developer who can open Blender.” The two together, aimed at one problem: getting good creative out the door at the volume paid media actually consumes.',
    ],
  },

  capabilities: {
    heading: 'What I actually do',
    groups: [
      {
        label: 'Creative',
        body: '3D modelling, product visualisation, sculpting, texturing, lighting and rendering, motion graphics, video editing.',
      },
      {
        label: 'Engineering',
        body: 'Production pipelines, API integration, automation infrastructure, internal tools and dashboards, AI-assisted creative generation.',
      },
      {
        label: 'Tools',
        body: 'Blender, Maya, 3ds Max, ZBrush, Substance Painter, Redshift, V-Ray, Arnold, the Adobe suite, Figma — and React, Vue, Node, Python, PostgreSQL for everything else.',
      },
    ],
  },

  credentials: {
    heading: 'Credentials',
    body: 'BS Multimedia Arts and Sciences, Mapúa University. 3ds Max Specialist, CIIT College of Arts and Technology. Full-stack web development, Zuitt Coding Bootcamp. Based in Metro Manila, Philippines, working with clients across US and European time zones.',
  },

  /** Blank #5. Section omitted entirely until Gerald writes it. */
  humanCloseBlank: 'aboutHumanClose',
} as const
