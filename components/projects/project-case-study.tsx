import Link from "next/link";
import type { Project } from "@/data/projects";
import { CalTrackReceipt } from "@/components/projects/caltrack-visual";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { OutLink } from "@/components/ui/primitives";
import { Footer } from "@/components/sections/footer";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const written = project.sections.filter((section) => !section.placeholder);
  const pending = project.sections.filter((section) => section.placeholder);
  return (
    <main id="main" className="page">
      <header className="page-header case-header">
        <p className="kicker">
          <Link href="/#work">Work</Link>
          {project.category && <> · {project.category}</>}
          {project.year && <> · {project.year}</>}
        </p>
        <h1>{project.name}</h1>
        <p>{project.longDescription}</p>
        <dl className="case-facts">
          {project.technologies.length > 0 && (
            <>
              <dt>Stack</dt>
              <dd>{project.technologies.join(", ")}</dd>
            </>
          )}
          {project.links.live && (
            <>
              <dt>Live</dt>
              <dd>
                <OutLink href={project.links.live}>
                  {project.links.live}
                </OutLink>
              </dd>
            </>
          )}
          {project.links.source && (
            <>
              <dt>Source</dt>
              <dd>
                <OutLink href={project.links.source}>
                  {project.links.source}
                </OutLink>
              </dd>
            </>
          )}
        </dl>
      </header>

      {project.slug === "caltrack" && (
        <div className="case-receipt">
          <CalTrackReceipt />
        </div>
      )}

      <div className="case-body">
        {written.map((section) => (
          <section key={section.id} id={section.id} className="case-section">
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        {pending.length > 0 && (
          <section className="case-section case-pending">
            <h2>
              {written.length ? "Still being written" : "Write-up in progress"}
            </h2>
            <p>
              {written.length
                ? "These parts of the story aren’t documented yet: "
                : "I haven’t written this one up yet. It will cover "}
              {pending.map((section) => section.title.toLowerCase()).join(", ")}
              .
            </p>
          </section>
        )}
        <ProjectGallery project={project} />
        <p className="more-link">
          <Link href="/#work">← All work</Link>
        </p>
      </div>
      <Footer />
    </main>
  );
}
