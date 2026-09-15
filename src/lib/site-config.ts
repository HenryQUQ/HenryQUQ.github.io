import { profile } from "@/src/data/site";

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const cleanedBasePath =
  rawBasePath === "/" ? "" : rawBasePath.replace(/\/+$/, "");

export const siteConfig = {
  name: profile.name,
  title: `${profile.name} (${profile.englishName}) — A personal collection`,
  shortTitle: `${profile.name} (${profile.englishName})`,
  description:
    `Projects, research and a few things in progress. The personal website of ${profile.name}, also known as ${profile.englishName}, based in Birmingham.`,
  primaryEmail: "Chenyuan.Qu@outlook.com",
  keywords: [
    "visual intelligence",
    "computer vision",
    "multimodal learning",
    "generative AI",
    "visual representation",
    "image generation",
    "COMPaD",
    "VisualSplit",
    "University of Birmingham",
    "MI X Group",
  ],
  profiles: [
    "https://scholar.google.com/citations?hl=en&user=MrHJXYcAAAAJ",
    "https://github.com/HenryQUQ",
    "https://huggingface.co/quchenyuan",
    "https://uk.linkedin.com/in/henry-qu-436621195",
    "https://orcid.org/0009-0000-4814-2022",
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chenyuanqu.com",
  basePath: cleanedBasePath,
};

export function withBasePath(path = "/") {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!siteConfig.basePath) {
    return normalizedPath;
  }

  return normalizedPath === "/"
    ? `${siteConfig.basePath}/`
    : `${siteConfig.basePath}${normalizedPath}`;
}

export function absoluteUrl(path = "/") {
  return new URL(withBasePath(path), siteConfig.siteUrl).toString();
}
