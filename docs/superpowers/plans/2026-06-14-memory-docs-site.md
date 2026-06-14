# Memory Docs Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Fumadocs documentation website with a custom dark developer-tool landing page, sourced from the project README, living in `web/`.

**Architecture:** A Next.js App Router app scaffolded with Fumadocs (Fumadocs MDX source). The README is authored once into 8 structured MDX pages under `content/docs/`. A custom landing page at `/` links into the docs. The site is fully independent of the API/Postgres/Qdrant and builds statically.

**Tech Stack:** Next.js (App Router), Fumadocs (`fumadocs-ui`, `fumadocs-core`, `fumadocs-mdx`), MDX, Tailwind CSS, Bun (package manager).

**Verification model:** No unit tests — this is content + presentation. Each task's gate is `bun run build` succeeding and/or `bun run dev` rendering the expected page. Commit after each task.

---

### Task 1: Scaffold the Fumadocs app in `web/`

**Files:**
- Create: `web/` (entire scaffold via CLI)
- Modify: root `.gitignore` (ensure `web/node_modules`, `web/.next`, `web/.source` ignored)

- [ ] **Step 1: Run the Fumadocs scaffolder**

Run from repo root:
```bash
bunx create-fumadocs-app@latest web
```
When prompted, choose:
- Template: **Next.js: Fumadocs MDX**
- Tailwind CSS / default styling: **yes**
- Install dependencies: **yes** (uses bun if detected; if it asks for package manager, pick **bun**)

This creates `web/app/`, `web/content/docs/`, `web/source.config.ts`, `web/lib/source.ts`, `web/package.json`, `web/next.config.mjs`, etc.

- [ ] **Step 2: Verify the dev server boots**

```bash
cd web && bun run dev
```
Expected: Next.js starts on http://localhost:3000, the default Fumadocs home and `/docs` render. Stop the server (Ctrl+C) after confirming.

- [ ] **Step 3: Ensure root .gitignore covers the new app**

Add these lines to the repo-root `.gitignore` if not already present:
```
web/node_modules
web/.next
web/.source
```

- [ ] **Step 4: Commit**

```bash
git add web .gitignore
git commit -m "feat(docs): scaffold Fumadocs app in web/"
```

---

### Task 2: Configure branding, nav, and dark default theme

**Files:**
- Modify: `web/app/layout.config.tsx` (or `web/lib/layout.shared.tsx` depending on scaffold version)
- Modify: `web/app/layout.tsx` (theme provider defaults)

- [ ] **Step 1: Set site title and GitHub nav link**

In `web/app/layout.config.tsx` (the file exporting `baseOptions`), set the nav title and add a GitHub link:
```tsx
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'Memory',
  },
  links: [
    {
      text: 'Documentation',
      url: '/docs',
      active: 'nested-url',
    },
    {
      type: 'icon',
      icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>,
      url: 'https://github.com/Prasad-D-Ware/memory',
      external: true,
    },
  ],
};
```

- [ ] **Step 2: Default the theme to dark**

In `web/app/layout.tsx`, configure the `RootProvider` theme to default to dark:
```tsx
<RootProvider theme={{ defaultTheme: 'dark' }}>
  {children}
</RootProvider>
```

- [ ] **Step 3: Verify build**

```bash
cd web && bun run build
```
Expected: build completes with no TypeScript/JSX errors.

- [ ] **Step 4: Commit**

```bash
git add web/app
git commit -m "feat(docs): set Memory branding, GitHub link, dark default theme"
```

---

### Task 3: Author docs content — concepts pages

**Files:**
- Modify: `web/content/docs/index.mdx` (replace scaffold default)
- Create: `web/content/docs/memory-types.mdx`
- Create: `web/content/docs/architecture.mdx`
- Create: `web/content/docs/data-model.mdx`

- [ ] **Step 1: Write `index.mdx` (Introduction)**

Replace the contents of `web/content/docs/index.mdx`:
```mdx
---
title: Introduction
description: Fact-first memory and RAG for agents.
---

Memory is a TypeScript/Bun service that ingests, stores, and retrieves
"memories" (text snippets and extracted facts) with semantic search and
retrieval-augmented generation (RAG). It uses Express for the API,
Prisma/PostgreSQL for structured storage, Qdrant for vector search, and
OpenRouter for embeddings, fact extraction, reranking, and answer generation.

## Features

- REST API for creating, updating, deleting, and querying memories
- Fact-first storage: extracts atomic facts before embedding for richer recall
- Semantic search via Qdrant vector DB with scoped filters (`userId`, `agentId`, `runId`)
- RAG Q&A: retrieves memories, optionally reranks, then generates answers with LLMs
- **Procedural Memory**: tracks agent execution history with step-by-step action logging and LLM-generated summaries
- Deduplication using normalized content hashing
- Validation with Zod schemas on all inputs
- Configurable models for embedding, rerank, fact extraction, and answer generation

<Cards>
  <Card title="Memory Types" href="/docs/memory-types" />
  <Card title="API Reference" href="/docs/api-reference" />
  <Card title="Setup" href="/docs/setup" />
</Cards>
```
> Note: `Card`/`Cards` are provided by Fumadocs MDX components. If the scaffold does not auto-register them, import at top: `import { Card, Cards } from 'fumadocs-ui/components/card';`

