import Image from "next/image";

/**
 * Page header (Figma "Hero 2"/"Hero 3", node 509:725 / 528:1227 / 551:2723).
 * The real image FILL export for this component came back blank/wrong for
 * two of the three pages (Figma MCP asset-export glitch, not a design
 * issue — get_screenshot rendered them correctly). Using the verified
 * screenshot render as the background — with the real heading/kicker text
 * baked in at the exact position designed — was the reliable fix, at the
 * cost of that text not being live DOM text. A visually-hidden real <h1>
 * keeps the page accessible and AI-readable; swap for a live-text overlay
 * if design ever re-exports a clean background-only asset.
 */
export default function PageHero({
  image,
  number,
  title,
}: {
  image: string;
  number: string;
  title: string;
}) {
  return (
    <header className="relative w-full" style={{ aspectRatio: 1240 / 578 }}>
      <Image src={image} alt="" fill priority className="object-cover" />
      <h1 className="sr-only">
        {number} {title}
      </h1>
    </header>
  );
}
