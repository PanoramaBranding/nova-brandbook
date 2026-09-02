import PagePlaceholder from "@/components/PagePlaceholder";
import { NAV_PAGES } from "@/lib/nav-data";

const page = NAV_PAGES.find((p) => p.slug === "/estrategia")!;

export default function EstrategiaPage() {
  return <PagePlaceholder page={page} />;
}
