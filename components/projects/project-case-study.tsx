import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/data/projects";
import { CalTrackVisual } from "@/components/projects/caltrack-visual";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ExpandableIsland } from "@/components/islands/island";
import { Arrow, PersonalLink, Tag } from "@/components/ui/primitives";
import { Footer } from "@/components/sections/footer";

export function ProjectCaseStudy({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const known = project.sections.filter((section) => !section.placeholder);
  const pending = project.sections.filter((section) => section.placeholder);
  return (
    <main id="main" className="page-container case-page">
      <div id="top" />
      <Link href="/#work" className="back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        All work
      </Link>
      <header className="case-header">
        <div className="case-kicker">
          <p className="eyebrow">
            {project.featured ? "Flagship project" : "From the workbench"}
          </p>
          {project.category && <span>{project.category}</span>}
          {project.year && <span>{project.year}</span>}
        </div>
        <h1>
          {project.name}
          <span>.</span>
        </h1>
        <p className="case-lead">{project.shortDescription}</p>
        <p className="case-description">{project.longDescription}</p>
        <div className="case-header-footer">
          <div className="tag-list">
            {project.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
          <div className="case-links">
            <PersonalLink label="Live project" href={project.links.live} />
            <PersonalLink label="Source" href={project.links.source} />
          </div>
        </div>
      </header>
      {project.featured ? (
        <div className="island case-visual">
          <div>
            <p className="eyebrow">The product idea</p>
            <h2>
              Many moving parts.
              <br />
              <span>One connected routine.</span>
            </h2>
            <p>Nutrition. Planning. Shopping. Progress.</p>
          </div>
          <CalTrackVisual />
        </div>
      ) : (
        <div className="island case-pending">
          <span className="eyebrow">Case study in preparation</span>
          <p>The story is still taking shape.</p>
          <span>
            Product details, engineering decisions, and outcomes will be shared
            here once documented.
          </span>
        </div>
      )}
      <div className="case-layout">
        <aside className="case-contents" aria-label="Case study contents">
          <p className="eyebrow">In this project</p>
          <nav>
            {known.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.id === "decisions"
                  ? "Technical decisions"
                  : section.id[0].toUpperCase() + section.id.slice(1)}
              </a>
            ))}
            {pending.length > 0 && (
              <a href="#engineering-notes">
                {project.featured ? "Engineering notes" : "Project notes"}
              </a>
            )}
            <a href="#technology">Technology</a>
            <a href="#gallery">Gallery</a>
          </nav>
        </aside>
        <div className="case-story">
          {known.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="case-section reveal"
            >
              <p className="eyebrow">
                0{index + 1} /{" "}
                {section.id === "decisions"
                  ? "Technical decisions"
                  : section.id}
              </p>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          {pending.length > 0 && (
            <section id="engineering-notes" className="case-section reveal">
              <p className="eyebrow">
                {project.featured
                  ? "The engineering story"
                  : "The project story"}
              </p>
              <h2>
                {project.featured
                  ? "More depth, coming next."
                  : "Notes in preparation."}
              </h2>
              <p>These sections are reserved for documented project details.</p>
              <div className="case-pending-sections">
                {pending.map((section, index) => (
                  <ExpandableIsland
                    key={section.id}
                    index={`0${index + 1}`}
                    title={section.title}
                    summary="To be documented"
                  >
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </ExpandableIsland>
                ))}
              </div>
            </section>
          )}
          <section id="technology" className="case-section reveal">
            <p className="eyebrow">Technology</p>
            <h2>The stack.</h2>
            {project.technologies.length ? (
              <div className="case-stack">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            ) : (
              <p>Technology details will be added with the case study.</p>
            )}
          </section>
          <ProjectGallery project={project} />
        </div>
      </div>
      <Link className="next-project" href={`/projects/${nextProject.slug}/`}>
        <div>
          <p className="eyebrow">Next project</p>
          <h2>{nextProject.name}</h2>
        </div>
        <span className="next-project-arrow">
          <Arrow />
        </span>
      </Link>
      <Footer />
    </main>
  );
}
