import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run post -- "Your article title"');
  process.exit(1);
}
const slug = title
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
if (!slug) {
  console.error("Include at least one letter or number in the title.");
  process.exit(1);
}
const file = path.join(process.cwd(), "content", "articles", `${slug}.md`);
if (existsSync(file)) {
  console.error(`An article already exists at ${file}. Choose another title.`);
  process.exit(1);
}
const template = readFileSync(
  new URL("../content/articles/_template.md", import.meta.url),
  "utf8",
)
  .replace('title: "Your article title"', `title: ${JSON.stringify(title)}`)
  .replace(
    /date: "\d{4}-\d{2}-\d{2}"/,
    `date: "${new Date().toISOString().slice(0, 10)}"`,
  );
writeFileSync(file, template, { flag: "wx" });
console.log(
  `Created draft: ${file}\nPreview: http://127.0.0.1:3000/blog/${slug}/\nSet status: published when it is ready, then rebuild and deploy.`,
);
