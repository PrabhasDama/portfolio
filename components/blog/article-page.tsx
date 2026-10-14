import { Footer } from "@/components/sections/footer";
import { PathCrumb } from "@/components/ui/primitives";
import { profile } from "@/data/profile";
import { renderArticle, type Article } from "@/lib/articles";

export function ArticlePage({ article }: { article: Article }) {
  return (
    <main id="main" className="page">
      <article className="article">
        <header className="page-header">
          {article.status === "draft" && (
            <p className="draft-label">
              Draft preview, only visible in local development
            </p>
          )}
          <PathCrumb
            parts={[
              ["writing", "/blog/"],
              [article.slug, `/blog/${article.slug}/`],
            ]}
          />
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <p className="byline">
            {profile.name} · <time dateTime={article.date}>{article.date}</time>{" "}
            · {article.readingMinutes} min read
            {article.tags.map((tag) => (
              <span key={tag} className="tag">
                {" "}
                #{tag.toLowerCase()}
              </span>
            ))}
          </p>
        </header>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: renderArticle(article.content) }}
        />
        <p className="article-end">
          Thanks for reading. If you have a question or spot a mistake,{" "}
          <a href={`mailto:${profile.links.email}`}>email me</a>.
        </p>
      </article>
      <Footer />
    </main>
  );
}
