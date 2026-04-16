# Repository Guidelines

## Project Structure & Module Organization

This repository is a statically exported Next.js academic website. Keep code and content separated:

- `app/` App Router entrypoints, global styles, and page-level composition.
- `components/` reusable UI building blocks such as headers, publication rows, and timeline items.
- `src/data/` structured content and TypeScript types. Update facts in `src/data/site.ts`, not inline in `app/page.tsx`.
- `public/` local static assets used at build time, especially `public/images/`.
- `docs/` supporting documentation, including `sources.md` for fact provenance and `design-spec.md` for visual direction.
- `.github/workflows/` deployment automation for GitHub Pages.

## Build, Test, and Development Commands

- `npm install` installs dependencies.
- `npm run dev` starts the local dev server at `http://localhost:3000`.
- `npm run lint` runs Next.js ESLint checks.
- `npm run typecheck` runs strict TypeScript validation.
- `npm run build` creates the production static export in `out/`.

Before opening a PR, run:

```bash
npm run lint
npm run typecheck
npm run build
```

## Coding Style & Naming Conventions

- Use TypeScript with strict types and functional React components.
- Prefer 2-space indentation and concise, readable JSX.
- Use `kebab-case` for component files (`site-header.tsx`) and route folders; use `PascalCase` only for component/type identifiers.
- Keep styling in Tailwind utilities and `app/globals.css`; avoid ad hoc inline style objects unless necessary.
- Preserve the current pattern: named exports for shared components, default exports for route files like `app/page.tsx`.

## Testing Guidelines

There is no formal automated test suite yet. Validation is currently:

- static checks: `npm run lint` and `npm run typecheck`
- production safety: `npm run build`
- visual QA: inspect desktop and mobile layouts, preferably with Playwright screenshots for hero, publications, and project sections

If you add tests later, place them near the feature or in a dedicated `tests/` directory and name them after the feature they verify.

## Commit & Pull Request Guidelines

Recent history uses short imperative commit subjects such as `Update README.md` and `Delete Unused pdfs`. Follow that style:

- keep the subject line short and action-oriented
- group related content, styling, and data changes in one commit
- mention source updates when factual content changes

PRs should include a concise summary, screenshots for desktop and mobile when UI changes, and note any updates to `docs/sources.md` when public facts are added or revised.
