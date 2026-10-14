import { Section } from "@/components/ui/primitives";
import { education } from "@/data/experience";

export function About() {
  return (
    <Section id="about" label="About">
      <div className="prose-block">
        <p>
          I’m working toward a {education.degree} at {education.institution}.
          The biggest thing CalTrack taught me is that adding a feature is the
          easy part. Making it behave alongside everything that’s already there
          — the state, the data relationships, the units, the edge cases — is
          the actual work.
        </p>
        <p>
          I care about the whole product: how it works, how it feels to use, and
          whether the pieces still make sense together after the tenth feature.
        </p>
        <p>
          Lately that’s meant <strong>TypeScript</strong>,{" "}
          <strong>Next.js</strong> and <strong>React</strong> on the front,{" "}
          <strong>Supabase</strong> and <strong>PostgreSQL</strong> underneath,
          deployed on <strong>Vercel</strong>, with <strong>Resend</strong> for
          email.
        </p>
      </div>
    </Section>
  );
}
