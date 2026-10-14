import { Section } from "@/components/ui/primitives";
import { experiences } from "@/data/experience";

/** Renders nothing until real experience is added to data/experience.ts. */
export function Experience() {
  const published = experiences.filter((experience) => !experience.placeholder);
  if (!published.length) return null;
  return (
    <Section id="experience" label="Experience">
      <ol className="experience-list">
        {published.map((experience) => (
          <li key={experience.id}>
            <span className="row-meta">{experience.period}</span>
            <div>
              <h3>
                {experience.role}, <span>{experience.organization}</span>
              </h3>
              <p>{experience.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
