import Link from "next/link";
import { SectionHeading, Arrow } from "@/components/ui/primitives";
import { ArticleList, WritingEmptyState } from "@/components/blog/article-list";
import { getArticles } from "@/lib/articles";

export function Writing() {
  const articles = getArticles().slice(0, 3);
  return (
    <section id="writing" className="writing-section section reveal">
      <SectionHeading number="04" title="Writing" />
      <div className="writing-intro">
        <div>
          <h2>Notes from the work.</h2>
          <p>Ideas, decisions, and lessons along the way.</p>
        </div>
        <Link href="/blog/" className="text-link">
          All articles <Arrow />
        </Link>
      </div>
      {articles.length ? (
        <ArticleList articles={articles} />
      ) : (
        <WritingEmptyState />
      )}
    </section>
  );
}
