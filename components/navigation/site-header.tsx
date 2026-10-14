import Link from "next/link";
import { profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-name">
        Prabhas Dama
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#work">Work</Link>
        <Link href="/blog/">Writing</Link>
        <Link href="/#about">About</Link>
        <a href={`mailto:${profile.links.email}`}>Email</a>
      </nav>
    </header>
  );
}
