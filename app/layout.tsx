import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans } from "next/font/google";

import { profile } from "@/src/data/site";
import { absoluteUrl, siteConfig, withBasePath } from "@/src/lib/site-config";

import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.title,
  authors: [
    {
      name: profile.name,
      url: siteConfig.siteUrl
    }
  ],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    "Chenyuan Qu",
    "computer vision",
    "multimodal learning",
    "generative AI",
    "University of Birmingham",
    "MI X Group"
  ],
  alternates: {
    canonical: withBasePath("/")
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: absoluteUrl("/"),
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: absoluteUrl("/images/social/chenyuan-qu-og.png"),
        width: 1200,
        height: 630,
        alt: "Chenyuan Qu research website"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl("/images/social/chenyuan-qu-og.png")]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: withBasePath("/icon.svg")
  }
};

export const viewport: Viewport = {
  themeColor: "#f3efe8"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
