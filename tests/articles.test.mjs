import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { getArticles, renderArticle } from "../lib/articles.ts";

function fixture(t) {
  const directory = mkdtempSync(path.join(tmpdir(), "portfolio-articles-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return directory;
}
function post(directory, filename, status = "published", date = "2026-09-20") {
  writeFileSync(
    path.join(directory, filename),
    `---\ntitle: "Test article"\ndescription: "Only a test fixture."\ndate: "${date}"\nstatus: ${status}\ntags: ["Engineering"]\n---\n\n## The idea\n\nA paragraph with something to say.`,
  );
}

test("production excludes drafts and templates; local preview includes drafts", (t) => {
  const directory = fixture(t);
  post(directory, "published-post.md");
  post(directory, "private-draft.md", "draft");
  post(directory, "_template.md");
  assert.deepEqual(
    getArticles({ directory, includeDrafts: false }).map(
      (article) => article.slug,
    ),
    ["published-post"],
  );
  assert.equal(getArticles({ directory, includeDrafts: true }).length, 2);
});

test("an empty blog remains valid and articles sort by date", (t) => {
  const directory = fixture(t);
  assert.deepEqual(getArticles({ directory }), []);
  post(directory, "older.md", "published", "2026-01-01");
  post(directory, "newer.md", "published", "2026-09-20");
  assert.deepEqual(
    getArticles({ directory, includeDrafts: false }).map(
      (article) => article.slug,
    ),
    ["newer", "older"],
  );
});

test("invalid metadata fails clearly before publication", (t) => {
  const directory = fixture(t);
  post(directory, "invalid.md", "published", "2026-02-30");
  assert.throws(() => getArticles({ directory }), /real date/);
  post(directory, "invalid.md", "publshed");
  assert.throws(() => getArticles({ directory }), /status must be/);
});

test("Markdown supports article formatting without additional page headings", () => {
  const html = renderArticle(
    "# Heading\n\n**Text** with [a link](https://example.com).\n\n```ts\nconst value = 1;\n```\n\n- One\n- Two",
  );
  assert.match(html, /<h2>Heading<\/h2>/);
  assert.match(html, /<strong>Text<\/strong>/);
  assert.match(html, /href="https:\/\/example.com"/);
  assert.match(html, /<pre><code/);
  assert.match(html, /<ul>/);
});

test("raw HTML and executable Markdown links cannot run", () => {
  const html = renderArticle(
    "<script>alert(1)</script>\n\n[bad](javascript:alert) ![bad](javascript:alert)\n\n[mail](mailto:prabhasdama@gmail.com)",
  );
  assert.doesNotMatch(html, /<script|href="javascript:|src="javascript:/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /href="mailto:prabhasdama@gmail.com"/);
});
