import PagePlaceholder from "@/components/PagePlaceholder";
import { NAV_PAGES } from "@/lib/nav-data";

const page = NAV_PAGES.find((p) => p.slug === "/assets")!;

export default function AssetsPage() {
  return <PagePlaceholder page={page} />;
}
