# Write an article

Create a draft from the project folder:

```sh
npm run post -- "Your article title"
```

This creates `content/articles/your-article-title.md`. Open that file and replace the starter text. The fields at the top are your title, short introduction, date, status, and optional topics. Keep the title, description, and date in quotes.

```yaml
---
title: "Your article title"
description: "The main idea in one sentence."
date: "2026-09-20"
status: draft
tags: ["Engineering", "Product"]
---
```

Run `npm run dev`, then open the displayed `/blog/your-article-title/` address. Refresh the page after editing your Markdown. Drafts are visible in this local preview, with a clear draft label. They are excluded from the production site, article lists, and sitemap.

Write the body in ordinary Markdown:

- Use `##` for sections and `###` for subsections. The article title is rendered automatically.
- Use `**bold**`, `*italic*`, lists, quotations, and fenced code blocks.
- Use `[link text](https://example.com)` for links.
- Store images in `public/blog/your-article-title/`, then reference them with `![A useful description](/blog/your-article-title/image.webp)`. Compress images before adding them.
- Use Markdown tables when useful. Wide code and tables scroll within the article on small screens.
- Raw HTML is displayed as text; executable links are not rendered.

To publish, set `status: published`, check the date, and run `npm run check`. Then deploy the updated site. Publishing is intentional: changing a local file alone does not update the live site. Published posts automatically appear in `/blog/`, the homepage Writing section, and the sitemap. Reading time is calculated from the article content.

The filename becomes the URL. Keep it stable after publication so existing links continue to work. To unpublish, change the status back to `draft`, rebuild, and deploy.

`_template.md` is only a writing starter and is always excluded. No sample articles are published under your name.
