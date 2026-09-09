/**
 * Page header (Figma "Hero 2"/"Hero 3" desktop, "Hero 2 Mobile" mobile —
 * node 509:725/528:1227/551:2723 desktop, 529:1846 mobile for Estrategia).
 * Real spec, all live text over a background image:
 *  - Desktop: top bar "Brand Book Guidelines / 2026" in a row (32px
 *    Regular white); "{number}" + 2-line title (96px Bold white, 123px gap).
 *  - Mobile: top bar STACKED, not a row (20px Regular white — Figma pairs
 *    it with a static hamburger glyph baked into the mockup, which we skip
 *    since Nav.tsx already renders a real functional one in a sticky bar
 *    above every page); "{number}" + 2-line title stacked at 64px Bold.
 * One <picture> does the art-direction (different crop per breakpoint,
 * only one variant fetched) so there's a single real <h1> in the DOM, not
 * two copies toggled by CSS.
 *
 * Master Brand and Assets export a clean background (no text baked in) on
 * both breakpoints. Estrategia's specific photo has a persistent Figma MCP
 * asset-export bug on both desktop and mobile crops (confirmed on retry,
 * not transient) — the raw image fill always comes back blank, even though
 * get_screenshot composites it correctly. Until design re-exports that
 * asset, `scrim` renders a dark gradient over the area where the reliable
 * screenshot's baked-in text sits, with the real H1 on top of the scrim
 * instead of the (now-hidden) baked pixels.
 */
export default function PageHero({
  image,
  mobileImage,
  number,
  titleLines,
  scrim = false,
}: {
  image: string;
  mobileImage?: string;
  number: string;
  titleLines: [string, string];
  scrim?: boolean;
}) {
  return (
    <header
      className="relative w-full flex flex-col justify-between px-4 md:pl-[67px] md:pr-[38px] pt-4 md:pt-3 pb-8 md:pb-[38px] aspect-[390/844] md:aspect-[1240/578]"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={image} />
        <img
          src={mobileImage ?? image}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      </picture>
      {scrim && (
        <div
          className="absolute inset-x-0 bottom-0 h-[45%] md:h-[55%] -z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(8,51,94,0.9) 0%, rgba(8,51,94,0.55) 48%, rgba(8,51,94,0) 100%)",
          }}
        />
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between text-white gap-3 md:gap-0 text-base md:text-[32px] font-normal">
        <p>Brand Book Guidelines</p>
        <p>2026</p>
      </div>
      <h1 className="flex flex-col md:flex-row items-start gap-1 md:gap-[123px] text-white font-bold text-[64px] md:text-[96px] leading-[1.1] md:leading-[96px]">
        <span>{number}</span>
        <span>
          {titleLines[0]}
          <br />
          {titleLines[1]}
        </span>
      </h1>
    </header>
  );
}
