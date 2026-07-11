# Academic Editorial Profile — Design Spec

This document defines the visual, editorial, and interaction direction for Chenyuan Qu's personal website. The site is an academic profile and public research record, not a product landing page, company website, or portfolio campaign. Its purpose is to make identity, research interests, publications, experience, and contact information easy to read and verify.

## Design intent

The site should feel like a carefully typeset academic profile: quiet, precise, personal, and current.

- Use a warm-white reading surface, ink-coloured text, restrained academic blue, fine rules, and generous but not theatrical whitespace.
- Let the research record establish credibility. Avoid slogans, promotional claims, inflated outcomes, metric-led selling, and product-language calls to action.
- Use the display serif to introduce editorial character; use the sans serif for comfortable reading and interface clarity.
- Prefer a continuous document structure over panels, dashboards, feature grids, or interchangeable cards.
- Treat the portrait and research figures as documentary material. They should support the record rather than act as cinematic decoration.
- Use squared or lightly rounded frames, modest control styling, and almost no shadow. The interface should not resemble a SaaS or agency site.
- Keep colour and motion subordinate to typography, evidence, and source links.

The guiding idea is **an academic record with an editorial reading experience**.

## Content voice

Copy is factual, specific, and written in clear first-person English.

- State the current degree, role, affiliations, and research topics directly.
- Describe research through questions, methods, contributions, publication venues, and available evidence.
- Use plain labels such as `Research`, `Publications`, `Experience`, `News`, and `Contact`.
- Prefer “My research focuses on…” to positioning slogans such as “building the future of…” or “at the intersection of…”.
- Do not imply commercial impact, deployment scale, leadership scope, or research outcomes beyond the sourced facts in `src/data/site.ts` and `docs/sources.md`.
- Calls to action are informational links: paper, code, dataset, citation, profile, source, or email. Avoid conversion-oriented language.

## Information architecture

The site is an English-language single-page academic profile with a fixed, compact header and conventional anchor navigation.

1. **Introduction** — name, concise academic and professional identity, short biography, profile links, affiliation, portrait, and location.
2. **Research interests** — three brief rows defining the current areas of inquiry: interpretable image representations, multimodal scene understanding, and generative computer vision.
3. **Research** — two selected projects shown as complete, static editorial entries with a research image, question, contribution, publication outcome, and source links.
4. **Publications** — the complete scholarly record grouped by year, with authorship, venue, summary, paper resources, citation tools, media, and related datasets.
5. **Experience** — research appointments, education, and industry experience, with optional detailed role notes.
6. **News** — recent publication, presentation, and research updates, followed by a native expandable archive.
7. **Contact** — a short contact note, one primary email address, profile links, and copyright.

The persistent navigation labels are `Research`, `Publications`, `Experience`, `News`, and `Contact`. The active location is indicated with a fine underline. Navigation should orient the reader; no item is styled as a sales-oriented primary action.

## Layout system

- The shared container is fluid and capped at `78rem`, with horizontal padding of `1.25rem`, `2rem`, and `2.5rem` as the viewport grows.
- Standard content sections use vertical padding of `4rem`, `5rem`, and `6rem` across the main breakpoints.
- Fine horizontal rules are the primary method of grouping headings, records, timelines, and actions.
- Section introductions use a narrow label column and a wider heading-and-description column from medium screens upward. They become a single readable column on small screens.
- Reading copy is generally capped around `68ch`; long prose should not span the full container.
- Grid columns are asymmetric where useful, but the page should still read as one continuous document.
- Avoid minimum full-viewport sections. Section height is determined by content.
- Avoid card walls, floating glass panels, oversized empty stages, sticky narrative chapters, and alternating dark feature bands.
- Anchor targets include fixed-header clearance through the document-level `scroll-padding`.

### Introduction

- The opening section is a compact two-column editorial composition on desktop: identity and biography on the left, portrait on the right.
- The name is the primary typographic element, set in Newsreader at a normal weight. It should feel like a masthead, not an advertising headline.
- Positioning, biography, academic profiles, affiliation, portrait caption, and Birmingham local time remain immediately visible without promotional badges or animated graphics.
- The portrait uses a simple `4:5` framed crop, a fine border, and a very small corner radius.
- On mobile, text precedes the portrait in the same semantic order; links wrap naturally with no horizontal overflow.

### Research interests

- Research interests appear as three concise ruled rows, not service cards or feature tiles.
- Each row pairs a precise topic with one explanatory sentence.
- Each row begins a factual research thread linking the inquiry to its selected study and publication. Native URLs remain usable without JavaScript.
- The active thread may add a fine blue rule, a pale annotation wash, and a compact contextual rail on very wide screens. The relationship is also written in the study and publication records so colour is never the only cue.
- This section functions as an index of current inquiry and must not introduce unsourced claims.

### Selected research

