"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_PAGES, isGroups, type NavLeaf } from "@/lib/nav-data";

/**
 * Nav — Figma "Menu v1" for desktop (sticky 200px sidebar, accordion +
 * scroll-spy). Figma has no mobile equivalent of this component at all (no
 * frame or "Componentes" entry shows a nav on the mobile pages), so the
 * hamburger + full-screen panel below is an interaction pattern designed
 * here, not extracted from Figma — flag for design review once Figma
 * access is back, same as the desktop accordion's active-state treatment.
 */
export default function Nav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // Close the mobile panel on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop — sticky sidebar */}
      <nav
        className="hidden md:flex sticky top-0 h-screen w-[200px] shrink-0 overflow-y-auto bg-azul-1 px-6 pt-7 pb-8 flex-col items-center gap-12 [scrollbar-width:thin]"
        aria-label="Navegación del manual de marca"
      >
        <Link href="/" className="shrink-0 w-[80px]" aria-label="Ir a inicio">
          <Image src="/brand/nova-logo-white.svg" alt="NovaVenta" width={80} height={75} priority />
        </Link>
        <NavLinks pathname={pathname} activeId={activeId} />
      </nav>

      {/* Mobile — top bar + full-screen panel (design not in Figma, see note above) */}
      <div className="md:hidden sticky top-0 z-40 bg-azul-1 flex items-center justify-between px-4 py-3">
        <Link href="/" className="shrink-0 w-10" aria-label="Ir a inicio">
          <Image src="/brand/nova-logo-white.svg" alt="NovaVenta" width={40} height={38} priority />
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          className="text-white p-2"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden fixed inset-0 top-[57px] z-30 bg-azul-1 overflow-y-auto px-6 py-8"
        >
          <NavLinks pathname={pathname} activeId={activeId} onNavigate={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}

function NavLinks({
  pathname,
  activeId,
  onNavigate,
}: {
  pathname: string | null;
  activeId: string | null;
  onNavigate?: () => void;
}) {
  return (
    <ul className="flex flex-col gap-7 w-full text-white text-base font-medium">
      {NAV_PAGES.map((page) => {
        const isActive = page.slug === pathname;
        return (
          <li key={page.slug} className="flex flex-col gap-5">
            <Link href={page.slug} onClick={onNavigate} className="flex gap-1 transition-opacity hover:opacity-80">
              <span>{page.number}</span>
              <span>{page.label}</span>
            </Link>

            {isActive && (
              <SubItems
                sections={page.sections}
                slug={page.slug}
                activeId={activeId}
                onNavigate={onNavigate}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SubItems({
  sections,
  slug,
  activeId,
  onNavigate,
}: {
  sections: NavPageSections;
  slug: string;
  activeId: string | null;
  onNavigate?: () => void;
}) {
  if (isGroups(sections)) {
    return (
      <div className="flex flex-col gap-5 w-full">
        {sections.map((group) => (
          <div key={group.heading} className="flex flex-col gap-5 w-full text-white">
            <p className="text-xs font-semibold">{group.heading}</p>
            <Leaves items={group.items} slug={slug} activeId={activeId} onNavigate={onNavigate} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full">
      <Leaves items={sections} slug={slug} activeId={activeId} onNavigate={onNavigate} />
    </div>
  );
}

function Leaves({
  items,
  slug,
  activeId,
  onNavigate,
}: {
  items: NavLeaf[];
  slug: string;
  activeId: string | null;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 w-full font-normal leading-[1.2]">
      {items.map((item) => (
        <a
          key={item.id}
          href={`${slug}#${item.id}`}
          onClick={onNavigate}
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
