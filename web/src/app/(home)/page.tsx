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
