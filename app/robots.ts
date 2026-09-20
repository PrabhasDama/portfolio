import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { profile } from "@/data/profile";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(profile.domain ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
