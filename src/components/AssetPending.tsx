/**
 * Consistent placeholder for the sections that are fundamentally visual
 * (logo construction, clear-space diagrams, misuse examples, photography,
 * icon sets) and that we chose not to fabricate — see PLAN.md. Swap for the
 * real exported asset once Figma access is back.
 */
export default function AssetPending({ label }: { label: string }) {
  return (
    <div className="border-2 border-dashed border-azul-tint rounded-xl px-6 py-10 text-center text-sm text-azul-3/60">
      Pendiente: {label} (asset real de Figma)
    </div>
  );
}
