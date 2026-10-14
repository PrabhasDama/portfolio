import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { OutLink } from "@/components/ui/primitives";
import { ProjectSwitcher } from "@/components/sections/project-switcher";

export function Intro() {
  const items = projects.map((project) => ({
    slug: project.slug,
    name: project.name,
    category: project.category,
    shortDescription: project.shortDescription,
    live: project.links.live,
    source: project.links.source,
    visibility: project.visibility,
  }));
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
          I build software that has to stay correct while things change
          underneath it: a Bitcoin research terminal that would rather say “sit
          out” than guess, and a nutrition app where one edit has to ripple
          through the whole week.
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
      <div className="intro-graph">
        <ProjectSwitcher items={items} />
      </div>
    </section>
  );
}
