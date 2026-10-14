import Link from "next/link";
import type { Project } from "@/data/projects";
import { CalTrackReceipt } from "@/components/projects/caltrack-visual";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { OutLink, PathCrumb } from "@/components/ui/primitives";
import { LoopDiagram } from "@/components/projects/loop-diagram";
import { Footer } from "@/components/sections/footer";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const written = project.sections.filter((section) => !section.placeholder);
  const pending = project.sections.filter((section) => section.placeholder);
  return (
    <main id="main" className="page">
      <header className="page-header case-header">
        <PathCrumb
          parts={[
            ["work", "/#work"],
            [project.slug, `/projects/${project.slug}/`],
          ]}
        />
        <h1>{project.name}</h1>
        <p>{project.longDescription}</p>
        <dl className="case-facts">
          {project.category && (
            <>
              <dt>Type</dt>
              <dd>{project.category}</dd>
            </>
          )}
          {project.year && (
            <>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </>
          )}
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
            {project.slug === "caltrack" && section.id === "problem" && (
              <LoopDiagram />
            )}
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
          <Link href="/#work">
            <span className="arrow arrow-back">←</span> All work
          </Link>
        </p>
      </div>
      <Footer />
    </main>
  );
}
