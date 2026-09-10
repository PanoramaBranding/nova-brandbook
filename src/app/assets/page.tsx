import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import ContentsToc, { type TocItem } from "@/components/ContentsToc";

export const metadata: Metadata = { title: "03 · Brand Assets" };

// "Contenidos" TOC block (Figma node 553:2736) — see ContentsToc.tsx for why
// this deliberately duplicates the sidebar nav.
const TOC: TocItem[] = [
  { number: "3.1", label: "Paleta cromática principal", id: "paleta-cromatica-principal" },
  { number: "3.2", label: "Paleta complementaria", id: "paleta-complementaria" },
  { number: "3.3", label: "Porcentajes de color", id: "porcentajes-de-color" },
  { number: "3.4", label: "Uso de color", id: "uso-de-color" },
  { number: "3.5", label: "Fuentes tipográficas", id: "fuentes-tipograficas" },
  { number: "3.6", label: "Jerarquías", id: "jerarquias" },
  { number: "3.7", label: "Usos incorrectos", id: "usos-incorrectos-tipografia" },
  { number: "3.8", label: "Estilo fotográfico", id: "estilo-fotografico" },
  { number: "3.9", label: "Uso de la fotografía", id: "uso-de-la-fotografia" },
  { number: "3.10", label: "Sistema iconográfico", id: "sistema-iconografico" },
  { number: "3.11", label: "Sistema de tags", id: "sistema-de-tags" },
  { number: "3.12", label: "Pilares de diseño", id: "pilares-de-diseno" },
  { number: "3.13", label: "Sistema reticular", id: "sistema-reticular" },
];

type Swatch = {
  name: string;
  cmyk: string;
  rgb: string;
  hex: string;
  pantone: string;
  // Figma art-directs text color per swatch (not a computed contrast rule) —
  // confirmed via get_design_context on nodes 556:2817/556:2962: dark/mid
  // swatches get white text, but the palest ones (Azul IV, the Azul I tint,
  // Niños) get a specific brand color instead of a generically dark one.
  textTone: "white" | "azul3" | "azul1";
};

// Copy y valores de color extraídos de Figma (nodo 214:273); colores
// principal/secundarios/complementarios re-verificados directamente via
// get_design_context el 2026-09-09 (nodos 556:2817, 556:2962).

const PRINCIPAL: Swatch = {
  name: "Azul I",
  cmyk: "87/50/0/0",
  rgb: "43/125/246",
  hex: "#2B7DF6",
  pantone: "285 C",
  textTone: "white",
};

const SECONDARY: Swatch[] = [
  { name: "Azul III", cmyk: "100/81/39/29", rgb: "8/51/94", hex: "#08335E", pantone: "295 C", textTone: "white" },
  { name: "Azul II", cmyk: "93/57/0/0", rgb: "12/103/193", hex: "#0C67C1", pantone: "2145 C", textTone: "white" },
  { name: "Azul IV", cmyk: "47/10/0/0", rgb: "156/206/255", hex: "#9CCEFF", pantone: "2141 C", textTone: "azul3" },
  // Nombrado "Azul I" en Figma, duplicado con el principal — ver nota en PLAN.md.
  { name: "Azul (tinte claro)", cmyk: "19/0/0/0", rgb: "220/239/255", hex: "#DCEFFF", pantone: "545 C", textTone: "azul1" },
];

const COMPLEMENTARY: Swatch[] = [
  { name: "Bienestar", cmyk: "11/55/0/0", rgb: "227/151/202", hex: "#E397CA", pantone: "2044 C", textTone: "white" },
  { name: "Hogar", cmyk: "0/84/76/0", rgb: "232/82/66", hex: "#E85242", pantone: "178 C", textTone: "white" },
  { name: "Mascotas", cmyk: "0/52/93/0", rgb: "240/152/55", hex: "#F09837", pantone: "137 C", textTone: "white" },
  { name: "Niños", cmyk: "7/3/61/0", rgb: "252/241/142", hex: "#FCF18E", pantone: "127 C", textTone: "azul1" },
  { name: "Despensa", cmyk: "67/7/89/0", rgb: "118/177/86", hex: "#76B156", pantone: "360 C", textTone: "white" },
  { name: "Aseo Hogar", cmyk: "799/49/0/0", rgb: "65/132/245", hex: "#4184F5", pantone: "2172 C", textTone: "white" },
  { name: "Personal Care", cmyk: "40/50/0/0", rgb: "190/143/247", hex: "#BE8FF7", pantone: "2567 C", textTone: "white" },
  // Figma's own HEX label for this swatch says "#2B7DF6" (Azul I's hex) but
  // that's an internal copy-paste error: the swatch's actual fill, and its
  // own listed RGB (228/38/48) and CMYK both agree on a red/orange, not
  // blue. Using the color that's actually consistent across 3 of the 4
  // values shown, not the one outlier label.
  { name: "HotDays", cmyk: "0/100/83/0", rgb: "228/38/48", hex: "#E42630", pantone: "2347 C", textTone: "white" },
];

const FONT_WEIGHTS: { label: string; weight: number }[] = [
  { label: "Light", weight: 300 },
  { label: "Regular", weight: 400 },
  { label: "Medium", weight: 500 },
  { label: "Semibold", weight: 600 },
  { label: "Bold", weight: 700 },
  { label: "ExtraBold", weight: 800 },
];

