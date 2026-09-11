import { NextResponse } from "next/server";
import { NAV_PAGES, isGroups } from "@/lib/nav-data";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  PRINCIPAL,
  SECONDARY,
  COMPLEMENTARY,
  NEUTRAL,
  TYPOGRAPHY,
  KNOWN_CONTENT_ISSUES,
} from "@/lib/brand-data";

/**
 * Machine-readable brand tokens — the "AI-readable" layer from the original
 * brief (see CLAUDE.md/context.md). A route handler, not a static file under
 * `public/`, so it always reflects the same data `assets/page.tsx` and
 * `nav-data.ts` render — no second copy to drift out of sync.
 */
export function GET() {
  const sections = NAV_PAGES.map((page) => ({
    number: page.number,
    label: page.label,
    url: `${SITE_URL}${page.slug}`,
    subsections: isGroups(page.sections)
      ? page.sections.map((group) => ({
          heading: group.heading,
          items: group.items.map((i) => ({ number: i.number, label: i.label })),
        }))
      : page.sections.map((i) => ({ number: i.number, label: i.label })),
  }));

  const body = {
    brand: SITE_NAME,
    project: "Nova Brand Book Guidelines 2026",
    publisher: "Panorama Branding",
    canonicalUrl: SITE_URL,
    description: SITE_DESCRIPTION,
    colors: {
      principal: PRINCIPAL,
      secundarios: SECONDARY,
      complementarios: COMPLEMENTARY,
      neutros: NEUTRAL,
    },
    typography: TYPOGRAPHY,
    sections,
    knownContentIssues: {
      note:
        "Estos puntos son errores confirmados en el archivo de diseño Figma fuente, no en este sitio — se documentan aquí para que no se interpreten como parte intencional del sistema de marca.",
      items: KNOWN_CONTENT_ISSUES,
    },
  };

  return NextResponse.json(body);
}
