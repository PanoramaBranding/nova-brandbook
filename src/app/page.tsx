import Link from "next/link";
import HeroMark from "@/components/HeroMark";
import Footer from "@/components/Footer";
import { NAV_PAGES, isGroups } from "@/lib/nav-data";

export default function Home() {
  return (
    <div>
      {/* Hero — Figma node 528:1264 desktop, 529:1874 mobile. Figma's own
          frames are a fixed 929px/390:844 box, but the hero should always
          fill the actual screen on first load, so height is h-svh/h-screen
          with justify-between distributing the leftover space instead of
          the literal fixed 426px gap. Mobile's top bar reflows: "Brand
          Book Guidelines" alone on its own line, then "Nova"/"2026" paired
          — not the same grouping as desktop's "Nova + Brand Book
          Guidelines" / "2026" split. */}
      <section className="bg-azul-1 flex flex-col justify-between h-svh md:h-screen py-8 md:pt-3 md:pb-9 px-4 md:pl-[67px] md:pr-[38px]">
        <div className="text-white text-2xl md:text-[32px] font-normal">
          <div className="flex flex-col gap-6 md:hidden">
            <Link href="/">Brand Book Guidelines</Link>
            <div className="flex gap-5">
              <p>Nova</p>
              <p>2026</p>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:justify-between">
            <div className="flex gap-[150px]">
              <p>Nova</p>
              <Link href="/">Brand Book Guidelines</Link>
            </div>
            <p>2026</p>
          </div>
        </div>
        <HeroMark />
      </section>

      {/* Bienvenida — Figma node 504:199 */}
      <section className="flex justify-end py-16 md:py-[90px] px-4 md:pl-[497px] md:pr-[38px]">
        <p className="text-azul-1 text-2xl md:text-[36px] leading-[1.3] max-w-[905px]">
          Bienvenido a las directrices de marca de NovaVenta. Utiliza estos recursos y
          lineamientos al preparar materiales para aplicar la identidad de manera
          consistente. Los recursos proporcionados son las herramientas necesarias para
          lograrlo.
        </p>
      </section>

      {/* Índice — Figma node 505:259, all 5 pages in scope (stale note about
          05 being out of scope removed 2026-09-11 — it's been in since
          Round 15). 05's own entry groups into "Externas"/"Internas" in
          Figma (node 2073:915), unlike 01-04's flat rows — see nav-data.ts. */}
      <section id="index" className="flex flex-col gap-8 md:gap-16 px-4 md:pl-[67px] md:pr-[38px] md:max-w-[1240px] pt-16 pb-24">
        <div className="flex flex-col gap-8">
          <h1 className="text-azul-1 font-bold text-5xl md:text-[96px]">Index</h1>
          <div className="border-t border-azul-1/30" />
        </div>

        <div className="flex flex-col gap-[120px] md:gap-16">
          {NAV_PAGES.map((page) => (
            <div key={page.slug} className="flex flex-col gap-8 md:gap-16">
              {/* Sub-marcas only (Figma node 2073:912/2073:913) — confirmed
                  intentional with Sofia 2026-09-11, not built for 01-04. */}
              {page.homeDividerTitle && (
                <div className="flex flex-col gap-8">
                  <h2 className="text-azul-1 font-bold text-5xl md:text-[96px]">
                    {page.homeDividerTitle}
                  </h2>
                  <div className="border-t border-azul-1/30" />
                </div>
              )}
              <div className="flex flex-col md:flex-row md:justify-between gap-6">
                <h2 className="text-azul-2 font-semibold text-[28px] md:text-[40px] shrink-0">
                  <Link href={page.slug} className="hover:underline">
                    {page.number} {page.label}
                  </Link>
                </h2>
                <IndexEntries page={page} />
              </div>
              <div className="border-t border-azul-1/30" />
            </div>
          ))}
        </div>
      </section>

      <Footer variant="default" backToTopHref="#index" />
    </div>
  );
}

function IndexEntries({ page }: { page: (typeof NAV_PAGES)[number] }) {
  if (isGroups(page.sections)) {
    return (
      <div className="flex flex-col gap-12 md:gap-8 md:w-[759px]">
        {page.sections.map((group) => (
          <div key={group.heading} className="flex flex-col gap-8 md:flex-row md:gap-[106px]">
            <p className="text-azul-1 font-semibold text-xl md:text-[32px] md:w-[177px] shrink-0">
              {group.heading}
            </p>
            <div className="flex flex-col gap-5">
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  href={`${page.slug}#${item.id}`}
                  className="flex gap-[10px] md:gap-4 items-center text-azul-1 hover:underline"
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
    <div className="flex flex-col gap-4 md:gap-5 md:w-[621px]">
      {page.sections.map((item) => (
        <Link
          key={item.id}
          href={`${page.slug}#${item.id}`}
          className="flex gap-[10px] md:gap-4 items-center text-azul-1 hover:underline"
        >
          <span className="text-base md:text-[20px]">{item.number}</span>
          <span className="text-xl md:text-[32px]">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
