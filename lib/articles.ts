import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  status: "draft" | "published";
  readingMinutes: number;
  content: string;
};

const articlesDirectory = path.join(process.cwd(), "content", "articles");
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Drafts only exist in the local development preview, never in production output. */
export function getArticles({
  includeDrafts = process.env.NODE_ENV === "development",
  directory = articlesDirectory,
} = {}): Article[] {
  return readdirSync(directory)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => {
      const slug = file.slice(0, -3);
      const { data, content } = matter(
        readFileSync(path.join(directory, file), "utf8"),
      );
      if (!validSlug.test(slug))
        throw new Error(
          `Invalid article filename: ${file}. Use lowercase words separated by hyphens.`,
        );
      for (const field of ["title", "description", "date"] as const) {
        if (typeof data[field] !== "string" || !data[field].trim())
          throw new Error(
            `${file}: ${field} must be a nonempty quoted string.`,
          );
      }
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
        Number.isNaN(Date.parse(data.date)) ||
        new Date(data.date).toISOString().slice(0, 10) !== data.date
      )
        throw new Error(
          `${file}: date must be a real date in YYYY-MM-DD format.`,
        );
      if (data.status !== "draft" && data.status !== "published")
        throw new Error(`${file}: status must be draft or published.`);
      if (
        data.tags !== undefined &&
        (!Array.isArray(data.tags) ||
          !data.tags.every((tag: unknown) => typeof tag === "string"))
      )
        throw new Error(`${file}: tags must be a list of strings.`);
      if (data.status === "published" && !content.trim())
        throw new Error(`${file}: a published article needs content.`);
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        status: data.status,
        readingMinutes: Math.max(
          1,
          Math.ceil(content.trim().split(/\s+/).filter(Boolean).length / 220),
        ),
        content,
      } satisfies Article;
    })
    .filter((article) => article.status === "published" || includeDrafts)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}

export function getArticle(slug: string) {
  return getArticles().find((article) => article.slug === slug);
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
const safeUrl = (href: string, image = false) => {
  if (/^\/(?!\/)/.test(href) || (!image && href.startsWith("#"))) return href;
  try {
    const protocol = new URL(href).protocol;
    return ["https:", "http:", ...(!image ? ["mailto:"] : [])].includes(
      protocol,
    )
      ? href
      : null;
  } catch {
    return null;
  }
};

/** Markdown is authored locally. Raw HTML and executable URL schemes are disabled. */
const markdown = new Marked({
  gfm: true,
  renderer: {
    html({ text }) {
      return escapeHtml(text);
    },
    heading({ depth, tokens }) {
      const level = Math.max(2, depth);
      return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>`;
    },
    link({ href, title, tokens }) {
      const url = safeUrl(href);
      const label = this.parser.parseInline(tokens);
      if (!url) return label;
      return `<a href="${escapeHtml(url)}"${title ? ` title="${escapeHtml(title)}"` : ""}${/^https?:/.test(url) ? ' rel="noreferrer"' : ""}>${label}</a>`;
    },
    image({ href, title, text }) {
      const url = safeUrl(href, true);
      if (!url) return escapeHtml(text);
      return `<img src="${escapeHtml(url)}" alt="${escapeHtml(text)}"${title ? ` title="${escapeHtml(title)}"` : ""} loading="lazy" decoding="async" />`;
    },
  },
});

export function renderArticle(content: string): string {
  return markdown.parse(content, { async: false });
}