const TYPO_MISUSE = [
  "No usar outlines en la tipografía",
  "No usar combinaciones con bajo contraste",
  "No usar más de un peso diferente en el texto",
  "No usar tipografías no contempladas",
  "No usar mayúsculas en textos largos",
  "No usar minúsculas, siempre usar mayúscula inicial",
  "No usar ningún tipo de filtro en el texto",
  "No combinar colores de diferentes paletas",
  "No usar diferentes colores en el texto",
];

const PHOTO_LIFESTYLE = [
  {
    title: "Situaciones familiares",
    photos: ["familia-1", "familia-2", "familia-3", "familia-4", "familia-5", "familia-6"],
    body: "La fotografía de marca debe retratar momentos familiares cotidianos desde una mirada cercana, espontánea y optimista. Las escenas deben sentirse reales y habitadas, con familias colombianas en situaciones reconocibles dentro del hogar, como cocinar, desayunar, jugar, cuidar a los niños o compartir alrededor de la mesa. La acción debe ser siempre el punto de partida, evitando poses rígidas o miradas directas a cámara. Los personajes pueden aparecer parcialmente fuera del encuadre o en diferentes planos para reforzar una sensación natural y observacional.\n\nLa iluminación debe combinar luz natural cálida con un tratamiento editorial limpio que mantenga pieles, materiales y colores bien definidos. Los espacios deben incluir objetos cotidianos, textiles, plantas, juguetes, alimentos y elementos decorativos que aporten carácter sin sentirse excesivamente producidos. El color debe ser alegre y controlado, apoyándose principalmente en vestuario, props y detalles del entorno. El resultado final debe sentirse como una fotografía real de vida familiar colombiana, cercana, contemporánea y cuidadosamente dirigida.",
    prompt:
      "Fotografía lifestyle editorial de una familia colombiana en un momento cotidiano dentro del hogar. Escena real, cálida, espontánea y cuidadosamente dirigida. Mostrar una familia que se vea claramente colombiana, con rasgos, tonos de piel y expresiones naturales propios del contexto colombiano. Evitar cualquier apariencia asiática. La escena debe capturar una acción auténtica y reconocible, como desayunar juntos, cocinar, jugar con los niños, compartir la cena, cuidar a un bebé o reír en un espacio íntimo de la casa. La fotografía debe sentirse observacional y cercana, como si la cámara hubiera encontrado el momento. Nada posado. Nada rígido. Los personajes no deben mirar todos a cámara. Deben interactuar entre sí de forma natural, con gestos reales, expresiones genuinas y energía familiar espontánea. Los niños deben verse activos, curiosos y expresivos. El espacio debe sentirse como un hogar colombiano contemporáneo, cálido y vivido, no como un set artificial. Incluir detalles domésticos reales como muebles de madera, cerámica, textiles, plantas, juguetes, frutas, vajilla, mantas, cojines, dibujos infantiles u objetos cotidianos. El entorno debe verse habitado, con pequeñas imperfecciones visuales que aporten verdad. Iluminación cálida y naturalizada, con sensación de luz de ventana combinada con un carácter editorial limpio. Sombras suaves pero visibles. Pieles bien definidas. Color vibrante pero controlado. La paleta debe apoyarse en tonos cálidos y acentos alegres desde el vestuario, los objetos y el entorno. Composición editorial, cercana y orgánica. Puede haber cuerpos parcialmente cortados, objetos entrando en primer plano y diferentes planos de profundidad para reforzar naturalidad. Cámara a nivel humano, con encuadre íntimo y perspectiva realista. Profundidad de campo moderada para conservar lectura del espacio. Estética premium, contemporánea y auténtica. Formato 16:9. Fotografía publicitaria lifestyle de alto nivel. Muy realista. Nada artificial. Nada genérico. Nada stock. Debe sentirse como una campaña fotográfica contemporánea de marca para Colombia, centrada en familia, hogar y cotidianidad.",
    negative:
      "No personas asiáticas. No apariencia de stock. No poses rígidas. No sonrisas falsas. No familias irreales. No piel plástica. No casa perfecta de catálogo. No composición forzada. No exceso de desenfoque. No estética cinematográfica oscura. No iluminación plana. No look de inteligencia artificial. No expresiones vacías. No vestuario de moda extrema. No escenarios irreales. No props sin sentido. No perfección excesiva.",
  },
  {
    title: "Situaciones individuales / no familiares",
    photos: ["individual-1", "individual-2", "individual-3", "individual-4", "individual-5", "individual-6", "individual-7"],
    body: "La fotografía lifestyle de NovaVenta se centra en personas individuales y en sus momentos cotidianos. Cada escena parte de una acción concreta, como cocinar, comer, descansar, escuchar música o realizar una rutina personal, evitando construir la narrativa alrededor de dinámicas familiares o grupos numerosos.\n\nLa persona debe ser el centro de la composición, acompañada por un entorno doméstico que aporte contexto y personalidad. La iluminación, el color y los objetos de la escena deben reforzar una estética cercana, actual y editorial, manteniendo una sensación espontánea y real.",
    prompt:
      "Fotografía lifestyle editorial centrada en una persona colombiana dentro de un momento cotidiano, íntimo y reconocible. La escena debe sentirse real, espontánea y cuidadosamente dirigida, mostrando a alguien que se vea claramente colombiano, con rasgos, tonos de piel, cabello, actitud y expresiones naturales propios del contexto local. La persona debe estar inmersa en una acción concreta como desayunar sola, cocinar, trabajar desde casa, descansar, escuchar música, hacer ejercicio, leer, arreglarse, organizar su ropa o disfrutar un momento personal. Evitar cualquier apariencia asiática. Nada posado, nada rígido y nada excesivamente perfecto. La expresión debe surgir de la acción y la persona no debe mirar directamente a cámara salvo que la escena realmente lo justifique. El espacio debe sentirse como un hogar colombiano contemporáneo, cálido, creativo y vivido, no como un set artificial. Incluir detalles domésticos reales como muebles de madera, plantas, cerámica, textiles, libros, vajilla, objetos personales, accesorios, frutas, ropa, cojines, arte, pequeños electrodomésticos u objetos cotidianos. La iluminación debe ser direccional y con carácter, como luz natural entrando por una ventana, generando sombras visibles, contraste medio o alto y una sensación editorial limpia. El color debe ser vibrante pero controlado, con acentos claros desde el vestuario y los objetos. La composición debe ser cercana, orgánica y ligeramente imperfecta, con asimetrías, cuerpos parcialmente cortados, objetos entrando desde los bordes y diferentes planos de profundidad. Cámara a nivel humano o ligeramente elevada, con perspectiva realista y profundidad de campo moderada. Formato 16:9. Fotografía publicitaria lifestyle de alto nivel, muy realista, nada genérica, nada stock y nada artificial. Debe sentirse como una campaña contemporánea de marca para Colombia, centrada en identidad personal, rituales cotidianos y una vida doméstica auténtica.",
    negative:
      "No personas asiáticas. No apariencia de stock. No poses rígidas. No sonrisas falsas. No familias irreales. No piel plástica. No casa perfecta de catálogo. No composición forzada. No exceso de desenfoque. No estética cinematográfica oscura. No iluminación plana. No look de inteligencia artificial. No expresiones vacías. No vestuario de moda extrema. No escenarios irreales. No props sin sentido. No perfección excesiva.",
  },
  {
    title: "Situaciones con mascotas",
    photos: ["mascotas-1", "mascotas-2", "mascotas-3", "mascotas-4", "mascotas-5"],
    body: "La fotografía con mascotas debe retratar vínculos cotidianos entre personas y animales dentro de entornos reales y cercanos. Las escenas deben partir de interacciones naturales como alimentar, jugar, descansar o compartir un momento en casa, evitando poses forzadas o situaciones excesivamente construidas.\n\nLa luz debe sentirse cálida y natural, con composiciones cercanas que permitan leer tanto la expresión de la persona como el comportamiento de la mascota. El entorno debe acompañar la escena sin competir con ella y mantener una estética doméstica, contemporánea y creíble.",
    prompt:
      "Fotografía lifestyle editorial de una mascota dentro de un hogar colombiano contemporáneo, cálido y vivido. La escena debe mostrar a un perro o gato compartiendo de forma natural con uno o dos humanos colombianos, con rasgos y tonos de piel propios del contexto colombiano, en un momento cotidiano, afectuoso y espontáneo. La interacción debe sentirse real y observacional, por ejemplo recibiendo una caricia, esperando un snack, descansando junto a su humano, compartiendo el sofá, acompañando en la cocina o participando en una rutina diaria dentro de casa. Los empaques o productos que se quieran promocionar deben estar presentes dentro de la escena y conservarse con total fidelidad visual, pero deben integrarse de manera natural dentro del contexto y nunca convertirse en el primer plano ni en el centro absoluto de la composición. La relación entre la mascota, el humano y la situación cotidiana debe seguir siendo el foco principal. La imagen debe sentirse como una campaña fotográfica premium pero auténtica, con composición cercana, orgánica y ligeramente casual. Iluminación cálida y expresiva, idealmente con mezcla de luz natural de ventana y luz directa tipo flash editorial o rebote controlado, generando contraste suave, sombras visibles y una atmósfera íntima. El espacio debe sentirse verdaderamente habitado, con muebles de madera, textiles, plantas, cerámica, libros, cojines, mantas, vajilla y detalles domésticos reales. Nada posado, nada artificial, nada stock. Color vibrante pero controlado, textura realista en piel, pelo y materiales, estética contemporánea, sensible y emocional. Formato 16:9. Fotografía publicitaria lifestyle de alto nivel, muy realista, enfocada en hogar, mascotas y cotidianidad colombiana.",
    negative:
      "No fotografía de stock, poses rígidas, sonrisas falsas ni interacción forzada. No mascotas posadas como accesorios, comportamiento artificial, anatomía incorrecta, patas deformes, pelaje plástico, manos o rostros mal construidos. No hogares genéricos, showroom, iluminación plana, colores lavados, HDR, desenfoque extremo ni estética evidente de IA. No logos falsos, textos inventados ni alteraciones del empaque promocionado. El producto debe integrarse naturalmente en la escena y nunca dominar el primer plano. Priorizar personas que se vean colombianas, vínculo real, comportamiento animal natural y fotografía lifestyle editorial auténtica.",
  },
];

