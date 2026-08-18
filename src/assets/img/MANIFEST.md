# Image manifest

Every raster in this directory: where it came from, where it goes, and the
geometry needed to place it. Figma file `6Lgtxs8zSUzruc8zu8tY0T`.

Exported 2026-08-17 for the 1:1 rebuild. **If an image you expect is missing,
check the "Never export" table at the bottom before fetching it** — nodes on
that list have already been re-downloaded more than once. ⚠ As of 2026-08-18
**that table is empty**: its four Education entries were released by Gerald. A
missing image is therefore more likely to be a real gap than a deliberate one —
but read the table's note before assuming so.

⚠ **One asset is capped rather than withheld**: `home-proof-automation-split.jpg`
ships, but only downscaled. It is absent from the "Never export" table on
purpose and re-exporting it from Figma is still wrong — see the Proof notes
under Homepage.

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
| `home-hero-portrait.png` | — (supplied by Gerald, not a Figma export) | — | 2160 × 3840, RGBA **with real alpha** | Hero `1:2` | **cropped and zoomed to the design — see below**; 1443.8 × 2566.7 at (252.9, −75.3), clipped by `.hero` |
| ~~`home-hero-bg.jpg`~~ | `19:12` (mask group) | `19:2` | 1440 × 1024 | Hero `1:2` | **SUPERSEDED 2026-08-18 — no longer imported** |
| `home-proof-automation-split.jpg` | `30:2` (image node, **downscaled — see below**) | `30:2` | 790 × 400 | Proof `8:28`, case study **one** | 50, 224, 789.3 × 400 |
| `home-proof-product-cutaway.jpg` | `32:26` (mask group, @2) | `32:25` | 1579 × 800 | Proof `8:28`, case study **two** | 601, 686, 789.3 × 400 |
| `home-process-bg.jpg` | `27:3` (image node) | `27:3` | 668 × 1024 | Process `8:29` | 0, 0, 668 × 1024 — the left panel. The node is 668 × 1188 in Figma and is clipped by the frame; the export is already clipped. |
| `home-about-strip-portrait.jpg` | `37:820` (mask group) | `24:195` | 720 × 1024 | About Strip `8:31` | 0, 0, 720 × 1024 — left half |

⚠ **The hero is two layers as of 2026-08-18, and the background is no longer an
image at all.** `19:12` flattened the black fill, the accent wash and the masked
portrait into one raster, and that is why the section could not be both
design-scale and full-bleed: capping the raster fixed the portrait's scale and
left the wash ending at 1440 with a visible edge. On Gerald's instruction the
two were split — the wash is now a CSS `radial-gradient` on `.hero`,
**reconstructed by sampling `home-hero-bg.jpg` on a 6 × 5 grid** (the stops and
the four readings they reproduce are in `HomeHero.astro`), and the figure is a
transparent cut-out he supplied.

`home-hero-bg.jpg` is **kept on disk deliberately**: it is the only reference for
those gradient stops and the revert path if the split is ever undone. Delete it
and the gradient becomes an unverifiable magic number.

⚠ **The crop is measured, not chosen (2026-08-18).** Gerald asked for the figure
cropped and zoomed “like the Figma”. `home-hero-bg.jpg` IS the design's own
1440 × 1024 render of frame `1:2`, so the figure's placement in it is ground
truth. Solving for the uniform transform that maps the cut-out onto that render:

| | value |
|---|---|
| scale | **0.66841** |
| translate | **(252.9, −75.3)** in the 1440 frame |
| rendered box | 1443.8 × 2566.7 — 2.5× the frame height, bleeding off the bottom |

Three independent estimators — the head's skin-row run, the head's width, and the
widest single row — agreed to **0.3%**. Verified after the fact against the design
render: forehead y **158 vs 158**, head width **238 vs 239**, head left/right
**+2 / +1**. Harness: `.scratch/hero-fit.mjs` and `.scratch/hero-compare.mjs`.
**Re-run both if this file is ever re-exported** — nothing in the build checks the
numbers against the asset, exactly as with the gradient stops below.

⚠ Two things the crop dragged with it, both easy to undo by accident:
1. **`max-width: none`** on `.hero__img`. global.css's `img { max-width: 100% }`
   clamps it to the 1425px wrapper and renders 1425 × 2533 — a 1.3% under-scale
   that looks nearly right rather than broken. Same trap as the Education collage.
