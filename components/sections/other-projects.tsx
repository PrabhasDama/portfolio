import { ProjectIsland } from "@/components/projects/project-island";
import { projects } from "@/data/projects";

export function OtherProjects() {
  return (
    <section
      className="other-projects section reveal"
      aria-labelledby="other-projects-title"
    >
      <div className="other-projects-heading">
        <h2 id="other-projects-title">Also on the workbench.</h2>
        <p>Different questions. The same curiosity.</p>
      </div>
      <div className="other-project-grid">
        {projects
          .filter((project) => !project.featured)
          .map((project, index) => (
            <ProjectIsland key={project.slug} project={project} index={index} />
          ))}
      </div>
    </section>
  );
}
