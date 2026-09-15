# COMPaD concept artwork

The three live posters are portfolio demonstrations of separate editable text and image layers. They are not captures of the COMPaD alpha UI or claims that COMPaD produced these photographs. All lettering, typefaces, paper colours, layer positions and image transforms are controlled by the page. Each design retains its changes and undo history while switching in the current page session.

The flower is original concept artwork made with the built-in image generation tool, then exported to `public/images/projects/compad-flower.webp` with its alpha channel preserved. The first generated poster sheet was used as an art-direction reference only; it is not served by the site.

The other two designs use original photographs generated with the same tool. The silver sculpture is stored at `public/images/projects/compad-sculpture.webp` (1254 × 1254, alpha preserved); the architectural photograph at `public/images/projects/compad-city.webp` (1024 × 1536). Conversion to WebP changes only the encoding. Lettering and page composition are rendered separately in HTML/CSS, so none of the poster text is baked into the images.

## Silver sculpture prompt

```text
Use case: product-mockup. Make a photorealistic fine-art studio photograph of a single physical sculpture for an editable graphic-design exhibition poster. The sculpture is a rolled and folded sheet of brushed aluminium, making one elegant open S-shaped ribbon loop with crisp thin edges, a large negative-space opening, subtle scratches and directional brushed texture. Dynamic diagonal composition, full object visible, broad soft studio highlights and dark reflections, solid convincing material and photographic realism. It must feel like an actual gallery object, not a glossy liquid blob or a computer technology icon. The surrounding poster will have bold cobalt-blue typography and paper, so keep the object neutral silver. Isolate the sculpture on a genuinely transparent alpha background, with generous clear margin. No base, no pedestal, no text, no letters, no logos, no printed poster or UI frame. No colored halo, no glow, no checkerboard pixels; crisp natural alpha edges. Square canvas, high resolution.
```

## Architectural photograph prompt

```text
Use case: photorealistic-natural. A striking black-and-white architectural photograph for an editorial poster about seeing the city differently. Portrait 2:3 composition. Look upward from a tight urban passage between monumental weathered concrete buildings; deep vertical shadows, dramatic stepped geometric forms and an asymmetric sliver of bright sky lead the eye upward. Build a visually complex but coherent composition with repeating windows, layered walkways and strong oblique perspective. It should feel like a fine-art architectural photograph on grainy silver-gelatin film: rich blacks, tactile rough concrete, detailed midtones, luminous sky, real imperfect surfaces. No specific identifiable landmark is necessary. Keep the lower quarter relatively dark and calm, suitable for separately rendered poster lettering. No people, no cars, no shop signs, no words or typography, no logos, no border, no UI. This is just the photograph; all typography will be independently editable on the website.
```

## Initial art-direction prompt

```text
Use case: ads-marketing. Create a finished art-directed editorial poster exhibition image for the COMPaD creative-design project on a designer's personal portfolio. It is original concept artwork, not a software interface or an actual product screenshot.
Square composition, high resolution. Three beautifully designed physical paper posters fill most of the frame, overlapping very slightly against a warm light stone gallery background. Straight-on frontal view, realistic paper and subtle natural shadow, no dramatic perspective or bent sheets. Main middle poster occupies 52% of width and 85% of height, fully visible; left and right narrower posters sit a little behind, offset vertically, but their designs stay legible. Sophisticated Swiss/editorial typography and photographic art.
A cohesive botanical art series. Center poster: warm ivory paper, a stunning dramatically lit vermilion-red calla lily and its sculptural curved green stem, photographed on ivory. The typography is integrated thoughtfully with the flower: oversized black elegant editorial serif reading exactly "Ideas,\nin bloom." broken across two or three lines, arranged in open space without blocking the flower; small precise text "BOTANICAL STUDIES" at the top. Rich real photographic texture, huge confident type, quiet margins. Left poster: muted butter-yellow field, high-contrast black and white macro botanical photograph cropped boldly, simple large black condensed type reading "FORM" vertically or stacked, small number "01". Right poster: deep forest-green field, vivid light chartreuse close-up leaf and delicate warm-white display typography reading "NATURE", small number "03". They should look like three credible exhibition posters by a top-tier graphic designer, restrained yet striking, NOT generic templates.
No device frames, no user interface, no editing handles, no selection boxes, no people, no logos or watermarks, no extra writing beyond the specified text. Balance whitespace, large type and real photographic botanical forms. All three posters should be visually distinct yet unmistakably one series. Avoid glossy 3D blobs, gradients, random abstract geometry, busy collages, tiny paragraphs and cheap Canva-like stock templates.
```

## Final flower-layer prompt

```text
Use case: background-extraction. The reference is the concept poster image we just generated. Extract ONLY the large red calla lily and its curved green stem from the central ivory poster as one high-quality photographic cutout on a truly transparent background. Remove all typography, all paper and gallery backgrounds, all shadows of paper, and the two side posters entirely. Preserve the flower's rich vermilion-red photographic texture, lighting, shape, dark throat and natural green curved stem. Reconstruct any portion of the stem hidden behind text so that the flower is complete. Keep the full flower and stem comfortably inside the image with a small transparent margin; a portrait canvas is appropriate. This will be an independently movable image layer in a live editable poster; there must be NO baked-in text, no rectangular background, no extra objects, no logos or watermark, and NO checkerboard pixels. Actual alpha transparency required.
```
