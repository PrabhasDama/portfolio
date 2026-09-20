import { profile } from "@/data/profile";

/** The hosted preview origin is real; the owner's personal domain stays optional. */
export const siteUrl =
  profile.domain ||
  "https://prabhas-dama-portfolio.expert-lark-6279.chatgpt.site";
export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();
