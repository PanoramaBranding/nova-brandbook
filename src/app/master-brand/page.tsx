import PagePlaceholder from "@/components/PagePlaceholder";
import { NAV_PAGES } from "@/lib/nav-data";

const page = NAV_PAGES.find((p) => p.slug === "/master-brand")!;

export default function MasterBrandPage() {
  return <PagePlaceholder page={page} />;
}
