# Design notes — APSEDEC

Design memory across sessions (BRIEF.md §4.6). Append, never rewrite.
Five lines per page before building it: palette use, type roles, layout
concept, signature moment, one thing rejected because it was the default.

---

## Phase 0 — System foundation (approved by client before build)

**Palette use.** One green ramp derived from `#1B7340`, ten steps, deep forest
(`--green-900`) to pale leaf (`--green-050`). Green carries the page as ground,
not as accent: hero panel, donate band and footer are all green surfaces. Navy
`#1E3A5F` is used for structure only — every rule, hairline, border and the
`--ink` body colour derive from it. Gold `#D4A843` appears only as key numbers
and hover/active states; `--gold-deep` (`#a37f27`) is the on-paper variant so
gold text clears AA. Target proportion: green ~60% of vertical page area, paper
~35%, navy lines ~4%, gold ~1%.

**Type roles.** Zilla Slab 600 for headlines and pull-numbers only. Carlito
400/700 for all body and UI (metric-compatible with APSEDEC's Calibri print
standard). IBM Plex Mono 400/500 for the margin column, ref codes, sources,
dates and figures — tabular numerals on everywhere numbers stack. Six-step
`clamp()` scale, ratio 1.25 → 1.333.

**Layout concept.** The record-book spread: a narrow mono margin column
(`--margin-col`, 140px) carrying section numbers and metadata, beside the
content column. Collapses to stacked below 62rem. This is the through-line that
makes every page recognisably the same document.

```
green-900 panel ─────────────────────────
  eyebrow · headline · tagline · one CTA
        ┌────────────────────┐
────────│  MAP CARD          │───────────  ← straddles the boundary
 paper  └────────────────────┘
 §01 ▏ ledger impact rows, navy rules
```

**Signature moment.** The map card rises 128px (desktop) / 96px (mobile) into
the green hero, so the top of Uganda is visible above the fold inside the green
field. This also resolves a brief conflict: §4.2 wants a green hero surface,
§7 wants paper-tone districts with navy hairlines — the card straddles both.

**Rejected as default.** (1) Fraunces — the current AI-default "characterful
serif", a tell of exactly the vibe-coded output the client rejected; Zilla
Slab's flat engineered slabs read stamped rather than editorial. (2) Floating
stat cards with drop shadows — replaced by ruled ledger rows. (3) A gradient
green hero — one flat field instead. Standing rule for the whole site: **no
gradients anywhere, and no shadows except on interactive cards** (see below);
depth comes from navy rules and flat colour, which is what makes it read as
printed stock rather than UI chrome.

**Amended: shadows on interactive cards.** (Client instruction, superseding the
blanket ban above — amended, not lifted.) A shadow is permitted **only** on a
card that lifts or animates on hover or focus: the practice-area tiles, the
core-values tiles, and the project cards. The shadow must be a **single soft
shadow that appears on interaction**, never a permanent one at rest.

Shadows remain **banned** on static containers, section blocks, ledger rows,
the impact strip, the map card, partner slots, and anything else that does not
respond to the pointer or the keyboard. The original rule existed to stay out
of generic SaaS territory, and a resting shadow on every card is exactly that
territory — so the test for any new shadow is: *does this element do something
when you touch it?* If not, it does not get one.

One token, `--lift-shadow`, carries the whole allowance, so the permitted set
is greppable and cannot spread by copy-paste. Focus produces the same visual
state as hover — a keyboard user sees the lift, not just the outline — and
under `prefers-reduced-motion: reduce` the movement and the bounce are dropped
while the shadow and the ground change still fire, so the state change stays
legible without motion.

**Open deviation.** On `--green-900` surfaces a navy hairline is effectively
invisible (~1.3:1). Rules on deep-green grounds use `--rule-on-green`
(translucent white) instead. Navy remains the rule colour on every paper and
mid-green surface. Flagged to the client at the end of Phase 0.

---

## Phase 0 revision — greener grounds, real figures (client corrections)

**Palette.** The neutral ground is gone. `--paper` is now `#e7f1e8` (pale
leaf), `--paper-sunk` `#d9e9dc`, `--paper-raised` `#f2f8f2` — there is no
off-white anywhere on the site. Headings take `--heading: var(--green-900)`.
Dark green stays on the hero, donate band and footer. Net effect: dark-green
bands hold ~47% of page height and the remaining 53% is pale green, so nothing
on the page is colour-neutral. `--gold-deep` darkened to `#8f6f21` to hold
4.1:1 on the new ground (was 3.2:1 — passing for large text, but with no
margin).

