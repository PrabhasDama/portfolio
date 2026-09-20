import Link from "next/link";
import { Arrow } from "@/components/ui/primitives";
import type { Project } from "@/data/projects";
import { MousePointer2, PanelsTopLeft, Layers3 } from "lucide-react";

const icons = {
  "mouse-telemetry": MousePointer2,
  campussync: PanelsTopLeft,
  smartwaste: Layers3,
};

export function ProjectIsland({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const Icon = icons[project.slug as keyof typeof icons] || Layers3;
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className={`island project-island project-${project.slug}`}
    >
      <div className="project-card-top">
        <span className="project-icon">
          <Icon size={23} strokeWidth={1.3} aria-hidden="true" />
        </span>
        <span className="project-ordinal">0{index + 2}</span>
      </div>
      <div className="project-card-body">
        <p className="project-category">
          {project.category || "Project notes"}
        </p>
        <h3>{project.name}</h3>
        <p>{project.shortDescription}</p>
      </div>
      <div className="project-card-bottom">
        <span>Case study in preparation</span>
        <span className="circle-arrow">
          <Arrow />
        </span>
      </div>
    </Link>
  );
}
