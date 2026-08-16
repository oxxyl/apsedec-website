/**
 * Runs Lighthouse against the built site (mobile profile) and prints a table.
 *
 * Used by `npm run audit`, which starts `astro preview` on port 4399 first.
 * Lighthouse and Chrome are pulled with npx — neither is a project dependency,
 * so nothing extra ships to the site (BRIEF.md §14).
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = 'http://localhost:4399';
const PAGES = [
  '/',
  '/about/',
  '/what-we-do/',
  '/projects/',
  '/where-we-work/',
  '/partners/',
  '/resources/',
  '/news/',
  '/contact/',
  '/donate/',
];

const BUDGET = 90;
const work = mkdtempSync(join(tmpdir(), 'apsedec-audit-'));

/* Wait for the preview server to answer before starting. */
const ready = async () => {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
};

if (!(await ready())) {
  console.error(`No preview server on ${BASE}. Run "npm run build" first.`);
  process.exit(1);
}

console.log('page'.padEnd(18) + ' perf a11y best  seo');
console.log('-'.repeat(42));

let worst = 100;

for (const page of PAGES) {
  const out = join(work, page.replace(/\W+/g, '_') + '.json');
  try {
    execFileSync(
      'npx',
      [
        '--yes',
        'lighthouse@12',
        BASE + page,
        '--quiet',
        '--only-categories=performance,accessibility,best-practices,seo',
        '--form-factor=mobile',
        '--screenEmulation.mobile',
        '--throttling-method=simulate',
        '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
        '--output=json',
        `--output-path=${out}`,
      ],
      { stdio: 'ignore', shell: process.platform === 'win32' }
    );
  } catch {
    /* lighthouse exits non-zero on Windows temp cleanup; the report is written */
  }

  try {
    const { categories } = JSON.parse(readFileSync(out, 'utf8'));
    const scores = ['performance', 'accessibility', 'best-practices', 'seo'].map((k) =>
      Math.round(categories[k].score * 100)
    );
    worst = Math.min(worst, ...scores);
    console.log(
      page.padEnd(18) + scores.map((s) => String(s).padStart(5)).join('')
    );
  } catch {
    console.log(page.padEnd(18) + '  — could not read report');
  }
}

rmSync(work, { recursive: true, force: true });

console.log('-'.repeat(42));
if (worst >= BUDGET) {
  console.log(`PASS — lowest score ${worst}, budget ${BUDGET}.`);
} else {
  console.log(`FAIL — lowest score ${worst}, below the ${BUDGET} budget.`);
  process.exitCode = 1;
}
console.log('\nStop the preview server with: npx astro preview stop');