**Contrast bug found and fixed.** `.on-brand a` beat `.btn--paper` on
specificity and painted white text onto the pale button fill — about 1.1:1, on
the hero's only call to action. Now scoped `.on-brand a:not(.btn)`. Every
foreground/background pair on the home page is now measured, and the worst is
3.2:1 on large-text figures against a 3:1 floor.

**Motion.** The count-up strip is the home page's one orchestrated motion
moment (§4.6). It fires once on first viewport entry via IntersectionObserver,
ease-out cubic over 1400ms, and is skipped entirely under
`prefers-reduced-motion` — final values are server-rendered, so the strip is
correct with no JS at all. A `setTimeout` backstop settles the final value if
`requestAnimationFrame` is throttled (background tab), because a stranded `0+`
would be a wrong number, not just a missing animation. **This means the map's
district-by-district reveal can no longer also live on the home page** — it
moves to `/where-we-work/`, or the counters give way. Client decision pending.

**Rejected as default.** Floating stat cards for the counters — the count-up
lives in ledger rows with a mono index column and navy rules, so the motion
reads as figures being posted into a book rather than a SaaS metrics band.

---

## Phase 1 — Home complete, map island built

**Palette use.** Unchanged from the Phase 0 revision. Watch item: as the home
page grew from 2,544px to ~5,300px, the dark-green share fell from 47% to 42%.
Every ground on the page is still green-family — there is no neutral anywhere —
but if Phase 2 adds more pale sections the balance needs another green band.

**Type roles.** Unchanged. New: the district panel sets district names in
Plex Mono uppercase rather than Zilla Slab, so the map's aside reads as an
index rather than a second column of headlines competing with the page.

**Layout concept.** Home is now, in order: green hero → map card straddling the
boundary → §01 Our reach (counters) → §02 Current work (project ledger, sunk
ground) → §03 Partners → green donate band → green footer. The margin column
carries §01/§02/§03, which is the first time the record-book spread does real
navigational work rather than decoration.

```
 map card ──────────────────────────────
 │ Fig. 1        Districts of operation │  navy rule under the head
 │  ┌────────┐   SELECT A DISTRICT ▾    │
 │  │ Uganda │   ── MOYO ──────────────  │  aside = ledger index
 │  │  135   │   Metu SACCO · FSD Uganda │
 │  │ paths  │   ── GULU ──────────────  │
 │  └────────┘   IWMDP LOT 3 · World Bank│
 │ Boundaries: OCHA COD-AB (2020)        │  attribution, mono
```

**Signature moment.** The map. 135 district paths inline, 48.8KB of path data
(80KB budget), no library, no tiles, no runtime fetch. Two-state flat fill —
green where APSEDEC works, pale ground elsewhere — with a navy hairline on
every boundary held at 0.5px by `vector-effect: non-scaling-stroke`, so the
hairline stays a hairline whether the map renders at 320px or 900px. Hover and
focus fill gold. The tooltip is a field-note annotation: a navy 2px rule with
the district name and project count under it, no bubble, no arrow, no shadow.

**Rejected as default.** A choropleth. The obvious move for "districts where we
work" is a graduated colour ramp with a legend, and it would have been wrong
twice over: the underlying data is binary (APSEDEC either works there or does
not), and a ramp would have pulled four or five more colours into a palette
that is meant to be green, navy and gold. Two flat states, one gold highlight.

**Deviation — keyboard scope.** §7 asks for districts focusable in a logical
order. Only the **14 active districts** are focusable; the other 121 are
`aria-hidden` and inert. 135 tab stops between the map and the rest of the page
would make the page hostile to keyboard users, and the inactive districts have
nothing to announce. Focus order runs north to south (Moyo → Buvuma), which is
also the order the reveal animation uses.

**Deviation — one motion moment.** The map reveal is **off on the home page**
(`reveal={false}`); the counters own the home page's single motion moment. The
reveal ships with the component and switches on for `/where-we-work/` in
Phase 3.

**Data note.** The 2020 OCHA boundaries predate Uganda's city/district splits,
so `Gulu City` is aliased onto the `Gulu` polygon. Aliases are explicit in
`DistrictMap.astro`; anything that fails to match is reported as a build
warning rather than silently dropped.

