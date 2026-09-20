import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleList, WritingEmptyState } from "@/components/blog/article-list";
import { Footer } from "@/components/sections/footer";
import type { Article } from "@/lib/articles";

export function BlogIndex({ articles }: { articles: Article[] }) {
  return (
    <main id="main" className="page-container blog-page">
      <div id="top" />
      <Link href="/#writing" className="back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to portfolio
      </Link>
      <header className="blog-header">
        <p className="eyebrow">The journal</p>
        <h1>
          Thinking out loud<span>.</span>
        </h1>
        <p>
          Notes on software, product decisions,
          <br className="desktop-break" /> and what I’m learning by building.
        </p>
      </header>
      <section className="blog-articles" aria-label="Articles">
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
