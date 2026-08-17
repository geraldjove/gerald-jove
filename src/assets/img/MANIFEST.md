# Image manifest

Every raster in this directory: where it came from, where it goes, and the
geometry needed to place it. Figma file `6Lgtxs8zSUzruc8zu8tY0T`.

Exported 2026-08-17 for the 1:1 rebuild. **If an image you expect is missing,
check the "Never export" table at the bottom before fetching it** — two of those
nodes have already been re-downloaded more than once.

All of these go through `astro:assets` (`<Image />` / `getImage`). Use
`format="webp"`, never `avif`: libvips reports AVIF as `heif`, Astro's dev image
endpoint sets that Content-Type, and Chrome refuses it, so every AVIF renders
blank in `npm run dev`.

---

## How to read the geometry columns

- **Export node** — the node that was rendered. Where the design masks an image,
  the *mask group* was exported, so the file is already cropped to the shape the
  design shows and you can drop it straight onto the mask's rect.
- **Placement** — x, y, width, height **relative to the section frame** named in
  the Page/section column, in Figma pixels. Divide by 16 for rem.

---

## Homepage — frame `32:84`

| File | Export node | Source image node | Intrinsic | Page/section | Placement (px, rel. to section frame) |
|---|---|---|---|---|---|
| `home-hero-bg.jpg` | `19:12` (mask group) | `19:2` | 1440 × 1024 | Hero `1:2` | 0, 0, 1440 × 1024 — full bleed behind the h1 |
| `home-proof-product-cutaway.jpg` | `32:26` (mask group, @2) | `32:25` | 1579 × 800 | Proof `8:28`, case study **two** | 601, 686, 789.3 × 400 |
| `home-process-bg.jpg` | `27:3` (image node) | `27:3` | 668 × 1024 | Process `8:29` | 0, 0, 668 × 1024 — the left panel. The node is 668 × 1188 in Figma and is clipped by the frame; the export is already clipped. |
| `home-about-strip-portrait.jpg` | `37:820` (mask group) | `24:195` | 720 × 1024 | About Strip `8:31` | 0, 0, 720 × 1024 — left half |

⚠ The Proof section has **one** image, not two. Case study one ships text-only;
see the exclusion table. Make the asymmetry read as deliberate rather than as a
failed image load. There is no before/after slider and no JavaScript here.

`30:17` — the decorative arrow that sits *inside* the withheld Proof image — was
also not exported. It has nothing to sit on.

## About — frame `33:284`

| File | Export node | Source image node | Intrinsic | Page/section | Placement (px, rel. to section frame) |
|---|---|---|---|---|---|
| `about-portrait.png` | `33:91` (image node) | `33:91` | 1152 × 2048, RGBA **with real alpha** | About Section `32:90` | disc at 735, 185, 655 × 655 |

⚠ **Corrected 2026-08-18. An earlier `about-hero-portrait.png` was exported here
from the ellipse mask group `33:107` and was wrong — it has been deleted.**
The mask-group export **flattens alpha**: measured `getextrema()` on its alpha
channel returned `(255, 255)`, fully opaque, with `#161616` baked into every
corner. It had silently dropped the disc behind the subject, which would have
put a dark figure on a dark background and removed the contrast device the
design relies on. `about-portrait.png` is the transparent cut-out — corners
measure `(255, 255, 255, 0)` — and is the only correct asset.

The generalisation, because it will bite again: **exporting a mask group is
safe for a rectangular mask and destructive for a shaped one.** Every other
mask group in this manifest crops a rectangle over an opaque photo, so
flattening is harmless; this was the one ellipse.

`33:108` is a **three-layer group**, not a photo with two strokes:
1. `33:105` — a **filled `#d9d9d9` disc**, 655 × 655. It is genuinely visible
   around the figure at every width, because the photo above it is a cut-out on
   transparency. Use `--color-portrait-disc`.
2. `33:107` — the masked photo (this file).
3. `33:114` — the `#00aaff` stroke ring, same box.

Build the disc and the ring in CSS; only the middle layer is an asset. If you
would rather have one flat file, re-export **`33:108`** — the whole group — not
`33:107`.

⚠ **The Education section's left visual has no image and will not get one.** The
whole 571 × 1021 mask group `33:220` is made of four withheld nodes. The section
ships text-only: heading `33:173`, the four entries, and the four accent-stroked
marker circles `33:194`–`33:198` (which carry **no numerals** — numbering them
would be invention).

## Services — frame `33:504`

