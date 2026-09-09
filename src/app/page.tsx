import Link from "next/link";
import HeroMark from "@/components/HeroMark";
import { NAV_PAGES, isGroups } from "@/lib/nav-data";

export default function Home() {
  return (
    <div>
      {/* Hero — Figma node 528:1264 */}
      <section className="bg-azul-1 flex flex-col gap-24 md:gap-[106px] pt-3 pb-9 px-6 md:px-[38px]">
        <div className="flex items-center justify-between text-white text-lg md:text-[32px] font-normal">
          <div className="flex gap-6 md:gap-[150px]">
            <p>Nova</p>
            <p>Brand Book Guidelines</p>
          </div>
          <p>2026</p>
        </div>
        <HeroMark />
      </section>

      {/* Bienvenida — Figma node 504:199 */}
      <section className="flex justify-end py-12 md:py-[90px] px-6 md:pl-[497px] md:pr-[38px]">
        <p className="text-azul-1 text-2xl md:text-[36px] leading-[1.3] max-w-[905px]">
          Bienvenido a las directrices de marca de NovaVenta. Utiliza estos recursos y
          lineamientos al preparar materiales para aplicar la identidad de manera
          consistente. Los recursos proporcionados son las herramientas necesarias para
          lograrlo.
        </p>
      </section>

      {/* Índice — Figma node 505:259. Solo se listan las páginas en alcance
          (01-03); 04 y 05 existen en Figma pero quedan fuera por ahora. */}
      <section id="index" className="flex flex-col gap-16 px-6 md:px-[38px] pb-24">
        <div className="flex flex-col gap-8">
          <h1 className="text-azul-1 font-bold text-5xl md:text-[96px]">Index</h1>
          <div className="border-t border-azul-1/30" />
        </div>

        <div className="flex flex-col gap-16">
          {NAV_PAGES.map((page) => (
            <div key={page.slug} className="flex flex-col gap-16">
              <div className="flex flex-col md:flex-row md:justify-between gap-6">
                <h2 className="text-azul-2 font-semibold text-[28px] md:text-[40px] shrink-0">
                  {page.number} {page.label}
                </h2>
                <IndexEntries page={page} />
              </div>
              <div className="border-t border-azul-1/30" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer — Figma node 528:254 */}
      <footer className="flex flex-col md:flex-row items-start md:items-center justify-between gap-16 md:gap-8 pt-16 md:pt-[140px] pb-9 px-6 md:px-[38px]">
        <img src="/brand/home/footer-mark.svg" alt="NovaVenta" className="h-[97px] w-auto" />
        <div className="flex flex-col md:flex-row gap-8 md:gap-[18px] items-start md:items-center text-azul-1 text-[20px] font-medium">
          <a href="#index" className="whitespace-nowrap">
            ↑ Volver arriba
          </a>
          <p>
            ¿Preguntas?
            <br />
            contacto@panoramabranding.co
          </p>
        </div>
        <p className="text-azul-1 text-[20px] font-medium">
          2026 Nova Venta.
          <br />
          Tu mundo está aquí, en Nova.
        </p>
      </footer>
    </div>
  );
}

function IndexEntries({ page }: { page: (typeof NAV_PAGES)[number] }) {
  if (isGroups(page.sections)) {
    return (
      <div className="flex flex-col gap-8 md:w-[759px]">
        {page.sections.map((group) => (
          <div key={group.heading} className="flex flex-col md:flex-row gap-4 md:gap-[106px]">
            <p className="text-azul-1 text-xl md:text-[32px] md:w-[177px] shrink-0">
              {group.heading}
            </p>
            <div className="flex flex-col gap-5">
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  href={`${page.slug}#${item.id}`}
                  className="flex gap-4 items-center text-azul-1 hover:underline"
                >
                  <span className="text-base md:text-[20px]">{item.number}</span>
                  <span className="text-xl md:text-[32px]">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 md:w-[621px]">
      {page.sections.map((item) => (
        <Link
          key={item.id}
          href={`${page.slug}#${item.id}`}
          className="flex gap-4 items-center text-azul-1 hover:underline"
        >
          <span className="text-base md:text-[20px]">{item.number}</span>
          <span className="text-xl md:text-[32px]">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
