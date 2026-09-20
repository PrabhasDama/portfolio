import Link from "next/link";
import { ExpandableIsland } from "@/components/islands/island";
import { Arrow, Tag } from "@/components/ui/primitives";
import { caltrackCapabilities } from "@/data/projects";

export function CalTrackFeature() {
  return (
    <section
      className="caltrack-feature section reveal"
      aria-labelledby="connected-title"
    >
      <div className="feature-intro">
        <p className="eyebrow">The thinking behind CalTrack</p>
        <h2 id="connected-title">
          Life is connected.
          <br />
          <span>Software should be, too.</span>
        </h2>
        <p>
          Planning meals, tracking nutrition, and shopping for groceries are
          parts of the same routine. CalTrack brings them together.
        </p>
        <Link href="/projects/caltrack/" className="text-link">
          Read the project story <Arrow />
        </Link>
      </div>
      <div className="feature-list">
        {caltrackCapabilities.map((feature, index) => (
          <ExpandableIsland
            key={feature.title}
            index={`0${index + 1}`}
            title={feature.title}
            summary={feature.summary}
          >
            <p>{feature.body}</p>
            <div className="tag-list">
              {feature.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </ExpandableIsland>
        ))}
      </div>
    </section>
  );
}
