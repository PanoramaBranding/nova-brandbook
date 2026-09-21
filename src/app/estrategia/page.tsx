import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "01 · Estrategia de marca" };

type Item = { number: string; title: string; body: string };
type Stage = { id: string; number: string; title: string; items: Item[]; cols?: 2 | 3 };

// Copy y estilos reales, extraídos de Figma (nodo 543:1190, "Frame 54") el
// 2026-09-02. Nota de contenido: en Figma, el título de este 4º bloque dice
// "3 What - Reasons to believe & brand Role" (duplicado con el bloque 3) —
// es un error de copy del equipo de diseño. El contenido real es sobre
// visión de marca, así que aquí usa el número/label correcto (4 Why) que sí
// aparece bien en el nav y en el índice de Home.
const STAGES: Stage[] = [
  {
    id: "where",
    number: "1",
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
    number: "2",
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
    number: "3",
    title: "What - Reasons to believe & brand Role",
    cols: 3,
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
        title: "Beneficios del produco",
        body: "Damos acceso a lo que quieres, dónde y cuándo nos necesitas con lo que quieres y conoces. Llegamos a las personas, damos acceso y progreso 24/7. Hiper diversificado.",
      },
      {
        number: "9",
        title: "Beneficios del consumidor",
        body: "Con Nova siempre puedo tener lo que quiero; acceso fácil a todo hora en todo lugar",
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
    number: "4",
    title: "Why - Why the brand exists",
    items: [{ number: "11", title: "Visión", body: "Acompañamos la vida" }],
  },
  {
    id: "how",
    number: "5",
    title: "How - Brand execution",
    items: [
      {
        number: "12",
        title: "Arquetipo - Personalidad - Valores",
        body: "El Mago: transforma la realidad a través del conocimiento, la visión y la capacidad de hacer posible lo que otros creen imposible. Busca transformar, inspirar y revelar nuevas posibilidades. Humana · Visionaria · Facilitadora.",
      },
      {
        number: "13",
        title: "Brand CUES",
        body: "El logo, La N, catálogo - las vending, el himno, Nova y todos los sufijos.",
      },
    ],
  },
];

export default function EstrategiaPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        image="/brand/heroes/hero-estrategia.png"
        mobileImage="/brand/heroes/hero-estrategia-mobile.png"
        number="01"
        titleLines={["Brand", "Tree"]}
      />

      {/* pl-[220px] on desktop, not the page's usual 38px. Figma's own
          Quote component (node 509:919/528:1242) confirms pl-297, but
          Sofia asked to bring it in to 220px site-wide (2026-09-11) — a
          deliberate departure from Figma, same as the nav/footer spacing
          deviations elsewhere. Don't "correct" this back to 297 without
          re-confirming with her. */}
      <section className="px-4 md:px-[38px] py-16 md:py-[50px]">
        <p className="md:ml-auto md:max-w-[905px] text-[32px] md:text-[52px] leading-[1.3] md:leading-[60px] text-azul-1 font-bold">
          “Las marcas no entran a Nova, habitan en ella. Y el cliente no visita
          Nova, está en Nova.”
        </p>
      </section>

      <section id="brand-tree" className="px-4 md:px-[38px] pb-16 md:pb-24 scroll-mt-8">
        <div className="flex flex-col md:flex-row md:gap-[127px] gap-8 border-t border-azul-1 pt-12">
          <h2 className="text-[28px] md:text-[32px] font-bold text-azul-2 md:w-[447px] shrink-0">1.1 Brand Tree</h2>
          <p className="text-azul-3/80 leading-6 md:w-[561px] max-w-[561px]">
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
          className="px-4 md:px-[38px] pb-16 md:pb-24 scroll-mt-8 border-t border-azul-1 pt-12"
        >
          <h3 className="text-5xl md:text-[96px] leading-[1.2] md:leading-[1.04] font-bold text-azul-1 mb-12">
            {stage.number} {stage.title}
          </h3>

          {stage.id === "why" ? (
            <div className="border-t border-azul-1 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex gap-8 items-start">
                <span className="text-[28px] md:text-[32px] font-bold text-azul-2">11</span>
                <span className="text-[28px] md:text-[32px] font-bold text-azul-2">Visión</span>
              </div>
              <p className="text-3xl md:text-[48px] leading-[1.4] font-bold text-azul-2">
                Acompañamos la vida
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-x-3 gap-y-10 ${stage.cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
            >
              {stage.items.map((item) => (
                <div
                  key={item.number}
                  className="border-t border-azul-1 pt-8 flex flex-col md:flex-row gap-[18px] md:gap-8"
                >
                  <span className="text-[28px] md:text-[32px] font-bold text-azul-2 shrink-0">
                    {item.number}
                  </span>
                  <div className="flex flex-col gap-6">
                    <p className="text-[28px] md:text-[32px] leading-[1.2] font-bold text-azul-2">
                      {item.title}
                    </p>
                    <p className="text-[16px] md:text-[20px] leading-6 md:leading-7 text-azul-3/80">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <section className="px-4 md:px-[38px] pb-16 md:pb-24 border-t border-azul-1 pt-12">
        <div className="relative w-full max-w-[1134px] mx-auto" style={{ aspectRatio: 1134 / 1295 }}>
          <Image
            src="/brand/estrategia/diagrama-brand-tree.png"
            alt="Diagrama del Brand Tree de NovaVenta"
            fill
            className="object-contain"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
