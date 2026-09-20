import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/blog-index";
import { ArticlePage } from "@/components/blog/article-page";
import { getArticle, getArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/site";
import { profile } from "@/data/profile";

// The optional catch-all includes /blog even before the first post is published.
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    { slug: [] },
    ...getArticles().map((article) => ({ slug: [article.slug] })),
  ];
}

type Props = { params: Promise<{ slug?: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  if (slug.length > 1) notFound();
  const article = slug.length ? getArticle(slug[0]) : undefined;
  if (slug.length && !article) notFound();
  const title = article?.title || "Writing";
  const description =
    article?.description ||
    "Notes on software, product decisions, and learning by building. Articles by Prabhas Dama.";
  const url = absoluteUrl(article ? `/blog/${article.slug}/` : "/blog/");
  return {
    title,
    description,
    alternates: { canonical: url },
    ...(article?.status === "draft"
      ? { robots: { index: false, follow: false } }
      : {}),
    openGraph: {
      title: `${title} — ${profile.name}`,
      description,
      url,
      type: article ? "article" : "website",
      ...(article
        ? {
            publishedTime: article.date,
            authors: [profile.name],
            tags: article.tags,
          }
        : {}),
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${title} — ${profile.name}`,
      description,
      images: [],
    },
  };
}

export default async function BlogRoute({ params }: Props) {
  const { slug = [] } = await params;
  if (!slug.length) return <BlogIndex articles={getArticles()} />;
  if (slug.length !== 1) notFound();
  const article = getArticle(slug[0]);
  if (!article) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Person", name: profile.name, url: absoluteUrl("/") },
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}/`),
  };
  return (
    <>
      {article.status === "published" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <ArticlePage article={article} />
    </>
  );
}
