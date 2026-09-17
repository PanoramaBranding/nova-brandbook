import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import ContentsToc, { type TocItem } from "@/components/ContentsToc";

export const metadata: Metadata = { title: "02 · Master Brand" };

// Copy y assets reales, extraídos de Figma (nodo 99:283) el 2026-09-02 con
// acceso completo (archivo copia de Sofia, sin límite de llamadas).

function SectionHeading({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:gap-[127px] gap-8">
      <h2 className="text-[28px] md:text-[32px] font-bold text-azul-2 md:w-[447px] shrink-0">
        {number} {title}
      </h2>
      <div className="text-azul-3/80 leading-6 md:w-[561px] max-w-[561px]">{children}</div>
    </div>
  );
}

// "Contenidos" TOC block (Figma node 543:652 desktop, 543:2174 mobile) — see
// ContentsToc.tsx for why this deliberately duplicates the sidebar nav.
const TOC: TocItem[] = [
  { number: "2.1", label: "Background", id: "background" },
  { number: "2.2", label: "Identificador", id: "identificador" },
  { number: "2.3", label: "Versiones de color", id: "versiones-de-color" },
  { number: "2.4", label: "Área de reserva", id: "area-de-reserva" },
  { number: "2.5", label: "Tamaños mínimos", id: "tamanos-minimos" },
  { number: "2.6", label: "Co-branding", id: "co-branding" },
  { number: "2.7", label: "Endoso de marca", id: "endoso-de-marca" },
  { number: "2.8", label: "Sub-marcas", id: "sub-marcas" },
  { number: "2.9", label: "Usos incorrectos", id: "usos-incorrectos" },
  { number: "2.10", label: "Símbolo", id: "simbolo" },
  { number: "2.11", label: "Versiones de color", id: "simbolo-versiones-de-color" },
  { number: "2.12", label: "Área de reserva", id: "simbolo-area-de-reserva" },
  { number: "2.13", label: "Tamaños mínimos", id: "simbolo-tamanos-minimos" },
  { number: "2.14", label: "Usos incorrectos", id: "simbolo-usos-incorrectos" },
];

function Fig({ src, alt, aspect }: { src: string; alt: string; aspect: number }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt} fill className="object-cover rounded-lg" />
    </div>
  );
}

const MISUSE_2_9 = [
  { label: "1- NO alterar las proporciones del logo", src: "/brand/master-brand/usos-incorrectos-1.png" },
  { label: "2- NO alterar el eje del logo", src: "/brand/master-brand/usos-incorrectos-2.png" },
  { label: "3- NO cambiar colores del logo", src: "/brand/master-brand/usos-incorrectos-3.png" },
  { label: "4- NO aplicar efectos de ningún tipo", src: "/brand/master-brand/usos-incorrectos-4.png" },
  { label: "2- NO agregar efectos de sombra", src: "/brand/master-brand/usos-incorrectos-5.png" },
  { label: "3- NO cambiar tamaño y proporciones", src: "/brand/master-brand/usos-incorrectos-6.png" },
];

const MISUSE_2_14 = [
  { label: "1- NO alterar las proporciones del logo", src: "/brand/master-brand/simbolo-usos-1.png" },
  { label: "2- NO alterar el eje del logo", src: "/brand/master-brand/simbolo-usos-2.png" },
  { label: "3- NO cambiar colores del logo", src: "/brand/master-brand/simbolo-usos-3.png" },
  { label: "4- NO aplicar efectos de ningún tipo", src: "/brand/master-brand/simbolo-usos-4.png" },
  { label: "2- NO agregar efectos de sombra", src: "/brand/master-brand/simbolo-usos-5.png" },
  { label: "3- NO cambiar tamaño y proporciones", src: "/brand/master-brand/simbolo-usos-6.png" },
];

function MisuseGrid({ items }: { items: typeof MISUSE_2_9 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mt-8">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-2">
          <p className="text-base text-azul-3/80">{item.label}</p>
          <Fig src={item.src} alt={item.label} aspect={1} />
        </div>
      ))}
    </div>
  );
}

