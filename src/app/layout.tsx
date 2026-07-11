import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { absoluteUrl, site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const ogImageUrl = absoluteUrl(site.ogImage.path);

export const metadata: Metadata = {
  // Trailing slash so relative paths resolve under /mem01-site/
  metadataBase: new URL(`${site.url.replace(/\/$/, "")}/`),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: "mem01" }],
  creator: "mem01",
  publisher: "mem01",
  applicationName: site.name,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: ogImageUrl,
        width: site.ogImage.width,
        height: site.ogImage.height,
        alt: site.ogImage.alt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
    // attributes onto <html>/<body> before React hydrates.
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
