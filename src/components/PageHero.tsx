import Link from "next/link";

/**
 * Page header (Figma "Hero 2"/"Hero 3" desktop, "Hero 2 Mobile" mobile —
 * node 509:725/528:1227/551:2723 desktop, 529:1846/543:522 mobile). Real
 * spec, all live text over a background image:
 *  - Desktop: top bar "Brand Book Guidelines / 2026" in a row (32px
 *    Regular white); "{number}" (96px Bold, leading-[120px]) + 2-line title
 *    (96px Bold, leading-[96px]), 123px gap between them.
 *  - Mobile: top bar STACKED, not a row (20px Regular white, gap-[20px]
 *    between the two lines — Figma's "Nav - mobile" component, node
 *    2045:922-927, reused identically across every page's mobile hero,
 *    confirmed 2026-09-10 by fetching both Estrategia's 529:1846 and Master
 *    Brand's 543:522 fresh); "{number}" + 2-line title stacked at 56px
 *    Bold, gap-[12px]. The top-bar row carries its OWN nested 16px padding
 *    on top of the header's own 16px (confirmed by pixel-measuring the
 *    Figma screenshot: the top bar sits ~32px from the edges while the
 *    title block sits at only ~16px) — see the `p-4` on the top-bar div
 *    below. The hamburger glyph itself (2 plain 2px bars, 40px wide,
 *    6px gap) is part of that same Figma component; `Nav.tsx` renders it
 *    as a real functional `fixed` button positioned to match this same
 *    32px inset rather than living in this component's own flex flow (see
 *    `Nav.tsx` for why: matching the row's height, not adding a new one,
 *    is what keeps it from pushing the hero's own content down).
 * `h-svh`/`h-screen` (not an aspect-ratio box) so the hero always fills the
 * initial viewport, matching how it reads on first load in Figma — an
 * aspect-locked box was frequently shorter than the actual screen.
 * `md:h-[min(100vh,71vw)]` (not a plain `md:h-screen`) caps how tall that
 * box can get relative to its own width: 2026-09-10, Sofia flagged the
 * desktop hero photos looking "stretched" on an in-between window size —
 * reproduced at e.g. 768×1024/1024×768 (a `md:h-screen` box there is much
 * taller relative to its width than these ~2.145:1 photos, so
 * `object-cover` has to zoom in hard and crop away most of the width —
 * nothing is literally stretched, but cropping down to ~35% of the photo's
 * width reads as a bad, "stretched-looking" zoom). 71vw keeps the box's
 * aspect ratio from dropping below ~1.4:1, which keeps at least ~65% of
 * the photo's width on screen — chosen by solving for that target, not a
 * round number. Doesn't affect any normal desktop viewport (16:9 or wider
 * always has 100vh < 71vw already, so `min()` still picks 100vh, unchanged
 * from before) — only kicks in on unusually narrow/tall windows.
 * One <picture> does the art-direction (different crop per breakpoint,
 * only one variant fetched) so there's a single real <h1> in the DOM, not
 * two copies toggled by CSS.
 *
 * `mobileScrim`/`desktopScrim`: for pages whose photo is a frame-level fill
 * with no extractable child image layer, where a `get_screenshot` render
 * (correct crop, Figma's own text baked into the pixels) was once the only
 * source available — the scrim darkens just the top/bottom bands where
 * that baked text sits, so our real live text reads cleanly instead of
 * double-exposing over it. **As of 2026-09-10, no page uses this anymore.**
 * All 4 photo pages (Estrategia, Master Brand, Aplicaciones, Submarca) hit
 * this at one point or another; every one was eventually resolved the same
 * way — either a manually-sourced clean export, or discovering the MCP's
 * own raw asset export (which returns the DESKTOP-shaped image even for a
 * "…Mobile" node — a real, still-unfixed Figma export bug, not something
 * that goes away with time) is actually clean enough to use directly on
 * mobile once cropped with the right `object-position` (a plain center
 * crop can cut off the meaningful part of a landscape photo forced into a
 * portrait box — check each one visually before assuming center is fine).
 * Sofia flagged the scrim itself as a visible hard-edged "gradient" once
 * lit up against a bright/high-contrast photo (Aplicaciones' flyer,
 * Submarca's actual "Nova express" sign, and Estrategia's mobile photo too,
 * briefly — see below). Estrategia's own mobile hero went through a couple
 * more rounds after Aplicaciones/Submarca were already fixed: `529:1847`
 * (a `get_screenshot` render, still baked-text) only fixed the "wrong
 * crop"/zoom complaint, not fully — Sofia then supplied `Hero 2 Mobile.png`
 * from her Downloads, a **manual Figma export of just the image-fill layer,
 * no text at all** (same underlying source as the screenshot, but exported
 * directly rather than rendered as a composed screenshot) — that removed
 * the need for a scrim entirely. **Lesson: when the MCP's raw asset export
 * for a node is broken (the desktop-shape bug above) and a
 * `get_screenshot` render is the fallback, a manual export from Sofia's own
 * Figma desktop app can outright bypass both problems at once** — worth
 * asking for before spending more time calibrating a screenshot+scrim
 * workaround. The scrim mechanism below is kept available for a *future*
 * page that genuinely needs it, but treat that as the last resort: always
 * check whether the MCP's raw
 * export for that specific node is usable first.
 *
 * `titleLines` accepts either the usual 2-line tuple, or a single string
 * for titles that wrap naturally instead of being explicitly split (04's
 * "Aplicaciones master brand" wraps to "Aplicaciones" / "master brand" on
 * its own at this width per Figma's own screenshot — it isn't two authored
 * lines like the other pages).
 */