- Selected research is a static sequence of editorial articles on the warm paper surface.
- Each article pairs one real research figure with a written account. At large widths, image and text share a two-column row; at smaller widths they stack.
- Entries expose the same factual structure: research question, personal contribution, publication outcome, year, context, and relevant links.
- Scroll position never changes media or replaces, hides, or crossfades content. An `IntersectionObserver` may update only the location reported by the research-thread rail; it does not write history, move focus, or hijack scrolling.
- There is no sticky media stage, chapter counter, page-progress indicator, or dark scrollytelling surface.
- Images use restrained borders and light backgrounds. Research figures that require their full composition use `object-contain`; photographic or full-bleed material may use `object-cover`.
- Selected-research figures may open in the existing accessible media lightbox for detailed inspection. Figures with sourced annotations expose a keyboard-operable Lens with labelled regions, roving tab focus, an original-image fallback, and focus restoration on dismissal.

### Publication list

- Publications are grouped by year and presented as ruled editorial rows, never as a card grid.
- Each row places a modest preview beside bibliographic information on desktop and stacks the same content on mobile.
- Title, authors, full venue, summary, and resource actions remain readable in the page itself. Opening a spotlight is optional enrichment, not the only way to access the record.
- The year column may remain sticky at large widths as a quiet navigational aid; publication content itself remains static.
- Paper, author, code, dataset, project, citation, BibTeX, poster, and video links are independent controls.
- A publication spotlight may provide the abstract and larger media. Figures, posters, and videos may open in a focused media lightbox. URL query parameters preserve direct links into these states.
- Standalone datasets follow the publication record as compact ruled rows.

### Experience and news

- Experience is split into research appointments and education on one side and industry experience on the other at extra-large widths. It becomes one linear reading sequence on narrower screens.
- Entries lead with role, organisation, period, and concise factual detail.
- Optional role highlights use native `details` and `summary`; collapsed detail should not hide essential identity or dates.
- News uses dated ruled rows. The three most recent entries are visible, and earlier entries are available through a native expandable archive.
- Dates and archive counts use small monospaced metadata, while titles retain the editorial serif hierarchy.

### Contact and footer

- Contact is a compact closing section on a lightly differentiated warm surface, not a full-screen finale.
- It contains one short sentence and one clearly visible personal email address, followed by lower-emphasis work and university addresses.
- Do not use a photographic background, gradient overlay, oversized closing slogan, multiple competing primary email buttons, or collaboration pitch.
- A fine rule separates the footer, which contains copyright and secondary profile links.

## Typography

The type system combines an editorial display face with a highly readable interface face.

- **Display:** `Newsreader`, loaded through `next/font` as a variable optical-size font with normal and italic styles. Use it for the name, section titles, research and publication titles, update titles, and the contact address.
- **Body and interface:** `Source Sans 3`, loaded through `next/font`. Use it for biographies, descriptions, navigation, timelines, actions, captions, and controls.
- **Metadata:** `IBM Plex Mono` in weights 400, 500, and 600. Reserve it for short dates, years, labels, identifiers, counters, and compact bibliographic metadata.
- **Name:** fluid sizing from about `3.5rem` on mobile to `7.75rem` on wide screens, normal weight, approximately `0.9` line height, and restrained negative tracking.
- **Section titles:** fluid sizing from about `2.6rem` to `4.8rem`, normal weight, approximately `1.02` line height.
- **Record titles:** generally `1.8rem` to `2.15rem` with enough line height for long paper titles.
- **Body copy:** normally `1rem` to `1.125rem`, with line heights around `1.75` to `2` for sustained reading.
- **Labels:** small but legible. Monospaced metadata may be uppercase with moderate tracking; ordinary section kickers remain sentence case in the sans serif.

Hierarchy should come from typeface, size, line length, rules, and whitespace. Do not rely on extreme scale, ultra-tight line height, all-caps display copy, ornamental italics, or excessive weight.

## Colour and surfaces

The normative palette is warm white, ink, and academic blue.

| Token | Value | Primary use |
| --- | --- | --- |
| `paper` | `#f7f5ef` | Main reading background |
| `surface` | `#efebe2` | Quiet alternate section surface |
| `stone` | `#e9e5dc` | Image backing and subtle separation |
| `ink` | `#111419` | Primary text and strong controls |
| `muted` | `#60635f` | Secondary copy and metadata |
| `line` | `rgba(17, 20, 25, 0.14)` | Rules and restrained borders |
| `accent` / `signal` | `#234b8e` | Academic links, focus, and active details |
| `signal-soft` | `#e2e8f2` | Very light blue interaction feedback |

- Most sections stay on `paper`; low-opacity `surface` variants provide only gentle rhythm.
- Blue is an academic annotation colour, not a branding spectacle. Use it sparingly for links, focus, selection, and small active states.
- Do not introduce near-black feature sections, coloured case-study chapters, glows, technical grids, noise textures, glass surfaces, or large gradients.
- Maintain WCAG AA contrast for all text and interactive states. Opacity is not a substitute for a properly chosen secondary text colour.

## Interaction and motion

