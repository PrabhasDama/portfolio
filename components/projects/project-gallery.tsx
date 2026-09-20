import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectGallery({ project }: { project: Project }) {
  return (
    <section id="gallery" className="case-gallery case-section">
      <p className="eyebrow">Gallery</p>
      <h2>A closer look.</h2>
      {project.images.length ? (
        <div className="gallery-grid">
          {project.images.map((image) => (
            <figure key={image.src} className="gallery-image island">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 767px) 100vw, 1100px"
                loading="lazy"
              />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ) : (
        <div className="island gallery-placeholder">
          <ImageIcon size={28} strokeWidth={1.2} aria-hidden="true" />
          <p>Product images, when they’re ready.</p>
          <span>Actual screenshots will be added here.</span>
        </div>
      )}
    </section>
  );
}
