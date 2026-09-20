import Link from "next/link";
import { caltrack } from "@/data/projects";
import { Arrow, SectionHeading, Tag } from "@/components/ui/primitives";
import { CalTrackVisual } from "@/components/projects/caltrack-visual";

export function SelectedWork() {
  return (
    <section
      id="work"
      className="selected-work section"
      aria-label="Selected work"
    >
      <SectionHeading
        number="01"
        title="Selected work"
        description="Built around real life."
      />
      <Link href="/projects/caltrack/" className="island featured-project">
        <div className="featured-copy">
          <div className="project-overline">
            <span className="accent-dot" />
            <span>Flagship project</span>
            <span className="project-type">Full-stack platform</span>
          </div>
          <h3>{caltrack.name}</h3>
          <p className="featured-tagline">
            Your nutrition.
            <br />
            Your groceries.
            <br />
            <span>Finally, connected.</span>
          </p>
          <p className="featured-description">
            From what you eat to how you shop.
            <br />
            One system for the whole picture.
          </p>
          <span className="text-link">
            Inside the project <Arrow />
          </span>
        </div>
        <CalTrackVisual />
        <div className="featured-footer">
          <div className="tag-list">
            {caltrack.technologies
              .filter((tech) =>
                ["Next.js", "TypeScript", "Supabase"].includes(tech),
              )
              .map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
          </div>
          <span>Product thinking. End to end.</span>
        </div>
      </Link>
    </section>
  );
}
