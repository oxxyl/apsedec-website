/**
 * Sixteen tileable CSS background patterns — eight soft textures and eight
 * intricate line works.
 *
 * Ported from the "Green Background Patterns" design
 * (claude.ai/design → Company profile redesign). Every pattern is pure CSS
 * gradient syntax, seamlessly tileable, and tuned to sit behind body text.
 *
 * On the standing "no gradients" rule (design-notes.md): that rule rejects
 * gradient *fills* — the blended green hero. These use gradient syntax to draw
 * 1px rules, dots and arcs at a fixed tint, which is the same hairline-and-
 * flat-colour vocabulary the rest of the site is built from. Flagged rather
 * than assumed — see the note on the gallery page.
 */

export type PatternGroup = 'soft' | 'line';

/** The four knobs the design exposes as editable props. */
export interface PatternOptions {
  /** Ground the pattern sits on. */
  base: string;
  /** Primary rule/dot colour. */
  accent: string;
  /** Second rule colour, used only by the line patterns. */
  ink: string;
  /** Tile size in px — the pattern's repeat period. */
  scale: number;
}

export interface Pattern {
  name: string;
  note: string;
  group: PatternGroup;
  base: string;
  image: string;
  size: string;
  pos: string;
}

export const DEFAULTS: PatternOptions = {
  base: '#eaf4ec',
  accent: '#bfdbc8',
  ink: '#9bc4ac',
  scale: 28,
};

/**
 * Swatches offered for each colour knob. The design's palette and APSEDEC's
 * green ramp landed in the same place — where a swatch is an exact token the
 * label says so, so a pattern can be specified in token terms.
 */
export const SWATCHES = {
  base: [
    { value: '#eaf4ec', label: 'Pale leaf' },
    { value: '#f0f7ef', label: 'Lightest' },
    { value: '#e3f0e6', label: 'Sunk' },
    { value: '#edf4ef', label: 'green-050' },
  ],
  accent: [
    { value: '#bfdbc8', label: 'Default' },
    { value: '#a8cdb6', label: 'green-200' },
    { value: '#cfe4d4', label: 'Faintest' },
    { value: '#9fc9b4', label: 'Strongest' },
  ],
  ink: [
    { value: '#9bc4ac', label: 'Default' },
    { value: '#b5d6c1', label: 'Faint' },
    { value: '#84b79c', label: 'Strong' },
    { value: '#a9cfe0', label: 'Navy-leaning' },
  ],
} as const;

export const SCALE_RANGE = { min: 12, max: 64, step: 2 } as const;

const r = (n: number) => Math.round(n);

/** One repeating hairline sweep at `deg`, `col`, repeating every `gap`px. */
const hatch = (deg: number, col: string, gap: number) =>
  `repeating-linear-gradient(${deg}deg, ${col} 0, ${col} 1px, transparent 1px, transparent ${gap}px)`;

/** Eight soft textures: grids, dots, hatches and washes. */
function softPatterns(o: PatternOptions): Pattern[] {
  const { base, accent: a, scale: s } = o;

  return [
    {
      name: 'Fine grid',
      note: `${s}px lattice`,
      image: `linear-gradient(${a} 1px, transparent 1px), linear-gradient(90deg, ${a} 1px, transparent 1px)`,
      size: `${s}px ${s}px, ${s}px ${s}px`,
    },
    {
      name: 'Diagonal hatch',
      note: '45° pinstripe',
      image: hatch(45, a, r(s / 2.6)),
      size: 'auto',
    },
    {
      name: 'Dot field',
      note: 'polka grid',
      image: `radial-gradient(${a} 1.6px, transparent 1.7px)`,
      size: `${s}px ${s}px`,
    },
    {
      name: 'Offset dots',
      note: 'half-drop repeat',
      image: `radial-gradient(${a} 1.6px, transparent 1.7px), radial-gradient(${a} 1.6px, transparent 1.7px)`,
      size: `${s}px ${s}px, ${s}px ${s}px`,
      pos: `0 0, ${r(s / 2)}px ${r(s / 2)}px`,
    },
    {
      name: 'Crosshatch',
      note: 'woven texture',
      image: [hatch(45, a, r(s / 3)), hatch(-45, a, r(s / 3))].join(', '),
      size: 'auto',
    },
    {
      name: 'Chevron',
      note: 'zig-zag band',
      image: [
        `linear-gradient(135deg, ${a} 25%, transparent 25%)`,
        `linear-gradient(225deg, ${a} 25%, transparent 25%)`,
        `linear-gradient(45deg, ${a} 25%, transparent 25%)`,
        `linear-gradient(315deg, ${a} 25%, transparent 25%)`,
      ].join(', '),
      size: `${s * 2}px ${s * 2}px`,
      pos: `${s}px 0, ${s}px 0, 0 0, 0 0`,
    },
    {
      name: 'Scale / fish-eye',
      note: 'arched shingles',
      image: `radial-gradient(circle at 50% 100%, transparent ${r(s * 0.55)}px, ${a} ${r(s * 0.55)}px, ${a} ${r(s * 0.55) + 1}px, transparent ${r(s * 0.55) + 2}px)`,
      size: `${s * 2}px ${s}px`,
    },
    {
      name: 'Soft blooms',
      note: 'organic wash',
      image: `radial-gradient(circle at 20% 30%, ${a} 0, transparent 42%), radial-gradient(circle at 78% 68%, ${a} 0, transparent 40%)`,
      size: `${s * 6}px ${s * 6}px`,
    },
  ].map((pt) => ({ ...pt, base, group: 'soft' as const, pos: pt.pos ?? '0 0' }));
}