export default function MasterBrandPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        image="/brand/heroes/hero-master-brand-bg.jpg"
        mobileImage="/brand/heroes/hero-master-brand-mobile.png"
        number="02"
        titleLines={["Master", "Brand"]}
      />

      {/* pl-[220px] on desktop, not the page's usual 38px. Figma's own
          Quote instance (node 528:1242) confirms pl-297, but Sofia asked
          to bring it to 220px site-wide (2026-09-11) — deliberate, don't
          revert without asking. max-w-905 lives on the <p>, not the
          <section> — putting it on the section itself (as briefly
          happened here) caps the section's total box at 905px, swallowing
          the left/right padding out of that budget instead of filling the
          real content width; confirmed as why this page looked wrong
          right after the pl-297 change while Estrategia didn't. */}
      <section className="px-6 md:pl-[220px] md:pr-[38px] py-16 md:py-24">
        <p className="max-w-[905px] text-[32px] md:text-[52px] leading-[1.2] md:leading-[60px] text-azul-1 font-bold">
          Una marca evoluciona con la forma en que las personas se relacionan
          con ella. NovaVenta responde a ese cambio con una identidad más
          simple, clara y flexible.
          <br />
          <br />
          El nuevo logo conserva el reconocimiento de NovaVenta, pero lo
          integra al sistema Nova con una expresión más contemporánea,
          consistente y preparada para distintos puntos de contacto.
        </p>
      </section>

      <ContentsToc items={TOC} />

      <section id="background" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.1" title="Background">
          El nuevo logo de NovaVenta actualiza la expresión de la marca a partir de
          un sistema más simple, contemporáneo y consistente con la nueva
          identidad de Nova. La evolución conserva el reconocimiento del nombre,
          pero optimiza su construcción gráfica, reduce elementos secundarios y
          establece una relación más clara entre la marca Nova y el descriptor
          Venta.
        </SectionHeading>
        {/* Logo evolution timeline (2000/2009/2026) — was missing entirely,
            confirmed via get_design_context on node 543:773 (Round 17). */}
        <div className="mt-8">
          <Fig src="/brand/master-brand/background-1.jpg" alt="Evolución del logo NovaVenta: 2000, 2009, 2026" aspect={4096 / 1273} />
        </div>
      </section>

      <section id="identificador" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.2" title="Identificador">
          El logotipo de NovaVenta es el identificador principal del sistema de
          marca. Su construcción integra la expresión gráfica de Nova con el
          descriptor Venta, estableciendo una jerarquía clara entre ambos
          elementos.
        </SectionHeading>
        <div className="mt-8 flex flex-col gap-6 items-end">
          <Fig src="/brand/master-brand/identificador-1.png" alt="Construcción del identificador NovaVenta" aspect={4096 / 2602} />
          <Button variant="outline" href="/brand/downloads/master-brand-assets.zip" download>Descargar assets</Button>
        </div>
      </section>

      <section id="versiones-de-color" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.3" title="Versiones de color">
          El logotipo de NovaVenta cuenta con versiones de color definidas para
          garantizar legibilidad, contraste y consistencia en distintos fondos y
          aplicaciones. Siempre debe utilizarse una combinación aprobada que
          preserve el reconocimiento de la marca y la jerarquía entre Nova y el
          descriptor Venta.
        </SectionHeading>
        <div className="mt-8 flex flex-col gap-6 items-end">
          <div className="grid grid-cols-2 gap-6 w-full">
            <Fig src="/brand/master-brand/versiones-color-1.png" alt="Versión de color 1" aspect={4096 / 2602} />
            <Fig src="/brand/master-brand/versiones-color-2.png" alt="Versión de color 2" aspect={4096 / 2602} />
            <Fig src="/brand/master-brand/versiones-color-3.png" alt="Versión de color 3" aspect={4096 / 2602} />
            <Fig src="/brand/master-brand/versiones-color-4.png" alt="Versión de color 4" aspect={4096 / 2602} />
          </div>
          <Button variant="outline">Descargar logo</Button>
        </div>
      </section>

      <section id="area-de-reserva" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.4" title="Áreas de reserva">
          El área de reserva establece el espacio mínimo que debe mantenerse
          libre alrededor del logotipo de NovaVenta para garantizar su correcta
          lectura y visibilidad. Ningún elemento gráfico, tipográfico o
          fotográfico debe invadir esta zona.
        </SectionHeading>
        <div className="mt-8">
          <Fig src="/brand/master-brand/area-reserva-1.png" alt="Área de reserva del logotipo" aspect={1444 / 812} />
        </div>
      </section>

      <section id="tamanos-minimos" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.5" title="Tamaños mínimos">
          El logotipo de NovaVenta debe mantener una escala que garantice su
          legibilidad. En medios digitales se recomienda un ancho mínimo de 100
          px y, cuando sea posible, trabajar por encima de 120 px para asegurar
          una lectura clara del descriptor Venta.
        </SectionHeading>
        <div className="mt-8">
          <Fig src="/brand/master-brand/tamanos-minimos.png" alt="Comparativa de tamaño mínimo del logotipo" aspect={1135 / 290} />
        </div>
      </section>

      <section id="co-branding" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.6" title="Co-Branding">
          En aplicaciones de co-branding, el logotipo de NovaVenta debe mantener
          una relación equilibrada con la marca aliada, respetando proporciones,
          áreas de reserva y niveles de jerarquía. La separación entre ambas
          marcas debe ser suficiente para garantizar su lectura independiente y
          evitar que se perciban como una única identidad.
        </SectionHeading>
        <div className="mt-8 flex flex-col gap-6">
          <Fig src="/brand/master-brand/cobranding-2.png" alt="Ejemplo de co-branding 1" aspect={1135 / 290} />
          <Fig src="/brand/master-brand/cobranding-3.png" alt="Ejemplo de co-branding 2" aspect={1135 / 290} />
        </div>
      </section>

      <section id="endoso-de-marca" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.7" title="Endoso de marca">
          El endoso identifica la pertenencia de las marcas semi independientes
          al ecosistema Nova sin modificar su identidad principal. La firma
          &ldquo;una marca Nova&rdquo; debe aplicarse respetando las
          proporciones, ubicación y área de reserva definidas para garantizar
          una relación clara entre ambas marcas.
        </SectionHeading>
        <div className="mt-8">
          <Fig src="/brand/master-brand/endoso-1.png" alt="Ejemplo de endoso de marca" aspect={3000 / 1223} />
        </div>
      </section>

      <section id="sub-marcas" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.8" title="Sub-marcas">
          <span className="block text-[20px] font-bold text-azul-2 mb-8 md:mb-1">Marcas de nombre corto</span>
          Las submarcas de nombre corto se construyen a partir del logotipo Nova
          acompañado por un descriptor breve, ubicado en una posición secundaria
          y con una proporción constante dentro del sistema. Esta estructura
          permite diferenciar cada submarca sin perder la relación visual con
          NovaVenta, manteniendo una arquitectura clara, consistente y
          reconocible entre las distintas expresiones de la marca.
        </SectionHeading>
        <div className="mt-8">
          <Fig src="/brand/master-brand/endoso-2.png" alt="Construcción de submarcas de nombre corto" aspect={1135 / 761} />
        </div>

        {/* These 3 images render full-width below their label+text row, same
            as "Marcas de nombre corto" above — confirmed via
            get_design_context on node 543:1199 (Round 17): they were
            previously squeezed into the 561px text column instead. Gaps
            also corrected to the confirmed 64px between blocks (was 48px). */}
        <div className="mt-16 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:gap-[127px] gap-8">
            <p className="md:w-[447px] shrink-0 text-[20px] font-bold text-azul-2">Marcas de nombre largo</p>
            <p className="md:w-[561px] max-w-[561px] text-azul-3/80 leading-6">
              Las submarcas de nombre largo mantienen a Nova como elemento
              principal y ubican el descriptor en una segunda línea para
              preservar la legibilidad y el equilibrio de la composición. Esta
              construcción permite incorporar nombres de mayor extensión sin
              alterar las proporciones del sistema ni comprometer la jerarquía
              visual de la marca.
            </p>
          </div>
          <Fig src="/brand/master-brand/submarca-nombre-largo.png" alt="Construcción de submarcas de nombre largo" aspect={1920 / 991} />
        </div>

        <div className="mt-16 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:gap-[127px] gap-8">
            <p className="md:w-[447px] shrink-0 text-[20px] font-bold text-azul-2">Construcción horizontal de submarcas</p>
            <p className="md:w-[561px] max-w-[561px] text-azul-3/80 leading-6">
              Las submarcas pueden utilizar una composición horizontal en la que
              el descriptor se alinea a la derecha de Nova. La distancia,
              proporción y alineación entre ambos elementos son constantes y
              deben respetarse en todas las aplicaciones para mantener unidad y
              coherencia dentro del sistema.
            </p>
          </div>
          <Fig src="/brand/master-brand/submarca-horizontal.png" alt="Construcción horizontal de submarcas" aspect={1920 / 991} />
        </div>

        <div className="mt-16 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:gap-[127px] gap-8">
            <p className="md:w-[447px] shrink-0 text-[20px] font-bold text-azul-2">Submarca de construcción especial</p>
            <p className="md:w-[561px] max-w-[561px] text-azul-3/80 leading-6">
              iNova es una excepción dentro del sistema de sub-marcas. A
              diferencia de las demás, no incorpora un descriptor independiente
              junto al logotipo de Nova, sino que integra la letra inicial
              directamente en la construcción de la marca. Esta configuración
              responde a una necesidad específica de identificación y debe
              utilizarse únicamente para iNova. No debe tomarse como referencia
              para la creación de nuevas sub-marcas.
            </p>
          </div>
          <Fig src="/brand/master-brand/submarca-inova.png" alt="Construcción especial de la submarca iNova" aspect={1920 / 991} />
        </div>
      </section>

      <section id="usos-incorrectos" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.9" title="Usos incorrectos">
          Para preservar la consistencia y el reconocimiento de NovaVenta, el
          logotipo debe utilizarse únicamente en sus versiones aprobadas. No se
          deben alterar sus proporciones, orientación, colores, relación entre
          elementos ni aplicar efectos, sombras o deformaciones que modifiquen su
          construcción original.
        </SectionHeading>
        <MisuseGrid items={MISUSE_2_9} />
      </section>

      <section id="simbolo" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.10" title="Símbolo">
          El símbolo de Nova se construye a partir de elementos reconocibles del
          logotipo y funciona como una expresión gráfica complementaria dentro
          del sistema visual. Puede utilizarse de manera independiente en
          aplicaciones donde la marca ya esté identificada o cuando se requiera
          una presencia más sintética y compacta. Su construcción, proporciones
          y orientación deben mantenerse siempre sin modificaciones para
          preservar su reconocimiento y consistencia dentro de la identidad.
        </SectionHeading>
        <div className="mt-8 flex flex-col gap-6 items-end">
          <Fig src="/brand/master-brand/simbolo-1.png" alt="El símbolo de Nova" aspect={4096 / 2602} />
          <Button variant="outline">Descargar símbolo</Button>
        </div>
      </section>

      <section id="simbolo-versiones-de-color" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.11" title="Versiones de color">
          El símbolo cuenta con versiones de color definidas para asegurar
          contraste y legibilidad en diferentes fondos. Debe utilizarse
          únicamente en las combinaciones aprobadas, manteniendo sin cambios su
          construcción y proporciones.
        </SectionHeading>
        <div className="mt-8 flex flex-col gap-6 items-end">
          <div className="grid grid-cols-2 gap-6 w-full">
            <Fig src="/brand/master-brand/simbolo-color-1.png" alt="Símbolo versión de color 1" aspect={4096 / 2602} />
            <Fig src="/brand/master-brand/simbolo-color-2.png" alt="Símbolo versión de color 2" aspect={4096 / 2602} />
            <Fig src="/brand/master-brand/simbolo-color-3.png" alt="Símbolo versión de color 3" aspect={4096 / 2602} />
            <Fig src="/brand/master-brand/simbolo-color-4.png" alt="Símbolo versión de color 4" aspect={4096 / 2602} />
          </div>
          <Button variant="outline">Descargar símbolo</Button>
        </div>
      </section>

      <section id="simbolo-area-de-reserva" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.12" title="Áreas de reserva">
          El área de reserva establece el espacio mínimo que debe mantenerse
          libre alrededor del símbolo de NovaVenta para garantizar su correcta
          lectura y visibilidad. Ningún elemento gráfico, tipográfico o
          fotográfico debe invadir esta zona.
        </SectionHeading>
        <div className="mt-8">
          <Fig src="/brand/master-brand/simbolo-area-reserva.png" alt="Área de reserva del símbolo" aspect={4096 / 2602} />
        </div>
      </section>

      <section id="simbolo-tamanos-minimos" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.13" title="Tamaños mínimos">
          El logotipo de NovaVenta debe mantener una escala que garantice su
          legibilidad. En medios digitales se recomienda un ancho mínimo de 100
          px y, cuando sea posible, trabajar por encima de 120 px para asegurar
          una lectura clara del descriptor Venta.
        </SectionHeading>
        <div className="mt-8">
          <Fig src="/brand/master-brand/simbolo-tamanos-minimos.png" alt="Comparativa de tamaño mínimo del símbolo" aspect={1135 / 290} />
        </div>
      </section>

      <section id="simbolo-usos-incorrectos" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="2.14" title="Usos incorrectos">
          El símbolo de Nova está diseñado para aplicaciones en tamaños
          reducidos donde el logotipo completo pierde legibilidad. Para medios
          digitales se recomienda un ancho mínimo de 32 px y, siempre que sea
          posible, trabajar por encima de 40 px para conservar una reproducción
          clara de sus formas y proporciones.
        </SectionHeading>
        <MisuseGrid items={MISUSE_2_14} />
      </section>

      <Footer />
    </div>
  );
}
