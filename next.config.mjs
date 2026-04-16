const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isUserOrOrgPage = repoName.toLowerCase().endsWith(".github.io");
const derivedBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isGithubActions && repoName && !isUserOrOrgPage ? `/${repoName}` : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: derivedBasePath,
  assetPrefix: derivedBasePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: derivedBasePath
  }
};

export default nextConfig;