The baseline reading experience is static. Interaction exists only where it reveals useful information or supports navigation.

- The fixed header gains an opaque warm-paper backing and restrained blur after scrolling.
- Active navigation uses a short underline transition. Links and controls may use brief colour, border, underline, or opacity feedback of roughly `200–300ms`.
- Native anchors retain immediate browser scrolling; do not add scroll hijacking or global smooth scrolling.
- Research-thread cross-references use native anchors. Explicit selection adds a shareable `thread` query parameter; scroll observation only reports location and never changes history. The portrait caption may show the current `Europe/London` time, updated once per minute without animation.
- Research figures provide a restrained hover/focus affordance and open a high-resolution viewer with `Escape` dismissal and focus restoration. Lens region changes are user-controlled and use short positional transitions only.
- Research entries, publication rows, timelines, and news are visible on initial render. Do not add scroll-triggered reveals, parallax, pointer-following graphics, animated diagrams, counters, or ambient loops.
- Spotlight and lightbox transitions should be short and functional. They must never delay access to content or dismissal.
- Media never autoplays with sound, and motion is not required to understand any research item.

All transitions respect `prefers-reduced-motion`. In reduced-motion mode, non-essential animation durations collapse to effectively zero while content and controls remain fully available.

## Responsive behaviour

The implementation follows the default Tailwind breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, and `xl` 1280px.

- Mobile is a complete linear academic record, not a compressed desktop layout.
- The desktop navigation becomes a modal-style menu below `lg`.
- Introduction, section headers, selected research, publication rows, experience columns, news rows, and contact stack without changing semantic order.
- Research figures remain legible and preserve their intended fit when stacked.
- Actions wrap into multiple lines rather than shrinking below comfortable reading or touch sizes.
- Menu rows and important controls maintain at least a `44px` interactive target where practical.
- No section, dialog, figure, table-like row, email address, or external link may create horizontal overflow at a `390px` viewport.

## Accessibility

- Preserve semantic landmarks and heading order: header and labelled navigation, `main`, named sections, articles and lists, and footer.
- Every meaningful portrait, research figure, poster, and media item has contextual alternative text. Purely decorative styling remains outside the accessibility tree.
- Interactive publication previews use progressive-enhancement links with `aria-haspopup="dialog"`; without hydration they lead to the corresponding project or paper. Nested author and resource links remain separate controls; an article itself must not masquerade as a button.
- Mobile navigation, publication spotlights, and media lightboxes provide predictable initial focus, a contained tab sequence, `Escape` dismissal, scroll locking, and focus restoration. Background content becomes inert while a modal is active.
- The active navigation item exposes `aria-current="location"`.
- Focus indicators use a visible two-pixel academic-blue outline with adequate offset.
- Native `details` and `summary` retain their keyboard behaviour for optional role detail and older news.
- Body text, muted text, links, controls, and focus states meet WCAG AA contrast on every used surface.
- The complete academic record remains readable and operable with reduced motion, JavaScript-delayed visual effects disabled, or a keyboard as the only input.

## Component and content rules

- Factual profile, research, publication, project, news, experience, and education content belongs in `src/data/site.ts`, not inline in page composition.
- Public claims must be traceable in `docs/sources.md`. Keep dates and qualifications conservative when a more precise description is not sourced.
- Use real research figures, posters, and project assets where rights and provenance are clear.
- The publication list is the durable scholarly record. Selected research is a concise editorial subset, not a separate marketing case-study system.
- Keep one primary personal contact route. Organisation and university addresses remain visible as compact secondary routes without competing with it.
- Structured metadata should describe the person and scholarly articles accurately through `Person` and `ScholarlyArticle` schema.
- Legacy component names must not dictate the visual behaviour: a component may retain an implementation name while rendering a static editorial section.

## Acceptance criteria

Review the page at desktop and `390 × 844` mobile sizes. Before handoff, verify:

- the page reads unmistakably as an individual academic profile rather than a product or company website;
- the introduction, research interests, selected research, publications, experience, news, and contact sections appear in the documented order;
- no dark scrollytelling section, signal field, full-viewport contact treatment, promotional CTA, or scroll-driven case transition remains;
- typography resolves to Newsreader for display text and Source Sans 3 for body and interface text;
- selected research entries and the complete publication record are present without depending on animation or dialogs;
- research-thread cross-references, the local-time caption, and keyboard-operable Figure Lens work without disturbing the reading flow;
- anchor navigation clears the fixed header and reports the correct active location;
- mobile navigation, spotlight, lightbox, citation, BibTeX, and disclosure controls work by keyboard and restore focus correctly;
- all meaningful images have useful alternative text and decorative elements are ignored by assistive technology;
- there is no horizontal overflow, including at `390px` and with long paper titles or the email address;
- reduced-motion mode retains all information and removes non-essential movement;
- automated Axe checks report no serious or critical WCAG A/AA violations;
- `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:e2e` pass against a fresh static export.
