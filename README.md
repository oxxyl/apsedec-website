# APSEDEC — apsedec.com

Official website for **Acholi Private Sector Development Company Limited**, a
Northern Uganda capacity-building and business development organisation.

Astro · static output · plain CSS with custom properties · no CMS, no database,
no server. Push to `main` and the site deploys itself.

---

## Running it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:4321>. Edits appear immediately.

| Command | What it does |
|---|---|
| `npm run dev` | Local preview with live reload |
| `npm run build` | Build the site into `dist/` |
| `npm run preview` | Preview the built site exactly as it will deploy |
| `npm run check` | Type-check the project |

---

## How to update this site

You do not need to touch code for any of these. Edit a file, commit, push to
`main`, and the site rebuilds in about two minutes.

> Content collections (projects, news, partners, team, resources, FAQ) arrive
> in Phase 2. The recipes below marked **(Phase 2+)** will work once those
> folders exist; they are written here so the workflow is settled in advance.

### Add a project (Phase 2+)

1. Copy any file in `src/content/projects/` to a new name, e.g.
   `new-project.md`.
2. Edit the frontmatter at the top: `title`, `status` (`active` or
   `completed`), `donor`, `districts`, `period`, `refCode`, `summary`.
3. `districts` must use the same district names as the map — copy them from an
   existing project file.
4. Write the project description below the `---` line in plain Markdown.
5. Commit and push to `main`.

### Add a news item (Phase 2+)

1. Add a file to `src/content/news/`, e.g. `2026-03-launch.md`.
2. Set `title`, `date` (as `2026-03-14`), and `summary` in the frontmatter.
3. Write the story below the `---` line.
4. Commit and push.

### Update an impact number

1. Open `src/components/ImpactCounters.astro`.
2. Find the `counters` list near the top of the file.
3. Change the `value` (digits only — no commas) and `label`. The number counts
   up automatically and formats itself.
4. **Only use numbers you can point to in `APSEDEC PROFILE 2026.pdf` or a donor
   report** — every figure on the site must be traceable.
5. Commit and push.

### Swap a photo

1. Put the new image in `src/assets/` (JPG or PNG is fine — it is converted to
   WebP/AVIF automatically at build).
2. Reference it from the relevant `.md` file's `heroImage:` field, or from the
   page that uses it.
3. Commit and push.

### Add an answer to the "Quick answers" assistant

1. Add a file to `src/content/faq/`, e.g. `how-to-partner.md`:
   ```
   ---
   question: "How can my organisation partner with APSEDEC?"
   answer: "APSEDEC delivers in consortium and joint venture…"
   keywords: ["partner", "partnership", "consortium", "tender"]
   ---
   ```
2. `keywords` are the words a visitor might actually type — include misspellings
   and synonyms. They carry the most weight in matching.
3. Optionally add `page: ["/contact/"]` to make an answer rank higher on
   particular pages and appear as a suggested chip there.
4. The widget shows the `answer` **word for word**. It never writes its own
   sentences, so write the answer exactly as you want it read.
5. Commit and push.

### Add a board member or staff profile

1. Add a file to `src/content/team/`, e.g. `jane-okello.md`:
   ```
   ---
   name: "Ms. Jane Okello"
   role: "Finance & Administration Manager"
   board: false
   order: 2
   ---
   ```
2. `board: true` lists them under the Board; `order` sorts within each group.
3. Add `photo: ../../assets/team/jane-okello.jpg` once photographs exist.
4. Commit and push — the About page picks them up automatically.

### Publish a report or policy

1. Put the PDF in `public/resources/` (e.g. `public/resources/safeguarding-policy.pdf`).
2. Add a file to `src/content/resources/`, e.g. `safeguarding-policy.md`:
   ```
   ---
   title: "Safeguarding Policy"
   year: 2026
   file: "/resources/safeguarding-policy.pdf"
   category: policy
   ---
   ```
   `category` is `report`, `policy` or `financial`.
3. Commit and push. The resources page switches from its "nothing published
   yet" state to the real list on its own.

### Add a partner logo

The partner bar is a logo wall. Until a logo file arrives its slot shows a
dashed frame with the partner's name — that is a placeholder, not a design.

1. Put the logo file in `src/assets/partners/` (SVG preferred; otherwise PNG
   with a transparent background, at least 400px wide). Keep it under about
   520px wide — the logos render around 130px, and the build makes its own
   optimised copies.
2. Open the partner's file in `src/content/partners/` and add a `logo:` line
   pointing at it, e.g. `logo: ../../assets/partners/ifad.svg`.
