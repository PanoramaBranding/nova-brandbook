import Image from "next/image";

/**
 * Page header (Figma "Hero 2"/"Hero 3", node 509:725 / 528:1227 / 551:2723).
 * Real spec: 578×1240 image background, "Brand Book Guidelines / 2026" top
 * bar (32px Regular white), and a "{number} {titleLine1}/{titleLine2}"
 * block (96px Bold white, 123px gap between number and title) — all live
 * text, not baked into the image.
 *
 * Master Brand and Assets export a clean background (no text baked in).
 * Estrategia's specific photo has a persistent Figma MCP asset-export bug
 * (confirmed on retry, not transient) — the raw image fill always comes
 * back blank, even though get_screenshot composites it correctly. Until
 * design re-exports that asset, its `scrim` prop is set so a dark gradient
 * covers the area where get_screenshot's baked-in text sits, and the real
 * H1 renders on top of the scrim instead of the (now-hidden) baked pixels.
 */
export default function PageHero({
  image,
  number,
  titleLines,
  scrim = false,
}: {
  image: string;
  number: string;
  titleLines: [string, string];
  scrim?: boolean;
}) {
  return (
    <header
      className="relative w-full flex flex-col justify-between px-6 md:pl-[67px] md:pr-[38px] pt-3 pb-6 md:pb-[38px]"
      style={{ aspectRatio: 1240 / 578 }}
    >
      <Image src={image} alt="" fill priority className="object-cover -z-10" />
      {scrim && (
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] -z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(8,51,94,0.85) 0%, rgba(8,51,94,0.55) 45%, rgba(8,51,94,0) 100%)",
          }}
        />
      )}
      <div className="flex items-center justify-between text-white text-lg md:text-[32px] font-normal">
        <p>Brand Book Guidelines</p>
        <p>2026</p>
      </div>
      <h1 className="flex items-start gap-6 md:gap-[123px] text-white font-bold text-4xl sm:text-5xl md:text-[96px] leading-[1.1] md:leading-[96px]">
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
