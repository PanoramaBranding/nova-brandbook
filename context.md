# Project Context — Nova Brand Book

A record of how this site was designed, built, deployed, and the decisions made
along the way — so a future session (or Sofia) can pick this up cold. Last
updated: 2026-09-11 (Round 17 — planned and executed the AI-readable layer
(`/llms.txt`, `/brand.json`, JSON-LD) for the first time; confirmed
GitHub→Vercel auto-deploy is genuinely working (a real git push now
auto-builds and auto-promotes to production, verified across 4 pushes this
round — the project-level link was already there, `vercel project inspect`
just doesn't surface it); rebuilt the mobile menu to Sofia's own design
(unfold-down panel, logo swap, hamburger→X morph); fixed the Round 16
typography-overflow bug and a real Assets 3.8/3.9 photo-layout mismatch
(uniform 3-col grid vs. Figma's actual bespoke per-gallery rows). See
Round 17 below for full detail. Round 16 found the Round 15 hero-spacing fix
never actually worked: a real Chromium `display:contents`+`<source>` bug was
still pushing every page hero's top-bar text down by ~1/3 of the hero's
height, caught only by pixel-measuring the live site instead of trusting a
screenshot glance. Round 15 found and fixed 4 real code bugs from a fresh
Sofia complaint list, incl. a hero text-ghosting bug only found after setting
up real screenshot verification (`screenshot.mjs`).

## What this is

A "living" brand manual for NovaVenta (Panorama Branding client), built as a
web app instead of a PDF — HTML semántico + metadata estructurada, pensado
para que tanto personas como modelos de IA lo lean con la misma claridad.
Also intended as the base of a **reusable design system for Panorama** —
components should stay generic; Nova-specific content lives in data/page
files, not baked into components.

## Where it lives (production setup)

- **Live site:** https://nova-brandbook-nine.vercel.app (production alias —
  `nova-brandbook.vercel.app` was NOT available because that exact subdomain
  is already claimed by the old/wrong project below; Vercel subdomains are
  global, not per-account)
- **Code:** https://github.com/soysoff/nova-brandbook (private repo, branch
  `main`) — collaborator `PanoramaBranding` (Andrés) added with read access
  2026-09-02 for a security review; invitation was still pending as of
  2026-09-09 (couldn't re-check — `gh` CLI wasn't available in that session).
- **Hosting: Vercel — project `nova-brandbook`, team `panoramabranding`**
  (`orgId team_K4w2qFAFBeBqEM5USq1rtLIm`), logged in as
  **sofia@panoramabranding.co**.
  ⚠️ **History/gotcha (2026-09-09):** for the first week, every deploy went
  to project `nova-brandbook` under team `sofias-projects-6186c25c` — Sofia's
  **personal** Vercel account (`soysostudio`, the same one used for her
  portfolio project), because that was whatever the CLI already had cached,
  and nobody checked which account it was until Sofia noticed the project
  didn't show up in her Panorama account. Every deploy in that account also
  got permanently stuck in `UNKNOWN` status and never finished building
  (only the very first one ever completed) — almost certainly a limit on
  that personal account's plan. Fixed by `vercel login sofia@panoramabranding.co`
  (device-flow login, completes once she approves it in the browser it opens),
  then deleting `.vercel/` and redeploying with `--scope panoramabranding`,
  which created a **fresh project** and built successfully in ~23s with no
  stuck-queue issue at all. **The old project/URLs under
  `sofias-projects-6186c25c` are dead weight now — not deleted, just
  abandoned.** If anyone goes looking for this site and finds a
  `nova-brandbook-*.vercel.app` URL that looks stale or won't load, that's
  why; the current one is `nova-brandbook-nine.vercel.app`.
- **Auto-deploy: CONFIRMED WORKING (2026-09-11, Round 17).** Previously
  documented as "NOT connected" based on `vercel project inspect` showing no
  "Git Repository" section — that turned out to be a red herring: `vercel
  project inspect`'s output in this CLI version just doesn't surface the git
  link at all, connected or not. `npx vercel@latest git connect --scope
  panoramabranding` reported "soysoff/nova-brandbook is already connected to
  your project", and a real `git push origin main` immediately triggered an
  automatic Production deployment (confirmed via `vercel ls`, no manual
  `vercel --prod` involved) that auto-promoted to the
  `nova-brandbook-nine.vercel.app` alias on its own — repeated successfully
  across all 4 pushes this round. **`npx vercel@latest --prod` is no longer
  needed for a normal code change** — `git push origin main` alone deploys.
  Keep the manual command as a fallback only (e.g. if a push ever doesn't
  trigger a build).
- **Deploy workflow (current):**
  ```bash
  git add -A && git commit -m "..." && git push origin main
  # auto-deploys — check status with:
  npx vercel@latest ls nova-brandbook --scope panoramabranding
  ```
  Manual fallback, if a push ever doesn't auto-deploy:
  ```bash
  npx vercel@latest --prod --yes --scope panoramabranding
  ```
- **Git identity (local repo only):** Sofia Suarez / sofia@panoramabranding.co
  — set via `git config user.name`/`user.email` in this repo, not globally.
  ⚠️ Not yet confirmed whether this email is verified on the `soysoff` GitHub
  account — matters once auto-deploy is connected (Vercel checks commit
  author email against the GitHub account; this exact issue silently blocked
  deploys once before on the portfolio project).

## Source of truth (Figma)

- **Use this file:** `https://www.figma.com/design/UDHz26k3eXAPVtSqav0GGi/...`
  (fileKey `UDHz26k3eXAPVtSqav0GGi`) — a copy Sofia made in her own Pro-tier
  team specifically to get around the MCP call limit (see below).
- **Do NOT use** fileKey `N55zKD9GQSbKa9hkHE2aq4` (the original) — it lives in
  a Figma **Starter plan** team and hit the MCP tool-call limit mid-session.
  If the copy ever also gets rate-limited, that's the same underlying
  Starter-plan limit; ask Sofia whether to upgrade the plan or wait for reset.
- **Figma MCP account:** connected as `diseno@panoramabranding.co`. If it
  ever errors with "no edit access", the connector reverted to the wrong
  account — reconnect it from Claude's connector settings.
- Key node IDs (in the copy file):
  - Home: `1:2` · Estrategia: `509:912` · Master Brand: `99:283` · Assets: `214:273`
  - Shared components live under section "Componentes" (`552:2735`): `Menu v1`
    (`528:286`), `Boton` (`543:672`), `Hero`/`Hero 2`/`Hero 3` (page headers),
    `Footer` variants.
  - Section "Archivo" (`543:1131`) = stale duplicate/old versions. Ignore.
  - "04 DESIGN SYSTEM" — **brought into scope 2026-09-09 (Round 11), built
    and shipped as `/aplicaciones` in Round 12 the same day.** Desktop
    content node `2045:602`, mobile content node `2045:603` ("04 design
    system - mobile" — newly added by the design team, confirming Sofia's
    claim it was "ya lista" for mobile), desktop hero `2046:928`, mobile
    hero `2045:606`, quote `578:4208`. Single section "4.1 Aplicaciones
    master brand", 19 mockup images (Nova_Caja ×2, [NOVAVENTA]-CAJA2,
    PORTADA2, DOBLEPAGINA1 ×2, NEWSPAPER, REDESSOCIALES ×2, WEBPAGE ×2,
    APPMOBILE ×2, ICONAPP, PANTALLA1, BILLBOARD ×4), same 19 files reused
    at different responsive arrangements/aspect ratios (confirmed via MD5
    — desktop and mobile fetches export byte-identical images, just
    different asset IDs). "05 SUBMARCA" remains **out of scope** — only
    `04` was confirmed, don't assume `05` follows.

## Decisions confirmed with Sofia

1. **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed
   on Vercel.
2. **Reusable system:** components (`src/components/`) stay generic; Nova
   content lives in `src/lib/` data and each page's own file.
3. **Scope:** Home, Estrategia (`01`), Master Brand (`02`), Assets (`03`),
   and — as of 2026-09-09, Round 11 — **`04` "Design System" is now in
   scope too**, including its mobile version (Sofia confirmed explicitly
   after this had been out of scope since the project started). `05`
   "Submarca" is **still out of scope** — only `04` was brought in; don't
   assume `05` follows automatically without asking separately.
