import { Section, OutLink } from "@/components/ui/primitives";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <Section id="contact" label="Contact">
      <a className="contact-email" href={`mailto:${profile.links.email}`}>
        {profile.links.email}
        <span className="arrow">↗</span>
      </a>
      <p className="contact-small">
        Email is best. I’m also on{" "}
        <OutLink href={profile.links.github}>GitHub</OutLink> and{" "}
        <OutLink href={profile.links.linkedin}>LinkedIn</OutLink>. Happy to talk
        about work, projects, or anything on this page.
      </p>
    </Section>
  );
}
