import { isGroups, type NavPage } from "@/lib/nav-data";

/**
 * Temporary scaffold so every nav anchor resolves to a real section while
 * the full pixel-perfect content pass for this page is still pending.
 * Not final — each block will be replaced with the actual Figma content.
 */
export default function PagePlaceholder({ page }: { page: NavPage }) {
  const leaves = isGroups(page.sections)
    ? page.sections.flatMap((g) => g.items)
    : page.sections;

  return (
    <div className="flex flex-col">
      <header className="px-16 pt-16 pb-8 border-b border-azul-tint">
        <p className="text-sm font-semibold text-azul-2">{page.number}</p>
        <h1 className="text-4xl font-bold text-azul-1">{page.label}</h1>
        <p className="mt-2 text-sm text-azul-3/70">
          Contenido pendiente de construcción pixel-perfect — placeholder de estructura.
        </p>
      </header>

      {leaves.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="px-16 py-20 border-b border-azul-tint scroll-mt-8"
        >
          <p className="text-sm font-semibold text-azul-2">{section.number}</p>
          <h2 className="text-2xl font-bold text-azul-1">{section.label}</h2>
        </section>
      ))}
    </div>
  );
}
