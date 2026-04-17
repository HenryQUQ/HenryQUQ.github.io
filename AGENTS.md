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
- `npm run preview:out` serves the exported site locally on port `4173`.
- `npm run test:e2e` runs Playwright smoke tests against the static export.

Before opening a PR, run:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

## Coding Style & Naming Conventions

- Use TypeScript with strict types and functional React components.
- Prefer 2-space indentation and concise, readable JSX.
- Use `kebab-case` for component files (`site-header.tsx`) and route folders; use `PascalCase` only for component/type identifiers.
- Keep styling in Tailwind utilities and `app/globals.css`; avoid ad hoc inline style objects unless necessary.
- Preserve the current pattern: named exports for shared components, default exports for route files like `app/page.tsx`.

## Testing Guidelines

- Keep browser tests in `tests/` using Playwright. Current coverage is smoke-level: homepage render, anchor navigation, mobile menu, overflow checks, and publication actions.
- Name specs after the surface they verify, for example `site.spec.ts`.
- Rebuild before e2e runs; `npm run test:e2e` expects a fresh `out/` directory and starts `npm run preview:out` automatically.
- When changing layout or content density, inspect both desktop and mobile screenshots in addition to the automated checks.

## Commit & Pull Request Guidelines

Recent history uses short imperative commit subjects such as `Update README.md` and `Delete Unused pdfs`. Follow that style:

- keep the subject line short and action-oriented
- group related content, styling, and data changes in one commit
- mention source updates when factual content changes

PRs should include a concise summary, screenshots for desktop and mobile when UI changes, and note any updates to `docs/sources.md` when public facts are added or revised.