4. **Azul I = `#2B7DF6`** (the documented value in Figma's 3.1 palette page),
   **not** `#007EFA` (the value baked into Figma's Variables/components,
   which is stale). Use `#2B7DF6` everywhere "Azul I" appears.
5. **Typography:** Plus Jakarta Sans — Google Fonts, free license, no
   self-hosting needed.
6. **AI-readable layer:** full stack — semantic HTML + JSON-LD (schema.org)
   + a `llms.txt`/`brand.json` file with the brand tokens in plain text.
   **Not built yet** — next up.
7. ~~Mobile nav: Figma has no mobile design for the nav at all~~ —
   **wrong, corrected in Round 10.** Figma does have it: node `2045:921`,
   a bare hamburger icon with no bar/background/logo. Missed it in the
   earlier search (checked the mobile page frames and the "Componentes"
   section, not this specific standalone node) and built a full-width
   `sticky` bar with a logo instead, which turned out to push the Hero's
   own content down by the bar's height — Sofia caught this. Rebuilt to
   match: a `fixed` (not `sticky`) floating hamburger button, no bar.
8. **Photography AI-generation prompts** ("Prompt Maestro"/"Negative Prompt"
   in Figma's 3.8 section): included publicly on the site — Sofia's explicit
   call, not treated as internal-only.
9. **Assets page has no mobile design** in Figma (confirmed, not a gap).
10. **Estrategia keeps the "4 Why / Visión" stage visible on mobile** even
    though Figma's real mobile frame (`529:1613`) omits it entirely (jumps
    straight from "3 What" to "5 How"). Asked Sofia 2026-09-09 whether to
    match Figma exactly (drop it) or keep it for content completeness — she
    chose to keep it, judging the gap a mobile-mockup oversight rather than
    an intentional cut. See memory `estrategia-mobile-vision-scope` for
    detail. Don't "fix" this again without re-confirming with her.
11. **Master Brand's "Contenidos" TOC block was added despite duplicating
    the sidebar nav.** Figma's desktop node has a full table-of-contents
    block mid-page (title + all 14 subsection links + a download button)
    that repeats what the persistent sidebar (`Nav.tsx`) already shows.
    Asked Sofia 2026-09-09 whether to build it anyway or treat it as
    redundant — she chose full fidelity to Figma, so it's built. If a
    similar duplicate-content question comes up on another page, don't
    assume the same answer applies — ask again.

## Design tokens (`src/app/globals.css`)

- **Principal:** Azul I `#2B7DF6`
- **Secundarios:** Azul II `#0C67C1` · Azul III `#08335E` · Azul IV `#9CCEFF`
  · a 5th light tint `#DCEFFF` (mislabeled "Azul I" in Figma — content bug,
  see below)
- **Complementarios:** Bienestar `#E397CA` · Hogar `#E85242` · Mascotas
  `#F09837` · Niños `#FCF18E` · Despensa `#76B156` · Aseo Hogar `#4184F5` ·
  Personal Care `#BE8FF7` · HotDays `#2B7DF6`
- **Neutros:** Blanco `#FFFFFF` · Gris 5% `#F6F6F6` (`bg-gris-5`, used on the
  inner-page footer)
- All exposed as Tailwind utilities via `@theme` in `globals.css` (e.g.
  `bg-azul-1`, `text-azul-2`) — never hardcode hex in components.

## Known content bugs in Figma (real, in the source file — not our doing)

Flag these for the design team; our code already works around them correctly,
so don't "fix" them by changing our code without checking Figma first:

1. **Duplicate "Azul I" naming** — the light tint (`#DCEFFF`) is labeled
   "Azul I" in Figma too, same as the principal color.
2. **Estrategia's 4th stage** ("Why") has its on-page heading text still
   saying `"3 What - Reasons to believe & brand Role"` (duplicate of stage
   3) instead of `"4 Why - Why the brand exists"`. The actual content is
   correct (Visión: "Acompañamos la vida"). Our code uses the correct
   number/label; only Figma's heading layer is wrong.
3. **"Where" and "Who" stage subtitles** both read "Assessing the
   landscape" verbatim — likely an uncorrected copy-paste.
4. **Numbering drift**: on-page section headings sometimes disagree with
   the TOC/nav numbering by one — e.g. a heading says `"3.5 Jerarquías"`
   when the TOC says `3.6`; the icon section heading says `"3.9 Sistema
   Iconográfico"` twice when the TOC says `3.10`. We always follow the
   TOC/nav numbering as the source of truth.
5. **Icon section (3.9/3.10) is split across two separate, sequential
   Figma frames** (`578:4002` and `578:4017`) that both repeat the same
   title + description text. We merged the images from both into one
   section in code (title/description shown once).
6. **"Brand Boook Guidelines" (extra "o") is Figma's actual, consistent
   text** in every single Hero instance across the whole file — Home
   desktop (`528:1264`), Home mobile (`528:1244`), and every inner-page
   Hero (Estrategia/Master Brand mobile at least, likely all). Confirmed
   2026-09-09 by fetching multiple Hero nodes directly — not a one-off
   mobile typo, it's baked into the shared Hero component itself. We use
   the corrected spelling ("Brand Book Guidelines") site-wide instead —
   this was already the case for `PageHero.tsx` from an earlier session,
   applied to Home's hero too in Round 7 for consistency. Flag for design
   to fix in the source; don't silently follow their example elsewhere.

## File map

```
src/app/
  layout.tsx           root layout: fonts, <Nav/>, flex row (col on mobile),
                        Organization/WebSite JSON-LD (Round 17)
  globals.css          design tokens (Tailwind v4 @theme)
  page.tsx             Home
  estrategia/page.tsx  01 · Estrategia de marca (Brand Tree)
  master-brand/page.tsx  02 · Master Brand
  assets/page.tsx      03 · Brand Assets
  aplicaciones/page.tsx  04 · Aplicaciones de marca
  submarca/page.tsx    05 · Sub-marcas
  brand.json/route.ts  machine-readable brand tokens (Round 17) — reads
                        src/lib/brand-data.ts + nav-data.ts, not a static file
  llms.txt/route.ts    llms.txt-convention plain-text index (Round 17) — same
                        source data, generated so it can't drift from the
                        real sitemap
src/components/
  Nav.tsx              sticky sidebar (desktop) + floating hamburger button
                        + full-screen panel (mobile, `fixed` not `sticky`
                        so it adds no layout height above the Hero); null
                        entirely on Home; accordion by route with a
                        rotating chevron + grid-rows animation + scroll-spy
                        (position-based, not IntersectionObserver — see
                        Known quirks)
  PageHero.tsx          page header: real visible <h1> (number + 2-line
                        title) over a background image via <picture>, with a
                        different crop per breakpoint — a single H1 in the
                        DOM, not duplicated markup toggled by CSS;
                        `h-svh`/`h-screen` so it fills the viewport on load
  Footer.tsx            shared footer, both pages' variants + both
                        breakpoints (see "Decisions confirmed with Sofia")
  Button.tsx            Figma "Boton" — outline/filled variants, hover
                        matches the confirmed "Variante 2" filled state
  HeroMark.tsx           Home's composited NovaVenta lockup (9 SVG
                        fragments, object-contain — see Known quirks)
  ScrollReveal.tsx       mounted once in the root layout; fades/slides in
                        each page's sections below the hero on scroll
  ContentsToc.tsx        mid-page "Contenidos" TOC block (Master Brand,
                        Assets) — duplicates the sidebar nav on purpose,
                        see the component's own doc comment for why
src/lib/nav-data.ts     sitemap data: page slugs/labels + anchor ids per page
src/lib/brand-data.ts   color/typography tokens + known Figma content-bug
                        list (Round 17) — single source for assets/page.tsx,
                        /brand.json, and /llms.txt
public/brand/           downloaded Figma assets, one subfolder per page/use
  home/ estrategia/ master-brand/ assets/ heroes/
```

## Known quirks (intentional, don't "fix")

- **`PageHero` renders a real `<h1>` over a background image, not baked-in
  text** (fixed 2026-09-09 — Sofia flagged the original screenshot-render
  approach as wrong: it had Figma's own title text baked into the image
  pixels instead of being real, readable markup). All 4 heroes now use
  clean background-only exports (no text baked in) on both breakpoints.
  ⚠️ **Correction (same day, later):** an earlier version of this note
  claimed Estrategia's photo had a "persistent, confirmed" raw-export bug
  requiring a screenshot+scrim workaround. That was wrong — a fresh
  `get_design_context` fetch later the same session returned the correct
  clean photo on both breakpoints with no issue at all. The apparent
  "blank export" was never re-verified with a second fresh fetch before
  being written down as persistent; don't repeat that mistake — if a raw
  asset export looks broken, retry with a brand-new `get_design_context`
  call (not a cached one) before concluding it's a real, lasting bug.
  The `scrim` prop has been removed from `PageHero` entirely.
- **Nav scroll-spy is scroll-position based, not IntersectionObserver.**
  First version used an IntersectionObserver with a thin `rootMargin` band;
  it lost track on long sections (6+ items) because the band could exit the
  active section before entering the next one. Replaced with a
  `getBoundingClientRect` + `requestAnimationFrame` check against a fixed
  160px trigger line — correct for sections of any length.
- **Typography display sizes were scaled down from the literal Figma px.**
  A few decorative/display sizes in Figma are enormous for a fixed
  1440px canvas (e.g. H1 160px, the type specimen at 128px, page-hero
  numbers at 96px). Where using the literal px would overflow real
  viewports, we picked a smaller `md:` value and noted it — these are
  judgment calls, not exact, and worth a design pass if precision matters.
- **Screenshot tool flakiness during verification:** the Browser pane's
  `computer` screenshot action repeatedly rendered blank/truncated pages
  that were provably fine via `getBoundingClientRect`/`scrollHeight` checks
  — especially right after `resize_window` to a custom size, or during
  heavy Next.js Fast Refresh activity. Not a real bug; if a screenshot looks
  broken, re-check with JS before assuming the page is actually broken.

## Pending / open follow-ups (pick up here tomorrow)

0. ~~Verify Andrés accepted the GitHub collaborator invite~~ — **confirmed
   2026-09-11 (Round 17):** `gh` is now available in this environment (unlike
   every prior session). `gh api repos/soysoff/nova-brandbook/collaborators`
   shows `PanoramaBranding` as a real collaborator (pull:true/push:false/
   admin:false) — the invite was accepted, and `gh api
   .../invitations` returns empty (nothing pending).
0b. **GitHub account email vs. Vercel/git identity** — still not checked;
   `gh`'s own token doesn't expose another account's private email. Sofia
   still needs to check `github.com/settings/emails` herself to confirm the
   `soysoff` GitHub account's verified email matches
   `sofia@panoramabranding.co`. Lower priority now that auto-deploy is
   confirmed working without this being checked — only matters if deploys
   start silently failing on a commit-author mismatch.
1. ~~Master Brand — needs the same rigorous re-audit Assets just got~~ —
   **done in Round 7:** fetched `get_design_context` fresh on both the
   mobile frame (`543:519`) and the desktop node (`99:283`). Desktop turned
   out to have two **entire sections missing**, not just style drift — a
   "Quote" block (same pattern as Estrategia's, different text) and a full
   "Contenidos" table-of-contents block (title + 14 subsection links in two
   columns + a "Descargar assets" button) that duplicates the sidebar
   nav's own list. Added both; the Contenidos block was confirmed with
   Sofia first since it's a deliberate duplication of existing nav, not a
   style fix. Also fixed `SectionHeading`'s title column width (300px in
   code vs. Figma's consistent 447px across all 14 subsections — confirmed
   by the fact that 447+127(gap)+561(body) exactly matches the page's
   established 1135px content width, 300px doesn't). The shared `Button`
   component was checked too — already pixel-perfect against the "Boton"
   spec, no change needed.
2. ~~Assets 3.8/3.9 — photography reference images still pending~~ —
   **resolved in Round 9.** The "still pending" note was wrong: a fresh
   `get_design_context` fetch on both sections' real nodes (`574:3575`,
   `578:3976`) found ~30 real reference photos already in Figma (lifestyle
   familiar/individual/mascotas, producto en contexto, render 3D, usos
   incorrectos) — they were never actually missing, just never fetched
   directly. Sofia confirmed downloading everything and rebuilding both
   sections (asked before touching it, given the scope). All ~30 photos
   now live in `public/brand/assets/foto/`; Prompt Maestro / Negative
   Prompt render as Figma's real always-visible bordered boxes
   (`border border-azul-1 rounded-[15px]`), not the collapsible
   `<details>` used before. ~~The photo grid layout is a faithful-but-
   simplified stand-in for Figma's specific per-photo crops... flag for a
   closer look if the grid arrangement itself... ever needs to match more
   exactly~~ — **the grid arrangement itself was fixed in Round 17**: see
   Round 17 below (`PhotoRow`/`PhotoRows` replacing the uniform 3-col
   `PhotoGrid` for the galleries that aren't actually uniform in Figma).
   Per-photo exact crop-zoom insets are still not attempted — that
   narrower gap remains open.

   Separately, **Assets had the same missing-sections bug as Master
   Brand** — fetched its desktop node directly in Round 7 and found the
   same "Quote" block + "Contenidos" TOC block absent (Figma nodes
   `551:2733` and `553:2736`). Added both. Since the TOC pattern now
   appears on two pages with identical structure, it's extracted into
   `src/components/ContentsToc.tsx` — Master Brand was refactored to use
   it too instead of its inline copy. Estrategia does
   *not* have this block in Figma (confirmed directly), so don't add it
   there. The rest of Assets' body (3.1–3.13) got a full fresh
   `get_design_context` pass in Round 9 (see below) — this superseded the
   Round 5 audit, which had only checked copy content, not layout
   structure.
3. ~~`llms.txt` / `brand.json` / JSON-LD~~ — **built in Round 17.** See
   Round 17 below and "Where it lives" — `/llms.txt` and `/brand.json` are
   route handlers (not static `public/` files) generated from
   `src/lib/brand-data.ts` and `nav-data.ts`, plus Organization/WebSite
   JSON-LD in `layout.tsx`.
4. ~~GitHub↔Vercel auto-deploy not connected~~ — **confirmed actually
   working in Round 17** (see "Where it lives" for the full story — it was
   a `vercel project inspect` display gap, not a real disconnection).
5. ~~Mobile responsive pass — only spot-checked~~ — **substantially done in
   Round 7:** Home, Estrategia, and Master Brand were all audited directly
   against their real Figma mobile frames (not just CSS breakpoints assumed
   correct) and every hero now art-directs a real per-breakpoint crop.
   Assets confirmed (again) to have no mobile design in Figma. Master
   Brand's desktop was also re-verified this round (see item 1). Still
   open: a final round of visual comparison in an actual mobile browser
   (this session only had `curl`+HTML-parse + Figma screenshots to verify
   against, no live browser) is worth doing before calling mobile fully
   signed off.
6. ~~Home page — built earliest and least rigorously re-verified~~ —
   **done in Round 7:** fetched both the desktop hero (`528:1264`) and
   the full mobile frame (`528:1244`) directly. This turned out to have
   the most real mismatches of any page audited so far, **including a
   wrong desktop value** (the hero's title-bar-to-wordmark gap was 106px
   in code, Figma's real spec is 426px) — confirms this page really had
   never been checked against `get_design_context` properly. See Round 7
   below for the full list (hero reflow, `HeroMark` aspect ratio, Index
   section padding/gaps). The footer and "Bienvenida" copy block were not
   re-audited beyond the mobile padding fix — worth a look if more
   mismatches turn up.
7. Sofia may still be finding mismatches — this list is what's *known*
   pending, not a guarantee everything else is pixel-perfect.

## How it was built (process, so the next session can move fast)

1. Read Figma via the MCP: `get_metadata` for structure, `get_design_context`
   per node for exact code/colors/copy + a screenshot, `get_screenshot` when
   the image-fill export was unreliable. **Always** call
   `get_design_context` before building a section — cached text/metadata
   alone is not enough (this is exactly what went wrong the first time
   through Assets — see QA rounds below).
2. Download every image referenced in a `get_design_context` response
   immediately into `public/brand/<page>/` — Figma's exported asset URLs
   expire in ~7 days.
3. Build the section, then verify in the Browser pane against the same
   `get_design_context` screenshot (not just eyeballing "looks plausible").
4. Typecheck (`npx tsc --noEmit`) before every commit.

## Running locally

```bash
npm run dev            # → http://localhost:3000 (or via the Browser pane's preview_start)
npx tsc --noEmit -p tsconfig.json   # typecheck
```

## QA rounds so far (chronological, condensed — see git log for full commit messages)

1. **Round 1:** Hero backgrounds were flat color, should be real photos
   (family dinner / Nova mark zoom / palette bars). Fixed via
   `get_screenshot` renders (see Known quirks).
2. **Round 2:** Section titles ("2.2 Identificador") were split into a
   small number + separately-styled title; real Figma has them as one
   32px Bold Azul II line. Fixed across all 3 inner pages.
3. **Round 3:** Estrategia's "Brand Tree" was plain stacked text; it's
   actually 96px stage headings + a real flowchart diagram at the end
   (`Diagrama 1`). Rebuilt, diagram image added.
4. **Round 4:** Footer was missing entirely from the 3 inner pages (only
   built for Home). Added.
5. **Round 5:** Full `get_design_context` audit of Assets found 6 sections
   built on cached-text guesses instead of the real spec (3.3, 3.5, 3.6,
   3.7, 3.9/3.10, 3.12) — see "Known content bugs" and commit `b878a09` for
   detail. All fixed.

Pattern across every round: **sections built from cached text/metadata
without a direct `get_design_context` call were the ones that turned out
wrong.** Trust that tool's output over any assumption, however reasonable it
seems.

6. **Round 6 (2026-09-09, a week later):** the deploy itself was wrong, not
   the content. Sofia noticed the Vercel project wasn't showing up in her
   Panorama account — every deploy for a full week had been going to (and
   getting permanently stuck in) her personal Vercel account instead. Fixed
   by logging into `sofia@panoramabranding.co` and recreating the project
   under the `panoramabranding` team — see "Where it lives" for the full
   story and the new live URL. Lesson: **when a hosting/account action is
   about to run, confirm which account is actually authenticated
   (`vercel whoami` / `vercel teams ls`) instead of trusting whatever the
   CLI already had cached** — this is the same class of mistake as the
   Figma-account and GitHub-account mixups earlier in the project, just not
   caught until a week of dead deploys had piled up.

7. **Round 7 (2026-09-09, same day):** Sofia asked for three things at once —
   confirm GitHub uses her Panorama email (blocked, see Pending 0b), redo a
   pixel-perfect pass on everything in Figma's "ready for dev" file
   including mobile, and fix the page heroes so they're a real `<h1>` over a
   background image instead of text baked into the image pixels.
   - **Heroes rebuilt:** `PageHero.tsx` now renders one real `<h1>` (not two
     copies toggled by CSS) with a `<picture>`/`<source media>` swap for a
     different image crop per breakpoint. Master Brand and Assets got clean
     background-only exports; Estrategia initially seemed to need a
     screenshot+scrim workaround for a supposedly "persistent" raw-export
     bug, but Sofia caught that the result still looked wrong (baked-in
     text visible), which prompted a fresh re-fetch later this same
     session that returned the correct clean photo with no bug at all —
     see Round 8 below.
   - **Master Brand mobile audit:** fetched `get_design_context` on node
     `543:519` ("02 Mater Brand - Mobile") directly. Fixed: `SectionHeading`
     h2 24px→28px, its title→body gap 16px→32px, the misuse grids (2.9/2.14)
     were 2 columns on mobile when Figma stacks them 1-column (also fixed
     their label text 14px→16px), and the 2.8 sub-brand blocks' gaps
     16px→32px (including a "Marcas de nombre corto" subtitle that had only
     a 4px margin instead of a real 32px gap).
   - **Estrategia mobile audit:** fetched `get_design_context` on node
     `529:1613` in full. Fixed: "1.1 Brand Tree" title→body gap 24px→32px,
     stage `<h3>` line-height 1.04→1.2 on mobile (1.04 kept on desktop), and
     item rows' number→content/title→body gaps 12px→18px/24px. Also
     confirmed the mobile Brand Tree diagram is the exact same asset already
     used on desktop (same file, same aspect ratio) — no separate mobile
     crop exists, so no change needed there. Discovered Figma's mobile frame
     omits the "4 Why / Visión" stage entirely — see "Decisions confirmed
     with Sofia" #10 for how that was resolved.
   - **Estrategia desktop audit:** fetched `get_design_context` on the
     desktop node (`509:912`) too, later in this same round. Found the
     Quote block was 36px/medium in code vs. Figma's real 52px/bold (the
     same size used by Master Brand's and Assets' quotes, confirming this
     is one shared "Quote" pattern this page's copy had drifted from), plus
     a wrong container max-width (900px vs. the real ~676px for this page's
     shorter quote text). Also fixed the "1.1 Brand Tree" title column
     (300px vs. the confirmed 447px used everywhere else on this page and
     on Master Brand/Assets). Confirmed no "Contenidos" TOC block exists in
     Estrategia's Figma desktop node either — nothing missing there.
   - **Home page audit:** fetched the desktop hero (`528:1264`) and the full
     mobile frame (`528:1244`) directly — this page had the most real
     mismatches of any page this round, **including one on desktop**: the
     hero's title-bar-to-wordmark gap was 106px in code, Figma's actual
     spec is a fixed 426px on a 929px-tall frame (proof this page really
     hadn't been checked against `get_design_context` before). Fixed: the
     hero's mobile reflow (390:844 full-bleed frame with `justify-between`,
     top bar regrouping from "Nova+BBG / 2026" to "BBG alone / Nova+2026"
     paired — a genuine content reflow, not just re-wrapping), `HeroMark`'s
     aspect ratio (was a single 1440/415 at every breakpoint, Figma's
     mobile crop is 388/118), Bienvenida/Index mobile padding (24px/48px
     code vs. Figma's 16px/64px, and Index was missing top padding
     entirely), and several Index list gaps (120px between page blocks vs.
     64px, 32px heading-to-list vs. 16px, 48px between Assets' grouped
     sections vs. 32px, 10px number-to-label vs. 16px) plus a missing
     `font-semibold` on group headings. Also confirmed "Brand Boook
     Guidelines" (extra "o") is Figma's real text everywhere, not a mobile
     one-off — see "Known content bugs" #6.
   - **GitHub email check:** still blocked — `gh`/`brew` unavailable, same as
     the prior session. Not a new finding, just re-confirmed.
   - Pattern holds again: every mismatch found this round was in a mobile
     layout that had only ever been *assumed* to inherit correctly from the
     desktop-first responsive classes, never checked against Figma's actual
     mobile frame. Same lesson as Round 5, just for breakpoints instead of
     whole sections — and Home's desktop hero gap shows the lesson applies
     to desktop values too whenever a section was never actually verified.
   - **Master Brand desktop audit:** fetched `get_design_context` on node
     `99:283` directly. Found two **entire sections missing from the page**,
     not just style drift: a "Quote" block between the hero and the first
     subsection (same pattern already used on Estrategia, just with Master
     Brand's own text — and this text was actually visible in the mobile
     fetch earlier in this same round too, so it should have been caught
     then), and a full "Contenidos" table-of-contents block (title + all 14
     subsection links in two columns on desktop/one on mobile + a
     "Descargar assets" button). Confirmed with Sofia before building the
     Contenidos block specifically, since it deliberately duplicates the
     sidebar nav's own list — see "Decisions confirmed with Sofia" #11.
     Also fixed `SectionHeading`'s title column width: every one of the 14
     subsections reports `w-[447px]` in Figma, not the `300px` in code —
     confirmed by the fact that 447+127(gap)+561(body) exactly matches the
     page's established 1135px content width, 300px doesn't.

8. **Round 8 (2026-09-09, later same day):** Sofia looked at the deployed
   Round 7 result and said the heroes still looked wrong, buttons were
   inconsistent, the sidebar logo wasn't centered, and footers didn't match
   across pages/breakpoints. Re-verified each directly instead of guessing:
   - **Estrategia's "persistent" hero bug wasn't real.** A brand-new
     `get_design_context` fetch (not a retry with the same stale approach)
     returned the correct clean family-dinner photo on both breakpoints,
     no blank export, no bug. The Round 7 diagnosis was wrong — see the
     correction note in "Known quirks". Swapped in the real photos, deleted
     the `scrim` prop from `PageHero` entirely.
   - **Assets' hero background was the right file, wrong orientation.**
     Comparing the raw export against Hero 3's screenshot side by side
     showed horizontal color bands where Figma has vertical ones —
     rotating the downloaded PNG -90° produced an exact match. Not an
     MCP bug, just a fill rotation that doesn't survive the raw export.
   - **Master Brand's hero background was actually correct** (a zoomed
     preview made it look wrong at first glance; resizing it to match the
     screenshot's aspect ratio confirmed the composition is identical).
     Its `mobileImage`, though, was a byte-for-byte duplicate of the
     desktop file — confirmed this is genuinely what Figma's own mobile
     node also references (not a download mistake), so simplified to a
     single `image` prop with no separate mobile file. Also fixed the
     hero number's line-height (120px in Figma, was sharing the title's
     96px value).
   - **Buttons weren't actually inconsistent at the component level** —
     every one already uses the shared `Button`. The visible size/position
     differences came from their *containers*: 4 image+button blocks in
     Master Brand (2.2, 2.3, 2.10, 2.11) used `items-start` where Figma's
     real spec is `items-end` (confirmed via `99:283`), and Assets'
     "Descargar fuente" button had no cross-axis alignment at all, so it
     stretched to fill width on mobile / height on desktop under flexbox's
     default `stretch`. Fixed both.
   - **Sidebar logo:** Figma's "Menu v1" root (`528:286`) uses
     `items-center` on the whole column, which `Nav.tsx` never applied —
     added it, plus an explicit `w-full` on the nav-links `<ul>` so it
     stays full-width instead of also collapsing and centering.
   - **Footer rebuilt as one shared, variant-aware component.** It was two
     separate implementations before (Home's own inline footer, plus
     `Footer.tsx` for the other three) and neither matched Figma's mobile
     spec. Fetched all 4 combinations directly (`528:254`/`528:256` desktop,
     `543:393`/`543:407` mobile): mobile shows the logo on *every* page,
     including the "gray" inner-page variant that hides it only on
     desktop — a real per-breakpoint content difference, not an oversight
     to "fix" away. The three footer links group differently per
     breakpoint too (desktop pairs "Volver arriba" with the contact block,
     18px gap, separate from copyright, 12px gap; mobile pairs
     contact+copyright together, 32px gap, separate from "Volver arriba"
     alone, 64px gap) — genuinely different grouping, not just the same
     three items re-wrapped. Also fixed a dead `#top` anchor (no element
     with that id existed anywhere) by making the back-to-top target a
     `backToTopHref` prop, defaulting to `#`.
   - **Lesson:** every one of these had already been "fixed" once this
     project (or built from `get_design_context` originally) and still
     shipped wrong. A first pass that *seems* to match Figma isn't the
     same as verifying against a fresh fetch — cached impressions (a
     zoomed screenshot, an assumption about which bug was "confirmed")
     drifted from what Figma actually specifies. When Sofia says something
     still looks off, re-fetch before re-explaining the old diagnosis.

9. **Round 9 (2026-09-09, later same day):** Sofia asked specifically for
   Assets to be made pixel-perfect. Fetched every one of its 13 numbered
   subsections directly (most for the first time this project — Round 5
   had only verified copy content, not layout) and found the same class of
   structural bug repeated everywhere:
   - **`SectionHeading` never had a body-text slot.** Every subsection's
     intro paragraph was stacked underneath the title instead of living in
     the same side-by-side 447px-title/127px-gap/561px-body column layout
     already correctly used on Master Brand and Estrategia. Rebuilt the
     component to take `children`; moved all 13 sections' intro copy into
     it (mechanical, low-risk once the component itself was right).
   - **`SwatchCard` (3.1/3.2) didn't match Figma's structure at all** —
     real cards use discrete label/value rows (16px, medium+regular
     weight pairs) not flattened single lines at 14px with opacity. Text
     color per swatch is art-directed in Figma per color, not computed
     from luminance (the old `isLight()` helper) — Azul IV and the two
     palest swatches use specific brand colors, not a generic light/dark
     rule.
   - **Confirmed a real content bug in Figma itself**: the "HotDays"
     swatch's RGB/CMYK and its own visual fill all agree on a red/orange
     color, but its printed HEX label says `#2B7DF6` (copy-pasted from
     Azul I). Used the color 3-of-4 signals agree on.
   - Assorted confirmed fixes: 3.4's 7th "contraste básico" image has a
     different aspect ratio (1135/191, not 4096/1410 like the other six);
     "Contrastes compuestos" was stacked, not side-by-side; a whole
     paragraph at the end of 3.4 wasn't in Figma at all and was removed;
     3.9 was missing its second confirmed paragraph; 3.11's subtitle-to-
     image gaps were 16px against a confirmed 32px; 3.13's "para
     catálogos" subsection was stacked instead of side-by-side and its
     body copy was a shortened paraphrase, replaced with the real (much
     longer) Figma text; "Uso de color" was missing "del" in its title.
   - **Found 3.8 and 3.9 (photography) still marked `AssetPending`**
     assuming the reference photos didn't exist yet — a fresh fetch found
     ~30 real generated photos already in Figma across both sections, plus
     a different layout (always-visible bordered Prompt Maestro/Negative
     Prompt boxes, not the collapsible `<details>` used before). Flagged
     to Sofia before touching it given the scope; she confirmed
     downloading everything and rebuilding — done the same round, see
     Pending #2 for the full detail. Don't reintroduce the collapsible
     `<details>` or `AssetPending` here going forward.
   - Not yet re-verified this round: 3.5 (Fuentes tipográficas, only its
     already-fixed button-alignment bug was touched this session) and 3.6
     (Jerarquías) beyond the mechanical `SectionHeading` move — worth a
     closer look if more mismatches turn up, since neither got a full
     fresh content re-check this round the way 3.1-3.4/3.9/3.11/3.13 did.

10. **Round 10 (2026-09-09, later same day):** Sofia sent Figma links for
    the footer, mobile nav, and button hover, plus several open complaints
    (Home shouldn't have a menu, heroes should fill the screen on load, the
    Home hero's Nova mark looked deformed, the other heroes' top text sat
    too low, menu needs dropdown arrows + animation, buttons need a real
    hover animation, and scroll should reveal content with opacity).
    - **Home has no nav at all now** (confirmed with Sofia) — `Nav.tsx`
      returns `null` on `pathname === "/"`. It's the index page itself; a
      persistent menu would just duplicate its own Index section.
    - **Root-caused the "text too low" complaint**: `Nav.tsx`'s mobile
      trigger was a full-width `sticky` bar (logo + hamburger) sitting in
      normal document flow *above* the Hero, pushing it down by the bar's
      own height. Fetched the real mobile nav node (`2045:921`) — it's
      just a bare hamburger icon, no bar/background/logo at all. Rebuilt
      the trigger as a `fixed` floating button (zero layout height) so it
      no longer pushes the Hero's own top-row text down. This also
      resolved the "menu isn't from Figma" flag noted in earlier commits
      — it is, just not a full bar.
    - **Heroes now use `h-svh`/`h-screen`** instead of a fixed
      aspect-ratio box, on both Home and the shared `PageHero`, so they
      fill the actual viewport on first load rather than Figma's fixed
      578px/929px mockup heights.
    - **`HeroMark` was genuinely stretching one of its 9 fragments** —
      Figma's reported inset percentages are rounded to ~2 decimals, and
      the fragments were sized with no `object-fit` (stretch to fill both
      axes of their slot), compounding that rounding into a confirmed
      ~5.6% width mismatch on the biggest wordmark piece. Added
      `object-contain` to all 9 fragments.
    - **Button hover was wrong.** Fetched the confirmed hover state
      (`543:673`, "Variante 2") — a solid filled `bg-azul-1` button with
      white text, not the light-tint hover previously used. Fixed, plus a
      small scale transition for "a cool but simple" feel as asked.
    - **Nav accordion**: added a rotating chevron per top-level page and
      switched sub-items from popping in/out on route change to a smooth
      `grid-template-rows` height transition (element stays mounted so it
      can animate closed, not just conditionally rendered).
    - **Added a site-wide scroll-reveal** (new `ScrollReveal.tsx`, mounted
      once in the root layout): every section below each page's hero
      fades/slides in the first time it scrolls into view. Generic by
      position (skips only the first direct child of the page's root
      `<div>`, whether that's Home's own `<section>` hero or PageHero's
      `<header>`) rather than needing per-page wiring.
    - Footer was re-checked against all 3 nodes Sofia linked (`543:407`
      mobile, `528:254` home, `528:256` other pages) — all three already
      matched the Round 8 rebuild exactly; nothing to fix there.

11. **Round 11 (2026-09-09, later same day):** Sofia sent more specific
    complaints (blank gaps in Assets, a "too low" hero margin, the Brand
    Tree image "deforming", "el nav en mobile no está bien", the mobile
    footer logo deforming, footers looking cramped, Home's index titles
    not being clickable) and confirmed bringing "04 Design System" into
    scope (see "Decisions confirmed with Sofia" #3 and the Figma source
    notes above).
    - **Footer logo really was being stretched on mobile.** The footer's
      `flex-col` container had no `items-start`, so default
      `align-items: stretch` forced the logo `<img>` (`width: auto`) to
      fill the container's full width while its `h-[97px]` stayed fixed —
      a wide, vertically-squished mark. Added `items-start`; this was
      likely the main cause of "cosas muy pegadas" too, since an
      oversized stretched logo crowds everything below it.
    - **Estrategia's mobile hero photo was a genuine wrong-crop bug, not
      the "blank export" issue corrected two rounds ago.** Node `529:1846`
      ("Hero 2 Mobile") has no separate image child layer to fetch
      cleanly — the photo is a frame-level fill — and its raw asset
      export returns a *different, more zoomed-in* crop of the photo than
      what the frame's own screenshot shows (confirmed: the screenshot
      has a window and a third person visible that the raw export
      doesn't). Simulated the old crop with the actual math (a 1024×572
      photo forced to `object-cover` a 390×844 container) and it showed
      almost nothing recognizable — this is what "se está deformando"
      meant. Swapped in the screenshot render (the correct 390×844 crop)
      and reintroduced a scoped `mobileScrim` prop on `PageHero` (mobile
      only, two gradient bands — a lighter one at the very top, a
      stronger one at the bottom) to hide the screenshot's own baked-in
      text so the real text on top reads cleanly. This is a *different*
      bug from the false alarm in Round 8/9 — that one was about a
      *blank* export; this one is about a *wrong* export — don't conflate
      them if this comes up again.
    - **Assets' blank gaps**: several photo galleries (3.8/3.9) have
      counts that aren't multiples of 3 (5 or 7 photos), so `grid-
      cols-3` left the incomplete last row's unused cells as visible
      blank space. Switched `PhotoGrid` from CSS grid to `flex-wrap`
      with a fixed basis, which doesn't reserve a track for photos that
      aren't there. Also fixed a 36px-vs-confirmed-38px padding slip in
      `SwatchCard` found along the way.
    - **Nav's mobile hamburger had an invented dark circular backdrop**
      (from Round 10) that isn't in Figma's actual design — just a bare
      icon, no background. Replaced with `mix-blend-difference` so a
      plain white icon stays readable over both the Hero's photo and
      plain white page content below, without inventing a background
      Figma never specified. This was likely "el nav en mobile no está
      bien" — if that complaint persists, it may be about something
      beyond styling; ask for specifics rather than guessing again.
    - **Home's Index titles** (01 Brand Tree, 02 Master Brand, 03 Brand
      Assets) are now real links to each page — they were static text
      before, only their sub-items were clickable.
    - **The hero "20px top margin" note turned out to already be fixed**:
      the confirmed Figma value (`528:1282`/`509:725`) is `pt-[12px]`,
      already matching the code exactly — the perceived "too low" text
      was the Round 10 root cause (the old full-width sticky nav bar
      pushing the Hero down), already fixed that round.
    - **"04 Design System" was scoped as its own follow-up rather than
      folded into Round 11's smaller fixes — see Round 12 below.**

12. **Round 12 (2026-09-09, later same day):** "04 Aplicaciones de marca"
    built and shipped, the same day Sofia confirmed bringing it into
    scope (Round 11). New route `/aplicaciones`, added to `nav-data.ts`
    (number `04`, single section `4.1 Aplicaciones master brand`) and
    picked up automatically by Home's `NAV_PAGES.map` index.
    - **Both hero exports were confirmed broken — the same wrong-crop bug
      as Estrategia's mobile hero, this time on BOTH breakpoints.** Raw
      asset exports for desktop hero `2046:928` and mobile hero `2045:606`
      were both an oddly-portrait 683×1024 despite the actual frames being
      landscape/portrait photos of a person holding a "Súper ofertas"
      flyer. Simulated the `object-cover` crop math with PIL and confirmed
      it cropped off the "Súper" text — unusable. Fixed the same way as
      before: downloaded both `get_screenshot` renders instead (which have
      Figma's own text baked into the pixels) and extended `PageHero` with
      a new `desktopScrim` prop (mirrors the existing `mobileScrim` — two
      gradient bands, top and bottom) so the real `<h1>`/top-bar text
      reads cleanly over the baked-in screenshot text at both breakpoints.
    - **`PageHero`'s `titleLines` now also accepts a plain string.** Every
      other page's hero title is an explicit 2-line split; 04's confirmed
      title "Aplicaciones master brand" is one flowing string that wraps
      naturally at this width (confirmed via `get_screenshot`, which shows
      it wrapping to "Aplicaciones" / "master brand" on its own) — forcing
      it into the `[string, string]` tuple would've been an invented line
      break, not a real one from Figma.
    - **Desktop and mobile galleries are two separate JSX trees, not one
      responsive tree.** Compared `get_design_context` on both content
      nodes (`2045:602` desktop, `2045:603` mobile): several images change
      *relative proportion* between breakpoints, not just size — e.g. the
      "[NOVAVENTA]-CAJA2" mockup is a narrow fixed box on desktop but full
      width on mobile; the Portada/Doblepágina row is two equal 561px
      columns on desktop but a much narrower Portada column paired with a
      wider column on mobile. One shared tree would've meant either wrong
      proportions or a pile of per-image breakpoint overrides. The *crop
      insets* for the 7 images using the "oversized image + negative-%
      inset" zoom pattern (Portada2, Appmobile ×2, Pantalla1, Billboard
      ×3) turned out to be byte-identical percentages between desktop and
      mobile in Figma's own generated code — only the containing box's
      size differs — so those exact percentages are defined once (an
      `INSET` map) and reused by both trees via a shared `CroppedImg`
      helper; the remaining 12 images use a `CoverImg` helper (same
      pattern as Assets' `Fig` helper: relative box + `aspectRatio` style +
      `next/image fill object-cover`).
    - **Downscaled the 19 raw mockup exports before committing.** They
      came out of Figma at up to 4096px on the long edge — 181MB total,
      several single files 20-30MB — vastly more resolution than they'll
      ever render at (max ~700px wide in this layout). Resized to a
      1800px max edge with PIL (`optimize=True`, kept RGBA where present
      for the ones with transparent mockup corners), bringing the total
      to 46MB. Not a perf-critical page, so no further compression pass
      beyond this basic sanity check.
    - Verified with `npx tsc --noEmit`, `npm run build`, and a local
      `npm run start` + `curl`/`grep` pass (all 19 images present in both
      trees, hero assets wired, Home's index link and Nav link present,
      footer present) — no browser tool available this session, same
      constraint as prior rounds.

13. **Round 13 (2026-09-09, later same day):** Sofia sent two screenshots
    (our live Estrategia hero via DevTools, and Figma's own "Hero 2") and
    asked to (a) confirm "04" is really in the nav/Home index, matching
    the Figma frame she had open, (b) keep the mobile-menu-with-an-X
    approach, (c) fill in any missing mobile hero images, (d) keep
    auditing hero spacing, and (e) check the Brand Tree diagram for
    distortion.
    - **(a)/(b) were already done, verified fresh.** Refetched Figma's
      actual "Menu v1 / Variante 5" (desktop sidebar's "04 active" state,
      node `528:960`) and Home's Index frame (`505:259`): both already
      show "04 Aplicaciones de marca" → "4.1 Aplicaciones Master Brand"
      exactly where `nav-data.ts`'s `NAV_PAGES` entry puts it (it
      propagates automatically to the sidebar, mobile panel, and Home's
      index — no separate wiring needed). The mobile trigger Sofia had
      selected in Figma at the time ("Nav - mobile", node `2048:1276`) is
      the same bare hamburger + text row already implemented — no new
      "open" mockup exists to compare against, so our built X-close panel
      stands as the reasonable interpretation it already was.
    - **Found one real, unaddressed content contradiction — not fixed,
      only flagged per the hard "don't average / don't pick — ask" rule.**
      Figma's sidebar spells the "4.1" sub-label "Aplicaciones **Master
      Brand**" (title case), but node `2045:602`/`603` (04's own page
      content, fetched in Round 12) spells it "Aplicaciones **master
      brand**" (lowercase) — the two Figma sources disagree with each
      other. Left `nav-data.ts` as lowercase (matching the page's own
      on-screen heading) and reported the discrepancy rather than
      silently picking a side.
    - **(c) Master Brand really was missing its mobile hero — found via
      a fresh Figma search, not assumed.** A full top-level "02 Master
      Brand - Mobile" page exists (node `543:519`, a real, fully-built
      mobile page, not a stray duplicate) with its own hero instance
      (`543:522`, "02 / Master Brand" over a blue wave-pattern
      background) — `master-brand/page.tsx` simply never had a
      `mobileImage` set, so mobile silently fell back to the desktop
      crop. Same wrong-crop bug as Estrategia/04 confirmed again: the raw
      MCP export for this hero is the full 4096×1899 landscape
      background (byte-identical, confirmed via `md5`, to the desktop
      hero's own already-correct asset) — not the actual 390×844 portrait
      crop Figma shows for the mobile instance. Fixed the same way:
      `get_screenshot` render saved as `hero-master-brand-mobile.png`,
      wired in with the existing `mobileScrim` prop (this hero also has
      baked-in "Brand Boook Guidelines/2026" text in the screenshot).
      **Assets was re-confirmed to still have no dedicated mobile hero in
      Figma** — re-verified fresh rather than trusted from memory, same
      conclusion as the original Round 8/9 finding: not a gap, no fix
      needed.
    - **(d) Estrategia's hero spacing was re-verified against Sofia's own
      screenshots and matches Figma exactly** (12px top / 38px right /
      38px bottom / 67px left, confirmed against both the live DevTools
      readout and Figma's own callouts) — nothing to fix there. Also
      re-confirmed Master Brand's desktop hero uses the identical
      `pt-[12px] pr-[38px] pb-[38px] pl-[67px]` padding while fetching its
      hero for the mobile-image work, so the shared `PageHero` padding
      still matches Figma everywhere it's been checked.
    - **(e) Could not reproduce the Brand Tree diagram distortion.**
      Checked the actual file: native image is 3587×4096 (aspect
      0.87573), the CSS box is locked to `1134/1295` (aspect 0.87568) —
      a 0.006% difference — and it renders with `object-contain`, which
      cannot stretch an image by definition. Confirmed via the live
      production HTML too. No code-level cause found; flagged to Sofia
      to send a fresh screenshot of where specifically she's seeing it,
      in case it's a stale/cached view.

14. **Round 14 (2026-09-09, later same day) — Sofia reports Master Brand
    still has "un espacio gigante blanco," we're "still using images that
    aren't for the heroes, same error," "04" (`/aplicaciones`) "shows
    nothing," and the sidebar menu's spacing looks too generous /
    "espichando" (cramped) and may need smaller margins. Investigated
    thoroughly; could not reproduce the first three at the code/server
    level — this is now a genuinely open question, not a fixed bug.**
    - **Checked every layer of both pages on the CURRENT production
      deployment** (`https://nova-brandbook-nine.vercel.app`, confirmed
      via `vercel alias ls` to be aliased to the exact deployment from
      Round 13's push, 10 minutes old at the time): raw file responses
      (200 for every hero and every one of the 19 `/aplicaciones` mockup
      images), `next/image` optimizer responses (200, correct
      content-type, real bytes, tested at multiple widths), and — most
      importantly — the actual server-rendered HTML `<body>` (not just
      the React hydration payload): both `/master-brand`'s `<picture>`
      (correct `<source>`/`<img>` split between the desktop jpg and the
      new mobile png) and `/aplicaciones`'s gallery (41 real `<img>`
      tags, all 19 filenames present with correct `src`, hero images
      present) come back completely correct. Also re-verified the actual
      downloaded Master Brand content images (identificador-1.png,
      versiones-color-1-4.png, simbolo-*.png, etc.) all exist and are NOT
      blank/white (checked white-pixel-fraction per file) — though
      **`identificador-1.png` and `versiones-color-1.png` are confirmed
      byte-identical (same md5)**, a real content bug from the original
      Sept 2 download (2.2 "Identificador" and the first swatch of 2.3
      "Versiones de color" wrongly show the exact same image) — flagged,
      not yet fixed, since it doesn't match "giant blank space" or
      "wrong hero images" and needs its own confirmation of what the
      *correct* identificador-1 image should actually be before
      re-downloading it.
    - **Could not find a technical cause for "giant white space" /
      "nothing shows" / "wrong hero images" given everything above comes
      back correct.** Leading hypothesis, not yet confirmed: Sofia may be
      looking at a stale, deployment-specific Vercel URL rather than the
      stable alias. Every `vercel --prod` deploy creates a NEW immutable
      URL (e.g. `nova-brandbook-rclrici7o-panoramabranding.vercel.app`)
      that never changes again — only the aliases
      (`nova-brandbook-nine.vercel.app`,
      `nova-brandbook-panoramabranding.vercel.app`,
      `nova-brandbook-git-main-panoramabranding.vercel.app`) move forward
      to the latest deploy. If she has an old deployment-specific URL
      bookmarked or pasted somewhere (from earlier today or an earlier
      session), it would show frozen, older content forever — matching
      all three symptoms at once, including "04 shows nothing" if that
      bookmark predates today's build entirely. **Not yet confirmed with
      Sofia — need to ask which exact URL she's opening, and get a fresh
      screenshot if it's already one of the 3 current aliases.**
    - **Menu/sidebar spacing was re-verified against Figma's own most
      cramped realistic case** (node `528:503`, "Menu v1 / Variante 4" =
      Assets active, the longest expanded list: 13 sub-items across 6
      category groups) — every gap in our `Nav.tsx` matches Figma exactly
      at every nesting level: 28px between top-level page entries
      (`gap-7`), 20px between a page's title and its subsection block
      (`gap-5`), 20px between category groups and between a group's
      heading and its own leaf list (`gap-5`), 12px between individual
      leaf items (`gap-3`). This is not a "we deviated from Figma" bug —
      if the spacing should still be tighter than this, that would be a
      deliberate departure from Figma's own numbers, which needs Sofia's
      explicit go-ahead rather than a unilateral change, per the
      "confirm before deviating from Figma" rule.
    - **No code changes made this round** — investigated only, since
      nothing reproducible was found to fix. Next step is getting
      Sofia's confirmation on the exact URL/screenshot before touching
      anything further, to avoid guessing at a fix for a bug that
      couldn't be located.
    - **Session paused here, unresolved.** Sofia's exact words: "guarda
      en contexto y seguimos mañana porque todavia no esta" — i.e. as of
      end of day 2026-09-09 she is *still* seeing the problem live (not
      a leftover report from earlier in the round), and we did not reach
      the point of getting the exact URL or a screenshot from her before
      pausing. **Start tomorrow by asking for those two things again**
      (which exact URL she's opening; a screenshot of where the blank
      space/wrong image actually shows) rather than re-doing the same
      server-side checks from scratch — those already came back clean
      twice. Do not assume the "stale deployment-specific URL" hypothesis
      is confirmed; it's still just the leading guess.

