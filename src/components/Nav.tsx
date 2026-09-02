"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_PAGES, isGroups, type NavLeaf } from "@/lib/nav-data";

/**
 * Sticky left sidebar (Figma "Menu v1"). Accordion: only the current page's
 * sub-items expand. Scroll-spy: the sub-item whose section is in view gets
 * highlighted. Figma only speced the accordion open/closed states, not a
 * per-item "current" treatment, so the active-section highlight (full
 * opacity vs. 65%) is an interaction addition, not a literal export.
 */
export default function Nav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activePage = NAV_PAGES.find((p) => p.slug === pathname);

  useEffect(() => {
    if (!activePage) return;

    const ids = isGroups(activePage.sections)
      ? activePage.sections.flatMap((g) => g.items.map((i) => i.id))
      : activePage.sections.map((s) => s.id);

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Scroll-position based (not IntersectionObserver delta events): a
    // section stays "active" for its entire length, including when it's
    // tall enough that no observer threshold band stays inside it the
    // whole time. Active = the last section whose top has scrolled above
    // the trigger line.
    const TRIGGER_LINE = 160; // px from top of viewport

    let ticking = false;
    const updateActive = () => {
      ticking = false;
      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= TRIGGER_LINE) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [activePage, pathname]);

  return (
    <nav
      className="sticky top-0 h-screen w-[200px] shrink-0 overflow-y-auto bg-azul-1 px-6 pt-7 pb-8 flex flex-col gap-12 [scrollbar-width:thin]"
      aria-label="Navegación del manual de marca"
    >
      <Link href="/" className="shrink-0 w-[80px]" aria-label="Ir a inicio">
        <Image
          src="/brand/nova-logo-white.svg"
          alt="NovaVenta"
          width={80}
          height={75}
          priority
        />
      </Link>

      <ul className="flex flex-col gap-7 text-white text-base font-medium">
        {NAV_PAGES.map((page) => {
          const isActive = page.slug === pathname;
          return (
            <li key={page.slug} className="flex flex-col gap-5">
              <Link
                href={page.slug}
                className={`flex gap-1 transition-opacity ${
                  isActive ? "opacity-100" : "opacity-100 hover:opacity-80"
                }`}
              >
                <span>{page.number}</span>
                <span>{page.label}</span>
              </Link>

              {isActive && (
                <SubItems
                  sections={page.sections}
                  slug={page.slug}
                  activeId={activeId}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SubItems({
  sections,
  slug,
  activeId,
}: {
  sections: NavPageSections;
  slug: string;
  activeId: string | null;
}) {
  if (isGroups(sections)) {
    return (
      <div className="flex flex-col gap-5 w-full">
        {sections.map((group) => (
          <div key={group.heading} className="flex flex-col gap-5 w-full text-white">
            <p className="text-xs font-semibold">{group.heading}</p>
            <Leaves items={group.items} slug={slug} activeId={activeId} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full">
      <Leaves items={sections} slug={slug} activeId={activeId} />
    </div>
  );
}

function Leaves({
  items,
  slug,
  activeId,
}: {
  items: NavLeaf[];
  slug: string;
  activeId: string | null;
}) {
  return (
    <div className="flex flex-col gap-3 w-full font-normal leading-[1.2]">
      {items.map((item) => (
        <a
          key={item.id}
          href={`${slug}#${item.id}`}
          className={`flex gap-1.5 w-full text-white transition-opacity ${
            activeId === item.id ? "opacity-100" : "opacity-65 hover:opacity-90"
          }`}
        >
          <span className="text-[10px] shrink-0">{item.number}</span>
          <span className="text-xs">{item.label}</span>
        </a>
      ))}
    </div>
  );
}

type NavPageSections = (typeof NAV_PAGES)[number]["sections"];
