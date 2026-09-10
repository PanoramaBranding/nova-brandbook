export type NavLeaf = {
  id: string;
  number: string;
  label: string;
};

export type NavGroup = {
  heading: string;
  items: NavLeaf[];
};

export type NavPage = {
  slug: string;
  number: string;
  label: string;
  /** Flat list of anchors, OR groups with sub-headings (Assets page). */
  sections: NavLeaf[] | NavGroup[];
};

function isGroups(
  sections: NavLeaf[] | NavGroup[]
): sections is NavGroup[] {
  return sections.length > 0 && "items" in sections[0];
}

export { isGroups };

export const NAV_PAGES: NavPage[] = [
  {
    slug: "/estrategia",
    number: "01",
    label: "Brand Tree",
    sections: [
      { id: "brand-tree", number: "1.1", label: "Brand Tree" },
      { id: "where", number: "1", label: "Where - Assessing the landscape" },
      { id: "who", number: "2", label: "Who - Assessing the landscape" },
      { id: "what", number: "3", label: "What - Reasons to believe & brand role" },
      { id: "why", number: "4", label: "Why - Why the brand exists" },
      { id: "how", number: "5", label: "How - Brand execution" },
    ],
  },
  {
    slug: "/master-brand",
    number: "02",
    label: "Master Brand",
    sections: [
      { id: "background", number: "2.1", label: "Background" },
      { id: "identificador", number: "2.2", label: "Identificador" },
      { id: "versiones-de-color", number: "2.3", label: "Versiones de color" },
      { id: "area-de-reserva", number: "2.4", label: "Área de reserva" },
      { id: "tamanos-minimos", number: "2.5", label: "Tamaños mínimos" },
      { id: "co-branding", number: "2.6", label: "Co-branding" },
      { id: "endoso-de-marca", number: "2.7", label: "Endoso de marca" },
      { id: "sub-marcas", number: "2.8", label: "Sub-marcas" },
      { id: "usos-incorrectos", number: "2.9", label: "Usos incorrectos" },
      { id: "simbolo", number: "2.10", label: "Símbolo" },
      { id: "simbolo-versiones-de-color", number: "2.11", label: "Versiones de color" },
      { id: "simbolo-area-de-reserva", number: "2.12", label: "Área de reserva" },
      { id: "simbolo-tamanos-minimos", number: "2.13", label: "Tamaños mínimos" },
      { id: "simbolo-usos-incorrectos", number: "2.14", label: "Usos incorrectos" },
    ],
  },
  {
    slug: "/assets",
    number: "03",
    label: "Brand Assets",
    sections: [
      {
        heading: "Color",
        items: [
          { id: "paleta-cromatica-principal", number: "3.1", label: "Paleta cromática principal" },
          { id: "paleta-complementaria", number: "3.2", label: "Paleta complementaria" },
          { id: "porcentajes-de-color", number: "3.3", label: "Porcentajes de color" },
          { id: "uso-de-color", number: "3.4", label: "Uso de color" },
        ],
      },
      {
        heading: "Tipografía",
        items: [
          { id: "fuentes-tipograficas", number: "3.5", label: "Fuentes tipográficas" },
          { id: "jerarquias", number: "3.6", label: "Jerarquías" },
          { id: "usos-incorrectos-tipografia", number: "3.7", label: "Usos incorrectos" },
        ],
      },
      {
        heading: "Fotografía",
        items: [
          { id: "estilo-fotografico", number: "3.8", label: "Estilo fotográfico" },
          { id: "uso-de-la-fotografia", number: "3.9", label: "Uso de la fotografía" },
        ],
      },
      {
        heading: "Iconografía",
        items: [{ id: "sistema-iconografico", number: "3.10", label: "Sistema iconográfico" }],
      },
      {
        heading: "Tags",
        items: [
          { id: "sistema-de-tags", number: "3.11", label: "Sistema de tags" },
          { id: "pilares-de-diseno", number: "3.12", label: "Pilares de diseño" },
        ],
      },
      {
        heading: "Layouts",
        items: [{ id: "sistema-reticular", number: "3.13", label: "Sistema reticular" }],
      },
    ],
  },
  {
    slug: "/aplicaciones",
    number: "04",
    label: "Aplicaciones de marca",
    sections: [{ id: "aplicaciones-master-brand", number: "4.1", label: "Aplicaciones master brand" }],
  },
];
