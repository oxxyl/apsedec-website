/**
 * Generates the OpenGraph share card into public/og/apsedec.png (1200x630).
 *
 * Run with `npm run og`. Committed output, like the map geometry — it only
 * changes when the brand or the logo does.
 *
 * WHY NO TITLE TEXT IN THE IMAGE: sharp renders SVG through librsvg, which
 * ignores @font-face with a data-URI webfont (verified — it silently falls
 * back to a system serif). Drawing the site's real type would need either a
 * headless browser in CI or a font-to-path step, both of which add a build
 * dependency the brief caps (§14). Social platforms render og:title and
 * og:description as live text beside the image anyway, so the card carries the
 * brand and the page carries the words.
 *
 * All colour values below are the tokens from src/styles/tokens.css.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const W = 1200;
const H = 630;

const GREEN_900 = '#0c3a20';
const GREEN_600 = '#1b7340';
const GREEN_300 = '#7fb394';
const NAVY = '#1e3a5f';
const GOLD = '#d4a843';
const PAPER = '#e7f1e8';

mkdirSync('public/og', { recursive: true });

/* Card geometry — the emblem sits on paper, straddled by green, the same
   figure/ground move the map card makes on the site. */
const CARD = { x: 120, y: 132, w: W - 240, h: 366 };
const LOGO_H = 286;

/* Ledger ruling on the green ground, drawn only where the card does not
   cover it — a rule hidden behind a panel is just wasted ink. */
const ruleRows = [56, 96, 546, 586];
const rules = ruleRows
  .map(
    (y) =>
      `<line x1="120" y1="${y}" x2="${W - 120}" y2="${y}" stroke="${NAVY}" stroke-width="1.5" opacity="0.55"/>`
  )
  .join('');

const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${GREEN_900}"/>
  ${rules}
  <!-- brand stripe, top edge -->
  <rect x="0" y="0" width="${W}" height="16" fill="${GREEN_600}"/>
  <!-- paper card, navy hairline, exactly as on the site -->
  <rect x="${CARD.x}" y="${CARD.y}" width="${CARD.w}" height="${CARD.h}" fill="${PAPER}" stroke="${NAVY}" stroke-width="2"/>
  <!-- gold as punctuation: a short bar clear of the card edge, never a border -->
  <rect x="${CARD.x}" y="${CARD.y + CARD.h + 26}" width="210" height="12" fill="${GOLD}"/>
  <rect x="${CARD.x + 226}" y="${CARD.y + CARD.h + 30}" width="${W - 240 - 226}" height="3" fill="${GREEN_300}" opacity="0.5"/>
</svg>`);

const logo = await sharp('APSEDEC Logo/APSEDEC Logo.png')
  .resize({ height: LOGO_H, fit: 'inside' })
  .toBuffer();
const { width: logoW = LOGO_H, height: logoH = LOGO_H } = await sharp(logo).metadata();

await sharp(background)
  .composite([
    {
      input: logo,
      top: Math.round(CARD.y + (CARD.h - logoH) / 2),
      left: Math.round((W - logoW) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile('public/og/apsedec.png');

const { size } = await sharp('public/og/apsedec.png').metadata();
console.log(`wrote public/og/apsedec.png — ${W}x${H}, ${Math.round((size ?? 0) / 1024)}KB`);
