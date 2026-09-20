"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content is visible if JavaScript never runs. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("will-reveal");
        observer.observe(element);
      }
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) =>
        element.classList.remove("will-reveal", "is-revealed"),
      );
    };
  }, [pathname]);
  return null;
}