2. **`widths`/`sizes` went 576/1152 → 720/1440/2160.** The old pair was sized for a
   figure letterboxed into a 740px column; the crop renders it 1443.8px wide, so
   576 was being upscaled 2.5×. 2160 is the source's own width and the ceiling.

⚠ **`0001_website_image_6_ver_1_1.png` is UNUSED and is not imported by anything**
(770 × 946, transparent). It appeared in the working tree on 2026-08-18 at 18:23,
unrecorded, while the hero crop below was being built — it is the same waist-up
framing, so it was very likely supplied for that job.

**It was deliberately not adopted.** The hero renders the figure **1443.8px wide**;
this file is 770px, so using it would upscale 1.9×. The shipped crop comes from
`home-hero-portrait.png` (2160 × 3840) instead, which has the resolution to fill
that box and beyond. Kept rather than deleted because it is Gerald's own asset and
deleting a file somebody just added is not this file's call — but **do not wire it
into the hero** without re-reading the crop note below. Delete it, or replace it
with a high-resolution export of the same framing, and this paragraph goes with it.

⚠ `home-hero-portrait.png` is a **2.5 MB source**, larger than anything else
here. That is intentional — it is the lossless master, and Astro emits it at
32 / 90 / 183 KB webp, so nothing ships at that weight. Do not "optimise" it in
place; re-deriving a smaller master loses the alpha edge quality.

⚠ **The nav-legibility constraint moved with it.** The transparent navbar has
white links and is readable because the TOP of this section is near-black. That
used to be a property of the file; it is now a property of the gradient, whose
glow is anchored bottom-right. Move the glow upward and the nav fails silently —
no build check catches it.

⚠ **The Proof section has two images as of 2026-08-18.** It had one until then,
because `30:2` was wrongly listed as client-engagement material; Gerald
generated it, so there was never an approval to obtain. Earlier revisions of
this file told you to expect an asymmetry — ignore that, both cases now carry a
visual. There is still no before/after slider and no JavaScript here: the split
is baked into the raster, so there is nothing to slide between.

⚠ **`home-proof-automation-split.jpg` is the one asset here that must NOT be
re-exported at its native resolution.** Its right-hand half renders source code,
and AGENTS.md §4 bars engagement code regardless of who owns the picture. The
shipped file is `30:2` resampled to 276 × 140 and back up to 790 × 400 —
irreversible at the glyph level — then JPEG q82: 162 KB → 23 KB, and single-digit
KB once Astro emits webp. It is soft on purpose. A sharper replacement is a
regression, not a fix, and the content-hash gate will block the full-res file.

⚠ **The artwork was revised on 2026-08-18** — Gerald supplied a second render of
the same composition (darker, slightly crisper). The revision changed the
picture, **not** the ceiling: the v2 source went straight to quarantine and only
the downscale ships. Both versions are quarantined, so the hash gate blocks
either one. Reproduce the shipped file from the current original with:

```python
from PIL import Image
src = Image.open('.scratch/quarantine/home-proof-automation-split-v2.png')
src.resize((276, 140), Image.LANCZOS).resize((790, 400), Image.LANCZOS) \
   .save('src/assets/img/home-proof-automation-split.jpg', quality=82)
```

Equivalent with `sharp`, which this repository already has via `astro:assets`
and which is what actually produced the shipped file (`kernel: 'lanczos3'` both
ways, `.jpeg({quality: 82})`). Use whichever is installed; the output matches.

Three nodes sit **over** that raster as separate Figma nodes, not baked into it,
and are built in the component rather than exported:

| Node | What | Where it is built |
|---|---|---|
| `30:18` | "No-Code Automation", Roboto Condensed Bold 24px `#0af`, shadow `0 4px 4px #000` | `.proof__label--before` |
| `30:19` | "Custom-coded System", same type | `.proof__label--after` |
| `30:17` | the decorative arrow, 127 × 93.178, fill `#00AAFF` | `.proof__arrow`, inline SVG |

`30:17` exports as a 394-byte SVG whose geometry is a triangle plus a rect drawn
pointing **up** in a 93.1776 × 127 box; the design rotates it to point right.
The component inlines that exact path data and applies the rotation in the
`transform`, per the `Icon.astro` convention — an inline glyph costs no request.
Earlier revisions said this node "has nothing to sit on". It does now.

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

### Education & Training collage — mask group `33:220`