export default function PageHero({
  image,
  mobileImage,
  number,
  titleLines,
  mobileScrimTop = false,
  mobileScrimBottom = false,
  desktopScrimTop = false,
  desktopScrimBottom = false,
}: {
  image: string;
  mobileImage?: string;
  number: string;
  titleLines: [string, string] | string;
  mobileScrimTop?: boolean;
  mobileScrimBottom?: boolean;
  desktopScrimTop?: boolean;
  desktopScrimBottom?: boolean;
}) {
  return (
    <header
      className="relative w-full h-svh md:h-[min(100vh,71vw)] flex flex-col justify-between px-4 md:pl-[67px] md:pr-[38px] pt-4 md:pt-3 pb-4 md:pb-[38px]"
    >
      {/* `absolute`, not `display:contents`: `contents` alone (the original
          fix — see git history) still left the top-bar text pushed roughly
          halfway down the hero, on EVERY page, desktop included — a real,
          confirmed-live bug, not fixed by Round 15's own verification.
          Root-caused 2026-09-10 with a minimal repro: a `<source>` inside a
          `display:contents` `<picture>`, nested in a flex container, is
          still counted as an extra (invisible) flex item by this Chromium
          version — `justify-between` then splits the free space across 3
          slots instead of 2, shoving the real top-bar item down by roughly
          a third of the hero's height. `display:contents` never reliably
          neutralizes `<picture>` this way in the first place; making the
          `<picture>` itself `absolute` (matching the `<img>`'s own
          positioning) sidesteps the bug entirely, since absolutely
          positioned elements are never flex items regardless of what's
          inside them. */}
      <picture className="absolute inset-0 -z-10 block">
        <source media="(min-width: 768px)" srcSet={image} />
        <img
          src={mobileImage ?? image}
          alt=""
          className="size-full object-cover"
        />
      </picture>
      {/* A real gradient (fading opacity from the first pixel) let Figma's
          baked-in text ghost through — measured via screenshot: near the
          fade end, where the title numeral/lines actually sit, opacity
          had dropped to ~0.6. First fix held solid all the way through a
          large band, which killed the ghost but also blotted out roughly
          half the photo — Sofia compared it directly against Figma's own
          mobile screenshot (node 529:1847) and Figma barely darkens the
          photo at all; it relies on the photo's own dark tones. Re-fixed
          by measuring PageHero's *own* real text position and sizing the
          solid zone to hug just that, not a sweeping fraction of the hero.
          2026-09-10: a plain 2-stop "solid then linear fade" reads as a
          visible hard seam on any photo with detail in that zone — flagged
          by Sofia on Aplicaciones/Submarca (a straight edge cutting across
          the flyer/signage), most obvious on Submarca where the fade zone
          used to land right on the store's own "Nova express" sign,
          ghosting it in a washed-out blue. Every band below now: (a) holds
          solid a little longer (this hero's own text got taller in the
          Round 16 mobile-nav fix, and the extra hold clears Submarca's
          sign), then (b) eases out over several stops instead of one
          straight line, which reads as a soft vignette instead of a cut. */}
      {mobileScrimTop && (
        <div
          className="md:hidden absolute inset-x-0 top-0 h-48 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,51,94,1) 0%, rgba(8,51,94,1) 65%, rgba(8,51,94,0.75) 76%, rgba(8,51,94,0.45) 85%, rgba(8,51,94,0.18) 93%, rgba(8,51,94,0) 100%)",
          }}
        />
      )}
      {mobileScrimBottom && (
        <div
          className="md:hidden absolute inset-x-0 bottom-0 h-[38%] -z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(8,51,94,1) 0%, rgba(8,51,94,1) 78%, rgba(8,51,94,0.75) 85%, rgba(8,51,94,0.45) 91%, rgba(8,51,94,0.18) 96%, rgba(8,51,94,0) 100%)",
          }}
        />
      )}
      {desktopScrimTop && (
        <div
          className="hidden md:block absolute inset-x-0 top-0 h-64 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,51,94,1) 0%, rgba(8,51,94,1) 65%, rgba(8,51,94,0.75) 76%, rgba(8,51,94,0.45) 85%, rgba(8,51,94,0.18) 93%, rgba(8,51,94,0) 100%)",
          }}
        />
      )}
      {desktopScrimBottom && (
        <div
          className="hidden md:block absolute inset-x-0 bottom-0 h-[48%] -z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(8,51,94,1) 0%, rgba(8,51,94,1) 75%, rgba(8,51,94,0.75) 82%, rgba(8,51,94,0.45) 89%, rgba(8,51,94,0.18) 95%, rgba(8,51,94,0) 100%)",
          }}
        />
      )}
      <Link
        href="/"
        className="p-4 md:p-0 flex flex-col md:flex-row md:items-center md:justify-between text-white gap-5 md:gap-0 text-[20px] md:text-[32px] font-normal"
      >
        <p>Brand Book Guidelines</p>
        <p>2026</p>
      </Link>
      <h1 className="flex flex-col md:flex-row items-start gap-3 md:gap-[123px] text-white font-bold text-[56px] md:text-[96px]">
        <span className="leading-[1.1] md:leading-[120px]">{number}</span>
        <span className="leading-[1.1] md:leading-[96px]">
          {Array.isArray(titleLines) ? (
            <>
              {titleLines[0]}
              <br />
              {titleLines[1]}
            </>
          ) : (
            titleLines
          )}
        </span>
      </h1>
    </header>
  );
}
