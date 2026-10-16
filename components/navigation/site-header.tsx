import Link from "next/link";
import { AutoHideHeader } from "@/components/navigation/auto-hide-header";
import { HomeLink } from "@/components/navigation/home-link";
import { profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <AutoHideHeader>
      <div className="site-header-inner">
        <HomeLink className="site-name">
          <span aria-hidden="true">&gt;</span> prabhas.dama
        </HomeLink>
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
