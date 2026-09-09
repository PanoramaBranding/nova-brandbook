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
  ContentsToc.tsx        mid-page "Contenidos" TOC block (Master Brand,
                        Assets) — duplicates the sidebar nav on purpose,
                        see the component's own doc comment for why
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
2. **Assets 3.8/3.9 — photography reference images still pending**
   (`AssetPending` placeholders). Copy is complete (including the AI
   generation prompts, which Sofia confirmed should be public); only the
   actual reference photos are missing. Separately, **Assets had the same
   missing-sections bug as Master Brand** — fetched its desktop node
   directly in Round 7 and found the same "Quote" block + "Contenidos" TOC
   block absent (Figma nodes `551:2733` and `553:2736`). Added both. Since
   the TOC pattern now appears on two pages with identical structure, it's
   extracted into `src/components/ContentsToc.tsx` — Master Brand was
   refactored to use it too instead of its inline copy. Estrategia does
   *not* have this block in Figma (confirmed directly), so don't add it
   there. The rest of Assets' body (3.1–3.13) was not re-audited this
   round — it already got a full line-by-line pass in Round 5.
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
