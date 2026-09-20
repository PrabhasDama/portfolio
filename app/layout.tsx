import type { Metadata, Viewport } from "next";
import { NavigationIsland } from "@/components/navigation/navigation-island";
import { profile } from "@/data/profile";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { siteUrl, absoluteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: absoluteUrl("/") },
  robots: { index: Boolean(profile.domain), follow: Boolean(profile.domain) },
  title: {
    default: "Prabhas Dama — Software Engineer & Product Builder",
    template: "%s — Prabhas Dama",
  },
  description: profile.description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: "Prabhas Dama — Software Engineer & Product Builder",
    description: profile.description,
    type: "website",
    locale: "en_US",
    siteName: "Prabhas Dama",
  },
  twitter: {
    card: "summary",
    title: "Prabhas Dama — Software Engineer & Product Builder",
    description: profile.description,
  },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NavigationIsland />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
