import { GraduationCap, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";
import { Island } from "@/components/islands/island";
import { profile } from "@/data/profile";
import { education } from "@/data/experience";

export function About() {
  return (
    <section id="about" className="about-section section reveal">
      <SectionHeading number="02" title="A little about me" />
      <div className="about-grid">
        <div className="about-copy">
          <h2>
            An engineer’s curiosity.
            <br />
            <span>A builder’s instinct.</span>
          </h2>
          <p>
            I’m Prabhas, a Computer Science student at California State
            University, Long Beach. I enjoy building software where engineering
            meets the practical problems people face every day.
          </p>
          <p>
            I’m interested in the whole product: how it works, how it feels, and
            how the pieces fit together.
          </p>
          {profile.links.resume && (
            <a
              className="text-link"
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
            >
              View résumé <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          )}
        </div>
        <Island className="education-island">
          <GraduationCap size={24} strokeWidth={1.4} aria-hidden="true" />
          <div>
            <p className="eyebrow">Currently studying</p>
            <h3>{education.degree}</h3>
            <p>{education.institution}</p>
          </div>
          <span className="education-location">
            CSULB <span> / </span> Long Beach, California
          </span>
        </Island>
      </div>
    </section>
  );
}
