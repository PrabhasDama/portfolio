import Image from "next/image";
import type { Project } from "@/data/projects";

/** Renders only once real screenshots are added to the project record. */
export function ProjectGallery({ project }: { project: Project }) {
  if (!project.images.length) return null;
  return (
    <section id="gallery" className="case-section">
      <h2>Screenshots</h2>
      <div className="gallery">
        {project.images.map((image) => (
          <figure key={image.src}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 767px) 100vw, 720px"
              loading="lazy"
            />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
