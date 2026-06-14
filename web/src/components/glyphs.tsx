import type { ReactNode } from 'react';

// Memory-themed glyphs, drawn as cohesive line-art. Order runs left → apex → right.
export const glyphOrder = [
  'links',
  'search',
  'cards',
  'graph',
  'neural',
  'brain',
  'vector',
  'database',
  'steps',
  'fingerprint',
  'spark',
] as const;

export type GlyphName = (typeof glyphOrder)[number];

function dot(cx: number, cy: number, r = 1.5) {
  return <circle cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />;
}

export function Glyph({ name }: { name: GlyphName }): ReactNode {
  switch (name) {
    case 'brain':
      return (
        <>
          <path d="M24 13.5c-1.6-1.7-4.3-1.8-6-.3-2.2-1-4.8.1-5.4 2.5-2.3.2-3.8 2.6-2.8 4.7-1.7 1.4-1.7 4.1.1 5.4-.6 2.3 1.2 4.6 3.6 4.6.6 1.9 2.7 2.9 4.5 2.1 1.2 1.2 3 1.4 4.4.6" />
          <path d="M24 13.5c1.6-1.7 4.3-1.8 6-.3 2.2-1 4.8.1 5.4 2.5 2.3.2 3.8 2.6 2.8 4.7 1.7 1.4 1.7 4.1-.1 5.4.6 2.3-1.2 4.6-3.6 4.6-.6 1.9-2.7 2.9-4.5 2.1-1.2 1.2-3 1.4-4.4.6" />
          <path d="M24 13v21" />
          <path d="M18.5 19c1.8.4 2.8 1.6 2.9 3.6M29.5 19c-1.8.4-2.8 1.6-2.9 3.6M19 27.5c1.4-.2 2.4-1 2.8-2.4M29 27.5c-1.4-.2-2.4-1-2.8-2.4" opacity="0.5" />
        </>
      );
    case 'neural':
      return (
        <>
          <path
            d="M15 18L24 15M15 18L24 24M15 30L24 24M15 30L24 33M24 15L33 18M24 24L33 18M24 24L33 30M24 33L33 30"
            opacity="0.5"
          />
          {dot(15, 18)}
          {dot(15, 30)}
          {dot(24, 15)}
          {dot(24, 24)}
          {dot(24, 33)}
          {dot(33, 18)}
          {dot(33, 30)}
        </>
      );
    case 'graph':
      return (
        <>
          <path d="M24 24l10 0M24 24l3.1-9.5M24 24l-8.1-5.9M24 24l-8.1 5.9M24 24l3.1 9.5" opacity="0.5" />
          {dot(24, 24, 2.4)}
          {dot(34, 24)}
          {dot(27.1, 14.5)}
          {dot(15.9, 18.1)}
          {dot(15.9, 29.9)}
          {dot(27.1, 33.5)}
        </>
      );
    case 'database':
      return (
        <>
          <ellipse cx="24" cy="15.5" rx="9.5" ry="3.4" />
          <path d="M14.5 15.5v17c0 1.9 4.3 3.4 9.5 3.4s9.5-1.5 9.5-3.4v-17" />
          <path d="M14.5 24c0 1.9 4.3 3.4 9.5 3.4s9.5-1.5 9.5-3.4" opacity="0.6" />
        </>
      );
    case 'cards':
      return (
        <>
          <rect x="12" y="14" width="16" height="13" rx="3" opacity="0.45" />
          <rect x="15.5" y="17.5" width="16" height="13" rx="3" opacity="0.7" />
          <rect x="19" y="21" width="15" height="13" rx="3" />
        </>
      );
    case 'vector':
      return (
        <>
          <path d="M14 34V14M14 34h20" opacity="0.4" />
          <path d="M14 34l13.5-11.5" />
          <path d="M27.5 22.5l-4.6.7M27.5 22.5l-.7 4.6" />
          {dot(20, 19)}
          {dot(30.5, 17.5)}
          {dot(31.5, 27.5)}
          {dot(23.5, 29.5)}
        </>
      );
    case 'steps':
      return (
        <>
          <path d="M13 33h5v-5h5v-5h5v-5h5" />
          {dot(18, 28)}
          {dot(23, 23)}
          {dot(28, 18)}
        </>
      );
    case 'fingerprint':
      return (
        <>
          <path d="M13.5 27a10.5 10.5 0 0 1 21 0" opacity="0.55" />
          <path d="M17 27a7 7 0 0 1 14 0" opacity="0.8" />
          <path d="M20.5 27a3.5 3.5 0 0 1 7 0" />
          {dot(24, 27, 1.3)}
        </>
      );
    case 'search':
      return (
        <>
          <circle cx="22" cy="22" r="7.5" />
          <path d="M27.5 27.5 34 34" />
          {dot(19.5, 22, 1.2)}
          {dot(24, 19.5, 1.2)}
          {dot(24, 24.5, 1.2)}
        </>
      );
    case 'spark':
      return (
        <>
          <path d="M24 12c.8 6.6 2.6 8.4 9 9-6.4.6-8.2 2.4-9 9-.8-6.6-2.6-8.4-9-9 6.4-.6 8.2-2.4 9-9z" />
          <path d="M33 30c.3 2.4 1 3 3 3.2-2 .2-2.7.8-3 3.2-.3-2.4-1-3-3-3.2 2-.2 2.7-.8 3-3.2z" opacity="0.7" />
        </>
      );
    case 'links':
      return (
        <>
          <path d="M19 21.5l10 0M17.5 23.5l5.5 5.5M30.5 23.5l-5.5 5.5" opacity="0.55" />
          <circle cx="16" cy="19.5" r="3.4" />
          <circle cx="32" cy="19.5" r="3.4" />
          <circle cx="24" cy="31.5" r="3.4" />
        </>
      );
  }
}
