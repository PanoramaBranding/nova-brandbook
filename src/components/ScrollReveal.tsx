"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades + slides in each page's content sections the first time they
 * scroll into view (the hero itself is skipped — it's already visible on
 * load, so animating it in would just delay showing the page). Mounted
 * once in the root layout; re-scans on route change since the App Router
 * keeps the layout mounted across navigations.
 *
 * Targets direct children of the page's root `<div>` after the first one
 * (the hero), regardless of whether that first child is a `<header>`
 * (PageHero, on Estrategia/Master Brand/Assets) or a `<section>` (Home's
 * own inline hero) — skipping by position, not by tag, handles both.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const container = document.querySelector<HTMLElement>("main > div");
    if (!container) return;

    const targets = Array.from(container.children)
      .slice(1)
      .filter((el): el is HTMLElement => el.tagName === "SECTION" || el.tagName === "FOOTER");

    if (targets.length === 0) return;

    targets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      // threshold: 0 (not 0.1) — a ratio-based threshold is a fraction of
      // the target's OWN height, so very tall sections (e.g. Aplicaciones'
      // single-section image gallery, 10000px+) could never reach 10%
      // visible within one viewport and would stay opacity:0 forever,
      // reading as a permanent blank gap. Firing on any visible pixel
      // works regardless of section height.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
