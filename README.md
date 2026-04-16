# Chenyuan Qu Personal Website

A statically exportable academic website for Chenyuan Qu, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static export for GitHub Pages

## Project structure

- `app/` - App Router entrypoints and global styles
- `components/` - presentation and interaction components
- `src/data/` - structured profile, publication, project, and timeline data
- `public/` - local static assets used by the site
- `docs/sources.md` - source mapping and verification notes
- `docs/design-spec.md` - visual and layout specification
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow

## Local development

```bash
npm install
npm run dev
```

The dev server will be available at `http://localhost:3000`.

## Production build

```bash
npm run lint
npm run typecheck
npm run build
```

The static export is written to `out/`.

## GitHub Pages deployment

This project is configured for both GitHub Pages project pages and user or organisation pages.

- On GitHub Actions, `next.config.mjs` inspects `GITHUB_REPOSITORY`.
- If the repository name ends with `.github.io`, the site is built with no `basePath`.
- Otherwise, it automatically builds under `/<repo-name>` for GitHub project pages.

The included workflow deploys the contents of `out/` to GitHub Pages on pushes to `main`.

### Manual base path override

If you want to preview a project-page deployment path locally, set `NEXT_PUBLIC_BASE_PATH` before building:

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name npm run build
```

## Content updates

Most content changes only require editing `src/data/site.ts`.

Use `docs/sources.md` as the reference for:

- where each fact came from
- which items were cross-verified
- which details remain intentionally conservative or unresolved

## Notes

- The site avoids server runtime features and is safe for static hosting.
- Images are configured as unoptimized for GitHub Pages compatibility.
- Internal section navigation is anchor-based and works in the static export.