⚠ **Added 2026-08-18. Earlier revisions of this file said this section "has no
image and will not get one" — that is no longer true.** The four nodes were
excluded until Gerald supplied the files himself and instructed implementation;
`AGENTS.md` §4 records the decision and the reasoning. Read it before touching
these.

| File | Node | Intrinsic | Box within the 571 × 1021 mask (px) |
|---|---|---|---|
| `about-education-mapua.jpg` | `33:216` | 2000 × 1325 | −37.07, −51.39, 645.67 × 427.76 |
| `about-education-ciit.webp` | `33:215` | 1200 × 628 | −107, 274, 883 × 462 |
| `about-education-zuitt.png` | `33:214` | 447 × 447 | **−19, 733, 288 × 288 — AUTHORED, not the node box (was −19, 712, 309 × 309)** |
| `about-education-filipino-institute.jpg` | `33:217` | 447 × 447 | 286, 733, 288 × 288 |

⚠ **The Zuitt box is the one child here that is NOT its Figma box (2026-08-18).**
Gerald reported it overlapping the CIIT photo and standing taller than the
Filipino Institute card. Both were true **of the design itself**, and both were
visible because this logo ships on an opaque WHITE field — so the overlap painted
a white notch across the photo above it:

| | Figma `33:214` | shipped |
|---|---|---|
| top (mask-local) | 712 | **733** — level with `33:217` |
| size | 309 × 309 | **288 × 288** — same as `33:217` |
| over CIIT's bottom (736) | **24px** | **3px** — the same tuck `33:217` already had |
| vs the other card | overlapped it by 4px | **17px gap** |

Kept square: the source is 447 × 447 and `object-fit: cover` crops a non-square
box rather than letterboxing it. x is unchanged, so it still bleeds 19px off the
mask's left edge as drawn. **Do not “restore fidelity” here** — the Figma value is
in the table above precisely so nobody has to guess what was changed.

The mask itself sits at 50, 3 in the 1440 × 1024 frame `33:172`, and carries **no
corner radius** — checked on the rendered node, the corner pixel is fully opaque.

⚠ **Three of the four boxes are WIDER than the mask** (the CIIT band is 154.6% of
it). That is deliberate — it is how the design gets full-bleed photographs inside
a 571px column — and it is also a trap: `global.css` sets
`img, video { max-width: 100% }`, which silently clamps each one to the mask
width and leaves the bands short of the right edge with the image behind showing
through. `AboutEducation.astro` carries `max-width: none` for exactly this. It
renders as a layout bug, not as a missing style, so it is easy to misdiagnose.

The component writes these boxes as **percentages** of the mask rather than rem,
so the collage scales as one unit below 90rem. Percent of the mask == the Figma
px over 571 or 1021, so the design is still exact at 1440.

The rest of the section is unchanged: heading `33:173`, the four entries, and the
four accent-stroked marker circles `33:194`–`33:198` (which carry **no numerals**
— numbering them would be invention).

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

## Legacy — not from Figma — DELETED 2026-08-18

`product-animation-poster.jpg`, `product-hairdryer.jpg`, `product-mouse.jpg` and
`profile-photo.jpg` (295 KB total) were used by `/work` and `/work/<slug>` and by
nothing else. Both routes were removed on Gerald's instruction, so all four were
orphaned and are gone. They are in git history if a case-study page returns.

⚠ `profile-photo.jpg` was **not** the About page portrait — that is
`about-portrait.png`, which is still in use and must not be deleted. The names
are close enough that this has to be said out loud.

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

## Never export — the table is now EMPTY

Established 2026-08-17 with four entries — `33:214`–`33:217`, the Education
collage. **All four were released on 2026-08-18 by Gerald** and ship; see the
Education & Training section above and `AGENTS.md` §4 for the decision.

**Nothing is currently on this list.** The section is kept rather than deleted
because the mechanism still matters and the list can grow again:

- `AGENTS.md` §4's first paragraph still bars client names, logos, dashboards,
  screenshots and engagement code. Any new asset of that kind belongs here.
- `home-proof-automation-split.jpg` is **capped, not withheld** — it ships
  downscaled and must never be re-exported at full resolution. It has always
  been absent from this table on purpose; do not add it.
- `download_assets` on a whole page frame returns raw image URLs **with no node
  ids attached**, so a bulk export cannot tell an excluded node from an allowed
  one without fetching it. Export one node at a time, as every file here was.
