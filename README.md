# Prabhas Dama — Portfolio

A dark, technical portfolio built with Next.js 16.3.5, React and TypeScript, set in IBM Plex Sans and IBM Plex Mono (self-hosted at build time through `next/font`). Content renders on the server and exports to static HTML. The one client component is the interactive CalTrack dependency graph on the homepage and case study.

## Run locally

Use Node.js 22.18 or newer (Node.js 24 was used for validation).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Run `npm run lint`, `npm run typecheck`, and `npm run build` to validate. `npm run check` runs all three plus the article-system tests. The production build uses Next.js's supported webpack builder because Turbopack's CSS worker could not bind its local port in the execution environment. The development server uses Turbopack.

The production output is `out/`. Serve that directory with any static host; `next start` does not serve a static export. To use Vercel's server runtime and automatic image optimization, remove `output: "export"` and `images.unoptimized` from `next.config.ts`.

## Content and configuration

- `data/profile.ts`: name, education, role, contact links and personal domain.
- `data/projects.ts`: typed project records, links, images, and case-study sections. Add/remove a record to update generated project routes and the sitemap.
- `data/experience.ts`: experience records and education. Replace the marked placeholder with verified experience; placeholder records never render as jobs.
- `lib/site.ts`: the actual private preview origin; a supplied `NEXT_PUBLIC_SITE_URL` takes precedence.

Your supplied email, GitHub, and LinkedIn links are configured in `data/profile.ts`. To override them, copy `.env.example` to `.env.local`. All listed variables are public build-time values, so never put secrets there. Rebuild after changing them. Unset project links render as noninteractive “Soon” labels, not broken links. The resume action appears only when a real URL is supplied. The personal domain remains unset; preview metadata uses the registered preview URL.

Search indexing is disabled until `NEXT_PUBLIC_SITE_URL` is configured. Before public launch, supply and verify the personal domain, real links, and project content, then rebuild. Sites access controls are separate from robots metadata; the initial deployment is owner-private.

## Routes

- `/`
- `/projects/caltrack/`
- `/projects/mouse-telemetry/`
- `/projects/campussync/`
- `/projects/smartwaste/`
- `/blog/` and `/blog/<article-slug>/` for published articles
- `/sitemap.xml`, `/robots.txt`, and the custom 404 page

## Components

`components/sections` composes the homepage. `components/graph/system-graph.tsx` is the interactive dependency graph: a toy model of CalTrack's modules where changing one recomputes its dependents in topological order (Kahn's algorithm, longest-path levels), so each module runs once after all its inputs settle and a feedback edge is deferred rather than looped. It autoplays a few changes while on screen until someone clicks a node, and with reduced motion it jumps straight to the result. `components/projects` holds the case-study page and the gallery (which renders only once real images exist). `components/ui/primitives.tsx` has the path-labelled `Section`, the breadcrumb and a link helper.

Styles live in `app/globals.css`, with colour tokens at the top. The graph switches to a taller two-column layout below 700px. Other motion is CSS only: the intro rises in, the caret blinks, link arrows nudge on hover. `prefers-reduced-motion` turns all of it off. The footer shows the build date and short commit hash, set in `next.config.ts`.

## Screenshots

No fictional product screenshots, outcomes, usage metrics, employers, or awards are included. The CalTrack graph is a labelled simplified model, not production code or a screenshot. Add real assets under `public/projects/<slug>/` and populate `images` with `{ src, alt, width, height, caption? }`. ProjectGallery uses `next/image`, lazy loading, intrinsic dimensions, and responsive sizes. Since this is a static export, supply appropriately compressed WebP/AVIF images; on-demand Next image optimization is disabled.

## Writing articles

Create a draft with `npm run post -- "Your article title"`, then edit the Markdown file under `content/articles/`. Preview drafts with `npm run dev`. Set `status: published` when ready, then rebuild and deploy. Drafts never enter production output. See [the writing guide](docs/writing.md) for the complete workflow.

## Next content pass

1. Supply a resume and personal domain.
2. Add real CalTrack screenshots, product/source links, dates, architecture, tradeoffs, and verified outcomes.
3. Document Mouse Telemetry, CampusSync, and SmartWaste.
4. Add verified experience records.
5. Run a production Lighthouse audit after actual assets and public hosting are configured. No Lighthouse scores are claimed by this implementation.
