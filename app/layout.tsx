import type { Metadata, Viewport } from "next";
import { DM_Sans, Newsreader } from "next/font/google";

import { profile } from "@/src/data/site";
import { absoluteUrl, siteConfig, withBasePath } from "@/src/lib/site-config";

import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  axes: ["opsz"],
  display: "swap",
});

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  adjustFontFallback: false,
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.shortTitle,
  authors: [
    {
      name: profile.name,
      url: siteConfig.siteUrl,
    },
  ],
  creator: profile.name,
  publisher: profile.name,
  keywords: [siteConfig.name, ...siteConfig.keywords],
  alternates: {
    canonical: withBasePath("/"),
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
        url: absoluteUrl("/og.jpg"),
        width: 1170,
        height: 614,
        alt: "Chenyuan Qu — A personal collection of projects and research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl("/og.jpg")],
  },
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
    icon: withBasePath("/icon.svg"),
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f2eb",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <head>
        {/* The matte is fetched as a CSS mask (a CORS request), so the
            preload must match or the browser downloads it twice. */}
        <link
          rel="preload"
          as="image"
          href={withBasePath("/images/portrait/person-matte.webp")}
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
