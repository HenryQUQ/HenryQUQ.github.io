# Chenyuan Qu — a personal collection

## Visual thesis

A personal folio on warm paper: an oversized name, a layered portrait, generous image-led spreads and a cinematic photographic pause. Ink and rust carry the composition; the artwork supplies the colour.

## Content plan

1. Introduction: meet Chenyuan through his name and curiosity about images. One paragraph and one invitation; professional roles move to the biography.
2. Selected projects: COMPaD first, then Nexus and Everyday tools. Give each interactive canvas more room and accompany it with a short human description. Keep roles, engineering detail and qualified outcomes in the project disclosure. Alpha status remains visible.
3. Research: VisualSplit opens with a generous interactive comparison, followed by an immersive 360+x spread. The paper library keeps complete authorship, references, figures and citations available on request.
4. About: an existing night photograph spans the page, followed by a personal account of the route from physics to computer vision. Experience, education and earlier updates remain available without taking over the page.
5. Contact: an invitation to compare notes, followed by the email address and public profiles.

## Interaction thesis

- The portrait's depth and three compositions make the opening feel like a living printed page. Preserve its manual controls, 4.5-second rotation and discreet progress toggle.
- COMPaD's three independently editable posters cycle every 4.5 seconds inside the first project. Work tabs remain manual. A short project story stays beside the large canvas while scrolling on desktop.
- Quiet entrance and section reveals lead to a second hands-on moment: a 360+x panorama viewed from inside the scene, ready to look around on arrival.

## Voice

Use concise, natural English in the first person. Lead with interests and the work itself. Avoid an applied-engineer pitch, business-results headlines, tools-and-skills inventories and repeated slogans. Keep AI terminology where it explains the actual work, rather than using it as a personal label. Preserve the verified research and technology roles in the biography and structured identity metadata.

Nexus manages 200,000+ devices; ERP estimates apply only to tasks evaluated; COMPaD is in first-stage alpha testing; 360+x is a collaborative paper with an oral presentation. Do not invent clients, released interfaces, testimonials, hobbies or accomplishments.

## Composition and accessibility

- Two fonts: DM Sans for reading and Newsreader for display type.
- Warm paper, charcoal ink and rust, with full-width photographic and colour changes between sections. Keep controls understated and the imagery generous.
- Fit the introduction inside common desktop and mobile viewports, with the fixed header included in the height budget.
- Visible keyboard focus, native disclosures, meaningful links and image alternatives. Preserve anchor and shared paper URLs.
- Reduced motion disables initial automatic playback, parallax and reveals. Portrait and poster timers pause offscreen and in background tabs; reading remains possible without JavaScript.
- Keep static export and base-path support; site imagery stays local under public/.

## Verification

Run lint, strict typechecking, a production export and the browser suite. Inspect desktop and narrow mobile layouts. Cover navigation, portrait and poster playback, independent edits, manual project selection, the immersive panorama, publication links/citations, disclosures, reduced motion, no-JavaScript reading, metadata and overflow.

## Project visuals — September 2026 refinement

Nexus uses the product's own Campaigns and content-scheduling previews and logo, arranged on a pale blue field. These are the publicly served feature images from the supplied Nexus site, selected after inspecting the authenticated workspace. COMPaD is a working poster canvas with three original compositions and independent editable lettering and photographic layers. The artwork remains explicitly credited as an interactive concept, not a screenshot of the alpha product.

### VisualSplit, through actual examples

Visual thesis: a photographic study on warm paper, with a large before-and-after image and small, tangible visual ingredients beside it.

Content plan: introduce VisualSplit in one sentence, then let three published examples explain colour editing, relighting and reconstruction. Start with the white-to-red egret, show the edited colour map beside it, and let the reader compare the actual result. A mountain scene demonstrates three published lighting choices; the dog reconstruction shows the actual edge map, colour map and brightness histogram. Keep the lower-resolution reconstruction honest, and link to the source rather than expanding the section into a methods report.

Interaction thesis: a draggable comparison reveals the result directly beneath the original; three quiet manual tabs change the story, and the lighting choices swap real published outputs. Keep the tabs reachable while reading, and bring the new image into view when switching from the lower notes. Use brief entry fades only when motion is allowed. No timed cycling, synthetic filters or live-inference claims. Preserve the full source images, including their framing, with a readable static comparison before hydration and without JavaScript.

### An immersive 360+x window

The scene fills a wide photographic frame, with the camera at the centre of the panorama. The reader arrives inside the museum and can immediately look around; there is no exterior globe or globe-mode switch. Keep only a discreet drag hint and reset control over the image, then the existing project description below. Mouse dragging and arrow keys turn the view, Home resets it, and vertical touch gestures keep the page scrollable. Load the renderer near the viewport, render only on interaction or resize, and retain a full-frame still image when JavaScript or WebGL is unavailable.

### An illustrated reading list

Visual thesis: four generous, image-led reading entries on the same warm paper, with a distinctive visual for each study and quiet rules between them.

Content plan: show a recognisable example before opening a paper—VisualSplit colour editing, DIFF street imagery and segmentation labels, a 360+x scene, and a real MeD noisy/denoised pair. Keep the short plain-language titles, authorship and citations. Opening an entry brings its original overview figure directly into view beside the reading, with posters and presentations still available below.

Interaction thesis: hover or keyboard focus gently reveals the paired image; the panorama preview shifts across the scene. Opening a native disclosure exposes more visual detail. Use no automatic loop, no nested controls inside the summary, and no invented research results. Reduced motion retains a clear static comparison, and the list remains useful without JavaScript. Mobile gives each image a full-width position above its title.

### Direct editing

The work selector opens on COMPaD. Its three poster designs cycle within the canvas, with a small progress control beside the invitation to edit and no timing labels. Hold the poster while hovered, offscreen, on a different work tab or in a hidden browser tab; manual design selection, focus and editing stop rotation until explicitly resumed. Respect reduced motion by starting paused. Preserve each design's edits and undo history through every rotation.

Let the posters demonstrate the idea before the controls do. In bloom pairs oversized lettering with a photographic specimen and a field-guide hierarchy. Form & space uses cobalt, an aluminium ribbon sculpture, and contrasting display type. City in flux sets acid-yellow lettering against a tightly cropped architectural photograph. Small edition marks, captions and rules make each composition feel like a considered printed piece. Concept copy belongs in `src/data/compad-designs.ts`, separate from career facts.

The inspector follows the selected object, with no Text/Image picker or type badges. Every word on the poster is editable. Text exposes wording and typography; the photograph exposes scale, rotation, opacity and flip. Selection outlines and drag feedback explain the action; undo/redo and layer ordering make experimentation reversible. Each design retains its own edits and undo history while switching in the current page session. On phones, place the larger poster above a compact inspector with room for touch controls.
