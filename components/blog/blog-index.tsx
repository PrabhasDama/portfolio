import { ArticleList, WritingEmptyState } from "@/components/blog/article-list";
import { Footer } from "@/components/sections/footer";
import type { Article } from "@/lib/articles";
import { PathCrumb } from "@/components/ui/primitives";

export function BlogIndex({ articles }: { articles: Article[] }) {
  return (
    <main id="main" className="page">
      <header className="page-header">
        <PathCrumb parts={[["writing", "/blog/"]]} />
        <h1>Notes from building things</h1>
        <p>
          Mostly about CalTrack for now: how it’s built and why it ended up that
          way.
        </p>
      </header>
      <section className="page-body" aria-label="Articles">
        {articles.length ? (
          <ArticleList articles={articles} />
        ) : (
          <WritingEmptyState />
        )}
      </section>
      <Footer />
    </main>
  );
}
