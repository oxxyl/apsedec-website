/**
 * Build-time only — regenerates src/data/uganda-districts.ts.
 * Not part of the site build; run by hand when boundaries change.
 *
 * Source: OCHA HDX "Uganda - Subnational Administrative Boundaries",
 * admin level 2 = 135 districts, valid 2020-08-24, CC BY-IGO.
 * https://data.humdata.org/dataset/cod-ab-uga
 *
 * Pipeline:
 *   1. download + unzip uga_admin_boundaries.geojson.zip
 *   2. npx mapshaper uga_admin2.geojson -filter-fields adm2_name,adm2_pcode \
 *        -simplify 2% keep-shapes -clean -o precision=0.0005 uga_districts.json
 *   3. node scripts/build-map.mjs <uga_districts.json>
 *
 * Projection: spherical Mercator, fitted to a 1000-unit-wide viewBox.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/build-map.mjs <simplified.geojson>');
  process.exit(1);
}

const WIDTH = 1000;
const PRECISION = 1; // decimal places in the emitted path data

const geo = JSON.parse(readFileSync(src, 'utf8'));

// Spherical Mercator, expressed in degrees so x and y share one unit.
const mercY = (lat) =>
  (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const project = ([lon, lat]) => [lon, mercY(lat)];

// --- fit to viewBox ---------------------------------------------------------
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
const eachCoord = (geometry, fn) => {
  const walk = (c, depth) =>
    depth === 0 ? fn(c) : c.forEach((x) => walk(x, depth - 1));
  const depth = geometry.type === 'MultiPolygon' ? 3 : 2;
  walk(geometry.coordinates, depth);
};

for (const f of geo.features) {
  eachCoord(f.geometry, (c) => {
    const [x, y] = project(c);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });
}

const scale = WIDTH / (maxX - minX);
const HEIGHT = +((maxY - minY) * scale).toFixed(1);
const toSvg = (c) => {
  const [x, y] = project(c);
  return [
    +((x - minX) * scale).toFixed(PRECISION),
    +((maxY - y) * scale).toFixed(PRECISION), // flip: SVG y grows downward
  ];
};

// --- path building ----------------------------------------------------------
const ringToPath = (ring) => {
  let d = '';
  let prev = null;
  for (let i = 0; i < ring.length; i++) {
    const [x, y] = toSvg(ring[i]);
    if (i === 0) {
      d += `M${x} ${y}`;
    } else {
      // drop points that round to the same place as the previous one
      if (prev && x === prev[0] && y === prev[1]) continue;
      d += `L${x} ${y}`;
    }
    prev = [x, y];
  }
  return d + 'Z';
};

const polygonsOf = (geometry) =>
  geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates];

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const districts = geo.features
  .map((f) => {
    const name = f.properties.adm2_name;
    let d = '';
    let best = { area: 0, cx: 0, cy: 0 };

    for (const poly of polygonsOf(f.geometry)) {
      for (const ring of poly) d += ringToPath(ring);

      // label anchor: bbox centre of the largest ring of this polygon
      const outer = poly[0].map(toSvg);
      const xs = outer.map((p) => p[0]);
      const ys = outer.map((p) => p[1]);
      const w = Math.max(...xs) - Math.min(...xs);
      const h = Math.max(...ys) - Math.min(...ys);
      if (w * h > best.area) {
        best = {
          area: w * h,
          cx: +((Math.min(...xs) + w / 2).toFixed(1)),
          cy: +((Math.min(...ys) + h / 2).toFixed(1)),
        };
      }
    }

    return {
      slug: slugify(name),
      name,
      pcode: f.properties.adm2_pcode,
      cx: best.cx,
      cy: best.cy,
      d,
    };
  })
  .sort((a, b) => a.cy - b.cy || a.cx - b.cx); // north -> south, for focus order

const out = `// GENERATED FILE — do not edit by hand.
// Regenerate with: node scripts/build-map.mjs <simplified.geojson>
//
// Source: OCHA HDX "Uganda - Subnational Administrative Boundaries" (COD-AB),
// admin level 2 = districts, valid 2020-08-24. Licence: CC BY-IGO.
// https://data.humdata.org/dataset/cod-ab-uga
// Simplified with mapshaper (2%, keep-shapes), projected to spherical Mercator.
//
// Districts are ordered north -> south so that keyboard focus and the
// staggered reveal both run down the country in a logical sequence.

export interface District {
  slug: string;
  name: string;
  pcode: string;
  /** label anchor, in viewBox units */
  cx: number;
  cy: number;
  d: string;
}

export const VIEWBOX = '0 0 ${WIDTH} ${HEIGHT}';

export const DISTRICTS: District[] = ${JSON.stringify(districts, null, 0)
  .replace(/\},\{/g, '},\n  {')
  .replace(/^\[/, '[\n  ')
  .replace(/\]$/, ',\n]')};
`;

writeFileSync('src/data/uganda-districts.ts', out);
console.log(
  `wrote src/data/uganda-districts.ts — ${districts.length} districts, ` +
    `viewBox 0 0 ${WIDTH} ${HEIGHT}, ${(out.length / 1024).toFixed(1)}KB`
);
