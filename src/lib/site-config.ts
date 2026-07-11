const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const cleanedBasePath =
  rawBasePath === "/" ? "" : rawBasePath.replace(/\/+$/, "");

export const siteConfig = {
  name: "Chenyuan Qu",
  title: "Chenyuan Qu — Computer Vision Researcher",
  shortTitle: "Chenyuan Qu",
  description:
    "Personal academic website of Chenyuan Qu, a PhD student at the University of Birmingham working on computer vision, multimodal learning, and generative models.",
  primaryEmail: "Chenyuan.Qu@outlook.com",
  keywords: [
    "visual intelligence",
    "computer vision",
    "multimodal learning",
    "generative AI",
    "AI systems",
    "technology leadership",
    "research engineering",
    "University of Birmingham",
    "MI X Group"
  ],
  profiles: [
    "https://scholar.google.com/citations?hl=en&user=MrHJXYcAAAAJ",
    "https://github.com/HenryQUQ",
    "https://huggingface.co/quchenyuan",
    "https://uk.linkedin.com/in/henry-qu-436621195",
    "https://orcid.org/0009-0000-4814-2022"
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chenyuanqu.com",
  basePath: cleanedBasePath
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
