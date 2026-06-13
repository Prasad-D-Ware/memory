import Link from 'next/link';
import type { CSSProperties } from 'react';

type MemoryCard = {
  i: number; // fan offset from center
  tag: string;
  text: string;
  accent: string;
};

const cards: MemoryCard[] = [
  { i: -2, tag: 'semantic', text: 'User prefers TypeScript', accent: '#60a5fa' },
  { i: -1, tag: 'procedural', text: 'Step 1 · Searched auth files', accent: '#f59e0b' },
  { i: 0, tag: 'memory', text: 'Fact-first recall + RAG', accent: '#a78bfa' },
  { i: 1, tag: 'semantic', text: 'Project uses JWT auth', accent: '#34d399' },
  { i: 2, tag: 'procedural', text: 'Step 2 · Found issue in token.ts', accent: '#fb7185' },
];

const features = [
  { title: 'Semantic search', body: 'Vector search over facts via Qdrant with scoped userId / agentId / runId filters.' },
  { title: 'Fact-first storage', body: 'Extracts atomic facts before embedding for richer, more precise recall.' },
  { title: 'Procedural memory', body: 'Tracks agent execution history step-by-step with LLM-generated summaries.' },
  { title: 'RAG Q&A', body: 'Retrieves memories, optionally reranks, then generates grounded answers.' },
  { title: 'Deduplication', body: 'Normalized content hashing prevents duplicate memories per user.' },
  { title: 'Configurable models', body: 'Swap embedding, rerank, fact-extraction, and answer models via env.' },
];

function slotStyle(i: number): CSSProperties {
  const mag = Math.abs(i);
  return {
    ['--i' as string]: i,
    ['--mag' as string]: mag,
    zIndex: 30 - mag * 10,
    transform:
      'translate(-50%, -50%) translateX(calc(var(--i) * var(--unit))) translateY(calc(var(--mag) * var(--lift))) rotate(calc(var(--i) * 7deg))',
  };
}

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center overflow-hidden px-6 pb-20 pt-16">
        {/* ambient backdrop glow */}
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute left-1/2 top-[18%] -z-10 h-[420px] w-[640px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(124,58,237,0.35), rgba(219,39,119,0.18) 45%, transparent 70%)',
          }}
        />

        {/* logo mark — a small knowledge-graph glyph */}
        <div className="hero-rise mb-10 text-fd-muted-foreground" style={{ animationDelay: '0s' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden className="opacity-90">
            <path
              d="M11 13 L20 8 L29 13 M11 13 L11 27 L20 32 M29 13 L29 27 L20 32 M20 8 L20 32"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
            <circle cx="20" cy="8" r="3.4" fill="currentColor" />
            <circle cx="11" cy="13" r="3" fill="currentColor" opacity="0.75" />
            <circle cx="29" cy="13" r="3" fill="currentColor" opacity="0.75" />
            <circle cx="11" cy="27" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="29" cy="27" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="20" cy="32" r="3.4" fill="currentColor" />
          </svg>
        </div>

        {/* fanned stack of memory cards */}
        <ul
          aria-hidden
          className="relative mb-12 h-[280px] w-full max-w-3xl [--lift:16px] [--unit:58px] sm:h-[340px] sm:[--lift:24px] sm:[--unit:104px] lg:h-[380px] lg:[--lift:30px] lg:[--unit:138px]"
        >
          {cards.map((card) => {
            const isCenter = card.i === 0;
            return (
              <li key={card.i} className="absolute left-1/2 top-1/2 list-none" style={slotStyle(card.i)}>
                <div className="hero-rise" style={{ animationDelay: `${0.05 + Math.abs(card.i) * 0.1}s` }}>
                  <div
                    className={[
                      'group relative flex h-44 w-[7.5rem] flex-col justify-between overflow-hidden rounded-[1.4rem] p-4 shadow-2xl shadow-black/50 transition-transform duration-300 ease-out hover:-translate-y-2 sm:h-52 sm:w-36 lg:h-60 lg:w-44',
                      isCenter
                        ? 'scale-[1.06] ring-1 ring-white/25'
                        : 'border border-fd-border bg-fd-card/90 backdrop-blur',
                    ].join(' ')}
                    style={isCenter ? { background: 'linear-gradient(160deg, #7c3aed, #db2777)' } : undefined}
                  >
                    {/* accent sheen */}
                    {!isCenter && (
                      <div
                        className="pointer-events-none absolute inset-0 opacity-60"
                        style={{
                          background: `radial-gradient(120% 80% at 50% -10%, ${card.accent}33, transparent 60%)`,
                        }}
                      />
                    )}
                    <div className="relative flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: isCenter ? '#ffffff' : card.accent }} />
                      <span
                        className={[
                          'font-mono text-[0.65rem] uppercase tracking-widest',
                          isCenter ? 'text-white/80' : 'text-fd-muted-foreground',
                        ].join(' ')}
                      >
                        {card.tag}
                      </span>
                    </div>
                    <p
                      className={[
                        'relative text-sm font-medium leading-snug',
                        isCenter ? 'text-white' : 'text-fd-foreground',
                      ].join(' ')}
                    >
                      {card.text}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* headline + copy + CTA */}
        <h1
          className="hero-rise max-w-3xl text-center text-4xl font-bold tracking-tight sm:text-6xl"
          style={{ animationDelay: '0.35s' }}
        >
          Fact-first memory <span className="text-fd-primary">for agents</span>
        </h1>
        <p
          className="hero-rise mt-5 max-w-xl text-center text-lg text-fd-muted-foreground"
          style={{ animationDelay: '0.45s' }}
        >
          Ingest, store, and recall facts with semantic search, deduplication, and
          procedural execution history — backed by Qdrant and OpenRouter.
        </p>

        <div className="hero-rise mt-9 flex items-center gap-3" style={{ animationDelay: '0.55s' }}>
          <Link
            href="/docs"
            className="group inline-flex items-center gap-3 rounded-full bg-fd-foreground py-2 pl-6 pr-2 font-medium text-fd-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background"
          >
            Get Started
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fd-background text-fd-foreground transition-transform duration-300 group-hover:translate-x-0.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <Link
            href="/docs/api-reference"
            className="rounded-full border border-fd-border px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background"
          >
            API Reference
          </Link>
        </div>

        <p className="mt-10 font-mono text-xs tracking-wide text-fd-muted-foreground">
          TypeScript · Bun · Qdrant · OpenRouter
        </p>
      </section>

      {/* Feature grid */}
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