- [ ] **Step 2: Write `memory-types.mdx`**

```mdx
---
title: Memory Types
description: Semantic vs procedural memory.
---

| Type | Description | Use Case |
|------|-------------|----------|
| **Semantic** | Factual knowledge extracted from content | "User prefers TypeScript", "Project uses JWT auth" |
| **Procedural** | Agent execution history and action sequences | "Step 1: Searched for auth files → Step 2: Found issue in token.ts" |
```

- [ ] **Step 3: Write `architecture.mdx`**

```mdx
---
title: Architecture
description: Layers, services, data stores, and key flows.
---

<img
  src="https://github.com/user-attachments/assets/647d68bb-cea1-45c6-b7ac-b817ebdac7e0"
  alt="Memory Architecture"
  style={{ borderRadius: '0.5rem', width: '100%' }}
/>

- **API Layer**: Express routes under `/api` with controllers handling validation and responses.
- **Services**:
  - Memory Service: core orchestration (create, batch ingest, search, ask/answer, dedupe, procedural tracking).
  - Fact Extraction Service: LLM chat completion to produce concise facts.
  - Embedding Service: generates embeddings (OpenRouter), stores/searches vectors in Qdrant.
  - Rerank & Answer: optional reranking plus answer generation via LLM chat.
- **Data Stores**:
  - PostgreSQL (Prisma): memory metadata (source, tags, categories, attributes, summary, contentHash).
  - Qdrant: embeddings with payload metadata for filtered search.
- **Utilities**: hashing for deduplication, prompt templates for RAG flows.

## Key Flows

- **Create**: controller validates → Memory Service dedupes by hash → save row → extract facts → embed each fact → store vectors in Qdrant → update memory summary/embeddingRef → respond.
- **Batch**: iterate messages; `infer=true` follows Create flow per message; `infer=false` stores full-content embedding once.
- **Search**: generate query embedding → Qdrant search with filters → return scored payloads.
- **Ask/Answer (RAG)**: search → optional rerank via LLM scores → format memories → answer via LLM → optionally store as procedural step.
- **Procedural Summary**: fetch all steps for `runId` → format as execution history → LLM generates structured summary.
```

- [ ] **Step 4: Write `data-model.mdx`**

```mdx
---
title: Data Model
description: The Prisma Memory model.
---

`Memory` fields include: `userId`, `agentId`, `runId`, `role`, `source`,
`sourceId`, `timestamp`, `contentUrl`, `title`, `origin`, `tags[]`,
`category[]`, `attribute` (JSON), `summary`, `type`, `importance`,
`confidence`, `embeddingRef`, `contentHash` (unique), `createdAt`,
`updatedAt`.

Indexed on `contentHash`, `userId + contentHash`, and `userId + agentId + runId`.
```

- [ ] **Step 5: Verify build**

```bash
cd web && bun run build
```
Expected: build completes; new pages compile without MDX errors.

- [ ] **Step 6: Commit**

```bash
git add web/content/docs
git commit -m "docs(content): add intro, memory-types, architecture, data-model pages"
```

---

### Task 4: Author docs content — API & procedural pages

**Files:**
- Create: `web/content/docs/api-reference.mdx`
- Create: `web/content/docs/procedural-memory.mdx`

- [ ] **Step 1: Write `api-reference.mdx`**

```mdx
---
title: API Reference
description: HTTP endpoints under /api.
---

Base path: `/api`. Request/response schemas are enforced via Zod in
`src/types/memory.types.ts`.

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/memory` | Create a memory (fact extraction + embeddings). |
| `PUT` | `/memory` | Update memory metadata/content (does not currently re-embed). |
| `DELETE` | `/memory` | Delete a memory (controller does not delete vector; use Embedding Service if needed). |
| `GET` | `/memory` | Get memory by id. |
| `GET` | `/memory/user` | List memories for a user. |
| `POST` | `/memories` | Batch ingest messages; defaults to fact extraction unless `infer=false`. |
| `POST` | `/memories/search` | Semantic search with filters (`userId`/`agentId`/`runId`, limit, scoreThreshold). |
| `POST` | `/memories/answer` | Ask with optional query override; returns answer + source memories. |
| `POST` | `/memories/ask` | RAG endpoint with optional procedural memory tracking. |
```

- [ ] **Step 2: Write `procedural-memory.mdx`**

```mdx
---
title: Procedural Memory
description: Track agent execution history within a run.
---