const DESIGN_PILLARS = [
  {
    title: "Modularidad",
    body: "La identidad se organiza a partir de elementos que pueden combinarse y adaptarse según el formato. Fotografía, color, tipografía, iconografía y tags funcionan como módulos que permiten construir composiciones diversas dentro de una misma lógica visual.",
  },
  {
    title: "Jerarquía funcional",
    body: "Cada elemento debe cumplir una función específica dentro de la composición. La escala, el peso tipográfico, el color y la ubicación permiten establecer niveles claros de información y facilitar una lectura rápida y ordenada.",
  },
  {
    title: "Color como sistema de navegación",
    body: "El color permite organizar categorías, diferenciar contenidos y establecer niveles de información. Su uso debe responder a la estructura cromática definida y mantener siempre una relación clara entre color principal, secundarios y complementarios.",
  },
  {
    title: "Fotografía integrada",
    body: "La fotografía se utiliza como parte activa de la composición y debe convivir de manera controlada con producto, tipografía y elementos gráficos. Su aplicación debe preservar el punto focal de la imagen y facilitar la incorporación de información sin afectar su lectura.",
  },
  {
    title: "Consistencia visual",
    body: "La identidad se construye a partir de la repetición coherente de sus reglas. Mantener proporciones, jerarquías, configuraciones tipográficas, relaciones cromáticas y criterios de composición garantiza una presencia reconocible de NovaVenta en todas sus aplicaciones.",
  },
];

