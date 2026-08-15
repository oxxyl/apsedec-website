# CLAUDE CODE BUILD PROMPT — APSEDEC ORGANISATIONAL WEBSITE (v2)

> **How to use this file:** Save as `BRIEF.md` in an empty repo, open Claude Code (Opus 4.8), and say:
> *"Read BRIEF.md in full, then execute Phase 0. Pause for my review at the end of each phase. Never invent facts — use the placeholder convention in §13."*

---

## 1. Mission & your role

You are the sole developer building the official website for **APSEDEC (Acholi Private Sector Development Company Limited)** — a Northern Uganda capacity-building and business development organisation with 25+ years of experience in agricultural value chains, VSLA formation, microfinance, and women's economic empowerment.

The site must be **credible to institutional donors** (World Bank, IFAD, CARE, USAID, UNDP have all funded APSEDEC), **fast on Northern Ugandan mobile connections**, and **maintainable by one technical person** (the client, GitHub user `oxxyl`) whose workflow is: drop a Markdown file in a folder, push to `main`, done. No CMS, no database, no admin panel, no paid services beyond the domain and payment processing.

Act as a design lead at a small studio whose reputation is that no two clients' sites look alike. The client has explicitly rejected "generic vibe-coded" output. You will make opinionated, subject-grounded design choices (§4) and defend them.

---

## 2. Organisation facts (verified — use verbatim)

| Item | Value |
|---|---|
| Full name | Acholi Private Sector Development Company Limited (APSEDEC) |
| Legal form | Company limited by guarantee, Uganda |
| Tagline | "Promoting business excellence that sustainably meets the needs of private sector growth and development" |
| HQ | Awich Road (opposite Kitgum District Post Office), P.O. Box 374, Kitgum, Uganda |
| Field offices | Gulu, Pader |
| Phone | 0774505904 / 0782525228 |
| Primary email | **info@apsedec.org** ▶ [client to confirm — note primary domain is apsedec.com; switch to info@apsedec.com if preferred] |
| Legacy emails | apsedec2006@yahoo.co.uk, apsedec2006@gmail.com (secondary, contact page only) |
| Domain | **apsedec.com** (primary; apsedec.org redirects to it) |
| Donors & partners | IFAD, World Bank, USAID, CARE International, UNDP, NWSC, MAAIF, CECI, Ministry of Finance |

**Verified track record (usable as impact copy):**
- PROFIRA 1 & 2 (IFAD/MoFPED): formed and strengthened **5,000+ community savings and credit groups (CSCGs)** across Acholi and Lango, reaching **138,000+ direct** and **828,000+ indirect beneficiaries**; a further 500 CSCGs supported through COVID-19 recovery stimulus grants.
- IWMDP LOT 3 (World Bank/NWSC): alternative livelihoods for 300 households in the Oyitino Catchment, Gulu City — 10 VSLAs, poultry and piggery enterprises.
- NOPP-FID Component 2 (IFAD/MAAIF): oil palm grower organisation and SACCO formation in Buvuma, Mayuge, Kalangala, Namayingo.
- HMHL — Her Money, Her Life (CARE): women's economic empowerment across Acholi and Lango sub-regions, consortium with JESE and NOGAMU.
- AWCEM (CARE): 331 women's collective enterprises (6,620 women) across 8 Northern Uganda districts in groundnuts, hibiscus, seed oils, and shea butter value chains.
- Metu SACCO capacity building (Mastercard Foundation-linked).

Any figure, name, or date NOT listed above must use the placeholder convention (§13). **Never invent statistics, board members, dates, or quotes.**

---

## 3. Hard constraints (non-negotiable)