3. Commit and push. The slot fills at the right size automatically — greyscale
   at rest, full colour on hover, and sized by shape so tall and wide marks
   carry the same visual weight. Nothing else to change.

> The `Partner logos/` folder in the repo root holds the client's original
> files as supplied. It is not used by the build — `src/assets/partners/`
> holds the web-sized copies the site actually renders.

To remove a partner from the bar entirely, delete its file from
`src/content/partners/`.

### Put a project on the map

1. Open the project's file in `src/content/projects/`.
2. Add district names to the `districts:` list, spelled as Uganda's official
   district names (e.g. `Gulu`, `Moyo`, `Namayingo`).
3. Push. The map colours those districts green automatically and lists the
   project under each one — nothing else to update.
4. If a name doesn't match a boundary, the build prints a warning naming the
   district and the project. Fix the spelling, or add an alias to `ALIASES` in
   `src/components/DistrictMap.astro`.

### Turn online donations on or off

1. Open `src/config.ts`.
2. Set `DONATIONS_LIVE` to `true` (online donations live) or `false` (online
   section shows "coming soon", bank/mobile money details stay visible).
3. Set `FLW_PUBLIC_KEY` to the Flutterwave **public** key. Never put a secret
   key in this repo.
4. Commit and push.

---

## Deployment & DNS

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds with
the official `withastro/action` and publishes to GitHub Pages.

**One-time setup in the repo:** Settings → Pages → Source → **GitHub Actions**.

### Records to create at the registrar

Verified against GitHub Pages documentation on 15 August 2026. Re-check before
the cutover if significant time has passed.

**Apex domain `apsedec.com` — four A records:**

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Optional but recommended — four AAAA records (IPv6):**

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**`www` subdomain — one CNAME record:**

```
www  CNAME  oxxyl.github.io
```

**Domain verification — one TXT record.** GitHub generates the value. Go to
GitHub → Settings → Pages → "Verified domains" → add `apsedec.com`, and it
shows you the exact record, of the form:

```
_github-pages-challenge-oxxyl.apsedec.com   TXT   <code shown by GitHub>
```

Verifying prevents anyone else from taking over the domain on GitHub Pages.

### apsedec.org → apsedec.com

Set a **web-only redirect** at the `.org` registrar (URL forwarding / HTTP
redirect), pointing `apsedec.org` and `www.apsedec.org` at `https://apsedec.com`.

> ⚠️ **Redirect web traffic only — never forward the whole DNS zone.** The
> `apsedec.org` **MX records must stay exactly as they are** so that
> `info@apsedec.org` keeps receiving mail. Changing or removing the MX records
> will silently break the organisation's email.

### Launch checklist

Work down this list. Items marked **client** need something only APSEDEC can
supply; the rest are one-off setup.

**Before the first deploy**

- [ ] **client** — decide the primary email (`info@apsedec.org` vs the Yahoo
      address printed in the 2026 profile) and set `CONTACT.email` in
      `src/config.ts`
- [ ] **client** — create a Web3Forms account and paste the key into
      `WEB3FORMS_ACCESS_KEY`, or the contact form stays disabled
- [ ] **client** — supply the hero photograph and its caption
- [ ] Create the repo `oxxyl/apsedec-website` and push `main`
- [ ] Repo → Settings → Pages → Source → **GitHub Actions**
- [ ] Confirm the Actions run goes green

**DNS and domain**

- [ ] Create the A (and AAAA) records below at the registrar
- [ ] Add `www` CNAME → `oxxyl.github.io`
- [ ] Verify the domain in GitHub → Settings → Pages → Verified domains
- [ ] Repo → Settings → Pages → Custom domain → `apsedec.com`
- [ ] Wait for the certificate, then tick **Enforce HTTPS**
- [ ] Set the `apsedec.org` → `apsedec.com` **web-only** redirect
- [ ] Send a test email to `info@apsedec.org` and confirm it still arrives

**After DNS is live**

- [ ] Submit `https://apsedec.com/sitemap.xml` to Google Search Console
- [ ] Check the share card by pasting the URL into a LinkedIn or WhatsApp draft
- [ ] **client** — supply partner-free items still outstanding: resource PDFs,
      the all-white logo variant, office addresses (see PENDING_INPUTS.md)

**Donations, when the merchant account exists**

- [ ] Set `FLW_PUBLIC_KEY` (public key only — never a secret key)
- [ ] Set `DONATIONS_LIVE = true`
- [ ] Make one real low-value donation end to end and confirm the receipt page
      shows the reference, and that the transaction appears in the Flutterwave
      dashboard

### Checking quality before a release

Build the site and audit it locally:

```bash
npm run build
```

```bash
npm run audit
```

