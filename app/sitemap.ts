import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), priority: 1 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}/`),
      priority: project.featured ? 0.9 : 0.7,
    })),
  ];
}
