import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/navigation/site-header";
import { profile } from "@/data/profile";
import { siteUrl, absoluteUrl } from "@/lib/site";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: absoluteUrl("/") },
  robots: { index: Boolean(profile.domain), follow: Boolean(profile.domain) },
  title: {
    default: "Prabhas Dama",
    template: "%s — Prabhas Dama",
  },
  description: profile.description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: "Prabhas Dama",
    description: profile.description,
    type: "website",
    locale: "en_US",
    siteName: "Prabhas Dama",
  },
  twitter: {
    card: "summary",
    title: "Prabhas Dama",
    description: profile.description,
  },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#16140f" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
