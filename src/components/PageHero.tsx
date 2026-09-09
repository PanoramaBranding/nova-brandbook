/**
 * Page header (Figma "Hero 2"/"Hero 3" desktop, "Hero 2 Mobile" mobile —
 * node 509:725/528:1227/551:2723 desktop, 529:1846/543:522 mobile). Real
 * spec, all live text over a background image:
 *  - Desktop: top bar "Brand Book Guidelines / 2026" in a row (32px
 *    Regular white); "{number}" (96px Bold, leading-[120px]) + 2-line title
 *    (96px Bold, leading-[96px]), 123px gap between them.
 *  - Mobile: top bar STACKED, not a row (20px Regular white — Figma pairs
 *    it with a static hamburger glyph baked into the mockup, which we skip
 *    since Nav.tsx already renders a real functional one in a sticky bar
 *    above every page); "{number}" + 2-line title stacked at 64px Bold.
 * One <picture> does the art-direction (different crop per breakpoint,
 * only one variant fetched) so there's a single real <h1> in the DOM, not
 * two copies toggled by CSS.
 */
export default function PageHero({
  image,
  mobileImage,
  number,
  titleLines,
}: {
  image: string;
  mobileImage?: string;
  number: string;
  titleLines: [string, string];
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
