import { NAV_PAGES, isGroups } from "@/lib/nav-data";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, PRINCIPAL, TYPOGRAPHY } from "@/lib/brand-data";

/**
 * llms.txt (llmstxt.org convention) — plain-text index for LLMs/crawlers.
 * Generated from `NAV_PAGES` (same source `Nav.tsx`/`ContentsToc` read) so
 * the page list can't drift from the real sitemap.
 */
export function GET() {
  const pageLines = NAV_PAGES.map((page) => {
    const subLabels = isGroups(page.sections)
      ? page.sections.map((g) => g.heading).join(", ")
      : page.sections.map((s) => s.label).join(", ");
    return `- [${page.number} · ${page.label}](${SITE_URL}${page.slug}): ${subLabels}`;
  }).join("\n");

  const body = `# ${SITE_NAME} — Brand Book Guidelines 2026

> ${SITE_DESCRIPTION}

## Estructura del sitio

- [Home](${SITE_URL}/): índice general del manual, enlaza a las 5 secciones numeradas.
${pageLines}

## Datos de marca en texto plano

- [/brand.json](${SITE_URL}/brand.json): paleta de color completa (HEX/RGB/CMYK/PANTONE),
  tipografía y el árbol de secciones del manual, en JSON — incluye una lista de
  inconsistencias de contenido conocidas en el archivo de diseño fuente
  (\`knownContentIssues\`), que no deben tratarse como parte del sistema de marca.

## Notas

- Color principal ("Azul I"): ${PRINCIPAL.hex}.
- Tipografía: ${TYPOGRAPHY.family} (${TYPOGRAPHY.source}, ${TYPOGRAPHY.license}).
- Idioma del contenido: español.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
