# Pending inputs — awaiting client

> **Build status:** all four phases complete. 27 pages, Lighthouse 97–100 on
> mobile across every page. The three items under "Blocking launch" are what
> stand between this and going live.

Everything the site needs but does not yet have. Each item renders on the site
as a visible navy-bordered placeholder (BRIEF.md §13) until it is supplied.
Nothing on this list has been invented or estimated.

**Source of truth for facts: `APSEDEC PROFILE 2026.pdf`.** BRIEF.md §2 was
rewritten from it on 15 Aug 2026. Where the two disagree, the profile wins.

Status key: ☐ outstanding · ☑ resolved from the 2026 profile

## Resolved by the 2026 profile

- ☑ **Founding year and registration** — established June 1999 (as a GoU/UNDP
  CCF I project, formerly Kitgum Private Sector Promotion Centre); registered
  June 2004, Registration No. 62106. Now live in the footer.
- ☑ **Board chair and CEO** — Mr. Ogwang Daniel Abwa (Board Chair),
  Mr. Nelson Tasenga (Chief Executive Officer).
- ☑ **Office list** — Kitgum HQ plus Gulu, Buvuma, Kasese, Mayuge and Kampala
  with addresses/phones; Pader, Kaabong and Kalangala named without addresses.
- ☑ **Headline impact figures** — 25+ years, 70,000+ farmers and women, 8,000+
  VSLAs, 40+ districts. Now the home page counters.
- ☑ **Current project portfolio** — six seeded into `src/content/projects/`.

## Blocking launch

- ☑ **APSEDEC logo received** (15 Aug 2026, `APSEDEC Logo/`). The
  **full-colour** emblem is now live on the dark green header band on every
  page, in the footer and on the donate band, paired with the typeset name
  (client decision, 16 Aug 2026).
- ☐ **Logo source vector (SVG / AI / EPS) — needed.** The supplied artwork is a
  raster PNG (2209×2080). At header size the seal's two banners of curved text
  are not legible, which is why the emblem is paired with the typeset lockup
  rather than carrying the wording itself. A vector source would allow a
  simplified small-size mark (and a crisp favicon) to be drawn from the same
  artwork. The client has confirmed they do not hold one — it may need to be
  redrawn from the print original.
- ☐ **A simplified web mark would help** (optional, and best drawn from the
  vector above). The seal is built for print: at 32px in a browser tab its two
  banners of curved text are illegible. A stripped-back version — the roundel
  alone, or a monogram — would serve the favicon and small placements far
  better. The current favicon is generated from the full seal as a stopgap.
- ☐ **Primary email confirmation.** The 2026 profile prints
  `apsedec2006@yahoo.co.uk` as the organisation's email — not `info@apsedec.org`.
  Confirm which address the site should show, and set up the mailbox.
  Set in `src/config.ts` → `CONTACT.email`.
- ☐ **Web3Forms access key** for the contact form → `src/config.ts` →
  `WEB3FORMS_ACCESS_KEY`. The contact page is built and the fields are laid
  out, but every input is **disabled** until the key exists — email and phone
  work now. Create a free account at web3forms.com with the APSEDEC address.
- ☐ **Office addresses and phones** for Pader, Lira City, Kaabong, Iganga and
  Kalangala — they show placeholders on the contact page. Mayuge and Kampala
  have phones but no street address.

## Questions raised by the profile

- ☐ **District count discrepancy.** "Our Reach" says **40+ districts reached
  nationwide**; "Where We Are" says **nearly 50 districts** implemented, with
  active projects in **15**. The counters use 40+. Confirm which is current.
- ☑ **AWCEM districts confirmed** (client, 15 Aug 2026): Kitgum, Lira, Lira
  City, Gulu City, Nwoya, Oyam, Gulu, Omoro. Now on the map — Gulu City and
  Lira City are aliased onto the Gulu and Lira polygons, since the 2020
  boundaries predate the city splits. Noted: the profile files AWCEM under
  "Acholi sub-region", but Lira, Lira City and Oyam are Lango — the project
  record now lists both regions.
- ☑ **HMHL districts confirmed** (client, 15 Aug 2026) — same eight as AWCEM.
  **All 15 projects now carry districts**, so every project appears on the map
  and no "districts awaiting" note remains on the site.
- ☐ **CECI** was listed as a partner in the original brief but does not appear
  in the 2026 profile's donor and partner list. Drop it, or confirm.
- ☑ **All 15 projects seeded** (6 current + 9 earlier), so the map now shows
  **48 coverage districts** — consistent with the profile's "nearly 50
  districts" line.
- ☐ **PROFIRA district list.** The profile gives "Acholi & Lango sub-regions"
  without naming districts. Per the coverage map and the client's instruction
  of 15 Aug 2026, PROFIRA is recorded as covering **all 8 Acholi districts**
  (Agago, Amuru, Gulu, Kitgum, Lamwo, Nwoya, Omoro, Pader) and **all 9 Lango
  districts** (Alebtong, Amolatar, Apac, Dokolo, Kole, Kwania, Lira, Otuke,
  Oyam). Confirm this is right — it is the single biggest driver of what the
  map shows.
