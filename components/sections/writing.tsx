import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { ArticleList, WritingEmptyState } from "@/components/blog/article-list";
import { getArticles } from "@/lib/articles";

export function Writing() {
  const articles = getArticles().slice(0, 3);
  return (
    <Section id="writing" label="Writing">
      {articles.length ? (
        <ArticleList articles={articles} />
      ) : (
        <WritingEmptyState />
      )}
      <p className="more-link">
        <Link href="/blog/">All writing →</Link>
      </p>
    </Section>
  );
}