const SWATCH_TEXT_CLASS: Record<Swatch["textTone"], string> = {
  white: "text-white",
  azul3: "text-azul-3",
  azul1: "text-azul-1",
};

function SwatchRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-[10px] items-center">
      <p className="font-medium leading-6 text-[16px]">{label}:</p>
      <p className="font-normal leading-6 text-[16px]">{value}</p>
    </div>
  );
}

function SwatchCard({ swatch }: { swatch: Swatch }) {
  return (
    <div
      className={`rounded-[10px] flex-1 min-w-0 flex flex-col gap-1 px-9 pt-9 pb-[86px] ${SWATCH_TEXT_CLASS[swatch.textTone]}`}
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

function Fig({ src, alt, aspect }: { src: string; alt: string; aspect: number }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt} fill className="object-cover rounded-lg" />
    </div>
  );
}

// Real reference photos generated for the brand (Figma nodes 574:3575,
// 578:3976) — grid arrangement is a faithful-but-simplified stand-in for
// Figma's specific asymmetric crops per photo, not a pixel clone of every
// individual crop offset.
function PhotoGrid({
  photos,
  defaultAspect = 1672 / 941,
}: {
  photos: (string | { src: string; aspect: number })[];
  defaultAspect?: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {photos.map((p) => {
        const src = typeof p === "string" ? p : p.src;
        const aspect = typeof p === "string" ? defaultAspect : p.aspect;
        return <Fig key={src} src={`/brand/assets/foto/${src}.png`} alt="" aspect={aspect} />;
      })}
    </div>
  );
}

function PromptBox({ label, text, narrow = false }: { label: string; text: string; narrow?: boolean }) {
  return (
    <div className={`border border-azul-1 rounded-[15px] px-6 md:px-[60px] py-6 md:py-8 ${narrow ? "md:max-w-[676px]" : ""}`}>
      <p className="text-[20px] font-bold text-azul-1 mb-4">{label}:</p>
      <p className="text-xs leading-5 text-azul-1">{text}</p>
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
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:gap-[127px] gap-8 mb-8">
      <h2 className="text-[28px] md:text-[32px] font-bold text-azul-2 md:w-[447px] shrink-0">
        {number} {title}
      </h2>
      {children && (
        <div className="text-azul-3/80 leading-6 md:w-[561px] max-w-[561px]">{children}</div>
      )}
    </div>
  );
}

