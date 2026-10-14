import Link from "next/link";
import { profile } from "@/data/profile";
import { OutLink } from "@/components/ui/primitives";

export function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <h1 id="intro-title">
        Hi, I’m Prabhas<span className="dot">.</span>
      </h1>
      <p className="intro-lede">
        I study computer science at Cal State Long Beach, and I’ve spent a lot
        of the last while on{" "}
        <Link href="/projects/caltrack/" className="marked">
          CalTrack
          <svg
            viewBox="0 0 120 12"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M2 8.5c18-4 38-5.5 58-4.2 17 1 34 2.6 56-1.3" />
          </svg>
        </Link>
        , a nutrition tracker that kept growing until it also handled the meal
        plan, the pantry, the grocery run and the budget.
      </p>
      <p className="intro-sub">
        I like the part of software where the features stop being separate pages
        and start depending on each other. That’s usually where the interesting
        bugs are.
      </p>
      <ul className="intro-meta">
        <li>B.S. Computer Science, CSULB</li>
        <li>Long Beach, CA</li>
        <li>
          <OutLink href={profile.links.github}>GitHub</OutLink>
        </li>
        <li>
          <OutLink href={profile.links.linkedin}>LinkedIn</OutLink>
        </li>
        {profile.links.resume && (
          <li>
            <OutLink href={profile.links.resume}>Résumé</OutLink>
          </li>
        )}
      </ul>
    </section>
  );
}
