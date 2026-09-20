import { SectionHeading, PersonalLink } from "@/components/ui/primitives";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="contact-section section reveal">
      <SectionHeading number="04" title="What’s next" />
      <div className="contact-content">
        <h2>
          Let’s build something
          <br />
          <span>interesting.</span>
        </h2>
        <p>Good things start with a conversation.</p>
        <div className="contact-links">
          <PersonalLink
            label="Email me"
            href={profile.links.email ? `mailto:${profile.links.email}` : null}
          />
          <PersonalLink label="LinkedIn" href={profile.links.linkedin} />
          <PersonalLink label="GitHub" href={profile.links.github} />
        </div>
      </div>
    </section>
  );
}
