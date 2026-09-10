import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import ContentsToc, { type TocItem } from "@/components/ContentsToc";

export const metadata: Metadata = { title: "05 · Sub-marcas" };

// Copy y assets extraídos de Figma (nodo 525:218 desktop, 2055:2171 mobile)
// el 2026-09-10. Un solo árbol responsive (no desktop/mobile separados como
// en 04 Aplicaciones) — confirmado que los aspect ratios y los insets de
// crop de cada imagen coinciden entre ambos breakpoints en el código de
// Figma, solo cambia el ancho del contenedor.
//
// Bugs de contenido reales encontrados en Figma (no nuestros, flag para el
// equipo de diseño):
// 1. "Colores secundarios" de Nova Express (Express II/III, Beige, Gris
//    Express): el HEX y el fill visual son correctos y únicos por swatch,
//    pero CMYK/RGB/PANTONE son copy-paste literal de los swatches Azul
//    III/II/IV/tinte-claro de la paleta principal (mismos valores exactos,
//    swatch por swatch) — no corresponden a estos colores en absoluto.
//    Mostrados tal cual vienen de Figma, pero marcados como no verificados.
// 2. El heading de "5.3 Marcas de visibilidad interna" dice literalmente
//    "5.2 Marcas de visibilidad externa" en Figma (mismo texto que el
//    heading de la sección anterior) — usamos el número/label correcto
//    según el TOC, no el texto on-page.
// 3. El párrafo bajo "iNova" es copy-paste literal de la intro de Nova
//    Express ("...puntos de contacto físicos de acceso rápido...") — no
//    describe iNova en absoluto. Mostrado tal cual, flag para el equipo.

const TOC: TocItem[] = [
  { number: "5.1", label: "Arquitectura de marca", id: "arquitectura-de-marca" },
  { number: "5.2", label: "Marcas de visibilidad externa", id: "marcas-de-visibilidad-externa" },
  { number: "5.3", label: "Marcas de visibilidad interna", id: "marcas-de-visibilidad-interna" },
];

const D = "/brand/submarca";

function CoverImg({
  src,
  alt,
  aspect,
  className = "",
}: {
  src: string;
  alt: string;
  aspect: number;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt} fill className="object-cover rounded-lg" />
    </div>
  );
}

