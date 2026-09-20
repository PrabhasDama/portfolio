import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import { absoluteUrl } from "@/lib/site";
import { profile } from "@/data/profile";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return {
    title: project.name,
    description: project.shortDescription,
    alternates: { canonical: absoluteUrl(`/projects/${project.slug}/`) },
    openGraph: {
      title: `${project.name} — Prabhas Dama`,
      description: project.shortDescription,
      type: "article",
      url: absoluteUrl(`/projects/${project.slug}/`),
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${project.name} — Prabhas Dama`,
      description: project.shortDescription,
      images: [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.longDescription,
    url: absoluteUrl(`/projects/${project.slug}/`),
    author: { "@type": "Person", name: profile.name },
    ...(project.technologies.length
      ? { keywords: project.technologies.join(", ") }
      : {}),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ProjectCaseStudy project={project} nextProject={next} />
    </>
  );
}
