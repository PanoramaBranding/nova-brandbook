# Project Context — Nova Brand Book

A record of how this site was designed, built, deployed, and the decisions made
along the way — so a future session (or Sofia) can pick this up cold. Last
updated: 2026-09-09 (Round 7 — hero rebuild + mobile pixel-perfect audit).

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
- **Auto-deploy: NOT connected.** When first attempted (on the old account),
  Vercel's GitHub App couldn't attach to the repo ("Failed to connect
  soysoff/nova-brandbook to project") — likely because the Vercel GitHub App
  only had access to a limited repo list under that account. Re-check this
  from scratch on the `panoramabranding` team — it may just work now, or may
  need the same fix (https://github.com/settings/installations → "Vercel" →
  Configure → add `nova-brandbook` to repository access) applied to whichever
  GitHub account/org is connected to the `panoramabranding` Vercel team.
- **Manual deploy (current workflow):**
  ```bash
  git add -A && git commit -m "..." && git push origin main
  npx vercel@latest --prod --yes --scope panoramabranding
  ```
  (`.vercel/project.json` is already linked to the right project, so
  `--scope` may not even be required — include it anyway to be safe.)
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
  - Pages "04 DESIGN SYSTEM" and "05 SUBMARCA" exist and are numbered 4.x/5.x
    in the site's own index/nav data, but are **out of scope for now**
    (confirmed with Sofia) — hidden from the nav.

## Decisions confirmed with Sofia

1. **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed
   on Vercel.
2. **Reusable system:** components (`src/components/`) stay generic; Nova
   content lives in `src/lib/` data and each page's own file.
3. **Scope:** 4 pages for now — Home, Estrategia (`01`), Master Brand (`02`),
   Assets (`03`). Sections `04`/`05` exist in Figma, out of scope.
4. **Azul I = `#2B7DF6`** (the documented value in Figma's 3.1 palette page),
   **not** `#007EFA` (the value baked into Figma's Variables/components,
   which is stale). Use `#2B7DF6` everywhere "Azul I" appears.
5. **Typography:** Plus Jakarta Sans — Google Fonts, free license, no
   self-hosting needed.
6. **AI-readable layer:** full stack — semantic HTML + JSON-LD (schema.org)
   + a `llms.txt`/`brand.json` file with the brand tokens in plain text.
   **Not built yet** — next up.
7. **Mobile nav:** Figma has **no mobile design for the nav at all** (checked
   every mobile frame and the Componentes section — nothing). The hamburger
   + full-screen panel is an interaction pattern designed here, not
   extracted from Figma. Flag for design review.
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

## File map

```
src/app/
  layout.tsx           root layout: fonts, <Nav/>, flex row (col on mobile)
  globals.css          design tokens (Tailwind v4 @theme)
  page.tsx             Home
  estrategia/page.tsx  01 · Estrategia de marca (Brand Tree)
  master-brand/page.tsx  02 · Master Brand
  assets/page.tsx      03 · Brand Assets
src/components/
  Nav.tsx              sticky sidebar (desktop) + hamburger/panel (mobile);
                        accordion by route + scroll-spy (position-based, not
                        IntersectionObserver — see Known quirks)
  PageHero.tsx          page header: real visible <h1> (number + 2-line
                        title) over a background image via <picture>, with a
                        different crop per breakpoint — a single H1 in the
                        DOM, not duplicated markup toggled by CSS (see quirks
                        for the one exception, Estrategia's scrim)
  Footer.tsx            inner-page footer (gray bg, no logo, right-aligned)
  Button.tsx            Figma "Boton" — outline/filled variants
  HeroMark.tsx           Home's composited NovaVenta lockup (9 SVG fragments)
  AssetPending.tsx       placeholder for sections we chose not to fabricate
                        (real photos, a few diagrams) — see Pending below
src/lib/nav-data.ts     sitemap data: page slugs/labels + anchor ids per page
public/brand/           downloaded Figma assets, one subfolder per page/use
  home/ estrategia/ master-brand/ assets/ heroes/
```

## Known quirks (intentional, don't "fix")

- **`PageHero` renders a real `<h1>` over a background image, not baked-in
  text** (fixed 2026-09-09 — Sofia flagged the original screenshot-render
  approach as wrong: it had Figma's own title text baked into the image
  pixels instead of being real, readable markup). Master Brand and Assets
  now use clean background-only exports (no text baked in) on both
  breakpoints. **Estrategia is the one exception:** its specific photo has a
  persistent Figma MCP asset-export bug — the raw image-fill export comes
  back blank on *both* desktop and mobile crops (confirmed on two separate
  retries, not transient), even though `get_screenshot` composites the same
  node correctly. Until design re-exports that asset, Estrategia's hero uses
  the `get_screenshot` render as the background plus a CSS gradient scrim
  (`scrim` prop) over the area where the screenshot's baked-in text sits, so
  the real `<h1>` on top is legible and the old baked pixels are hidden
  underneath. If design re-exports a clean asset for Estrategia, drop the
  `scrim` prop and switch its `image`/`mobileImage` to the new export.
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

0. **Verify Andrés accepted the GitHub collaborator invite** (`PanoramaBranding`,
   read access, invited 2026-09-02 for a security review) — still couldn't
   confirm on 2026-09-09 (retried at the start of Round 7): `gh` and `brew`
   are both unavailable in this environment, and an unauthenticated
   `curl https://api.github.com/users/soysoff` returns no public email (most
   users keep it private, expected). Check via
   `gh api repos/soysoff/nova-brandbook/invitations` from a machine with `gh`
   installed, or the repo's Settings → Collaborators page.
0b. **GitHub account email vs. Vercel/git identity** — same blocker as
   above (no `gh`/`brew` this session). Sofia needs to check
   `github.com/settings/emails` herself to confirm the `soysoff` GitHub
   account's verified email matches `sofia@panoramabranding.co` (the email
   used for the local git identity and the Vercel account) — matters once
   GitHub↔Vercel auto-deploy is connected.
1. ~~Master Brand — needs the same rigorous re-audit Assets just got~~ —
   **done in Round 7:** full `get_design_context` audit of both the desktop
   node and mobile frame (`543:519`); fixed 4 mobile spacing mismatches (see
   Round 7 below). The shared `Button` component was checked too — already
   pixel-perfect against the "Boton" spec, no change needed.
2. **Assets 3.8/3.9 — photography reference images still pending**
   (`AssetPending` placeholders). Copy is complete (including the AI
   generation prompts, which Sofia confirmed should be public); only the
   actual reference photos are missing.
3. **`llms.txt` / `brand.json` / JSON-LD** — the core "AI-readable"
   differentiator from the original brief. Not started.
4. **GitHub↔Vercel auto-deploy** not connected. Now that the project lives
   under the correct `panoramabranding` Vercel team (see "Where it lives"),
   try `vercel git connect --scope panoramabranding` fresh before assuming
   the old GitHub-App-permissions fix is still needed — the earlier failure
   happened on the wrong account and may not recur.
5. ~~Mobile responsive pass — only spot-checked~~ — **substantially done in
   Round 7:** Home, Estrategia, and Master Brand were all audited directly
   against their real Figma mobile frames (not just CSS breakpoints assumed
   correct) and every hero now art-directs a real per-breakpoint crop.
   Assets confirmed (again) to have no mobile design in Figma. Still open:
   Master Brand's *desktop* re-audit for the same body sections is done
   (see item 1), but a final round of visual comparison in an actual mobile
   browser (this session only had `curl`+HTML-parse + Figma screenshots to
   verify against, no live browser) is worth doing before calling mobile
   fully signed off.
6. **Home page** was built earliest and least rigorously re-verified —
   still worth a fresh full audit pass with the same method used on Assets
   (Round 7 only touched Home's hero + a couple of already-known mobile
   sizing fixes from a prior session, not a fresh line-by-line pass).
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
     background-only exports; Estrategia keeps a documented scrim workaround
     for a confirmed persistent Figma export bug (see "Known quirks").
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
   - **GitHub email check:** still blocked — `gh`/`brew` unavailable, same as
     the prior session. Not a new finding, just re-confirmed.
   - Pattern holds again: every mismatch found this round was in a mobile
     layout that had only ever been *assumed* to inherit correctly from the
     desktop-first responsive classes, never checked against Figma's actual
     mobile frame. Same lesson as Round 5, just for breakpoints instead of
     whole sections.
