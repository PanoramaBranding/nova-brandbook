import Link from "next/link";

/**
 * Site footer — Figma "Footer" component, 2 variants (confirmed via
 * get_design_context on both breakpoints: desktop node 528:254
 * "Predeterminado" / 528:256 "Variante 2", mobile node 543:393
 * "Predeterminado" / 543:407 "Variante 2"):
 *  - "default" (Home): white bg, logo shown at both breakpoints, desktop
 *    row is justify-between (logo left, links right).
 *  - "gray" (Estrategia/Master Brand/Assets): bg-gris-5, logo hidden on
 *    desktop but genuinely IS shown on mobile in Figma — not an oversight,
 *    both mobile variants include the logo, only the desktop ones differ.
 * The three links group differently per breakpoint, not just re-wrapped:
 * desktop pairs "Volver arriba" with the contact block next to the copyright
 * block; mobile pairs the contact+copyright blocks together (32px gap) with
 * "Volver arriba" alone above (64px gap). Desktop's own two gaps are both
 * 72px (Sofia's explicit ask, 2026-09-11, Round 17 — supersedes Round 15's
 * 18px/24px deviation, which itself already superseded Figma's original
 * 18px/12px). Don't "correct" this back down without re-confirming with her.
 */
export default function Footer({
  variant = "gray",
  backToTopHref = "#",
}: {
  variant?: "default" | "gray";
  backToTopHref?: string;
}) {
  const gray = variant === "gray";
  return (
    <footer
      className={`flex flex-col items-start md:flex-row md:items-center gap-[120px] md:gap-3 pt-16 md:pt-[140px] pb-8 md:pb-[38px] px-4 md:px-[38px] ${
        gray ? "bg-gris-5 md:justify-end" : "justify-between"
      }`}
    >
      <Link href="/" aria-label="Ir a inicio" className={gray ? "md:hidden" : ""}>
        <img src="/brand/footer-mark.svg" alt="NovaVenta" className="h-[97px] w-auto" />
      </Link>

      {/* Mobile grouping: "Volver arriba" alone, then Preguntas+2026 paired */}
      <div className="flex flex-col gap-16 items-start text-azul-1 text-[20px] font-medium md:hidden">
        <a href={backToTopHref}>↑ Volver arriba</a>
        <div className="flex flex-col gap-8 items-start">
          <p>
            ¿Preguntas?
            <br />
            <a href="mailto:contacto@panoramabranding.co" className="hover:underline">
              contacto@panoramabranding.co
            </a>
          </p>
          <p>
            2026 Nova Venta.
            <br />
            Tu mundo está aquí, en Nova.
          </p>
        </div>
      </div>

      {/* Desktop grouping: "Volver arriba"+Preguntas paired, 2026 separate.
          Both gaps 72px — Sofia's explicit ask 2026-09-11 (Round 17),
          replacing Round 15's own 18px/24px deviation (itself already a
          deliberate departure from Figma's original 18px/12px). Don't
          "correct" this back down without re-confirming with her. */}
      <div className="hidden md:flex md:items-center gap-[72px] text-azul-1 text-[20px] font-medium">
        <div className="flex items-center gap-[72px]">
          <a href={backToTopHref} className="whitespace-nowrap">
            ↑ Volver arriba
          </a>
          <p>
            ¿Preguntas?
            <br />
            <a href="mailto:contacto@panoramabranding.co" className="hover:underline">
              contacto@panoramabranding.co
            </a>
          </p>
        </div>
        <p>
          2026 Nova Venta.
          <br />
          Tu mundo está aquí, en Nova.
        </p>
      </div>
    </footer>
  );
}
