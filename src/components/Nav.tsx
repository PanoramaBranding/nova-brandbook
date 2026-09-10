"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_PAGES, isGroups, type NavLeaf } from "@/lib/nav-data";

/**
 * Nav — Figma "Menu v1" for desktop (sticky 200px sidebar, accordion +
 * scroll-spy). Mobile trigger is the hamburger glyph from Figma's shared
 * "Nav - mobile" component (node 2048:1276, its bars at 2045:925-927 — 2
 * plain 2px bars, 40px wide, 6px gap, confirmed identical on every page's
 * mobile hero 2026-09-10), not a bar/background/logo of its own — it must
 * not occupy real layout height above the page, since that pushes the
 * Hero's own top-row text down from where Figma shows it. Rendered `fixed`
 * (not `sticky`) so it floats over the Hero instead of sitting in a bar
 * above it, and stays reachable at any scroll position without adding
 * height — Figma's own row doesn't add height for it either, it's the same
 * row as the top-bar text, not a separate bar. Home has no menu at all
 * (confirmed with Sofia) — it's the index page itself, so a persistent nav
 * would just duplicate its own Index section.
 */
export default function Nav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // The active route's accordion section opens by default (see `isOpen`
  // below); this tracks a page the user explicitly clicked closed again,
  // since routing alone (isActive) has no notion of "collapsed".
  const [collapsedSlug, setCollapsedSlug] = useState<string | null>(null);

  const activePage = NAV_PAGES.find((p) => p.slug === pathname);
  const isHome = pathname === "/";

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

  // Close the mobile panel and reset any manual collapse on route change.
  useEffect(() => {
    setMobileOpen(false);
    setCollapsedSlug(null);
  }, [pathname]);

  if (isHome) return null;

  return (
    <>
      {/* Desktop — sticky sidebar */}
      <nav
        className="hidden md:flex sticky top-0 h-screen w-[200px] shrink-0 overflow-y-auto bg-azul-1 px-6 pt-7 pb-8 flex-col items-center gap-14 [scrollbar-width:thin]"
        aria-label="Navegación del manual de marca"
      >
        <Link href="/" className="shrink-0 w-[80px]" aria-label="Ir a inicio">
          <Image src="/brand/nova-logo-white.svg" alt="NovaVenta" width={80} height={75} priority />
        </Link>
        <NavLinks
          pathname={pathname}
          activeId={activeId}
          collapsedSlug={collapsedSlug}
          onToggleCollapse={setCollapsedSlug}
        />
      </nav>

      {/* Mobile — floating trigger. Figma's real glyph (node 2045:925-927,
          part of the shared "Nav - mobile" component confirmed identical on
          every page's hero, 2026-09-10) is just 2 plain 2px bars, 40px
          wide, 6px gap — not a 3-line hamburger. `fixed`, not `sticky` or a
          layout element, so it never pushes the Hero's own content down
          (Figma's own row doesn't add height beyond the top-bar text
          either — it's the same row, not a separate bar). Positioned at
          `top-8 right-8` (32px) to match that row's own confirmed inset
          (pixel-measured against Figma's screenshot: 16px from the header
          + 16px the row itself carries, see `PageHero.tsx`) — `pb-3 pl-3`
          only (no top/right padding) pads the tap target down/left without
          shifting the icon's visual top-right anchor. `mix-blend-difference`
          (not an invented backdrop circle) keeps a plain white icon
          readable over both the Hero's photo and plain white page content
          further down, without a background Figma never specified. */}
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav-panel"
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        className={`md:hidden fixed top-8 right-8 z-40 pb-3 pl-3 text-white ${mobileOpen ? "" : "mix-blend-difference"}`}
      >
        {mobileOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <span className="flex flex-col gap-[6px] w-10">
            <span className="h-0.5 w-full bg-white" />
            <span className="h-0.5 w-full bg-white" />
          </span>
        )}
      </button>
      <div
        id="mobile-nav-panel"
        aria-hidden={!mobileOpen}
        className={`md:hidden fixed inset-0 z-30 bg-azul-1 overflow-y-auto px-6 py-8 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <NavLinks
          pathname={pathname}
          activeId={activeId}
          collapsedSlug={collapsedSlug}
          onToggleCollapse={setCollapsedSlug}
          onNavigate={() => setMobileOpen(false)}
        />
      </div>
    </>
  );
}

function NavLinks({
  pathname,
  activeId,
  collapsedSlug,
  onToggleCollapse,
  onNavigate,
}: {
  pathname: string | null;
  activeId: string | null;
  collapsedSlug: string | null;
  onToggleCollapse: (slug: string | null) => void;
  onNavigate?: () => void;
}) {
  return (
    // 18px + 14px Medium, matching Figma's "Menu v1 / Predeterminado" node
    // (239:64, the default/collapsed state) exactly — Sofia pointed at this
    // specific node 2026-09-10 and asked to match it as-is, superseding the
    // earlier gap-5/text-base deviation from Round 15 (that was tuned
    // against a different variant, 528:503, showing an expanded accordion
    // state with its own different numbers).
    <ul className="flex flex-col gap-[18px] w-full text-white text-[14px] font-medium">
      {NAV_PAGES.map((page) => {
        const isActive = page.slug === pathname;
        const isOpen = isActive && collapsedSlug !== page.slug;
        return (
          <li key={page.slug} className="flex flex-col gap-5">
            <Link
              href={page.slug}
              onClick={(e) => {
                // Already on this page: toggle the accordion instead of
                // navigating (a same-route Link click is a no-op nav-wise,
                // so without this the section could never collapse).
                if (isActive) {
                  e.preventDefault();
                  onToggleCollapse(isOpen ? page.slug : null);
                } else {
                  onNavigate?.();
                }
              }}
              className="flex items-start gap-1 transition-opacity hover:opacity-80"
            >
              <span>{page.number}</span>
              <span className="flex-1">{page.label}</span>
              <ChevronIcon open={isOpen} />
            </Link>

            {/* Always mounted (not conditionally rendered) so the
                grid-rows trick can animate open/closed smoothly instead of
                the sub-items just popping in/out on route change. */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <SubItems
                  sections={page.sections}
                  slug={page.slug}
                  activeId={activeId}
                  onNavigate={onNavigate}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
