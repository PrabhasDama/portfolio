import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/blog/"), priority: 0.8 },
    ...getArticles({ includeDrafts: false }).map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}/`),
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}/`),
      priority: project.featured ? 0.9 : 0.7,
    })),
  ];
}
