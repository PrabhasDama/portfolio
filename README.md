# Prabhas Dama — Portfolio

A dark-first, product-led portfolio built with Next.js 16.3.5, React, TypeScript, Tailwind CSS 4, and Lucide. Content renders on the server and exports to static HTML. The only client components are the navigation and progressive scroll reveals. Motion uses CSS; no animation library or external font requests are needed.

## Run locally

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Run `npm run lint`, `npm run typecheck`, and `npm run build` to validate. `npm run check` runs all three. The production build uses Next.js's supported webpack builder because Turbopack's CSS worker could not bind its local port in the execution environment. The development server uses Turbopack.

The production output is `out/`. Serve that directory with any static host; `next start` does not serve a static export. To use Vercel's server runtime and automatic image optimization, remove `output: "export"` and `images.unoptimized` from `next.config.ts`.

## Content and configuration

- `data/profile.ts`: name, education, role, contact links and personal domain.
- `data/projects.ts`: typed project records, capabilities, links, images, and case-study sections. Add/remove a record to update generated project routes and the sitemap.
- `data/experience.ts`: experience records and education. Replace the marked placeholder with verified experience; placeholder records never render as jobs.
- `data/capabilities.ts`: restrained technology categories based on the supplied CalTrack stack.
- `lib/site.ts`: the actual private preview origin; a supplied `NEXT_PUBLIC_SITE_URL` takes precedence.

Copy `.env.example` to `.env.local` and fill in real values. All listed variables are public build-time values, so never put secrets there. Rebuild after changing them. Unset contact/project links render as noninteractive “Soon” labels, not broken links. The resume action appears only when a real URL is supplied. The personal domain remains unset; preview metadata uses the registered preview URL.

Search indexing is disabled until `NEXT_PUBLIC_SITE_URL` is configured. Before public launch, supply and verify the personal domain, real links, and project content, then rebuild. Sites access controls are separate from robots metadata; the initial deployment is owner-private.

## Routes

- `/`
- `/projects/caltrack/`
- `/projects/mouse-telemetry/`
- `/projects/campussync/`
- `/projects/smartwaste/`
- `/sitemap.xml`, `/robots.txt`, and the custom 404 page

## Components

`components/islands` contains Island and native, keyboard-accessible ExpandableIsland. `components/navigation` contains the floating NavigationIsland. `components/projects` contains ProjectIsland, ProjectCaseStudy, CalTrackVisual, and ProjectGallery. `components/sections` composes the homepage. `components/ui` holds tags, links, headings, and the reveal observer.

The design tokens and responsive styles live in `app/globals.css`. The layout adapts at 360, 767, 1023, and 1600 pixels. On phones the navigation becomes a disclosure menu, the CalTrack narrative precedes its workflow, secondary projects use different compact layouts, capabilities use two columns, and project contents become wrapped inline links.

The navigation compacts on scroll without removing desktop links. Native disclosures open via keyboard, arrows respond on hover, cards lift subtly, and first-load/scroll entrances use opacity and transforms. Reduced-motion preferences disable animation and smooth scrolling. Content remains visible if the reveal enhancement does not run.

## Screenshots

No fictional product screenshots, outcomes, usage metrics, employers, or awards are included. The CalTrack artwork is a labeled conceptual workflow diagram. Add real assets under `public/projects/<slug>/` and populate `images` with `{ src, alt, width, height, caption? }`. ProjectGallery uses `next/image`, lazy loading, intrinsic dimensions, and responsive sizes. Since this is a static export, supply appropriately compressed WebP/AVIF images; on-demand Next image optimization is disabled.

## Next content pass

1. Supply GitHub, LinkedIn, email, resume, and domain.
2. Add real CalTrack screenshots, product/source links, dates, architecture, tradeoffs, and verified outcomes.
3. Document Mouse Telemetry, CampusSync, and SmartWaste.
4. Add verified experience records.
5. Run a production Lighthouse audit after actual assets and public hosting are configured. No Lighthouse scores are claimed by this implementation.