Procedural memory enables tracking of agent execution history within a
task/run. It stores each interaction as a step with context, allowing agents
to resume interrupted tasks or review past actions.

## Usage

Include the `procedural` object in your `/memories/ask` request:

```json
{
  "query": "What authentication method does this project use?",
  "userId": 1,
  "agentId": "code-review-agent",
  "runId": "task-abc123",
  "procedural": {
    "store": true,
    "summarize": false,
    "includeHistory": false,
    "taskObjective": "Security audit of the codebase",
    "stepNumber": 1,
    "action": "Checking authentication implementation",
    "context": "Starting security review"
  }
}
```

## Procedural Options

| Option | Type | Description |
|--------|------|-------------|
| `store` | boolean | Store this Q&A interaction as a procedural step |
| `summarize` | boolean | Generate and return a summary of all steps using LLM |
| `includeHistory` | boolean | Return all previous steps for this run |
| `taskObjective` | string | Overall goal of the task (stored with first step) |
| `stepNumber` | number | Step sequence number (auto-generated if not provided) |
| `action` | string | Description of what action triggered this query |
| `context` | string | Current execution context |

## Response

When procedural options are enabled, the response includes:

```json
{
  "answer": "The project uses JWT tokens with...",
  "memories": [],
  "procedural": {
    "stored": { "memoryId": 123, "isDuplicate": false, "stepNumber": 1 },
    "summary": "## Summary of agent's execution history...",
    "history": []
  }
}
```
```

- [ ] **Step 3: Verify build**

```bash
cd web && bun run build
```
Expected: build completes; both pages compile.

- [ ] **Step 4: Commit**

```bash
git add web/content/docs
git commit -m "docs(content): add api-reference and procedural-memory pages"
```

---

### Task 5: Author setup page and sidebar order

**Files:**
- Create: `web/content/docs/setup.mdx`
- Create or Modify: `web/content/docs/meta.json`

- [ ] **Step 1: Write `setup.mdx`**

```mdx
---
title: Setup & Running
description: Install, configure, and run the service.
---

## Setup

1. Install Bun: `curl -fsSL https://bun.sh/install | bash`
2. Install deps: `bun install`
3. Configure environment variables (e.g., `.env`).
4. Prepare Postgres database and run Prisma generate (ensure `prisma/generator` output matches `src/generated/prisma`).
5. Ensure Qdrant is reachable and collection matches dimension.

## Running

- Dev/serve: `bun run index.ts`
- The server listens on `PORT` and exposes `/api/...` routes.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | API port (default 8000) |
| `OPENROUTER_API_KEY` | OpenRouter API key |
| `EMBEDDING_MODEL` | Embedding model name (e.g., `openai/text-embedding-3-small`) |
| `EMBEDDING_DIMENSION` | Embedding vector dimension (must match Qdrant collection) |
| `QDRANT_URL` | Qdrant endpoint |
| `QDRANT_API_KEY` | Qdrant API key (if required) |
| `QDRANT_COLLECTION_NAME` / `COLLECTION_NAME` | Target collection |
| `ANSWER_MODEL` | Model for answer generation (default `gpt-4o-mini`) |
| `RERANK_MODEL` | Model for reranking (default `gpt-4o-mini`) |
| `RERANK_ENABLED` | `"true"` to enable rerank by default |
| `RERANK_TOP_K` | Max docs after rerank |
| `FACT_MODEL` | Model for fact extraction (default `gpt-4o-mini`) |
| `PROCEDURAL_MODEL` | Model for procedural summary generation (default `gpt-4o-mini`) |
| `NODE_ENV` | Controls Prisma logging |

## Operational Notes

- Deduplication is per `userId` (and agent/run attributes) using `contentHash`.
- Fact extraction is mandatory in the create flow; if no facts are extracted, the memory is stored without embeddings.
- Embedding updates on memory updates are not automatic in current controllers.
- Qdrant collection is auto-created on first use with cosine distance and configured dimension.
- Rerank is optional and can be toggled per request or via env defaults.
- Procedural memories are stored with `type: "procedural"` and can be filtered/searched like regular memories.
```

- [ ] **Step 2: Write `meta.json` (sidebar order)**

Set `web/content/docs/meta.json` to:
```json
{
  "title": "Docs",
  "pages": [
    "index",
    "memory-types",
    "architecture",
    "data-model",
    "api-reference",
    "procedural-memory",
    "setup"
  ]
}
```

- [ ] **Step 3: Verify build and sidebar order**

```bash
cd web && bun run build
```
Expected: build completes. Then `bun run dev`, open `/docs`, confirm the sidebar lists the 7 pages in the order above. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add web/content/docs
git commit -m "docs(content): add setup page and sidebar ordering"
```

