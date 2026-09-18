/**
 * Single source of truth for the "AI-readable" layer (`/brand.json`,
 * `/llms.txt`, the site's JSON-LD) and for the color/typography data used on
 * the Assets page — moved out of `assets/page.tsx` so both consumers read
 * the same confirmed values instead of duplicating them by hand. Every value
 * here is already confirmed against Figma (see `context.md`/`PLAN.md`);
 * nothing new was invented for this file.
 */

export const SITE_NAME = "NovaVenta";
export const SITE_URL = "https://nova-brandbook-nine.vercel.app";
export const SITE_DESCRIPTION =
  "Manual de marca de NovaVenta: estrategia, master brand y assets. Un manual de marca vivo, construido en HTML semántico y datos estructurados para que personas y modelos de IA lo lean con la misma claridad.";

export type Swatch = {
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

export const PRINCIPAL: Swatch = {
  name: "Azul I",
  cmyk: "87/50/0/0",
  rgb: "43/125/246",
  hex: "#2B7DF6",
  pantone: "285 C",
  textTone: "white",
};

export const SECONDARY: Swatch[] = [
  { name: "Azul III", cmyk: "100/81/39/29", rgb: "8/51/94", hex: "#08335E", pantone: "295 C", textTone: "white" },
  { name: "Azul II", cmyk: "93/57/0/0", rgb: "12/103/193", hex: "#0C67C1", pantone: "2145 C", textTone: "white" },
  { name: "Azul IV", cmyk: "47/10/0/0", rgb: "156/206/255", hex: "#9CCEFF", pantone: "2141 C", textTone: "azul3" },
  // Nombrado "Azul I" en Figma, duplicado con el principal — ver KNOWN_CONTENT_ISSUES.
  { name: "Azul (tinte claro)", cmyk: "19/0/0/0", rgb: "220/239/255", hex: "#DCEFFF", pantone: "545 C", textTone: "azul1" },
];

// Actualizado 2026-09-18 desde la mesa de trabajo viva 03 ASSETS (N55, nodo
// 214:273 → grid Frame 81 556:2996: fila 1 = 556:2998, fila 2 = 556:3103,
// fila 3 = 656:1232), verificado via get_design_context. Son 10 colores en
// 3 filas (4/4/2). La paleta se reestructuró: renombres + dos colores nuevos
// (Moda, Fragancias). Personal Care y HotDays SIGUEN (fila 3). Orden y textos
// TAL CUAL vienen de Figma. Anomalías señaladas al equipo de diseño (no
// corregidas por nuestra cuenta):
//   · Figma escribe "Depensa" (falta la "s"); corregido a "Despensa" por
//     pedido de Andrés (2026-09-18) — único cambio nuestro sobre el texto.
//   · El naranja #F09837 (antes "Mascotas") ahora se rotula "Despensa", y el
//     verde #76B156 (antes "Despensa") ahora se rotula "Mascotas" — se ven
//     intercambiados los nombres respecto de la versión anterior (se dejó
//     como Figma, confirmado con Andrés).
//   · Aseo Hogar: Figma trae CMYK 79/49/0/0 (la versión previa tenía el typo
//     "799/49/0/0"); usamos el valor de Figma.
export const COMPLEMENTARY: Swatch[] = [
  { name: "Belleza", cmyk: "11/55/0/0", rgb: "227/151/202", hex: "#E397CA", pantone: "2044 C", textTone: "white" },
  { name: "Hogar", cmyk: "0/84/76/0", rgb: "232/82/66", hex: "#E85242", pantone: "178 C", textTone: "white" },
  { name: "Despensa", cmyk: "0/52/93/0", rgb: "240/152/55", hex: "#F09837", pantone: "137 C", textTone: "white" },
  { name: "Niños", cmyk: "7/3/61/0", rgb: "252/241/142", hex: "#FCF18E", pantone: "127 C", textTone: "azul1" },
  { name: "Mascotas", cmyk: "67/7/89/0", rgb: "118/177/86", hex: "#76B156", pantone: "360 C", textTone: "white" },
  { name: "Moda", cmyk: "88/24/50/10", rgb: "34/135/132", hex: "#228784", pantone: "569 C", textTone: "white" },
  { name: "Aseo Hogar", cmyk: "79/49/0/0", rgb: "65/132/245", hex: "#4184F5", pantone: "2172 C", textTone: "white" },
  { name: "Fragancias", cmyk: "75/64/0/0", rgb: "107/107/247", hex: "#6B6BF7", pantone: "2126 C", textTone: "white" },
  // Fila 3 (Frame 656:1232): estos dos SIGUEN en la paleta de Figma, no se
  // removieron.
  { name: "Personal Care", cmyk: "40/50/0/0", rgb: "190/143/247", hex: "#BE8FF7", pantone: "2567 C", textTone: "white" },
  // Figma rotula el HEX de HotDays como "#2B7DF6" (el azul de Azul I) — mismo
  // error de copy-paste de siempre: el fill real es #E42630 y su RGB
  // (228/38/48) y CMYK coinciden en rojo, no azul. Usamos el valor consistente.
  { name: "HotDays", cmyk: "0/100/83/0", rgb: "228/38/48", hex: "#E42630", pantone: "2347 C", textTone: "white" },
];

// Neutros (confirmado, `src/app/globals.css`) — no tienen ficha CMYK/RGB/PANTONE
// propia en Figma como los swatches de color, solo HEX.
export const NEUTRAL: { name: string; hex: string }[] = [
  { name: "Blanco", hex: "#FFFFFF" },
  { name: "Gris 5%", hex: "#F6F6F6" },
];

export const FONT_WEIGHTS: { label: string; weight: number }[] = [
  { label: "Light", weight: 300 },
  { label: "Regular", weight: 400 },
  { label: "Medium", weight: 500 },
  { label: "Semibold", weight: 600 },
  { label: "Bold", weight: 700 },
  { label: "ExtraBold", weight: 800 },
];

export const TYPOGRAPHY = {
  family: "Plus Jakarta Sans",
  source: "Google Fonts",
  license: "Open-source, free to use — no self-hosting required",
  weights: FONT_WEIGHTS,
};

/**
 * Bugs de contenido confirmados en el archivo Figma fuente (no del código de
 * este sitio) — documentados en detalle en `context.md`. Se listan aquí,
 * neutrales, para que tanto humanos como modelos de IA que lean `/brand.json`
 * sepan que no son parte intencional del sistema de marca.
 */
export const KNOWN_CONTENT_ISSUES: { topic: string; issue: string }[] = [
  {
    topic: "Nomenclatura de color",
    issue:
      'El archivo de diseño fuente etiqueta dos colores distintos como "Azul I": el color principal (#2B7DF6) y un tono claro sin nombre propio (#DCEFFF). Este sitio usa "Azul I" solo para el principal.',
  },
  {
    topic: '"Brand Boook Guidelines" (con doble "o")',
    issue:
      'El componente "Hero" del archivo fuente tiene ese typo escrito así en cada instancia (Home, Estrategia, Master Brand, Assets, Aplicaciones, Sub-marcas) — no es un error de una sola página. Este sitio usa la ortografía correcta ("Brand Book Guidelines") en todas partes.',
  },
  {
    topic: 'Heading de la etapa 4 "Why" (Brand Tree)',
    issue:
      'El texto on-page de esta etapa dice "3 What - Reasons to believe & brand Role" (duplicado literal del heading de la etapa 3) en vez de "4 Why - Why the brand exists". El contenido real de la etapa (Visión: "Acompañamos la vida") sí es correcto — solo el heading está mal. Este sitio usa el número/label correcto.',
  },
  {
    topic: "Swatch HotDays",
    issue:
      "El archivo fuente etiqueta el HEX de este color como #2B7DF6 (el de Azul I) por un error de copiado; su color real, confirmado por su fill visual y sus valores CMYK/RGB, es #E42630.",
  },
  {
    topic: "Colores secundarios de Nova Express (Sub-marcas)",
    issue:
      "En el archivo fuente, los valores CMYK/RGB/PANTONE de los colores secundarios de Nova Express están copiados por error de los de la paleta Azul principal. Solo el HEX y el fill visual de cada swatch son correctos y propios.",
  },
  {
    topic: "Numeración de secciones",
    issue:
      "Varios títulos on-page del archivo fuente no coinciden en número con el índice/TOC (ej. 3.5 vs. 3.6 y 3.9 vs. 3.10 en Brand Assets, 5.2 vs. 5.3 en Sub-marcas). Este sitio sigue siempre la numeración del índice, no la del heading.",
  },
  {
    topic: 'Subtítulos duplicados — Brand Tree ("Where"/"Who")',
    issue:
      'Las etapas "Where" y "Who" del Brand Tree comparten el mismo subtítulo en el archivo fuente ("Assessing the landscape").',
  },
  {
    topic: "Texto duplicado — iNova (Sub-marcas)",
    issue:
      "El párrafo de introducción de iNova es, en el archivo fuente, el mismo texto usado para introducir Nova Express, sin relación con iNova.",
  },
];
