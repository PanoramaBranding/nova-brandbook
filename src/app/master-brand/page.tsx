import type { Metadata } from "next";
import AssetPending from "@/components/AssetPending";

export const metadata: Metadata = { title: "02 · Master Brand" };

type Section = {
  id: string;
  number: string;
  title: string;
  body: string;
  bullets?: string[];
  subsections?: { title: string; body: string }[];
  asset?: string;
};

// Copy real, extraído de las capas de Figma (nodo 99:283) el 2026-09-02,
// mientras el MCP de Figma seguía bloqueado por el límite de llamadas.
// Cada sección con `asset` queda con un placeholder — ver PLAN.md.
const SECTIONS: Section[] = [
  {
    id: "background",
    number: "2.1",
    title: "Background",
    body: "El nuevo logo de NovaVenta actualiza la expresión de la marca a partir de un sistema más simple, contemporáneo y consistente con la nueva identidad de Nova. La evolución conserva el reconocimiento del nombre, pero optimiza su construcción gráfica, reduce elementos secundarios y establece una relación más clara entre la marca Nova y el descriptor Venta.",
  },
  {
    id: "identificador",
    number: "2.2",
    title: "Identificador",
    body: "El logotipo de NovaVenta es el identificador principal del sistema de marca. Su construcción integra la expresión gráfica de Nova con el descriptor Venta, estableciendo una jerarquía clara entre ambos elementos.",
    asset: "diagrama de construcción del logotipo",
  },
  {
    id: "versiones-de-color",
    number: "2.3",
    title: "Versiones de color",
    body: "El logotipo de NovaVenta cuenta con versiones de color definidas para garantizar legibilidad, contraste y consistencia en distintos fondos y aplicaciones. Siempre debe utilizarse una combinación aprobada que preserve el reconocimiento de la marca y la jerarquía entre Nova y el descriptor Venta.",
    asset: "variantes de color aprobadas del logotipo",
  },
  {
    id: "area-de-reserva",
    number: "2.4",
    title: "Área de reserva",
    body: "El área de reserva establece el espacio mínimo que debe mantenerse libre alrededor del logotipo de NovaVenta para garantizar su correcta lectura y visibilidad. Ningún elemento gráfico, tipográfico o fotográfico debe invadir esta zona.",
    asset: "diagrama de área de reserva con medidas",
  },
  {
    id: "tamanos-minimos",
    number: "2.5",
    title: "Tamaños mínimos",
    body: "El logotipo de NovaVenta debe mantener una escala que garantice su legibilidad. En medios digitales se recomienda un ancho mínimo de 100 px y, cuando sea posible, trabajar por encima de 120 px para asegurar una lectura clara del descriptor Venta.",
    asset: "comparativa de tamaño mínimo",
  },
  {
    id: "co-branding",
    number: "2.6",
    title: "Co-branding",
    body: "En aplicaciones de co-branding, el logotipo de NovaVenta debe mantener una relación equilibrada con la marca aliada, respetando proporciones, áreas de reserva y niveles de jerarquía. La separación entre ambas marcas debe ser suficiente para garantizar su lectura independiente y evitar que se perciban como una única identidad.",
    asset: "ejemplo de lockup de co-branding",
  },
  {
    id: "endoso-de-marca",
    number: "2.7",
    title: "Endoso de marca",
    body: "El endoso identifica la pertenencia de las marcas semi independientes al ecosistema Nova sin modificar su identidad principal. La firma “una marca Nova” debe aplicarse respetando las proporciones, ubicación y área de reserva definidas para garantizar una relación clara entre ambas marcas.",
    asset: "ejemplo de firma de endoso",
  },
  {
    id: "sub-marcas",
    number: "2.8",
    title: "Sub-marcas",
    body: "",
    subsections: [
      {
        title: "Marcas de nombre corto",
        body: "Las submarcas de nombre corto se construyen a partir del logotipo Nova acompañado por un descriptor breve, ubicado en una posición secundaria y con una proporción constante dentro del sistema. Esta estructura permite diferenciar cada submarca sin perder la relación visual con NovaVenta, manteniendo una arquitectura clara, consistente y reconocible entre las distintas expresiones de la marca.",
      },
      {
        title: "Marcas de nombre largo",
        body: "Las submarcas de nombre largo mantienen a Nova como elemento principal y ubican el descriptor en una segunda línea para preservar la legibilidad y el equilibrio de la composición. Esta construcción permite incorporar nombres de mayor extensión sin alterar las proporciones del sistema ni comprometer la jerarquía visual de la marca.",
      },
      {
        title: "Construcción horizontal de submarcas",
        body: "Las submarcas pueden utilizar una composición horizontal en la que el descriptor se alinea a la derecha de Nova. La distancia, proporción y alineación entre ambos elementos son constantes y deben respetarse en todas las aplicaciones para mantener unidad y coherencia dentro del sistema.",
      },
      {
        title: "Submarca de construcción especial",
        body: "iNova es una excepción dentro del sistema de sub-marcas. A diferencia de las demás, no incorpora un descriptor independiente junto al logotipo de Nova, sino que integra la letra inicial directamente en la construcción de la marca. Esta configuración responde a una necesidad específica de identificación y debe utilizarse únicamente para iNova. No debe tomarse como referencia para la creación de nuevas sub-marcas.",
      },
    ],
    asset: "ejemplos de construcción de cada sub-marca",
  },
  {
    id: "usos-incorrectos",
    number: "2.9",
    title: "Usos incorrectos",
    body: "Para preservar la consistencia y el reconocimiento de NovaVenta, el logotipo debe utilizarse únicamente en sus versiones aprobadas. No se deben alterar sus proporciones, orientación, colores, relación entre elementos ni aplicar efectos, sombras o deformaciones que modifiquen su construcción original.",
    bullets: [
      "NO alterar las proporciones del logo",
      "NO alterar el eje del logo",
      "NO cambiar colores del logo",
      "NO aplicar efectos de ningún tipo",
      "NO agregar efectos de sombra",
      "NO cambiar tamaño y proporciones",
    ],
    asset: "ejemplos visuales de cada uso incorrecto",
  },
  {
    id: "simbolo",
    number: "2.10",
    title: "Símbolo",
    body: "El símbolo de Nova se construye a partir de elementos reconocibles del logotipo y funciona como una expresión gráfica complementaria dentro del sistema visual. Puede utilizarse de manera independiente en aplicaciones donde la marca ya esté identificada o cuando se requiera una presencia más sintética y compacta. Su construcción, proporciones y orientación deben mantenerse siempre sin modificaciones para preservar su reconocimiento y consistencia dentro de la identidad.",
    asset: "el símbolo de Nova",
  },
  {
    id: "simbolo-versiones-de-color",
    number: "2.11",
    title: "Versiones de color",
    body: "El símbolo cuenta con versiones de color definidas para asegurar contraste y legibilidad en diferentes fondos. Debe utilizarse únicamente en las combinaciones aprobadas, manteniendo sin cambios su construcción y proporciones.",
    asset: "variantes de color del símbolo",
  },
  {
    id: "simbolo-area-de-reserva",
    number: "2.12",
    title: "Área de reserva",
    body: "El área de reserva establece el espacio mínimo que debe mantenerse libre alrededor del símbolo de NovaVenta para garantizar su correcta lectura y visibilidad. Ningún elemento gráfico, tipográfico o fotográfico debe invadir esta zona.",
    asset: "diagrama de área de reserva del símbolo",
  },
  {
    id: "simbolo-tamanos-minimos",
    number: "2.13",
    title: "Tamaños mínimos",
    body: "El logotipo de NovaVenta debe mantener una escala que garantice su legibilidad. En medios digitales se recomienda un ancho mínimo de 100 px y, cuando sea posible, trabajar por encima de 120 px para asegurar una lectura clara del descriptor Venta.",
    asset: "comparativa de tamaño mínimo del símbolo",
  },
  {
    id: "simbolo-usos-incorrectos",
    number: "2.14",
    title: "Usos incorrectos",
    body: "El símbolo de Nova está diseñado para aplicaciones en tamaños reducidos donde el logotipo completo pierde legibilidad. Para medios digitales se recomienda un ancho mínimo de 32 px y, siempre que sea posible, trabajar por encima de 40 px para conservar una reproducción clara de sus formas y proporciones.",
    asset: "ejemplos visuales de uso incorrecto del símbolo",
  },
];

