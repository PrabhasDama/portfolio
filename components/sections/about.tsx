import { Section } from "@/components/ui/primitives";
import { education } from "@/data/experience";

const stack = [
  ["languages", "TypeScript"],
  ["frontend", "Next.js, React"],
  ["data", "Supabase, PostgreSQL"],
  ["infra", "Vercel, Resend"],
];

export function About() {
  return (
    <Section id="about" label="About">
      <div className="about">
        <div className="about-copy">
          <p>
            I’m working toward a {education.degree} at {education.institution}.
            The biggest thing CalTrack taught me is that adding a feature is the
            easy part. Making it behave alongside everything that’s already
            there — the state, the data relationships, the units, the edge cases
            — is the actual work.
          </p>
          <p>
            I care about the whole product: how it works, how it feels to use,
            and whether the pieces still make sense together after the tenth
            feature.
          </p>
        </div>
        <dl className="spec">
          {stack.map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