That serves the built site and runs Lighthouse against the home page on a
simulated mobile connection. The brief's budget is **≥90 in all four
categories**; the site currently scores 97–100 across every page.

> One expected exception: `/donate/thank-you/` scores ~69 for SEO because it is
> deliberately `noindex`. That is correct — a receipt should not be indexed.

### Custom-domain cutover checklist

1. `public/CNAME` already contains `apsedec.com` — leave it.
2. Create the A (and AAAA) records above; wait for propagation (up to 24h).
3. Repo → Settings → Pages → Custom domain → `apsedec.com` → Save.
4. Wait for the certificate, then tick **Enforce HTTPS**.
5. Confirm `https://www.apsedec.com` redirects to the apex.
6. Send a test email to `info@apsedec.org` to confirm mail still arrives.

> **Previewing before DNS is ready.** Because `public/CNAME` is present, GitHub
> Pages redirects `oxxyl.github.io/apsedec-website` to `apsedec.com`, which
> will not resolve until the records above exist. To get a working preview URL
> first, delete `public/CNAME` and set `site: 'https://oxxyl.github.io'` plus
> `base: '/apsedec-website'` in `astro.config.mjs` — then revert both at
> cutover. See the comment at the top of `astro.config.mjs`.

---

## Project structure

```
src/
  components/    Header, Footer, Logo, Placeholder, DistrictMap,
                 ImpactCounters, PartnerBar
  content/       Markdown content collections (projects, partners, …)
  data/          uganda-districts.ts — GENERATED, do not hand-edit
  layouts/       BaseLayout — <head>, skip link, header/footer shell
  pages/         One file per URL
  styles/        tokens.css (the design system), base.css, fonts.css
  config.ts      Org facts, nav, donation flag, third-party keys
scripts/
  build-map.mjs  Regenerates the district geometry (run by hand, rarely)
public/
  fonts/         Self-hosted latin-subset woff2
  CNAME          apsedec.com
```

### Map boundaries

District geometry comes from the OCHA HDX **Uganda — Subnational
Administrative Boundaries** dataset (COD-AB), admin level 2 = 135 districts,
valid 2020-08-24, licensed **CC BY-IGO**. The attribution is printed under the
map on the page, as that licence requires — leave it there.

The geometry is committed as `src/data/uganda-districts.ts`, so the site never
fetches map data at runtime. It only needs regenerating if Uganda's district
boundaries change; the steps are in the header comment of
`scripts/build-map.mjs`.

**`src/styles/tokens.css` is the design system.** Colour, type scale, spacing
and layout all come from there. Three rules are non-negotiable: green
predominates, **every line and border is navy**, and gold is used only for key
numbers and hover states — never for a line. No gradients, no shadows.

---

## Content and honesty rules

- **`APSEDEC PROFILE 2026.pdf` (repo root) is the source of truth** for every
  fact on this site — figures, project descriptions, offices, governance.
  Where it disagrees with anything else, the profile wins.
- **Never invent a statistic, name, date or quote.** Anything not yet supplied
  renders as a visible navy-bordered placeholder and is tracked in
  [PENDING_INPUTS.md](PENDING_INPUTS.md).
- The "Quick answers" assistant is **rule-based, not AI** — it matches typed
  questions against the FAQ collection and returns those answers verbatim. It
  makes no external network calls and has no API key. Below a match threshold
  it says it does not know and points at the contact and resources pages.
  *Upgrade path (not built):* everything the widget knows about matching is the
  `search(bank, query, path)` function exported from
  `src/scripts/faq-search.ts`. Swapping in Fuse.js, or calling a future
  serverless AI endpoint, means replacing that one function — the UI, the
  keyboard and screen-reader behaviour, and the FAQ collection are untouched.
  Note that an AI endpoint would mean introducing a server, which the current
  zero-server constraint rules out.
- The donation receipt page displays what the payment provider returns in the
  URL. It is presentational only — **real verification happens in the
  Flutterwave dashboard**.

---

## Design

The visual language is "the field ledger" — ruled navy baselines, stamped
reference codes, tabular figures, and an interactive Uganda district map as the
one bold element. Reasoning and per-page decisions are recorded in
[design-notes.md](design-notes.md).

## Build phases

- **Phase 0 — Scaffold** ✅ tokens, fonts, layout shell, CI, placeholder home
- **Phase 1 — Design system + Home** (map island, full home page)
- **Phase 2 — Content pages** (About, What We Do, Projects, Partners,
  Resources, News, Contact)
- **Phase 3 — Where We Work, Donate, Quick answers assistant**
- **Phase 4 — Hardening & launch** (Lighthouse, a11y audit, OG images, DNS)
