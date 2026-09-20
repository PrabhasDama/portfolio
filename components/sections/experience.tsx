import { SectionHeading } from "@/components/ui/primitives";
import { experiences, experienceEmptyState } from "@/data/experience";

export function Experience() {
  const published = experiences.filter((experience) => !experience.placeholder);
  return (
    <section id="experience" className="experience-section section reveal">
      <SectionHeading number="03" title="Experience" />
      {published.length ? (
        <ol className="experience-list">
          {published.map((experience) => (
            <li key={experience.id}>
              <span className="experience-period">{experience.period}</span>
              <div>
                <h3>{experience.role}</h3>
                <p className="experience-organization">
                  {experience.organization}
                </p>
                <p>{experience.description}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="experience-empty">
          <span className="timeline-mark" aria-hidden="true" />
          <p>{experienceEmptyState}</p>
          <span>More to the story.</span>
        </div>
      )}
    </section>
  );
}
