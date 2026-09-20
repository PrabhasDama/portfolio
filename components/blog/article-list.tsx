import Link from "next/link";
import { Arrow } from "@/components/ui/primitives";
import { formatArticleDate, type Article } from "@/lib/articles";

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ol className="article-list">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={`/blog/${article.slug}/`} className="article-row">
            <div className="article-row-meta">
              <time dateTime={article.date}>
                {formatArticleDate(article.date)}
              </time>
              <span>{article.readingMinutes} min read</span>
              {article.status === "draft" && (
                <span className="draft-label">Draft · local preview</span>
              )}
            </div>
            <div className="article-row-copy">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              {article.tags.length > 0 && (
                <div className="article-topics">
                  {article.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <span className="circle-arrow">
              <Arrow />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function WritingEmptyState() {
  return (
    <div className="writing-empty">
      <span className="writing-empty-mark" aria-hidden="true">
        Aa<span>.</span>
      </span>
      <div>
        <p>No articles published yet.</p>
        <span>This is where I’ll share notes from building software.</span>
      </div>
    </div>
  );
}
