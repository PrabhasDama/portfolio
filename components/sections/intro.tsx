import Link from "next/link";
import { profile } from "@/data/profile";
import { OutLink } from "@/components/ui/primitives";

export function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <p className="prompt" aria-hidden="true">
        <span className="prompt-path">~</span> $ whoami
      </p>
      <h1 id="intro-title">
        Hi, I’m Prabhas<span className="dot">.</span>
        <span className="caret" aria-hidden="true" />
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
            <path
              pathLength={1}
              d="M2 8.5c18-4 38-5.5 58-4.2 17 1 34 2.6 56-1.3"
            />
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
      <dl className="intro-meta">
        <dt>studying</dt>
        <dd>{profile.degree}, CSULB</dd>
        <dt>based</dt>
        <dd>Long Beach, CA</dd>
        <dt>links</dt>
        <dd>
          <OutLink href={profile.links.github}>github</OutLink>
          <OutLink href={profile.links.linkedin}>linkedin</OutLink>
          <a href={`mailto:${profile.links.email}`}>email</a>
          {profile.links.resume && (
            <OutLink href={profile.links.resume}>résumé</OutLink>
          )}
        </dd>
      </dl>
    </section>
  );
}
