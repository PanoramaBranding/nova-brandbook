import type { Metadata } from "next";

export const metadata: Metadata = { title: "01 · Estrategia de marca" };

type Item = { number: string; title: string; body: string };
type Stage = { id: string; kicker: string; title: string; items: Item[] };

// Copy real, extraído de las capas de Figma (nodo 509:912) el 2026-09-02.
// Nota de contenido: en Figma, el título de este 4º bloque dice "3 What -
// Reasons to believe & brand Role" (duplicado con el bloque 3) — es un error
// de copy del equipo de diseño. El contenido real es sobre visión de marca,
// así que aquí usa el número/label correcto (4. Why) que sí aparece bien en
// el nav y en el índice de Home.
const STAGES: Stage[] = [
  {
    id: "where",
    kicker: "1.",
    title: "Where - Assessing the landscape",
    items: [
      {
        number: "1",
        title: "Contexto competitivo",
        body: "Retailers Omnicanal · Retail masivo, multicategoría y con amplia cobertura.",
      },
      {
        number: "2",
        title: "Insight de la categoría",
        body: '"Hay muchos lugares a los que el consumidor visita para resolver sus necesidades, queriendo simplificarse y poder hacerlo en uno solo" Ser ese lugar donde puede encontrar todo lo que necesita. ONE STOP SHOP',
      },
    ],
  },
  {
    id: "who",
    kicker: "2.",
    title: "Who - Assessing the landscape",
    items: [
      {
        number: "3",
        title: "Consumidor objetivo",
        body: 'El antojado: guiado por el deseo, la curiosidad y la oportunidad. No necesariamente entra a comprar algo específico: muchas veces descubre lo que quiere en el camino. Le atraen las marcas "TOP", las novedades, las promociones y todo aquello que despierta un "lo quiero" inmediato. No sabía que lo quería... hasta que lo vi.',
      },
      {
        number: "4",
        title: "Insight del consumidor",
        body: '"Quiero darme todos los gustos, descubrir lo nuevo y aprovechar las oportunidades, pero no me alcanza para todo." Estoy entre quererlo todo y no poder tenerlo todo.',
      },
    ],
  },
  {
    id: "what",
    kicker: "3.",
    title: "What - Reasons to believe & brand role",
    items: [
      {
        number: "5",
        title: "Atributos intrínsecos",
        body: "Damos acceso a lo que quieres, dónde y cuándo nos necesitas con lo que quieres y conoces. Llegamos a las personas, damos acceso y progreso 24/7. Hiper diversificado.",
      },
      {
        number: "6",
        title: "Heritage beliefs",
        body: "Tangibiliza el progreso y la solidaridad · La casa de las buenas marcas · Si está en NOVA es bueno · Somos más que un catálogo y somos más que una vending.",
      },
      {
        number: "7",
        title: "Atributos emocionales",
        body: "Confianza: desde las marcas, la calidad, viaja hacia las personas y lo social (nos sentamos en las salas de las casas). Curiosidad. Cercanía real (física y emocional). Vínculo real (relación humana).",
      },
      {
        number: "8",
        title: "Beneficios del producto",
        body: "Damos acceso a lo que quieres, dónde y cuándo nos necesitas con lo que quieres y conoces. Llegamos a las personas, damos acceso y progreso 24/7. Hiper diversificado.",
      },
      {
        number: "9",
        title: "Beneficios del consumidor",
        body: "Con Nova siempre puedo tener lo que quiero; acceso fácil a toda hora en todo lugar.",
      },
      {
        number: "10",
        title: "Brand highest Role",
        body: "Nova siempre está ahí, cercanía y conveniencia.",
      },
    ],
  },
  {
    id: "why",
    kicker: "4.",
    title: "Why - Why the brand exists",
    items: [
      {
        number: "11",
        title: "Visión",
        body: "Acompañamos la vida.",
      },
    ],
  },
  {
    id: "how",
    kicker: "5.",
    title: "How - Brand execution",
    items: [
      {
        number: "12",
        title: "Arquetipo · Personalidad · Valores",
        body: "El Mago: transforma la realidad a través del conocimiento, la visión y la capacidad de hacer posible lo que otros creen imposible. Busca transformar, inspirar y revelar nuevas posibilidades. Humana · Visionaria · Facilitadora.",
      },
      {
        number: "13",
        title: "Brand CUES",
        body: "El logo, la N, catálogo, las vending, el himno, Nova y todos los sufijos.",
      },
    ],
  },
];

export default function EstrategiaPage() {
  return (
    <div className="flex flex-col">
      <header className="bg-azul-1 px-6 md:px-[38px] pt-8 pb-16 md:pb-24 text-white">
        <p className="text-sm font-semibold opacity-80">01</p>
        <h1 className="text-4xl md:text-6xl font-bold">Estrategia de marca</h1>
      </header>

      <section className="px-6 md:px-[38px] py-16 md:py-24 max-w-[900px]">
        <p className="text-2xl md:text-[36px] leading-[1.3] text-azul-1 font-medium">
          “Las marcas no entran a Nova, habitan en ella. Y el cliente no visita
          Nova, está en Nova.”
        </p>
      </section>

      <section id="brand-tree" className="px-6 md:px-[38px] pb-16 md:pb-24 scroll-mt-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-16 border-t border-azul-tint pt-12">
          <div className="md:w-[280px] shrink-0">
            <p className="text-sm font-semibold text-azul-2">1.1</p>
            <h2 className="text-3xl font-bold text-azul-1">Brand Tree</h2>
          </div>
          <p className="text-azul-3/80 text-lg leading-relaxed max-w-[560px]">
            La estrategia de marca define el marco que orienta las decisiones de
            NovaVenta y establece la relación entre su contexto, las necesidades
            de las personas y el papel que la marca busca desempeñar en su vida
            cotidiana. Esta estructura permite ordenar los elementos que
            construyen su propuesta, desde las capacidades y atributos propios
            de la marca hasta los beneficios que entrega y el vínculo que
            establece con sus audiencias.
          </p>
        </div>
      </section>

      {STAGES.map((stage) => (
        <section
          key={stage.id}
          id={stage.id}
          className="px-6 md:px-[38px] pb-16 md:pb-24 scroll-mt-8 border-t border-azul-tint pt-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-azul-1 mb-8">
            <span className="text-azul-2 font-semibold mr-2">{stage.kicker}</span>
            {stage.title}
          </h3>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {stage.items.map((item) => (
              <div key={item.number} className="flex gap-4">
                <span className="text-sm font-semibold text-azul-2 shrink-0 pt-1">
                  {item.number}
                </span>
                <div>
                  <p className="font-semibold text-azul-1 mb-1">{item.title}</p>
                  <p className="text-azul-3/80 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
