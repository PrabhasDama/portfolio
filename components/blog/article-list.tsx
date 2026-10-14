import Link from "next/link";
import { type Article } from "@/lib/articles";

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ol className="article-rows">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={`/blog/${article.slug}/`}>
            <time className="row-meta" dateTime={article.date}>
              {article.date}
            </time>
            <span className="row-title">{article.title}</span>
            <span className="row-desc">
              {article.description}
              {article.status === "draft" && (
                <em className="draft-label"> Draft, local only.</em>
              )}
            </span>
            <span className="row-meta">{article.readingMinutes} min</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function WritingEmptyState() {
  return <p className="empty">Nothing published yet.</p>;
}
