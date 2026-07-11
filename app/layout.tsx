import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Newsreader, Source_Sans_3 } from "next/font/google";

import { profile } from "@/src/data/site";
import { absoluteUrl, siteConfig, withBasePath } from "@/src/lib/site-config";

import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  adjustFontFallback: false,
  display: "swap"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.shortTitle,
  authors: [
    {
      name: profile.name,
      url: siteConfig.siteUrl
    }
  ],
  creator: profile.name,
  publisher: profile.name,
  keywords: [siteConfig.name, ...siteConfig.keywords],
  alternates: {
    canonical: withBasePath("/")
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: absoluteUrl("/"),
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.shortTitle,
    images: [
      {
        url: absoluteUrl("/images/social/chenyuan-qu-og.png"),
        width: 1200,
        height: 630,
        alt: "Chenyuan Qu — computer vision researcher"
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
  themeColor: "#f7f5ef",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
