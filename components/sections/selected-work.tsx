import Link from "next/link";
import { caltrack, projects } from "@/data/projects";
import { getArticles } from "@/lib/articles";
import { Section } from "@/components/ui/primitives";

const modules = [
  "nutrition targets",
  "food log",
  "meal plan + prep",
  "pantry",
  "grocery list",
  "store compare",
  "budget + receipts",
  "progress",
];

export function SelectedWork() {
  const essay = getArticles().find((article) =>
    article.tags.includes("CalTrack"),
  );
  const others = projects.filter((project) => !project.featured);
  return (
    <Section id="work" label="Work">
      <article className="feature">
        <div className="feature-copy">
          <h3>
            <Link href="/projects/caltrack/">CalTrack</Link>
          </h3>
          <p>
            Most nutrition apps are good at logging what you ate. The rest of it
            — what to cook, what’s already in the cupboard, what to buy, what it
            costs — lives somewhere else. CalTrack keeps the whole loop in one
            place, so changing next week’s plan actually changes the shopping
            list.
          </p>
          <p className="feature-links">
            <Link href="/projects/caltrack/">
              case study <span className="arrow">→</span>
            </Link>
            {essay && (
              <Link href={`/blog/${essay.slug}/`}>
                how it grew <span className="arrow">→</span>
              </Link>
            )}
          </p>
        </div>
        <dl className="spec">
          <dt>type</dt>
          <dd>{caltrack.category?.toLowerCase()}</dd>
          <dt>stack</dt>
          <dd>{caltrack.technologies.join(" · ")}</dd>
          <dt>modules</dt>
          <dd>
            <ul className="module-list">
              {modules.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ul>
          </dd>
        </dl>
      </article>

      <table className="project-table">
        <caption>Other projects</caption>
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">area</th>
            <th scope="col">notes</th>
          </tr>
        </thead>
        <tbody>
          {others.map((project) => (
            <tr key={project.slug}>
              <th scope="row">
                <Link href={`/projects/${project.slug}/`}>
                  {project.slug}
                  <span className="arrow">→</span>
                </Link>
              </th>
              <td>{project.category?.toLowerCase() ?? "—"}</td>
              <td>{project.shortDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
