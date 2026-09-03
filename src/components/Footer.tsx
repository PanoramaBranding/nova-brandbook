/**
 * Footer used on the inner pages (Estrategia/Master Brand/Assets) — Figma
 * "Footer" component, "Variante 2" (node 528:280 / 543:1400 / 578:4202,
 * identical across all three). Different from Home's footer: light gray
 * background, no logo, right-aligned.
 */
export default function Footer() {
  return (
    <footer className="bg-gris-5 flex justify-end pt-16 md:pt-[140px] pb-10 md:pb-16 px-6 md:px-[38px]">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-4 text-azul-1 text-base md:text-[20px] font-medium">
        <a href="#top">↑ Volver arriba</a>
        <p>
          ¿Preguntas?
          <br />
          contacto@panoramabranding.co
        </p>
        <p>
          2026 Nova Venta.
          <br />
          Tu mundo está aquí, en Nova.
        </p>
      </div>
    </footer>
  );
}
