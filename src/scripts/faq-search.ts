/**
 * Matcher for the Quick answers widget.
 *
 * Deliberately hand-written rather than Fuse.js. The brief allows either
 * ("vanilla JS or a micro-library like Fuse.js"); for a bank of ~17 entries a
 * token-overlap scorer is a few hundred bytes against Fuse's ~6KB, and it is
 * easier to reason about when an answer is wrong.
 *
 * This module is dynamically imported the first time the widget opens, so it
 * contributes nothing to initial page load.
 *
 * UPGRADE PATH: the exported `search` signature is the whole interface the
 * widget depends on. Swapping in Fuse.js, or a future serverless AI endpoint,
 * means replacing this one function — the UI, accessibility behaviour and FAQ
 * collection are untouched.
 */

export interface Entry {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  page: string[] | null;
}

export interface Match {
  entry: Entry;
  score: number;
}

/** Words too common to carry meaning in a query this short. */
const STOP = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'do', 'does', 'for',
  'from', 'has', 'have', 'how', 'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on',
  'or', 'the', 'to', 'we', 'what', 'when', 'who', 'with', 'you', 'your',
]);

const tokenise = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP.has(word));

/** Cheap singular/plural fold so "districts" matches "district". */
const stem = (word: string) => word.replace(/(ies)$/, 'y').replace(/e?s$/, '');

/**
 * Score one entry against a query. Keyword hits weigh most, because keywords
 * are what the client curates; question and answer text are supporting signal.
 */
const scoreEntry = (entry: Entry, queryTokens: string[], raw: string): number => {
  const keywordText = entry.keywords.join(' ').toLowerCase();
  const questionTokens = new Set(tokenise(entry.question).map(stem));
  const answerTokens = new Set(tokenise(entry.answer).map(stem));
  const keywordTokens = new Set(tokenise(keywordText).map(stem));

  let score = 0;

  // A curated keyword phrase appearing verbatim is the strongest signal.
  for (const keyword of entry.keywords) {
    if (keyword.includes(' ') && raw.includes(keyword.toLowerCase())) score += 6;
  }

  for (const token of queryTokens) {
    const s = stem(token);
    if (keywordTokens.has(s)) score += 4;
    if (questionTokens.has(s)) score += 3;
    if (answerTokens.has(s)) score += 1;
    // partial credit for longer words appearing inside a keyword
    if (s.length > 4 && keywordText.includes(s)) score += 1;
  }

  // Normalise by query length so long questions do not automatically win.
  return queryTokens.length ? score / Math.sqrt(queryTokens.length) : 0;
};

/** Below this, say "I don't have that" rather than return a poor answer. */
export const THRESHOLD = 3.5;

export function search(bank: Entry[], query: string, path?: string): Match[] {
  const raw = query.toLowerCase().trim();
  const tokens = tokenise(raw);
  if (!tokens.length) return [];

  return bank
    .map((entry) => {
      let score = scoreEntry(entry, tokens, raw);
      // Page-scoped entries get a nudge on the page they belong to.
      if (path && entry.page?.includes(path)) score += 1;
      return { entry, score };
    })
    .filter((match) => match.score >= THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