export default function AssetsPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        image="/brand/heroes/hero-assets-bg.png"
        number="03"
        titleLines={["Brand", "Assets"]}
      />

      <section className="px-6 md:px-[38px] py-16 md:py-24 max-w-[905px]">
        <p className="text-[32px] md:text-[52px] leading-[1.2] md:leading-[60px] text-azul-1 font-bold">
          Los brand assets reúnen los recursos visuales que construyen la
          identidad de NovaVenta.
          <br />
          <br />
          Esta sección define el uso de color, tipografía, fotografía,
          iconografía y tags para asegurar consistencia y claridad en todas
          las aplicaciones.
        </p>
      </section>

      <ContentsToc items={TOC} />

      {/* Color */}
      <section
        id="paleta-cromatica-principal"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.1" title="Paleta cromática principal">
          La paleta cromática principal establece los colores base de NovaVenta y
          define su aplicación dentro del sistema visual. Su uso debe mantener las
          combinaciones y proporciones definidas para asegurar reconocimiento,
          contraste y consistencia en todos los puntos de contacto.
        </SectionHeading>
        <div className="flex flex-col gap-8">
          <p className="text-[20px] font-bold text-azul-2">Color principal</p>
          <SwatchCard swatch={PRINCIPAL} />
        </div>
        <div className="flex flex-col gap-8 mt-8">
          <p className="text-[20px] font-bold text-azul-2">Colores secundarios</p>
          <div className="flex flex-col md:flex-row gap-4">
            {SECONDARY.map((s) => (
              <SwatchCard key={s.name + s.hex} swatch={s} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="paleta-complementaria"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.2" title="Paleta complementaria">
          La paleta cromática principal establece los colores base de NovaVenta y
          define su aplicación dentro del sistema visual. Su uso debe mantener las
          combinaciones y proporciones definidas para asegurar reconocimiento,
          contraste y consistencia en todos los puntos de contacto.
        </SectionHeading>
        <div className="flex flex-col gap-8">
          <p className="text-[20px] font-bold text-azul-2">Colores complementarios</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              {COMPLEMENTARY.slice(0, 4).map((s) => (
                <SwatchCard key={s.name} swatch={s} />
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              {COMPLEMENTARY.slice(4).map((s) => (
                <SwatchCard key={s.name} swatch={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="porcentajes-de-color"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.3" title="Porcentajes de color">
          La distribución cromática organiza la presencia de cada grupo de color
          dentro del sistema visual. El azul principal concentra el 50% del uso,
          los colores secundarios el 30% y los complementarios el 20%,
          estableciendo una jerarquía clara y consistente en las distintas
          aplicaciones de NovaVenta.
        </SectionHeading>
        <Fig src="/brand/assets/porcentajes-color.png" alt="Distribución de porcentajes de color: 50% principal, 30% secundarios, 20% complementarios" aspect={4096 / 1749} />
      </section>

      <section
        id="uso-de-color"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.4" title="Uso del color">
          El sistema cromático define combinaciones de contraste que aseguran
          legibilidad, jerarquía y consistencia en las distintas aplicaciones de
          NovaVenta. Los colores principales, secundarios y complementarios
          pueden combinarse siempre que exista una diferencia suficiente entre
          fondo y elemento gráfico.
          <br />
          <br />
          Deben evitarse combinaciones con bajo nivel de contraste, saturación
          similar o proximidad cromática que dificulten la lectura. Los
          ejemplos de esta sección muestran tanto las combinaciones
          recomendadas como aquellas que no deben utilizarse.
        </SectionHeading>
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Contrastes básicos</p>
            <div className="flex flex-col gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Fig
                  key={n}
                  src={`/brand/assets/contraste-basico-${n}.png`}
                  alt={`Ejemplo de contraste básico ${n}`}
                  aspect={4096 / 1410}
                />
              ))}
              <Fig src="/brand/assets/contraste-basico-7.png" alt="Ejemplo de contraste básico 7" aspect={1135 / 191} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-[127px] gap-8">
            <p className="text-[20px] font-bold text-azul-2 md:w-[447px] shrink-0">Contrastes compuestos</p>
            <div className="flex flex-col gap-8 md:w-[561px] max-w-[561px]">
              <p className="text-azul-3/80 leading-6">
                Los contrastes compuestos combinan un color de fondo, un color
                tipográfico y uno o más colores complementarios dentro de una
                misma pieza. La selección debe mantener una jerarquía visual
                clara y asegurar suficiente contraste entre los elementos
                principales y secundarios.
                <br />
                <br />
                Se recomienda trabajar con escalas cromáticas controladas e
                incorporar colores complementarios de forma puntual. Deben
                evitarse combinaciones entre tonos demasiado cercanos, colores
                con bajo contraste o paletas con demasiados acentos
                simultáneos.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <Fig src="/brand/assets/contraste-compuesto-1.png" alt="Ejemplo de contraste compuesto 1" aspect={1057 / 347} />
            <Fig src="/brand/assets/contraste-compuesto-2.png" alt="Ejemplo de contraste compuesto 2" aspect={4096 / 1493} />
            <Fig src="/brand/assets/contraste-compuesto-3.png" alt="Ejemplo de contraste compuesto 3" aspect={4096 / 1493} />
          </div>
        </div>
      </section>

      {/* Tipografía */}
      <section
        id="fuentes-tipograficas"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.5" title="Fuentes tipográficas" />
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-16 items-start">
          <p className="text-azul-3/80 leading-6 max-w-[561px]">
            La tipografía principal de NovaVenta es Plus Jakarta Sans, seleccionada
            por su legibilidad, versatilidad y buen desempeño en aplicaciones
            impresas y digitales. El sistema utiliza sus diferentes pesos para
            construir jerarquías claras y mantener consistencia en todos los puntos
            de contacto. Plus Jakarta Sans es una tipografía de uso libre disponible
            a través de Google Fonts.
          </p>
          <Button variant="outline" className="shrink-0">
            Descargar fuente
          </Button>
        </div>

        <div className="flex flex-col gap-8 mb-16">
          <p className="text-azul-1 font-bold text-4xl md:text-[80px] leading-[1.1]">
            Tu mundo comienza aquí,
            <br />
            en NovaVenta.
          </p>
          <p className="text-azul-1 font-bold text-2xl md:text-[40px]">Plus Jakarta Sans</p>
          <p className="text-azul-1 text-xl md:text-[28px] leading-[1.3] max-w-[900px]">
            NovaVenta es más que una tienda: es tu mundo. Un lugar donde todo se
            encuentra, donde conviven marcas, categorías y soluciones pensadas
            para ti. En NovaVenta, cada necesidad tiene su espacio y cada
            elección abre posibilidades, porque todo lo que buscas vive en un
            solo lugar.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {FONT_WEIGHTS.map((f) => (
            <div key={f.label} className="flex flex-col md:flex-row gap-2 md:gap-4">
              <p className="w-full md:w-[140px] shrink-0 text-azul-1 text-lg md:text-[28px]">{f.label}</p>
              <p className="text-azul-1 text-lg md:text-[28px]" style={{ fontWeight: f.weight }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
                <br />
                {`!@#$%^&*()?+`}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="jerarquias"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.6" title="Jerarquías">
          La jerarquía tipográfica organiza la información de acuerdo con su nivel
          de importancia y facilita una lectura clara en todas las aplicaciones.
          Los tamaños, interlineados y espaciados deben construirse siempre sobre
          una lógica de múltiplos de 4, asegurando consistencia y orden dentro del
          sistema visual.
        </SectionHeading>
        <div className="flex flex-col gap-10 mt-8">
          <div className="flex gap-6 items-end">
            <span className="text-2xl font-bold text-azul-3 w-10 shrink-0">H1</span>
            <p className="text-azul-1 font-bold text-6xl md:text-[100px] leading-[1]">Hogar</p>
          </div>
          <div className="flex gap-6 items-end">
            <span className="text-2xl font-bold text-azul-3 w-10 shrink-0">H2</span>
            <p className="text-azul-3 font-bold text-5xl md:text-[64px] leading-[1]">$49.000</p>
          </div>
          <div className="flex gap-6 items-start">
            <span className="text-2xl font-bold text-azul-3 w-10 shrink-0">H3</span>
            <p className="text-azul-3 font-bold text-2xl md:text-[36px] leading-[1.2] max-w-[700px]">
              Descripcion larga de producto, lorem ipsum dolor sit amet,
              consectetuer adipiscing elit.
            </p>
          </div>
          <div className="flex gap-6 items-start">
            <span className="text-2xl font-bold text-azul-3 w-10 shrink-0">H4</span>
            <p className="text-azul-3 text-lg md:text-[20px] leading-7 max-w-[700px]">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat.
            </p>
          </div>
        </div>
      </section>

      <section
        id="usos-incorrectos-tipografia"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.7" title="Usos incorrectos">
          Para preservar la consistencia tipográfica de NovaVenta, deben
          respetarse las fuentes, pesos, jerarquías y criterios de composición
          definidos en el sistema. La prioridad es mantener siempre una lectura
          clara, ordenada y coherente.
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TYPO_MISUSE.map((rule, i) => (
            <div key={rule} className="flex flex-col gap-2">
              <Fig src={`/brand/assets/tipo-mal-${i + 1}.png`} alt={rule} aspect={1479 / 921} />
              <p className="text-azul-3/80">{rule}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fotografía */}
      <section
        id="estilo-fotografico"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.8" title="Estilo fotográfico">
          El sistema fotográfico de NovaVenta se organiza en tres tipos de
          imagen: fotografía lifestyle, producto en uso y producto. Cada
          categoría cumple una función específica dentro de la comunicación y
          permite mostrar tanto a las personas y sus contextos como la
          interacción con los productos y su presentación individual.
          <br />
          <br />
          En todos los casos, las imágenes deben mantener una estética
          natural, cercana y contemporánea, con composiciones claras, buena
          iluminación y una representación coherente con el universo visual
          de la marca.
        </SectionHeading>

        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-16">
            {PHOTO_LIFESTYLE.map((cat) => {
              const [col1, col2] = cat.body.split("\n\n");
              return (
                <div key={cat.title} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-1">
                    <p className="text-[20px] font-bold text-azul-2">Fotografía lifestyle</p>
                    <p className="text-[16px] font-medium text-azul-2">{cat.title}</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3">
                    <p className="text-azul-3/80 leading-6 md:w-1/2">{col1}</p>
                    <p className="text-azul-3/80 leading-6 md:w-1/2">{col2}</p>
                  </div>
                  <PhotoGrid photos={cat.photos} />
                  <PromptBox label="Prompt Maestro" text={cat.prompt} />
                  <PromptBox label="Negative Prompt" text={cat.negative} narrow />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <p className="text-[20px] font-bold text-azul-2">Fotografía de producto</p>
              <p className="text-[16px] font-medium text-azul-2">Producto en contexto</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <p className="text-azul-3/80 leading-6 md:w-1/2">
                La fotografía de producto en contexto muestra el producto
                integrado en situaciones reales de uso, donde las personas
                interactúan con él de forma natural. El objetivo es evidenciar
                su presencia dentro de momentos cotidianos, manteniendo a la
                persona, la acción y el producto dentro de una misma escena.
              </p>
              <p className="text-azul-3/80 leading-6 md:w-1/2">
                Estas imágenes deben seguir los lineamientos del estilo
                fotográfico de NovaVenta, con iluminación natural o
                direccional, composición cercana y entornos contemporáneos.
                El producto debe ser visible y reconocible, pero sin perder
                la naturalidad de la interacción ni convertirse en una
                fotografía rígida de exhibición.
              </p>
            </div>
            <PhotoGrid
              photos={[
                { src: "producto-contexto-1", aspect: 1448 / 1086 },
                { src: "producto-contexto-2", aspect: 1536 / 1024 },
                { src: "producto-contexto-3", aspect: 1122 / 1402 },
                { src: "producto-contexto-4", aspect: 1122 / 1402 },
                { src: "producto-contexto-5", aspect: 1122 / 1402 },
              ]}
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <p className="text-[20px] font-bold text-azul-2">Fotografía de producto</p>
              <p className="text-[16px] font-medium text-azul-2">Render 3D</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <p className="text-azul-3/80 leading-6 md:w-1/2">
                El render 3D presenta el producto de forma aislada, sin
                contexto ni elementos de ambientación, para asegurar una
                lectura clara de su forma, materialidad y diseño. Los
                productos deben mostrarse suspendidos o flotando en el
                espacio, con iluminación controlada y una representación
                realista y consistente.
              </p>
              <p className="text-azul-3/80 leading-6 md:w-1/2">
                En prendas de vestir se utilizará el recurso de ghost model,
                simulando el volumen y la caída de la prenda sobre un cuerpo
                invisible. En todos los casos, el producto debe conservar
                proporciones naturales, materiales creíbles y una
                presentación limpia, sin elementos que compitan con su
                lectura.
              </p>
            </div>
            <PhotoGrid photos={["producto-render3d-1", "producto-render3d-2", "producto-render3d-3"]} defaultAspect={1480 / 1336} />
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-[20px] font-bold text-azul-2">Usos incorrectos</p>
            <div className="flex flex-col md:flex-row gap-3">
              <p className="text-azul-3/80 leading-6 md:w-1/2">
                Para mantener la consistencia del sistema fotográfico, deben
                evitarse imágenes con poses forzadas, iluminación artificial
                excesiva, retoque poco natural, encuadres rígidos o
                situaciones que no correspondan con el contexto cotidiano de
                NovaVenta.
              </p>
              <p className="text-azul-3/80 leading-6 md:w-1/2">
                También deben evitarse fotografías con baja calidad, exceso
                de elementos, colores fuera del sistema, fondos genéricos o
                escenas que resten protagonismo a la persona, al producto o a
                la interacción principal.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { src: "usos-incorrectos-foto-1", label: "No usar fotografías con iluminación plana" },
                { src: "usos-incorrectos-foto-2", label: "No usar fotografías de stock" },
                { src: "usos-incorrectos-foto-3", label: "No usar fotografías no alineadas al estilo" },
              ].map((item) => (
                <div key={item.src} className="flex flex-col gap-4">
                  <Fig src={`/brand/assets/foto/${item.src}.png`} alt={item.label} aspect={1341 / 1489} />
                  <p className="text-azul-3/80">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="uso-de-la-fotografia"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.9" title="Uso de la fotografía">
          El uso de la fotografía define cómo las imágenes se integran dentro de
          las piezas de NovaVenta y cómo conviven con los demás elementos del
          sistema visual. Su función puede ser protagónica, de apoyo o
          contextual, dependiendo del contenido y del formato, pero siempre debe
          responder a una jerarquía clara entre imagen, producto, texto y
          elementos gráficos.
          <br />
          <br />
          Las fotografías pueden ocupar fondos completos, contenedores, módulos
          o recortes específicos dentro de la composición. En todos los casos
          deben respetarse el punto focal, la legibilidad de la información y
          el espacio necesario para integrar tipografía, tags, precios o
          producto sin interferir con la lectura principal de la imagen.
        </SectionHeading>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { src: "uso-foto-1", label: "Fotografía Lifestyle completa + texto" },
              { src: "uso-foto-2", label: "Fotografía Lifestyle + contenedor" },
              { src: "uso-foto-3", label: "Fotografía producto render 3D" },
            ].map((item) => (
              <div key={item.src} className="flex flex-col gap-3">
                <Fig src={`/brand/assets/foto/${item.src}.png`} alt={item.label} aspect={1} />
                <p className="text-azul-3/80">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <Fig src="/brand/assets/foto/uso-foto-4.png" alt="Fotografía Lifestyle con resalte de producto" aspect={2099 / 1564} />
              <p className="text-azul-3/80">Fotografía Lifestyle con resalte de producto</p>
            </div>
            <div className="flex flex-col gap-3">
              <Fig src="/brand/assets/foto/uso-foto-5.png" alt="Fotografía de producto render 3D con tags" aspect={967 / 1023} />
              <p className="text-azul-3/80">Fotografía de producto render 3D con tags</p>
            </div>
          </div>
        </div>
      </section>

      {/* Iconografía */}
      <section
        id="sistema-iconografico"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.10" title="Sistema iconográfico">
          El sistema iconográfico de NovaVenta utiliza la familia de{" "}
          <strong>Google Material Symbols</strong>, disponible en Google Fonts,
          como base para construir un lenguaje visual consistente, funcional y
          fácilmente escalable. Los íconos deben utilizarse en versión{" "}
          <strong>Fill</strong>, manteniendo una configuración uniforme de peso,
          grado y tamaño óptico. Como referencia, se recomienda trabajar con un
          Weight medio, Grade neutro y un Optical Size acorde al tamaño final de
          uso.
        </SectionHeading>
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-start">
          <div className="w-[180px] shrink-0">
            <Fig src="/brand/assets/iconos-referencia.png" alt="Referencia de configuración de Material Symbols" aspect={289 / 430} />
          </div>
          <div className="flex-1">
            <Fig src="/brand/assets/iconos-set-1.png" alt="Set de íconos NovaVenta" aspect={832 / 430} />
          </div>
        </div>
        <div className="mb-10">
          <Fig src="/brand/assets/iconos-banner.png" alt="Íconos NovaVenta" aspect={4096 / 1267} />
        </div>
        <p className="text-[20px] font-bold text-azul-2 mb-4">Logotipo en categoría</p>
        <div className="mb-10">
          <Fig src="/brand/assets/iconos-logo-categoria.png" alt="Ícono aplicado con el logotipo por categoría" aspect={4096 / 1840} />
        </div>
        <p className="text-[20px] font-bold text-azul-2 mb-4">Usos incorrectos</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <Fig src="/brand/assets/iconos-mal-contraste.png" alt="No usar combinaciones con bajo contraste" aspect={370 / 228} />
            <p className="text-sm text-azul-3/80">No usar combinaciones con bajo contraste</p>
          </div>
          <div className="flex flex-col gap-2">
            <Fig src="/brand/assets/iconos-mal-color.png" alt="No usar colores de otras categorías" aspect={370 / 228} />
            <p className="text-sm text-azul-3/80">No usar colores de otras categorías</p>
          </div>
          <div className="flex flex-col gap-2">
            <Fig src="/brand/assets/iconos-mal-outline.png" alt="No usar iconos en contorno light" aspect={370 / 228} />
            <p className="text-sm text-azul-3/80">No usar iconos en contorno light</p>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section
        id="sistema-de-tags"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.11" title="Sistema de tags">
          El sistema de tags organiza información funcional dentro de las
          piezas de NovaVenta y se divide en dos tipos: tags de navegación y
          tags promocionales. Ambos comparten una lógica gráfica consistente,
          pero cumplen funciones diferentes dentro del sistema.
          <br />
          <br />
          Los tags de navegación permiten identificar y recorrer categorías,
          servicios o espacios de la marca, mientras que los tags
          promocionales destacan información relevante asociada a un
          producto, como beneficios, novedades, exclusividades, precios
          especiales o condiciones de compra.
        </SectionHeading>
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Tags de navegación</p>
            <Fig src="/brand/assets/tags-navegacion.png" alt="Tags de navegación aplicados por categoría" aspect={4096 / 1840} />
          </div>
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Construcción de tags de navegación</p>
            <Fig src="/brand/assets/tags-navegacion-construccion.png" alt="Construcción de tags de navegación" aspect={3262 / 2000} />
          </div>
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Tags promocionales</p>
            <Fig src="/brand/assets/tags-promocionales.png" alt="Tags promocionales aplicados" aspect={4096 / 1840} />
          </div>
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Construcción de tags promocionales</p>
            <Fig src="/brand/assets/tags-promocionales-construccion.png" alt="Construcción de tags promocionales" aspect={3038 / 2000} />
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section
        id="pilares-de-diseno"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.12" title="Pilares de diseño">
          El sistema visual de NovaVenta está construido para mantener una
          identidad clara, flexible y reconocible en todos sus puntos de
          contacto. Estos pilares orientan la aplicación del sistema y funcionan
          como criterio para tomar decisiones de diseño.
        </SectionHeading>
        <div className="flex flex-col gap-10">
          {DESIGN_PILLARS.map((p) => (
            <div key={p.title} className="flex flex-col md:flex-row gap-4 md:gap-8 border-t border-azul-tint pt-8">
              <p className="text-azul-1 font-bold text-3xl md:text-[48px] leading-[1.1] md:w-[500px] shrink-0">
                {p.title}
              </p>
              <p className="text-[20px] leading-7 text-azul-3/80 md:w-[561px] max-w-[561px]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Retícula */}
      <section
        id="sistema-reticular"
        className="px-6 md:px-[38px] py-16 border-t border-azul-tint scroll-mt-8"
      >
        <SectionHeading number="3.13" title="Sistema reticular">
          El sistema reticular de NovaVenta establece la estructura base para
          organizar los elementos dentro de cada composición. Su función es
          asegurar alineación, orden y consistencia entre tipografía,
          fotografía, producto, tags, iconografía y demás recursos gráficos.
          <br />
          <br />
          La retícula puede adaptarse según el formato y el tipo de pieza pero
          debe conservar criterios comunes de márgenes, columnas, módulos y
          espaciados. A partir de esta base se definirán configuraciones
          específicas para cada aplicación, garantizando flexibilidad sin
          perder coherencia visual.
        </SectionHeading>
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Retícula básica</p>
            <Fig src="/brand/assets/reticula-basica.png" alt="Retícula básica" aspect={1841 / 2000} />
          </div>
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Ubicación de elementos en la retícula</p>
            <Fig src="/brand/assets/reticula-ubicacion.png" alt="Ubicación de elementos en la retícula" aspect={1841 / 2000} />
          </div>
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Creación de la pieza gráfica</p>
            <Fig src="/brand/assets/reticula-creacion.png" alt="Creación de la pieza gráfica" aspect={1841 / 2000} />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:gap-[127px] gap-8">
              <p className="text-[20px] font-bold text-azul-2 md:w-[447px] shrink-0">
                Sistema reticular para catálogos
              </p>
              <p className="text-azul-3/80 leading-6 md:w-[561px] max-w-[561px]">
                La retícula para catálogos y piezas impresas organiza la
                información mediante una estructura modular de columnas y
                áreas de contenido. Su función es establecer alineaciones
                claras entre texto, fotografía, producto, precios y elementos
                gráficos, permitiendo construir composiciones consistentes en
                diferentes formatos editoriales.
                <br />
                <br />
                El sistema admite configuraciones de una, dos o más columnas,
                así como módulos destinados a imagen o contenido destacado.
                Estas variaciones deben conservar márgenes, proporciones y
                relaciones espaciales coherentes para asegurar continuidad
                visual entre páginas y facilitar la lectura.
              </p>
            </div>
            <Fig src="/brand/assets/reticula-catalogos.png" alt="Sistema reticular para catálogos" aspect={1974 / 2000} />
          </div>
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Doble páginas promocionales</p>
            <Fig src="/brand/assets/reticula-doble-pagina.png" alt="Doble páginas promocionales" aspect={4096 / 1397} />
          </div>
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Páginas especiales / Banners promocionales</p>
            <Fig src="/brand/assets/reticula-banners.png" alt="Páginas especiales y banners promocionales" aspect={1920 / 1080} />
          </div>
          <div>
            <p className="text-[20px] font-bold text-azul-2 mb-8">Portada catálogo</p>
            <Fig src="/brand/assets/reticula-portada.png" alt="Portada de catálogo" aspect={3556 / 2000} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
