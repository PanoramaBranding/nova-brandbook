/**
 * Page header (Figma "Hero 2"/"Hero 3" desktop, "Hero 2 Mobile" mobile —
 * node 509:725/528:1227/551:2723 desktop, 529:1846/543:522 mobile). Real
 * spec, all live text over a background image:
 *  - Desktop: top bar "Brand Book Guidelines / 2026" in a row (32px
 *    Regular white); "{number}" (96px Bold, leading-[120px]) + 2-line title
 *    (96px Bold, leading-[96px]), 123px gap between them.
 *  - Mobile: top bar STACKED, not a row (20px Regular white — Figma pairs
 *    it with a static hamburger glyph baked into the mockup, which we skip
 *    since Nav.tsx renders a real functional one as a floating button, not
 *    a bar, so it doesn't add height above this text); "{number}" + 2-line
 *    title stacked at 64px Bold.
 * `h-svh`/`h-screen` (not an aspect-ratio box) so the hero always fills the
 * initial viewport, matching how it reads on first load in Figma — an
 * aspect-locked box was frequently shorter than the actual screen.
 * One <picture> does the art-direction (different crop per breakpoint,
 * only one variant fetched) so there's a single real <h1> in the DOM, not
 * two copies toggled by CSS.
 *
 * `mobileScrim`: Estrategia's mobile hero is the one exception to "clean,
 * text-free background". Its "Hero 2 Mobile" frame (529:1846) has no
 * separate image layer — the photo is a frame-level fill with no
 * extractable child node — and the raw asset export returns a *different,
 * more zoomed-in* crop of the same photo than what the frame actually
 * shows (confirmed by comparing the export against a screenshot of the
 * frame: different content is visible — a window, a third child — not
 * just a blank/broken export like the false alarm documented earlier).
 * So the mobile image here is the screenshot render (correct crop, but
 * with Figma's own text baked into the pixels), and `mobileScrim` darkens
 * the top and bottom bands where that baked text sits so the real text
 * rendered on top reads cleanly instead of double-exposing over it.
 */
export default function PageHero({
  image,
  mobileImage,
  number,
  titleLines,
  mobileScrim = false,
}: {
  image: string;
  mobileImage?: string;
  number: string;
  titleLines: [string, string];
  mobileScrim?: boolean;
}) {
  return (
    <header
      className="relative w-full h-svh md:h-screen flex flex-col justify-between px-4 md:pl-[67px] md:pr-[38px] pt-4 md:pt-3 pb-8 md:pb-[38px]"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={image} />
        <img
          src={mobileImage ?? image}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      </picture>
      {mobileScrim && (
        <>
          <div
            className="md:hidden absolute inset-x-0 top-0 h-32 -z-10"
            style={{
              background: "linear-gradient(to bottom, rgba(8,51,94,0.75) 0%, rgba(8,51,94,0) 100%)",
            }}
          />
          <div
            className="md:hidden absolute inset-x-0 bottom-0 h-[45%] -z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(8,51,94,0.9) 0%, rgba(8,51,94,0.55) 48%, rgba(8,51,94,0) 100%)",
            }}
          />
        </>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between text-white gap-3 md:gap-0 text-base md:text-[32px] font-normal">
        <p>Brand Book Guidelines</p>
        <p>2026</p>
      </div>
      <h1 className="flex flex-col md:flex-row items-start gap-1 md:gap-[123px] text-white font-bold text-[64px] md:text-[96px]">
        <span className="leading-[1.1] md:leading-[120px]">{number}</span>
        <span className="leading-[1.1] md:leading-[96px]">
          {titleLines[0]}
          <br />
          {titleLines[1]}
        </span>
      </h1>
    </header>
  );
}
