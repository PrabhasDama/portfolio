import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { Arrow } from "@/components/ui/primitives";
import { profile } from "@/data/profile";
import { formatArticleDate, renderArticle, type Article } from "@/lib/articles";

export function ArticlePage({ article }: { article: Article }) {
  return (
    <main id="main" className="page-container article-page">
      <div id="top" />
      <Link href="/blog/" className="back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        All articles
      </Link>
      <article className="article-content">
        <header className="article-header">
          {article.status === "draft" && (
            <p className="article-draft-notice">
              Draft preview · Only visible in local development
            </p>
          )}
          <div className="article-topics">
            {article.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h1>{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <div className="article-byline">
            <span>{profile.name}</span>
            <time dateTime={article.date}>
              {formatArticleDate(article.date)}
            </time>
            <span>{article.readingMinutes} min read</span>
          </div>
        </header>
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: renderArticle(article.content) }}
        />
        <div className="article-end">
          <span className="article-end-mark" aria-hidden="true">
            pd.
          </span>
          <p>Thanks for reading.</p>
          {profile.links.email && (
            <a className="text-link" href={`mailto:${profile.links.email}`}>
              Continue the conversation <Arrow />
            </a>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
