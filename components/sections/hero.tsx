import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { PersonalLink } from "@/components/ui/primitives";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="eyebrow hero-eyebrow">
        Software engineer <span> / </span> Product builder
      </p>
      <h1 id="hero-title">
        Prabhas Dama<span className="hero-period">.</span>
      </h1>
      <p className="hero-description">
        Complicated problems.
        <br />
        <span>Simple, considered software.</span>
      </p>
      <div className="hero-actions">
        <a className="button button-primary" href="#work">
          Explore my work <ArrowDown size={17} aria-hidden="true" />
        </a>
        <PersonalLink label="GitHub" href={profile.links.github} />
      </div>
      <div className="hero-footnote">
        <span>Computer Science at CSULB</span>
        <span className="hero-scroll">
          A little less noise. A little more purpose.
          <ArrowDown size={14} aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}
