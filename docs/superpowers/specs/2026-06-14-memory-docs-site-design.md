# Memory Docs Site — Design Spec

**Date:** 2026-06-14
**Status:** Approved (design), pending implementation plan

## Goal

Turn the project `README.md` into a documentation website with a custom landing
page, built with [Fumadocs](https://fumadocs.dev) (Next.js App Router). The site
is a derived presentation of the README content; the README stays in the repo
root as the canonical quick reference.

## Decisions

| Decision | Choice |
|----------|--------|
| Framework | Fumadocs (Next.js App Router + Fumadocs MDX) |
| Location | `web/` subfolder in this repo, own `package.json` |
| Package manager | Bun (`bun install`); Next.js dev/build server |
| Content mapping | README split into 8 structured MDX pages |
| Landing page | Custom, dark developer-tool aesthetic with accent color |

`web/` is chosen over `docs/` because `docs/superpowers/specs/` already holds
brainstorming specs; keeping the site root separate avoids mixing the two.

## Architecture

```
web/
  app/
    (home)/page.tsx        # custom landing page
    docs/[[...slug]]/page.tsx  # Fumadocs docs renderer
    layout.tsx             # root layout (RootProvider)
    layout.config.tsx      # shared nav: logo, GitHub link, nav items
    api/search/route.ts    # Orama search endpoint (Fumadocs default)
  content/docs/
    index.mdx              # Introduction
    memory-types.mdx       # Semantic vs Procedural
    architecture.mdx       # Layers, services, data stores + diagram image
    data-model.mdx         # Prisma Memory fields & indexes
    api-reference.mdx      # All /api endpoints
    procedural-memory.mdx  # Usage, options, request/response
    setup.mdx              # Install, env vars, running, operational notes
    meta.json              # Sidebar order
  source.config.ts         # Fumadocs MDX source config
  next.config.mjs
  package.json
  tsconfig.json
```

### Components / units

- **Landing page** (`app/(home)/page.tsx`): hero (tagline "Fact-first memory +
  RAG for agents"), a code snippet showing a `POST /memories/ask` request,
  feature grid (Semantic search, Fact-first storage, Procedural memory, RAG
  Q&A, Deduplication, Configurable models), "Get Started" CTA → `/docs`. Dark
  background, mono/technical accent. Pure presentational React; no data deps.
- **Docs renderer** (`app/docs/[[...slug]]/page.tsx`): standard Fumadocs page
  that reads from the MDX source. Provides TOC, sidebar, search, prev/next.
- **MDX content** (`content/docs/*.mdx`): the data. Each file is one section of
  the README rewritten as MDX (tables, fenced code, callouts). Self-contained;
  editing one page does not affect others.
- **Source config** (`source.config.ts` + `lib/source.ts`): wires MDX files to
  the Fumadocs page tree. Standard scaffold output.

### Data flow

README (human source) → authored once into `content/docs/*.mdx` → Fumadocs MDX
compiler builds a page tree at build time → docs renderer + search index serve
pages. No runtime data fetching; fully static-friendly.

## Page → README mapping

| MDX page | README sections |
|----------|-----------------|
| `index.mdx` | Title, intro paragraph, Features |
| `memory-types.mdx` | Memory Types table |
| `architecture.mdx` | Architecture (image + layers/services/data stores), Key Flows |
| `data-model.mdx` | Data Model (Prisma) |
| `api-reference.mdx` | API Endpoints |
| `procedural-memory.mdx` | Procedural Memory (usage, options, response) |
| `setup.mdx` | Setup, Running, Environment Variables, Operational Notes, File Map |

The architecture diagram references the existing GitHub asset URL in the README.

## Error handling / edge cases

- No backend coupling — the site builds and runs independently of the API,
  Postgres, or Qdrant.
- 404s for unknown doc slugs use Fumadocs' default not-found handling.
- The architecture diagram is rendered via a plain `<img>` tag pointing at the
  existing remote GitHub asset URL, avoiding `next/image` remote-host config.

## Testing / verification

- `bun install` then `bun run build` succeeds with no type or MDX errors.
- `bun run dev` serves: landing page at `/`, docs at `/docs`, all 8 pages
  reachable from the sidebar, search returns results, dark mode renders.
- Manual visual check of the landing hero, feature grid, and CTA link.

## Out of scope (YAGNI)

Versioned docs, i18n, auth, analytics, deployment/CI config, auto-syncing MDX
from README (one-time authored copy is sufficient at this size).