---

## Phase 1 revision — real coverage, offices, hero photograph

**What was wrong.** The map showed 14 districts against the profile's ~50. The
cause was upstream of the map: only 6 of 15 projects were seeded, so nine
projects' worth of districts — all of Acholi and Lango via PROFIRA, the 15
AVCP districts, Kaabong and Karenga via CRRP — simply had no data behind them.
Fixed by seeding all 15 projects rather than patching a district list, so the
map stays correct as content changes. **48 coverage districts** now, which
matches the profile's "nearly 50 districts" line.

**Coverage is now two sources, not one.** Some districts are green on the
profile's map but belong to no project the profile names (Hoima). A
project-derived map alone cannot represent them without inventing a programme,
so `COVERAGE_ONLY` in `src/config.ts` colours the district and the panel shows
a placeholder where the project list would be. The map tells the truth about
what is known and what is not.

**Offices are now a first-class layer**, matching the profile's own legend:
gold dots ringed in navy, a Coverage/Offices key under the map, an `office`
stamp on the relevant panel rows, and an explicit "Offices" block in the aside.
The home page eyebrow now reads `Offices  Kitgum · Gulu · …` rather than a bare
list of place names that could be read as programme districts.

**Gold on a marker is legal.** §4.1 bars gold from lines, rules and borders —
a dot is none of those, and the ring around it is navy like every other
boundary. The office badge in the panel is navy, not gold: at 9.9px, gold
lands at 4.37:1, just under AA for small text.

**Hero photograph.** A full-bleed documentary band sits between the green hero
and the map card, on a green ground, with a field-report caption below the
frame rather than text laid over the image. The map card now straddles the
photograph's lower edge instead of the hero's — the signature move survives the
new element intact, and will read better against a photograph than it did
against flat green.

**Watch item.** The home page is now 6,182px tall and dark-green bands hold
41%. The page is getting long for a "minimal" home; if Phase 2 adds to it, the
district panel (48 entries, currently capped at 26rem with its own scroll) is
the first thing to move to /where-we-work/.

---

## Phase 1 revision 2 — the map card gets quiet (client corrections)

**One ground, not two.** The map card and the inactive districts were both on
`--paper-raised`, a lighter tint than the page. All three now sit on `--paper`
(`#e7f1e8`) — page ground, card ground and inactive districts are the same
light green, and the country is defined purely by its navy hairlines. The card
still reads as a frame because of its navy border, not because of a fill.

**The aside is now empty until asked.** The offices list under the map is gone
(offices remain as gold markers, the legend, the hero line and the footer), and
the 48-district list no longer sits open. The card shows the map, the select,
and one line: *Select a district on the map to see its projects.*

**How the fallback survives it.** The district list is still fully
server-rendered — the JS **collapses** it on init rather than the server
omitting it. With no JavaScript the list renders in full and the map is never
the only path to the content (§7). This is the right way round: the enhancement
removes, the baseline provides.

**Partners section stripped to the word.** Heading and lede replaced by
"Partners" alone. The margin column already reads `§ 03 Partners`, so the
heading is now a deliberate echo of it rather than a second, chattier label.

---

## Phase 1 revision 3 — the real logo arrives, and the header moves

**What the artwork is.** A seal: two banners of curved text, a Uganda
silhouette with Lake Victoria, and a three-scene roundel (elephant, maize,
a training session). 2209x2080, near square, full colour with alpha. It is
built for letterhead, not for a 44px header.

**So it is a lockup, not a logo-on-its-own.** At header size the banner text is
unreadable, so the emblem carries recognition and the typeset name carries the
reading — the standard treatment for a seal, and the reason the wordmark built
in Phase 0 stays rather than being replaced.

**The header left the hero.** §4.2 bars the colour logo on green and asks for
an all-white variant. That variant cannot be filtered out of this artwork —
flattening it to one colour collapses every scene into a white blob (tested;
the result is unusable). Rather than keep the logo off the home page entirely,
the client chose to put the header on the pale ground on every page. The green
hero now begins below the header bar instead of running up behind it.

