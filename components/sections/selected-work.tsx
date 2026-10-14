import Link from "next/link";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/primitives";

export function SelectedWork() {
  return (
    <Section id="work" label="Work">
      <div className="work-list">
        {projects.map((project) => (
          <article key={project.slug} className="feature">
            <div className="feature-copy">
              <p className="kicker">
                {project.category?.toLowerCase()}
                {project.year && <> · {project.year}</>}
              </p>
              <h3>
                <Link href={`/projects/${project.slug}/`}>{project.name}</Link>
              </h3>
              <p>{project.summary}</p>
              <p className="feature-links">
                <Link href={`/projects/${project.slug}/`}>
                  case study <span className="arrow">→</span>
                </Link>
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noreferrer">
                    live <span className="arrow">↗</span>
                  </a>
                )}
                {project.links.source && (
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    source <span className="arrow">↗</span>
                  </a>
                )}
                {project.visibility && (
                  <span className="feature-note">{project.visibility}</span>
                )}
              </p>
            </div>
            <dl className="spec">
              <dt>built</dt>
              <dd>
                <ul className="highlight-list">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </dd>
              <dt>stack</dt>
              <dd>{project.technologies.join(" · ")}</dd>
            </dl>
          </article>
        ))}
      </div>
      <p className="more-link">
        <a href={profile.links.github} target="_blank" rel="noreferrer">
          more on github <span className="arrow">↗</span>
        </a>
      </p>
    </Section>
  );
}
