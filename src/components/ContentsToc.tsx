import Link from "next/link";
import Button from "@/components/Button";

export type TocItem = { number: string; label: string; id: string };

/**
 * Mid-page "Contenidos" table of contents (Figma "Contenido"/"Contenidos"
 * frame — node 543:652 on Master Brand, 553:2736 on Assets, identical
 * structure on both: title + a two-column desktop / one-column mobile list
 * of every subsection + a download button). Deliberately duplicates the
 * sidebar nav's own subsection list — confirmed with Sofia 2026-09-09 to
 * build it anyway for fidelity to the Figma file, on pages where Figma has
 * it. Estrategia does not have this block in Figma; don't add it there.
 */
export default function ContentsToc({
  items,
  buttonLabel = "Descargar assets",
  downloadHref,
}: {
  items: TocItem[];
  buttonLabel?: string;
  downloadHref?: string;
}) {
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <section className="px-6 md:px-[38px] pb-16 md:pb-24 border-t border-azul-tint pt-12">
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <p className="text-[28px] md:text-[32px] font-semibold md:font-bold text-azul-2 md:w-[447px]">
            Contenidos
          </p>
          {/* Wrapped in a plain div (not `hidden md:inline-flex` directly on
              the Button) — Button's own base classes already include an
              unconditional `inline-flex`, and concatenating that with an
              override `hidden` on the same element is a real Tailwind
              footgun: which one wins depends on generated stylesheet order,
              not class-list order, and here it lost — both buttons stayed
              visible on mobile at once (confirmed via computedDisplay,
              Round 17). A wrapper div's hidden/block has no such
              conflict. */}
          <div className="hidden md:block">
            <Button variant="outline" href={downloadHref} download={!!downloadHref}>{buttonLabel}</Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-[97px]">
          {columns.map((column, i) => (
            <div key={i} className="flex flex-col gap-4 md:gap-5">
              {column.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex gap-[10px] md:gap-[15px] items-center text-azul-1 hover:underline"
                >
                  <span className="text-base md:text-xl">{item.number}</span>
                  <span className="text-xl md:text-[32px]">{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="self-start md:hidden">
          <Button variant="outline" href={downloadHref} download={!!downloadHref}>{buttonLabel}</Button>
        </div>
      </div>
    </section>
  );
}