| File | Export node | Source image node | Intrinsic | Page/section | Placement (px, rel. to section frame) |
|---|---|---|---|---|---|
| `services-hero.jpg` | `33:292` (image node, @2) | `33:292` | 1538 × 1294 | Services Section `33:285` | 621, 189, 769 × 647 |
| `services-rail-automation.jpg` | `33:798` (mask group) | `33:793` | 413 × 2069 | Creative Automation Systems `33:293` | 53, 0, 413 × 2069 |
| `services-rail-managed.jpg` | `33:799` (mask group) | `33:794` | 413 × 2069 | Managed Ad Creative `33:431` | 977, 0, 413 × 2069 |
| `services-rail-3d.jpg` | `33:803` (mask group) | `33:795` | 413 × 2316 | 3D Product Visuals & CGI Ads `33:447` | 50, 0, 413 × 2316 |

The three rails are exported at 1×, not 2×. They are grain-and-gradient
textures 413px wide; the raw exports were 1.75–2.0 MB each because JPEG cannot
compress film grain, and were re-encoded at quality 82 (5.4 MB → 794 KB total).
At 1× they are soft on a 2× display. That is a deliberate trade against repo
weight, and it is invisible on noise.

## Contact — frame `33:792`

No raster assets. The only non-text element is `33:536`, a 14 × 14 triangle at
(1333, 541) — the select control's chevron. Draw it in CSS or use the existing
`Icon.astro`; do not export a 14px PNG for it.

---

## Legacy — not from Figma

Used by `/work` and `/work/<slug>`, which are out of scope for this rebuild.
Leave them alone.

`product-animation-poster.jpg`, `product-hairdryer.jpg`, `product-mouse.jpg`,
`profile-photo.jpg`

---

## Superseded duplicates — delete once nothing imports them

These were exported concurrently by the page agents before this manifest
existed. Each is the same content as a file above, as PNG, at roughly twice the
bytes. Verified pixel-equivalent (mean absolute difference per channel in
brackets). **Switch your import to the canonical file, then delete the PNG.**

**All four homepage PNGs were swapped and deleted on 2026-08-17** — source bytes
3257 KB → 1870 KB (−43%), and the saving carries into the build. Remaining:

All duplicates are now resolved. The one row that caused trouble, kept because
the reasoning matters more than the row:

| Deleted | Replaced by | Δ as first reported | Δ measured correctly |
|---|---|---|---|
| `services-hero-systems.png` | `services-hero.jpg` | 17.38 | **0.39** |

⚠ **A raw mean-difference figure is meaningless across an alpha boundary, and
mine nearly cost a correct deletion.** 17.38 sat as an order-of-magnitude
outlier under a heading claiming "verified pixel-equivalent", and `page-services`
almost refused the swap because of it. The PNG was RGBA with **67% of pixels
non-opaque**; the JPEG is that cut-out flattened onto `#161616`. The number was
measuring the flatten, not the quality. Composite the PNG onto `#161616` first
and it is **mean 0.39, 0.74% of pixels off by more than 8/255**, in line with
every other pair. Composite before differencing, or don't quote a number.

⚠ **That flatten is only safe because `.svc-intro` is `--color-ink` — the exact
`#161616` the cut-out was flattened onto.** Move the Services intro to any other
background and a `#161616` rectangle appears behind the art. It also contradicts
the general rule that cut-outs stay PNG/WebP, so the reasoning is recorded in the
import comment as well; without it, someone "fixes" it back to a PNG.

⚠ **`about-portrait.png` is NOT a duplicate and must not be deleted.** An
earlier revision of this file said to replace it; that was wrong, for the alpha
reason documented in the About section above. It is the canonical asset and
`AboutHero.astro` imports it.

`home-proof-3d.png` was checked specifically before deletion: it was the
case-study-two image (`32:25`), not the withheld node. Confirmed twice by pixel
comparison against the `32:26` export rather than by name — first at mean
|Δ| 1.84, then again when that figure proved higher than the other three pairs.
The follow-up showed mean edge strength at the differing pixels was **100.4
against 6.3 elsewhere**, a 16× ratio tracing the product's own contours: JPEG
ringing on a high-contrast render against black, not different content.

---

## Never export — permanently withheld

Established 2026-08-17 in `AGENTS.md`, which holds the reasons. **Do not export
these, and do not write down what is in them** — describing an excluded node in
a tracked file republishes as text the thing the exclusion prevents.

| Node | Frame | Where it would have gone |
|---|---|---|
| `30:2` | `32:84` Homepage | Proof `8:28`, case study one |
| `33:214` | `33:284` About | Education `33:172`, mask group `33:220` |
| `33:215` | `33:284` About | Education `33:172`, mask group `33:220` |
| `33:216` | `33:284` About | Education `33:172`, mask group `33:220` |
| `33:217` | `33:284` About | Education `33:172`, mask group `33:220` |

`download_assets` on a whole page frame returns raw image URLs **with no node
ids attached**, so a bulk export cannot tell an excluded node from an allowed
one without fetching it. That is why every file above was exported by calling
`download_assets` on one node at a time.
