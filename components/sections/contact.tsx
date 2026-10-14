import { Section, OutLink } from "@/components/ui/primitives";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <Section id="contact" label="Contact">
      <p className="contact-line">
        Email is the best way to reach me:{" "}
        <a className="email" href={`mailto:${profile.links.email}`}>
          {profile.links.email}
        </a>
      </p>
      <p className="contact-small">
        I’m also on <OutLink href={profile.links.github}>GitHub</OutLink> and{" "}
        <OutLink href={profile.links.linkedin}>LinkedIn</OutLink>. Happy to talk
        about work, projects, or anything on this page.
      </p>
    </Section>
  );
}