- ☐ **Hoima** is green on the profile's coverage map but no project in the
  profile names it. It is listed in `COVERAGE_ONLY` in `src/config.ts` and
  shows a placeholder instead of a project list. Which programme covered it?
- ☑ **Lira City confirmed as an office** (client, 15 Aug 2026) — added, giving
  11 offices. The marker sits on Lira district, since the 2020 boundaries
  predate the city split (same handling as Gulu City).
- ☐ **Lira City street address and phone**, to match the other offices in
  `src/config.ts`.
- ☐ **Kalangala office** is named as a field office in the profile's "Who We
  Are" but has no address or phone in "Contact Us". Included in the office
  list; supply an address or remove it.
- ☐ **Hero headline** — currently "A centre of business excellence for
  Uganda's private sector", compressed from the profile's vision statement.
  Two alternatives are on the table (see the Phase 0 revision note).

## Content

- ☐ **Social account URLs — YouTube, X, LinkedIn and Facebook.** The footer
  renders no social row at all until these arrive: set each `url` in `SOCIAL`
  and flip `SOCIAL_LIVE` to true in `src/config.ts`. Icons are already drawn;
  nothing else needs changing.
- ☐ **Real photography — the site is running on interim images.** Nine assets
  were recovered from the 2019/2020 annual report and are placeholders only:
  partner logos for RTI, TechnoServe, World Education/Bantwana and UKaid
  (`src/assets/partners/`), and five field photographs used as project
  thumbnails (`src/assets/projects/interim-*.png`). They are low resolution
  and are never scaled beyond their native size, so they will look small rather
  than soft. Replacing a file is the whole fix — no code changes.
- ☐ **Vacancy postings for /careers/.** The page is driven by the `vacancies`
  collection: one Markdown file per role in `src/content/vacancies/` with
  title, closing date, location, description and how to apply. With none open
  the page says so. A posting disappears on its own once its closing date
  passes.

- ☑ **Partner logos — 11 client-supplied logos live** (15 Aug 2026): African
  Development Bank, CARE International, FSD Uganda, GOAL, IFAD, MAAIF, MoFPED,
  NWSC, UNDP, USAID, World Bank. Web-sized copies live in
  `src/assets/partners/`; the originals you supplied are untouched in
  `Partner logos/`. *(UNHCR removed 16 Aug 2026 on client instruction — see the
  note in design-notes.md, since the 2026 profile does list it.)* Four further
  logos — RTI, TechnoServe, World Education/Bantwana, UKaid — are interim
  low-resolution recoveries; see "Real photography" above.
  *(Removed from the bar on client instruction: Bloomberg Philanthropies,
  UNCDF, Gates Foundation.)*
- ☐ **Bloomberg Philanthropies and Gates Foundation still appear in project
  detail**, because the 2026 profile credits them: Gates as a DREAMS funder,
  Bloomberg as an HMHL partner. They are out of the logo bar but remain in
  those two project records. Confirm whether they should come out of the
  project text as well — that would mean departing from the profile.
- ☐ **Logos for implementing partners** (RTI, TechnoServe,
  World Education/Bantwana, IIRR, SEPSPEL, MNPSDC) — these are in the
  collection but not shown in the home page bar. Say if they should be.
- ☐ **Hero photograph** — the full-bleed image below the hero. Landscape,
  minimum 2400px wide, documentary (field, training or savings-group scene).
  **Plus a caption and location** — it is set like a field report, so the
  caption is part of the design, not optional.
- ☐ **Photography** — further field, office and team images.
- ☐ **Full board and management staff list** beyond the Chair and CEO.
- ☐ **Resource PDFs** — Safeguarding Policy, Code of Conduct, annual and
  financial reports (title, year, file size, category for each).
- ☐ **Review the seeded "Quick answers" bank — 17 entries.** All are drawn
  from the 2026 profile or from the project record; nothing is invented. Two
  say plainly that APSEDEC has not published the information and point to
  contact: **jobs and volunteering**, and **the partnership/tender process**.
  If either exists, send the detail and the answers can be replaced.
  Entries live in `src/content/faq/`.

## Donations (Phase 3)

- ☐ **Flutterwave merchant onboarding status** — until complete, the online
  section ships in a "coming soon" state via `DONATIONS_LIVE` in
  `src/config.ts` (currently `false`).
- ☐ **Flutterwave public key** → `src/config.ts` → `FLW_PUBLIC_KEY`.
  Public key only — never a secret key in this repo.
- ☐ **Bank and mobile money transfer details.**

## Infrastructure

- ☐ **Repo created** at `oxxyl/apsedec-website`, Pages source set to
  **GitHub Actions**.
- ☐ **DNS records set at the registrar** — see README "Deployment & DNS".
- ☐ **apsedec.org → apsedec.com web redirect** at the registrar. Redirect
  **web traffic only** — the `.org` MX records must keep working so
  `info@apsedec.org` still receives mail.
