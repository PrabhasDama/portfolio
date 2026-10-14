import Link from "next/link";
import { profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-name">
        <span aria-hidden="true">&gt;</span> prabhas.dama
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#work">work</Link>
        <Link href="/blog/">writing</Link>
        <Link href="/#about">about</Link>
        <a href={`mailto:${profile.links.email}`}>email</a>
      </nav>
    </header>
  );
}