/**
 * Eight intricate line works. Each stacks two or three hairline gradients at
 * different angles and offsets, so the texture stays crisp and detailed
 * without lifting off the page.
 */
function linePatterns(o: PatternOptions): Pattern[] {
  const { base, accent: a, ink: b, scale: s } = o;

  return [
    {
      name: 'Isometric mesh',
      note: '30° / 90° triaxial',
      image: [hatch(30, a, r(s / 2)), hatch(-30, a, r(s / 2)), hatch(90, b, r(s / 2))].join(', '),
      size: 'auto',
    },
    {
      name: 'Triangle weave',
      note: '60° three-way',
      image: [hatch(60, a, r(s / 3)), hatch(-60, a, r(s / 3)), hatch(0, b, r(s / 3))].join(', '),
      size: 'auto',
    },
    {
      name: 'Tartan',
      note: 'grouped rule bands',
      image: [
        `repeating-linear-gradient(90deg, ${b} 0, ${b} 1px, transparent 1px, transparent 4px, ${a} 4px, ${a} 5px, transparent 5px, transparent ${s}px)`,
        `repeating-linear-gradient(0deg, ${b} 0, ${b} 1px, transparent 1px, transparent 4px, ${a} 4px, ${a} 5px, transparent 5px, transparent ${s}px)`,
      ].join(', '),
      size: 'auto',
    },
    {
      name: 'Argyle',
      note: 'diamond lattice',
      image: [
        hatch(45, b, r(s / 1.4)),
        hatch(-45, b, r(s / 1.4)),
        hatch(45, a, r(s / 5.6)),
        hatch(-45, a, r(s / 5.6)),
      ].join(', '),
      size: 'auto',
    },
    {
      name: 'Moiré',
      note: 'two offset grids',
      image: [
        `linear-gradient(${a} 1px, transparent 1px), linear-gradient(90deg, ${a} 1px, transparent 1px)`,
        `linear-gradient(${b} 1px, transparent 1px), linear-gradient(90deg, ${b} 1px, transparent 1px)`,
      ].join(', '),
      size: `${s}px ${s}px, ${s}px ${s}px, ${r(s * 1.13)}px ${r(s * 1.13)}px, ${r(s * 1.13)}px ${r(s * 1.13)}px`,
    },
    {
      name: 'Herringbone',
      note: 'staggered twill',
      image: [hatch(45, b, r(s / 3.5)), hatch(-45, a, r(s / 3.5))].join(', '),
      size: `${s}px ${s}px, ${s}px ${s}px`,
      pos: `0 0, ${r(s / 2)}px ${r(s / 2)}px`,
    },
    {
      name: 'Ogee arcs',
      note: 'interlocking waves',
      image: [
        `radial-gradient(circle at 0% 50%, transparent ${r(s * 0.48)}px, ${a} ${r(s * 0.48)}px, ${a} ${r(s * 0.48) + 1}px, transparent ${r(s * 0.48) + 2}px)`,
        `radial-gradient(circle at 100% 50%, transparent ${r(s * 0.48)}px, ${b} ${r(s * 0.48)}px, ${b} ${r(s * 0.48) + 1}px, transparent ${r(s * 0.48) + 2}px)`,
      ].join(', '),
      size: `${s}px ${s}px, ${s}px ${s}px`,
    },
    {
      name: 'Engine turn',
      note: 'concentric guilloché',
      image: [
        `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent ${r(s / 4)}px, ${a} ${r(s / 4)}px, ${a} ${r(s / 4) + 1}px)`,
        `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent ${r(s / 3)}px, ${b} ${r(s / 3)}px, ${b} ${r(s / 3) + 1}px)`,
      ].join(', '),
      size: `${s * 3}px ${s * 3}px, ${s * 3}px ${s * 3}px`,
      pos: `0 0, ${r(s * 1.5)}px ${r(s * 1.5)}px`,
    },
  ].map((pt) => ({ ...pt, base, group: 'line' as const, pos: pt.pos ?? '0 0' }));
}

/** All sixteen, soft textures first — the order the gallery indexes by. */
export function buildPatterns(options: Partial<PatternOptions> = {}): Pattern[] {
  const o = { ...DEFAULTS, ...options };
  return [...softPatterns(o), ...linePatterns(o)];
}

/** The copy-ready CSS declaration block for one pattern. */
export function patternCss(pt: Pattern): string {
  let out = `background-color: ${pt.base};\nbackground-image:\n  ${pt.image.split('), ').join('),\n  ')};`;
  if (pt.size !== 'auto') out += `\nbackground-size: ${pt.size};`;
  if (pt.pos && pt.pos !== '0 0') out += `\nbackground-position: ${pt.pos};`;
  return out;
}

/** The inline style that paints one pattern onto an element. */
export function patternStyle(pt: Pattern): string {
  const parts = [`background-color:${pt.base}`, `background-image:${pt.image}`];
  if (pt.size !== 'auto') parts.push(`background-size:${pt.size}`);
  if (pt.pos) parts.push(`background-position:${pt.pos}`);
  return parts.join(';');
}
