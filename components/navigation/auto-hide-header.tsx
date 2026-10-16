"use client";

import { useEffect, useRef } from "react";

/** Scroll distance to ignore, so trackpad jitter doesn't flicker the header. */
const THRESHOLD = 8;

/**
 * Sticky header that slides away while scrolling down and returns on any
 * scroll up. State lives in data attributes, so scrolling never re-renders.
 */
export function AutoHideHeader({ children }: { children: React.ReactNode }) {
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = header.current;
    if (!el) return;
    let anchor = window.scrollY;

    const update = () => {
      // Clamp so iOS overscroll bounce at either end doesn't count as a scroll.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.min(Math.max(window.scrollY, 0), Math.max(max, 0));
      el.dataset.scrolled = String(y > 0);
      if (y <= el.offsetHeight) {
        el.dataset.hidden = "false";
        anchor = y;
      } else if (Math.abs(y - anchor) > THRESHOLD) {
        el.dataset.hidden = String(y > anchor);
        anchor = y;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header ref={header} className="site-header">
      {children}
    </header>
  );
}
