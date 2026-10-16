"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

/**
 * Links home, but on the homepage itself it glides back to the top instead of
 * re-navigating. The glide comes from `scroll-behavior` in globals.css, so
 * reduced-motion visitors jump instead.
 */
export function HomeLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const modified =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;
    if (pathname !== "/" || modified) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) window.history.replaceState(null, "", "/");
  };

  return (
    <Link href="/" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