**What that cost and bought.** Lost: the transparent-header-over-green move
from the Phase 0 plan, and about a point of dark-green share (41% → 40%).
Gained: the emblem on 100% of pages, one header treatment instead of two, and
no dependency on artwork that does not exist. The map card still straddles the
photograph's lower edge, so the signature composition is untouched.

**Still on the white variant:** the donate band and the footer. Those two keep
the type-only lockup until a redrawn single-colour mark exists.

**Scoping gotcha worth remembering.** `<Image>` renders its own element, so a
scoped rule in the component that uses it never lands — `.logo :global(...)`
was silently dropped and the emblem rendered at its intrinsic 96x90 in a 149px
header. The sizing lives in `base.css` now.

---

## Phase 2 — content pages

**Palette use.** Interior pages inherit the home page's structure: a green
`PageHeader` band under the light header, pale green content, alternating
`--paper-sunk` sections for rhythm, green footer. The green band on every page
is what keeps the site green-led now that most pages are text.

**Type roles.** One addition — a `.prose` scale for rendered Markdown, where
`h3` takes the mono-uppercase treatment used by the margin column rather than
Zilla Slab. Inside a project body, an `h3` is a label ("Scale and reach"), not
a headline, and setting it as one kept the display face for things that earn it.

**Layout concept.** The record-book spread carries every page, with the margin
column numbering sections `§ 01`, `§ 02`, `§ 03`. The ledger row is now the
site's universal list primitive: projects, partners, offices, resources, news,
values, milestones and sector counts are all the same ruled row with different
column templates. That is the whole reason the site reads as one document
rather than eight pages.

**Signature moments per page.** Projects: filters that narrow a ledger in place
rather than a card grid that reflows. What We Do: sector counts drawn as ruled
measures — a green fill on a navy baseline, no axis, no legend, no chart. About:
the vision set large in Zilla Slab on a `--green-800` band, the only place the
display face runs at size outside a page title.

**Rejected as default.** A card grid for projects. Fifteen projects in three
columns of shadowed cards is the reflex, and it would have thrown away the
thing donors actually scan for — period, donor, districts, scale, aligned down
the page in tabular figures. The ledger keeps them aligned; a grid cannot.
Also rejected: a bar chart with axes for the sector counts, for the same
reason the map is not a choropleth.

**Accessibility fix at the token level.** `--gold-deep` was set for large
display figures (4.07:1, fine against the 3:1 large-text floor). Phase 2 used
gold on 18px sector counts and an 11.6px tag, where the floor is 4.5:1 and it
failed on three pages. Rather than patch each use, the token moved to
`#7f621d`, which clears 4.5:1 against all three grounds — so gold is now safe
at any size. All 11 pages audited: zero contrast failures, zero overflow at
360px.

**Deviation — two stubs.** `/where-we-work/` and `/donate/` are Phase 3
deliverables, but both are in the primary nav and the home page links to
donate. Shipping Phase 2 with two 404s in the nav was worse than shipping
honest interim pages, so both exist: Where We Work lists the real coverage and
points at the home map; Donate states plainly that online giving is not open
and gives the direct route.

---

## Phase 3 — Where We Work, Donate, Quick answers

**The reveal finally has a home.** `/where-we-work/` runs the map at
`variant="full" reveal` — active districts post in north-to-south on a 45ms
stagger, once, on first viewport entry, skipped under `prefers-reduced-motion`.
The home page map stays static because the impact counters own that page's one
motion moment (§4.6). Same component, one prop apart; the split decided in
Phase 1 paid off here.

**Region grouping cut, and why.** The district profiles were first grouped by
sub-region, which produced 24 office badges against 11 offices — the bug being
that a project stores the sub-regions it spans but not which of its districts
sit in which, so PROFIRA's "Acholi, Lango" put all 17 districts under both
headings. There is no district-to-sub-region mapping in the 2026 profile, and
building one would have been invention. The page lists all 48 alphabetically
with project counts and office stamps, and says in a footnote why it is not
grouped. A correct flat list beats a tidy wrong hierarchy.

**Donate: gated, not faked.** `DONATIONS_LIVE && FLW_PUBLIC_KEY` gates
everything. Off: the form renders complete but every control is disabled,
checkout.js is not loaded at all, and a "not yet open" panel sits above it
while the direct-transfer section stays live. On: checkout.js loads on this
page only, `tx_ref` is minted client-side as `APSEDEC-{timestamp}-{random}`,
and the public key is the only credential anywhere near the repo.

