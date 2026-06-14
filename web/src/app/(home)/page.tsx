import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Glyph, glyphOrder } from '@/components/glyphs';

const TILE_COUNT = 11;
const MAX_ANGLE = 120; // degrees each side of the apex (opening at the bottom)

type Tile = {
  idx: number;
  angle: number; // degrees from apex (0 = top center)
  sin: number;
  cos: number;
  hue: number;
  mag: number; // 0 at center → 1 at the ends
  isApex: boolean;
};

const tiles: Tile[] = Array.from({ length: TILE_COUNT }, (_, idx) => {
  const t = (idx / (TILE_COUNT - 1)) * 2 - 1; // -1 .. 1
  const angle = t * MAX_ANGLE;
  const rad = (angle * Math.PI) / 180;
  return {
    idx,
    angle,
    sin: Math.sin(rad),
    cos: Math.cos(rad),
    hue: Math.round((idx / TILE_COUNT) * 360),
    mag: Math.abs(t),
    isApex: Math.abs(angle) < 0.001,
  };
});

function tileBackground(hue: number): string {
  return [
    `radial-gradient(at 28% 20%, hsl(${hue} 88% 62%), transparent 60%)`,
    `radial-gradient(at 80% 88%, hsl(${(hue + 38) % 360} 82% 50%), transparent 55%)`,
    `linear-gradient(150deg, hsl(${(hue + 18) % 360} 68% 42%), hsl(${(hue + 330) % 360} 78% 30%))`,
  ].join(', ');
}

function slotStyle(tile: Tile): CSSProperties {
  const scale = tile.isApex ? 1.14 : 1 - tile.mag * 0.14;
  return {
    left: `calc(50% + (${tile.sin.toFixed(4)} * var(--r)))`,
    top: `calc(var(--cy) + (${(-tile.cos).toFixed(4)} * var(--r)))`,
    transform: `translate(-50%, -50%) rotate(${tile.angle.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
    zIndex: tile.isApex ? 20 : 10,
  };
}

const features = [
  { title: 'Semantic search', body: 'Vector search over facts via Qdrant with scoped userId / agentId / runId filters.' },
  { title: 'Fact-first storage', body: 'Extracts atomic facts before embedding for richer, more precise recall.' },
  { title: 'Procedural memory', body: 'Tracks agent execution history step-by-step with LLM-generated summaries.' },
  { title: 'RAG Q&A', body: 'Retrieves memories, optionally reranks, then generates grounded answers.' },
  { title: 'Deduplication', body: 'Normalized content hashing prevents duplicate memories per user.' },
  { title: 'Configurable models', body: 'Swap embedding, rerank, fact-extraction, and answer models via env.' },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero: arc of memory-glyph tiles wrapping the headline */}
      <section className="relative overflow-hidden px-6 pb-16 pt-8">
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute left-1/2 top-[32%] -z-10 h-[420px] w-[640px] -translate-x-1/2 rounded-full blur-[130px]"
          style={{
            background:
              'radial-gradient(circle, rgba(124,58,237,0.30), rgba(219,39,119,0.16) 45%, transparent 70%)',
          }}
        />

        {/* arc stage */}
        <div className="relative mx-auto h-[480px] w-full max-w-5xl [--cy:248px] [--r:170px] sm:h-[600px] sm:[--cy:300px] sm:[--r:240px] lg:h-[660px] lg:[--cy:330px] lg:[--r:312px]">
          <ul aria-hidden className="absolute inset-0">
            {tiles.map((tile) => (
              <li key={tile.idx} className="absolute list-none" style={slotStyle(tile)}>
                <div className="hero-rise" style={{ animationDelay: `${(tile.mag * 0.08).toFixed(2)}s` }}>
                  <div
                    className={[
                      'relative h-11 w-11 overflow-hidden rounded-xl shadow-xl shadow-black/40 sm:h-16 sm:w-16 sm:rounded-2xl lg:h-20 lg:w-20 lg:rounded-[1.25rem]',
                      tile.isApex ? 'ring-2 ring-white/45' : 'ring-1 ring-white/10',
                    ].join(' ')}
                    style={{ background: tileBackground(tile.hue) }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-[58%] w-[58%] text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                      >
                        <Glyph name={glyphOrder[tile.idx]} />
                      </svg>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* centered copy inside the arc */}
          <div className="absolute left-1/2 top-[56%] flex w-full max-w-[14rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center px-2 text-center sm:max-w-sm lg:max-w-md">
            <h1
              className="hero-rise text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              style={{ animationDelay: '0.3s' }}
            >
              Memory for <span className="text-fd-primary">agents</span>
            </h1>
            <p
              className="hero-rise mt-3 text-sm text-fd-muted-foreground sm:mt-4 sm:text-base lg:text-lg"
              style={{ animationDelay: '0.4s' }}
            >
              Fact-first storage, semantic search, and procedural execution
              history — backed by Qdrant and OpenRouter.
            </p>
            <div className="hero-rise mt-6 flex items-center gap-3" style={{ animationDelay: '0.5s' }}>
              <Link
                href="/docs"
                className="group inline-flex items-center gap-3 rounded-full bg-fd-foreground py-2 pl-5 pr-2 text-sm font-medium text-fd-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background sm:text-base"
              >
                Get Started
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fd-background text-fd-foreground transition-transform duration-300 group-hover:translate-x-0.5 sm:h-8 sm:w-8">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/docs/api-reference"
                className="rounded-full border border-fd-border px-4 py-2 text-sm font-medium transition-colors hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background sm:px-5 sm:py-2.5 sm:text-base"
              >
                API Reference
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-2 text-center font-mono text-xs tracking-wide text-fd-muted-foreground">
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