1. **Stack:** Astro (latest stable), static output. Plain CSS with custom properties — no Tailwind, no CSS-in-JS, no UI kit. Vanilla JS / minimal Astro islands for interactivity.
2. **Hosting:** GitHub Pages via GitHub Actions on push to `main`. Repo under the `oxxyl` account. `CNAME` file containing `apsedec.com`.
3. **Content model:** Astro content collections (Markdown + frontmatter) for projects, news, partners, team, resources, and the assistant's FAQ bank (§9).
4. **Zero server:** no backend, no serverless functions, no database. The donation flow (§8), contact form (§5), and floating assistant (§9) must all work within this constraint.
5. **Performance budget:** Lighthouse ≥90 all four categories on mobile; total JS shipped to the homepage <75KB gzipped excluding the map island; every image in AVIF/WebP with width/height set; fonts self-hosted and subset.
6. **Accessibility:** WCAG 2.1 AA. Keyboard-navigable map with a list fallback, visible focus states, `prefers-reduced-motion` respected.
7. **No paid dependencies** other than: domain registration, Flutterwave transaction fees.

---

## 4. Design direction

### 4.1 Brand tokens (exact)

```css
:root {
  --green: #1B7340;   /* PREDOMINANT — brand surfaces, primary actions, section accents.
                         Derive a family of shades/tints from this (deep forest → pale leaf)
                         and let green carry the site. */
  --navy:  #1E3A5F;   /* STRUCTURE — all rules, hairlines, ledger baselines, borders,
                         dividers, strokes, and body-ink derivation. Lines are navy. */
  --gold:  #D4A843;   /* PUNCTUATION ONLY — key numbers, active/hover states, small
                         highlights. Never used for lines, rules, or borders. */
  /* Neutrals: warm off-white paper tone + near-black ink derived from the navy.
     No colors outside this system. */
}
```

**Color hierarchy (client-specified, follow exactly):** the site reads as *shades of green with yellow accents*, and **every line, rule, hairline, and border is navy blue** — consistent with the APSEDEC logo. If an element needs a stroke or divider, it is navy, not gold, not green. If a page reads navy-first or gold-heavy, rebalance toward green.

### 4.2 Logo usage

- Primary logo on light/paper backgrounds.
- **All-white logo variant** on green (and navy) surfaces — header over the hero, the green donate band, and the footer. ▶ [WHITE LOGO FILE — client to supply or derive from the primary SVG].
- Never place the color logo on a green background; never box the logo in a white rectangle to force contrast.

### 4.3 Typography