**The receipt tells the truth.** `/donate/thank-you/` reads `status`, `tx_ref`
and `transaction_id` from the query string and renders one of three states —
receipt, failed, or a plain thank-you when reached directly. The receipt takes
the letterhead treatment (green header, white logo, navy rules, tabular
figures) and prints clean via `@media print`. It never says "verified": the
note states plainly that the page shows what the provider returned in the
browser and that APSEDEC checks each transaction in the dashboard. Noindex.

**Quick answers: no library.** The brief allowed Fuse.js or vanilla; for a bank
of 17 entries a hand-written token-overlap scorer is **529 bytes** against
Fuse's ~6KB, and it is far easier to reason about when an answer looks wrong.
Nothing loads until the panel opens — the bank is fetched from `/faq.json` and
the matcher dynamically imported on first open, so both are 0KB on initial
load. Below the score threshold it says it does not know and links to contact
and resources; it never generates a sentence, only prints bank entries
verbatim.

**Rejected as default.** A chat transcript UI. The reflex for anything with a
text input in the corner is message bubbles, a typing indicator and a fake
persona — all of which would imply a conversation partner that does not exist.
It is a lookup: one ledger-ruled answer, related questions as chips, and a
header that says "Quick answers" with no name and no avatar.

**Contrast bug the audit caught.** On the disabled donate form, the "checked"
rule kept its green fill while the disabled rule overrode only the text colour
— muted grey on green-600 at **1.22:1**. Fixed by having disabled drop the
fill too. Worth remembering: disabled states need checking in every selected
permutation, not just at rest.

---

## Phase 4 — hardening

**Lighthouse, mobile, on the built site: 97–100 across every page**, all four
categories, against a ≥90 budget. `npm run audit` reruns it.

**Five real defects the audit found that my own sweep had missed.** Worth
listing, because each is a class of thing to watch:

1. `--green-300` as muted text is only safe on `--green-900` (5.35:1). On
   `--green-800` it is 4.50 and on `--green-700` it is 3.86. It was used raw in
   ten places. Now every on-brand muted text goes through
   `--text-on-brand-muted`, set to `--green-200`, which clears 4.5:1 on all
   three green grounds — so a band can change shade without silently breaking.
2. `opacity: 0.7` on a navy stamp dropped it to 4.36:1. Faded is not a safe way
   to say "pending"; the dashed border already in the placeholder language is.
3. The district panel's `h3`s followed the page `h1` with no `h2` between —
   a level skip. A visually-hidden `h2` now names the panel.
4. Phone and email links on the contact page were inline text, so their tap
   targets were ~20px on the page whose whole purpose is being contacted.
5. The receipt page rendered the generic panel then swapped it — **0.278 CLS**
   on the one page that most needs to look trustworthy. State is now chosen by
   an inline head script before first paint, so only the right panel is ever
   painted. Its small print also moved up a step: a receipt gets read closely,
   often on a phone, and half its text was under 12px.

**Lesson for the sweep.** My in-browser audit walked computed styles and still
missed these. Lighthouse catches things a naive walker does not: alpha
compositing, tap-target geometry, heading order, layout shift over time. Both
are now documented — the hand sweep for breadth during development, `npm run
audit` before a release.

**OG image — a deviation, stated plainly.** §10 asks for OG images generated at
build with the brand system. The card is generated from the tokens (green
ground, navy ledger rules, paper panel, gold punctuation, the emblem) but
carries **no title text**. sharp renders SVG through librsvg, which ignores
`@font-face` with a data-URI webfont — verified: it falls back to a system
serif. Real type would need a headless browser in CI or a font-to-path step,
both of which add a build dependency the brief caps. Social platforms render
`og:title` and `og:description` as live text beside the image, so the card
carries the brand and the page carries the words. One card, all pages;
per-page cards are available if the client wants the extra machinery.

**Rejected as default.** A "Powered by" or build-badge footer, and an
auto-generated humans.txt. Neither serves a donor programme officer.

---

---

## Phase 1 corrections — sources for every fact added

**Document hierarchy** (set by the client in `docs/README.md`).
`APSEDEC PROFILE 2026.pdf` is the sole authority for current facts, totals and
reach figures. `Annual Report 2019 Updated.docx` supplies supplementary
narrative, activity detail and photographs only — never a headline figure.
Source documents are internal references: every mention of them was stripped
from public-facing copy in this pass (partners lede, project records, contact
and about notes, the district map footnote and the funders FAQ).

