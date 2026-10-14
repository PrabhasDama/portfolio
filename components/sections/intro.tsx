import Link from "next/link";
import { profile } from "@/data/profile";
import { OutLink } from "@/components/ui/primitives";
import { SystemGraph } from "@/components/graph/system-graph";

export function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="intro-copy">
        <p className="kicker">
          software engineer · cs @ csulb · long beach, ca
        </p>
        <h1 id="intro-title">
          Prabhas Dama
          <span className="caret" aria-hidden="true" />
        </h1>
        <p className="intro-lede">
          I build software where one change has to show up everywhere it
          matters. Right now that’s{" "}
          <Link href="/projects/caltrack/">CalTrack</Link>: nutrition, meal
          plans, groceries, pantry and budget, wired together so they stay in
          sync.
        </p>
        <ul className="intro-links">
          <li>
            <OutLink href={profile.links.github}>
              github <span className="arrow">↗</span>
            </OutLink>
          </li>
          <li>
            <OutLink href={profile.links.linkedin}>
              linkedin <span className="arrow">↗</span>
            </OutLink>
          </li>
          <li>
            <a href={`mailto:${profile.links.email}`}>
              email <span className="arrow">↗</span>
            </a>
          </li>
          {profile.links.resume && (
            <li>
              <OutLink href={profile.links.resume}>
                résumé <span className="arrow">↗</span>
              </OutLink>
            </li>
          )}
        </ul>
      </div>
      <figure className="intro-graph">
        <SystemGraph />
        <figcaption>
          A toy model of how CalTrack’s modules depend on each other. Change one
          and only what reads from it recomputes, in topological order, each
          module once and only after all its inputs settle. The dashed feedback
          edge waits for the next weekly tick instead of looping.
        </figcaption>
      </figure>
    </section>
  );
}