// Mismo patrón que 04 Aplicaciones: insets de crop idénticos entre
// desktop/mobile en el código de Figma, solo cambia el tamaño del
// contenedor — se reutilizan tal cual.
function CroppedImg({
  src,
  alt,
  aspect,
  inset,
  className = "",
}: {
  src: string;
  alt: string;
  aspect: number;
  inset: { top: number; left: number; width: number; height: number };
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`} style={{ aspectRatio: aspect }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute max-w-none pointer-events-none"
        style={{
          top: `${inset.top}%`,
          left: `${inset.left}%`,
          width: `${inset.width}%`,
          height: `${inset.height}%`,
        }}
      />
    </div>
  );
}

const INSET = {
  expressstore1: { top: 0, left: 0, width: 100, height: 147.87 },
  expressstore4: { top: -19.46, left: -0.03, width: 115.34, height: 164.04 },
  uniformeexpress2: { top: 0, left: -18.89, width: 145.99, height: 134.88 },
  mmPhone: { top: -41.16, left: -30.07, width: 144.74, height: 223.03 },
  novaempresarios6: { top: -24.47, left: -0.04, width: 100.08, height: 138.14 },
  novaempresarios3: { top: -21.41, left: 0, width: 100, height: 142.82 },
  novaempresarios5: { top: -0.01, left: -28.69, width: 169.79, height: 100.02 },
  inova1: { top: -12.9, left: 0, width: 100, height: 148.15 },
};

// "Textura mobiliario" — Figma composes this as a 180°-rotated, oversized
// fill (a subtle repeating pattern), not a plain crop. Approximated with a
// rotated wrapper around the same crop-inset technique.
function RotatedTexture({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-[423px] overflow-hidden rounded-lg" style={{ transform: "rotate(180deg)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute max-w-none pointer-events-none"
        style={{ top: "-40.75%", left: "0%", width: "100.72%", height: "221.82%" }}
      />
    </div>
  );
}

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

function SubHeading({ children }: { children: React.ReactNode }) {
  return <p className="text-xl font-bold text-azul-1">{children}</p>;
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-lg text-azul-1">{children}</p>;
}

type Swatch = {
  name: string;
  cmyk: string;
  rgb: string;
  hex: string;
  pantone: string;
  textClass: string;
};

// HEX + fill son los valores confirmados (verificados contra el fill real
// de Figma y el campo "HEX" propio de cada swatch). CMYK/RGB/PANTONE de
// Express II/III/Beige/Gris Express son el bug de contenido documentado
// arriba — mostrados tal cual vienen de Figma, no inventados ni corregidos.
const COLOR_PRINCIPAL: Swatch = {
  name: "Express I",
  cmyk: "87/50/0/0",
  rgb: "43/125/246",
  hex: "#2B7DF6",
  pantone: "285 C",
  textClass: "text-white",
};

const COLORES_SECUNDARIOS: Swatch[] = [
  { name: "Express II", cmyk: "100/81/39/29", rgb: "8/51/94", hex: "#7b007A", pantone: "295 C", textClass: "text-white" },
  { name: "Express III", cmyk: "93/57/0/0", rgb: "12/103/193", hex: "#CCAED3", pantone: "2145 C", textClass: "text-azul-3" },
  { name: "Beige", cmyk: "47/10/0/0", rgb: "156/206/255", hex: "#CBC1B4", pantone: "2141 C", textClass: "text-azul-3" },
  { name: "Gris Express", cmyk: "19/0/0/0", rgb: "220/239/255", hex: "#E5E5E5", pantone: "545 C", textClass: "text-azul-3" },
];

function SwatchRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

function ColorCard({ swatch }: { swatch: Swatch }) {
  return (
    <div
      className={`rounded-[10px] flex-1 min-w-0 flex flex-col gap-1 px-[38px] pt-[38px] pb-[86px] ${swatch.textClass}`}
      style={{ backgroundColor: swatch.hex }}
    >
      <SwatchRow label="Nombre" value={swatch.name} />
      <SwatchRow label="CMYK" value={swatch.cmyk} />
      <SwatchRow label="RGB" value={swatch.rgb} />
      <SwatchRow label="HEX" value={swatch.hex} />
      <SwatchRow label="PANTONE" value={swatch.pantone} />
    </div>
  );
}

export default function SubmarcaPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        image="/brand/heroes/hero-submarca.png"
        mobileImage="/brand/heroes/hero-submarca-mobile.png"
        number="05"
        titleLines="Sub-marcas"
      />

      <section className="px-6 md:px-[38px] py-16 md:py-24 max-w-[676px]">
        <p className="text-[32px] md:text-[52px] leading-[1.3] md:leading-[60px] text-azul-1 font-bold">
          Las sub-marcas de NovaVenta organizan las distintas expresiones del
          ecosistema bajo una lógica común, permitiendo diferenciar canales,
          negocios y servicios sin perder la relación con la master brand.
          Cada una mantiene elementos compartidos de identidad, pero puede
          desarrollar recursos específicos según su función y contexto.
        </p>
      </section>

      <ContentsToc items={TOC} />

      <section id="arquitectura-de-marca" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="5.1" title="Arquitectura de marca">
          La arquitectura de NovaVenta se organiza en tres niveles que
          permiten ordenar el ecosistema y definir con claridad la relación
          entre sus distintas marcas. NovaVenta funciona como master brand y
          concentra el reconocimiento principal del sistema.
          <br />
          <br />
          A partir de ella se construyen las submarcas, que comparten la
          expresión Nova y adaptan su descriptor según cada negocio, servicio
          o audiencia. En un tercer nivel se encuentran las marcas semi
          independientes, como Walo y Zinergy, que conservan una identidad
          propia pero mantienen su vínculo con el ecosistema mediante el
          endoso una marca Nova.
        </SectionHeading>
        <div className="mt-8">
          <CoverImg src={`${D}/arquitectura-1.png`} alt="Arquitectura de marca de NovaVenta" aspect={2836 / 2000} />
        </div>
      </section>

      <section id="marcas-de-visibilidad-externa" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="5.2" title="Marcas de visibilidad externa">
          Las submarcas de comunicación externa están orientadas a audiencias
          fuera de la organización y se aplican en puntos de contacto
          comerciales, publicitarios y digitales. Su función es representar
          de forma clara cada negocio o servicio frente al público,
          manteniendo una relación consistente con la identidad de
          NovaVenta.
          <br />
          <br />
          Aunque pueden desarrollar recursos específicos según su contexto,
          deben conservar los principios visuales, jerarquías y criterios de
          aplicación definidos por el sistema general de marca.
        </SectionHeading>

        {/* Nova Express */}
        <div className="mt-12 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:gap-[127px] gap-4">
            <SubHeading>Nova express</SubHeading>
            <p className="text-azul-3/80 leading-6 md:w-[561px] max-w-[561px]">
              Nova Express es la submarca de NovaVenta enfocada en
              conveniencia inmediata y puntos de contacto físicos de acceso
              rápido. Su identidad mantiene la arquitectura visual de Nova,
              pero desarrolla un territorio propio orientado a comunicar
              proximidad, agilidad y disponibilidad dentro de contextos de
              consumo cotidiano.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <SubLabel>Concepto de marca</SubLabel>
            <CoverImg src={`${D}/cm1.png`} alt="Concepto de marca Nova Express 1" aspect={4096 / 1090} />
            <CoverImg src={`${D}/cm2.png`} alt="Concepto de marca Nova Express 2" aspect={4096 / 1090} />
          </div>

          <div className="flex flex-col gap-6">
            <SubLabel>Logotipo Principal</SubLabel>
            <CoverImg src={`${D}/logo-principal.png`} alt="Logotipo principal Nova Express" aspect={4096 / 1761} />
          </div>

          <div className="flex flex-col gap-6">
            <SubLabel>Logotipo Horizontal</SubLabel>
            <CoverImg src={`${D}/logo-horizontal.png`} alt="Logotipo horizontal Nova Express" aspect={4096 / 1761} />
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-xl font-bold text-azul-1">Color principal</p>
            <ColorCard swatch={COLOR_PRINCIPAL} />
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-xl font-bold text-azul-1">Colores secundarios</p>
            <div className="flex flex-col md:flex-row gap-4">
              {COLORES_SECUNDARIOS.map((s) => (
                <ColorCard key={s.name} swatch={s} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SubLabel>Textura mobiliario</SubLabel>
            <RotatedTexture src={`${D}/textura-mobiliario.png`} alt="Textura de mobiliario Nova Express" />
          </div>

          <div className="flex flex-col gap-6">
            <SubLabel>Aplicaciones de sub-marca</SubLabel>
            <CoverImg src={`${D}/express-1.png`} alt="Aplicación Nova Express 1" aspect={3557 / 2000} />
            <CoverImg src={`${D}/express-2.png`} alt="Aplicación Nova Express 2" aspect={905 / 512} className="md:w-[905px]" />
            <div className="flex gap-3 items-start w-full">
              <CoverImg src={`${D}/express-4.png`} alt="Aplicación Nova Express 4" aspect={674 / 1011} />
              <CoverImg src={`${D}/express-3.png`} alt="Aplicación Nova Express 3" aspect={445 / 657} />
            </div>
            <CroppedImg src={`${D}/expressstore-1.png`} alt="Nova Express Store 1" aspect={1132 / 821} inset={INSET.expressstore1} />
            <div className="flex gap-3 items-start w-full">
              <div className="flex flex-col gap-3 flex-1">
                <CoverImg src={`${D}/expressstore-3.png`} alt="Nova Express Store 3" aspect={1664 / 2224} />
                <CroppedImg src={`${D}/expressstore-4.png`} alt="Nova Express Store 4" aspect={332 / 312} inset={INSET.expressstore4} />
              </div>
              <CoverImg src={`${D}/expressstore-2.png`} alt="Nova Express Store 2" aspect={676 / 769} />
            </div>
            <div className="flex gap-3 items-start w-full">
              <CoverImg src={`${D}/expressvending-2.png`} alt="Nova Express Vending 2" aspect={675 / 844} />
              <CoverImg src={`${D}/expressstore-5.png`} alt="Nova Express Store 5" aspect={445 / 595} />
            </div>
            <CoverImg src={`${D}/expressvending-3.png`} alt="Nova Express Vending 3" aspect={1135 / 635} />
            <div className="flex gap-3 items-center w-full">
              <CoverImg src={`${D}/uniformeexpress-1.png`} alt="Uniforme Nova Express 1" aspect={562 / 759} />
              <CroppedImg src={`${D}/uniformeexpress-2.png`} alt="Uniforme Nova Express 2" aspect={561 / 759} inset={INSET.uniformeexpress2} />
            </div>
          </div>
        </div>

        {/* Nova Clic */}
        <div className="mt-16 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:gap-[127px] gap-4">
            <SubHeading>Nova Clic</SubHeading>
            <p className="text-azul-3/80 leading-6 md:w-[561px] max-w-[561px]">
              Nova Clic es la submarca digital de NovaVenta, enfocada en
              conectar descubrimiento, navegación y compra dentro de una
              experiencia ágil y directa. Su función es facilitar el acceso
              al portafolio desde entornos digitales y reducir la fricción
              entre interés y transacción.
              <br />
              <br />
              Su identidad debe mantener una relación clara con el sistema de
              NovaVenta, adaptándose a interfaces, contenidos digitales y
              formatos de comunicación propios del canal.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <SubLabel>Concepto de marca</SubLabel>
            <CoverImg src={`${D}/cp1.png`} alt="Concepto de marca Nova Clic" aspect={4096 / 920} />
          </div>
          <CoverImg src={`${D}/digital-screen-mockup.png`} alt="Mockup de pantalla digital Nova Clic" aspect={3739 / 2534} />
          <div className="flex gap-3 items-start w-full">
            <CroppedImg src={`${D}/mm-phone.png`} alt="Mockup teléfono Nova Clic" aspect={447 / 435} inset={INSET.mmPhone} />
            <CoverImg src={`${D}/ipad-02.png`} alt="Mockup tablet Nova Clic" aspect={676 / 435} />
          </div>
          <CoverImg src={`${D}/webpage-1.png`} alt="Página web Nova Clic 1" aspect={1134 / 756} />
          <CoverImg src={`${D}/webpage-2.png`} alt="Página web Nova Clic 2" aspect={1134 / 756} />
        </div>
      </section>

      <section id="marcas-de-visibilidad-interna" className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8">
        <SectionHeading number="5.3" title="Marcas de visibilidad interna">
          Las submarcas de comunicación interna están dirigidas a las
          personas que hacen parte del ecosistema NovaVenta, como
          empresarios, líderes, equipos y comunidades vinculadas a la
          organización. Su función es identificar programas, herramientas y
          espacios de formación, gestión y relacionamiento interno.
          <br />
          <br />
          Estas marcas deben mantener una relación visual clara con
          NovaVenta, adaptando el sistema a necesidades funcionales de
          comunicación interna sin perder consistencia, reconocimiento ni
          jerarquía dentro de la arquitectura de marca.
        </SectionHeading>

        <div className="mt-12 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:gap-[127px] gap-4">
            <SubHeading>iNova</SubHeading>
            {/* Texto tal cual viene de Figma — es copy-paste de la intro de
                Nova Express y no describe iNova; bug de contenido, ver nota
                arriba. No inventamos una descripción alternativa. */}
            <p className="text-azul-3/80 leading-6 md:w-[561px] max-w-[561px]">
              Nova Express es la submarca de NovaVenta enfocada en
              conveniencia inmediata y puntos de contacto físicos de acceso
              rápido. Su identidad mantiene la arquitectura visual de Nova,
              pero desarrolla un territorio propio orientado a comunicar
              proximidad, agilidad y disponibilidad dentro de contextos de
              consumo cotidiano.
            </p>
          </div>
          <CoverImg src={`${D}/cm3.png`} alt="Concepto de marca iNova" aspect={4096 / 920} />
          <CoverImg src={`${D}/inova-2.png`} alt="iNova 2" aspect={1135 / 892.646484375} />
          <CroppedImg src={`${D}/inova-1.png`} alt="iNova 1" aspect={1135 / 510.9999694824219} inset={INSET.inova1} />
          <CoverImg src={`${D}/novaempresarios-7.png`} alt="Nova Empresarios 7" aspect={1135 / 504.3212585449219} />
          <CoverImg src={`${D}/novaempresarios-1.png`} alt="Nova Empresarios 1" aspect={1135 / 637.88330078125} />
          <div className="flex gap-3 items-start w-full">
            <CoverImg src={`${D}/novaempresarios-2.png`} alt="Nova Empresarios 2" aspect={676 / 409} />
            <CroppedImg src={`${D}/novaempresarios-6.png`} alt="Nova Empresarios 6" aspect={447 / 409} inset={INSET.novaempresarios6} />
          </div>
          <CroppedImg src={`${D}/novaempresarios-3.png`} alt="Nova Empresarios 3" aspect={1135 / 546.3578491210938} inset={INSET.novaempresarios3} />
          <CoverImg src={`${D}/novalider-1.png`} alt="Nova Líder" aspect={1135 / 780} />
          <div className="flex gap-3 items-start w-full">
            <CoverImg src={`${D}/novaempresarios-4.png`} alt="Nova Empresarios 4" aspect={562 / 374} />
            <CroppedImg src={`${D}/novaempresarios-5.png`} alt="Nova Empresarios 5" aspect={561 / 633} inset={INSET.novaempresarios5} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