---

### Task 6: Build the custom landing page

**Files:**
- Modify: `web/app/(home)/page.tsx`

- [ ] **Step 1: Replace the home page**

Replace the contents of `web/app/(home)/page.tsx`:
```tsx
import Link from 'next/link';

const features = [
  { title: 'Semantic search', body: 'Vector search over facts via Qdrant with scoped userId / agentId / runId filters.' },
  { title: 'Fact-first storage', body: 'Extracts atomic facts before embedding for richer, more precise recall.' },
  { title: 'Procedural memory', body: 'Tracks agent execution history step-by-step with LLM-generated summaries.' },
  { title: 'RAG Q&A', body: 'Retrieves memories, optionally reranks, then generates grounded answers.' },
  { title: 'Deduplication', body: 'Normalized content hashing prevents duplicate memories per user.' },
  { title: 'Configurable models', body: 'Swap embedding, rerank, fact-extraction, and answer models via env.' },
];

const snippet = `POST /api/memories/ask
{
  "query": "What auth does this project use?",
  "userId": 1,
  "agentId": "code-review-agent",
  "runId": "task-abc123"
}`;

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-24 pb-16 text-center">
        <span className="mb-4 rounded-full border border-fd-border px-3 py-1 font-mono text-xs text-fd-muted-foreground">
          TypeScript · Bun · Qdrant · OpenRouter
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Fact-first memory <span className="text-fd-primary">+ RAG</span> for agents
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-fd-muted-foreground">
          A service that ingests, stores, and retrieves memories with semantic
          search, deduplication, and procedural execution history.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/docs"
            className="rounded-lg bg-fd-primary px-5 py-2.5 font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="/docs/api-reference"
            className="rounded-lg border border-fd-border px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
          >
            API Reference
          </Link>
        </div>
        <pre className="mt-12 w-full max-w-xl overflow-x-auto rounded-xl border border-fd-border bg-fd-card p-5 text-left font-mono text-sm text-fd-muted-foreground">
{snippet}
        </pre>
      </section>

      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-fd-border bg-fd-card p-5 text-left">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-fd-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
```
> Note: the `fd-*` color classes are Fumadocs' Tailwind theme tokens and resolve automatically. If the scaffold placed the home route at `web/app/page.tsx` instead of `web/app/(home)/page.tsx`, edit that file instead.

- [ ] **Step 2: Verify build**

```bash
cd web && bun run build
```
Expected: build completes with no errors.

- [ ] **Step 3: Verify landing renders**

```bash
cd web && bun run dev
```
Open http://localhost:3000 — confirm: dark hero with tagline, the code snippet box, the 6-card feature grid, and that both "Get Started" → `/docs` and "API Reference" → `/docs/api-reference` work. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add "web/app"
git commit -m "feat(docs): add custom dark landing page"
```

---

### Task 7: Final verification & README pointer

**Files:**
- Modify: root `README.md` (add a link to the docs site under the title)

- [ ] **Step 1: Full production build**

```bash
cd web && bun run build
```
Expected: build succeeds, all 7 doc pages + home are generated, no warnings about missing pages.

- [ ] **Step 2: Add a docs pointer to the README**

In root `README.md`, immediately after the intro paragraph (after line ~3), add:
```markdown

> 📖 Browse the docs site: run `cd web && bun run dev` and open http://localhost:3000
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: link to the Fumadocs docs site from README"
```

---

## Self-Review Notes

- **Spec coverage:** Framework (Task 1), location `web/` (Task 1), Bun PM (Task 1), dark dev-tool landing (Task 6), 8→7 content pages (Tasks 3–5; the spec's 8 pages collapse "Setup/Running/Env/Operational/File Map" into one `setup.mdx`, matching the page→README mapping table where those share one page), architecture image via plain `<img>` (Task 3), sidebar order (Task 5), independence from backend (no API coupling anywhere). Covered.
- **Page count reconciliation:** Spec lists 8 conceptual pages but its mapping table groups Setup+Running+Env+Operational+FileMap into one page → 7 MDX files. Plan produces 7. Intentional, not a gap.
- **Type/name consistency:** `meta.json` page slugs exactly match the created `.mdx` filenames (`index`, `memory-types`, `architecture`, `data-model`, `api-reference`, `procedural-memory`, `setup`).
- **Placeholders:** none — every content step contains the full MDX/TSX.
