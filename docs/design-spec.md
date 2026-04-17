# Design Spec

## Visual thesis

A quiet editorial research site: warm paper tones, charcoal typography, precise spacing, and a single full-bleed hero built around Chenyuan Qu's portrait so the page feels personal and academic rather than product-marketing driven.

## Content plan

1. Hero: name, role, affiliation, short bio, essential links, portrait as the dominant visual plane
2. Support: research interests and a tightly curated publications selection
3. Detail: full publication record, dataset surfaces, news, experience, and education
4. Final CTA: concise contact footer

## Interaction thesis

1. Hero entrance sequence: name, metadata, and link row rise in with slight stagger while the portrait fades in more slowly.
2. Sticky navigation: calm, thin active indicator that tracks the section in view.
3. Editorial reveal system: section blocks and publication rows ease upward on first entry; hover states extend dividers and shift text color rather than adding cards or shadows.
4. Publication spotlight: opening a paper should feel like moving into a reading room rather than leaving the page, with a restrained overlay and local media preview.
5. Media lightbox: figures, posters, and verified video media expand to a quiet full-screen viewer with keyboard controls, not a flashy gallery treatment.

## Layout system

### Hero

- Full viewport composition.
- Text anchored left inside a narrow reading column.
- Portrait fills the right side as a full-height visual field, softened with monochrome treatment and gradient masking for readability.
- Navigation overlays the hero and becomes more solid after scrolling.
- No badges, chips, stats, or secondary promos in the first viewport.

### Main body

- Single-page site with anchor navigation.
- Sections separated by thin rules and generous vertical rhythm.
- Two-column layouts used only where content benefits from contrast:
  - research interests vs. short framing text
  - experience and education timelines
- Publications use list architecture, not boxed cards.

### Section jobs

- About: orient the reader in one glance.
- Research Interests: state the intellectual focus.
- Selected Publications: present the strongest, most current work.
- Publications & Datasets: provide a complete and compact academic record, with linked dataset surfaces where they materially extend the work.
- Datasets: surface dataset pages, code, and challenge links without turning the page into a project gallery.
- News / Highlights: concise milestones only.
- Experience: present a restrained high-level timeline.
- Education: show only the most relevant academic history.
- Contact / Footer: provide one clear route to get in touch.

## Typography

- Display serif: `Cormorant Garamond` for the name, section headings, and selected publication titles.
- Sans companion: `IBM Plex Sans` for navigation, metadata, body copy, and link systems.
- Metadata styling uses uppercase tracking and reduced size rather than pills or chips.
- Target line length: roughly 60 to 72 characters for paragraph text.

## Color system

- Background: warm paper off-white
- Surface variation: very light stone
- Text: charcoal and softened slate
- Accent: muted olive-bronze used sparingly for links, rules, and focus states
- No bright gradients, glass effects, or large shadows

## Component hierarchy

- Sticky header with active section state
- Hero block
- Section heading block
- Publication feature rows
- Compact publication list items
- Publication spotlight dialog
- Figure / poster / video lightbox
- Dataset highlight rows
- Timeline rows for experience and education
- Footer link cluster

## Motion and restraint rules

- Motion duration should stay short and deliberate.
- Hover changes should rely on typography, underlines, and divider movement.
- Any background effects must stay subordinate to content legibility.
- Mobile should preserve the same calm hierarchy rather than collapsing into stacked cards.

## Mobile behavior

- Hero keeps the portrait as a background plane rather than a separate image block.
- Navigation collapses to a simple drawer button.
- Publication and dataset rows stack cleanly with venue and links beneath titles.
- Section spacing remains generous, but paragraph widths are slightly wider than on desktop to avoid awkward wrapping.
