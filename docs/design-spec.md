# Chenyuan Qu — a personal collection

## Visual thesis

A bound, numbered folio on warm paper. The cover is an oversized, stacked name beside a layered portrait mounted as a printed plate; four chapters follow — I Work, II Research, III About, IV Contact — and the book closes on the email address, as it opened on the name. Ink and rust carry the interface; the artwork supplies the colour. Three full-width pauses break the paper: the 360+x night band, the night photograph in About and the rust colophon.

The September 2026 upgrade raised craft by removing variation: one type scale, one 12-column grid, one surface ladder, one vocabulary for tabs, links and disclosures. The only new ornaments are print devices made from existing content — chapter numerals, crop marks, credit lines and a colophon.

## System

All values live as tokens at the top of `app/globals.css`; component styles reference them rather than raw values.

- **Surfaces.** Each section declares `data-surface` — `paper` (#f5f2eb), `stone` (#e4ddcf), `night` (#111a1c), `photo` or `rust` (#994028). The surface rebinds `--on`, `--on-muted`, `--accent` and the rule colours, so text, hairlines and accents follow it. Rhythm down the page: paper hero → stone work → paper research → night 360+x → paper reading list → photograph → stone biography → rust contact.
- **Colour.** Ink #252f2c, muted #555c55 (≥ 5:1 on paper and stone), rust #994028, rust-lit #e08a66 on dark surfaces, cream #f1ede2 and quiet #b8c1bd on night. Rust is budgeted: at most three marks per screen — the name's “Qu.”, “Henry”, chapter numerals, 2 px selection bars, Recently dates and oral-presentation credits. Selected states are ink text with a 2 px rust bar; hover moves toward ink and never uses rust.
- **Type.** Newsreader for display, DM Sans (with its optical-size axis) for reading. Fluid tokens: hero 80–158 px, stage 56–104, h2 44–76, h3 34–48, h4 26–32, lead 19–28; body 17/15/14 px; labels 13 px (12 on phones); eyebrows 12 px; image chips 11 px, the minimum. Aligned numerals (dates, year ranges) use Newsreader. Italics are reserved for “Qu.”, “Henry”, chapter numerals and the About caption.
- **Grid.** 12 columns of 80 px with 20 px gutters inside the 1180 px container, stacking below 1000 px. Three alignment lines at 1440 px: text (column 1), list (column 5) and aside (column 9). Breakpoints 540 / 760 / 1000 px; section spacing `clamp(64px, 8vw, 120px)`.
- **Header.** One `--header-h` (88 px; 72 px on short screens; 64 px on phones) drives the masthead, scroll padding and every sticky offset. Once scrolled, the masthead takes the tone of the surface beneath it — translucent paper or stone, opaque night, a scrim over the photograph, rust over contact — and the browser theme colour follows. Without JavaScript it stays paper.
- **Motion.** Durations 120 / 200 / 320 / 560 / 900 ms; easings `--ease-out`, `--ease-out-expo`, `--ease-in-out`. Named patterns: settle (content below the fold eases in once; anything already on screen is never hidden), draw (link rules draw in on hover and keyboard focus), nudge (arrows move 3 px), bar (selection bars scale in), unfold (disclosures animate to auto height where supported), lay-down (each COMPaD design is laid down as a fresh sheet) and press. Hover effects apply only to fine pointers.

## Content plan

1. Introduction: meet Chenyuan through his name and curiosity about images. One paragraph and one invitation; professional roles move to the biography. The name leads the page's type scale on every screen size.
2. I — Selected work: COMPaD first, then Nexus and Everyday tools. The interactive canvas takes seven columns; a short human description sits on the aside line. Roles, engineering detail and qualified outcomes stay in the project disclosure. Alpha status remains visible.
3. II — Research: one heading, then VisualSplit as a generous interactive comparison, then 360+x as a full-width night band, then the paper library. Credits read as one line: name, venue (linked to its paper entry), role and any oral presentation.
4. III — About: the night photograph fills the screen, followed by a personal account of the route from physics to computer vision. Experience, education and earlier updates remain available without taking over the page.
5. IV — Contact: an invitation to compare notes; the email address is the last display line, with public profiles listed on the aside line and a colophon in the footer.

## Interaction thesis

- The portrait's depth and three compositions make the opening feel like a living printed page. Preserve its manual controls, 4.5-second rotation and discreet progress toggle. In the Editorial composition, the poster's “Qu.” is a lighter terracotta so the name keeps the only solid rust “Qu.”.
- COMPaD's three independently editable posters cycle every 4.5 seconds inside the first project. Work tabs remain manual. A short project story stays beside the large canvas while scrolling on desktop.
- Quiet entrance and section reveals lead to a second hands-on moment: a 360+x panorama viewed from inside the scene, ready to look around on arrival.

## Voice

Use concise, natural English in the first person. Lead with interests and the work itself. Avoid an applied-engineer pitch, business-results headlines, tools-and-skills inventories and repeated slogans. Keep AI terminology where it explains the actual work, rather than using it as a personal label. Preserve the verified research and technology roles in the biography and structured identity metadata. Design metaphors (folio, plate, band) are never written onto the page as copy.

Nexus manages 200,000+ devices; ERP estimates apply only to tasks evaluated; COMPaD is in first-stage alpha testing; 360+x is a collaborative paper with an oral presentation. Do not invent clients, released interfaces, testimonials, hobbies or accomplishments. Author roles in credits are derived from author order, never typed by hand.

## Composition and accessibility

- Two fonts: DM Sans for reading and Newsreader for display type.
- Warm paper, charcoal ink and rust, with full-width photographic and colour changes between sections. Keep controls understated and the imagery generous. Images have square corners; controls are round with 44 px targets; hairlines separate.
- Fit the introduction inside common desktop and tablet viewports and 390 × 844 phones, with the fixed header included in the height budget. On shorter phones the invitation to explore stays in the first screen and the portrait may follow below it.
- Visible keyboard focus, native disclosures, meaningful links and image alternatives. Preserve anchor and shared paper URLs. Arrows mean direction: down within the page, up to the top, up-right for other sites.
- Reduced motion disables initial automatic playback, parallax, reveals and glides. Portrait and poster timers pause offscreen and in background tabs; reading remains possible without JavaScript.
- Keep static export and base-path support; site imagery stays local under public/. Load derivatives sized for their display, never multi-megabyte originals for thumbnails.

## Verification

Run lint, strict typechecking, a production export and the browser suite. Inspect 320, 360, 375, 390, 414, 768, 1024, 1280, 1366, 1440 and 1920 px layouts. Cover navigation, header tone, portrait and poster playback, independent edits, manual project selection, canvas and story separation, the immersive panorama, publication links, credits and citations, disclosures, reduced motion, no-JavaScript reading, metadata and overflow.

## Project visuals — September 2026 refinement

Nexus uses the product's own Campaigns and content-scheduling previews and logo, arranged on a pale blue field. These are the publicly served feature images from the supplied Nexus site, selected after inspecting the authenticated workspace. COMPaD is a working poster canvas with three original compositions and independent editable lettering and photographic layers. The artwork remains explicitly credited as an interactive concept, not a screenshot of the alpha product.

### VisualSplit, through actual examples

Visual thesis: a photographic study on warm paper, with a large before-and-after image and small, tangible visual ingredients beside it.

Content plan: introduce VisualSplit in one sentence, then let three published examples explain colour editing, relighting and reconstruction. Start with the white-to-red egret, show the edited colour map beside it, and let the reader compare the actual result. A mountain scene demonstrates three published lighting choices; the dog reconstruction shows the actual edge map, colour map and brightness histogram. Keep the lower-resolution reconstruction honest, and link to the source rather than expanding the section into a methods report.

Interaction thesis: a draggable comparison reveals the result directly beneath the original; three quiet manual tabs change the story, and the lighting choices swap real published outputs. Keep the tabs reachable while reading, and bring the new image into view when switching from the lower notes; the divider eases back to its starting point for the new example. Use brief entry fades only when motion is allowed. No timed cycling, synthetic filters or live-inference claims. Preserve the full source images, including their framing, with a readable static comparison before hydration and without JavaScript. The comparison is capped to the viewport height on short screens.

### An immersive 360+x band

The scene sits in a full-width night band: a 2.4 : 1 frame at the container width (4 : 3 and edge to edge on phones), with the credit, title, description and “Explore 360+x” below it. The camera starts at the centre of the panorama; wide frames keep a ~100° horizontal field of view so the edges do not stretch. Keep only a discreet drag hint and reset control over the image. While the renderer loads, a hairline progress line runs along the bottom and the still photograph stays visible; the view then cross-fades in. Mouse dragging and arrow keys turn the view, a flick glides briefly to a stop, Home resets it, and vertical touch gestures keep the page scrollable. Load the renderer near the viewport, render only on interaction or resize, and retain a full-frame still image, without the drag hint, when JavaScript or WebGL is unavailable.

### An illustrated reading list

Visual thesis: four generous, image-led reading entries on the same warm paper, with a distinctive visual for each study and quiet rules between them. An opened entry lifts onto a slightly raised sheet, and its overview figure is mounted on a paper mat.

Content plan: show a recognisable example before opening a paper—VisualSplit colour editing, DIFF street imagery and segmentation labels, a 360+x scene, and a real MeD noisy/denoised pair. Keep the short plain-language titles, authorship and citations; the site owner's name is set in ink within author lists. Opening an entry brings its original overview figure directly into view beside the reading, with posters and presentations still available below.

Interaction thesis: hover or keyboard focus gently reveals the paired image; the panorama preview shifts across the scene. Opening a native disclosure exposes more visual detail. Use no automatic loop, no nested controls inside the summary, and no invented research results. Reduced motion retains a clear static comparison, and the list remains useful without JavaScript. Mobile gives each image a full-width 2 : 1 position above its title.

### Direct editing

The work selector opens on COMPaD. Its three poster designs cycle within the canvas, with a small progress control beside the invitation to edit and no timing labels. Hold the poster while hovered, offscreen, on a different work tab or in a hidden browser tab; manual design selection, focus and editing stop rotation until explicitly resumed. Respect reduced motion by starting paused. Preserve each design's edits and undo history through every rotation. A new design is laid down in one motion; only a paper colour chosen by the reader fades, so lettering never flashes against the previous paper.

Let the posters demonstrate the idea before the controls do. In bloom pairs oversized lettering with a photographic specimen and a field-guide hierarchy. Form & space uses cobalt, an aluminium ribbon sculpture, and contrasting display type. City in flux sets acid-yellow lettering against a tightly cropped architectural photograph. Small edition marks, captions and rules make each composition feel like a considered printed piece. Concept copy belongs in `src/data/compad-designs.ts`, separate from career facts.

The inspector follows the selected object, with no Text/Image picker or type badges. Every word on the poster is editable. Text exposes wording and typography; the photograph exposes scale, rotation, opacity and flip. Selection outlines, corner brackets and drag feedback explain the action; undo/redo and layer ordering make experimentation reversible. Each design retains its own edits and undo history while switching in the current page session. On phones, place the larger poster above a compact inspector with room for touch controls.