Page numbers below are the profile's own printed page numbers.

| Fact now on the site | Source |
| --- | --- |
| Established June 1999 as a project under the Government of Uganda and UNDP Country Cooperation Framework (CCF I) | Profile p.1 |
| Formerly Kitgum Private Sector Promotion Centre | Profile p.1 |
| Registered June 2004, Company Limited by Guarantee, Reg. No. 62106 | Profile p.1 |
| Board elected from a membership of 26 private-, public- and civil-society organisations | Profile p.1 |
| Vision and mission wording | Profile p.1 |
| Core value *names* (Mutual Respect, Accountability, Team Work, Professionalism, God Fearing) | Profile p.1 |
| Core value *descriptions* (the sentence under each tile) | Annual report 2019/2020, "Core Values" — supplementary narrative, permitted by the hierarchy |
| Chair Mr. Ogwang Daniel Abwa; CEO Mr. Nelson Tasenga | Profile p.9 |
| Organogram tree — every box and every reporting line | Profile p.9 |
| DREAMS is a CARE International / Gates Foundation programme (MoFPED is a programme partner, not the funder) | Profile p.6 |
| Head-office and field-office phone numbers | Profile p.1 and p.9 |
| Practice-area descriptions | Composed from the service and project descriptions on Profile pp.1, 3–8 |

**UNDP recorded as founding partner, not donor.** The profile lists UNDP inside
its "Major donors & partners" line (p.2), but p.1 states the actual
relationship: APSEDEC was *established as a project under* the GoU/UNDP CCF I.
The partners collection grew a fourth type, `founding`, and the partners page
leads with it. The distinction is the client's, and p.1 supports it.

**UNHCR removed — a client correction that overrides the profile.** UNHCR *is*
named in the profile's donors and partners line (p.2). The client states this is
wrong, so the partner record and its logo are deleted and the funders FAQ no
longer lists it. Recording it here because it is the one place on the site where
the profile was overruled rather than followed; if the profile is ever treated
as authoritative again by a future editor, this entry is the reason not to
re-add UNHCR.

**"18+ funders" is prescribed, not counted.** The partners lede is the client's
exact wording. It is deliberately not derived from `partners.length` — the
collection holds 18 records today, but the copy must not silently change when a
partner file is added or removed.

### Reading the organogram off the PDF

The chart on p.9 is vector-drawn, so the labels came out as text and the
reporting lines as path segments. The tree was reconstructed from the connector
geometry rather than from how the boxes line up visually, and the two disagree:
the support roles (transport & logistics, office assistants, office cleaners,
compound attendants) sit in the columns under the Microfinance, Business
Development and M&E specialists, but the actual connector runs from the
**Admin. Assistant** down to a horizontal bus feeding all four. Reading the
columns would have invented four reporting lines that do not exist. The
Advisory Committee joins the CEO laterally, not from above, and is drawn and
captioned that way.

### Interim imagery

Partner logos for RTI, TechnoServe, World Education/Bantwana and UKaid, and
five field photographs, were recovered from the 2019/2020 annual report. They
are **placeholders**: low resolution, and capped at their own natural width so
none is ever upscaled (`emitWidth()` in `PartnerBar.astro`). A signature image
and the Uganda coat of arms were found in the same document and deliberately
not used — a personal signature is not a site asset.

### Departures worth flagging

- **Gradients.** The standing rule is "no gradients anywhere" — unchanged by
  the shadow amendment. The pattern gallery at `/design/patterns/` is built
  entirely from gradient syntax used to draw hairlines and dots at a flat tint.
  Flagged for the client rather than assumed; the rule as written would rule it
  out.
- **Header.** The band is sticky on every page and sits on `--green-950`, one
  step below the `--green-900` used by the hero and the page headers, so it
  reads as a layer above the page rather than continuous with it (1.21:1
  against green-900 — visible as a change of plane, short of a stripe). The
  `headerOnBrand` prop is gone — there is no longer a transparent state.
- **Full-colour emblem on dark green.** At header size the seal's curved banner
  text is not legible, which is why the emblem is paired with the typeset
  lockup rather than carrying the wording. A vector source would let the mark
  be simplified for small sizes; the client does not have one.