15. **Round 15 (2026-09-10):** Sofia opened with a screenshot (Master Brand,
    live site) plus a long voice-note list of complaints. Rather than
    guessing pixel values, read the actual component code first and found
    three genuine, verifiable code bugs (not Figma drift) — fixed all three
    — plus re-verified two more complaints against fresh Figma fetches and
    found they already match the file exactly, which is being flagged back
    to her rather than "fixed" per the hard no-unilateral-deviation rule.
    One complaint is still unresolved pending a screenshot from her.
    - **FIXED — hero top spacing "huge" on every inner page, but "perfect"
      on Home.** Root cause: `PageHero.tsx`'s `<header>` is
      `flex flex-col justify-between`, and its first JSX child was a bare
      `<picture>` wrapping the background `<img>`. Even though the `<img>`
      itself is `absolute` (out of flow), the `<picture>` element wrapping
      it had no positioning of its own, so it was still a real (zero-height
      but present) flex item — turning what should be 2 flex items (top
      bar text, `<h1>`) into 3. `justify-between` then split the free space
      into *two* gaps instead of one, pushing the top bar down from the
      edge by roughly half the hero's height instead of sitting at the
      intended `pt-4`/`pt-3` (16px/12px). Home's hero has no `<picture>` at
      all (solid `bg-azul-1`, no background image) — only 2 real flex
      items — which is exactly why it looked "perfect" while every
      `PageHero`-based page (Estrategia/Master Brand/Assets/Aplicaciones)
      had the bug. Fix: `className="contents"` on the `<picture>` so it
      generates no box of its own and stops being a flex item at all. Only
      Home was correct before; now every page should match it.
    - **FIXED — Aplicaciones (04) "huge gap of empty white space," reported
      as present on desktop but not mobile.** Root cause was in
      `ScrollReveal.tsx`, not per-page: its `IntersectionObserver` used
      `threshold: 0.1` — a *ratio of the target element's own total
      height*, not a fixed pixel amount. `aplicaciones/page.tsx` wraps its
      entire 19-image desktop gallery in one single `<section>`
      (`DesktopGallery` + `MobileGallery` both live inside it, toggled by
      `hidden md:flex` / `md:hidden flex`), and that section's real
      rendered height on desktop is roughly 11,000px+ — over 10x a typical
      ~900px viewport. A section that tall can never show 10% of its own
      area within one viewport, so `isIntersecting` never crossed the
      threshold and `.reveal-visible` (opacity 1) never got applied — the
      section stayed permanently at `.reveal`'s `opacity: 0`, which still
      reserves full layout height (not `display:none`), reading as a
      giant blank gap exactly the section's height. On mobile the *same*
      wrapping section is much shorter (single-column narrow images), well
      under the ratio cutoff, so it revealed fine — matching "you're able
      to see it on mobile, not on desktop" exactly. This wasn't
      Aplicaciones-specific, just the first page with a section tall
      enough to hit it — any future very-tall section anywhere would hit
      the same bug. Fixed generically: `threshold: 0` (fires the instant
      any pixel is visible, independent of the target's total height),
      not a per-page workaround.
    - **FIXED — sidebar accordion "expands but doesn't collapse on a
      second click."** Real bug, unrelated to Figma: `Nav.tsx`'s
      accordion-open state was derived *only* from `page.slug === pathname`
      (the current route). Clicking an already-active page's `<Link>`
      just re-navigates to the same URL — a no-op — so there was never
      any state to toggle closed. Added a `collapsedSlug` state: clicking
      the link for the page that's already active now `preventDefault`s
      the navigation and toggles collapse instead of no-op'ing; clicking
      any other page's link navigates normally (and clears the override).
      Applies to both the desktop sidebar and the mobile panel (same
      `NavLinks` component).
    - **DELIBERATE DEVIATION FROM FIGMA (confirmed with Sofia) — sidebar
      top-level spacing.** Re-verified `528:503` fresh (second independent
      check, same result as Round 14): Figma's own code is `gap-[28px]`
      between top-level page blocks, exactly matching `Nav.tsx`'s `gap-7`
      — genuinely not a bug. Flagged this back to Sofia rather than
      guessing; she confirmed she wants it tighter than Figma's own spec
      anyway. Changed `Nav.tsx`'s top-level `<ul>` gap `gap-7` (28px) →
      `gap-5` (20px). This is intentionally NOT what Figma specifies —
      don't "correct" it back without re-confirming with her first.
    - **DELIBERATE DEVIATION FROM FIGMA (confirmed with Sofia) — footer
      link spacing, opposite direction from the nav item above.** Sofia's
      original complaint was that "volver arriba / preguntas / novaventa"
      look too close together with no space — i.e. she wants this gap
      BIGGER, not smaller (unlike the nav item, which she wants smaller).
      Re-verified `528:256` fresh: Figma's own code is `gap-[12px]`
      between the "Volver arriba + Preguntas" cluster and the "2026 Nova
      Venta" copyright block, exactly matching `Footer.tsx`'s `gap-3` —
      not a bug either. She confirmed deviating from Figma here too.
      Changed `Footer.tsx`'s desktop group gap `gap-3` (12px) → `gap-6`
      (24px). Same rule as above: intentional departure from Figma, don't
      revert without asking.
    - **INVESTIGATED — mobile heroes "still using images with text baked
      in."** Sofia wants the clean mobile photo back, not the
      screenshot-render + scrim workaround documented in Round 11 (see
      "Known quirks"). Re-checked with a brand-new fetch rather than
      trusting that old diagnosis: `get_design_context` on Estrategia's
      "Hero 2 Mobile" (`529:1846`) now DOES return a direct `<img src>`
      for the node (unlike Round 11, when no extractable child image layer
      existed at all) — so the node's structure changed since. But
      downloading that exact raw asset URL and checking it directly
      (`sips -g pixelWidth -g pixelHeight`) shows it's **1024×572** —
      that's not a mobile crop at all, it's a byte-for-byte match for the
      *desktop* hero's own dimensions (`hero-estrategia.png` is also
      1024×572). The raw MCP export for this specific node is still
      returning the wrong (desktop) image, now just via a different code
      path than last time. **Did not swap it in** — doing so would
      regress to a real bug (the desktop-shaped image force-filling a
      390×844 portrait mobile box). The screenshot+`mobileScrim` approach
      remains the correct, verified workaround for this node; not fixed
      because there was nothing to fix, but re-confirmed today rather than
      assumed.
    - **INVESTIGATED — mobile "nav bar" should come back, ideally with a
      blue background on scroll.** Checked Figma's "Componentes" section
      metadata fresh and found the node Sofia may be thinking of, "Nav -
      mobile" (`2048:1276`, 390×82). Fetched it directly: it's not a
      separate bar component at all — it's the *exact same* "Brand Book
      Guidelines / 2026" text row + hamburger-lines icon that's already
      built into `PageHero`'s own top bar (identical text nodes,
      `2045:922`–`2045:927`). There is no distinct Figma mobile nav-bar
      component with its own background fill anywhere in the section —
      the dark backdrop visible in its Figma screenshot is just the
      canvas/frame boundary, not an authored fill. **No Figma source for a
      "blue bar on scroll"** — if Sofia still wants that, it would be a
      net-new departure from Figma (fine to build, but needs to be an
      explicit ask, not an inferred one, per the no-inventing rule).
    - **FOUND AND FIXED — "background image getting deformed," turned out
      to be Estrategia's mobile hero, not the desktop diagram.** Sofia's
      voice note was ambiguous about which page/image at first; she then
      sent the actual Figma link (node `509:725`, Estrategia's desktop
      "Hero 2") and said "de fondo, la imagen que va en brand tree." That
      raw asset downloaded byte-identical (same md5) to the desktop
      `hero-estrategia.png` already in the repo — so the desktop file
      itself was never wrong. The real bug only showed up once real
      screenshot tooling existed this round (see below): at mobile
      (390×844), Estrategia's hero showed the live "Brand Book Guidelines
      / 2026" and "01 Brand Tree" text with a faint **ghosted duplicate**
      of Figma's baked-in text from the `mobileScrim` screenshot-render
      workaround (see "Known quirks") showing through behind it — that
      doubled/misaligned text is almost certainly what read as
      "deformándose." Root cause: the scrim gradients
      (`rgba(8,51,94,0.75)`→`0` top, `0.9`→`0.55`→`0` bottom) never
      reached full opacity, and worse, by the point the gradient reached
      its darkest stop, the actual title text (measured: top of the "01"
      numeral sits ~247px up from the bottom edge) had already dropped to
      only ~60% coverage — nowhere near enough to hide bold 64px white
      text. Fixed by switching both bands from "fade from the first
      pixel" to "hold fully solid (`rgba(...,1)`) through the measured
      text zone, then fade" — solid through 55% of a taller `h-40`/`h-56`
      top band, solid through 65% of a `h-[50%]` bottom band. Re-verified
      with `screenshot.mjs` through two more rounds (see below) until no
      ghost text remained, then spot-checked Master Brand mobile and
      Aplicaciones (both breakpoints, since they share `mobileScrim`/
      `desktopScrim`) — clean on all of them.
    - **Set up real screenshot verification this round** — CLAUDE.md's
      pixel-perfect flow assumes a Browser/Puppeteer tool that has never
      actually been available in this environment (Round 12-14 all hit
      the same gap; see memory `no-browser-tool-vscode-session`). Sofia
      asked how to get the same capability she has in `~/Downloads/
      portafolio`; that project turned out to just have `puppeteer` as a
      plain devDependency plus a small script, no special tool involved.
      Copied the same pattern here: `puppeteer` added to
      `devDependencies`, `screenshot.mjs` added at the project root
      (`node screenshot.mjs <url> [label] [--viewport=WxH] [--full]
      [--wait=ms]`, saves to `./temporary screenshots/`, gitignored).
      This is what caught the ghosting bug above — code review and Figma
      diffing alone had missed it. **Use this going forward** instead of
      assuming no visual verification is possible.
    - **Used the new screenshot setup to actually verify the rest of this
      round's fixes**, not just at the code/build level:
      - Hero spacing fix (`contents` on `<picture>`): confirmed via
        screenshot — top bar text now sits right at the edge on
        Estrategia, matching Home.
      - Nav accordion + tighter top-level gap: confirmed via screenshot —
        "01 Brand Tree" expands with its 5 sub-items, other pages
        collapsed, spacing visibly tighter.
      - ScrollReveal `threshold: 0` fix: scripted a full scroll-through of
        both `/aplicaciones` (the page Sofia specifically flagged) and
        `/assets` (checking every `.reveal` element's final opacity) —
        zero elements stuck at `opacity: 0` on either page after a full
        scroll, and a screenshot at `scrollY=4000` on `/aplicaciones`
        shows the gallery images fully visible, not blank.
    - **Verified via `npx tsc --noEmit`, `npm run build`, and the
      screenshot pass above** — this round's fixes have actual visual
      confirmation, not just code-level reasoning, unlike the caveat
      noted earlier this same round before the screenshot setup existed.
    - **Scrim fix, round 2 — Sofia caught that the first fix overcorrected.**
      She checked `localhost:3000` directly (screenshot tooling from this
      round made that possible for the first time) and sent her own
      screenshot next to a fresh Figma reference (node `529:1847`,
      Estrategia's real mobile hero instance): our fix killed the ghost
      but the bottom scrim band was `h-[50%]` solid-to-65%, i.e. a hard
      navy rectangle covering roughly half the photo — Figma's actual
      design barely darkens the photo at all (the "01 Brand Tree" text
      just sits on the photo's own naturally dark areas). Recalculated
      the *real* text position from `PageHero`'s own layout (topbar
      pt-4→~66px; h1 bottom-aligned via pb-8, ~215px tall on mobile →
      spans ~y=597–812 of 844px) and shrank the bottom band to hug it:
      mobile `h-[38%]` solid-to-78% (was `h-[50%]`/65%). Re-screenshotted
      — confirmed no ghost, much smaller visible block. **Then found the
      same percentage-based band doesn't transfer to desktop** — Aplicaciones
      desktop (`desktopScrim`, real 96px title text, `h-screen` container
      whose actual height varies by monitor) showed a fresh ghost of
      "Aplicaciones" with the shrunk-to-match-mobile band; desktop's text
      is positioned differently (larger font, side-by-side number+title,
      different padding) so mobile's exact percentages don't carry over.
      Kept desktop more generous (`h-[48%]` solid-to-75%, vs mobile's
      `h-[38%]`/78%) and re-verified clean. **Lesson: `object-cover` on a
      screenshot-rendered hero means the baked text's rendered position
      depends on the container's aspect ratio, which varies a lot more on
      desktop (monitor height) than mobile (~844px is fairly standard) —
      a single fixed-percentage scrim isn't reliable across both without
      separate calibration per breakpoint.** If a real ghost or
      over-coverage complaint comes back on a DIFFERENT page's desktop
      hero specifically, recheck that page's own text size/position
      rather than assuming the Aplicaciones numbers transfer directly.
    - **Sofia kept reporting "no changed nothing" even after the scrim
      fix, both spacing changes, and the accordion fix were all verified
      working via fresh screenshots** — traced this to two separate
      things, not a code bug: (1) she confirmed via a temporary on-page
      red banner (`MARCADOR V3`, added then removed from `layout.tsx`)
      that she IS hitting the exact same dev server, ruling out a
      split-environment theory; (2) two of the four items she was
      checking (nav accordion collapse, mobile menu open) are **only
      visible on interaction** — clicking, not just loading the page —
      so "looking the same" was expected if she hadn't actually clicked.
      Session paused mid-diagnosis; Sofia asked to step back and look at
      how `~/Downloads/portafolio` achieved pixel-perfect, to see if
      there was a better process. Turned out to be the same
      `screenshot.mjs` pattern (nothing new), plus two things worth
      adopting: that project's `serve.mjs` sends `Cache-Control: no-store`
      on every response (we're on `next dev`, one more layer that can
      desync after many rapid edits in one tab) and a `qa.mjs` +
      ImageMagick pattern for numeric pixel-color sampling, not just
      eyeballing screenshots — noted as a nice-to-have, not adopted yet.
    - **Resolution: published a self-contained QA gallery as a Claude
      Artifact** (`https://claude.ai/code/artifact/cc5ba579-0c93-4611-8ea1-2111620b45dd`,
      "QA Ronda 15") with the actual `localhost:3000` screenshots for all
      4 items (nav expand/collapse pair, footer spacing, mobile hero,
      mobile menu), each captioned with the exact before/after pixel
      values. This sidesteps the whole "are we even looking at the same
      localhost" problem entirely — it's a real hosted URL, viewable from
      any device, and she can comment directly on it. Also asked her to
      re-check in a fresh Incognito window to rule out stale-tab caching
      as a contributing factor. **Outcome not yet confirmed** — this is
      the next thing to check when resuming.
    - **Not yet committed/pushed or deployed** — all changes (including
      the new `puppeteer` devDependency and `screenshot.mjs`) are on disk
      only, pending Sofia's confirmation via the gallery above.

16. **Round 15 continued — "05 Sub-marcas" brought into scope and built,
    same day.** Sofia asked directly ("vamos haciendo el de submarca"),
    which counts as the explicit per-page confirmation CLAUDE.md requires
    (05 had been out of scope since the project started; only 04 was
    previously confirmed). Found the real Figma nodes fresh — `525:218`
    "05 SUBMARCA" desktop (1440×22449) and `2055:2171` "05 SUBMARCA -
    mobile" (390×13961) — via a full-document metadata search (never
    assumed from cached knowledge). This is a bigger page than 04: three
    subsections (5.1 Arquitectura de marca, 5.2 Marcas de visibilidad
    externa — Nova Express + Nova Clic, 5.3 Marcas de visibilidad interna
    — iNova + Nova Empresarios + Nova Líder) and ~35 mockup images plus 5
    color swatches, confirmed with Sofia via `AskUserQuestion` before
    committing to building all of it in one pass ("todo de una, en
    orden").
    - **New route `/submarca`**, wired into `nav-data.ts`'s `NAV_PAGES`
      (auto-propagates to the sidebar, mobile panel, AND Home's index —
      no separate wiring needed, same mechanism as 04). Number `05`,
      label `Sub-marcas` (matches Figma's own sidebar spelling, confirmed
      via node `528:503`).
    - **One responsive tree, not desktop/mobile split like 04** — checked
      this deliberately rather than assuming: compared every image's
      aspect ratio and crop-inset percentages between the desktop
      (`525:218`) and mobile (`2055:2171`) metadata and found they match
      exactly image-for-image (unlike 04, where several images changed
      relative proportion between breakpoints). One tree with responsive
      Tailwind widths was correct here; don't assume this generalizes to
      future pages without checking each one's own metadata the same way.
    - **Hero uses the same screenshot+scrim workaround** as every other
      photo-based hero on this site — confirmed via the same raw-vs-
      screenshot comparison used all day: the raw asset export for node
      `2046:938` is a portrait 955×1024 crop that doesn't match the real
      landscape frame, while `get_screenshot` returns the correct
      1240×578 composition. Downloaded and saved as `hero-submarca.png`/
      `hero-submarca-mobile.png`.
    - **Two real content bugs found in Figma's source, flagged (not
      silently fixed) in code comments and here:**
      1. **"Colores secundarios" for Nova Express (Express II/III, Beige,
         Gris Express) have copy-pasted CMYK/RGB/PANTONE values** — each
         one's HEX and visual fill are correct and unique to that swatch,
         but its CMYK/RGB/PANTONE fields are a *verbatim* match for a
         completely unrelated swatch from the main Azul palette (Express
         II's values = Azul III's; Express III's = Azul II's; Beige's =
         Azul IV's; Gris Express's = Azul tinte-claro's — confirmed
         number-for-number, including PANTONE codes). Almost certainly
         built by duplicating the Azul palette cards and only updating
         Name+Hex+fill. Displayed as Figma has them (didn't invent
         corrected values — RGB could be derived from hex, but CMYK/
         PANTONE can't be without real color-matching data), flagged
         clearly in a code comment for the design team to fix at the
         source.
      2. **The body text under "iNova" is the Nova Express intro
         paragraph, verbatim** (same string appears 4 times in the file:
         nodes `2055:672`, `2055:2116`, `2055:2307`, `2055:2521`) — talks
         about "puntos de contacto físicos," nothing about iNova. Shown
         as-is per the no-inventing rule, flagged in a code comment.
      3. Also reconfirmed the same TOC-vs-heading numbering drift pattern
         documented elsewhere on the site: the on-page heading for 5.3
         literally says "5.2 Marcas de visibilidad externa" (same text as
         the 5.2 heading above it) in both the desktop and mobile Figma
         nodes. Used the correct 5.3 number/label per the TOC, matching
         how every other numbering-drift case on this site was handled.
      4. The "Textura mobiliario" image (Nova Express) uses a genuinely
         rotated Figma fill (180°, not just an off-center crop) —
         approximated with a `transform: rotate(180deg)` wrapper around
         the same crop-inset technique used elsewhere; a new pattern not
         needed by any other page so far.
    - **Verified with `npx tsc --noEmit`, `npm run build`, and a real
      screenshot pass** (`screenshot.mjs`) covering the hero at both
      breakpoints, the color swatches, the crop-heavy "Aplicaciones de
      sub-marca" gallery, and the footer — plus a scripted full-page
      scroll checking for broken `<img>` tags (`naturalWidth === 0`) and
      any `.reveal` element stuck below `opacity: 1` (the exact class of
      bug fixed earlier this round). Zero of either. All clean.
    - **Images downscaled to a 1800px max edge** before committing (same
      as 04's precedent) — 265MB → 70MB for ~35 files. Still larger than
      04's 46MB for 19 files; hasn't needed a second compression pass yet
      but worth revisiting if repo size becomes a problem.
    - **Not yet committed/pushed/deployed**, same as everything else this
      round.

17. **Round 15, final verification pass (2026-09-10, later same day) — done
    from a different client than every prior round.** This session runs in
    the **Claude desktop app (Code tab)**, which has a native Browser pane
    (`mcp__Claude_Browser__*`) — unlike every VSCode-extension session before
    it, which had none (see memory `no-browser-tool-vscode-session`, updated
    today to note the distinction is per-client, not per-project).
    - **Discovered the Browser pane can silently go `document.hidden` in the
      background** (confirmed via `document.visibilityState`), which pauses
      `IntersectionObserver`/`requestAnimationFrame` — a scroll-based
      `ScrollReveal` check done through it read as 3 stuck `opacity:0`
      elements on `/aplicaciones` that were **not a real bug**, just the
      observer never firing while unpainted. Don't trust scroll/animation
      state read through the Browser pane without first confirming
      `document.hidden === false`; fall back to `screenshot.mjs` (a separate
      headless Puppeteer instance, unaffected by the pane's visibility) for
      anything scroll- or timing-dependent.
    - **Also found a `screenshot.mjs --full` gotcha**: Puppeteer's
      `fullPage` screenshot captures the full scrollable area without
      actually scrolling the page for JS purposes, so `ScrollReveal`'s
      IntersectionObserver never fires and the whole page below the hero
      renders blank — looked exactly like the bug Round 15 had just fixed,
      but was purely a screenshot-methodology artifact. Fixed by scrolling
      through in real steps (`window.scrollTo` + wait, repeated down the
      page) before taking the screenshot — confirmed zero stuck elements and
      a fully-rendered gallery on `/aplicaciones`, `/master-brand`, and
      `/submarca` this way. **Use this scroll-through pattern, not a bare
      `--full` capture, whenever verifying anything `ScrollReveal`-gated.**
    - **All 4 Round 15 fixes reconfirmed visually working**: hero top
      spacing (Estrategia desktop, matches Home), nav accordion collapse
      (clicked "01 Brand Tree" twice live — expands, then collapses), the
      `/aplicaciones` blank-gap fix (full gallery + footer render, no
      blank), and the Estrategia mobile hero scrim (no ghosted text, clean
      readable title).
    - **`/submarca` (built later in Round 15) spot-checked for the first
      time**: hero clean at both breakpoints (no ghosting), 39 images on
      desktop/mobile with zero broken `<img>` tags, `ScrollReveal` clean
      (zero stuck elements across a 24,098px-tall desktop page), the 5.2
      Nova Express and 5.3 iNova sections render with the flagged Figma
      content bugs displayed faithfully (iNova's body copy is genuinely the
      Nova Express paragraph, heading correctly reads "5.3" per the TOC despite
      Figma's own on-page drift to "5.2"), and the footer's wider gap-6
      deviation is visibly present (not accidentally reverted).
    - **Still not committed/pushed/deployed** — this was verification only;
      next step is Sofia's go-ahead (or the earlier QA gallery Artifact
      confirmation) before shipping.

18. **Round 16 (2026-09-10, later same day) — Sofia asked for every page
    hero (desktop + mobile) to match Home's hero exactly except the
    background photo, pointing at Estrategia's mobile hero node (`529:1846`)
    as the reference. Found and fixed a real, previously-undetected layout
    bug affecting EVERY page hero on BOTH breakpoints, plus 3 confirmed
    spec drifts on the mobile top bar/hamburger/title.**
    - **ROOT CAUSE FOUND — the Round 15 hero-spacing fix never actually
      worked.** Round 15 diagnosed the "huge gap" bug as `<picture>` being
      an unstyled flex item and fixed it with `className="contents"`.
      Pixel-measuring the live site today (`getBoundingClientRect`, not just
      eyeballing a screenshot) showed the top-bar text was STILL pushed
      down by roughly a third of the hero's height, on every `PageHero`
      page, desktop included — the original bug, not a new one, just never
      actually fixed. Root-caused with a minimal standalone repro
      (`file://` HTML, isolated from the app): a `<source>` element inside
      a `display:contents` `<picture>`, nested in a flex container, is
      still counted by this Chromium version as an extra invisible flex
      item — `display:contents` doesn't reliably neutralize `<picture>`
      when it contains a `<source>`. `justify-between` then splits the free
      space across 3 slots instead of 2, which is exactly the "text pushed
      down by about a third" symptom. **Fixed at the root**: `<picture>` is
      now `absolute inset-0` directly (matching the `<img>`'s own
      positioning) instead of `contents` — an absolutely positioned element
      is never a flex item regardless of what's inside it, so the bug can't
      recur here. Verified via `getBoundingClientRect` (top-bar now sits
      exactly at `pt-4`/`pt-3`) and screenshots on every hero page at both
      breakpoints (Estrategia, Master Brand, Assets, Aplicaciones,
      Submarca) — all clean, scrims still render correctly (z-index
      preserved). **This means Round 15's own screenshot-based
      verification of this exact fix was insufficient** — worth pixel-
      measuring (`getBoundingClientRect`), not just screenshotting, when
      verifying flex/grid spacing fixes going forward, since a screenshot
      can look "close enough" at a glance while still being visibly wrong
      on inspection.
    - **3 confirmed spec corrections on the mobile hero**, from a fresh
      `get_design_context` fetch on Estrategia's `529:1846` AND Master
      Brand's `543:522` (both instances of the same shared "Hero 2 Mobile"
      component — confirmed identical structure/values on both, so this is
      a universal `PageHero` fix, not page-specific):
      1. **Title block was 64px/gap-1(4px)**, Figma's real spec is
         **56px/gap-3(12px)**.
      2. **Hero's own bottom padding was `pb-8` (32px)**, Figma's frame is
         uniform `p-[16px]` on all sides with no special bottom nudge — now
         `pb-4` (16px).
      3. **Top-bar row font/gap was `text-base`(16px)/`gap-3`(12px)**,
         Figma's real spec is **`text-[20px]`/`gap-5`(20px)**. Also
         confirmed (via pixel-measuring Figma's own screenshot, not just
         reading the exported code) that the top-bar row carries its OWN
         nested 16px padding on top of the header's 16px — 32px total inset
         — while the title block only gets the outer 16px; added `p-4
         md:p-0` to the top-bar div to match.
    - **Mobile hamburger glyph was wrong** — hand-drawn 3-line SVG at 24×24,
      `fixed top-4 right-4`. Figma's real glyph (part of the same shared
      component, node 2045:925-927, confirmed identical on every page) is 2
      plain 2px bars, 40px wide, 6px gap. Replaced the SVG with 2 `<span>`
      bars matching those exact dimensions, repositioned to `top-8 right-8`
      (32px) to match the confirmed top-bar inset above, using `pb-3 pl-3`
      (not padding on top/right) so the tap target grows down/left without
      shifting the visible bars off that anchor. The "X" close icon (no
      Figma mockup exists for the open state, per Round 13) keeps its
      previous custom shape, just repositioned the same way.
    - **Verified**: `npx tsc --noEmit`, `npm run build`, fresh
      `getBoundingClientRect` measurements confirming the fix on both
      breakpoints, screenshots of all 5 `PageHero` pages at both
      breakpoints, and a scripted click-test confirming the mobile menu
      still opens/shows the X icon/lists all 5 nav pages correctly.

    - **Same-day follow-up: Sofia flagged "ese gradiente tan extraño azul"
      on Aplicaciones and Submarca's hero photos, identical on mobile.**
      Root-caused, not guessed: `PageHero`'s `mobileScrim`/`desktopScrim`
      (the dark band that hides Figma's baked-in text on the screenshot-
      render workaround — confirmed via a fresh Figma screenshot that
      Figma's own design has **no scrim at all** here, so this is purely
      our own workaround, not a Figma spec to match) used a 2-stop
      "100% opaque, then one straight linear fade to 0%" gradient. That
      shape has a visible kink exactly at the point it starts fading — on
      Estrategia/Master Brand it's invisible because the photo in that zone
      is naturally low-contrast (blurred wall, flat blue illustration), but
      on Aplicaciones' white flyer and Submarca's actual "Nova express"
      store signage it showed up as a hard-edged seam, and on Submarca the
      old fade zone landed right on top of the signage, ghosting it in a
      washed-out blue. Confirmed by cropping and comparing the raw baked
      screenshots against the live rendered output side by side.
      **Fixed**: replaced the single linear fade in all 4 bands (mobile
      top/bottom, desktop top/bottom) with a multi-stop eased curve (holds
      solid a little longer — this hero's text also got taller in the
      Round 16 mobile-nav fix — then eases out over 4 steps instead of one
      straight line), and grew the top bands slightly (mobile `h-40`→`h-48`,
      desktop `h-56`→`h-64`) to give the ease more room. Re-screenshotted
      all 4 affected pages at both breakpoints — the hard seam and the
      signage ghost are both gone, reads as a soft vignette now. Re-checked
      Estrategia and Master Brand mobile too (shared component) to confirm
      no regression there — still clean, unchanged in effect.

    - **Immediate follow-up, same conversation: Sofia asked to remove the
      scrim entirely on Aplicaciones/Submarca, "solo dejar la imagen tal
      cual esta en figma."** Checked whether that was even possible before
      touching code: confirmed via a fresh fetch that both heroes' photos
      are still a frame-level fill on both breakpoints (no separate image
      child layer), and the MCP's raw asset export is still the same wrong
      crop documented in Round 12 (verified today: Aplicaciones desktop
      683×1024 portrait, cuts off "Súper" when force-fit into the landscape
      box — simulated it to show her directly). So neither existing source
      works without either a bad crop or a scrim — reported this
      concretely (with both broken-crop and no-scrim-ghosting renders sent
      as images) rather than picking one silently, and asked how she wanted
      to proceed.
    - **Resolved once Sofia supplied her own exports** (`~/Documents/
      submarca.png`, `~/Documents/design system .png` — she'd looked in
      Downloads first, then corrected herself to Documents): both are
      1240×578, matching the Hero instance's exact declared size, correctly
      cropped, and genuinely text-free — copied directly to
      `hero-submarca.png`/`hero-design-system.png`. For mobile, re-checked
      the MCP raw asset export one more time with fresh eyes instead of
      assuming Round 12's "broken" verdict still held for the *mobile*
      node specifically (it was only ever confirmed broken for desktop):
      turned out to be genuinely clean on both `2045:606` (Aplicaciones)
      and `2055:2174` (Submarca) — just needed a manual crop instead of
      Figma's own default position. Submarca's needed left/top anchoring
      specifically (a centered crop cuts the "Nova" half of the "Nova
      express" sign clean off — confirmed by comparing both crops side by
      side) — saved as fixed 390×844 files rather than relying on runtime
      `object-position` tuning.
    - **Removed `mobileScrim`/`desktopScrim` from both pages' `PageHero`
      usage** — no gradient at all now, exactly the photo as Figma shows
      it. Verified with fresh screenshots at both breakpoints on both
      pages: full "Nova express" signage and the full flyer are visible on
      Submarca/Aplicaciones with zero overlay. Text legibility on top of
      the raw photo is a bit tighter in a couple of spots (e.g. Submarca's
      "05/Sub-marcas" sits on a light floor) than it would be with a scrim,
      but that's the direct, informed tradeoff Sofia chose over any
      darkening — don't re-add a scrim here without asking again.
    - **`PageHero`'s scrim mechanism itself was left in place** (Estrategia
      and Master Brand's mobile heroes still need it — their raw exports
      are still genuinely broken, not re-verified as clean today) — updated
      its doc comment to reflect that Aplicaciones/Submarca no longer use
      it and why.
    - Verified with `npx tsc --noEmit` and `npm run build`.

    - **Immediate follow-up: Sofia reported the hero photos looking
      "stretched vertically."** Not literal CSS stretching (`object-fit:
      cover` mathematically can't do that) — root-caused by testing across
      viewport widths instead of just the usual desktop/mobile pair:
      reproduced at in-between sizes like 768×1024 and 1024×768 (tablets,
      or a non-maximized browser window), where `md:h-screen` still forces
      the hero to fill the FULL viewport height even though the width is
      much narrower than a normal desktop — for a ~2.145:1 photo, that
      meant `object-cover` had to zoom in hard enough to crop down to as
      little as ~35% of the photo's width, which reads as a bad, distorted
      zoom even though no pixel is actually non-uniformly scaled.
      **Fixed**: `PageHero`'s header height changed from `md:h-screen` to
      `md:h-[min(100vh,71vw)]` — caps the box's aspect ratio at ~1.4:1
      (solved for keeping ≥~65% of the photo's width visible), which only
      engages on unusually narrow/tall windows; every normal desktop
      viewport (16:9 or wider) already has `100vh < 71vw`, so `min()` still
      picks `100vh` and nothing changes there — verified with screenshots
      at 768×1024, 1024×768 (both dramatically improved — full "Nova
      express" signage visible now instead of just "express") and 1440×900/
      1920×1080 (pixel-identical to before, confirming no regression).
    - **Found a separate, pre-existing bug while testing this**, not yet
      fixed (out of scope for this request, flagging for later): every
      `PageHero` title (`text-[96px] md:...`, no intermediate step between
      mobile and desktop sizes) overflows past the right edge of the
      viewport at these same in-between widths — confirmed on Estrategia
      ("Brand Tree"), Master Brand ("Master Brand"), and Aplicaciones
      ("Aplicaciones master brand") all cut off mid-word at 768px width.
      Same root cause category as the photo issue (nothing scales down
      between the mobile breakpoint and full desktop), but a typography
      fix, not a height-cap fix — needs its own pass (likely a `lg:`-gated
      size step, or a `clamp()`) rather than folding into this change.
    - Also same session: reduced the desktop sidebar's own top padding
      (`Nav.tsx`'s `<nav>`, `pt-7`→`pt-5`, 28px→20px) alongside the
      already-20px top-level item gap, per Sofia's request while reviewing
      the sidebar in DevTools — another intentional deviation from Figma's
      literal spec, same rationale as the Round 15 gap change.
    - Verified with `npx tsc --noEmit` and `npm run build`.

    - **Immediate follow-up: Sofia said Estrategia's hero ("Brand Tree")
      still looked stretched and sent a photo.** Tested the SAME viewport
      matrix used to fix Aplicaciones/Submarca (1440×900, 1920×1080,
      1024×768, 768×1024, 1200×700, 1000×750, 390×844) and could not
      reproduce any stretching — asked her to confirm she was on
      `localhost:3000` (not the undeployed production URL) before digging
      further, given Round 14's exact false-alarm precedent; she confirmed
      localhost. Root cause turned out to be simpler once she sent the
      actual image: our `hero-estrategia.png` was 1024×572 (an older fetch,
      predating today's methodology), a different aspect ratio than the
      Hero instance's real 1240×578 — she'd separately grabbed a correct
      1240×578 export of the same photo (`~/Documents/bran tree.png`,
      already noted as a match back in this same round's earlier entry but
      not used since Estrategia wasn't thought to need it). Swapped it in
      the same way as Submarca/Aplicaciones. Verified clean at every
      viewport in the matrix above.
    - **Sidebar spacing, next pass**: with the top-level item gap and
      container top padding both already at 20px, the logo-to-menu gap
      (`gap-12`, 48px) was the one value left that visibly didn't match the
      new tighter rhythm — reduced to `gap-8` (32px). Confirmed via a
      cropped, zoomed screenshot of the sidebar before/after.
    - Verified with `npx tsc --noEmit` and `npm run build`.

    - **Full hero audit, all 5 pages, requested once the Estrategia fix
      landed.** Fetched fresh metadata for Master Brand's (`528:1227`) and
      Assets' (`551:2723`) real Hero instances to confirm the site-wide
      correct size — all 5 pages use the exact same `1240×578` Hero
      component, not page-specific sizes:
      - Estrategia, Aplicaciones, Submarca: `1240×578` ✓ (today's fixes).
      - Master Brand (`hero-master-brand-bg.jpg`, `4096×1899`): different
        resolution but the same ~2.145:1 aspect and, confirmed by
        downloading a fresh Figma screenshot of `528:1227` and comparing
        side by side, the identical blue-wave composition — no change
        needed, re-confirms Round 8's finding.
      - Assets (`hero-assets-bg.png`, `1914×3000` — portrait, initially
        looked wrong): also confirmed correct via a fresh Figma screenshot
        of `551:2723` — identical 5-vertical-color-bar composition, same
        order. The odd portrait export doesn't matter here because the
        content is uniform top-to-bottom (5 solid color columns), so
        `object-cover` cropping the height differently than Figma's own
        578px never changes what's visible — genuinely not a bug despite
        the unusual dimensions, just an odd export shape for a
        crop-agnostic image.
      - Confirmed every mobile hero shows the same underlying photo/pattern
        as its desktop counterpart: Estrategia and Master Brand's mobile
        (still the screenshot-render + scrim workaround) both match their
        desktop scene/pattern; Aplicaciones and Submarca's (today's clean
        raw crops) already confirmed same photo earlier this round; Assets
        still correctly has no mobile hero at all (by design, Figma has
        none).
    - Verified with `npx tsc --noEmit` and `npm run build`, plus screenshots
      of all 5 pages at both 1440×900 and the 768×1024 stress case.

    - **Immediate follow-up: Sofia flagged the same "weird blue gradient"
      on Estrategia and Master Brand's MOBILE heroes** — the last two pages
      still using `mobileScrim`. Screenshotted both and confirmed a visible
      hard-edged navy block, same class of issue as the Aplicaciones/
      Submarca fix earlier today, just not yet addressed here since these
      two were assumed to still need the scrim (no clean source found
      previously). Re-checked that assumption instead of just re-tuning the
      gradient again: fetched fresh `get_design_context` for both mobile
      hero nodes (`529:1846`, `543:522`) — the raw asset export is STILL
      the known bug (returns the desktop-shaped image: 1024×572 for
      Estrategia, 4096×1899 for Master Brand, confirmed by direct
      download), but unlike Aplicaciones/Submarca's flyer/signage photos,
      **these two source photos turned out to crop cleanly into the mobile
      box on their own** — Estrategia's family-dinner scene and Master
      Brand's abstract wave pattern don't have the "one specific sign/word
      that must stay in frame" constraint the other two had, so a plain
      `object-cover` crop (left-anchored for Estrategia to keep the mom's
      expression the focal point; centered for Master Brand, an abstract
      pattern with no wrong answer) already looks good. Saved as new fixed
      390×844 files, removed `mobileScrim` from both pages entirely — no
      page on the site uses the scrim mechanism anymore (kept in
      `PageHero.tsx` for a future page that might need it, with its doc
      comment rewritten to explain why raw-export-then-crop should be tried
      before falling back to it).
    - **Also this round: nav sizing/spacing corrected to match Figma's
      actual default-state reference exactly**, per a Figma link Sofia sent
      (node `239:64`, "Menu v1 / Predeterminado" — the collapsed/resting
      variant, different from `528:503`'s expanded-accordion variant that
      Round 15's gap-5 deviation was tuned against). This reverses today's
      earlier tightening in favor of matching this specific reference
      literally: container top padding `pt-5`(20px)→`pt-7`(28px, back to
      Figma's value), logo-to-list gap `gap-8`(32px)→`gap-14`(56px, bigger
      than either previous value), top-level item gap `gap-5`(20px)→
      `gap-[18px]` (Figma's exact number, no round Tailwind equivalent),
      and item font `text-base`(16px)→`text-[14px]`. Worth remembering:
      Figma's own "Menu v1" component apparently has different numbers
      across its own variants depending on collapsed/expanded state — don't
      assume one variant's spec generalizes to another without checking
      the specific node.
    - Verified with `npx tsc --noEmit` and `npm run build`, plus screenshots
      of both mobile heroes and the sidebar.

    - **Immediate follow-up #1: nav item vertical alignment.** Sofia sent a
      Figma inspector screenshot of "04 Aplicaciones de marca" and asked for
      the number/label/chevron to align to the top instead of floating
      centered against the label's 2-line wrapped height. Root cause:
      `NavLinks`' per-item `<Link>` used `items-center` — fine for every
      single-line item, but centers everything against the *tallest* item
      in the flex row once the label wraps to 2 lines, so "04" and the
      chevron ended up vertically centered between the two text lines
      instead of aligned with the first one. Changed to `items-start`
      (`Nav.tsx`) — harmless for single-line items (same height either way),
      fixes the wrapped one.
    - **Immediate follow-up #2: Estrategia's mobile hero "still looks
      stretched and weird," reopened after today's earlier fix.** Traced
      through several rounds instead of guessing once and moving on:
      1. Verified there's no actual pixel distortion (compared the crop's
         face against the same face cropped from the undistorted raw photo
         at the same relative region — identical proportions; the "wide
         open laughing" look is just how she's captured in the source
         photo, not a stretch artifact).
      2. Explained the real geometric constraint to Sofia: the source is a
         ~1.79:1 landscape photo, forced by `object-cover` into a ~0.46:1
         portrait mobile box, which mathematically requires ~1.48x zoom and
         only shows ~26% of the original width — that's what read as
         "stretched." Offered concrete alternatives (the current crop, an
         alternate anchor, a shorter/less-zoomed hero) rather than picking
         silently.
      3. She asked for the crop to just be automatic (plain `object-cover`,
         default center position) instead of a hand-picked anchor — tried
         it, and the *default* center crop happened to land on the
         daughter's out-of-focus hair with no clear subject, worse than any
         manual anchor. Reported this back rather than shipping a
         worse-looking "automatic" result just because it was simpler.
      4. She then pointed at a specific Figma node (`529:1847`) and asked to
         just match what's actually designed there. That node turned out to
         be **Figma's own pre-composed mobile screenshot** — not a plain
         `object-cover` crop at all, but a deliberately art-directed frame
         showing the full three-person scene, something no CSS crop of the
         raw landscape photo could reproduce (confirmed: this exact node
         was referenced once before, Round 15, but never actually used as
         the image source — only compared against for scrim calibration).
         Used it directly as `hero-estrategia-mobile.png`.
      5. That render has Figma's own baked-in text like every other
         screenshot-sourced hero, but only the TOP band ghosted when
         checked closely (zoomed screenshot comparison) — the bottom title
         area was already clean, no ghost, no scrim needed there. Rather
         than reapply the old all-or-nothing `mobileScrim`, split
         `PageHero`'s scrim props into four independent booleans
         (`mobileScrimTop`/`mobileScrimBottom`/`desktopScrimTop`/
         `desktopScrimBottom`) so a page can scrim only the band that
         actually needs it. Estrategia now uses `mobileScrimTop` only —
         confirmed via a zoomed crop of both bands that the top is fully
         clean and the bottom needed nothing extra.
      - **Lesson for next time a mobile hero "looks off" on a
        screenshot-sourced photo**: check for a second, adjacent Figma node
        (often `X:Y+1` next to the frame's own id) before concluding a
        custom CSS crop is the best available option — Figma sometimes
        already has the intended art-directed composition sitting one node
        away, and no amount of `object-position` tuning on the raw asset
        will match a deliberately composed multi-subject shot.
    - Verified with `npx tsc --noEmit`, `npm run build`, and zoomed
      screenshots of both the top and bottom text bands.

    - **Immediate follow-up #3: Sofia pasted a screenshot ("esta") of the
      family-dinner photo with NO text baked in at all**, at exactly
      390×844. Not accessible as a file directly from the pasted message —
      found it by searching Downloads for recently-added images:
      `~/Downloads/Hero 2 Mobile.png` (390×844) and `~/Downloads/Hero 2.png`
      (1240×578, byte-identical via `md5` to the `bran tree.png` already in
      use for the desktop hero — same source, confirms consistency). These
      are **manual Figma exports of just the image-fill layer** (done from
      Sofia's own Figma desktop app, selecting the layer directly and
      exporting) rather than a rendered screenshot of the composed frame —
      genuinely clean, no text, no baked anything. Swapped
      `hero-estrategia-mobile.png` for this file and removed
      `mobileScrimTop` entirely — Estrategia's mobile hero needs no scrim
      at all now, full stop. Verified via screenshot: clean family scene,
      real live text on top, zero ghosting, zero gradient.
    - **This changes the standing advice for the next photo-hero problem**:
      a manual Figma-desktop export of the specific image layer bypasses
      BOTH known problems at once (the MCP raw-export desktop-shape bug,
      and the get_screenshot-render's baked-in text) — it should be the
      *first* thing asked for when a hero photo's raw MCP export is broken,
      not a fallback after calibrating a screenshot+scrim workaround.
      Updated `PageHero.tsx`'s doc comment accordingly.
    - Verified with `npx tsc --noEmit` and `npm run build`.

    - **Committed, pushed, and deployed** (2026-09-10, end of this
      session): commit `dfcded2` on `main`, pushed to
      `github.com/soysoff/nova-brandbook`. Deployed with
      `npx vercel@latest --prod --yes --scope panoramabranding`
      (deployment `dpl_H28NcbnqMyckHDpynWRy93J5nPco`), aliased to
      `nova-brandbook-nine.vercel.app` as usual. Verified live: `/`,
      `/estrategia`, `/submarca` all return 200. Everything from Rounds
      15-16 (hero spacing root-cause fix, scrim removal on all 4 photo
      heroes, nav spacing/alignment fixes, "05 Sub-marcas" page,
      `screenshot.mjs` verification setup) is now live in production.

19. **Round 17 (2026-09-11) — Sofia asked for a plan covering everything
    pending: the AI-readable layer (called out as high priority), the
    GitHub↔Vercel auto-deploy status ("no entiendo por qué no está
    conectado"), and a new list of complaints (footer spacing, footer logo
    not linking home, a mobile menu redesign she mocked up herself, Assets'
    photography section diagramming). Planned via `EnterPlanMode`/
    `ExitPlanMode`, approved, then executed in one session.**
    - **Auto-deploy: was actually already connected — the "NOT connected"
      conclusion in earlier rounds was wrong, based on an incomplete signal.**
      `vercel project inspect nova-brandbook --scope panoramabranding` shows
      no "Git Repository" section at all — that's just a display gap in this
      CLI version, not proof of no connection. `npx vercel@latest git
      connect --scope panoramabranding` reported "already connected", and a
      real `git push origin main` immediately triggered an automatic
      Production build (confirmed via `vercel ls`, not a manual `vercel
      --prod`) that auto-promoted to the `nova-brandbook-nine.vercel.app`
      alias — repeated successfully across all 4 pushes this round. **Manual
      `vercel --prod` deploys are no longer necessary** for a normal code
      change; see "Where it lives" for the corrected story. Also confirmed
      via `gh` (now available in this environment, unlike every prior
      session) that Andrés/`PanoramaBranding` is a real accepted
      collaborator (read-only) — closes that long-open pending item.
    - **Built the AI-readable layer for the first time** (`src/lib/
      brand-data.ts`, `src/app/brand.json/route.ts`,
      `src/app/llms.txt/route.ts`, JSON-LD in `layout.tsx`). Route handlers,
      not static `public/` files — both read the same confirmed color/
      typography constants `assets/page.tsx` renders (moved there from an
      inline copy) and the same `NAV_PAGES` tree `Nav.tsx`/`ContentsToc` use,
      so neither can drift out of sync with the actual site. `/brand.json`
      also carries a `knownContentIssues` array (the Figma-source content
      bugs documented elsewhere in this file) explicitly marked as "not part
      of the brand system" for any human or model reading it. Verified live
      (both endpoints 200, JSON-LD present in page source) before and after
      deploy.
    - **Mobile menu rebuilt to Sofia's own design** (she doesn't consider
      this Figma-sourced — no mockup exists there either; this is her
      explicit design, given via two screenshots/node links). `Nav.tsx`:
      the panel now unfolds downward (a `translate-y` slide on an
      `overflow-hidden`-clipped wrapper) instead of fading in place; its top
      row swaps "Brand Book Guidelines / 2026" for the Nova logo while open;
      the hamburger's 2 bars morph into an X via `transform` (translate +
      rotate) instead of being swapped for an unrelated SVG path, and
      reverse the same way on close. **Found and fixed a real bug while
      building this**: the panel's blue background was on the outer,
      always-full-height wrapper instead of the inner sliding element, so
      the "closed" state still covered the whole screen solid blue — caught
      via screenshot, not assumed. Verified with a real click-through
      (open → screenshot matches Sofia's mockup almost exactly, X visible,
      list state correct → close → reverts cleanly).
    - **Home links added**: `PageHero`'s "Brand Book Guidelines" top-bar
      text (and Home's own equivalent text), the footer mark, and the new
      mobile-menu Nova logo all link to `/` now — confirmed via
      `read_page`/click test, not just visual inspection.
    - **Fixed the Round 16 typography-overflow bug** (never fixed, only
      diagnosed): `PageHero` titles jumped from 56px straight to 96px with
      no step between, overflowing the viewport at ~768-1024px widths.
      Replaced with `clamp(3.5rem,1rem+6vw,6rem)` — unchanged at normal
      desktop widths (confirmed exactly 96px at 1440px), scales down at
      in-between widths. That alone wasn't enough for 04's one-line title
      ("Aplicaciones master brand"): even after the font shrank, a flex
      item's default `min-width:auto` still refused to shrink below its one
      unbroken longest word ("Aplicaciones"), confirmed via
      `getComputedStyle` (not just a screenshot) showing the box genuinely
      unchanged after adding `break-words` alone. Added `min-w-0` too, which
      actually fixed it — the standard fix for this specific flexbox
      behavior, worth remembering if a similar overflow shows up elsewhere.
    - **Assets 3.8/3.9 photography — genuine layout mismatch fixed, not just
      re-flagged.** Sofia's complaint ("la diagramación de las fotos no es
      la misma... de Figma") was correct: a fresh `get_design_context` fetch
      on both real nodes (`574:3575`, `578:3976`) confirmed every gallery
      has its own bespoke row composition in Figma (1 full-width photo then
      3-equal then an asymmetric 523:373 pair for "Situaciones familiares";
      3-equal then two asymmetric 332:676 pairs for "Individuales" and
      "Mascotas"; 2-equal then an asymmetric 332:390:332 triple for
      "Producto en contexto") — never the flat, uniform 3-column wrap the
      old `PhotoGrid` always produced. Added `PhotoRow`/`PhotoRows`
      (relative `flex-grow` per photo, configurable inter-row gap) and
      rewired those galleries to it; "Render 3D" and "Usos incorrectos"
      keep the plain `PhotoGrid`/grid since both really are 3-equal in
      Figma too. 3.9's own two-image row also had a wrong gap (`gap-3`/12px
      coded vs. Figma's real `gap-[92px]`) and a wrong width split (equal
      `grid-cols-2` vs. Figma's real 676:367 ratio) — fixed the same way.
      **Does not attempt Figma's exact per-photo crop-zoom insets** (e.g. a
      photo shifted -50% and scaled to 198% to select part of itself) —
      that's a further level of fidelity than the row/grouping structure
      this fixed; flag for a closer look if that specific gap ever matters.
    - **Footer — investigated, not changed.** Sofia said the footer looks
      "muy pegado" (cramped) again. Pixel-measured the actual live gaps
      instead of guessing: 18px between "Volver arriba" and "¿Preguntas?"
      (matches Figma's own `gap-[18px]`), 24px between that cluster and the
      copyright block (matches Round 15's own deliberate widening from
      Figma's 12px, done at Sofia's explicit request that round) — both
      breakpoints currently match either a confirmed Figma value or her own
      prior explicit ask, nothing found "cramped" on `localhost:3000`
      itself. **Not changed** pending her confirmation — don't re-tune these
      numbers again without a fresh screenshot/specific complaint, per the
      "don't guess, verify" rule this project keeps re-learning the hard
      way. Only the footer logo→home link (see above) was actually touched.
    - **Not done this round, explicitly deferred:**
      - The full pixel-perfect audit pass across all 5 pages (this plan's
        own "do this last" phase) — everything above was itself a
        substantial round; this needs its own dedicated pass.
      - Sending the consolidated Figma-source content-bug list (Azul I
        duplicate naming, HotDays hex, Nova Express copy-pasted CMYK/RGB/
        PANTONE, numbering drift, duplicated Where/Who and iNova text — all
        already listed under "Known content bugs" above and now also in
        `/brand.json`'s `knownContentIssues`) to the design team — that's
        Sofia's action, not a code change.
      - `identificador-1.png`/`versiones-color-1.png` (Master Brand,
        byte-identical since the original Sept 2 download, Round 14) —
        still needs Sofia to confirm which one is actually correct before
        re-downloading anything.
    - Verified with `npx tsc --noEmit` and `npm run build` after every
      change (not just at the end), plus live browser checks (screenshots,
      `getComputedStyle`/`getBoundingClientRect`, and click-throughs) for
      every visual change — see above per item.
    - **Committed in 4 separate pushes, each auto-deployed** (see auto-deploy
      note above): AI-readable layer, mobile-menu + home-links, the
      typography fix, and the photography rebuild. All verified live on
      `nova-brandbook-nine.vercel.app` after each push, not just built
      locally.
