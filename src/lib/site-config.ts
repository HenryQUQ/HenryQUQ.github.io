const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const cleanedBasePath =
  rawBasePath === "/" ? "" : rawBasePath.replace(/\/+$/, "");

export const siteConfig = {
  title: "Chenyuan Qu",
  description:
    "Research website for Chenyuan Qu, a PhD student in Computer Science at the University of Birmingham working across computer vision, multimodal learning, and generative AI.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chenyuanqu.com",
  basePath: cleanedBasePath
};

export function withBasePath(path = "/") {
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

