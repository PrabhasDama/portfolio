import Link from "next/link";
import { AutoHideHeader } from "@/components/navigation/auto-hide-header";
import { profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <AutoHideHeader>
      <div className="site-header-inner">
        <Link href="/" className="site-name">
          <span aria-hidden="true">&gt;</span> prabhas.dama
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#work">work</Link>
          <Link href="/blog/">writing</Link>
          <Link href="/#about">about</Link>
          <a href={`mailto:${profile.links.email}`}>email</a>
        </nav>
      </div>
    </AutoHideHeader>
  );
}
