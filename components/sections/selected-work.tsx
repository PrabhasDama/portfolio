import Link from "next/link";
import { caltrack, projects } from "@/data/projects";
import { getArticles } from "@/lib/articles";
import { Section } from "@/components/ui/primitives";
import { CalTrackReceipt } from "@/components/projects/caltrack-visual";

export function SelectedWork() {
  const essay = getArticles().find((article) =>
    article.tags.includes("CalTrack"),
  );
  const others = projects.filter((project) => !project.featured);
  return (
    <Section id="work" label="Work">
      <article className="feature">
        <div className="feature-copy">
          <p className="kicker">Main project · {caltrack.category}</p>
          <h3>
            <Link href="/projects/caltrack/">CalTrack</Link>
          </h3>
          <p>
            Most nutrition apps are good at logging what you ate. The rest of it
            — what to cook, what’s already in the cupboard, what to buy, what it
            costs — lives somewhere else. CalTrack tries to keep the whole loop
            in one place, so changing next week’s plan actually changes the
            shopping list.
          </p>
          <p className="feature-links">
            <Link href="/projects/caltrack/">
              Case study <span className="arrow">→</span>
            </Link>
            {essay && (
              <Link href={`/blog/${essay.slug}/`}>
                How it grew (essay) <span className="arrow">→</span>
              </Link>
            )}
          </p>
        </div>
        <CalTrackReceipt />
      </article>

      <h3 className="subhead">Other things I’ve built</h3>
      <ul className="project-rows">
        {others.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}/`}>
              <span className="row-title">{project.name}</span>
              <span className="row-desc">{project.shortDescription}</span>
              {project.category && (
                <span className="row-meta">{project.category}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