export default function MasterBrandPage() {
  return (
    <div className="flex flex-col">
      <header className="bg-azul-1 px-6 md:px-[38px] pt-8 pb-16 md:pb-24 text-white">
        <p className="text-sm font-semibold opacity-80">02</p>
        <h1 className="text-4xl md:text-6xl font-bold">Master Brand</h1>
      </header>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="px-6 md:px-[38px] py-12 md:py-16 border-t border-azul-tint scroll-mt-8"
        >
          <div className="flex flex-col md:flex-row md:gap-16 gap-6">
            <div className="md:w-[280px] shrink-0">
              <p className="text-sm font-semibold text-azul-2">{section.number}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-azul-1">
                {section.title}
              </h2>
            </div>

            <div className="flex flex-col gap-8 max-w-[640px]">
              {section.body && (
                <p className="text-azul-3/80 leading-relaxed">{section.body}</p>
              )}

              {section.subsections?.map((sub) => (
                <div key={sub.title}>
                  <p className="font-semibold text-azul-1 mb-1">{sub.title}</p>
                  <p className="text-azul-3/80 leading-relaxed">{sub.body}</p>
                </div>
              ))}

              {section.bullets && (
                <ul className="flex flex-col gap-2">
                  {section.bullets.map((b) => (
                    <li key={b} className="text-azul-3/80">
                      · {b}
                    </li>
                  ))}
                </ul>
              )}

              {section.asset && <AssetPending label={section.asset} />}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