- **Body/UI:** Carlito (self-hosted; metric-compatible with APSEDEC's print standard, Calibri).
- **Display:** choose ONE characterful serif or slab with genuine personality that pairs with Carlito and suits an East African development organisation — candidates: Fraunces, Zilla Slab, Bitter. Use it with restraint: headlines and pull-numbers only.
- **Data/utility:** a mono or tabular-numeral face for figures, ledger rows, and map labels (e.g., IBM Plex Mono). Tabular numerals mandatory wherever numbers align vertically.
- Set a real type scale. The type treatment should be memorable in itself.

### 4.4 Aesthetic concept — "the field ledger"

Ground every design decision in APSEDEC's actual world: **VSLA passbooks, savings ledgers, agricultural record-keeping, field data collection**. This organisation's craft is turning careful rural record-keeping into economic transformation — let the visual language say so:

- Ruled horizontal baselines (navy) and ledger-row layouts for impact data instead of floating stat cards.
- Stamped/serial-number treatments for project reference codes (e.g., "P163782") as quiet structural labels.
- Tabular, dense, honest presentation of numbers — this audience (donor programme officers) trusts tables over hero blobs.
- Photography treated documentary-style: full-bleed, captioned like a field report, never stock-photo gloss. Duotone (green/navy) treatment acceptable for consistency while real photography is pending.

### 4.5 Signature element

The **interactive Uganda district map** is the site's one memorable element (spec in §7). It IS the hero (§5) and appears again, expanded, on *Where We Work*. Spend the design boldness here; keep everything around it quiet and disciplined.

### 4.6 Anti-generic rules (hard requirements)

- NO: gradient mesh/blob heroes, glassmorphism, emoji as icons, three-equal-card feature grids, purple/teal SaaS palettes, testimonial carousels, generic "empowering communities" stock imagery, scroll-jacking, cookie-cutter numbered 01/02/03 markers unless the content is genuinely sequential.
- NO cream-background + terracotta-accent look; NO near-black + acid-green look. These are AI defaults, not choices.
- Before building each page, write a 5-line design plan in a scratch file (`/design-notes.md`): palette use, type roles, layout concept (ASCII wireframe), signature moment, and one thing you rejected because it was the default. Keep appending — it's your design memory across sessions.
- One orchestrated motion moment per page maximum (e.g., the map's district-by-district reveal on first load). Everything else static.

### 4.7 Reference sites (study, don't copy)

- `sepspel.com` — a sister private-sector development company; note the institutional tone and project-centric structure. APSEDEC's site must feel like the more design-mature sibling.
- `careuganda.org` — note information hierarchy for a donor-facing NGO: impact up front, programmes as the core object, clear donate pathway.
- The WENIPS donation receipt flow (GiveWP: campaign → payment → success page with receipt ID) — replicate the *experience* statically per §8.

---

## 5. Sitemap & page specs

```
/                    Home
/about/              About (history, mission/vision, governance, policies)
/what-we-do/         Programme areas (value chains, VSLA/microfinance, WEE, MEAL)
/projects/           Project index (filterable by status, donor, district)
/projects/[slug]/    Project detail
/where-we-work/      Full-page district map + district profiles
/partners/           Donor & partner grid with relationship context
/resources/          Downloadable reports, policies (Safeguarding, Code of Conduct)
/news/               News/updates index + [slug] detail
/donate/             Donation page (§8)
/donate/thank-you/   Receipt page (§8)
/contact/            Contact + offices + form
```

**Home — minimal hero (client-specified):** the hero is quiet and spare — the organisation name / a single short headline thesis, the tagline or one line of supporting copy, one call-to-action, and the **district map as the visual centrepiece**. Generous whitespace; white logo over green if the hero surface is green. No impact numbers, no cards, no secondary content in the hero. Below the fold, in order: ledger-style impact strip (the verified PROFIRA numbers), current projects (3, from collection where `status: active`), partner logo bar (grayscale, colored on hover), donate call-to-action band in green with the white logo.

**Projects detail:** frontmatter-driven metadata block (donor, period, districts, reference code as stamped serial, status), body prose, optional Chart.js island for project data, related-district links into the map.

**Resources:** list real files the client will supply — Safeguarding Policy, Code of Conduct, annual reports. Each entry: title, year, file size, type badge, download link. ▶ **[FILES TO BE SUPPLIED BY CLIENT]**

**Contact form:** Web3Forms (free tier, static-compatible). Access key: ▶ **[WEB3FORMS_ACCESS_KEY — client to create account and supply]**. Honeypot spam field. Success/error states inline, no redirect. Primary email displayed: info@apsedec.org.

---

## 6. Content collections (schemas)

```ts
// src/content/config.ts — implement exactly
projects: { title, slug, status: 'active'|'completed', donor: string[],
  partners?: string[], districts: string[],  // must match map district IDs
  period: { start: string, end?: string }, refCode?: string,
  sector: string[], summary: string, heroImage?: image, featured?: boolean }

news:      { title, date, summary, heroImage?, tags?: string[] }
partners:  { name, logo: image, url?: string, type: 'donor'|'implementing'|'government' }
team:      { name, role, photo?: image, board: boolean, order: number }
resources: { title, year, file: string, category: 'report'|'policy'|'financial' }
faq:       { question, answer, keywords: string[], page?: string[] }  // assistant bank, §9
```

Seed the collections with the verified projects from §2 (IWMDP, NOPP-FID, HMHL, AWCEM, PROFIRA, Metu SACCO) — summaries from §2 facts only, placeholders elsewhere.

---

## 7. Interactive Uganda district map (signature island)

- Inline SVG of Uganda's district boundaries. Source geometry from geoBoundaries or OCHA HDX (open licence), simplify with mapshaper to keep the SVG **<80KB**. Commit the SVG to the repo — no runtime fetch, no map library, no tiles.
- Each district `<path>` carries `data-district="gulu"` etc. Districts where APSEDEC works (derived at build time from the `districts` field across the projects collection) are filled green; others paper-tone with **hairline navy borders**.
- Interaction: hover/focus → gold highlight + tooltip (district name, project count); click/Enter → panel listing that district's projects with links. Full keyboard support: districts are focusable in a logical order.
- **Mobile & a11y fallback:** an accessible `<select>`/list of active districts rendering the same panel. The map is enhancement, never the only path.
- One motion moment: on first viewport entry, active districts fill in a brief staggered sequence (skipped under `prefers-reduced-motion`).

---

## 8. Donation flow (Flutterwave, static-compatible)

**Decision made — build around Flutterwave** (supports MTN MoMo, Airtel Money, and international cards; UGX and USD; hosted checkout so no payment data touches this site).

### 8.1 `/donate/`
- Amount presets in a UGX/USD toggle (e.g., UGX 20,000 / 50,000 / 100,000 / 250,000; USD 10/25/50/100) + custom amount field. One-time donations at launch; note recurring as a later Flutterwave payment-plan enhancement.
- Optional fields: name, email (required by Flutterwave for receipt).
- On submit, launch **Flutterwave Inline (checkout.js)** with the **public key only** — ▶ **[FLW_PUBLIC_KEY — client to supply after APSEDEC merchant onboarding]**. Generate `tx_ref` client-side as `APSEDEC-{timestamp}-{random}`.
- `redirect_url: https://apsedec.com/donate/thank-you/`.
- A quiet secondary section: direct bank transfer and mobile money merchant details for donors who prefer not to pay online — ▶ **[BANK & MOMO DETAILS — client to supply]**.
- **Until the merchant account exists**, ship the page with the online section in a clearly-styled "coming soon" state and the direct-transfer section live. Gate via a single `DONATIONS_LIVE` flag in `src/config.ts`.

### 8.2 `/donate/thank-you/` (the receipt page)
Replicates the reference GiveWP success-page experience statically:
- Read `status`, `tx_ref`, `transaction_id` from query params (client-side JS).
- `status=successful` → render a receipt card: APSEDEC letterhead treatment (green header with white logo, navy rules), "Donation received — thank you", receipt reference = `tx_ref`, transaction ID, date, and a note that an email receipt follows from Flutterwave. Ledger-styled, printable (`@media print` styles).
- `status=cancelled`/failed → sympathetic message + retry link + direct-transfer details.
- No params → generic thank-you (page reached directly).
- **Honesty constraint:** client-side display is presentational; true verification happens in the Flutterwave dashboard. Do not fake a "verified" state. Add `noindex` to this page.

---

## 9. Floating assistant (all pages, zero-server)

A small floating assistant widget, bottom-right on every page, that answers basic questions about APSEDEC. **This is NOT an AI chatbot** — no API calls, no keys, no external services (a client-side API key would be publicly exposed; a proxy would violate §3.4). Build it as a **rule-based FAQ assistant**:

- **Content source:** the `faq` content collection (§6) — question, answer, keywords, optional page-scoping. Client maintains it like any other Markdown content. Seed ~15 entries from §2 facts only (what APSEDEC does, where it works, how to donate, how to contact, current projects, how to partner/tender) — placeholder-flag anything unverified.
- **Matching:** lightweight client-side fuzzy/keyword matching (vanilla JS or a micro-library like Fuse.js, lazy-loaded only when the widget is opened — it must contribute 0KB to initial page load).
- **UX:** collapsed launcher button (green circle, white icon, navy hairline ring) → opens a chat-style panel styled to the ledger aesthetic; suggested question chips; typed queries return the best-matching answer; below-threshold matches return a graceful "I don't have that yet" with a link to /contact/ and /resources/. Include a visible label like "Quick answers" — do not present it as a human or an AI.
- **Accessibility:** focus-trapped panel, ESC to close, `aria-live` for answers, launcher reachable by keyboard, respects `prefers-reduced-motion`.
- **Honesty:** never fabricate an answer; the widget only ever returns entries from the FAQ bank verbatim.
- **Upgrade path (document in README, don't build):** the widget's interface should be a thin wrapper so a future serverless-backed AI endpoint could replace the matcher without redesigning the UI.

---

## 10. Non-functional requirements

- Mobile-first; test at 360px. Assume 3G — the primary audience includes users in Kitgum, Gulu, Pader.
- SEO: unique titles/descriptions, OpenGraph images (generated at build with the brand system), `sitemap.xml`, `robots.txt`, JSON-LD `NGO` schema on the homepage.
- All fonts subset (latin) and self-hosted with `font-display: swap`.
- HTML validates; zero console errors; no layout shift on font/image load.

---

## 11. Repo, CI/CD, DNS

1. Repo: `oxxyl/apsedec-website`. Branch `main` = production.
2. GitHub Action: official Astro → Pages workflow (`withastro/action`), deploy on push to `main`.
3. `public/CNAME` → `apsedec.com`.
4. Document in `README.md`: DNS records the client sets at the registrar — apex A records `185.199.108.153 / .109.153 / .110.153 / .111.153`, `www` CNAME → `oxxyl.github.io`, plus GitHub domain-verification TXT — **and verify these against current GitHub Pages docs before writing them** — plus the **apsedec.org → apsedec.com registrar redirect** (and note email: info@apsedec.org must keep working via the .org domain's MX records even while web traffic redirects — redirect web only, never the whole DNS zone).
5. `README.md` also gets a **"How to update this site"** section written for the client: add a project, add news, update an impact number, swap a photo, add an FAQ entry to the assistant, change the donation flag — each as a 3–5 step recipe.

---

## 12. Build phases (pause for client review after each)

- **Phase 0 — Scaffold:** Astro project, tokens, fonts, layout shell (header/footer/nav), CI to GitHub Pages, placeholder home. Deliverable: live at `oxxyl.github.io/apsedec-website`.
- **Phase 1 — Design system + Home:** implement §4 fully; design-notes.md critique pass; minimal hero with map island; home complete.
- **Phase 2 — Content pages:** About, What We Do, Projects (+details, seeded), Partners, Resources, News, Contact.
- **Phase 3 — Where We Work + Donate + Assistant:** full-page map, donation flow, thank-you/receipt page, floating FAQ assistant with seeded bank.
- **Phase 4 — Hardening & launch:** Lighthouse pass, a11y audit, OG images, README recipes, DNS documentation, custom-domain cutover checklist.

**Acceptance per phase:** screenshots (mobile + desktop) of every new page, Lighthouse scores, and a one-paragraph note on any deviation from this brief.

---

## 13. Placeholder convention & pending inputs

Wherever real content is missing, render a visually obvious placeholder — a **navy-bordered** block containing `▶ [DESCRIPTION — awaiting client]` — never invented content. Maintain a running `PENDING_INPUTS.md` checklist. Known pending items:

- ▶ Confirmation of primary email (info@apsedec.org vs info@apsedec.com) and mailbox setup
- ▶ Verified org-wide impact numbers beyond §2 (client will confirm against reports)
- ▶ Official APSEDEC logo files (SVG/PNG) **including the all-white variant**
- ▶ Partner logos
- ▶ Photography (field, offices, team)
- ▶ Board and management staff list with roles
- ▶ Web3Forms access key
- ▶ Flutterwave public key + merchant onboarding status
- ▶ Bank / mobile money transfer details for the donate page
- ▶ Resource PDFs (Safeguarding Policy, Code of Conduct, annual/financial reports)
- ▶ Founding year and history timeline detail
- ▶ Review/expansion of the seeded assistant FAQ bank

## 14. What NOT to do

- Don't add frameworks, UI kits, or dependencies beyond: Astro, Chart.js (islands only where a project page needs a chart), checkout.js (loaded only on /donate/), Fuse.js (lazy-loaded, assistant only).
- Don't invent facts, quotes, statistics, staff, or history — including in the assistant's FAQ bank.
- Don't put any secret key, private key, or credential in the repo — public keys only, and only the ones the client supplies.
- Don't restructure this brief's sitemap, schemas, or phases without asking.
- Don't produce the three default AI looks named in §4.6, and don't use gold for any line, rule, or border — lines are navy.
